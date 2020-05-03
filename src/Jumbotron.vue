<template>
  <header class="pt-48 pb-12 md:pt-64 md:pb-32">
    <div class="overflow-y-hidden">
      <small
        class="block animate-text-up text-sm uppercase font-bold tracking-wider text-gray-700 dark:text-gray-500"
      >
        Welcome to my portfolio &#x1F44B;
      </small>
    </div>
    <div class="overflow-y-hidden">
      <h1 class="animate-text-up text-4xl md:text-6xl font-bold leading-tight">
        Hi! My name is Jason Liang, and I love front-end web development
      </h1>
    </div>
    <div class="overflow-y-hidden">
      <p
        class="animate-text-up text-gray-700 dark:text-gray-500 text-xl md:text-2xl pt-4 md:w-5/6 leading-relaxed"
      >
        I’m passionate about crafting accessible and highly performant
        applications for the web. Check out my profile on
        <a href="https://github.com/jasonliang512" class="link">GitHub</a>!
      </p>
    </div>
  </header>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  name: "Jumbotron",
  mounted() {
    anime({
      targets: ".overflow-y-hidden .animate-text-up",
      translateY: ["100%", 0],
      duration: 800,
      easing: "easeOutCubic",
      delay: anime.stagger(300, { start: 2300 })
    });
  }
};
</script>
