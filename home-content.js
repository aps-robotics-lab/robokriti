/**
 * ROBO KRITI 2026
 * HOME EXPERIENCE CONTROLLER
 *
 * Responsibilities:
 * - Cinematic frame-scroll hero
 * - Smooth scroll choreography
 * - Animated section reveals
 * - Event/disciplines interaction
 * - Registration countdown
 * - FAQ accordion
 * - Mobile navigation
 * - Magnetic / interactive CTAs
 * - Particle interaction hooks
 *
 * Homepage intentionally contains:
 * ✓ Competition content
 * ✓ Events
 * ✓ Countdown
 * ✓ FAQ
 * ✓ Registration CTA
 * ✓ School eligibility
 *
 * Homepage intentionally does NOT contain:
 * ✕ Principal message
 * ✕ Teacher/Mentor message
 * ✕ Gita shloka
 */

(() => {
  "use strict";

  /* =========================================================
     CONFIG
  ========================================================= */

  const CONFIG = {
    totalFrames: 300,

    framePath: (index) =>
      `assets/frames/frame_${String(index).padStart(4, "0")}.webp`,

    registrationDeadline: "2026-09-03T23:59:59+05:30",

    frameScrollSmoothing: 0.12,

    revealDistance: 0.92,

    mobileBreakpoint: 760,

    enableMotion: true
  };


  /* =========================================================
     DOM HELPERS
  ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const clamp = (value, min = 0, max = 1) =>
    Math.max(min, Math.min(max, value));

  const lerp = (a, b, amount) =>
    a + (b - a) * amount;


  /* =========================================================
     STATE
  ========================================================= */

  const state = {
    frameCurrent: 0,
    frameTarget: 0,

    framesLoaded: 0,

    scrollProgress: 0,

    menuOpen: false,

    ticking: false,

    reducedMotion:
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };


  /* =========================================================
     ELEMENTS
  ========================================================= */

  const elements = {
    canvas: $("#frameCanvas"),

    preloader: $("#preloader"),

    loaderBar: $("#loaderBar"),

    loaderText: $("#loaderText"),

    frameNow: $("#frameNow"),

    progressBar: $("#progressBar"),

    hero: $(".hero"),

    heroCopy: $(".hero-copy"),

    heroHud: $(".hero-hud, .hud-top"),

    heroData: $(".hero-data"),

    scrollCue: $(".scroll-cue"),

    frameCounter: $(".frame-counter"),

    nav: $(".nav"),

    menuButton: $(".menu"),

    navLinks: $(".nav-links")
  };


  /* =========================================================
     CANVAS ENGINE
  ========================================================= */

  let ctx = null;

  if (elements.canvas) {
    ctx = elements.canvas.getContext("2d", {
      alpha: false,
      desynchronized: true
    });
  }

  const images = new Array(CONFIG.totalFrames);

  let frameCursor = 0;


  function getDPR() {
    return Math.min(window.devicePixelRatio || 1, 2);
  }


  function resizeCanvas() {
    if (!elements.canvas || !ctx) return;

    const dpr = getDPR();

    elements.canvas.width =
      Math.round(window.innerWidth * dpr);

    elements.canvas.height =
      Math.round(window.innerHeight * dpr);

    elements.canvas.style.width =
      `${window.innerWidth}px`;

    elements.canvas.style.height =
      `${window.innerHeight}px`;

    drawFrame(state.frameCurrent);
  }


  function drawFrame(index) {
    if (!elements.canvas || !ctx) return;

    const safeIndex = clamp(
      Math.round(index),
      0,
      CONFIG.totalFrames - 1
    );

    const image = images[safeIndex];

    if (!image || !image.complete) return;

    const canvasWidth = elements.canvas.width;
    const canvasHeight = elements.canvas.height;

    ctx.fillStyle = "#05070b";

    ctx.fillRect(
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    if (!imageWidth || !imageHeight) return;

    /*
     * Cover calculation.
     * This keeps the sequence cinematic on:
     * - phone
     * - tablet
     * - laptop
     * - desktop
     */

    const scale = Math.max(
      canvasWidth / imageWidth,
      canvasHeight / imageHeight
    );

    const width = imageWidth * scale;
    const height = imageHeight * scale;

    const x = (canvasWidth - width) / 2;
    const y = (canvasHeight - height) / 2;

    ctx.drawImage(
      image,
      x,
      y,
      width,
      height
    );

    if (elements.frameNow) {
      elements.frameNow.textContent =
        String(safeIndex + 1).padStart(3, "0");
    }
  }


  /* =========================================================
     FRAME PRELOADER
  ========================================================= */

  function updateLoader() {
    if (!elements.loaderBar) return;

    const percentage = Math.round(
      (state.framesLoaded / CONFIG.totalFrames) * 100
    );

    elements.loaderBar.style.width =
      `${percentage}%`;

    if (elements.loaderText) {
      elements.loaderText.textContent =
        `INITIALIZING ARENA ${String(percentage).padStart(2, "0")}%`;
    }
  }


  function hidePreloader() {
    if (!elements.preloader) return;

    setTimeout(() => {
      elements.preloader.classList.add("is-loaded");

      elements.preloader.style.opacity = "0";
      elements.preloader.style.visibility = "hidden";
      elements.preloader.style.pointerEvents = "none";

      document.body.classList.add("site-ready");
    }, 350);
  }


  function loadFrames() {
    if (!elements.canvas) return;

    /*
     * Smaller batches prevent the browser from freezing,
     * especially on mobile devices.
     */

    const concurrency =
      window.innerWidth <= CONFIG.mobileBreakpoint
        ? 5
        : 10;

    function loadBatch() {
      for (
        let i = 0;
        i < concurrency &&
        frameCursor < CONFIG.totalFrames;
        i++
      ) {
        const index = frameCursor++;

        const image = new Image();

        image.decoding = "async";

        image.onload = () => {
          state.framesLoaded++;

          updateLoader();

          /*
           * Draw first available frame immediately.
           */

          if (state.framesLoaded === 1) {
            images[0] = images[0] || image;
            drawFrame(0);
          }

          if (
            state.framesLoaded >=
            CONFIG.totalFrames
          ) {
            drawFrame(0);
            hidePreloader();
          } else {
            loadBatch();
          }
        };

        image.onerror = () => {
          /*
           * Don't let one missing frame permanently
           * block the entire application.
           */

          state.framesLoaded++;

          updateLoader();

          if (
            state.framesLoaded >=
            CONFIG.totalFrames
          ) {
            hidePreloader();
          } else {
            loadBatch();
          }
        };

        image.src = CONFIG.framePath(index);

        images[index] = image;
      }
    }

    loadBatch();
  }


  /* =========================================================
     HERO SCROLL
  ========================================================= */

  function updateHero() {
    if (!elements.hero) return;

    const heroStart =
      elements.hero.offsetTop;

    const heroDistance =
      Math.max(
        1,
        elements.hero.offsetHeight -
        window.innerHeight
      );

    const progress = clamp(
      (window.scrollY - heroStart) /
      heroDistance
    );

    state.scrollProgress = progress;

    state.frameTarget =
      progress *
      (CONFIG.totalFrames - 1);

    /*
     * Vertical progress indicator
     */

    if (elements.progressBar) {
      elements.progressBar.style.height =
        `${progress * 100}%`;
    }

    /*
     * Hero typography choreography
     */

    if (
      elements.heroCopy &&
      !state.reducedMotion
    ) {
      const copyOut =
        clamp(progress / 0.30);

      const copyY =
        -50 - progress * 24;

      const copyScale =
        1 - progress * 0.045;

      elements.heroCopy.style.transform =
        `translate3d(0, ${copyY}%, 0) scale(${copyScale})`;

      elements.heroCopy.style.opacity =
        String(1 - copyOut * 0.92);
    }

    /*
     * HUD fades slightly later than title.
     */

    if (
      elements.heroHud &&
      !state.reducedMotion
    ) {
      const hudOut =
        clamp((progress - 0.12) / 0.30);

      elements.heroHud.style.opacity =
        String(1 - hudOut * 0.72);
    }

    /*
     * Event data gently moves away.
     */

    if (
      elements.heroData &&
      !state.reducedMotion
    ) {
      const dataFade =
        clamp((progress - 0.35) / 0.35);

      elements.heroData.style.transform =
        `translate3d(0, ${progress * 28}px, 0)`;

      elements.heroData.style.opacity =
        String(1 - dataFade * 0.75);
    }

    /*
     * Scroll indicator disappears quickly.
     */

    if (elements.scrollCue) {
      elements.scrollCue.style.opacity =
        String(
          1 - clamp(progress / 0.16)
        );
    }

    /*
     * Frame number becomes more visible.
     */

    if (elements.frameCounter) {
      elements.frameCounter.style.opacity =
        String(
          0.45 +
          clamp(progress * 0.8)
        );
    }
  }


  /* =========================================================
     FRAME ANIMATION LOOP
  ========================================================= */

  function animateFrames() {
    state.frameCurrent =
      lerp(
        state.frameCurrent,
        state.frameTarget,
        state.reducedMotion
          ? 1
          : CONFIG.frameScrollSmoothing
      );

    if (
      Math.abs(
        state.frameTarget -
        state.frameCurrent
      ) < 0.025
    ) {
      state.frameCurrent =
        state.frameTarget;
    }

    drawFrame(state.frameCurrent);

    requestAnimationFrame(
      animateFrames
    );
  }


  /* =========================================================
     SECTION REVEALS
  ========================================================= */

  function revealSections() {
    const sections = $$(
      ".mission, .battle, .messages, .register, .home-section, .faq-section"
    );

    sections.forEach((section) => {
      const rect =
        section.getBoundingClientRect();

      const viewportCenter =
        window.innerHeight * 0.62;

      const sectionPoint =
        rect.top +
        rect.height * 0.25;

      const distance =
        Math.abs(
          sectionPoint -
          viewportCenter
        );

      const amount =
        clamp(
          1 -
          distance /
          (window.innerHeight *
            CONFIG.revealDistance)
        );

      section.style.setProperty(
        "--reveal",
        amount.toFixed(3)
      );

      if (!state.reducedMotion) {
        section.style.transform =
          `translate3d(0, ${(1 - amount) * 24}px, 0)`;
      }

      section.style.opacity =
        String(
          0.62 +
          amount * 0.38
        );
    });
  }


  /* =========================================================
     GENERIC SCROLL REVEAL
  ========================================================= */

  function setupRevealObserver() {
    const revealElements = $$(
      "[data-reveal]"
    );

    if (
      !revealElements.length ||
      !("IntersectionObserver" in window)
    ) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px"
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }


  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  function setupActiveNavigation() {
    const links = $$(".nav-links a");

    if (!links.length) return;

    const sections = links
      .map((link) => {
        const href =
          link.getAttribute("href");

        if (
          !href ||
          !href.startsWith("#")
        ) {
          return null;
        }

        return $(href);
      })
      .filter(Boolean);

    if (
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting)
              return;

            links.forEach((link) => {
              link.classList.remove(
                "active"
              );
            });

            const active =
              links.find(
                (link) =>
                  link.getAttribute("href") ===
                  `#${entry.target.id}`
              );

            if (active) {
              active.classList.add(
                "active"
              );
            }
          });
        },
        {
          threshold: 0.35
        }
      );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  function closeMenu() {
    state.menuOpen = false;

    if (elements.menuButton) {
      elements.menuButton
        .classList.remove("is-open");

      elements.menuButton
        .setAttribute(
          "aria-expanded",
          "false"
        );
    }

    if (elements.navLinks) {
      elements.navLinks
        .classList.remove("mobile-open");
    }

    document.body.classList.remove(
      "menu-open"
    );
  }


  function toggleMenu() {
    if (!elements.menuButton) return;

    state.menuOpen =
      !state.menuOpen;

    elements.menuButton
      .classList.toggle(
        "is-open",
        state.menuOpen
      );

    elements.menuButton
      .setAttribute(
        "aria-expanded",
        String(state.menuOpen)
      );

    if (elements.navLinks) {
      elements.navLinks
        .classList.toggle(
          "mobile-open",
          state.menuOpen
        );
    }

    /*
     * We intentionally don't lock the entire
     * viewport with a giant fullscreen menu.
     * CSS controls the compact dropdown/panel.
     */

    document.body.classList.toggle(
      "menu-open",
      state.menuOpen
    );
  }


  function setupMobileMenu() {
    if (!elements.menuButton) return;

    elements.menuButton.addEventListener(
      "click",
      toggleMenu
    );

    $$(".nav-links a").forEach(
      (link) => {
        link.addEventListener(
          "click",
          closeMenu
        );
      }
    );

    window.addEventListener(
      "resize",
      () => {
        if (
          window.innerWidth >
          CONFIG.mobileBreakpoint
        ) {
          closeMenu();
        }
      },
      { passive: true }
    );
  }


  /* =========================================================
     FAQ ACCORDION
  ========================================================= */

  function setupFAQ() {
    const faqItems =
      $$(".faq-item");

    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const button =
        $(".faq-question", item);

      const answer =
        $(".faq-answer", item);

      if (!button || !answer) return;

      button.setAttribute(
        "aria-expanded",
        "false"
      );

      answer.style.maxHeight = "0px";

      button.addEventListener(
        "click",
        () => {
          const isOpen =
            item.classList.contains(
              "is-open"
            );

          /*
           * Close all other questions.
           */

          faqItems.forEach((other) => {
            other.classList.remove(
              "is-open"
            );

            const otherButton =
              $(".faq-question", other);

            const otherAnswer =
              $(".faq-answer", other);

            if (otherButton) {
              otherButton.setAttribute(
                "aria-expanded",
                "false"
              );
            }

            if (otherAnswer) {
              otherAnswer.style.maxHeight =
                "0px";
            }
          });

          /*
           * Open selected question.
           */

          if (!isOpen) {
            item.classList.add(
              "is-open"
            );

            button.setAttribute(
              "aria-expanded",
              "true"
            );

            answer.style.maxHeight =
              `${answer.scrollHeight}px`;
          }
        }
      );
    });
  }


  /* =========================================================
     COUNTDOWN
  ========================================================= */

  function setupCountdown() {
    const countdown =
      $("[data-countdown]");

    if (!countdown) return;

    const days =
      $("[data-days]", countdown);

    const hours =
      $("[data-hours]", countdown);

    const minutes =
      $("[data-minutes]", countdown);

    const seconds =
      $("[data-seconds]", countdown);

    const target =
      new Date(
        CONFIG.registrationDeadline
      ).getTime();


    function updateCountdown() {
      const now =
        Date.now();

      const difference =
        Math.max(
          0,
          target - now
        );

      const totalSeconds =
        Math.floor(
          difference / 1000
        );

      const d =
        Math.floor(
          totalSeconds / 86400
        );

      const h =
        Math.floor(
          (totalSeconds % 86400) /
          3600
        );

      const m =
        Math.floor(
          (totalSeconds % 3600) /
          60
        );

      const s =
        totalSeconds % 60;


      if (days)
        days.textContent =
          String(d).padStart(2, "0");

      if (hours)
        hours.textContent =
          String(h).padStart(2, "0");

      if (minutes)
        minutes.textContent =
          String(m).padStart(2, "0");

      if (seconds)
        seconds.textContent =
          String(s).padStart(2, "0");


      /*
       * Registration closes.
       */

      if (difference <= 0) {
        countdown.classList.add(
          "deadline-reached"
        );

        const labels =
          $$(
            "[data-countdown-label]",
            countdown
          );

        labels.forEach((label) => {
          label.textContent =
            "REGISTRATION CLOSED";
        });
      }
    }


    updateCountdown();

    setInterval(
      updateCountdown,
      1000
    );
  }


  /* =========================================================
     MAGNETIC CTA
  ========================================================= */

  function setupMagneticButtons() {
    /*
     * Disabled for touch devices and reduced-motion users.
     */

    if (
      state.reducedMotion ||
      "ontouchstart" in window
    ) {
      return;
    }

    const buttons =
      $$("[data-magnetic]");

    buttons.forEach((button) => {
      button.addEventListener(
        "pointermove",
        (event) => {
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

          button.style.transform =
            `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
        }
      );

      button.addEventListener(
        "pointerleave",
        () => {
          button.style.transform =
            "";
        }
      );
    });
  }


  /* =========================================================
     EVENT CARD INTERACTION
  ========================================================= */

  function setupEventCards() {
    const cards =
      $$(".event-card, .discipline-card");

    if (!cards.length) return;

    cards.forEach((card, index) => {
      /*
       * Accessibility
       */

      card.style.setProperty(
        "--card-index",
        index
      );

      /*
       * Pointer-based 3D tilt.
       * No tilt on touch.
       */

      if (
        state.reducedMotion ||
        "ontouchstart" in window
      ) {
        return;
      }

      card.addEventListener(
        "pointermove",
        (event) => {
          const rect =
            card.getBoundingClientRect();

          const px =
            (event.clientX -
              rect.left) /
            rect.width;

          const py =
            (event.clientY -
              rect.top) /
            rect.height;

          const rotateX =
            (0.5 - py) * 5;

          const rotateY =
            (px - 0.5) * 7;

          card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }
      );

      card.addEventListener(
        "pointerleave",
        () => {
          card.style.transform =
            "";
        }
      );
    });
  }


  /* =========================================================
     SMOOTH ANCHOR SCROLL
  ========================================================= */

  function setupAnchorScroll() {
    $$('a[href^="#"]').forEach(
      (link) => {
        link.addEventListener(
          "click",
          (event) => {
            const targetId =
              link.getAttribute(
                "href"
              );

            if (
              !targetId ||
              targetId === "#"
            ) {
              return;
            }

            const target =
              $(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
              behavior:
                state.reducedMotion
                  ? "auto"
                  : "smooth",
              block: "start"
            });

            closeMenu();
          }
        );
      }
    );
  }


  /* =========================================================
     SCROLL HANDLER
  ========================================================= */

  function handleScroll() {
    updateHero();

    if (state.ticking) return;

    state.ticking = true;

    requestAnimationFrame(() => {
      revealSections();

      state.ticking = false;
    });
  }


  /* =========================================================
     KEYBOARD ACCESSIBILITY
  ========================================================= */

  function setupKeyboardControls() {
    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape" &&
          state.menuOpen
        ) {
          closeMenu();
        }
      }
    );
  }


  /* =========================================================
     PAGE VISIBILITY
  ========================================================= */

  function setupVisibilityHandling() {
    document.addEventListener(
      "visibilitychange",
      () => {
        /*
         * Nothing destructive here.
         * Frame animation simply continues naturally
         * when the browser decides to repaint.
         */
      }
    );
  }


  /* =========================================================
     INITIALIZATION
  ========================================================= */

  function init() {
    resizeCanvas();

    updateHero();

    revealSections();

    setupRevealObserver();

    setupActiveNavigation();

    setupMobileMenu();

    setupFAQ();

    setupCountdown();

    setupMagneticButtons();

    setupEventCards();

    setupAnchorScroll();

    setupKeyboardControls();

    setupVisibilityHandling();

    loadFrames();

    animateFrames();

    window.addEventListener(
      "resize",
      resizeCanvas,
      { passive: true }
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    /*
     * First paint.
     */

    requestAnimationFrame(() => {
      document.body.classList.add(
        "experience-started"
      );
    });
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
      { once: true }
    );
  } else {
    init();
  }

})();
