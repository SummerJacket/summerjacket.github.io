<template>
  <div
    class="group transition-shadow duration-200 bg-white dark:bg-gray-850 shadow-lg hover:shadow-xl rounded-xl sm:flex"
  >
    <div
      class="relative h-48 sm:h-auto sm:w-2/5 overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
    >
      <img
        class="inline-block absolute object-cover w-full h-full"
        :src="image"
        alt=""
      />
      <div
        class="transition-opacity duration-200 absolute w-full h-full bg-blue-300 dark:bg-gray-800 opacity-25 group-hover:opacity-10"
      />
      <svg
        viewBox="0 0 78 394"
        fill="currentColor"
        class="hidden sm:block absolute h-full right-0 text-white dark:text-gray-850 -mr-1"
      >
        <path
          d="M78 0H67.6123C67.6123 0 58.5 0 54.5 9.50006C50.5 19.0001 18.5 375 16 384.5C13.5 394 0 394 0 394H78V0Z"
        />
      </svg>
    </div>
    <div class="p-6 sm:pt-10 sm:pb-12 sm:w-3/5 flex flex-col">
      <h3 class="font-bold text-2xl pb-2 leading-snug">{{ title }}</h3>
      <p class="text-gray-800 dark:text-gray-500">{{ description }}</p>
      <ul class="py-4 text-sm">
        <li
          v-for="tag in tags"
          :key="tag"
          class="badge bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-500 mr-2 mb-3"
        >
          {{ tag }}
        </li>
      </ul>
      <div class="md:pt-4">
        <a
          class="btn bg-blue-700 hover:bg-blue-750 dark:bg-blue-750 dark-hover:bg-blue-700 text-blue-100 shadow hover:shadow-lg dark-hover:shadow-md mr-4 mb-2"
          :href="visit"
        >
          <span>Visit</span>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            class="text-blue-200 ml-1 w-5 h-5"
          >
            <path
              d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
            />
            <path
              d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
            />
          </svg>
        </a>
        <a
          class="btn bg-blue-100 dark:bg-gray-750 text-blue-700 dark:text-gray-400 hover:text-blue-900 dark-hover:text-gray-100 shadow-sm hover:shadow dark-hover:shadow-lg"
          :href="source"
        >
          <span>Source</span>
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            class="text-blue-600 dark:text-gray-500 ml-2 w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
              transform="scale(64)"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Project",
  props: ["title", "description", "visit", "source", "tags", "image"]
};
</script>

<style scoped>
.btn {
  @apply px-6 py-2;
  @apply font-bold;
  @apply inline-flex items-center;
  @apply rounded;
  @apply outline-none;
  @apply transition duration-200;
  @apply transform;
}

.btn:focus {
  @apply shadow-outline;
}

.btn:hover {
  @apply -translate-y-2px;
}
</style>
