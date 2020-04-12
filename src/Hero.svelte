<script>
 import MailSolid from "./icons/MailSolid.svelte";
 import GitHub from "./icons/GitHub.svelte";

 const contacts = [
   {
     label: "jasonliang512@gmail.com",
     link: "mailto:jasonliang512@gmail.com",
     icon: MailSolid,
   },
   {
     label: "GitHub",
     link: "https://github.com/jasonliang512",
     icon: GitHub,
   },
 ]
</script>

<div class="relative z-10 min-h-screen flex items-center justify-center">
  <div class="flex flex-col items-center">
    <h1 class="font-bold text-6xl text-center">Jason Liang</h1>
    <p class="text-center text-gray-800 dark:text-gray-400">
      I like to create web applications
    </p>
    <div class="text-gray-700 dark:text-gray-500 mt-8" style="width: 20rem">
      {#each contacts as contact}
        <a
          class="transition-colors duration-200 group flex items-center mx-2 relative p-2 px-4 hover:text-gray-900 dark-hover:text-gray-300"
          href="{contact.link}"
        >
          <span class="z-10 w-6 h-6 mr-2">
            <svelte:component this="{contact.icon}" />
          </span>
          <span class="z-10">{contact.label}</span>
          <div class="rounded z-0 transition-all duration-200 absolute bg-gray-400 dark:bg-gray-750 opacity-0 group-hover:opacity-50 inset-x-0 h-0 group-hover:h-full" />
        </a>
      {/each}
    </div>
  </div>
</div>
