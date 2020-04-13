<script>
  import ExternalLinkSolid from "./icons/ExternalLinkSolid.svelte";
  import GitHubSolid from "./icons/GitHubSolid.svelte";

  export let title;
  export let description;
  export let visit;
  export let source;
  export let tags;
  export let image;
</script>

<project class="group text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-850 shadow-xl rounded-xl sm:flex">
  <div class="relative h-48 sm:h-auto sm:w-2/5 overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none">
    <img
      class="inline-block absolute object-cover w-full h-full"
      src="/{image}"
      alt=""
    />
    <div class="transition-opacity duration-200 absolute w-full h-full bg-blue-500 opacity-25 group-hover:opacity-15" />
    <svg
      class="transition-transform transform duration-200 hidden sm:block absolute h-full right-0 text-white dark:text-gray-850 -mr-3"
      viewBox="0 0 140 1000"
      fill="currentColor"
    >
      <polygon points="100,0 140,0 140,1000 0,1000" />
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
      <a
        class="btn bg-blue-700 hover:bg-blue-750 dark:bg-blue-750 dark-hover:bg-blue-700 text-blue-100 shadow hover:shadow-lg dark-hover:shadow-md mr-4"
        href="{visit}"
      >
        <span>Visit</span>
        <ExternalLinkSolid class="text-blue-200 ml-1 w-5" />
      </a>
      <a
        class="btn bg-blue-100 dark:bg-gray-750 text-blue-700 dark:text-gray-400 hover:text-blue-900 dark-hover:text-gray-100 shadow-sm hover:shadow dark-hover:shadow-lg mt-2"
        href="{source}"
      >
        <span>Source</span>
        <span class="text-blue-600 dark:text-gray-500 ml-2 w-4">
          <GitHubSolid />
        </span>
      </a>
    </div>
  </div>
</project>
