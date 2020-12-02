<script>
	import { onMount } from "svelte";

	export let value = "";
	export let placeholder = "";
	export let icon = "";
	export let id = "";
	export let rows = "2";
	export let style = "";
	export let error = false;
	export let feedback = "";

	let el;

  onMount(() => {
  	if (id) el.id = id;
  })

</script>

<style type="text/postcss">
	.textarea {
		@apply relative mb-4;
		textarea {
			font-size: 16px;
			border-color: #BDBDBD;
			@apply py-2 px-5 text-black w-full border rounded-lg outline-none transition-shadow duration-150;
			&::placeholder {
				color: #828282;
			}
			&:focus {
				@apply shadow-outline border-blue-400;
			}
			.icon {
				@apply pl-10;
			}
			&.error {
      	@apply border-red-600;
      	& + .textarea-feedback {
      		@apply text-red-600;
      	}
      }
		}
		&-feedback {
			@apply text-sm;
		}
		&-icon {
			top: 7px;
			left: 13px;
			@apply absolute select-none transition duration-200;
			i {
				color: #828282;
				@apply text-xl;
			}
		}
	}
</style>

<div class="textarea" bind:this={el}>
	<textarea 
		{placeholder}
		{style}
		{rows}
		class:icon
		class:error
		bind:value
  ></textarea>
	{#if feedback} <p class="textarea-feedback">{feedback}</p> {/if}
	<div class="textarea-icon">
		<i class="material-icons">{icon}</i>
	</div>
</div>