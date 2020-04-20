<template>
  <div class="flex items-start">
    <div class="inline-flex rounded-full p-5" :class="className">
      <span class="fix-svg inline-flex items-center w-8 h-8" v-html="icon" />
    </div>
    <div class="pl-4">
      <h3 class="text-3xl font-bold -mt-3">{{ title }}</h3>
      <ul class="pt-1">
        <li v-for="item in items" :key="item" class="badge mr-3 mb-4">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkillSection",
  props: ["title", "items", "className", "icon"]
};
</script>
