<script>
	import { fade } from "svelte/transition";
	import { DevChallenges } from "../../components/svg";
	import Card from "../../components/Card";
	import Input from "../../components/Input";
	import SocialAuth from "../../components/SocialAuth";
	import Button from "../../components/Button";
	import Spinner from "../../components/Spinner";
	import { register, login } from "../../utils/auth";
	import { omit } from "../../utils";
	import { token, user } from "../../stores";

	let loading = false;
	let errors = {};
	const values = {
		name: "",
		email: "",
		password: ""
	};

	const handleSubmit = async (e) => {
		try {
			loading = true;
			errors = {};
			let res = await register(values);
			if (res.error) {
				throw res.error;
			}

			res = await login(omit(values, "name"));
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

<style src="style.pcss">
</style>

<Card>
	<form on:submit|preventDefault={handleSubmit} method="POST">
		<DevChallenges />
		<h1 class="title">
			Join thousands of learners from
			<br />around the world
		</h1>
		<p class="subtitle">
			Master web development by making real-life
			<br />projects. There are multiple paths for you to
			<br />choose
		</p>
		
		<div class="my-5">
			{#if typeof errors === 'string'}
				<p class="error-msg" transition:fade={{ duration: 300 }}>{errors}</p>
			{/if}
		</div>

		<Input placeholder="Full Name" icon="person" bind:value={values.name} error={errors.name ? true : false}
						feedback={errors.name} />
		<Input
			type="email"
			placeholder="Email"
			icon="mail"
			bind:value={values.email}
			error={errors.email ? true : false}
			feedback={errors.email} />
		<Input
			type="password"
			placeholder="Password"
			icon="https"
			bind:value={values.password}
			error={errors.password ? true : false}
			feedback={errors.password} />
		<Button block={true} type="submit" icon="true" disabled={loading}>
			{#if loading}
				<Spinner/>
			{/if}
			Start coding now
		</Button>
		<div class="text-center">
			<p class="text mt-5">or continue with these social profile</p>
			<SocialAuth />
			<p class="text mt-3">
				Adready a member?
				<a href="/login" class="link"> Login</a>
			</p>
		</div>
	</form>
</Card>
