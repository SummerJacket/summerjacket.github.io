<script>
 import { onMount } from 'svelte';
 import Konami from "konami";

 import DarkModeButton from "./DarkModeButton.svelte";
 import Shapes from "./Shapes.svelte";
 import Hero from "./Hero.svelte";
 import Project from "./Project.svelte";
 import projects from './projects.yaml';

 let modeDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
 let easterEgg = false;

 onMount(() => {
   new Konami(() => {
     easterEgg = !easterEgg;
   });
 });
</script>

<app class="block" class:mode-dark="{modeDark}">
  <div
    class="relative min-h-screen overflow-x-hidden bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
    class:easter-egg="{easterEgg}"
  >
    <DarkModeButton on:message="{() => modeDark = !modeDark}" isDark="{modeDark}" />
    <Shapes isDark="{modeDark}" easterEgg="{easterEgg}" />
    <Hero />
    <div class="relative z-10 mb-24 container mx-auto px-4 lg:px-24 xl:px-4">
      <div class="-mt-10">
        <h2 class="dark:text-gray-300 font-bold text-5xl">Projects</h2>
        <hr class="border-blue-500 dark:border-blue-600 border-4 inline-block w-32 ml-2 mb-4" />
        <div class="grid xl:grid-cols-2 col-gap-8 row-gap-10">
          {#each projects as project}
            <Project {...project} />
          {/each}
        </div>
      </div>
    </div>
    <dots
      class="absolute z-0 bottom-0 ml-2 h-32 opacity-50"
      style="width: 20rem"
    />
  </div>
</app>
