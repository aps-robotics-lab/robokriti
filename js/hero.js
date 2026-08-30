(() => {
  const canvas=document.querySelector('[data-frame-canvas]');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const fallback=document.querySelector('.hero-video-fallback');
  const status=document.querySelector('[data-frame-status]');
  // The existing GitHub assets/frames directory is intentionally not copied or altered.
  // This loader supports the common numbered-frame conventions. If your existing frames use another
  // naming convention, set window.ROBOKRITI_FRAME_PATTERN and window.ROBOKRITI_FRAME_COUNT before hero.js.
  const pattern=window.ROBOKRITI_FRAME_PATTERN || 'assets/frames/frame_{n}.jpg';
  const count=Number(window.ROBOKRITI_FRAME_COUNT || 180);
  const pad=Number(window.ROBOKRITI_FRAME_PAD || 4);
  const frames=[]; let loaded=0,failed=0,active=0;
  const makeSrc=n=>pattern.replace('{n}',String(n).padStart(pad,'0'));
  function resize(){canvas.width=Math.floor(innerWidth*devicePixelRatio);canvas.height=Math.floor(innerHeight*devicePixelRatio);draw(active)}
  function draw(i){const img=frames[i];if(!img?.complete||!img.naturalWidth)return;const cw=canvas.width,ch=canvas.height;const scale=Math.max(cw/img.naturalWidth,ch/img.naturalHeight);const w=img.naturalWidth*scale,h=img.naturalHeight*scale;ctx.clearRect(0,0,cw,ch);ctx.drawImage(img,(cw-w)/2,(ch-h)/2,w,h);}
  function setStatus(){if(status)status.textContent=`FRAME ${String(active+1).padStart(4,'0')} / ${Math.max(loaded,1).toString().padStart(4,'0')}`}
  resize();addEventListener('resize',resize);
  // Load sequentially so a missing frame stops discovery cleanly rather than firing hundreds of requests.
  let n=1;
  function loadNext(){
    if(n>count){if(!loaded) fallback?.classList.remove('hidden');return;}
    const img=new Image(); const idx=frames.length; img.decoding='async';
    img.onload=()=>{frames.push(img);loaded++; if(idx===0){fallback?.classList.add('hidden');draw(0)};n++;loadNext()};
    img.onerror=()=>{failed++; if(loaded>0){n=count+1;setStatus()}else{n++;loadNext()}};
    img.src=makeSrc(n);
  }
  loadNext();
  function render(progress){if(!loaded)return;active=Math.min(loaded-1,Math.max(0,Math.round(progress*(loaded-1))));draw(active);setStatus()}
  const hero=document.querySelector('.hero');
  let autoStart=performance.now();
  function auto(){if(document.hidden)return;const p=((performance.now()-autoStart)/10000)%1;render(p);requestAnimationFrame(auto)}
  requestAnimationFrame(auto);
  if(hero){let last=0;addEventListener('scroll',()=>{const r=hero.getBoundingClientRect();const total=Math.max(1,hero.offsetHeight-innerHeight);const p=Math.min(1,Math.max(0,-r.top/total)); if(Math.abs(p-last)>.002){last=p;render(p);autoStart=performance.now()-(p*10000)}} ,{passive:true})}
})();
