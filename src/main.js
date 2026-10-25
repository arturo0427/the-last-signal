import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { createTransmissionTimeline } from "./motion/transmission.js";

gsap.registerPlugin(ScrollTrigger);

createTransmissionTimeline();
