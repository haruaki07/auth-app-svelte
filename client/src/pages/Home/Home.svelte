<script>
  import Lazy from 'svelte-lazy';
  import Spinner from "../../components/Spinner";
  import Shimmer from "../../components/Shimmer";
  import { getAllUsers } from "../../utils/api";
  import { user as me } from "../../stores";
</script>

<div class="w-full p-6 md:px-32 pt-16 self-start">
  <h1 class="text-2xl font-semibold mb-3">User list</h1>
  <!-- fetch all users -->
  {#await getAllUsers()}
    <Spinner  color="#2F80ED" size="50px"/>
  <!-- then get returned data -->
  {:then {data: { users }}}
    <div class="overflow-y-auto" style="max-height: 320px">
      <!-- foreach user without me -->
      {#each users.filter(({ id }) => id !== $me.id) as user}
        <a href="/user/{user.id}" class="flex items-center p-2 hover:bg-gray-200 rounded-lg">
          <Lazy height={32} class="w-8 mr-4 rounded-lg overflow-hidden" placeholder={Shimmer}>
            <img src={user.photo} class="w-8 h-8 object-cover object-center" alt={user.name} />
          </Lazy>
          {user.name}
        </a>
      {/each}
    </div>
  {/await}
</div>