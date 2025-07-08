<script lang="ts">
	import { ChevronLeft, ChevronRight, LayoutGrid, FolderClock } from '@lucide/svelte/icons';

	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import { activeLocData, type ActiveLocData } from '$lib/stores/mainarea.ts';
	import { get } from 'svelte/store';

	let loading: boolean = $state(true);

	let partition: any = $state({});
	let fields: any = $state();

	let snapshot: any = $state({});

	let fieldsLen: number = $state(0);
	let currIndex: number = $state(0);

	async function getData() {
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(`/api/analyze/overview/partition/${data.TableType}/${data.LocID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		loading = false;
		partition = resp.data;
		fields = resp.data.Fields;
		fieldsLen = fields.length;
	}

	async function getSnapshot() {
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(`/api/analyze/overview/snapshot/${data.TableType}/${data.LocID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		snapshot = resp.data;
	}

	getData();
	getSnapshot();
</script>

{#if loading}
	<LoaderSmall {loading} text={'Please wait...'} />
{:else}
	<div class="main-container">
		<div class="partition-container">
			<div class="welcome-heading">
				<p class="flex items-center gap-1">
					<LayoutGrid class="h-4 w-4" />
					Partition Details
				</p>
			</div>
			<div class="partition-meta">
				<div class="partition-meta-item">
					<p class="partition-field">Total Partition Fields:</p>
					<p class="partition-value">{fieldsLen}</p>
				</div>

				<div class="partition-meta-item">
					<p class="partition-field">Current Field:</p>
					<div class="next-arrow">
						<ChevronLeft
							style="visibility: {currIndex > 0 ? 'visible' : 'hidden'}"
							class="h-4 w-4 cursor-pointer on-hover"
							onclick={() => {
								currIndex--;
							}}
						/>
						<p class="partition-value">{currIndex + 1}/{fieldsLen}</p>
						<ChevronRight
							style="visibility: {currIndex < fieldsLen - 1 ? 'visible' : 'hidden'}"
							class="h-4 w-4 cursor-pointer on-hover"
							onclick={() => {
								currIndex++;
							}}
						/>
					</div>
				</div>
			</div>

			<hr class="elem-bottom-border" />

			<div class="partition-item">
				<div class="partition-sub-item">
					<p class="partition-field">Field ID:</p>
					<p class="partition-value" title={fields[currIndex].FieldID}>
						{fields[currIndex].FieldID}
					</p>
				</div>
				<div class="partition-sub-item">
					<p class="partition-field">Name:</p>
					<p class="partition-value" title={fields[currIndex].Name}>
						{fields[currIndex].Name}
					</p>
				</div>
				<div class="partition-sub-item">
					<p class="partition-field">Transform:</p>
					<p class="partition-value" title={fields[currIndex].Transform}>
						{fields[currIndex].Transform}
					</p>
				</div>
				<div class="partition-sub-item">
					<p class="partition-field">Source ID:</p>
					<p class="partition-value" title={fields[currIndex].SourceID}>
						{fields[currIndex].SourceID}
					</p>
				</div>
			</div>
		</div>
		<div class="snapshot-container">
			<div class="welcome-heading">
				<p class="flex items-center gap-1">
					<FolderClock class="h-4 w-4" />
					Snapshot Details
				</p>
			</div>
			<div class="partition-item">
				<div class="partition-sub-item">
					<p class="partition-field">Schema ID:</p>
					<p class="partition-value" title={snapshot.SchemaID}>
						{snapshot.SchemaID}
					</p>
				</div>
				<div class="partition-sub-item">
					<p class="partition-field">Last Operation:</p>
					<p class="partition-value" title={snapshot.LastOperation}>
						{snapshot.LastOperation}
					</p>
				</div>
				<div class="partition-sub-item">
					<p class="partition-field">Manifest List:</p>
					<p class="partition-value" title={snapshot.ManifestList}>
						{snapshot.ManifestList}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.partition-meta {
		height: auto;
		width: 100%;
		padding: 10px 0px;
	}

	.partition-meta-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.partition-field {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.8;

		margin-right: 10px;
	}

	.partition-value {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.9;

		word-wrap: normal;
		text-overflow: ellipsis;
		overflow-x: hidden;
	}

	.partition-sub-item {
		display: grid;
		grid-template-columns: 1fr 2fr;
	}

	.partition-item {
		height: auto;
		width: 100%;
		line-height: 1.4rem;
		padding: 10px 0px;
	}

	.partition-container {
		padding: 10px 10px;
		overflow-y: auto;

		border-right: 1px solid black;
	}

	.snapshot-container {
		/* background-color: green; */
		padding: 10px 10px;
		overflow-y: auto;
	}

	.main-container {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
	}

	.welcome-heading {
		font-size: 0.85rem;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.next-arrow {
		width: max-content;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;

		padding: 0px 3px 0px 3px;
	}
	.elem-bottom-border {
		border: 1px solid black;
		opacity: 0.2;
	}
</style>
