<template>
  <div
    class="animate-screen fixed z-50 bg-gray-850 inset-0 w-screen h-screen flex justify-center items-center"
  >
    <div class="text-5xl font-bold text-blue-100 leading-snug">
      <div class="-mb-12 flex justify-end">
        <svg
          class="animate-shape text-orange-400 order-1 mt-3"
          viewBox="0 0 32 32"
          stroke="currentColor"
          fill="none"
        >
          <rect x="6" y="6" rx="6" width="20" height="20" />
        </svg>
        <svg
          class="animate-shape text-teal-400 order-3 mt-12"
          viewBox="0 0 32 32"
          stroke="currentColor"
          fill="none"
        >
          <polygon
            points="16,7 26,24 6,24"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          class="animate-shape text-blue-500 order-2"
          viewBox="0 0 32 32"
          stroke="currentColor"
          fill="none"
        >
          <circle cx="16" cy="16" r="10" />
        </svg>
      </div>
      <div class="animate-name pr-12 overflow-hidden -mb-4">
        <span
          v-for="(char, i) in 'Jason'"
          :key="i"
          class="animate-name__first inline-block"
        >
          {{ char }}
        </span>
      </div>
      <div class="animate-name pl-12 overflow-hidden">
        <span
          v-for="(char, i) in 'Liang'"
          :key="i"
          class="animate-name__second inline-block"
        >
          {{ char }}
        </span>
      </div>
      <div class="relative pt-1">
        <div
          v-for="bgClass in [
            'bg-blue-600',
            'bg-orange-500',
            'bg-teal-500',
            'bg-white'
          ]"
          :key="bgClass"
          class="animate-line absolute h-1 rounded-full"
          :class="bgClass"
        />
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  name: "IntroScreen",
  mounted() {
    const nameAnimationOptions = {
      translateY: ["200%", 0],
      scaleY: [3, 1],
      duration: 800,
      easing: "easeOutElastic(1, .9)"
    };

    anime({
      ...nameAnimationOptions,
      targets: ".animate-name .animate-name__first",
      delay: anime.stagger(30, { start: 500 })
    });

    anime({
      ...nameAnimationOptions,
      targets: ".animate-name .animate-name__second",
      delay: anime.stagger(30, { start: 700 })
    });

    anime({
      targets: ".animate-line",
      delay: anime.stagger(120, { start: 900 }),
      width: [0, "105%"],
      duration: 500,
      easing: "easeOutCubic"
    });

    anime({
      targets: ".animate-shape",
      delay: anime.stagger(90, { start: 1000 }),
      strokeWidth: [8, 0],
      duration: 700,
      opacity: [0, ...Array(7).fill(1)],
      easing: "easeOutQuad"
    });

    anime({
      targets: ".animate-screen",
      translateY: "-100vh",
      delay: 1800,
      duration: 800,
      easing: "easeInOutCubic"
    });
  }
};
</script>

<style scoped>
.animate-shape {
  @apply w-6 h-6 opacity-0;
}
</style>
