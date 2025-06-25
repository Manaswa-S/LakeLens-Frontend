<script lang="ts">
	import StorageDistributionPie from '$lib/components/echarts/StorageDistributionPie.svelte';
	import { type SeriesData } from '$lib/components/echarts/StorageDistributionPie.svelte';
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import { get } from 'svelte/store';

	import { ChevronLeft, ChevronRight } from '@lucide/svelte/icons';

	let { projectsList }: { projectsList: any } = $props();

	let seriesData: SeriesData = $state([]);
	let lakeName: string = $state('');
	let currIndex: number = $state(0);

	let loading = $state(true);

	async function getData() {
		seriesData = [];
		lakeName = '';

		const projs: any = get(projectsList);

		const update = await fetch(`/api/lens/meta/file-dist/${projs[currIndex].Lake.LakeID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();

		if (resp.status != 200) {
			loading = false;
			return;
		}

		for (const [key, value] of Object.entries(resp.data.Dist)) {
			if (value.TotalSize > 0) {
				seriesData.push({
					value: value.TotalSize / 1000000,
					name: key
				});
			}
		}

		lakeName = projs[currIndex].Lake.Name;
		loading = false;
	}

	getData();
</script>

{#if loading}
	<LoaderSmall {loading} text={'Please wait...'} />
{:else}
	<div class="next-arrow">
		{#if currIndex > 0}
			<ChevronLeft
				class="h-4 w-4 cursor-pointer"
				onclick={() => {
					currIndex--;
					getData();
				}}
			/>
		{/if}
		{#if currIndex < get(projectsList).length - 1}
			<ChevronRight
				class="h-4 w-4 cursor-pointer ml-auto"
				onclick={() => {
					currIndex++;
					getData();
				}}
			/>
		{/if}
	</div>
	<StorageDistributionPie {lakeName} data={seriesData} />
{/if}

<style>
	.next-arrow {
		height: 5%;
		width: calc(100% - 10px);
		position: absolute;

		z-index: 1000;

		left: 50%;
		transform: translateX(-50%);

		display: flex;
		flex-direction: row;
		justify-content: space-between;

		padding: 0px 10px 0px 10px;
	}
</style>
