/* =========================================================
   ROBO KRITI 2026 — FINAL HOME
   Premium Futuristic / Clean / Minimal / Interactive
========================================================= */

:root{
  --bg:#05070b;
  --bg-soft:#080c11;
  --surface:#0b1016;

  --text:#edf5f7;
  --muted:#8b989f;
  --dim:#56636a;

  --cyan:#48e7ff;
  --cyan-soft:rgba(72,231,255,.12);

  --orange:#ff7a38;
  --orange-soft:rgba(255,122,56,.12);

  --purple:#9b7cff;

  --line:rgba(255,255,255,.12);
  --line-soft:rgba(255,255,255,.065);

  --display:"Space Grotesk",sans-serif;
  --body:"Manrope",sans-serif;
  --mono:"DM Mono",monospace;
  --creative:"Syne",sans-serif;

  --ease:cubic-bezier(.16,1,.3,1);
}

*{
  box-sizing:border-box;
}

html{
  scroll-behavior:smooth;
  background:var(--bg);
}

body{
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:var(--body);
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

body.menu-open{
  overflow:hidden;
}

a{
  color:inherit;
  text-decoration:none;
}

button{
  font:inherit;
}

img{
  max-width:100%;
}

::selection{
  background:var(--cyan);
  color:var(--bg);
}


/* =========================================================
   PRELOADER
========================================================= */

#preloader{
  position:fixed;
  inset:0;
  z-index:9999;
  display:grid;
  place-items:center;
  background:#05070b;
  transition:
    opacity .8s var(--ease),
    visibility .8s;
}

#preloader.loaded{
  opacity:0;
  visibility:hidden;
  pointer-events:none;
}

.preloader-inner{
  width:min(520px,82vw);
}

.preloader-topline,
.preloader-bottom,
.preloader-status{
  display:flex;
  justify-content:space-between;
  gap:20px;
  font:500 8px var(--mono);
  letter-spacing:1.6px;
  color:#66747b;
}

.preloader-brand{
  margin:25px 0 24px;
  font:800 clamp(48px,10vw,82px)/.8 var(--creative);
  letter-spacing:-.09em;
}

.preloader-brand span{
  color:var(--cyan);
}

.preloader-status{
  margin-bottom:9px;
  color:#89969d;
}

.loader-line{
  height:2px;
  background:#151d23;
  overflow:hidden;
}

.loader-line i{
  display:block;
  width:0;
  height:100%;
  background:linear-gradient(
    90deg,
    var(--cyan),
    var(--purple),
    var(--orange)
  );
  transition:width .15s linear;
}

.preloader-bottom{
  margin-top:12px;
}


/* =========================================================
   NAVIGATION
========================================================= */

.nav{
  position:fixed;
  z-index:1000;
  top:0;
  left:0;
  right:0;

  height:78px;
  padding:
    0
    clamp(20px,4vw,64px);

  display:flex;
  align-items:center;
  justify-content:space-between;

  background:
    linear-gradient(
      180deg,
      rgba(5,7,11,.92),
      rgba(5,7,11,.45),
      transparent
    );

  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);

  transition:
    height .4s var(--ease),
    background .4s var(--ease);
}

.nav.scrolled{
  height:64px;
  background:rgba(5,7,11,.84);
}

.brand{
  display:flex;
  align-items:center;
  gap:12px;
}

.brand-logo{
  width:34px;
  height:34px;
  object-fit:contain;
  mix-blend-mode:screen;
  filter:
    brightness(1.08)
    contrast(1.08);
}

.brand-divider{
  width:1px;
  height:20px;
  background:var(--line);
}

.brand-text{
  display:flex;
  align-items:baseline;
  gap:7px;
}

.brand-text strong{
  font:700 12px var(--display);
  letter-spacing:.8px;
}

.brand-text b{
  color:var(--cyan);
}

.brand-text small{
  font:500 9px var(--mono);
  color:#68757c;
}

.nav-links{
  display:flex;
  align-items:center;
  gap:30px;
}

.nav-links a{
  position:relative;

  font:600 9px var(--mono);
  letter-spacing:1.5px;
  color:#7d8a91;

  transition:
    color .25s ease;
}

.nav-links a::after{
  content:"";
  position:absolute;
  left:0;
  right:100%;
  bottom:-7px;
  height:1px;
  background:var(--cyan);

  transition:right .3s var(--ease);
}

.nav-links a:hover,
.nav-links a.active{
  color:#fff;
}

.nav-links a:hover::after,
.nav-links a.active::after{
  right:0;
}

.menu{
  width:42px;
  height:42px;

  display:none;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap:5px;

  border:0;
  background:transparent;
  color:#fff;
  cursor:pointer;
}

.menu span{
  display:block;
  width:23px;
  height:1px;
  background:#fff;
  transition:
    transform .35s var(--ease),
    opacity .25s ease;
}

.menu.active span:nth-child(1){
  transform:translateY(6px) rotate(45deg);
}

.menu.active span:nth-child(2){
  opacity:0;
}

.menu.active span:nth-child(3){
  transform:translateY(-6px) rotate(-45deg);
}


/* =========================================================
   MOBILE MENU
========================================================= */

.mobile-menu{
  position:fixed;
  z-index:900;

  top:0;
  right:0;

  width:min(360px,88vw);
  height:100svh;

  padding:
    100px 30px 30px;

  display:flex;
  flex-direction:column;

  background:
    radial-gradient(
      circle at 80% 15%,
      rgba(72,231,255,.1),
      transparent 35%
    ),
    #070b10;

  border-left:1px solid var(--line);

  transform:translateX(105%);
  transition:transform .6s var(--ease);

  box-shadow:-30px 0 80px rgba(0,0,0,.35);

  pointer-events:none;
}

.mobile-menu.open{
  transform:translateX(0);
  pointer-events:auto;
}

.mobile-menu-head{
  display:flex;
  justify-content:space-between;

  font:500 8px var(--mono);
  letter-spacing:1.5px;
  color:#66747b;
}

.mobile-menu nav{
  display:flex;
  flex-direction:column;
  margin-top:65px;
}

.mobile-menu nav a{
  display:flex;
  align-items:center;
  gap:20px;

  padding:18px 0;

  border-bottom:1px solid var(--line-soft);

  font:700 clamp(25px,7vw,38px) var(--display);
  letter-spacing:-.05em;

  transition:
    color .25s ease,
    padding-left .3s var(--ease);
}

.mobile-menu nav a span{
  width:28px;
  font:500 8px var(--mono);
  color:var(--cyan);
}

.mobile-menu nav a:hover{
  color:var(--cyan);
  padding-left:8px;
}

.mobile-menu-footer{
  margin-top:auto;

  font:500 8px var(--mono);
  letter-spacing:1.5px;
  color:#56636a;
}


/* =========================================================
   GLOBAL
========================================================= */

section{
  position:relative;
}

.section-index{
  margin:0 0 25px;

  font:500 9px var(--mono);
  letter-spacing:2px;
  color:var(--cyan);
}

.section-index::before{
  content:"";
  display:inline-block;

  width:22px;
  height:1px;

  margin-right:9px;

  vertical-align:middle;

  background:linear-gradient(
    90deg,
    var(--cyan),
    var(--orange)
  );
}

.section-top{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:50px;

  margin-bottom:75px;
}

.section-top h2,
.mission h2,
.experience h2,
.eligibility h2,
.countdown-content h2,
.register-content h2{
  margin:0;

  font:700 clamp(54px,8vw,118px)/.84 var(--display);
  letter-spacing:-.075em;
}

.section-top h2 span,
.mission h2 span,
.experience h2 span,
.eligibility h2 span,
.countdown-content h2 span,
.register-content h2 span{
  display:block;
  color:#647179;
}

.section-description{
  max-width:330px;
  margin:0;

  color:#849198;

  font-size:12px;
  line-height:1.8;
}


/* =========================================================
   HERO
========================================================= */

.hero{
  height:200vh;
  position:relative;
}

.hero-visual{
  position:sticky;
  top:0;

  width:100%;
  height:100vh;

  overflow:hidden;

  background:#05070b;
}

.hero-visual canvas{
  position:absolute;
  inset:0;

  width:100%;
  height:100%;

  display:block;
}

.hero-grid{
  position:absolute;
  inset:0;

  opacity:.12;

  background-image:
    linear-gradient(
      rgba(72,231,255,.08) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(72,231,255,.08) 1px,
      transparent 1px
    );

  background-size:
    80px 80px;

  mask-image:
    linear-gradient(
      to bottom,
      transparent,
      black 30%,
      black 70%,
      transparent
    );

  pointer-events:none;
}

.scanlines{
  position:absolute;
  inset:0;

  opacity:.035;

  background:
    repeating-linear-gradient(
      0deg,
      transparent 0 4px,
      #fff 5px
    );

  pointer-events:none;
}

.vignette{
  position:absolute;
  inset:0;

  background:
    radial-gradient(
      circle at 50% 46%,
      transparent 15%,
      rgba(5,7,11,.15) 55%,
      rgba(5,7,11,.9) 100%
    );

  pointer-events:none;
}

.hero-glow{
  position:absolute;
  width:300px;
  height:300px;

  border-radius:50%;

  filter:blur(80px);
  opacity:.08;

  pointer-events:none;
}

.hero-glow-one{
  left:5%;
  bottom:15%;
  background:var(--cyan);
}

.hero-glow-two{
  right:5%;
  top:25%;
  background:var(--orange);
}

.hero-hud{
  position:absolute;
  z-index:5;

  top:104px;
  left:clamp(20px,4vw,64px);
  right:clamp(20px,4vw,64px);

  display:flex;
  justify-content:space-between;
  align-items:center;

  font:500 8px var(--mono);
  letter-spacing:1.7px;
  color:#87959c;
}

.hud-status{
  display:flex;
  align-items:center;
  gap:8px;
}

.hud-status i,
.countdown-status i{
  width:5px;
  height:5px;
  display:inline-block;

  border-radius:50%;

  background:var(--cyan);

  box-shadow:0 0 14px var(--cyan);

  animation:statusPulse 1.8s infinite;
}

@keyframes statusPulse{
  0%,100%{
    opacity:.35;
  }
  50%{
    opacity:1;
  }
}

.hero-copy{
  position:absolute;
  z-index:6;

  left:clamp(20px,7vw,112px);
  top:50%;

  max-width:760px;

  transform:translateY(-50%);

  text-shadow:
    0 4px 35px rgba(0,0,0,.7);
}

.hero-serial{
  margin-bottom:18px;

  font:500 8px var(--mono);
  letter-spacing:2.5px;
  color:#9aa7ad;
}

.hero-serial span{
  display:inline-block;

  width:34px;
  height:1px;

  margin:
    0 9px;

  vertical-align:middle;

  background:
    linear-gradient(
      90deg,
      var(--cyan),
      var(--orange)
    );
}

.eyebrow{
  margin:0 0 16px;

  font:600 9px var(--mono);
  letter-spacing:2px;
  color:var(--cyan);
}

.eyebrow span{
  color:var(--orange);
}

.hero-copy h1{
  margin:0;
  line-height:.7;
  letter-spacing:-.07em;
}

.robo-word{
  display:block;

  font:700 clamp(48px,7vw,96px)/.9 var(--display);
  letter-spacing:.04em;
  color:#e8f1f3;
}

.kriti-word{
  display:block;

  font:800 clamp(84px,14vw,190px)/.72 var(--creative);
  letter-spacing:-.1em;

  background:
    linear-gradient(
      105deg,
      #f3f7f8 0%,
      #c8d0d4 42%,
      #ff8950 72%,
      #9b7cff 100%
    );

  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;

  filter:
    drop-shadow(
      0 12px 30px rgba(255,122,56,.1)
    );
}

.hero-copy h1 em{
  display:block;

  margin:
    25px 0 0 7px;

  font:700 clamp(17px,2.5vw,30px)/1 var(--display);
  letter-spacing:.38em;
  color:var(--cyan);

  font-style:normal;
}

.title-rule{
  display:flex;
  align-items:center;
  gap:10px;

  margin:
    24px 0 0 8px;

  font:500 8px var(--mono);
  letter-spacing:1.6px;
  color:#78858b;
}

.title-rule i{
  width:55px;
  height:1px;

  background:
    linear-gradient(
      90deg,
      var(--orange),
      var(--cyan)
    );
}

.tagline{
  margin:
    28px 0 8px;

  font:700 clamp(16px,2vw,23px) var(--display);
  letter-spacing:-.02em;
}

.subline{
  max-width:500px;

  margin:0;

  color:#aeb9bd;

  font-size:12px;
  line-height:1.75;
}

.hero-actions{
  display:flex;
  flex-wrap:wrap;
  gap:12px;

  margin-top:28px;
}

.cta{
  position:relative;

  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:18px;

  padding:14px 19px;

  border:1px solid var(--line);

  font:700 9px var(--mono);
  letter-spacing:1.3px;

  overflow:hidden;

  transition:
    transform .35s var(--ease),
    border-color .25s ease,
    color .25s ease,
    background .25s ease;
}

.cta::before{
  content:"";

  position:absolute;
  inset:0;

  background:
    linear-gradient(
      110deg,
      var(--cyan),
      var(--purple)
    );

  transform:translateY(105%);

  transition:transform .45s var(--ease);

  z-index:-1;
}

.cta:hover{
  transform:translateY(-3px);
  border-color:var(--cyan);
}

.cta:hover::before{
  transform:translateY(0);
}

.cta.primary{
  background:#edf5f7;
  color:#05070b;
  border-color:#edf5f7;
}

.cta.primary::before{
  background:var(--cyan);
}

.cta.ghost{
  background:rgba(5,7,11,.25);
  color:#d7e0e3;
}

.cta span{
  font-size:14px;
}

.hero-data{
  position:absolute;
  z-index:6;

  left:clamp(20px,4vw,64px);
  right:clamp(20px,4vw,64px);
  bottom:55px;

  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:25px;

  padding-top:15px;

  border-top:1px solid var(--line);
}

.hero-data div{
  display:grid;
  gap:7px;
}

.hero-data small{
  font:500 8px var(--mono);
  letter-spacing:1.4px;
  color:#718087;
}

.hero-data strong{
  font:600 10px var(--mono);
  letter-spacing:1px;
}

.scroll-cue{
  position:absolute;
  z-index:6;

  right:clamp(20px,4vw,64px);
  bottom:58px;

  display:flex;
  align-items:center;
  gap:10px;

  color:#89969d;

  font:500 8px var(--mono);
  letter-spacing:1.3px;

  writing-mode:vertical-rl;
}

.scroll-cue span{
  width:1px;
  height:45px;

  background:
    linear-gradient(
      var(--cyan),
      transparent
    );
}

.frame-counter{
  position:absolute;
  z-index:6;

  right:clamp(20px,4vw,64px);
  top:50%;

  font:500 10px var(--mono);
  letter-spacing:1px;
}

.frame-counter i{
  margin:0 6px;
  color:#536067;
  font-style:normal;
}

.progress{
  position:absolute;
  z-index:10;

  top:0;
  right:0;

  width:2px;
  height:100%;

  background:#151d23;
}

.progress i{
  display:block;

  width:100%;
  height:0;

  background:
    linear-gradient(
      var(--cyan),
      var(--purple),
      var(--orange)
    );
}


/* =========================================================
   MISSION
========================================================= */

.mission{
  min-height:90vh;

  display:grid;
  grid-template-columns:1fr 1fr;
  align-items:center;

  gap:8vw;

  padding:
    16vh
    clamp(24px,8vw,130px);

  border-top:1px solid var(--line);

  background:
    radial-gradient(
      circle at 10% 40%,
      rgba(72,231,255,.035),
      transparent 30%
    ),
    var(--bg-soft);
}

.mission-copy{
  max-width:480px;
}

.mission-copy .kicker{
  margin:0 0 25px;

  font:600 9px var(--mono);
  letter-spacing:1.7px;
  color:var(--orange);
}

.mission-copy > p:not(.kicker){
  margin:0 0 20px;

  color:#9aa7ad;

  font-size:14px;
  line-height:1.9;
}

.mission-line{
  display:flex;
  align-items:center;
  gap:12px;

  margin-top:35px;

  font:500 8px var(--mono);
  letter-spacing:1.4px;
  color:#68757c;
}

.mission-line span{
  width:42px;
  height:1px;

  background:
    linear-gradient(
      90deg,
      var(--cyan),
      var(--orange)
    );
}


/* =========================================================
   ARENA
========================================================= */

.arena{
  padding:
    16vh
    clamp(24px,8vw,130px);

  background:#06090d;

  border-top:1px solid var(--line);
}

.event-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:1px;

  background:var(--line);

  perspective:1600px;
}

.event-card{
  position:relative;

  min-height:560px;

  padding:30px;

  display:flex;
  flex-direction:column;
  justify-content:space-between;

  overflow:hidden;

  background:#080d12;

  border:0;

  transform-style:preserve-3d;

  transition:
    transform .5s var(--ease),
    background .4s ease;
}

.event-card:hover{
  background:#0a1117;
}

.event-card-bg{
  position:absolute;
  inset:0;

  opacity:0;

  transition:opacity .5s ease;

  pointer-events:none;
}

.event-card-race .event-card-bg{
  background:
    radial-gradient(
      circle at 80% 30%,
      rgba(72,231,255,.14),
      transparent 35%
    );
}

.event-card-war .event-card-bg{
  background:
    radial-gradient(
      circle at 20% 70%,
      rgba(255,122,56,.13),
      transparent 35%
    );
}

.event-card-tug .event-card-bg{
  background:
    radial-gradient(
      circle at 80% 75%,
      rgba(155,124,255,.14),
      transparent 35%
    );
}

.event-card-soccer .event-card-bg{
  background:
    radial-gradient(
      circle at 25% 25%,
      rgba(72,231,255,.11),
      transparent 35%
    );
}

.event-card:hover .event-card-bg{
  opacity:1;
}

.event-card-top,
.event-card-bottom{
  position:relative;
  z-index:2;

  display:flex;
  justify-content:space-between;

  font:500 8px var(--mono);
  letter-spacing:1.6px;
  color:#68757c;
}

.event-card-top span:first-child{
  color:var(--cyan);
}

.event-card-icon{
  position:absolute;
  top:50%;
  right:35px;

  width:70px;
  height:70px;

  display:grid;
  place-items:center;

  border:1px solid rgba(255,255,255,.13);

  border-radius:50%;

  color:var(--cyan);

  transform:
    translateY(-50%)
    translateZ(35px);

  transition:
    transform .6s var(--ease),
    border-color .3s ease;
}

.event-card-icon::before,
.event-card-icon::after{
  content:"";

  position:absolute;

  width:100%;
  height:100%;

  border:1px solid rgba(72,231,255,.12);
  border-radius:50%;
}

.event-card-icon::before{
  transform:scale(1.3);
  opacity:.5;
}

.event-card-icon::after{
  transform:scale(1.65);
  opacity:.2;
}

.event-card:hover .event-card-icon{
  transform:
    translateY(-50%)
    translateZ(70px)
    rotate(12deg);

  border-color:var(--cyan);
}

.event-card-content{
  position:relative;
  z-index:3;

  transform:translateZ(45px);
}

.event-card-content > p:first-child{
  margin:0 0 15px;

  font:500 8px var(--mono);
  letter-spacing:1.5px;
  color:#68757c;
}

.event-card h3{
  margin:0;

  font:700 clamp(45px,6vw,80px)/.78 var(--display);
  letter-spacing:-.075em;
}

.event-card h3 span{
  color:#707d84;
}

.event-description{
  max-width:350px;

  margin:28px 0 0;

  color:#87949a;

  font-size:12px;
  line-height:1.75;
}

.event-card-bottom{
  transform:translateZ(25px);
}

.event-card-bottom span:last-child{
  color:#b7c2c6;
}

.arena-note{
  display:flex;
  align-items:center;
  justify-content:space-between;

  margin-top:35px;

  color:#5f6c73;

  font:500 8px var(--mono);
  letter-spacing:1.3px;
}

.arena-note p{
  margin:0;
  color:#7c898f;
}


/* =========================================================
   EXPERIENCE
========================================================= */

.experience{
  display:grid;
  grid-template-columns:.8fr 1.2fr;
  gap:8vw;

  padding:
    17vh
    clamp(24px,8vw,130px);

  background:var(--bg);

  border-top:1px solid var(--line);
}

.experience-intro{
  max-width:500px;
}

.experience-intro > p:last-child{
  max-width:390px;

  margin-top:35px;

  color:#87949a;

  font-size:13px;
  line-height:1.85;
}

.experience-list{
  border-top:1px solid var(--line);
}

.experience-item{
  display:grid;
  grid-template-columns:45px 1fr 30px;
  align-items:center;
  gap:20px;

  min-height:135px;

  border-bottom:1px solid var(--line);

  transition:
    padding .4s var(--ease),
    background .4s ease;
}

.experience-item:hover{
  padding-left:15px;
  background:linear-gradient(
    90deg,
    rgba(72,231,255,.04),
    transparent
  );
}

.experience-item > span{
  font:500 8px var(--mono);
  color:var(--cyan);
}

.experience-item h3{
  margin:0 0 9px;

  font:700 31px var(--display);
  letter-spacing:-.04em;
}

.experience-item p{
  max-width:440px;

  margin:0;

  color:#758289;

  font-size:11px;
  line-height:1.7;
}

.experience-item > strong{
  color:#66747b;
  transition:
    color .25s ease,
    transform .35s var(--ease);
}

.experience-item:hover > strong{
  color:var(--cyan);
  transform:translate(4px,-4px);
}


/* =========================================================
   ELIGIBILITY
========================================================= */

.eligibility{
  min-height:80vh;

  display:grid;
  place-items:center;

  padding:
    15vh
    clamp(24px,8vw,130px);

  overflow:hidden;

  background:
    radial-gradient(
      circle at 50% 50%,
      rgba(72,231,255,.06),
      transparent 42%
    ),
    #070b10;

  border-top:1px solid var(--line);
}

.eligibility-glow{
  position:absolute;

  width:500px;
  height:500px;

  border:1px solid rgba(72,231,255,.08);
  border-radius:50%;

  box-shadow:
    0 0 0 80px rgba(72,231,255,.015),
    0 0 0 160px rgba(72,231,255,.01);

  animation:orbit 16s linear infinite;
}

@keyframes orbit{
  to{
    transform:rotate(360deg);
  }
}

.eligibility-content{
  position:relative;
  z-index:2;

  max-width:950px;

  text-align:center;
}

.eligibility-content .section-index{
  text-align:center;
}

.eligibility-content h2{
  max-width:1000px;
}

.eligibility-content > p:not(.section-index){
  max-width:610px;

  margin:40px auto 0;

  color:#8d9aa0;

  font-size:13px;
  line-height:1.9;
}

.eligibility-tags{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:8px;

  margin-top:32px;
}

.eligibility-tags span{
  padding:9px 12px;

  border:1px solid var(--line);

  color:#8b989f;

  font:500 8px var(--mono);
  letter-spacing:1.1px;
}


/* =========================================================
   MESSAGES
========================================================= */

.messages{
  padding:
    16vh
    clamp(24px,8vw,130px);

  background:#06090d;

  border-top:1px solid var(--line);
}

.message-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:1px;

  background:var(--line);
}

.message-card{
  position:relative;

  min-height:560px;

  padding:45px;

  display:flex;
  flex-direction:column;

  overflow:hidden;

  background:#080d12;
}

.message-card::after{
  content:"";

  position:absolute;

  right:-80px;
  bottom:-100px;

  width:260px;
  height:260px;

  border-radius:50%;

  background:var(--cyan);

  filter:blur(100px);

  opacity:.04;
}

.message-card-alt::after{
  background:var(--orange);
}

.message-card-number{
  font:500 8px var(--mono);
  letter-spacing:1.5px;
  color:#59666d;
}

.message-card-content{
  margin-top:auto;
}

.message-card-content > span{
  font:600 8px var(--mono);
  letter-spacing:1.7px;
  color:var(--cyan);
}

.message-card-alt .message-card-content > span{
  color:var(--orange);
}

.message-card h3{
  max-width:600px;

  margin:18px 0 25px;

  font:700 clamp(36px,5vw,65px)/.9 var(--display);
  letter-spacing:-.065em;
}

.message-card p{
  max-width:470px;

  margin:0;

  color:#87949a;

  font-size:12px;
  line-height:1.85;
}

.message-signature{
  display:flex;
  align-items:center;
  gap:12px;

  margin-top:35px;
}

.message-signature span{
  width:30px;
  height:1px;

  background:
    linear-gradient(
      90deg,
      var(--cyan),
      transparent
    );
}

.message-card-alt .message-signature span{
  background:
    linear-gradient(
      90deg,
      var(--orange),
      transparent
    );
}

.message-signature strong{
  font:600 8px var(--mono);
  letter-spacing:1.2px;
  color:#66747b;
}


/* =========================================================
   COUNTDOWN
========================================================= */

.countdown-section{
  min-height:80vh;

  display:grid;
  place-items:center;

  padding:
    14vh
    24px;

  overflow:hidden;

  border-top:1px solid var(--line);

  background:
    radial-gradient(
      circle at 50% 50%,
      rgba(72,231,255,.07),
      transparent 30%
    ),
    #05070b;
}

.countdown-orbit{
  position:absolute;

  width:min(700px,90vw);
  aspect-ratio:1;

  border:1px solid rgba(72,231,255,.08);
  border-radius:50%;

  animation:slowRotate 25s linear infinite;
}

.countdown-orbit::before,
.countdown-orbit::after{
  content:"";

  position:absolute;

  border-radius:50%;
}

.countdown-orbit::before{
  width:8px;
  height:8px;

  top:20%;
  right:8%;

  background:var(--cyan);
  box-shadow:0 0 25px var(--cyan);
}

.countdown-orbit::after{
  width:5px;
  height:5px;

  left:13%;
  bottom:25%;

  background:var(--orange);
  box-shadow:0 0 20px var(--orange);
}

@keyframes slowRotate{
  to{
    transform:rotate(360deg);
  }
}

.countdown-content{
  position:relative;
  z-index:2;

  text-align:center;
}

.countdown-content .section-index{
  text-align:center;
}

.countdown-content > p:not(.section-index){
  color:#849198;
  font-size:12px;
}

.countdown-content > p strong{
  color:#e8f0f2;
}

.countdown{
  display:flex;
  align-items:center;
  justify-content:center;

  margin-top:55px;
}

.countdown-unit{
  min-width:110px;
}

.countdown-unit strong{
  display:block;

  font:700 clamp(42px,7vw,82px)/.9 var(--display);
  letter-spacing:-.06em;
}

.countdown-unit span{
  display:block;

  margin-top:10px;

  font:500 7px var(--mono);
  letter-spacing:1.5px;
  color:#69767d;
}

.countdown-separator{
  margin:0 8px 20px;

  color:var(--cyan);

  font:400 25px var(--mono);
}

.countdown-status{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:9px;

  margin-top:38px;

  font:500 8px var(--mono);
  letter-spacing:1.5px;
  color:#69767d;
}


/* =========================================================
   FAQ
========================================================= */

.faq-section{
  padding:
    16vh
    clamp(24px,8vw,130px);

  background:#070a0e;

  border-top:1px solid var(--line);
}

.faq-list{
  border-top:1px solid var(--line);
}

.faq-item{
  border-bottom:1px solid var(--line);
}

.faq-item summary{
  min-height:100px;

  display:grid;
  grid-template-columns:45px 1fr 30px;
  align-items:center;
  gap:20px;

  list-style:none;
  cursor:pointer;

  font:600 clamp(15px,2vw,21px) var(--display);
  letter-spacing:-.02em;

  transition:
    color .25s ease,
    padding .35s var(--ease);
}

.faq-item summary::-webkit-details-marker{
  display:none;
}

.faq-item summary span{
  font:500 8px var(--mono);
  color:var(--cyan);
}

.faq-item summary i{
  font-style:normal;

  color:#68757c;

  font-size:20px;

  transition:
    transform .35s var(--ease),
    color .25s ease;
}

.faq-item[open] summary{
  color:#fff;
}

.faq-item[open] summary i{
  transform:rotate(45deg);
  color:var(--cyan);
}

.faq-answer{
  padding:
    0
    65px
    30px;

  animation:faqOpen .45s var(--ease);
}

@keyframes faqOpen{
  from{
    opacity:0;
    transform:translateY(-8px);
  }

  to{
    opacity:1;
    transform:none;
  }
}

.faq-answer p{
  max-width:650px;

  margin:0;

  color:#7e8b92;

  font-size:12px;
  line-height:1.85;
}


/* =========================================================
   REGISTER
========================================================= */

.register{
  min-height:90vh;

  display:grid;
  place-items:center;

  padding:
    15vh
    clamp(24px,8vw,130px);

  overflow:hidden;

  border-top:1px solid var(--line);
}

.register-background{
  position:absolute;
  inset:0;
}

.register-grid{
  position:absolute;
  inset:0;

  opacity:.1;

  background-image:
    linear-gradient(
      rgba(72,231,255,.08) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(72,231,255,.08) 1px,
      transparent 1px
    );

  background-size:70px 70px;

  mask-image:
    radial-gradient(
      circle at center,
      black,
      transparent 70%
    );
}

.register-orb{
  position:absolute;

  width:400px;
  height:400px;

  left:50%;
  top:50%;

  transform:translate(-50%,-50%);

  border:1px solid rgba(72,231,255,.1);
  border-radius:50%;

  box-shadow:
    0 0 100px rgba(72,231,255,.04),
    inset 0 0 80px rgba(72,231,255,.025);

  animation:orbFloat 8s ease-in-out infinite;
}

@keyframes orbFloat{
  0%,100%{
    transform:translate(-50%,-50%) scale(1);
  }

  50%{
    transform:translate(-50%,-50%) scale(1.06);
  }
}

.register-content{
  position:relative;
  z-index:2;

  text-align:center;
}

.register-content .section-index{
  text-align:center;
}

.register-content > p:not(.section-index){
  margin:35px auto 0;

  color:#89969d;

  font-size:13px;
}

.register-button{
  margin-top:38px;
}

.register-meta{
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  gap:35px;

  margin-top:55px;
}

.register-meta span{
  display:flex;
  flex-direction:column;
  gap:6px;

  font:500 7px var(--mono);
  letter-spacing:1.3px;
  color:#5e6b72;
}

.register-meta b{
  color:#aab5b9;
  font-size:9px;
}


/* =========================================================
   FOOTER
========================================================= */

.footer{
  position:relative;

  display:grid;
  grid-template-columns:2fr 1fr 1.5fr .4fr;
  gap:50px;

  padding:
    70px
    clamp(24px,4vw,64px)
    45px;

  border-top:1px solid var(--line);

  background:#040609;
}

.footer-title{
  font:800 30px var(--creative);
  letter-spacing:-.08em;
}

.footer-title span{
  color:var(--cyan);
}

.footer-brand > p{
  margin:10px 0 20px;

  color:#68757c;

  font-size:11px;
}

.footer-brand small{
  color:#4e5a61;

  font:500 7px var(--mono);
  line-height:1.7;
}

.footer-links,
.footer-contact{
  display:flex;
  flex-direction:column;
  gap:13px;
}

.footer-links a{
  width:max-content;

  font:600 8px var(--mono);
  letter-spacing:1.3px;
  color:#78858b;

  transition:color .25s ease;
}

.footer-links a:hover{
  color:var(--cyan);
}

.footer-contact > span{
  margin-bottom:3px;

  font:500 8px var(--mono);
  letter-spacing:1.4px;
  color:#536067;
}

.footer-contact > a{
  color:#a8b3b7;

  font:600 9px var(--mono);
}

.footer-contact p{
  margin:5px 0 0;

  color:#5f6c73;

  font-size:9px;
  line-height:1.7;
}

.footer-mark{
  justify-self:end;

  font:800 30px/.7 var(--creative);
  letter-spacing:-.1em;

  color:#1d272d;
}

.footer-mark span{
  color:var(--cyan);
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

.mission,
.arena,
.experience,
.eligibility,
.messages,
.countdown-section,
.faq-section,
.register{
  opacity:0;
  transform:translateY(35px);

  transition:
    opacity .9s var(--ease),
    transform .9s var(--ease);
}

body.ready .mission,
body.ready .arena,
body.ready .experience,
body.ready .eligibility,
body.ready .messages,
body.ready .countdown-section,
body.ready .faq-section,
body.ready .register{
  opacity:1;
  transform:none;
}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

@media (pointer:fine){

  body{
    cursor:none;
  }

  a,
  button,
  summary{
    cursor:none;
  }

  .cursor-dot,
  .cursor-ring{
    position:fixed;

    top:0;
    left:0;

    z-index:10000;

    pointer-events:none;

    transform:translate(-50%,-50%);

    opacity:0;

    transition:
      opacity .25s ease;
  }

  .cursor-dot{
    width:5px;
    height:5px;

    border-radius:50%;

    background:var(--cyan);

    box-shadow:
      0 0 15px var(--cyan);
  }

  .cursor-ring{
    width:30px;
    height:30px;

    border:1px solid rgba(72,231,255,.5);

    border-radius:50%;

    transition:
      width .3s var(--ease),
      height .3s var(--ease),
      border-color .3s ease;
  }

  body.cursor-ready .cursor-dot,
  body.cursor-ready .cursor-ring{
    opacity:1;
  }

  body.cursor-hover .cursor-ring{
    width:50px;
    height:50px;
    border-color:var(--orange);
  }
}


/* =========================================================
   TABLET
========================================================= */

@media(max-width:1000px){

  .nav-links{
    gap:18px;
  }

  .nav-links a{
    font-size:8px;
  }

  .event-card{
    min-height:500px;
  }

  .event-card-icon{
    right:25px;
  }

  .experience{
    gap:50px;
  }

  .footer{
    grid-template-columns:1.5fr 1fr 1.3fr;
  }

  .footer-mark{
    display:none;
  }
}


/* =========================================================
   MOBILE
========================================================= */

@media(max-width:760px){

  .nav{
    height:66px;
    padding:0 20px;
  }

  .nav.scrolled{
    height:60px;
  }

  .brand-logo{
    width:30px;
    height:30px;
  }

  .brand-text strong{
    font-size:10px;
  }

  .brand-text small{
    font-size:7px;
  }

  .nav-links{
    display:none;
  }

  .menu{
    display:flex;
  }


  /* HERO */

  .hero{
    height:180vh;
  }

  .hero-hud{
    top:84px;

    font-size:7px;
  }

  .hero-hud > span:first-child{
    max-width:210px;
    line-height:1.5;
  }

  .hero-copy{
    top:47%;

    left:22px;
    right:22px;
  }

  .hero-copy h1{
    line-height:.74;
  }

  .robo-word{
    font-size:clamp(42px,13vw,72px);
  }

  .kriti-word{
    font-size:clamp(72px,23vw,125px);
  }

  .hero-copy h1 em{
    margin-top:20px;
    font-size:17px;
  }

  .title-rule{
    margin-top:20px;
    font-size:7px;
  }

  .tagline{
    margin-top:24px;
    font-size:16px;
  }

  .subline{
    max-width:330px;
    font-size:10px;
  }

  .hero-actions{
    margin-top:23px;
  }

  .cta{
    padding:13px 15px;
    font-size:8px;
  }

  .hero-data{
    grid-template-columns:repeat(2,1fr);
    gap:15px 20px;

    bottom:22px;
  }

  .hero-data strong{
    font-size:8px;
  }

  .scroll-cue{
    display:none;
  }

  .frame-counter{
    top:auto;
    bottom:135px;
    right:22px;
  }


  /* GLOBAL */

  .section-top{
    display:block;
    margin-bottom:50px;
  }

  .section-description{
    margin-top:30px;
  }

  .section-top h2,
  .mission h2,
  .experience h2,
  .eligibility h2,
  .countdown-content h2,
  .register-content h2{
    font-size:clamp(48px,15vw,75px);
  }


  /* MISSION */

  .mission{
    min-height:auto;

    grid-template-columns:1fr;

    gap:55px;

    padding:
      14vh
      22px;
  }

  .mission-copy > p:not(.kicker){
    font-size:12px;
  }


  /* ARENA */

  .arena{
    padding:
      14vh
      22px;
  }

  .event-grid{
    grid-template-columns:1fr;
  }

  .event-card{
    min-height:500px;
    padding:25px;
  }

  .event-card-icon{
    width:58px;
    height:58px;

    right:25px;
  }

  .event-card h3{
    font-size:clamp(48px,15vw,72px);
  }

  .event-description{
    max-width:270px;
  }

  .arena-note{
    display:grid;
    grid-template-columns:auto 1fr;
    gap:12px;
  }

  .arena-note span:last-child{
    grid-column:2;
  }


  /* EXPERIENCE */

  .experience{
    grid-template-columns:1fr;
    gap:60px;

    padding:
      14vh
      22px;
  }

  .experience-item{
    min-height:145px;
    grid-template-columns:32px 1fr 20px;
  }

  .experience-item h3{
    font-size:27px;
  }


  /* ELIGIBILITY */

  .eligibility{
    min-height:75vh;

    padding:
      14vh
      22px;
  }

  .eligibility-glow{
    width:300px;
    height:300px;
  }

  .eligibility-content > p:not(.section-index){
    font-size:11px;
  }


  /* MESSAGES */

  .messages{
    padding:
      14vh
      22px;
  }

  .message-grid{
    grid-template-columns:1fr;
  }

  .message-card{
    min-height:500px;
    padding:30px;
  }

  .message-card h3{
    font-size:42px;
  }


  /* COUNTDOWN */

  .countdown-section{
    min-height:75vh;
    padding:12vh 20px;
  }

  .countdown{
    margin-top:40px;
  }

  .countdown-unit{
    min-width:65px;
  }

  .countdown-unit strong{
    font-size:clamp(30px,9vw,52px);
  }

  .countdown-unit span{
    font-size:6px;
  }

  .countdown-separator{
    margin:
      0 2px 15px;

    font-size:17px;
  }

  .countdown-orbit{
    width:500px;
  }


  /* FAQ */

  .faq-section{
    padding:
      14vh
      22px;
  }

  .faq-item summary{
    min-height:85px;

    grid-template-columns:28px 1fr 20px;

    gap:12px;

    font-size:14px;
  }

  .faq-answer{
    padding:
      0
      32px
      25px;
  }


  /* REGISTER */

  .register{
    min-height:75vh;

    padding:
      14vh
      22px;
  }

  .register-orb{
    width:300px;
    height:300px;
  }

  .register-meta{
    gap:20px;
  }

  .register-meta span{
    font-size:6px;
  }


  /* FOOTER */

  .footer{
    grid-template-columns:1fr;
    gap:35px;

    padding:
      55px
      22px
      35px;
  }

  .footer-links{
    display:grid;
    grid-template-columns:1fr 1fr;
  }
}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media(prefers-reduced-motion:reduce){

  html{
    scroll-behavior:auto;
  }

  *,
  *::before,
  *::after{
    animation-duration:.01ms !important;
    animation-iteration-count:1 !important;
    transition-duration:.01ms !important;
  }

  .mission,
  .arena,
  .experience,
  .eligibility,
  .messages,
  .countdown-section,
  .faq-section,
  .register{
    opacity:1;
    transform:none;
  }
}
