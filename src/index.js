import anime from "animejs/lib/anime.es.js";

import "alpinejs";
import "./style.css";

// -- intro-screen

const nameAnimationOptions = {
  translateY: ["200%", 0],
  scaleY: [3.5, 1],
  duration: 800,
  easing: "easeOutElastic(1, .9)"
};

anime({
  ...nameAnimationOptions,
  targets: ".animate-name .animate-name__first",
  delay: anime.stagger(30, { start: 400 })
});

anime({
  ...nameAnimationOptions,
  targets: ".animate-name .animate-name__second",
  delay: anime.stagger(30, { start: 600 })
});

anime({
  targets: ".animate-line",
  delay: anime.stagger(120, { start: 800 }),
  width: [0, "105%"],
  duration: 500,
  easing: "easeOutCubic"
});

const animateShapeOptions = {
  targets: ".animate-shape",
  delay: anime.stagger(100, { start: 900 }),
  easing: "easeOutQuad"
};

anime({
  ...animateShapeOptions,
  strokeWidth: [8, 0],
  duration: 500
});

anime({
  ...animateShapeOptions,
  opacity: [0, 1],
  duration: 100
});

anime({
  targets: ".animate-screen",
  translateY: [0, "-100vh"],
  delay: 1800,
  duration: 800,
  easing: "easeInOutCubic"
});

// -- header

anime({
  targets: "header .overflow-y-hidden .animate-text-up",
  translateY: ["100%", 0],
  duration: 700,
  easing: "easeOutCubic",
  delay: anime.stagger(300, { start: 2300 })
});
