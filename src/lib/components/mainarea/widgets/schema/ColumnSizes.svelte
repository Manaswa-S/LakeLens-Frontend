<script lang="ts">
	import { activeLocData, type ActiveLocData } from '$lib/stores/mainarea.ts';
	import { get } from 'svelte/store';
	import { abbreviateBytes } from '$lib/common/time.ts';
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';

	type ColSize = {
		ID: number;
		Name: string;
		Size: string;
		NullCount: string;
		ValueCount: string;
		AvgSizePerVal: string;
	};

	type SchemaSizes = {
		SchemaID: string;
		ColSizes: ColSize[];
	};

	let loading = $state(false);
	let sizes: SchemaSizes = $state({
		SchemaID: '',
		ColSizes: []
	});

	async function getData() {
		loading = true;
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(
			`/api/analyze/schema/colsizes/${data.TableType}/${data.LocID}/latest`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const resp = await update.json();
		sizes = resp.data;
		loading = false;
		console.log(sizes);
	}

	getData();
</script>

<div class="sizes-wrapper">
	<div class="welcome-heading">Column Sizes</div>

	<div class="sizes-table-container">
		{@render sizesTable(sizes)}
	</div>
</div>

<!-- {
    "ID": 1,
    "Name": "departure_delay",
    "Size": 21226917,
    "NullCount": 344612,
    "ValueCount": 23276323,
    "AvgSizePerVal": 0.9256577
} -->

{#snippet sizesTable(sizes: SchemaSizes)}
	<div class="schema-container">
		{#if loading}
			<LoaderSmall {loading} text={'Please wait...'} />
		{:else}
			<p class="schema-head">Schema ID: {sizes.SchemaID}</p>

			<div class="schema-table">
				<div class="schema-item">
					<p class="schema-id schema-head">ID</p>
					<p class="schema-field schema-head">Field</p>
					<p class="schema-type schema-head">Size</p>
					<p class="schema-type schema-head">Values</p>
					<p class="schema-type schema-head">Nulls</p>
					<p class="schema-type schema-head">Avg Size</p>
				</div>
				<hr class="elem-bottom-border" />

				{#each sizes.ColSizes as field}
					<div class="schema-item on-hover">
						<p class="schema-id schema-row">{field.ID}.</p>
						<p class="schema-field schema-row">
							{field.Name}
						</p>
						<p class="schema-type schema-row" title="{field.Size} Bytes">
							{abbreviateBytes(field.Size)}
						</p>
						<p class="schema-type schema-row">
							{field.ValueCount}
						</p>
						<p class="schema-type schema-row">
							{field.NullCount}
						</p>
						<p class="schema-type schema-row">
							{field.AvgSizePerVal}
						</p>
					</div>
					<hr class="elem-bottom-border" />
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

<style>
	.sizes-table-container {
		height: auto;
		width: 100%;

		overflow-y: auto;
	}

	.sizes-wrapper {
		height: 100%;
		width: 100%;

		overflow-y: hidden;
		/* background-color: red; */
	}

	/* // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

	.elem-bottom-border {
		border: 1px solid black;
		opacity: 0.2;
	}

	.schema-row {
		font-size: 0.9rem;
		font-weight: 400;
		color: var(--text);
		opacity: 0.9;
	}

	.schema-head {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text);
		opacity: 0.9;
	}

	.schema-id {
		padding: 0px 0px 0px 8px;
		width: 100%;
	}

	.schema-field {
		word-break: break-word;
		overflow-wrap: break-word;
		white-space: normal;
		width: 100%;
	}

	.schema-type {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.schema-required {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.schema-item {
		display: grid;
		grid-template-columns: 1fr 6fr 4fr 4fr 4fr 4fr;
		gap: 0.3rem;
		padding: 8px 0px 8px 0px;
	}

	.schema-table {
		width: 100%;
		min-height: 100%;

		display: flex;
		flex-direction: column;

		padding: 0px 0px;
	}

	.schema-container {
		height: 50%;
		width: 100%;
	}

	/* // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

	.welcome-heading {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text);
		opacity: 0.9;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
