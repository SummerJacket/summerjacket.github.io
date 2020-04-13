<script>
  import { fly } from 'svelte/transition';

  import Mail from "./icons/Mail.svelte";
  import GitHub from "./icons/GitHub.svelte";
  import CodePen from "./icons/CodePen.svelte";

  const contacts = [
    {
      label: "jasonliang512@gmail.com",
      link: "mailto:jasonliang512@gmail.com",
      icon: Mail,
    },
    {
      label: "GitHub",
      link: "https://github.com/jasonliang512",
      icon: GitHub,
    },
    {
      label: "CodePen",
      link: "https://codepen.io/jasonliang512",
      icon: CodePen,
    },
  ]
</script>

<jumbotron class="block relative z-10 grid sm:-mt-16">
  <h1
    class="font-bold text-5xl sm:text-6xl text-center leading-none"
    in:fly="{{ y: 100, delay: 200, duration: 500 }}"
  >
    Jason Liang
  </h1>
  <p
    class="text-center text-gray-800 dark:text-gray-400 pt-4"
    in:fly="{{ y: 80, delay: 400, duration: 500 }}"
  >
    I like to create web applications
  </p>
  <div class="text-gray-700 dark:text-gray-500 mt-8 max-w-xs">
    {#each contacts as contact, i}
      <a
        class="group flex items-center mx-2 relative p-2 px-4 hover:text-gray-900 dark-hover:text-gray-300"
        href="{contact.link}"
        in:fly="{{ y: 80, delay: 800 + (i * 80), duration: 500 }}"
      >
        <span class="z-10 w-6 h-6 mr-2">
          <svelte:component this="{contact.icon}" />
        </span>
        <span class="z-10">{contact.label}</span>
        <div class="rounded z-0 transition-all duration-150 absolute bg-gray-400 dark:bg-gray-750 opacity-0 group-hover:opacity-50 inset-x-0 h-0 group-hover:h-full" />
      </a>
    {/each}
  </div>
</jumbotron>
