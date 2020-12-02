<script>
	import { Facebook, Google, Github, Twitter } from "../svg";
</script>

<style>
	.social-login {
		@apply flex justify-center mt-3 -mx-2;
		& a {
			@apply mx-2;
		}
	}
</style>

<div class="social-login">
	<a href="/auth/google" tinro-ignore>
		<Google />
	</a>
	<a href="/auth/fb" tinro-ignore>
		<Facebook />
	</a>
	<a href="/auth/twitter" tinro-ignore on:click|preventDefault title="Not available for now" >
		<Twitter />
	</a>
	<a href="/auth/github" tinro-ignore>
		<Github />
	</a>
</div>