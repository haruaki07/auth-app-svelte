<script>
	import { omit } from "../../utils";

	export let value = "";
	export let placeholder = "";
	export let icon = "";
	export let style = "";
	export let type = "text";
	export let error = false;
	export let feedback = "";

	let props;

	function valueUpdater(e) {
		switch (type) {
			case "number":
			case "range":
				value = +e.target.value;
				break;
			default:
				value = e.target.value;
				break;
		}
	}
</script>

<style type="text/postcss">
	.input {
		@apply relative mb-4;
		input {
			font-size: 16px;
			border-color: #bdbdbd;
			@apply py-2 px-5 text-black w-full border rounded-lg outline-none transition-shadow duration-150;
			&::placeholder {
				color: #828282;
			}
			&:focus {
				@apply shadow-outline border-blue-400;
			}
			&.icon {
				@apply pl-10;
			}
			&::-ms-reveal,
      &::-ms-clear {
        display: none;
      }
      &.error {
      	@apply border-red-600;
      	& + .input-feedback {
      		@apply text-red-600;
      	}
      }
		}
		&-feedback {
			@apply text-sm;
		}
		&-icon {
			top: 11px;
			left: 13px;
			@apply absolute select-none transition duration-200;
			i {
				color: #828282;
				@apply text-xl;
			}
		}
	}
</style>

<div class="input">
	<input
		{type}
		{placeholder}
		{value}
		{style}
		class:icon
		class:error
		on:change={(e) => type === 'range' && valueUpdater(e)}
		on:input={(e) => type !== 'file' && valueUpdater(e)} />
		{#if feedback} <p class="input-feedback">{feedback}</p> {/if}
	<div class="input-icon"><i class="material-icons">{icon}</i></div>
</div>
