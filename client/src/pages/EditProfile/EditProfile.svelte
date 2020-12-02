<script>
	import { fade } from "svelte/transition";
	import Lazy from "svelte-lazy";
	import { SvelteToast, toast } from '@zerodevx/svelte-toast'
	import Card from "../../components/Card";
	import Input from "../../components/Input";
	import Textarea from "../../components/Textarea";
	import Button from "../../components/Button";
	import Spinner from "../../components/Spinner";
	import Shimmer from "../../components/Shimmer";
	import ImageUploader from "../../components/ImageUploader";
	import { user } from "../../stores";
	import { update } from "../../utils/auth";

	let loading = false;
	let errors = {};
	const values = {
		name: $user.name,
		bio: $user.bio,
		phone: $user.phone,
		email: $user.email,
		password: ""
	}

	const handleSubmit = async () => {
		try {
			loading = true;
			errors = {};
			const res = await update(values);

			if (res.error) {
				throw res.error;
			}

			$user = res.data;
			errors = {};
			successToast('Saved!');
		} catch (e) {
			if (typeof errors === 'string') window.scrollTo(0,0);
			errors = e;
		} finally {
			loading = false;
		}
	};

	const successToast = (msg) => {
		toast.push(msg, {
			theme: {
				'--toastBackground': '#1dd1a1',
				'--toastProgressBackground': '#10ac84',
				'--toastColor': "#ffffff"
			}
		});
	}
</script>

<style src="./style.pcss"></style>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="editprofile">
	<a href="/profile" class="text-blue-500 flex items-center mb-3">
		<i class="material-icons mr-2">chevron_left</i>
		Back
	</a>
	<Card style="padding: 0;text-align: left;">
		<div class="header">
			<h1 class="title">Change info</h1>
			<p class="subtitle">Changes will be reflected to every services</p>
		</div>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="my-5">
				{#if typeof errors === 'string'}
					<p class="error-msg" transition:fade={{ duration: 300 }}>{errors}</p>
				{/if}
			</div>

			<div class="form-group flex items-center">
				<Lazy height={80} class="w-20 mr-6 rounded-lg overflow-hidden" placeholder={Shimmer}>
					{#if loading}
						<Shimmer height="80px" />
					{:else}
						<img src={$user.photo} class="w-20 h-20 object-cover object-center" alt={$user.name} />
					{/if}
				</Lazy>
				<ImageUploader label="Change photo" bind:loading on:success={() => successToast('Saved!')} />
			</div>

			<div class="form-group">
				<label>
					Name
					<Input
						placeholder="Enter your name..."
						style="padding: 12px; margin-top: 12px;"
						bind:value={values.name}
						error={errors.name ? true : false}
						feedback={errors.name}
					/>
				</label>
			</div>

			<div class="form-group">
				<label>
					Bio
					<Textarea
						placeholder="Enter your bio..."
						style="padding: 12px; margin-top: 12px;"
						bind:value={values.bio}
						rows="3"
						error={errors.bio ? true : false}
						feedback={errors.bio}
					/>
				</label>
			</div>

			<div class="form-group">
				<label>
					Phone
					<Input
						type="tel"
						placeholder="Enter your phone..."
						style="padding: 12px; margin-top: 12px;"
						bind:value={values.phone}
						error={errors.phone ? true : false}
						feedback={errors.phone}
					/>
				</label>
			</div>

			<div class="form-group">
				<label>
					Email
					<Input
						type="email"
						placeholder="Enter your email..."
						style="padding: 12px; margin-top: 12px;"
						bind:value={values.email}
						error={errors.email ? true : false}
						feedback={errors.email}
					/>
				</label>
			</div>

			<div class="form-group">
				<label>
					Password
					<Input
						type="password"
						placeholder="Enter your password..."
						style="padding: 12px; margin-top: 12px;"
						bind:value={values.password}
						error={errors.password ? true : false}
						feedback={errors.password}
					/>
				</label>
			</div>

			<Button type="submit" icon="true" disabled={loading}>
				{#if loading}
					<Spinner/>
				{/if}
				Save
			</Button>
		</form>
	</Card>
</div>

<SvelteToast />