import { init, cards } from './main.js';

await init();
cards('homeEvents');

const hero = document.getElementById('hero');
const canvas = document.getElementById('heroCanvas');
const ctx = canvas?.getContext('2d', { alpha: false });
const loader = document.getElementById('loader');
const bar = document.getElementById('loaderBar');
const pct = document.getElementById('loaderPct');

const TOTAL = 300;
const PATH = i => `assets/frames/frame_${String(i).padStart(4, '0')}.webp`;
const frames = new Array(TOTAL);
let current = 0;
let raf = 0;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {
  if (!canvas || !ctx) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  draw(current);
}

function draw(index) {
  if (!ctx) return;
  const image = frames[index] || frames.find(Boolean);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, innerWidth, innerHeight);
  if (!image || !image.naturalWidth) return;

  const scale = Math.max(innerWidth / image.naturalWidth, innerHeight / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  ctx.drawImage(image, (innerWidth - width) / 2, (innerHeight - height) / 2, width, height);
}

function setProgress(value) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  if (pct) pct.textContent = `${v}%`;
  if (bar) bar.style.width = `${v}%`;
}

function loadImage(index) {
  return new Promise(resolve => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => { frames[index] = image; resolve(true); };
    image.onerror = () => resolve(false);
    image.src = PATH(index);
  });
}

async function boot() {
  // Load the first frame immediately. The site becomes usable as soon as a visual exists.
  const first = await Promise.race([
    loadImage(0),
    new Promise(resolve => setTimeout(() => resolve(false), 1800))
  ]);

  if (!frames[0]) {
    // Give the canvas a clean fallback rather than trapping the visitor behind the loader.
    ctx?.fillRect(0, 0, innerWidth, innerHeight);
  }
  setProgress(first ? 2 : 1);
  draw(0);
  loader?.classList.add('hide');
  document.documentElement.classList.remove('loading');
  document.body.classList.remove('loading');

  // Continue caching frames in the background. Never block the UI on all 300 images.
  const queue = Array.from({ length: TOTAL - 1 }, (_, n) => n + 1);
  let done = 0;
  const workers = Math.min(4, Math.max(2, navigator.hardwareConcurrency || 4));
  let cursor = 0;

  async function worker() {
    while (cursor < queue.length) {
      const index = queue[cursor++];
      await loadImage(index);
      done++;
      // Progress is informational after the loader has disappeared.
      if (done % 8 === 0) setProgress(2 + (done / queue.length) * 98);
    }
  }
  await Promise.all(Array.from({ length: workers }, worker));
  setProgress(100);
}

function updateFrame() {
  if (!hero) return;
  const scrollable = Math.max(1, hero.offsetHeight - innerHeight);
  const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / scrollable));
  const target = Math.round(progress * (TOTAL - 1));
  if (target !== current) {
    current = target;
    draw(current);
  }
  raf = 0;
}

addEventListener('resize', resizeCanvas, { passive: true });
addEventListener('scroll', () => {
  if (!raf) raf = requestAnimationFrame(updateFrame);
}, { passive: true });

resizeCanvas();
boot();
