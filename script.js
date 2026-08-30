/**
 * ============================================================
 * ROBO KRITI 2026 — MASTER HOME JAVASCRIPT
 * ============================================================
 *
 * Features:
 * - 300-frame / 30 FPS scroll-controlled hero
 * - Smooth frame interpolation
 * - Intelligent frame preloading
 * - Cinematic hero typography choreography
 * - Hero HUD animation
 * - Scroll progress
 * - Section reveal choreography
 * - Competition countdown
 * - Registration deadline warning
 * - FAQ accordion
 * - Animated CTA
 * - Navigation active state
 * - Magnetic CTA interaction
 * - Reduced-motion accessibility
 *
 * Required structure:
 *
 * index.html
 * styles.css
 * script.js
 * home-content.js
 *
 * assets/
 * ├── awes-logo.png
 * └── frames/
 *     ├── frame_0000.webp
 *     ├── frame_0001.webp
 *     ├── ...
 *     └── frame_0299.webp
 * ============================================================
 */

(() => {

  "use strict";

  /* ==========================================================
     CONFIG
  ========================================================== */

  const TOTAL_FRAMES = 300;

  const FRAME_PATH =
    "assets/frames/frame_";

  const FRAME_EXTENSION =
    ".webp";

  const PAD_LENGTH = 4;

  const FRAME_LERP = 0.115;

  const PRELOAD_CONCURRENCY = 10;

  const REDUCED_MOTION =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ==========================================================
     DOM
  ========================================================== */

  const canvas =
    document.getElementById("frameCanvas");

  const ctx =
    canvas
      ? canvas.getContext("2d", {
          alpha: false,
          desynchronized: true
        })
      : null;

  const frameNow =
    document.getElementById("frameNow");

  const progressBar =
    document.getElementById("progressBar");

  const loaderBar =
    document.getElementById("loaderBar");

  const loaderText =
    document.getElementById("loaderText");

  const preloader =
    document.getElementById("preloader");

  const hero =
    document.querySelector(".hero");

  const heroCopy =
    document.querySelector(".hero-copy");

  const heroHud =
    document.querySelector(".hud-top");

  const heroData =
    document.querySelector(".hero-data");

  const scrollCue =
    document.querySelector(".scroll-cue");

  const frameCounter =
    document.querySelector(".frame-counter");

  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");

  const countdownSection =
    document.querySelector(".countdown-section");

  const deadlineLine =
    document.querySelector(".deadline-line");

  const nav =
    document.querySelector(".nav");

  const navLinks =
    document.querySelectorAll("nav a");

  const faqItems =
    document.querySelectorAll(".faq-item");

  const magneticCTA =
    document.querySelector(".magnetic-cta");


  /* ==========================================================
     STATE
  ========================================================== */

  const images =
    new Array(TOTAL_FRAMES);

  let loadedFrames = 0;

  let loadCursor = 0;

  let currentFrame = 0;

  let targetFrame = 0;

  let devicePixelRatio =
    Math.min(window.devicePixelRatio || 1, 2);

  let ticking = false;

  let scrollAnimationFrame = null;

  let pageReady = false;


  /* ==========================================================
     HELPERS
  ========================================================== */

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
    start,
    end,
    amount
  ) => {

    return start +
      (end - start) *
      amount;

  };


  const frameURL = (
    index
  ) => {

    return (
      FRAME_PATH +
      String(index)
        .padStart(PAD_LENGTH, "0") +
      FRAME_EXTENSION
    );

  };


  const setStyle = (
    element,
    property,
    value
  ) => {

    if (!element) return;

    element.style[property] = value;

  };


  /* ==========================================================
     CANVAS RESIZE
  ========================================================== */

  function resizeCanvas() {

    if (!canvas || !ctx) return;

    devicePixelRatio =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    const width =
      window.innerWidth;

    const height =
      window.innerHeight;

    canvas.width =
      Math.round(
        width *
        devicePixelRatio
      );

    canvas.height =
      Math.round(
        height *
        devicePixelRatio
      );

    canvas.style.width =
      width + "px";

    canvas.style.height =
      height + "px";

    drawFrame(currentFrame);

  }


  /* ==========================================================
     DRAW FRAME
  ========================================================== */

  function drawFrame(
    frameIndex
  ) {

    if (
      !canvas ||
      !ctx
    ) {
      return;
    }

    const safeIndex =
      Math.max(
        0,
        Math.min(
          TOTAL_FRAMES - 1,
          Math.round(frameIndex)
        )
      );

    const image =
      images[safeIndex];

    if (
      !image ||
      !image.complete ||
      !image.naturalWidth
    ) {
      return;
    }

    const canvasWidth =
      canvas.width;

    const canvasHeight =
      canvas.height;

    ctx.fillStyle =
      "#05070b";

    ctx.fillRect(
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    /*
     * Cover scaling.
     *
     * This keeps the 16:9 sequence cinematic
     * on desktop, tablet and mobile.
     */

    const scale =
      Math.max(
        canvasWidth /
          image.naturalWidth,

        canvasHeight /
          image.naturalHeight
      );

    const width =
      image.naturalWidth *
      scale;

    const height =
      image.naturalHeight *
      scale;

    const x =
      (canvasWidth - width) /
      2;

    const y =
      (canvasHeight - height) /
      2;

    ctx.drawImage(
      image,
      x,
      y,
      width,
      height
    );

    if (frameNow) {

      frameNow.textContent =
        String(
          safeIndex + 1
        ).padStart(3, "0");

    }

  }


  /* ==========================================================
     HERO SCROLL PROGRESS
  ========================================================== */

  function updateHeroProgress() {

    if (!hero) return;

    const start =
      hero.offsetTop;

    const distance =
      Math.max(
        1,
        hero.offsetHeight -
        window.innerHeight
      );

    const scrollPosition =
      window.scrollY -
      start;

    const progress =
      clamp(
        scrollPosition /
        distance
      );

    /*
     * Convert scroll progress
     * into frame number.
     */

    targetFrame =
      progress *
      (TOTAL_FRAMES - 1);


    /* -----------------------------------------------
       Vertical progress indicator
    ------------------------------------------------ */

    if (progressBar) {

      progressBar.style.height =
        `${progress * 100}%`;

    }


    /* -----------------------------------------------
       Hero typography choreography
    ------------------------------------------------ */

    if (heroCopy) {

      const textOut =
        clamp(
          progress /
          0.30
        );

      const translateY =
        -50 -
        progress * 24;

      const scale =
        1 -
        progress * 0.045;

      heroCopy.style.transform =
        `translate3d(0, ${translateY}%, 0)
         scale(${scale})`;

      heroCopy.style.opacity =
        1 -
        textOut * 0.92;

    }


    /* -----------------------------------------------
       HUD fade
    ------------------------------------------------ */

    if (heroHud) {

      const hudOut =
        clamp(
          (progress - 0.12) /
          0.30
        );

      heroHud.style.opacity =
        1 -
        hudOut * 0.72;

    }


    /* -----------------------------------------------
       Event information movement
    ------------------------------------------------ */

    if (heroData) {

      heroData.style.transform =
        `translate3d(
          0,
          ${progress * 28}px,
          0
        )`;

      heroData.style.opacity =
        1 -
        clamp(
          (progress - 0.35) /
          0.35
        ) *
        0.75;

    }


    /* -----------------------------------------------
       Scroll cue
    ------------------------------------------------ */

    if (scrollCue) {

      scrollCue.style.opacity =
        1 -
        clamp(
          progress /
          0.16
        );

    }


    /* -----------------------------------------------
       Frame counter
    ------------------------------------------------ */

    if (frameCounter) {

      frameCounter.style.opacity =
        0.45 +
        clamp(progress * 0.8);

    }

  }


  /* ==========================================================
     SECTION CHOREOGRAPHY
  ========================================================== */

  function revealSections() {

    const sections =
      document.querySelectorAll(
        ".mission, .battle, .countdown-section, .messages, .faq-section, .register, .final-cta"
      );

    sections.forEach(section => {

      const rect =
        section.getBoundingClientRect();

      const sectionCenter =
        rect.top +
        rect.height * 0.25;

      const viewportCenter =
        window.innerHeight * 0.62;

      const distance =
        Math.abs(
          sectionCenter -
          viewportCenter
        );

      const amount =
        clamp(
          1 -
          distance /
          (window.innerHeight * 0.9)
        );

      /*
       * CSS variable can also be used
       * for additional effects.
       */

      section.style.setProperty(
        "--reveal",
        amount.toFixed(3)
      );

      /*
       * Reduced motion:
       * no transform choreography.
       */

      if (REDUCED_MOTION) {

        section.style.transform =
          "none";

        section.style.opacity =
          "1";

        return;

      }

      const translate =
        (1 - amount) *
        24;

      section.style.transform =
        `translate3d(
          0,
          ${translate}px,
          0
        )`;

      section.style.opacity =
        (
          0.62 +
          amount * 0.38
        ).toFixed(3);

    });

  }


  /* ==========================================================
     FRAME ANIMATION
  ========================================================== */

  function animateFrames() {

    if (REDUCED_MOTION) {

      currentFrame =
        targetFrame;

    } else {

      currentFrame =
        lerp(
          currentFrame,
          targetFrame,
          FRAME_LERP
        );

      if (
        Math.abs(
          targetFrame -
          currentFrame
        ) < 0.025
      ) {

        currentFrame =
          targetFrame;

      }

    }

    drawFrame(
      currentFrame
    );

    requestAnimationFrame(
      animateFrames
    );

  }


  /* ==========================================================
     PRELOADER
  ========================================================== */

  function updateLoader() {

    if (!loaderBar) return;

    const percentage =
      Math.round(
        (
          loadedFrames /
          TOTAL_FRAMES
        ) * 100
      );

    loaderBar.style.width =
      `${percentage}%`;

    if (loaderText) {

      loaderText.textContent =
        `INITIALIZING ARENA ${String(
          percentage
        ).padStart(2, "0")}%`;

    }

  }


  function finishPreloader() {

    pageReady = true;

    drawFrame(0);

    if (!preloader) return;

    setTimeout(() => {

      preloader.style.opacity =
        "0";

      preloader.style.visibility =
        "hidden";

      preloader.style.pointerEvents =
        "none";

      document.body.classList.add(
        "page-ready"
      );

    }, 400);

  }


  /* ==========================================================
     LOAD FRAMES
  ========================================================== */

  function loadFrames() {

    let active =
      0;

    function loadNext() {

      while (
        active <
          PRELOAD_CONCURRENCY &&
        loadCursor <
          TOTAL_FRAMES
      ) {

        const index =
          loadCursor++;

        active++;

        const image =
          new Image();

        image.decoding =
          "async";

        image.onload =
          () => {

            loadedFrames++;

            active--;

            updateLoader();

            /*
             * First frame becomes available
             * immediately instead of waiting for
             * all 300 frames.
             */

            if (
              index === 0
            ) {

              drawFrame(0);

            }

            if (
              loadedFrames >=
              TOTAL_FRAMES
            ) {

              finishPreloader();

            }

            loadNext();

          };


        image.onerror =
          () => {

            /*
             * Don't freeze the entire site
             * if one frame fails.
             */

            loadedFrames++;

            active--;

            updateLoader();

            if (
              loadedFrames >=
              TOTAL_FRAMES
            ) {

              finishPreloader();

            }

            loadNext();

          };


        image.src =
          frameURL(index);

        images[index] =
          image;

      }

    }

    loadNext();

  }


  /* ==========================================================
     COUNTDOWN
  ========================================================== */

  /*
   * Event date:
   *
   * 03 September 2026
   *
   * IST = UTC +05:30
   */

  const EVENT_DATE =
    new Date(
      "2026-09-03T00:00:00+05:30"
    ).getTime();


  /*
   * Registration deadline:
   *
   * 01 September 2026
   */

  const REGISTRATION_DEADLINE =
    new Date(
      "2026-09-01T23:59:59+05:30"
    ).getTime();


  function setCountdownValue(
    element,
    value
  ) {

    if (!element) return;

    element.textContent =
      String(value).padStart(
        2,
        "0"
      );

  }


  function updateCountdown() {

    const now =
      Date.now();

    let difference =
      EVENT_DATE -
      now;

    if (
      difference < 0
    ) {

      difference = 0;

    }


    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );


    const hours =
      Math.floor(
        (
          difference /
          (1000 * 60 * 60)
        ) % 24
      );


    const minutes =
      Math.floor(
        (
          difference /
          (1000 * 60)
        ) % 60
      );


    const seconds =
      Math.floor(
        (
          difference /
          1000
        ) % 60
      );


    setCountdownValue(
      daysElement,
      days
    );

    setCountdownValue(
      hoursElement,
      hours
    );

    setCountdownValue(
      minutesElement,
      minutes
    );

    setCountdownValue(
      secondsElement,
      seconds
    );


    /*
     * Registration deadline state.
     */

    if (
      now >
      REGISTRATION_DEADLINE
    ) {

      document.body.classList.add(
        "registration-closed"
      );

      if (deadlineLine) {

        deadlineLine.innerHTML =
          `REGISTRATION <span>CLOSED</span>`;

      }

    } else {

      const remaining =
        REGISTRATION_DEADLINE -
        now;

      /*
       * Less than 48 hours:
       * activate FINAL CALL mode.
       */

      if (
        remaining <=
        48 * 60 * 60 * 1000
      ) {

        document.body.classList.add(
          "final-call"
        );

        if (deadlineLine) {

          deadlineLine.innerHTML =
            `05 // FINAL CALL <span>01 SEP 2026</span>`;

        }

      }

    }

  }


  /* ==========================================================
     FAQ ACCORDION
  ========================================================== */

  function initFAQ() {

    if (!faqItems.length) return;

    faqItems.forEach(
      (item, index) => {

        item.setAttribute(
          "aria-expanded",
          "false"
        );

        item.addEventListener(
          "click",
          () => {

            const isOpen =
              item.classList.contains(
                "open"
              );


            /*
             * Close all other FAQ items.
             */

            faqItems.forEach(
              other => {

                other.classList.remove(
                  "open"
                );

                other.setAttribute(
                  "aria-expanded",
                  "false"
                );

              }
            );


            /*
             * Open selected item.
             */

            if (!isOpen) {

              item.classList.add(
                "open"
              );

              item.setAttribute(
                "aria-expanded",
                "true"
              );

            }

          }
        );

      }
    );

  }


  /* ==========================================================
     NAVIGATION
  ========================================================== */

  function updateNavigation() {

    if (!nav) return;

    if (
      window.scrollY >
      40
    ) {

      nav.classList.add(
        "scrolled"
      );

    } else {

      nav.classList.remove(
        "scrolled"
      );

    }


    /*
     * Determine active section.
     */

    const sections =
      document.querySelectorAll(
        "main section[id]"
      );

    let currentSection =
      "home";

    sections.forEach(
      section => {

        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <=
          window.innerHeight *
          0.45
        ) {

          currentSection =
            section.id;

        }

      }
    );


    navLinks.forEach(
      link => {

        const href =
          link.getAttribute(
            "href"
          );

        if (
          href ===
          `#${currentSection}`
        ) {

          link.classList.add(
            "active"
          );

        } else {

          link.classList.remove(
            "active"
          );

        }

      }
    );

  }


  /* ==========================================================
     SMOOTH NAVIGATION
  ========================================================== */

  function initNavigation() {

    navLinks.forEach(
      link => {

        link.addEventListener(
          "click",
          event => {

            const href =
              link.getAttribute(
                "href"
              );

            if (
              !href ||
              !href.startsWith("#")
            ) {

              return;

            }

            const target =
              document.querySelector(
                href
              );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
              behavior:
                REDUCED_MOTION
                  ? "auto"
                  : "smooth",
              block:
                "start"
            });

          }
        );

      }
    );

  }


  /* ==========================================================
     MAGNETIC CTA
     ========================================================== */

  function initMagneticCTA() {

    if (
      !magneticCTA ||
      REDUCED_MOTION
    ) {

      return;

    }


    /*
     * Disable magnetic behaviour
     * on touch devices.
     */

    if (
      "ontouchstart" in window
    ) {

      return;

    }


    magneticCTA.addEventListener(
      "pointermove",
      event => {

        const rect =
          magneticCTA.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        const moveX =
          clamp(
            x / 5,
            -12,
            12
          );

        const moveY =
          clamp(
            y / 5,
            -12,
            12
          );

        magneticCTA.style.transform =
          `translate3d(
            ${moveX}px,
            ${moveY}px,
            0
          )`;

      }
    );


    magneticCTA.addEventListener(
      "pointerleave",
      () => {

        magneticCTA.style.transform =
          "translate3d(0,0,0)";

      }
    );

  }


  /* ==========================================================
     EVENT ROW MICRO-INTERACTION
  ========================================================== */

  function initEventRows() {

    const rows =
      document.querySelectorAll(
        ".events a"
      );

    rows.forEach(
      row => {

        row.addEventListener(
          "pointermove",
          event => {

            if (
              REDUCED_MOTION ||
              "ontouchstart" in window
            ) {

              return;

            }

            const rect =
              row.getBoundingClientRect();

            const relativeX =
              event.clientX -
              rect.left;

            const relativeY =
              event.clientY -
              rect.top;

            const moveX =
              (
                relativeX /
                rect.width -
                0.5
              ) * 8;

            const moveY =
              (
                relativeY /
                rect.height -
                0.5
              ) * 3;

            row.style.transform =
              `translate3d(
                ${moveX}px,
                ${moveY}px,
                0
              )`;

          }
        );


        row.addEventListener(
          "pointerleave",
          () => {

            row.style.transform =
              "translate3d(0,0,0)";

          }
        );

      }
    );

  }


  /* ==========================================================
     SCROLL LOOP
  ========================================================== */

  function onScroll() {

    updateHeroProgress();

    updateNavigation();

    if (
      scrollAnimationFrame
    ) {

      return;

    }

    scrollAnimationFrame =
      requestAnimationFrame(
        () => {

          revealSections();

          scrollAnimationFrame =
            null;

        }
      );

  }


  /* ==========================================================
     RESIZE DEBOUNCE
  ========================================================== */

  let resizeTimer = null;

  function onResize() {

    clearTimeout(
      resizeTimer
    );

    resizeTimer =
      setTimeout(
        () => {

          resizeCanvas();

          updateHeroProgress();

          revealSections();

        },
        100
      );

  }


  /* ==========================================================
     INITIALIZATION
  ========================================================== */

  function init() {

    /*
     * Canvas.
     */

    resizeCanvas();


    /*
     * Initial page state.
     */

    updateHeroProgress();

    revealSections();

    updateNavigation();


    /*
     * Interactions.
     */

    initFAQ();

    initNavigation();

    initMagneticCTA();

    initEventRows();


    /*
     * Countdown.
     */

    updateCountdown();

    setInterval(
      updateCountdown,
      1000
    );


    /*
     * Frame system.
     */

    loadFrames();

    animateFrames();


    /*
     * Browser events.
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

  }


  /* ==========================================================
     START
  ========================================================== */

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

})();
