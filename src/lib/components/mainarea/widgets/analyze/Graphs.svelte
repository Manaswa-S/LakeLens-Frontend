<script lang="ts">
	import { activeLocData, type ActiveLocData } from '$lib/stores/mainarea.ts';
	import { get } from 'svelte/store';
	import { fromUnixToReadable } from '$lib/common/time.ts';
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import AllInOne from './graphs/All-In-One.svelte';

	let loading = $state(true);

	let graphs: any[] = $state([]);
	let timeStamps: any[] = $state([]);
	let totalRecs: any[] = $state([]);
	let totalFileSizes: any[] = $state([]);
	let totalDataFiles: any[] = $state([]);
	let totalDeleteFiles: any[] = $state([]);

	async function getData() {
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(`/api/analyze/overview/graphs/${data.TableType}/${data.LocID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		graphs = resp.data;

		graphs.forEach((graph: any) => {
			timeStamps.push(fromUnixToReadable(graph.TimeStampMS));
			totalRecs.push(graph.TotalRecords);
			totalFileSizes.push(graph.TotalFileSize);
			totalDataFiles.push(graph.TotalDataFiles);
			totalDeleteFiles.push(graph.TotalDeleteFiles);
		});

		loading = false;
	}

	getData();
</script>

<!-- 
1) row count per snapshot
2) total size per snapshot -->

{#if loading}
	<LoaderSmall {loading} text={'Please wait...'} />
{:else}
	<div class="graphs-container">
		<div class="graph-wrapper">
			<AllInOne {timeStamps} {totalRecs} {totalFileSizes} {totalDataFiles} {totalDeleteFiles} />
		</div>
	</div>
{/if}

<style>
	.graph-wrapper {
		/* height: 100%; */
		/* width: 100%; */

		/* margin: 5px 5px; */

		/* background-color: blue; */
	}

	.graphs-container {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		/* background-color: red !important; */
	}

	.welcome-heading {
		font-size: larger;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
