<script>
	export let link = false;
	export let type = "button";
	export let block = false;
	export let color = "primary"
	export let icon = false;
	export let style = "";
	export let disabled = false;
</script>

{#if link}
	<a 
		class="btn"
		class:btn-secondary="{color === "secondary"}"
		class:btn-block="{block}" 
		class:btn-icon="{icon}" 
		href={link}
		{style}
		on:click
	>
		<slot></slot>
	</a>
{:else}
	<button 
		class="btn"
		class:btn-secondary="{color === "secondary"}"
		class:btn-block="{block}" 
		class:btn-icon="{icon}"
		{type}
		{disabled}
		{style}
		on:click
	>
		<slot></slot>
	</button>
{/if}

<style type="text/postcss">
	.btn {
		background: #2F80ED;
		border-radius: 8px;
		@apply py-2 px-8 text-white outline-none inline-block transition-shadow duration-150 border border-transparent;
		&:not(&-secondary):focus {
			@apply shadow-outline border-blue-400;
		}
		&-block {
			@apply w-full;
		}
		&-secondary {
			color: #828282;
			border-color: #828282;
			@apply bg-transparent border;
			&:focus {
				box-shadow: 0 0 0 3px rgba(130, 130, 130, 0.5);
			}
		}
		&-icon {
			@apply inline-flex items-center justify-center;
		}
		&[disabled] {
			@apply cursor-not-allowed opacity-75;
		}
	}
</style>