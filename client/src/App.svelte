<script>
  import { onMount } from "svelte";
  import { Route, router } from "tinro";
  import { PublicRoute, PrivateRoute } from "./router";

  import Layout from "./Layout.svelte";
  import Tailwindcss from "./styles/Tailwindcss.svelte";
  import Navbar from "./components/Navbar";
  import Spinner from "./components/Spinner";

  import NotFound from "./pages/NotFound";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Profile from "./pages/Profile";
  import EditProfile from "./pages/EditProfile";
  import User from "./pages/User";
  import Home from "./pages/Home";
  import { token, user } from "./stores";
  import { check } from "./utils/auth";

  let loading = true;

  onMount(async () => {
    const res = await check();
    
    if (!res.data) {
      loading = false;
      return;
    }
    
    $user = res.data.user;
    $token = res.data.token;

    loading = false;
  });
</script>

<Layout>
  {#if $token}
    <Navbar />
  {/if}
  {#if !loading}
    <Route>
      {#if $token}
        <Route path="/"><Home /></Route>
        <Route path="/profile"><Profile /></Route>
        <Route path="/profile/edit"><EditProfile /></Route>
        <Route path="/user/:id" let:params><User id={params.id}/></Route>
        <Route path="/login" redirect="/"/>
        <Route path="/register" redirect="/"/>
      {:else}
        <Route path="/" redirect="/login"/>
        <Route path="/profile" redirect="/login"/>
        <Route path="/profile/edit" redirect="/login"/>
        <Route path="/user" redirect="/login"/>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Register /></Route>
      {/if}
      <Route fallback><NotFound/></Route>
    </Route>
  {:else}
    <Spinner color="#2F80ED" size="50px"/>
  {/if}
</Layout>
