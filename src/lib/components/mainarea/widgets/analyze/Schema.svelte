<script lang="ts">
	import Label from '$lib/components/shadcn/ui/label/label.svelte';
	import { FileSpreadsheet, Check, X } from '@lucide/svelte/icons';

	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import { activeLocData, type ActiveLocData } from '$lib/stores/mainarea.ts';
	import { get } from 'svelte/store';

	let loading: boolean = $state(true);

	let schema: any = $state({});
	let fields: any = $state();

	async function getData() {
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(`/api/analyze/overview/schema/${data.TableType}/${data.LocID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		loading = false;
		schema = resp.data;
		fields = resp.data.Fields;
	}

	getData();
</script>

<div class="schema-container">
	<div class="welcome-heading">
		<Label class="text-base flex items-center gap-1">
			<FileSpreadsheet class="h-5 w-5" />
			Table Schema
		</Label>
	</div>

	{#if loading}
		<LoaderSmall {loading} text={'Please wait...'} />
	{:else}
		<p class="schema-id schema-head">Current Schema ID: {schema.SchemaID}</p>

		<div class="schema-table">
			<div class="schema-item">
				<p class="schema-id schema-head">ID</p>
				<p class="schema-field schema-head">Field</p>
				<p class="schema-type schema-head">Type</p>
				<p class="schema-required schema-head">Required</p>
			</div>
			<hr class="elem-bottom-border" />

			{#each fields as field}
				<div class="schema-item on-hover">
					<p class="schema-id">{field.ID}.</p>
					<p class="schema-field">
						{field.Name}
					</p>
					<p class="schema-type">{field.Type}</p>
					<div class="schema-required">
						{#if field.Required}
							<Check class="h-4 w-4 stroke-green-600" />
						{:else if !field.Required}
							<X class="h-4 w-4 stroke-red-500" />
						{/if}
					</div>
				</div>
				<hr class="elem-bottom-border" />
			{/each}
		</div>
	{/if}
</div>

<style>
	.elem-bottom-border {
		border: 1px solid black;
		opacity: 0.2;
	}

	.schema-head {
		font-size: 1rem;
		font-weight: 500;
		color: var(--text);
		opacity: 1;
	}

	.schema-id {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.9;
	}

	.schema-field {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.9;

		word-break: break-word;
		overflow-wrap: break-word;
		white-space: normal;
		width: 100%;
	}

	.schema-type {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.9;

		display: flex;
		justify-self: center;
	}
	.schema-required {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.9;

		display: flex;
		justify-self: center;
	}

	.schema-item {
		display: grid;
		grid-template-columns: 1fr 5fr 2fr 2fr;
		padding: 5px 0px 5px 0px;
	}

	.schema-table {
		width: 100%;
		min-height: 100%;

		display: flex;
		flex-direction: column;

		padding: 5px 5px;
	}

	.schema-container {
		height: 50%;
		width: 100%;
	}

	.welcome-heading {
		font-size: larger;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
