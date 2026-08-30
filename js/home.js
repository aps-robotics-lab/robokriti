import {init,cards} from './main.js';
await init();
cards('homeEvents');
const hero=document.getElementById('hero'),canvas=document.getElementById('heroCanvas'),ctx=canvas?.getContext('2d',{alpha:false});
const loader=document.getElementById('loader'),bar=document.getElementById('loaderBar'),pct=document.getElementById('loaderPct');
const TOTAL=300, path=i=>`assets/frames/frame_${String(i).padStart(4,'0')}.webp`,frames=new Array(TOTAL);let current=0,drawRAF=0,dpr=1;
function resize(){if(!canvas||!ctx)return;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.floor(innerWidth*dpr);canvas.height=Math.floor(innerHeight*dpr);canvas.style.width='100%';canvas.style.height='100%';ctx.setTransform(dpr,0,0,dpr,0,0);draw(current)}
function draw(i){if(!ctx)return;const im=frames[i]||frames.find(Boolean);ctx.fillStyle='#000';ctx.fillRect(0,0,innerWidth,innerHeight);if(!im?.naturalWidth)return;const scale=Math.max(innerWidth/im.naturalWidth,innerHeight/im.naturalHeight),w=im.naturalWidth*scale,h=im.naturalHeight*scale;ctx.drawImage(im,(innerWidth-w)/2,(innerHeight-h)/2,w,h)}
function setLoad(v){const n=Math.max(0,Math.min(100,Math.round(v)));if(bar)bar.style.width=n+'%';if(pct)pct.textContent=n+'%'}
function load(i){if(frames[i])return Promise.resolve(true);return new Promise(resolve=>{const im=new Image();im.decoding='async';im.onload=()=>{frames[i]=im;resolve(true)};im.onerror=()=>resolve(false);im.src=path(i)})}
function createParticles(){const layer=document.getElementById('particles');if(!layer)return;for(let i=0;i<55;i++){const d=document.createElement('i');d.className='particleDot';d.style.left=Math.random()*100+'%';d.style.top=Math.random()*100+'%';d.style.animationDelay=(-Math.random()*6)+'s';d.style.animationDuration=(4+Math.random()*5)+'s';if(i%3===0)d.style.color='#8f7cff';layer.appendChild(d)}}
async function boot(){
 createParticles();
 const first=await Promise.race([load(0),new Promise(r=>setTimeout(()=>r(false),1200))]);
 if(first)draw(0);else{ctx?.fillRect(0,0,innerWidth,innerHeight)}
 setLoad(first?8:4);loader?.classList.add('hide');document.documentElement.classList.remove('loading');document.body.classList.remove('loading');
 // Progressive background cache: small batches, yielding to the browser between batches.
 let done=0;for(let start=1;start<TOTAL;start+=8){const batch=[];for(let i=start;i<Math.min(start+8,TOTAL);i++)batch.push(load(i));await Promise.all(batch);done+=batch.length;if(done%24===0)setLoad(8+done/(TOTAL-1)*92);await new Promise(r=>setTimeout(r,0))}setLoad(100);
}
function scrollFrame(){if(!hero)return;const max=Math.max(1,hero.offsetHeight-innerHeight),p=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/max)),target=Math.round(p*(TOTAL-1));if(target!==current){current=target;if(!drawRAF)drawRAF=requestAnimationFrame(()=>{draw(current);drawRAF=0})}}
addEventListener('resize',resize,{passive:true});addEventListener('scroll',scrollFrame,{passive:true});resize();boot();
