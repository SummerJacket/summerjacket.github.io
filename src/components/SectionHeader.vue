<template>
  <div class="pb-20">
    <div
      class="flex justify-center w-full text-gray-200 dark:text-gray-850 font-black text-huge md:text-massive whitespace-no-wrap leading-none select-none"
    >
      {{ bgText }}
    </div>
    <h2 class="text-5xl md:text-6xl font-bold -mt-20 md:-mt-32"><slot /></h2>
    <svg width="128" height="8" viewBox="0 0 128 8" fill="none" class="pl-2">
      <rect width="128" height="8" rx="4" fill="#3182CE" />
      <rect x="1" width="56" height="8" rx="4" fill="#ED8936" />
      <rect width="24" height="8" rx="4" fill="#38B2AC" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  props: ["bgText"]
};
</script>
