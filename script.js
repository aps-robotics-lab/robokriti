(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));

  // ---------- preloader ----------
  const preloader = $('#preloader');
  const loaderBar = $('#loaderBar');
  const loaderText = $('#loaderText');
  let progress = 0;
  const loaderTimer = setInterval(() => {
    progress = Math.min(100, progress + Math.ceil(Math.random() * 14));
    if (loaderBar) loaderBar.style.width = `${progress}%`;
    if (loaderText) loaderText.textContent = `BOOTING ARENA ${String(progress).padStart(2, '0')}%`;
    if (progress >= 100) {
      clearInterval(loaderTimer);
      setTimeout(() => {
        if (preloader) {
          preloader.style.opacity = '0';
          preloader.style.visibility = 'hidden';
        }
      }, 220);
    }
  }, 55);

  // ---------- mobile navigation ----------
  const menuButton = $('#menuButton');
  const mobileMenu = $('#mobileMenu');
  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };
  menuButton?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuButton.classList.toggle('active', open);
    menuButton.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (mobileMenu?.classList.contains('open') && !mobileMenu.contains(e.target) && !menuButton?.contains(e.target)) closeMenu();
  });

  // ---------- nav + hero scroll choreography ----------
  const nav = $('#siteNav');
  const hero = $('#hero');
  const heroContent = $('.hero-content');
  const heroVideo = $('.hero-video');
  const progressBar = $('#progressBar');
  const frameNow = $('#frameNow');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    nav?.classList.toggle('scrolled', y > 40);
    if (hero) {
      const distance = Math.max(1, hero.offsetHeight - window.innerHeight);
      const p = clamp(y / distance);
      if (progressBar) progressBar.style.height = `${p * 100}%`;
      if (heroContent) {
        heroContent.style.transform = `translate3d(0, ${-p * 95}px, 0) scale(${1 - p * .035})`;
        heroContent.style.opacity = String(1 - p * .82);
      }
      if (heroVideo) heroVideo.style.transform = `scale(${1.03 + p * .06}) translateY(${p * 2}%)`;
      if (frameNow) frameNow.textContent = String(Math.round(1 + p * 299)).padStart(3, '0');
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  // ---------- intersection reveals ----------
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  $$('.signal .wrap > *, .events .wrap > *, .mission-visual .wrap > *, .messages .wrap > *, .countdown-section .wrap > *, .faq .wrap > *, .final-cta .wrap > *').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ---------- event card spotlight / tilt ----------
  $$('.event-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      const rx = (50 - (e.clientY - r.top) / r.height * 100) * .035;
      const ry = ((e.clientX - r.left) / r.width * 100 - 50) * .045;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  // ---------- FAQ ----------
  $$('.faq-item button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      $$('.faq-item.open').forEach(other => other.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---------- countdown ----------
  $$('.countdown').forEach(clock => {
    const deadline = new Date(clock.dataset.deadline || '2026-09-03T23:59:59+05:30').getTime();
    const update = () => {
      let diff = Math.max(0, deadline - Date.now());
      const days = Math.floor(diff / 86400000); diff %= 86400000;
      const hours = Math.floor(diff / 3600000); diff %= 3600000;
      const minutes = Math.floor(diff / 60000); diff %= 60000;
      const seconds = Math.floor(diff / 1000);
      const values = { days, hours, minutes, seconds };
      Object.entries(values).forEach(([unit, value]) => {
        const el = $(`[data-unit="${unit}"]`, clock);
        if (el) el.textContent = String(value).padStart(2, '0');
      });
    };
    update();
    setInterval(update, 1000);
  });

  // ---------- lightweight particle field ----------
  const canvas = $('#particleCanvas');
  const ctx = canvas?.getContext('2d');
  if (canvas && ctx) {
    let particles = [];
    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(65, Math.max(28, Math.floor(w / 18)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16,
        r: Math.random() * 1.3 + .35, a: Math.random() * .45 + .12
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(66,232,255,${p.a})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize(); window.addEventListener('resize', resize, { passive: true }); draw();
  }
})();
