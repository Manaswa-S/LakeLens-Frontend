<script lang="ts">
	import * as Dialog from '$lib/components/shadcn/ui/dialog';
	import { Button } from '$lib/components/shadcn/ui/button/index.js';
	import LocationsTable from '$lib/components/locsTable/LocsTable.svelte';
	import { columns } from '$lib/components/locsTable/locs-columns.ts';
	import { locsSelected } from '$lib/stores/internal.ts';

	import { get } from 'svelte/store';

	import { MAX_ADD_LOCS_LIMIT, type AddLocsPayload } from '$lib/stores/internal.ts';
	import Loader from '$lib/components/extras/Loader.svelte';
	import Separator from '$lib/components/shadcn/ui/separator/separator.svelte';
	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

	// Props:
	// lakeID: the id of the lake.
	// locations: the list of the locations to be displayed > pass null to fetch internally.
	// whenLocsAdded: the function to be called when locations added and confirmation screen displayed. useful to change classes, etc.
	// whenDone: the function to be called at the very end.
	let { lakeID, locations, whenLocsAdded, whenDone } = $props();

	let isLoading = $state(false); // set when loading.
	let loadingText = $state(''); // loading text to show, mp in the button.
	let opErrored = $state(false); // set when operation errored due to constraints.
	let opError = $state(''); // the message due to constraints.

	let locsAddedResp: any = $state(null); // the response from the addLocations POST.

	let locsFound = $state(true); // to be set if passed {locations} != null or fetched {locations} != null.
	let locsAdded = $state(false); // to be set when locations added and confirmation screen to be shown.

	// POST THE SELECTED LOCATIONS.
	async function addLocsHelper() {
		opErrored = false;
		opError = '';
		isLoading = true;
		loadingText = 'Adding';

		let locSelectedShot = get(locsSelected);
		let locNames: string[] = [];
		locSelectedShot.forEach((loc: any) => {
			locNames.push(loc.Name);
		});

		const payload: AddLocsPayload = {
			LakeID: parseInt(lakeID, 10),
			LocNames: locNames
		};
		await submitLocs(payload);
		isLoading = false;
	}
	async function submitLocs(payload: AddLocsPayload) {
		const update = await fetch('/api/lens/lake/locs/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const resp = await update.json();

		if (resp.status !== 201) {
			opError = resp.Message;
			opErrored = true;
			return;
		}
		locsAddedResp = resp.data;
		locsAdded = true;
		whenLocsAdded();
	}

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

	// if locations is null, try getting them, using the lakeID

	async function loadData() {
		if (locations === null && lakeID !== null) {
			isLoading = true;
			await getLocs(lakeID);
		}
	}
	loadData();
	async function getLocs(lakeID: any) {
		setTimeout(async () => {
			const update = await fetch(`/api/lens/lake/locs/${lakeID}`, {
				method: 'GET'
			});
			const resp = await update.json();

			if (resp.status !== 200) {
				opError = resp.Message;
				opErrored = true;
				return;
			}
			console.log(resp);
			locations = resp.data;
			isLoading = false;
			console.log(locations);
		}, 0);
	}
</script>

<Loader loading={isLoading} text="Fetching locations..." />

{#if locations}
	{#if locsFound && !locsAdded}
		{@render locsTable(locations, columns)}
	{:else if locsFound && locsAdded}
		{@render locsAddedSnip(locsAddedResp.Added, locsAddedResp.Failed)}
	{/if}
{/if}

{#snippet locsTable(data: any, columns: any)}
	<Dialog.Header>
		<Dialog.Title>Buckets Found</Dialog.Title>
	</Dialog.Header>

	<div class="space-y-1 px-1 text-sm">
		<p class="green">
			Found <strong>{data.length}</strong> buckets in the selected lake.
		</p>
		<p class="green">Please select the buckets you want to analyze.</p>
		<p class="red">
			Note: You can select up to <strong>{MAX_ADD_LOCS_LIMIT | 5}</strong>
			bucket{(MAX_ADD_LOCS_LIMIT | 5) > 1 ? 's' : ''}.
		</p>
	</div>

	<LocationsTable {data} {columns} />

	<Dialog.Footer>
		<Button onclick={addLocsHelper} class="select-button">Confirm</Button>
	</Dialog.Footer>
{/snippet}

{#snippet locsAddedSnip(added: string[], failed: string[])}
	<Dialog.Header>
		<Dialog.Title>Buckets Added</Dialog.Title>
	</Dialog.Header>

	{#if added != null && added.length > 0}
		<div class="space-y-1 px-1 text-sm">
			<p class="green">
				Successfully added <strong>{added.length}</strong> bucket{added.length !== 1 ? 's' : ''} for
				the selected lake.
			</p>
			<Separator class="my-4" />
			<ul class="list-disc pl-4 pb-1 text-green-600">
				{#each added as bucket}
					<li>{bucket}</li>
				{/each}
			</ul>
		</div>
	{:else}
		<p class="green px-1 text-sm">No buckets were added.</p>
	{/if}

	{#if failed != null && failed.length > 0}
		<div class="space-y-1 px-1 text-sm mt-4">
			<p class="red">
				Failed to add <strong>{failed.length}</strong> bucket{failed.length !== 1 ? 's' : ''} for the
				selected lake.
			</p>
			<ul class="list-disc pl-5 text-red-600">
				{#each failed as bucket}
					<li>{bucket}</li>
				{/each}
			</ul>
		</div>

		<div class="space-y-1 px-1 text-sm text-red-600">
			<p>Check the following for failed buckets:</p>
			<ul class="list-disc pl-5">
				<li>Bucket exists in the selected lake.</li>
				<li>Correct permissions are granted to access it.</li>
			</ul>
		</div>
	{:else if failed}
		<p class="red px-1 text-sm">All buckets were added successfully. No failures reported.</p>
	{/if}

	<Dialog.Footer>
		<Button
			onclick={() => {
				if (whenDone !== null) {
					whenDone?.();
				}
			}}
			class="select-button">Continue</Button
		>
	</Dialog.Footer>
{/snippet}
