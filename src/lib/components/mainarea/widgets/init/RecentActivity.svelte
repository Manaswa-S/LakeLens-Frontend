<script lang="ts">
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import Label from '../../../shadcn/ui/label/label.svelte';

	let loading = $state(true);

	function demoData() {}
	demoData();
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
