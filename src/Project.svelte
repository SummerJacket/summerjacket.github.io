<script>
 import ButtonLink from "./ButtonLink.svelte";
 import ExternalLink from "./icons/ExternalLink.svelte";
 import GitHub from "./icons/GitHub.svelte";

 export let title;
 export let description;
 export let visit;
 export let source;
 export let tags;
 export let image;
</script>

<project class="text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-850 shadow-xl rounded-lg sm:flex">
  <div class="relative h-48 sm:h-auto sm:w-2/5 overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
    <img
      class="inline-block absolute object-cover w-full h-full"
      src="/{image}"
      alt=""
    />
    <div class="absolute w-full h-full bg-blue-500 opacity-25" />
    <svg
      class="hidden sm:block absolute h-full right-0 text-white dark:text-gray-850 -mr-px"
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <polygon points="100,0 100,1000 0,1000 98,0" />
    </svg>
  </div>
  <div class="p-8 sm:pt-10 sm:pb-12 sm:w-3/5 flex flex-col">
    <h3 class="font-bold text-2xl mb-2">{title}</h3>
    <p>{description}</p>
    <div class="mt-4 mb-5">
      {#each tags as tag}
        <span class="inline-block p-1 px-3 mr-2 mb-3 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 font-bold text-sm">
          {tag}
        </span>
      {/each}
    </div>
    <div class="mt-auto">
      <ButtonLink
        class="bg-blue-700 hover:bg-blue-750 dark:bg-blue-750 dark-hover:bg-blue-700 text-blue-100 shadow hover:shadow-lg dark-hover:shadow-md mr-4"
        href="{visit}"
      >
        <span>Visit</span>
        <ExternalLink class="text-blue-200 ml-1 w-5" />
      </ButtonLink>
      <ButtonLink
        class="group bg-blue-100 dark:bg-gray-750 text-blue-700 dark:text-gray-400 hover:text-blue-900 dark-hover:text-gray-100 shadow-sm hover:shadow dark-hover:shadow-lg"
        href="{source}"
      >
        <span>Source</span>
        <span class="text-blue-600 dark:text-gray-500 group-hover:text-blue-800 dark-group-hover:text-gray-200 ml-2 w-4 duration-200">
          <GitHub />
        </span>
      </ButtonLink>
    </div>
  </div>
</project>
