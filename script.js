/**
 * =========================================================
 * ROBO KRITI 2026
 * FINAL HOME PAGE ENGINE
 * =========================================================
 *
 * Responsibilities:
 * - 300-frame scroll animation
 * - Frame preloading
 * - Smooth frame interpolation
 * - Responsive canvas rendering
 * - Hero choreography
 * - Registration countdown
 * - FAQ accordion
 * - Navigation state
 * - Mobile navigation
 * - Discipline interactions
 * - Magnetic CTA
 * - Section reveal
 * - Performance control
 *
 * =========================================================
 */

import {
  HOME_CONTENT,
  getFrameURL,
  getRegistrationTimeLeft,
  twoDigits
} from "./home-content.js";


/* =========================================================
   CONFIGURATION
   ========================================================= */

const TOTAL_FRAMES =
  HOME_CONTENT.frames.total;

const FRAME_FPS =
  HOME_CONTENT.frames.fps;

const FRAME_INTERVAL =
  1000 / FRAME_FPS;


/* =========================================================
   DOM
   ========================================================= */

const canvas =
  document.getElementById("frameCanvas");

const ctx =
  canvas?.getContext("2d", {
    alpha: false,
    desynchronized: true
  });

const preloader =
  document.getElementById("preloader");

const loaderBar =
  document.getElementById("loaderBar");

const loaderText =
  document.getElementById("loaderText");

const frameNow =
  document.getElementById("frameNow");

const progressBar =
  document.getElementById("progressBar");

const hero =
  document.getElementById("hero");

const heroCopy =
  document.querySelector(".hero-copy");

const heroHud =
  document.querySelector(".hero-hud");

const heroData =
  document.querySelector(".hero-data");

const scrollCue =
  document.querySelector(".scroll-cue");

const frameCounter =
  document.querySelector(".frame-counter");

const nav =
  document.getElementById("mainNav");

const menuButton =
  document.getElementById("menuButton");

const mobileMenu =
  document.getElementById("mobileMenu");


/* =========================================================
   SAFETY CHECK
   ========================================================= */

if (!canvas || !ctx || !hero) {

  console.error(
    "Robo Kriti: Required Home-page elements are missing."
  );

}


/* =========================================================
   FRAME STATE
   ========================================================= */

const images =
  new Array(TOTAL_FRAMES);

let loadedFrames = 0;

let requestedFrame = 0;

let currentFrame = 0;

let targetFrame = 0;

let lastDrawnFrame = -1;

let lastFrameDrawTime = 0;

let loadingStarted = false;

let animationStarted = false;

let ticking = false;

let resizeQueued = false;

let scrollQueued = false;


/* =========================================================
   DEVICE / CANVAS
   ========================================================= */

let dpr =
  Math.min(
    window.devicePixelRatio || 1,
    2
  );

let viewportWidth =
  window.innerWidth;

let viewportHeight =
  window.innerHeight;


/* =========================================================
   HELPERS
   ========================================================= */

const clamp = (
  value,
  min = 0,
  max = 1
) => {

  return Math.max(
    min,
    Math.min(max, value)
  );

};


const lerp = (
  a,
  b,
  amount
) => {

  return a +
    (b - a) *
    amount;

};


const easeOutCubic = value => {

  return 1 -
    Math.pow(
      1 - value,
      3
    );

};


const easeInOut = value => {

  return value < 0.5

    ? 4 * value * value * value

    : 1 -
      Math.pow(
        -2 * value + 2,
        3
      ) / 2;

};


/* =========================================================
   CANVAS RESIZE
   ========================================================= */

function resizeCanvas() {

  viewportWidth =
    window.innerWidth;

  viewportHeight =
    window.innerHeight;

  dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  canvas.width =
    Math.round(
      viewportWidth * dpr
    );

  canvas.height =
    Math.round(
      viewportHeight * dpr
    );


  canvas.style.width =
    `${viewportWidth}px`;

  canvas.style.height =
    `${viewportHeight}px`;


  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );


  lastDrawnFrame = -1;

  drawFrame(
    currentFrame,
    true
  );

}


/* =========================================================
   FRAME DRAWING
   ========================================================= */

function drawFrame(
  frameIndex,
  force = false
) {

  if (!canvas || !ctx) return;


  const safeIndex =
    clamp(
      Math.round(frameIndex),
      0,
      TOTAL_FRAMES - 1
    );


  const image =
    images[safeIndex];


  if (
    !image ||
    !image.complete ||
    image.naturalWidth === 0
  ) {

    return;

  }


  const now =
    performance.now();


  /*
   * Prevent unnecessary canvas redraws.
   */

  if (
    !force &&
    safeIndex === lastDrawnFrame
  ) {

    return;

  }


  /*
   * Keep visual frame updates close
   * to the original 30 FPS sequence.
   */

  if (
    !force &&
    now - lastFrameDrawTime <
    FRAME_INTERVAL
  ) {

    return;

  }


  lastFrameDrawTime =
    now;


  lastDrawnFrame =
    safeIndex;


  /*
   * Canvas is already scaled by DPR.
   * Reset to CSS-pixel coordinate system.
   */

  ctx.save();

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );


  /*
   * Background.
   */

  ctx.fillStyle =
    "#05070b";

  ctx.fillRect(
    0,
    0,
    viewportWidth,
    viewportHeight
  );


  /*
   * Cinematic cover calculation.
   */

  const imageRatio =
    image.naturalWidth /
    image.naturalHeight;

  const viewportRatio =
    viewportWidth /
    viewportHeight;


  let drawWidth;
  let drawHeight;


  if (
    imageRatio >
    viewportRatio
  ) {

    drawHeight =
      viewportHeight;

    drawWidth =
      drawHeight *
      imageRatio;

  } else {

    drawWidth =
      viewportWidth;

    drawHeight =
      drawWidth /
      imageRatio;

  }


  /*
   * Tiny cinematic scaling.
   */

  const scrollProgress =
    getHeroProgress();


  const cinematicScale =
    1 +
    scrollProgress * 0.025;


  drawWidth *=
    cinematicScale;

  drawHeight *=
    cinematicScale;


  const x =
    (viewportWidth -
      drawWidth) / 2;


  const y =
    (viewportHeight -
      drawHeight) / 2;


  ctx.drawImage(
    image,
    x,
    y,
    drawWidth,
    drawHeight
  );


  ctx.restore();


  /*
   * Frame indicator.
   */

  if (frameNow) {

    frameNow.textContent =
      String(
        safeIndex + 1
      ).padStart(3, "0");

  }

}


/* =========================================================
   HERO PROGRESS
   ========================================================= */

function getHeroProgress() {

  if (!hero) return 0;


  const heroTop =
    hero.offsetTop;


  const heroHeight =
    hero.offsetHeight;


  const scrollDistance =
    Math.max(
      1,
      heroHeight -
      viewportHeight
    );


  return clamp(
    (
      window.scrollY -
      heroTop
    ) /
    scrollDistance
  );

}


/* =========================================================
   HERO CHOREOGRAPHY
   ========================================================= */

function updateHero() {

  if (!hero) return;


  const progress =
    getHeroProgress();


  /*
   * Frame target.
   */

  targetFrame =
    progress *
    (TOTAL_FRAMES - 1);


  /*
   * Vertical progress line.
   */

  if (progressBar) {

    progressBar.style.height =
      `${progress * 100}%`;

  }


  /*
   * Hero typography exit.
   */

  if (heroCopy) {

    const copyOut =
      clamp(
        progress / 0.30
      );


    const translateY =
      lerp(
        0,
        -55,
        easeOutCubic(
          copyOut
        )
      );


    const scale =
      lerp(
        1,
        0.955,
        copyOut
      );


    heroCopy.style.transform =
      `translate3d(
        0,
        calc(-50% + ${translateY}px),
        0
      ) scale(${scale})`;


    heroCopy.style.opacity =
      lerp(
        1,
        0.06,
        copyOut
      );

  }


  /*
   * HUD slowly disappears.
   */

  if (heroHud) {

    const hudOut =
      clamp(
        (progress - 0.10) /
        0.30
      );


    heroHud.style.opacity =
      lerp(
        1,
        0.22,
        hudOut
      );

  }


  /*
   * Event data moves subtly.
   */

  if (heroData) {

    const dataProgress =
      clamp(
        (progress - 0.25) /
        0.40
      );


    heroData.style.transform =
      `translate3d(
        0,
        ${dataProgress * 28}px,
        0
      )`;


    heroData.style.opacity =
      lerp(
        1,
        0.20,
        dataProgress
      );

  }


  /*
   * Scroll cue disappears quickly.
   */

  if (scrollCue) {

    scrollCue.style.opacity =
      1 -
      clamp(
        progress / 0.15
      );

  }


  /*
   * Frame counter becomes stronger.
   */

  if (frameCounter) {

    frameCounter.style.opacity =
      0.35 +
      progress * 0.65;

  }

}


/* =========================================================
   FRAME ANIMATION LOOP
   ========================================================= */

function animationLoop() {

  currentFrame =
    lerp(
      currentFrame,
      targetFrame,
      0.14
    );


  if (
    Math.abs(
      currentFrame -
      targetFrame
    ) < 0.025
  ) {

    currentFrame =
      targetFrame;

  }


  drawFrame(
    currentFrame
  );


  requestAnimationFrame(
    animationLoop
  );

}


/* =========================================================
   PRELOADER
   ========================================================= */

function updateLoader() {

  const percentage =
    Math.round(
      loadedFrames /
      TOTAL_FRAMES *
      100
    );


  if (loaderBar) {

    loaderBar.style.width =
      `${percentage}%`;

  }


  if (loaderText) {

    loaderText.textContent =
      `INITIALIZING ARENA ${String(
        percentage
      ).padStart(2, "0")}%`;

  }

}


/* =========================================================
   HIDE PRELOADER
   ========================================================= */

function finishLoading() {

  if (animationStarted)
    return;


  animationStarted =
    true;


  drawFrame(
    0,
    true
  );


  /*
   * Give the browser one frame to
   * display the first image cleanly.
   */

  requestAnimationFrame(() => {

    setTimeout(() => {

      if (!preloader)
        return;


      preloader.style.opacity =
        "0";

      preloader.style.visibility =
        "hidden";


      setTimeout(() => {

        preloader.style.display =
          "none";

      }, 650);

    }, 350);

  });

}


/* =========================================================
   FRAME LOADING
   ========================================================= */

function loadFrames() {

  if (loadingStarted)
    return;


  loadingStarted =
    true;


  /*
   * First frame gets priority.
   */

  loadSingleFrame(0);


  /*
   * Then load remaining frames
   * in controlled batches.
   */

  let cursor = 1;

  const batchSize =
    8;


  function loadBatch() {

    const end =
      Math.min(
        cursor + batchSize,
        TOTAL_FRAMES
      );


    while (
      cursor < end
    ) {

      loadSingleFrame(
        cursor
      );

      cursor++;

    }


    if (
      cursor <
      TOTAL_FRAMES
    ) {

      /*
       * Yield to browser so the page
       * remains responsive while loading.
       */

      setTimeout(
        loadBatch,
        0
      );

    }

  }


  loadBatch();

}


/* =========================================================
   LOAD ONE FRAME
   ========================================================= */

function loadSingleFrame(index) {

  const image =
    new Image();


  image.decoding =
    "async";


  image.loading =
    "eager";


  image.onload =
    () => {

      images[index] =
        image;


      loadedFrames++;

      updateLoader();


      /*
       * Draw first frame immediately.
       */

      if (
        index === 0
      ) {

        drawFrame(
          0,
          true
        );

      }


      if (
        loadedFrames >=
        TOTAL_FRAMES
      ) {

        finishLoading();

      }

    };


  image.onerror =
    () => {

      console.warn(
        `Robo Kriti: Unable to load frame ${index}`
      );


      /*
       * Count failed frames so
       * one broken image doesn't
       * permanently lock the loader.
       */

      loadedFrames++;

      updateLoader();


      if (
        loadedFrames >=
        TOTAL_FRAMES
      ) {

        finishLoading();

      }

    };


  image.src =
    getFrameURL(index);

}


/* =========================================================
   SECTION REVEAL
   ========================================================= */

function revealSections() {

  const sections =
    document.querySelectorAll(
      ".mission, .battle, .countdown-section, .messages, .faq-section, .final-cta"
    );


  sections.forEach(
    section => {

      const rect =
        section.getBoundingClientRect();


      const trigger =
        viewportHeight *
        0.78;


      const distance =
        trigger -
        rect.top;


      const amount =
        clamp(
          distance /
          (viewportHeight *
            0.75)
        );


      const eased =
        easeOutCubic(
          amount
        );


      section.style.setProperty(
        "--reveal",
        eased.toFixed(3)
      );


      section.style.transform =
        `translate3d(
          0,
          ${(1 - eased) * 22}px,
          0
        )`;


      section.style.opacity =
        (
          0.58 +
          eased * 0.42
        ).toFixed(3);

    }
  );

}


/* =========================================================
   NAVIGATION ACTIVE STATE
   ========================================================= */

function updateNavigation() {

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  const links =
    document.querySelectorAll(
      ".nav-links a[data-nav]"
    );


  let active =
    "";


  sections.forEach(
    section => {

      const rect =
        section.getBoundingClientRect();


      if (
        rect.top <=
        viewportHeight * 0.35
      ) {

        active =
          section.id;

      }

    }
  );


  links.forEach(
    link => {

      const navTarget =
        link.dataset.nav;


      link.classList.toggle(
        "active",
        navTarget === active
      );

    }
  );

}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function closeMobileMenu() {

  if (!mobileMenu)
    return;


  mobileMenu.classList.remove(
    "open"
  );


  mobileMenu.setAttribute(
    "aria-hidden",
    "true"
  );


  if (menuButton) {

    menuButton.classList.remove(
      "open"
    );


    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}


function toggleMobileMenu() {

  if (!mobileMenu)
    return;


  const isOpen =
    mobileMenu.classList.contains(
      "open"
    );


  if (isOpen) {

    closeMobileMenu();

  } else {

    mobileMenu.classList.add(
      "open"
    );


    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );


    if (menuButton) {

      menuButton.classList.add(
        "open"
      );


      menuButton.setAttribute(
        "aria-expanded",
        "true"
      );

    }

  }

}


/* =========================================================
   FAQ
   ========================================================= */

function initFAQ() {

  const items =
    document.querySelectorAll(
      ".faq-item"
    );


  items.forEach(
    item => {

      item.addEventListener(
        "click",
        () => {

          const currentlyOpen =
            item.getAttribute(
              "aria-expanded"
            ) === "true";


          /*
           * Close all others.
           */

          items.forEach(
            other => {

              if (
                other !== item
              ) {

                other.setAttribute(
                  "aria-expanded",
                  "false"
                );

                other.classList.remove(
                  "open"
                );

              }

            }
          );


          /*
           * Toggle selected item.
           */

          item.setAttribute(
            "aria-expanded",
            String(
              !currentlyOpen
            )
          );


          item.classList.toggle(
            "open",
            !currentlyOpen
          );

        }
      );

    }
  );

}


/* =========================================================
   DISCIPLINE INTERACTION
   ========================================================= */

function initDisciplines() {

  const events =
    document.querySelectorAll(
      ".discipline-item"
    );


  events.forEach(
    event => {

      event.addEventListener(
        "mouseenter",
        () => {

          event.classList.add(
            "is-active"
          );

        }
      );


      event.addEventListener(
        "mouseleave",
        () => {

          event.classList.remove(
            "is-active"
          );

        }
      );

    }
  );

}


/* =========================================================
   MAGNETIC CTA
   ========================================================= */

function initMagneticCTA() {

  const buttons =
    document.querySelectorAll(
      ".magnetic-cta"
    );


  /*
   * Magnetic movement is disabled
   * on touch devices.
   */

  const touchDevice =
    window.matchMedia(
      "(hover: none)"
    ).matches;


  if (touchDevice)
    return;


  buttons.forEach(
    button => {

      button.addEventListener(
        "mousemove",
        event => {

          const rect =
            button.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left -
            rect.width / 2;


          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          const strength =
            0.12;


          button.style.transform =
            `translate3d(
              ${x * strength}px,
              ${y * strength}px,
              0
            )`;

        }
      );


      button.addEventListener(
        "mouseleave",
        () => {

          button.style.transform =
            "";

        }
      );

    }
  );

}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function updateCountdown() {

  const time =
    getRegistrationTimeLeft();


  const days =
    document.getElementById(
      "countDays"
    );

  const hours =
    document.getElementById(
      "countHours"
    );

  const minutes =
    document.getElementById(
      "countMinutes"
    );

  const seconds =
    document.getElementById(
      "countSeconds"
    );


  if (
    time.expired
  ) {

    if (days)
      days.textContent = "00";

    if (hours)
      hours.textContent = "00";

    if (minutes)
      minutes.textContent = "00";

    if (seconds)
      seconds.textContent = "00";


    const clock =
      document.getElementById(
        "countdownClock"
      );


    if (clock) {

      clock.classList.add(
        "expired"
      );

    }


    return;

  }


  if (days)
    days.textContent =
      twoDigits(
        time.days
      );


  if (hours)
    hours.textContent =
      twoDigits(
        time.hours
      );


  if (minutes)
    minutes.textContent =
      twoDigits(
        time.minutes
      );


  if (seconds)
    seconds.textContent =
      twoDigits(
        time.seconds
      );

}


/* =========================================================
   COUNTDOWN LOOP
   ========================================================= */

function startCountdown() {

  updateCountdown();


  setInterval(
    updateCountdown,
    1000
  );

}


/* =========================================================
   SMOOTH ANCHOR NAVIGATION
   ========================================================= */

function initAnchors() {

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          event => {

            const targetID =
              link.getAttribute(
                "href"
              );


            if (
              !targetID ||
              targetID === "#"
            ) {

              return;

            }


            const target =
              document.querySelector(
                targetID
              );


            if (!target)
              return;


            event.preventDefault();


            closeMobileMenu();


            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }
        );

      }
    );

}


/* =========================================================
   SCROLL ENGINE
   ========================================================= */

function onScroll() {

  if (scrollQueued)
    return;


  scrollQueued =
    true;


  requestAnimationFrame(
    () => {

      updateHero();

      revealSections();

      updateNavigation();


      scrollQueued =
        false;

    }
  );

}


/* =========================================================
   RESIZE ENGINE
   ========================================================= */

function onResize() {

  if (resizeQueued)
    return;


  resizeQueued =
    true;


  requestAnimationFrame(
    () => {

      resizeCanvas();

      updateHero();

      revealSections();


      resizeQueued =
        false;

    }
  );

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function init() {

  /*
   * Canvas.
   */

  resizeCanvas();


  /*
   * Hero.
   */

  updateHero();


  /*
   * Sections.
   */

  revealSections();


  /*
   * Navigation.
   */

  updateNavigation();


  /*
   * Interactions.
   */

  initFAQ();

  initDisciplines();

  initMagneticCTA();

  initAnchors();


  /*
   * Mobile menu.
   */

  if (menuButton) {

    menuButton.addEventListener(
      "click",
      toggleMobileMenu
    );

  }


  if (mobileMenu) {

    mobileMenu
      .querySelectorAll("a")
      .forEach(
        link => {

          link.addEventListener(
            "click",
            closeMobileMenu
          );

        }
      );

  }


  /*
   * Window events.
   */

  window.addEventListener(
    "scroll",
    onScroll,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    onResize,
    {
      passive: true
    }
  );


  /*
   * Countdown.
   */

  startCountdown();


  /*
   * Start frame engine.
   */

  if (!animationStarted) {

    animationLoop();

  }


  /*
   * Start loading.
   */

  loadFrames();

}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init,
    {
      once: true
    }
  );

} else {

  init();

}
