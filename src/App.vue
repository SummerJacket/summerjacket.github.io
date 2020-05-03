<template>
  <div class="overflow-x-hidden" :class="{ 'mode-dark': darkModeEnabled }">
    <intro-screen />
    <div
      class="relative bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-400 font-semibold"
      :class="{ 'easter-egg': easterEggEnabled }"
    >
      <div
        class="bottom-0 pb-8 absolute z-40 flex justify-end w-screen pointer-events-none"
        style="min-width: 3200px"
      >
        <div class="text-6xl mr-4 font-bold" style="writing-mode: vertical-rl">
          Woah, you have an insanely wide monitor
        </div>
      </div>
      <div
        class="absolute z-0 dots right-0 top-0 w-16 md:w-32 mt-12"
        style="height: 24rem"
      />
      <div
        class="absolute z-0 dots left-0 bottom-0 h-8 md:h-32 ml-12"
        style="width: 18rem"
      />
      <theme-button
        @click="darkModeEnabled = !darkModeEnabled"
        :dark-mode-enabled="darkModeEnabled"
      />
      <div class="relative z-10 max-w-4xl mx-auto px-8">
        <jumbotron />
        <main-content v-bind="{ projects, skills }" />
        <site-footer />
      </div>
    </div>
  </div>
</template>

<script>
import Konami from "konami";

import IntroScreen from "./IntroScreen.vue";
import Jumbotron from "./Jumbotron.vue";
import MainContent from "./MainContent.vue";
import SiteFooter from "./SiteFooter.vue";
import ThemeButton from "./ThemeButton.vue";

export default {
  name: "App",
  components: { IntroScreen, Jumbotron, MainContent, SiteFooter, ThemeButton },
  props: ["projects", "skills"],
  data() {
    return {
      easterEggEnabled: false,
      darkModeEnabled:
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    };
  },
  mounted() {
    let vm = this;

    new Konami(() => {
      vm.easterEggEnabled = !vm.easterEggEnabled;
    });
  }
};
</script>

<style scoped>
.dots {
  background-image: url(/images/300.png);
}

.mode-dark .dots {
  background-image: url(/images/800.png);
}

.easter-egg {
  background-image: url("/images/nezuko.gif");
}

.easter-egg >>> * {
  animation: rainbow 5s linear;
  animation-iteration-count: infinite;
}

@keyframes rainbow {
  100%,
  0% {
    color: rgb(255, 0, 0);
  }
  8% {
    color: rgb(255, 127, 0);
  }
  16% {
    color: rgb(255, 255, 0);
  }
  25% {
    color: rgb(127, 255, 0);
  }
  33% {
    color: rgb(0, 255, 0);
  }
  41% {
    color: rgb(0, 255, 127);
  }
  50% {
    color: rgb(0, 255, 255);
  }
  58% {
    color: rgb(0, 127, 255);
  }
  66% {
    color: rgb(0, 0, 255);
  }
  75% {
    color: rgb(127, 0, 255);
  }
  83% {
    color: rgb(255, 0, 255);
  }
  91% {
    color: rgb(255, 0, 127);
  }
}
</style>
