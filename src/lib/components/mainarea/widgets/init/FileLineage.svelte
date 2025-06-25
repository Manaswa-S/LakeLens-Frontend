<script lang="ts">
	import FileGradient from '$lib/components/echarts/FileGradient.svelte';
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';

	let loading = $state(true);

	function demoData() {}

	demoData();
</script>

{#if loading}
	<LoaderSmall {loading} text={'Please wait...'} />
{:else}
	<FileGradient />
{/if}
