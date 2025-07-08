<script lang="ts">
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import { activeLocData, type ActiveLocData } from '$lib/stores/mainarea.ts';
	import { get } from 'svelte/store';
	import { fromUnixToReadable, abbreviateBytes, abbreviateNumber } from '$lib/common/time.ts';

	import { Layers, FolderCog, Database, FileStack } from '@lucide/svelte/icons';

	let loading = $state(true);
	let stats: any = $state();

	async function getData() {
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(`/api/analyze/overview/stats/${data.TableType}/${data.LocID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		stats = resp.data;
		loading = false;
	}

	getData();
</script>

<!-- 
{
    "Table": {
        "TableType": "iceberg",
        "TableVersion": 2,
        "TableSpecs": ""
    },
    "Version": {
        "CurrentVersion": "7744124748638812439",
        "LastSnapshot": 1741789432335,
        "TotalSnapshots": 1
    },
    "Rows": {
        "TotalCount": "5819079",
        "DeltaCount": 5819079
    },
    "Storage": {
        "TotalSize": 16663023,
        "TotalDataFiles": 11,
        "AvgFileSize": 1514820
    }
} -->

{#if loading}
	<LoaderSmall {loading} text={'Please wait...'} />
{:else}
	<div class="static-container">
		<div class="static-card">
			<p class="static-card-title">
				<FolderCog class="h-4 w-4" />
				Table Format
			</p>
			<p class="static-card-data uppercase">{stats.Table.TableType}</p>
			<p class="static-card-desc">Version: {stats.Table.TableVersion}</p>
			<p class="static-card-sub-desc">Spec: {stats.Table.TableSpecs}</p>
		</div>
		<div class="static-card">
			<p class="static-card-title">
				<FileStack class="h-4 w-4" />
				Current Table Version
			</p>
			<p class="static-card-data">{stats.Version.CurrentVersion}</p>
			<p class="static-card-desc">Total snapshots: {stats.Version.TotalSnapshots}</p>
			<p class="static-card-desc">
				Last Snapshot: {fromUnixToReadable(stats.Version.LastSnapshot)}
			</p>
		</div>
		<div class="static-card">
			<p class="static-card-title">
				<Layers class="h-4 w-4" />
				Row Count
			</p>
			<p class="static-card-data">{abbreviateNumber(stats.Rows.TotalCount)}</p>
			<p class="static-card-desc {stats.Rows.DeltaCount > 0 ? 'green' : 'red'}">
				{stats.Rows.DeltaCount > 0 ? '+' : ''}{stats.Rows.DeltaCount} from last state
			</p>
		</div>
		<div class="static-card">
			<p class="static-card-title">
				<Database class="h-4 w-4" />
				Storage Size
			</p>
			<p class="static-card-data">{abbreviateBytes(stats.Storage.TotalSize)}</p>
			<p class="static-card-desc">Data Files: {stats.Storage.TotalDataFiles}</p>
			<p class="static-card-sub-desc">
				Average file size: {abbreviateBytes(stats.Storage.AvgFileSize)}
			</p>
		</div>
	</div>
{/if}

<style>
	.static-card-title {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.7;

		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 5px;
	}
	.static-card-data {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
		opacity: 1;
	}
	.static-card-desc {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.9;

		overflow-wrap: break-word;
		overflow: visible;
	}
	.static-card-sub-desc {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.9;
	}

	.static-card {
		height: auto;
		width: auto;

		background: transparent;
		margin: 3px 3px 3px 3px;
		padding: 5px 5px 5px 5px;

		text-align: start;

		overflow-y: hidden;

		border-radius: 5px;
		border: 0px solid black;
	}

	.static-container {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-columns: 1fr 1.5fr;
		grid-template-rows: 1fr 1fr;

	}

	.static-card:nth-child(1) {
		grid-column: 1;
		grid-row: 1;
	}
	.static-card:nth-child(2) {
		grid-column: 2;
		grid-row: 1;
	}
	.static-card:nth-child(3) {
		grid-column: 1;
		grid-row: 2;
	}
	.static-card:nth-child(4) {
		grid-column: 2;
		grid-row: 2;
	}
</style>
