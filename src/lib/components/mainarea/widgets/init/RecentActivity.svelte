<script lang="ts">
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import Label from '../../../shadcn/ui/label/label.svelte';

	let loading = $state(true);

	async function getData() {
		const update = await fetch(`/api/lens/meta/recents/activity/0`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		console.log(resp);
		loading = false;
	}

	getData();
</script>

<div class="welcome-heading">
	{#if loading}
		<LoaderSmall {loading} text={'Please wait...'} />
	{/if}

	<Label class="text-lg text-muted-foreground">Recent Activity</Label>
</div>

<style>
	.welcome-heading {
		font-size: larger;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
