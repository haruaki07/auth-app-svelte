<script>
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { router } from "tinro";
	import { DevChallenges } from "../svg";
	import { token, user } from "../../stores";

	let show = false;
	let menu = null;

	onMount(() => {
		const handleOutsideClick = (event) => {
			if (
				(show && !menu.contains(event.target)) ||
				event.target.classList.contains("dropdown-link")
			) show = false;
		};
		document.addEventListener("click", handleOutsideClick, false);
		
		return () => {
			document.removeEventListener("click", handleOutsideClick, false);
		};
	});

	const logout = async () => {
		await fetch(`${process.env.BACKEND_URL}/api/user/logout`, {
			method: "POST",
			credentials: 'include',
		});
		$token = null;
		$user = {};
		router.goto('/login');
	};
</script>

<style>
	.navbar {
		@apply flex justify-between items-center p-6 absolute z-50 top-0 left-0 right-0;
		@screen md {
			@apply px-16 py-8;
		}
		.dropdown {
			border-color: #e0e0e0;
			@apply relative;
			&-icon {
				@apply ml-2 inline-block;
			}
			&-button {
				color: #333;
				@apply outline-none font-bold;
			}
			&-link {
				@apply text-sm flex items-center p-2 rounded-lg transition-colors my-2 font-medium;
				&:hover {
					background-color: #f2f2f2;
				}
				i { 
					width: 24px;
					height: 24px;
					@apply mr-3 overflow-hidden;
				}
			}
			&-divider {
				@apply border-b;
			}
			&-menu {
				color: #4f4f4f;
				@apply absolute right-0 w-48 p-3 mt-8 py-1 rounded-lg shadow border bg-white;
			}
		}
	}
</style>

<div class="navbar">
	<div class="navbar-brand">
		<a href="/">
			<DevChallenges />
		</a>
	</div>
	<div class="dropdown" bind:this={menu}>
		<button class="dropdown-button" on:click={() => (show = !show)}>
			{$user.name}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="dropdown-icon"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="10"
				height="10">
				<path
					d="M0.871604 4.2652L4.1179 7.51149C4.60673 8.00032 5.39637 8.00032 5.88519 7.51149L9.13149 4.2652C9.92113 3.47556 9.3571 2.12189 8.24158 2.12189H1.74898C0.633458 2.12189 0.0819637 3.47556 0.871604 4.2652Z"
					fill="#333"
					stroke-width="1" />
			</svg>
		</button>
		{#if show}
			<div class="dropdown-menu" transition:fly={{ duration: 100, y: -32 }}>
				<a href="/profile" class="dropdown-link">
					<i class="material-icons">account_circle</i>
					My Profile
				</a>
				<div class="dropdown-divider" />
				<a
					href="/login"
					class="text-red-500 dropdown-link"
					on:click|preventDefault={logout}>
					<i class="material-icons">exit_to_app</i>
					Logout
				</a>
			</div>
		{/if}
	</div>
</div>
