const TOTAL = 300;
const canvas = document.getElementById('frameCanvas');
const ctx = canvas.getContext('2d', { alpha:false, desynchronized:true });
const frameNow = document.getElementById('frameNow');
const progressBar = document.getElementById('progressBar');
const loaderBar = document.getElementById('loaderBar');
const loaderText = document.getElementById('loaderText');
const preloader = document.getElementById('preloader');
const hero = document.querySelector('.hero');
const heroCopy = document.querySelector('.hero-copy');
const heroHud = document.querySelector('.hud-top');
const heroData = document.querySelector('.hero-data');
const scrollCue = document.querySelector('.scroll-cue');
const frameCounter = document.querySelector('.frame-counter');

const images = new Array(TOTAL);
let loaded = 0, cursor = 0, current = 0, target = 0;
let dpr = Math.min(devicePixelRatio || 1, 2);

const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));
const frameURL = i => `assets/frames/frame_${String(i).padStart(4,'0')}.webp`;

function resize(){
  dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(innerWidth*dpr);
  canvas.height = Math.round(innerHeight*dpr);
  canvas.style.width = innerWidth+'px';
  canvas.style.height = innerHeight+'px';
  draw(current);
}

function draw(index){
  const img = images[clamp(Math.round(index),0,TOTAL-1)];
  if(!img || !img.complete) return;
  const cw=canvas.width,ch=canvas.height;
  ctx.fillStyle='#05070b'; ctx.fillRect(0,0,cw,ch);
  const scale=Math.max(cw/img.naturalWidth,ch/img.naturalHeight);
  const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
  ctx.drawImage(img,(cw-w)/2,(ch-h)/2,w,h);
  frameNow.textContent=String(Math.round(index)+1).padStart(3,'0');
}

function heroProgress(){
  const start=hero.offsetTop;
  const distance=Math.max(1,hero.offsetHeight-innerHeight);
  const p=clamp((scrollY-start)/distance);
  target=p*(TOTAL-1);
  progressBar.style.height=(p*100)+'%';

  // Cinematic typography choreography: content recedes while the sequence takes over.
  const textOut=clamp(p/0.30);
  const hudOut=clamp((p-0.12)/0.30);
  heroCopy.style.transform=`translate3d(0,${-50-p*24}%,0) scale(${1-p*.045})`;
  heroCopy.style.opacity=1-textOut*.92;
  heroHud.style.opacity=1-hudOut*.72;
  heroData.style.transform=`translate3d(0,${p*28}px,0)`;
  heroData.style.opacity=1-clamp((p-.35)/.35)*.75;
  scrollCue.style.opacity=1-clamp(p/.16);
  frameCounter.style.opacity=.45+clamp(p*.8);
}

function revealSections(){
  document.querySelectorAll('.mission,.battle,.messages,.register').forEach(section=>{
    const r=section.getBoundingClientRect();
    const center=innerHeight*.62;
    const dist=Math.abs((r.top+r.height*.25)-center);
    const amount=clamp(1-dist/(innerHeight*.9));
    section.style.setProperty('--reveal',amount.toFixed(3));
    section.style.transform=`translate3d(0,${(1-amount)*24}px,0)`;
    section.style.opacity=(.62+amount*.38).toFixed(3);
  });
}

function tick(){
  current += (target-current)*.115;
  if(Math.abs(target-current)<.025) current=target;
  draw(current);
  requestAnimationFrame(tick);
}

function loadFrames(){
  const concurrency=10;
  function batch(){
    for(let n=0;n<concurrency && cursor<TOTAL;n++){
      const i=cursor++;
      const img=new Image();
      img.decoding='async';
      img.onload=img.onerror=()=>{
        loaded++;
        const pct=Math.round(loaded/TOTAL*100);
        loaderBar.style.width=pct+'%';
        loaderText.textContent=`INITIALIZING ARENA ${String(pct).padStart(2,'0')}%`;
        if(loaded===TOTAL){
          draw(0);
          setTimeout(()=>{preloader.style.opacity='0';preloader.style.visibility='hidden';},400);
        } else batch();
      };
      img.src=frameURL(i); images[i]=img;
    }
  }
  batch();
}

let scrollQueued=false;
function onScroll(){
  heroProgress();
  if(!scrollQueued){
    scrollQueued=true;
    requestAnimationFrame(()=>{revealSections();scrollQueued=false;});
  }
}

addEventListener('resize',resize,{passive:true});
addEventListener('scroll',onScroll,{passive:true});
resize(); heroProgress(); revealSections(); loadFrames(); tick();
