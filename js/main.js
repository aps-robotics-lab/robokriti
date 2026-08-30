(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page || '';
  const deadline = new Date('2026-09-03T23:59:59+05:30');

  document.documentElement.classList.add('js');
  const header = $('.site-header');
  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('.mobile-menu');
  menuToggle?.addEventListener('click', () => mobileMenu?.classList.toggle('open'));
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 30), {passive:true});

  // Active navigation + close mobile menu.
  $$(`[data-nav="${page}"]`).forEach(a => a.classList.add('active'));
  $$('.mobile-menu a').forEach(a => a.addEventListener('click',()=>mobileMenu?.classList.remove('open')));

  // Reveal motion.
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }), {threshold:.12});
  $$('.reveal,.stagger').forEach(el => io.observe(el));

  // Cursor light on capable devices.
  if (matchMedia('(pointer:fine)').matches) {
    const glow=document.createElement('div'); glow.className='cursor-glow'; document.body.appendChild(glow);
    window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
  }

  // Lightweight page transition.
  $$('a[href]').forEach(a => {
    const href=a.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || a.target==='_blank') return;
    a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();document.body.style.opacity='.35';setTimeout(()=>location.href=href,180)});
  });

  // Countdown.
  function tick(){
    const diff=Math.max(0,deadline-Date.now());
    const days=Math.floor(diff/86400000), hrs=Math.floor(diff/3600000)%24, mins=Math.floor(diff/60000)%60, secs=Math.floor(diff/1000)%60;
    ['days','hours','minutes','seconds'].forEach((k,i)=>{const el=$(`[data-countdown="${k}"]`);if(el)el.textContent=String([days,hrs,mins,secs][i]).padStart(2,'0')});
    const closed=diff<=0; $$('[data-registration-cta]').forEach(el=>{el.classList.toggle('hidden',closed)});
    $$('[data-registration-closed]').forEach(el=>{el.classList.toggle('hidden',!closed)});
  }
  tick(); setInterval(tick,1000);

  // External Firebase scripts load before this file on pages that need them.
  window.RoboUI={toast(message,type=''){
    let t=$('.toast'); if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}
    t.textContent=message;t.className='toast show '+type;setTimeout(()=>t.classList.remove('show'),4200);
  }, deadline};
})();
