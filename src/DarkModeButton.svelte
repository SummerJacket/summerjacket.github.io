<script>
 import { createEventDispatcher } from 'svelte';
 import Sun from "./icons/Sun.svelte";
 import Moon from "./icons/Moon.svelte";

 const dispatch = createEventDispatcher();

 export let isDark;
</script>

<div class="absolute z-50 top-0 right-0 p-4 sm:p-6">
  <button
    class="bg-gray-800 dark:bg-gray-300 hover:bg-gray-900 dark-hover:bg-gray-100 rounded-full p-1 shadow-md"
    on:click="{() => dispatch('message', {})}"
  >
    {#if isDark}
      <Sun class="w-8 h-8 text-gray-800" />
    {:else}
      <Moon class="w-8 h-8 text-blue-100" />
    {/if}
  </button>
</div>
