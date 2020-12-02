<script>
	import { onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';
	import { updatePhoto } from "../../utils/auth";
	import { user } from "../../stores";

	const dispatch = createEventDispatcher();

	export let label = "";
	export let loading = false;
	export let error = null;

	const types = ["image/jpeg", "image/png", "image/webp", "image/bmp"];

	const handleChange = async (e) => {
		try {
			let selected = e.target.files[0];

			if (selected && types.includes(selected.type)) {
				loading = true;

				let data = new FormData();
				data.append("photo", selected);

				const res = await updatePhoto(data);
				if (res.error) {
					throw res.error;
				}

				$user.photo = res.data;
				error = null;

				dispatch('success');
				return;
			}
			throw "Invalid mime type! Only jpeg/jpg, png, webp, bmp are allowed";
		} catch (e) {
			error = e;
			dispatch('error', {
				error
			});
		} finally {
			loading = false;
		}
	};
</script>

<div class="img-uploder">
	<label class:disabled={loading}>
		{loading ? "loading..." : label}
		<input
			type="file"
			disabled={loading}
			accept={types.join(",")}
			on:change={handleChange} 
		/>
	</label>
</div>

<style type="text/postcss">
	.img-uploder {
		@apply flex items-center;
		label {
			cursor: pointer;
			font-size: 13px;
			color: #828282;
			&.disabled {
				@apply cursor-wait;
			}
			@apply font-medium uppercase;
			input {
				@apply hidden;
			}
		}
	}
</style>