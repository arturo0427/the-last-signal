import { gsap } from "gsap";

const SIGNAL_PATHS = {
  flat: `
    M0 20
    L300 20
    L340 20
    L380 20
    L420 20
    L460 20
    L500 20
    L540 20
    L580 20
    L620 20
    L660 20
    L700 20
    L1000 20
  `,

  detected: `
  M0 20
  L300 20
  L340 20
  L380 20
  L420 20
  L460 12
  L500 28
  L540 13
  L580 27
  L620 20
  L660 20
  L700 20
  L1000 20
`,

  decode: `
    M0 20
    L300 20
    L340 20
    L380 16
    L420 26
    L460 10
    L500 30
    L540 14
    L580 25
    L620 18
    L660 20
    L700 20
    L1000 20
  `,

  peak: `
    M0 20
    L300 20
    L340 12
    L380 30
    L420 8
    L460 32
    L500 6
    L540 34
    L580 10
    L620 30
    L660 14
    L700 20
    L1000 20
  `,

  message: `
    M0 20
    L300 20
    L340 20
    L380 20
    L420 20
    L460 20
    L500 20
    L540 20
    L580 15
    L620 25
    L660 20
    L700 20
    L1000 20
  `,

  failure: `
    M0 20
    L300 20
    L340 20
    L380 20
    L420 12
    L460 28
    L500 18
    L540 20
    L580 20
    L620 9
    L660 30
    L700 20
    L1000 20
  `,
};

export function createTransmissionTimeline() {
  const matchMedia = gsap.matchMedia();

  matchMedia.add("(min-width: 768px)", () => {
    createDesktopTimeline();
  });

  matchMedia.add("(max-width: 767px)", () => {
    createMobileTimeline();
  });

  return () => matchMedia.revert();
}

function createDesktopTimeline() {
  const scene = document.querySelector(".signal");

  const lost = document.querySelector(".frame--lost");
  const decode = document.querySelector(".frame--decode");
  const failure = document.querySelector(".frame--failure");
  const message = document.querySelector(".frame--message");
  const detected = document.querySelector(".frame--detected");
  const lostTime = document.querySelector(".frame-lost__time");
  const searching = document.querySelector(".frame--searching");
  const decodePeak = document.querySelector(".frame--decode-peak");
  const replayButton = document.querySelector(".frame-lost__replay");
  const lostTitleLines = document.querySelectorAll(".frame-lost__title span");
  const messageLines = document.querySelectorAll(".frame-message__line");
  const corruptedMessage = document.querySelectorAll(
    ".frame-message__corrupted",
  );
  const resolvedMessage = document.querySelectorAll(".frame-message__resolved");
  const failureLines = document.querySelectorAll(".frame-failure__title span");

  const header = document.querySelector(".signal__header");
  const footer = document.querySelector(".signal__footer");
  const statusValue = document.querySelector(".js-status-value");
  const signalValue = document.querySelector(".js-signal-value");
  const signalLine = document.querySelector(".signal-line");
  const signalImage = document.querySelector(".signal-image");
  const signalImageMedia = document.querySelector(".signal-image__media");
  const signalLinePath = document.querySelector(".signal-line__path");

  const systemData = {
    signal: 0,
  };

  if (
    !scene ||
    !searching ||
    !detected ||
    !decode ||
    !decodePeak ||
    !message ||
    !failure ||
    !lost ||
    !signalImage ||
    !signalLine ||
    !signalLinePath ||
    !header ||
    !footer ||
    !messageLines.length ||
    !failureLines.length ||
    !lostTitleLines.length ||
    !lostTime ||
    !replayButton ||
    !statusValue ||
    !signalValue ||
    !signalImageMedia ||
    !corruptedMessage.length ||
    !resolvedMessage.length
  ) {
    return;
  }

  gsap.set(searching, {
    autoAlpha: 1,
    y: 0,
  });

  gsap.set(detected, {
    autoAlpha: 0,
    y: 40,
    clipPath: "inset(12% 0 12% 0)",
  });

  gsap.set(decode, {
    autoAlpha: 0,
    y: 30,
  });

  gsap.set(signalLine, {
    top: "50%",
    zIndex: 1,
  });

  gsap.set(signalImageMedia, {
    scale: 1.08,
    yPercent: 4,
  });

  gsap.set(signalLinePath, {
    attr: {
      d: SIGNAL_PATHS.flat,
    },
    opacity: 0.45,
  });

  gsap.set(decodePeak, {
    autoAlpha: 0,
    y: 24,
  });

  gsap.set(message, {
    autoAlpha: 0,
  });

  gsap.set(messageLines, {
    yPercent: 110,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set(corruptedMessage, {
    autoAlpha: 1,
  });

  gsap.set(resolvedMessage, {
    autoAlpha: 0,
  });

  gsap.set(failure, {
    autoAlpha: 0,
  });

  gsap.set(failureLines, {
    autoAlpha: 0,
    yPercent: 35,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set(lost, {
    autoAlpha: 0,
  });

  gsap.set(lostTitleLines, {
    yPercent: 80,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set([lostTime, replayButton], {
    autoAlpha: 0,
    y: 16,
  });

  gsap.set(signalImage, {
    autoAlpha: 0,
    top: "50%",
    left: "100%",
    width: "41%",
    height: "78%",
    xPercent: -100,
    yPercent: -50,
    clipPath: "polygon(46% 0%, 54% 0%, 60% 100%, 40% 100%)",
  });

  function updateSystemData(time) {
    signalValue.textContent = `${systemData.signal.toFixed(2)}%`;

    if (time < 1.2) {
      statusValue.textContent = "Searching";
      return;
    }

    if (time < 2.7) {
      statusValue.textContent = "Detected";
      return;
    }

    if (time < 6.2) {
      statusValue.textContent = "Decoding";
      return;
    }

    if (time < 7.8) {
      statusValue.textContent = "Decoded";
      return;
    }

    if (time < 9.8) {
      statusValue.textContent = "Unstable";
      return;
    }

    statusValue.textContent = "Lost";
  }

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: () => `+=${window.innerHeight * 7}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      markers: true,
      onUpdate: () => {
        updateSystemData(timeline.time());
      },
    },
  });

  timeline.addLabel("searching", 0);

  timeline.to(
    searching,
    {
      autoAlpha: 0,
      y: -40,

      duration: 0.6,
    },
    1.2,
  );

  timeline.to(
    detected,
    {
      autoAlpha: 1,
      y: 0,
      clipPath: "inset(0% 0 0% 0)",

      duration: 0.9,
    },
    1.35,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.detected,
      },

      duration: 0.8,
    },
    1.35,
  );

  timeline.to(
    signalImage,
    {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

      duration: 0.9,
    },
    1.45,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.05,
      yPercent: 2,
      duration: 0.9,
    },
    1.45,
  );

  timeline.addLabel("detected", 2.7);

  timeline.to(
    detected,
    {
      autoAlpha: 0,
      y: -30,

      duration: 0.7,
    },
    2.7,
  );

  timeline.to(
    decode,
    {
      autoAlpha: 1,
      y: 0,

      duration: 0.8,
    },
    2.85,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.decode,
      },
      duration: 1,
    },
    2.75,
  );

  timeline.to(
    signalImage,
    {
      top: "50%",
      left: "50%",

      width: "72%",
      height: "68%",

      xPercent: -50,
      yPercent: -50,

      duration: 1.3,
    },
    2.75,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.12,
      yPercent: -2,
      duration: 1.3,
    },
    2.75,
  );

  timeline.set(
    signalLine,
    {
      zIndex: 6,
    },
    2.9,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.75,

      duration: 0.8,
    },
    2.9,
  );

  timeline.addLabel("decode", 4.5);

  timeline.to(
    decode,
    {
      autoAlpha: 0,
      y: -24,

      duration: 0.6,
    },
    4.5,
  );

  timeline.to(
    decodePeak,
    {
      autoAlpha: 1,
      y: 0,

      duration: 0.8,
    },
    4.65,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.peak,
      },
      duration: 1.4,
    },
    4.5,
  );

  timeline.to(
    signalImage,
    {
      width: "82%",
      height: "76%",

      duration: 1.5,
    },
    4.5,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.16,
      yPercent: -5,
      duration: 1.5,
    },
    4.5,
  );

  timeline.to(
    signalLine,
    {
      top: "68%",

      duration: 1.5,
    },
    4.5,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.85,

      duration: 1,
    },
    4.6,
  );

  timeline.addLabel("decodePeak", 6.2);

  timeline.to(
    decodePeak,
    {
      autoAlpha: 0,
      y: -20,

      duration: 0.6,
    },
    6.2,
  );

  timeline.to(
    message,
    {
      autoAlpha: 1,

      duration: 0.4,
    },
    6.35,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.message,
      },
      duration: 1,
    },
    6.2,
  );

  timeline.to(
    signalImage,
    {
      left: "75%",

      width: "42%",
      height: "72%",

      xPercent: -50,
      yPercent: -50,

      opacity: 0.45,

      duration: 1.4,
    },
    6.2,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.08,
      yPercent: 0,
      duration: 1.4,
    },
    6.2,
  );

  timeline.to(
    signalLine,
    {
      top: "76%",

      duration: 1.2,
    },
    6.2,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.28,

      duration: 1,
    },
    6.25,
  );

  timeline.to(
    [header, footer],
    {
      opacity: 0.35,

      duration: 0.8,
    },
    6.3,
  );

  timeline.to(
    messageLines[0],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.25,
    },
    6.3,
  );

  timeline.to(
    messageLines[1],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.25,
    },
    6.5,
  );

  timeline.to(
    messageLines[2],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.25,
    },
    6.7,
  );

  timeline.to(
    corruptedMessage[0],
    {
      autoAlpha: 0,
      duration: 0.18,
    },
    7.1,
  );

  timeline.to(
    resolvedMessage[0],
    {
      autoAlpha: 1,
      duration: 0.18,
    },
    7.1,
  );

  timeline.to(
    corruptedMessage[1],
    {
      autoAlpha: 0,
      duration: 0.18,
    },
    7.3,
  );

  timeline.to(
    resolvedMessage[1],
    {
      autoAlpha: 1,
      duration: 0.18,
    },
    7.3,
  );

  timeline.to(
    corruptedMessage[2],
    {
      autoAlpha: 0,
      duration: 0.18,
    },
    7.5,
  );

  timeline.to(
    resolvedMessage[2],
    {
      autoAlpha: 1,
      duration: 0.18,
    },
    7.5,
  );

  timeline.addLabel("message", 7.8);

  timeline.to(
    messageLines,
    {
      scaleX: 0.96,
      opacity: 0.35,

      duration: 0.35,
    },
    7.8,
  );

  timeline.to(
    message,
    {
      autoAlpha: 0,

      duration: 0.5,
    },
    7.95,
  );

  timeline.to(
    failure,
    {
      autoAlpha: 1,

      duration: 0.35,
    },
    7.9,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.failure,
      },
      duration: 0.9,
    },
    7.8,
  );

  timeline.to(
    failureLines[0],
    {
      autoAlpha: 1,
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.45,
    },
    8.0,
  );

  timeline.to(
    failureLines[1],
    {
      autoAlpha: 1,
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.4,
    },
    8.18,
  );

  timeline.to(
    failureLines[2],
    {
      autoAlpha: 1,
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.45,
    },
    8.34,
  );

  timeline.to(
    signalImage,
    {
      left: "75%",

      width: "34%",
      height: "54%",

      scaleX: 0.82,
      opacity: 0.26,

      duration: 1.1,
    },
    7.85,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.18,
      yPercent: 3,
      duration: 1.1,
    },
    7.85,
  );

  timeline.to(
    signalLine,
    {
      top: "68%",

      duration: 0.9,
    },
    7.9,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.16,

      duration: 0.8,
    },
    7.9,
  );

  timeline.to(
    [header, footer],
    {
      opacity: 1,

      duration: 0.7,
    },
    7.9,
  );

  timeline.addLabel("failure", 9.1);

  timeline.to(
    failureLines,
    {
      opacity: 0,
      yPercent: -20,

      duration: 0.45,
    },
    9.1,
  );

  timeline.to(
    failure,
    {
      autoAlpha: 0,

      duration: 0.5,
    },
    9.2,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.flat,
      },
      duration: 0.8,
    },
    9.1,
  );

  timeline.to(
    signalImage,
    {
      autoAlpha: 0,
      scaleX: 0.65,

      duration: 0.7,
    },
    9.1,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.25,
      yPercent: 8,
      duration: 0.7,
    },
    9.1,
  );

  timeline.to(
    signalLine,
    {
      top: "50%",

      duration: 0.8,
    },
    9.15,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.3,

      duration: 0.8,
    },
    9.15,
  );

  timeline.to(
    lost,
    {
      autoAlpha: 1,

      duration: 0.35,
    },
    9.35,
  );

  timeline.to(
    lostTitleLines[0],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.4,
    },
    9.4,
  );

  timeline.to(
    lostTitleLines[1],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.45,
    },
    9.55,
  );

  timeline.to(
    lostTime,
    {
      autoAlpha: 1,
      y: 0,

      duration: 0.35,
    },
    9.7,
  );

  timeline.to(
    replayButton,
    {
      autoAlpha: 1,
      y: 0,

      duration: 0.35,
    },
    9.82,
  );

  timeline.addLabel("lost", 10);

  timeline.to(
    systemData,
    {
      signal: 12.84,

      duration: 1.5,

      onUpdate: () => {
        updateSystemData(timeline.time());
      },
    },
    1.2,
  );

  timeline.to(
    systemData,
    {
      signal: 17.2,

      duration: 1.8,

      onUpdate: () => {
        updateSystemData(timeline.time());
      },
    },
    2.7,
  );

  timeline.to(
    systemData,
    {
      signal: 84.2,

      duration: 1.7,

      onUpdate: () => {
        updateSystemData(timeline.time());
      },
    },
    4.5,
  );

  timeline.to(
    systemData,
    {
      signal: 97.31,

      duration: 1.6,

      onUpdate: () => {
        updateSystemData(timeline.time());
      },
    },
    6.2,
  );

  timeline.to(
    systemData,
    {
      signal: 31.08,

      duration: 1.3,

      onUpdate: () => {
        updateSystemData(timeline.time());
      },
    },
    7.8,
  );

  timeline.to(
    systemData,
    {
      signal: 0,

      duration: 0.9,

      onUpdate: () => {
        updateSystemData(timeline.time());
      },
    },
    9.1,
  );

  updateSystemData(0);
}

function createMobileTimeline() {
  const scene = document.querySelector(".signal");
  const lost = document.querySelector(".frame--lost");
  const decode = document.querySelector(".frame--decode");
  const failure = document.querySelector(".frame--failure");
  const detected = document.querySelector(".frame--detected");
  const lostTime = document.querySelector(".frame-lost__time");
  const searching = document.querySelector(".frame--searching");
  const decodePeak = document.querySelector(".frame--decode-peak");
  const replayButton = document.querySelector(".frame-lost__replay");
  const lostTitleLines = document.querySelectorAll(".frame-lost__title span");
  const failureLines = document.querySelectorAll(".frame-failure__title span");

  const statusValue = document.querySelector(".js-status-value");
  const signalValue = document.querySelector(".js-signal-value");

  const signalLine = document.querySelector(".signal-line");
  const signalImage = document.querySelector(".signal-image");
  const signalLinePath = document.querySelector(".signal-line__path");
  const signalImageMedia = document.querySelector(".signal-image__media");

  const message = document.querySelector(".frame--message");
  const messageLines = document.querySelectorAll(".frame-message__line");
  const corruptedMessage = document.querySelectorAll(
    ".frame-message__corrupted",
  );
  const resolvedMessage = document.querySelectorAll(".frame-message__resolved");

  const header = document.querySelector(".signal__header");
  const footer = document.querySelector(".signal__footer");

  if (
    !scene ||
    !searching ||
    !detected ||
    !decode ||
    !decodePeak ||
    !message ||
    !failure ||
    !lost ||
    !signalImage ||
    !signalLine ||
    !signalLinePath ||
    !header ||
    !footer ||
    !statusValue ||
    !signalValue ||
    !messageLines.length ||
    !failureLines.length ||
    !lostTitleLines.length ||
    !lostTime ||
    !signalImageMedia ||
    !replayButton ||
    !corruptedMessage.length ||
    !resolvedMessage.length
  ) {
    return;
  }

  gsap.set(searching, {
    autoAlpha: 1,
    y: 0,
  });

  gsap.set(detected, {
    autoAlpha: 0,
    y: 24,
  });

  gsap.set(signalImage, {
    autoAlpha: 0,

    top: "58%",
    left: "63%",

    width: "74%",
    height: "42vh",

    xPercent: -50,
    yPercent: -50,

    clipPath: "polygon(44% 0%, 56% 0%, 62% 100%, 38% 100%)",
  });

  gsap.set(signalLine, {
    top: "50%",
    zIndex: 1,
  });

  gsap.set(signalLinePath, {
    attr: {
      d: SIGNAL_PATHS.flat,
    },
    opacity: 0.45,
  });

  gsap.set(decode, {
    autoAlpha: 0,
    y: 20,
  });

  gsap.set(decodePeak, {
    autoAlpha: 0,
    y: 18,
  });

  gsap.set(message, {
    autoAlpha: 0,
  });

  gsap.set(messageLines, {
    yPercent: 80,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set(corruptedMessage, {
    autoAlpha: 1,
  });

  gsap.set(resolvedMessage, {
    autoAlpha: 0,
  });

  gsap.set(failure, {
    autoAlpha: 0,
  });

  gsap.set(failureLines, {
    autoAlpha: 0,
    yPercent: 25,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set(lost, {
    autoAlpha: 0,
  });

  gsap.set(lostTitleLines, {
    yPercent: 60,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set([lostTime, replayButton], {
    autoAlpha: 0,
    y: 12,
  });

  gsap.set(signalImageMedia, {
    scale: 1.06,
    yPercent: 3,
  });

  const systemData = {
    signal: 0,
  };

  function updateSystemData(time) {
    signalValue.textContent = `${systemData.signal.toFixed(2)}%`;

    if (time < 0.8) {
      statusValue.textContent = "Searching";
      return;
    }

    if (time < 1.8) {
      statusValue.textContent = "Detected";
      return;
    }

    if (time < 3.9) {
      statusValue.textContent = "Decoding";
      return;
    }

    if (time < 4.9) {
      statusValue.textContent = "Decoded";
      return;
    }

    if (time < 6.45) {
      statusValue.textContent = "Unstable";
      return;
    }

    statusValue.textContent = "Lost";
  }

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },

    scrollTrigger: {
      trigger: scene,

      start: "top top",
      end: () => `+=${window.innerHeight * 6.2}`,

      pin: true,
      scrub: 1,

      invalidateOnRefresh: true,

      markers: true,

      onUpdate: () => {
        updateSystemData(timeline.time());
      },
    },
  });

  timeline.to(
    systemData,
    {
      signal: 12.84,
      duration: 1,
      onUpdate: () => updateSystemData(timeline.time()),
    },
    0.8,
  );

  timeline.to(
    systemData,
    {
      signal: 17.2,
      duration: 1.1,
      onUpdate: () => updateSystemData(timeline.time()),
    },
    1.8,
  );

  timeline.to(
    systemData,
    {
      signal: 84.2,
      duration: 1,
      onUpdate: () => updateSystemData(timeline.time()),
    },
    2.9,
  );

  timeline.to(
    systemData,
    {
      signal: 97.31,
      duration: 1,
      onUpdate: () => updateSystemData(timeline.time()),
    },
    3.9,
  );

  timeline.to(
    systemData,
    {
      signal: 31.08,
      duration: 1,
      onUpdate: () => updateSystemData(timeline.time()),
    },
    4.9,
  );

  timeline.to(
    systemData,
    {
      signal: 0,
      duration: 0.7,
      onUpdate: () => updateSystemData(timeline.time()),
    },
    5.9,
  );

  updateSystemData(0);

  timeline.addLabel("searching", 0);

  timeline.to(
    searching,
    {
      autoAlpha: 0,
      y: -24,

      duration: 0.45,
    },
    0.8,
  );

  timeline.to(
    detected,
    {
      autoAlpha: 1,
      y: 0,

      duration: 0.6,
    },
    0.9,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.detected,
      },
      duration: 0.55,
    },
    0.9,
  );

  timeline.to(
    signalImage,
    {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

      duration: 0.65,
    },
    0.95,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.04,
      yPercent: 1,

      duration: 0.65,
    },
    0.95,
  );

  timeline.addLabel("detected", 1.8);

  timeline.to(
    detected,
    {
      autoAlpha: 0,
      y: -20,

      duration: 0.45,
    },
    1.8,
  );

  timeline.to(
    decode,
    {
      autoAlpha: 1,
      y: 0,

      duration: 0.55,
    },
    1.9,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.decode,
      },
      duration: 0.7,
    },
    1.82,
  );

  timeline.to(
    signalImage,
    {
      top: "51%",
      left: "50%",

      width: "100%",
      height: "48%",

      xPercent: -50,
      yPercent: -50,

      duration: 0.85,
    },
    1.82,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.09,
      yPercent: -2,

      duration: 0.85,
    },
    1.82,
  );

  timeline.set(
    signalLine,
    {
      zIndex: 6,
    },
    1.95,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.75,

      duration: 0.55,
    },
    1.95,
  );

  timeline.addLabel("decode", 2.9);

  timeline.to(
    decode,
    {
      autoAlpha: 0,
      y: -18,

      duration: 0.4,
    },
    2.9,
  );

  timeline.to(
    decodePeak,
    {
      autoAlpha: 1,
      y: 0,

      duration: 0.5,
    },
    3.0,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.peak,
      },
      duration: 0.75,
    },
    2.92,
  );

  timeline.to(
    signalImage,
    {
      top: "50%",

      width: "100%",
      height: "58%",

      duration: 0.8,
    },
    2.92,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.12,
      yPercent: -4,

      duration: 0.8,
    },
    2.92,
  );

  timeline.to(
    signalLine,
    {
      top: "62%",

      duration: 0.8,
    },
    2.92,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.85,

      duration: 0.55,
    },
    3.0,
  );

  timeline.addLabel("decodePeak", 3.9);

  timeline.to(
    decodePeak,
    {
      autoAlpha: 0,
      y: -16,

      duration: 0.4,
    },
    3.9,
  );

  timeline.to(
    message,
    {
      autoAlpha: 1,

      duration: 0.3,
    },
    4.0,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.message,
      },
      duration: 0.65,
    },
    3.9,
  );

  timeline.to(
    signalImage,
    {
      top: "58%",
      left: "70%",

      width: "74%",
      height: "46%",

      xPercent: -50,
      yPercent: -50,

      opacity: 0.3,

      duration: 0.85,
    },
    3.9,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.06,
      yPercent: 0,

      duration: 0.85,
    },
    3.9,
  );

  timeline.to(
    signalLine,
    {
      top: "78%",

      duration: 0.75,
    },
    3.9,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.28,

      duration: 0.6,
    },
    3.95,
  );

  timeline.to(
    [header, footer],
    {
      opacity: 0.35,

      duration: 0.5,
    },
    4.0,
  );

  /* ======================================================
   MESSAGE RECONSTRUCTION — MOBILE
====================================================== */

  /* Primero aparecen las líneas corruptas */

  timeline.to(
    messageLines[0],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.2,
    },
    4.0,
  );

  timeline.to(
    messageLines[1],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.2,
    },
    4.15,
  );

  timeline.to(
    messageLines[2],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.2,
    },
    4.3,
  );

  /* WE A_E → WE ARE */

  timeline.to(
    corruptedMessage[0],
    {
      autoAlpha: 0,
      duration: 0.12,
    },
    4.55,
  );

  timeline.to(
    resolvedMessage[0],
    {
      autoAlpha: 1,
      duration: 0.12,
    },
    4.55,
  );

  timeline.to(
    corruptedMessage[1],
    {
      autoAlpha: 0,
      duration: 0.12,
    },
    4.67,
  );

  timeline.to(
    resolvedMessage[1],
    {
      autoAlpha: 1,
      duration: 0.12,
    },
    4.67,
  );

  timeline.to(
    corruptedMessage[2],
    {
      autoAlpha: 0,
      duration: 0.12,
    },
    4.79,
  );

  timeline.to(
    resolvedMessage[2],
    {
      autoAlpha: 1,
      duration: 0.12,
    },
    4.79,
  );

  timeline.addLabel("message", 4.9);

  timeline.to(
    messageLines,
    {
      opacity: 0.3,
      scaleX: 0.97,

      duration: 0.3,
    },
    4.9,
  );

  timeline.to(
    message,
    {
      autoAlpha: 0,

      duration: 0.4,
    },
    5.02,
  );

  timeline.to(
    failure,
    {
      autoAlpha: 1,

      duration: 0.3,
    },
    5.0,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.failure,
      },
      duration: 0.6,
    },
    4.98,
  );

  timeline.to(
    failureLines[0],
    {
      autoAlpha: 1,
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.35,
    },
    5.08,
  );

  timeline.to(
    failureLines[1],
    {
      autoAlpha: 1,
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.35,
    },
    5.22,
  );

  timeline.to(
    failureLines[2],
    {
      autoAlpha: 1,
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.4,
    },
    5.36,
  );

  timeline.to(
    signalImage,
    {
      top: "59%",
      left: "72%",

      width: "60%",
      height: "38%",

      xPercent: -50,
      yPercent: -50,

      scaleX: 0.78,
      opacity: 0.2,

      duration: 0.75,
    },
    4.98,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.13,
      yPercent: 2,

      duration: 0.75,
    },
    4.98,
  );

  timeline.to(
    signalLine,
    {
      top: "72%",

      duration: 0.65,
    },
    5.0,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.16,

      duration: 0.5,
    },
    5.0,
  );

  timeline.to(
    [header, footer],
    {
      opacity: 1,

      duration: 0.5,
    },
    5.0,
  );

  timeline.addLabel("failure", 5.9);

  timeline.to(
    failureLines,
    {
      opacity: 0,
      yPercent: -15,

      duration: 0.35,
    },
    5.9,
  );

  timeline.to(
    failure,
    {
      autoAlpha: 0,

      duration: 0.4,
    },
    6.0,
  );

  timeline.to(
    signalLinePath,
    {
      attr: {
        d: SIGNAL_PATHS.flat,
      },
      duration: 0.55,
    },
    5.92,
  );

  timeline.to(
    signalImage,
    {
      autoAlpha: 0,
      scaleX: 0.6,

      duration: 0.55,
    },
    5.92,
  );

  timeline.to(
    signalImageMedia,
    {
      scale: 1.18,
      yPercent: 6,

      duration: 0.55,
    },
    5.92,
  );

  timeline.to(
    signalLine,
    {
      top: "52%",

      duration: 0.6,
    },
    5.95,
  );

  timeline.to(
    signalLinePath,
    {
      opacity: 0.3,

      duration: 0.55,
    },
    5.95,
  );

  timeline.to(
    lost,
    {
      autoAlpha: 1,

      duration: 0.25,
    },
    6.08,
  );

  timeline.to(
    lostTitleLines[0],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.3,
    },
    6.12,
  );

  timeline.to(
    lostTitleLines[1],
    {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",

      duration: 0.35,
    },
    6.24,
  );

  timeline.to(
    lostTime,
    {
      autoAlpha: 1,
      y: 0,

      duration: 0.25,
    },
    6.34,
  );

  timeline.to(
    replayButton,
    {
      autoAlpha: 1,
      y: 0,

      duration: 0.25,
    },
    6.42,
  );

  timeline.addLabel("lost", 6.6);
}
