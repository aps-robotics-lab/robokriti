const TOTAL = 300;

const canvas = document.getElementById("frameCanvas");
const ctx = canvas.getContext("2d", { alpha: false });

const frameNow = document.getElementById("frameNow");
const progressBar = document.getElementById("progressBar");

const loaderBar = document.getElementById("loaderBar");
const loaderText = document.getElementById("loaderText");
const preloader = document.getElementById("preloader");

let images = new Array(TOTAL);
let loaded = 0;

let current = 0;
let target = 0;

let raf = 0;

let dpr = Math.min(window.devicePixelRatio || 1, 2);


function frameURL(i) {
  return `assets/frames/frame_${String(i).padStart(4, "0")}.webp`;
}


function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(innerWidth * dpr);
  canvas.height = Math.round(innerHeight * dpr);

  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";

  draw(current);
}


addEventListener("resize", resize);


function draw(index) {
  const img =
    images[
      Math.max(
        0,
        Math.min(TOTAL - 1, Math.round(index))
      )
    ];

  if (!img || !img.complete) return;

  const cw = canvas.width;
  const ch = canvas.height;

  ctx.fillStyle = "#05070b";
  ctx.fillRect(0, 0, cw, ch);

  const scale = Math.max(
    cw / img.naturalWidth,
    ch / img.naturalHeight
  );

  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;

  ctx.drawImage(
    img,
    (cw - w) / 2,
    (ch - h) / 2,
    w,
    h
  );

  frameNow.textContent =
    String(Math.round(index) + 1).padStart(3, "0");
}


function tick() {
  current += (target - current) * 0.13;

  if (Math.abs(target - current) < 0.03) {
    current = target;
  }

  draw(current);

  const p = current / (TOTAL - 1);

  progressBar.style.height =
    p * 100 + "%";

  raf = requestAnimationFrame(tick);
}


function scrollMap() {
  const hero = document.querySelector(".hero");

  const start = hero.offsetTop;

  const end =
    start +
    hero.offsetHeight -
    innerHeight;

  const p = Math.max(
    0,
    Math.min(
      1,
      (scrollY - start) /
        Math.max(1, end - start)
    )
  );

  target = p * (TOTAL - 1);
}


addEventListener(
  "scroll",
  scrollMap,
  { passive: true }
);


function loadFrames() {
  let cursor = 0;

  const concurrency = 8;


  function next() {
    for (let k = 0; k < concurrency; k++) {

      const i = cursor++;

      if (i >= TOTAL) return;


      const img = new Image();

      img.decoding = "async";


      img.onload = img.onerror = () => {

        loaded++;


        const pct =
          Math.round(
            (loaded / TOTAL) * 100
          );


        loaderBar.style.width =
          pct + "%";


        loaderText.textContent =
          `INITIALIZING ARENA ${String(pct).padStart(2, "0")}%`;


        if (loaded === TOTAL) {

          images[0] &&
            draw(0);


          setTimeout(() => {

            preloader.style.opacity = "0";

            preloader.style.visibility =
              "hidden";

          }, 350);

        }


        next();

      };


      img.src = frameURL(i);

      images[i] = img;

    }
  }


  next();
}


resize();

loadFrames();

scrollMap();

tick();
