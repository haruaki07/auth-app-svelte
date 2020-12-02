<script>
	import Lazy from 'svelte-lazy';
	import { router } from "tinro";
	import Card from "../../components/Card";
	import Button from "../../components/Button";
	import Spinner from "../../components/Spinner";
	import Shimmer from "../../components/Shimmer";
	import { getUser } from "../../utils/api";
	import { user as me } from "../../stores";

	export let id;

	if (id === $me.id) router.goto("/profile");
</script>

<style src="./style.pcss"></style>

{#await getUser(id)}
	<Spinner color="#2F80ED" size="50px"/>
{:then {data: { user }}}
	<div class="user">
		<a href="/" class="text-blue-500 flex items-center mb-3">
			<i class="material-icons mr-2">chevron_left</i>
			Back
		</a>
		<h1 class="title">{user.name}'s Profile</h1>
		<p class="subtitle">Basic info, like name and photo</p>
		<Card style="padding: 0;text-align: left;">
			<table class="table">
				<tbody>
					<tr>
						<td class="label">Photo</td>
						<td class="value">
							<Lazy height={80} class="w-20 ml-auto md:ml-0 rounded-lg overflow-hidden" placeholder={Shimmer}>
			          <img src={user.photo} class="w-20 h-20 object-cover object-center" alt={user.name} />
			        </Lazy>
						</td>
					</tr>
					<tr>
						<td class="label">Name</td>
						<td class="value">{user.name}</td>
					</tr>
					<tr>
						<td class="label">Bio</td>
						<td class="value">{user.bio ?? ""}</td>
					</tr>
					<tr>
						<td class="label">Phone</td>
						<td class="value">{user.phone ?? ""}</td>
					</tr>
					<tr>
						<td class="label">Email</td>
						<td class="value">{user.email}</td>
					</tr>
				</tbody>
			</table>
		</Card>
	</div>
{/await}