<template>
  <div class="grid grid-rows-auto1 grid-cols-auto1">
    <div class="sm:row-span-2">
      <div class="inline-flex rounded-full p-4 md:p-5" :class="className">
        <span
          class="fix-svg inline-flex items-center w-6 h-6 md:w-8 md:h-8"
          v-html="icon"
        />
      </div>
    </div>
    <div class="flex items-center pl-4">
      <h3 class="text-3xl font-bold -mt-1 sm:-mt-2">{{ title }}</h3>
    </div>
    <ul
      class="pt-4 sm:pt-1 sm:pl-4 text-sm md:text-md col-span-2 sm:col-span-1 sm:col-start-2 sm:mr-auto"
    >
      <li
        v-for="item in items"
        :key="item"
        class="badge mr-2 mb-3 md:mr-3 md:mb-4"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SkillSection",
  props: ["title", "items", "className", "icon"]
};
</script>
