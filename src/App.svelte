<script>
  import { onMount } from 'svelte';
  import Konami from "konami";

  import Shapes from "./Shapes.svelte";
  import Jumbotron from "./Jumbotron.svelte";
  import Project from "./Project.svelte";
  import Sun from "./icons/Sun.svelte";
  import Moon from "./icons/Moon.svelte";
  import projects from './projects.yaml';

  let modeDark =
    window.matchMedia
    && window.matchMedia("(prefers-color-scheme: dark)").matches;
  let easterEgg = false;

  onMount(() => {
    new Konami(() => {
      easterEgg = !easterEgg;
    });
  });
</script>

<app
  class="block"
  class:mode-dark="{modeDark}"
  class:easter-egg="{easterEgg}"
>
  <div class="fixed z-50 top-0 right-0 p-4 sm:p-6">
    <button
      class="bg-gray-800 dark:bg-gray-300 hover:bg-gray-900 dark-hover:bg-gray-100 rounded-full p-1 shadow-xl outline-none focus:shadow-outline"
      on:click="{() => modeDark = !modeDark}"
    >
      {#if modeDark}
        <Sun class="w-6 h-6 text-gray-800" />
      {:else}
        <Moon class="w-6 h-6 text-blue-100" />
      {/if}
    </button>
  </div>
  <div class="relative z-10 overflow-x-hidden bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-300 nezuko">
    <div class="relative pt-32 pb-48 sm:py-0 sm:min-h-screen flex justify-center items-center">
      <Shapes isDark="{modeDark}" easterEgg="{easterEgg}" />
      <Jumbotron />
    </div>
    <div class="relative -mt-10 z-10 mb-24 max-w-3xl mx-auto px-6">
      <h2 class="dark:text-gray-300 font-bold text-5xl">Projects</h2>
      <hr class="border-blue-500 dark:border-blue-600 border-4 inline-block w-32 ml-2 mb-4" />
      <div class="grid row-gap-12">
        {#each projects as project}
          <Project {...project} />
        {/each}
      </div>
    </div>
    <dots
      class="absolute z-0 bottom-0 ml-2 w-8 md:w-32 opacity-50"
      style="height: 20rem"
    />
  </div>
</app>
