<script>
 export let isDark;
 export let easterEgg;
</script>

<div
  class="absolute z-0 h-screen inset-x-0 text-gray-300 dark:text-gray-950"
  class:hidden="{easterEgg}"
>
  <dots
    class="absolute z-50 w-8 sm:w-20 md:w-48 right-0 mt-12 opacity-50"
    isDark="{isDark}"
    style="height: 30rem"
  />
  <div class="absolute right-0">
    <svg viewBox="0 0 100 100" fill="currentColor" class="inline-block w-64 h-64 -mt-16 -mr-32">
      <circle cx="50" cy="50" r="50" />
    </svg>
  </div>
  <div class="absolute right-0 bottom-0 hidden sm:block">
    <svg viewBox="0 0 100 100" fill="currentColor" class="inline-block w-48 md:w-64 h-64 -mb-2">
      <polygon points="0,0 100,0 100,100 0,100" />
    </svg>
  </div>
  <div class="absolute left-0 transform rotate-45">
    <svg viewBox="0 0 100 100" fill="currentColor" class="inline-block w-64 h-64 mt-32 -ml-10">
      <polygon points="50,15 100,100 0,100" />
    </svg>
  </div>
  <div class="absolute left-0 bottom-0">
    <svg
      viewBox="0 0 300 300"
      fill="currentColor"
      class="inline-block -mb-32 ml-8 md:ml-32 lg:ml-64"
      style="width: 18rem"
    >
      <polygon points="300,150 225,280 75,280 0,150 75,20 225,20" />
    </svg>
  </div>
</div>
