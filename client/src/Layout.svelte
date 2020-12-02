<script>
  import { router } from "tinro";
  import { fade } from "svelte/transition";
</script>

<style lang="postcss">
  .layout {
    @apply flex justify-center items-center w-full min-h-screen bg-white py-12;
    @screen md {
      @apply py-16;
    }
  }
</style>

{#key $router.path}
  <div class="layout" in:fade={{ duration: 150 }}>
    <slot />
  </div>
{/key}