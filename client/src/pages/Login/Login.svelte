<script>
	import { fade } from "svelte/transition";
	import { DevChallenges } from '../../components/svg';
	import Card from "../../components/Card";
	import Input from "../../components/Input";
	import SocialAuth from "../../components/SocialAuth";
	import Button from "../../components/Button";
	import Spinner from "../../components/Spinner";
	import { login } from "../../utils/auth";
	import { token, user } from "../../stores";

	let loading = false;
	let errors = {};
	const values = {
		email: "",
		password: ""
	};

	const handleSubmit = async (e) => {
		try {
			loading = true;
			errors = {};
			const res = await login(values);

			if (res.error) {
				throw res.error;
			}

			$token = res.data.token;
			$user = res.data.user;
			errors = {};
			router.goto('/');
		} catch (e) {
			errors = e;
		} finally {
			loading = false;
		}
	};
</script>

<style src="./style.pcss"></style>

<Card>
	<form on:submit|preventDefault={handleSubmit} method="POST">
		<DevChallenges/>
		<h1 class="title">Login</h1>

		<div class="my-5">
			{#if typeof errors === 'string'}
				<p class="error-msg" transition:fade={{ duration: 300 }}>{errors}</p>
			{/if}
		</div>

		<Input placeholder="Email" icon="mail" type="email" bind:value={values.email} error={errors.email ? true : false}
						feedback={errors.email}/>
		<Input placeholder="Password" icon="https" type="password" bind:value={values.password} error={errors.password ? true : false}
						feedback={errors.password} />

		<Button block={true} type="submit" icon="true" disabled={loading}>
			{#if loading}
				<Spinner/>
			{/if}
			Login
		</Button>

		<div class="text-center">
			<p class="text mt-5">or continue with these social profile</p>
			<SocialAuth/>
			<p class="text mt-3">
				Don’t have an account yet?
				<a href="/register" class="link"> Register</a>
			</p>
		</div>
	</form>
</Card>