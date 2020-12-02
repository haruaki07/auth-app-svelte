<script>
  import { Route, router } from "tinro";
  import { token } from "../stores";

  if (!$token) {
    router.goto('/login');
  }
</script>

<Route {...$$props} >
  {#if $token}
    <slot/>
  {/if}
</Route>
