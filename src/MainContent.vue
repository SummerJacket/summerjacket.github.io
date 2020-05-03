<template>
  <main>
    <section-header bg-text="Personal Projects">Projects</section-header>
    <div
      class="md:pt-8 grid row-gap-8 md:row-gap-12 max-w-3xl -mx-4 sm:mx-auto"
    >
      <project
        v-bind="project"
        v-for="project in projects"
        :key="project.title"
      />
    </div>
    <section-header class="pt-12 md:pt-32" bg-text="About Myself">
      About Me
    </section-header>
    <p
      class="text-gray-800 dark:text-gray-500 text-xl md:text-2xl md:w-3/4 leading-relaxed"
    >
      Learning continuously is one of my core values. I find joy by creating
      (and breaking) tiny coding projects. When I’m not programming, I’m either
      listening to
      <span class="whitespace-no-wrap">music &#x1F3A7;</span> or playing the
      <span class="whitespace-no-wrap">guitar &#x1F3B8;</span>
    </p>
    <h3 class="text-4xl md:text-5xl font-bold pt-24 pb-12">Skills</h3>
    <div class="grid row-gap-10">
      <skill-section
        v-for="skill in skills"
        :key="skill.title"
        v-bind="skill"
      />
    </div>
    <h3 class="text-4xl md:text-5xl font-bold pt-32 pb-2">
      Let’s get in touch
    </h3>
    <a
      href="mailto:jasonliang512@gmail.com"
      class="link text-xl md:text-2xl pb-1"
    >
      jasonliang512@gmail.com
    </a>
  </main>
</template>

<script>
import Project from "./components/Project.vue";
import SkillSection from "./components/SkillSection.vue";
import SectionHeader from "./components/SectionHeader.vue";

export default {
  name: "MainContent",
  components: { Project, SkillSection, SectionHeader },
  props: ["projects", "skills"]
};
</script>
