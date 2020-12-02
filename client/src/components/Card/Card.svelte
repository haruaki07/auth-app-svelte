<script>
	export let style = "";
</script>

<style type="text/postcss">
	.card {
		min-width: 400px;
		& .card-body {
			@apply rounded-xl border border-transparent p-10;
			@screen md {
				border-color: #bdbdbd;
			}
		}
		& .card-footer {
			color: #bdbdbd;
			@apply pt-3 text-sm text-center;
		}
	}
</style>

<div class="card">
	<div class="card-body" {style}>
		<slot />
	</div>
	<div class="card-footer">
		<p>Haruaki | devchallenges.io</p>
	</div>
</div>
