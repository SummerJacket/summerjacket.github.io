<template>
  <div class="bg-gray-100 text-gray-900 font-semibold overflow-x-hidden">
    <div class="max-w-4xl mx-auto px-4">
      <header class="py-64">
        <small class="text-sm uppercase font-bold tracking-wider text-gray-700">
          Welcome to my portfolio &#x1F44B;
        </small>
        <h1 class="text-6xl font-bold leading-tight">
          Hi! My name is
          <span class="text-blue-700">Jason Liang</span>
          and I love front-end development
        </h1>
        <p class="text-2xl pt-4 w-5/6 leading-relaxed">
          I’m passionate about crafting accessible and highly performant
          applications for the web.
        </p>
      </header>
      <main>
        <section-header bg-text="Personal Projects">Projects</section-header>
        <div class="pt-16 grid row-gap-12 max-w-3xl mx-auto">
          <project
            v-bind="project"
            v-for="project in projects"
            :key="project.title"
          />
        </div>
        <section-header class="pt-48" bg-text="About Myself">
          About Me
        </section-header>
        <p class="text-2xl w-3/4 leading-relaxed">
          Learning continuously is one of my core values. I find joy by
          exploring the many different web technologies that are out in the
          wild. I also love to create (and break) tiny coding projects with my
          spare time. When I’m not programming, I’m either listening to music
          &#x1F3A7; or playing the guitar &#x1F3B8;
        </p>
        <h3 class="text-5xl font-bold pt-24 pb-12">Skills</h3>
        <div class="grid row-gap-10">
          <skill-section
            v-for="skill in skills"
            :key="skill.title"
            v-bind="skill"
          />
        </div>
        <h3 class="text-5xl font-bold pt-32 pb-16">Let’s get in touch</h3>
        <h4 class="text-2xl font-bold pb-1">Email Address</h4>
        <a
          href="mailto:jasonliang512@gmail.com"
          class="transition-colors duration-200 text-2xl pb-1 text-gray-600 hover:text-gray-700 border-b-2 border-gray-600"
        >
          jasonliang512@gmail.com
        </a>
      </main>
    </div>
    <footer class="pt-56 pb-16">
      <div class="text-center pb-12">
        <a href="https://codepen.io/jasonliang512" class="social-link">
          <svg viewBox="0 0 512 512" fill="currentColor">
            <path
              d="M502.285 159.704l-234-156c-7.987-4.915-16.511-4.96-24.571 0l-234 156C3.714 163.703 0 170.847 0 177.989v155.999c0 7.143 3.714 14.286 9.715 18.286l234 156.022c7.987 4.915 16.511 4.96 24.571 0l234-156.022c6-3.999 9.715-11.143 9.715-18.286V177.989c-.001-7.142-3.715-14.286-9.716-18.285zM278 63.131l172.286 114.858-76.857 51.429L278 165.703V63.131zm-44 0v102.572l-95.429 63.715-76.857-51.429L234 63.131zM44 219.132l55.143 36.857L44 292.846v-73.714zm190 229.715L61.714 333.989l76.857-51.429L234 346.275v102.572zm22-140.858l-77.715-52 77.715-52 77.715 52-77.715 52zm22 140.858V346.275l95.429-63.715 76.857 51.429L278 448.847zm190-156.001l-55.143-36.857L468 219.132v73.714z"
            />
          </svg>
        </a>
        <a href="https://github.com/jasonliang512" class="social-link">
          <svg viewBox="0 0 1024 1024" fill="currentColor">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
              transform="scale(64)"
            />
          </svg>
        </a>
        <a href="https://dribbble.com/jasonliang512" class="social-link">
          <svg viewBox="0 0 512 512" fill="currentColor">
            <path
              d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"
            />
          </svg>
        </a>
      </div>
      <span class="block font-bold text-center">
        Made with code by me
      </span>
    </footer>
  </div>
</template>

<script>
import Project from "./components/Project.vue";
import SkillSection from "./components/SkillSection.vue";
import SectionHeader from "./components/SectionHeader.vue";

export default {
  name: "App",
  components: { Project, SectionHeader, SkillSection },
  props: ["projects", "skills"]
};
</script>

<style scoped>
.social-link {
  @apply inline-block;
  @apply text-gray-700;
  @apply w-8 h-8 mx-5;
  @apply transition-colors duration-200;
}

.social-link:hover {
  @apply text-gray-850;
}
</style>
