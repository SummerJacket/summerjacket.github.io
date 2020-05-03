<template>
  <div class="fixed z-40 right-0 top-0 m-6">
    <button
      @click="$emit('click')"
      class="p-2 bg-gray-800 dark:bg-gray-100 rounded-full shadow-md focus:outline-none focus:shadow-outline"
    >
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        class="w-6 h-6 text-gray-100 dark:text-gray-700"
      >
        <path
          v-if="darkModeEnabled"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
        <path
          v-else
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "ThemeButton",
  props: ["darkModeEnabled"]
};
</script>
