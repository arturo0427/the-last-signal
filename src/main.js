import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createTransmissionTimeline } from "./motion/transmission.js";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (prefersReducedMotion) {
  document.documentElement.classList.add("reduced-motion");
} else {
  createTransmissionTimeline();
}
