<script>
	import Lazy from 'svelte-lazy';
	import Card from "../../components/Card";
	import Button from "../../components/Button";
	import Shimmer from "../../components/Shimmer";
	import { user } from "../../stores";
</script>

<style src="./style.pcss"></style>

<div class="profile">
	<h1 class="title">Personal info</h1>
	<p class="subtitle">Basic info, like your name and photo</p>
	<Card style="padding: 0;text-align: left;">
		<div class="header">
			<div class="mr-10">
				<h3 class="text-2xl">Profile</h3>
				<p class="text-sm">Some info may be visible to other people</p>
			</div>
			<Button color="secondary" style="border-radius: 12px;" link="/profile/edit">Edit</Button>
		</div>
		<table class="table">
			<tbody>
				<tr>
					<td class="label">Photo</td>
					<td class="value">
						<Lazy height={80} class="w-20 ml-auto md:ml-0 rounded-lg overflow-hidden" placeholder={Shimmer}>
			         <img src={$user.photo} class="w-20 h-20 object-cover object-center" alt={$user.name} />
			       </Lazy>
					</td>
				</tr>
				<tr>
					<td class="label">Name</td>
					<td class="value">{$user.name}</td>
				</tr>
				<tr>
					<td class="label">Bio</td>
					<td class="value">{$user.bio ?? ""}</td>
				</tr>
				<tr>
					<td class="label">Phone</td>
					<td class="value">{$user.phone ?? ""}</td>
				</tr>
				<tr>
					<td class="label">Email</td>
					<td class="value">{$user.email}</td>
				</tr>
				<tr>
					<td class="label">Password</td>
					<td class="value">********</td>
				</tr>
			</tbody>
		</table>
	</Card>
</div>