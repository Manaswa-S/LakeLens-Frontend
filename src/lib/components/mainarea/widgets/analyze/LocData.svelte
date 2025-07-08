<script lang="ts">
	import { Copy, ClipboardCheck } from '@lucide/svelte/icons';
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import { activeLocData, type ActiveLocData } from '$lib/stores/mainarea.ts';
	import { get } from 'svelte/store';

	let loading = $state(true);
	let metadata: any = $state({});
	let fileUriEntries: any = $state([]);

	async function getData() {
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(`/api/analyze/overview/metadata/${data.TableType}/${data.LocID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		metadata = resp.data;
		for (const [key, value] of Object.entries(metadata.FileURIs)) {
			fileUriEntries.push({
				value: value,
				name: key
			});
		}
		loading = false;
	}

	getData();

	function copyToClipboard(id: string, textToCopy: string) {
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				console.log('Copied!');
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
			});

		copiedID = id;

		setTimeout(() => {
			copiedID = '';
		}, 3000);
	}
	let copiedID = $state('');
</script>

{#if loading}
	<LoaderSmall {loading} text={'Please wait...'} />
{:else}
	<div class="loc-data-container">
		<div class="loc-data-grid-elem">
			<p class="loc-data-field">Found At:</p>

			<div class="copy-able">
				<p class="loc-data-value">
					{metadata.FoundAt}
				</p>
				{#if copiedID == 'copy-lake-uri'}
					<ClipboardCheck class="h-4 w-4" />
				{:else}
					<Copy
						class="h-4 w-4 cursor-pointer on-hover"
						onclick={() => {
							copyToClipboard('copy-lake-uri', metadata.FoundAt);
						}}
					/>
				{/if}
			</div>
		</div>
		<hr class="elem-bottom-border" />

		<div class="loc-data-grid-elem">
			<p class="loc-data-field">Location:</p>

			<div class="copy-able">
				<p class="loc-data-value">
					{metadata.Location}
				</p>
				{#if copiedID == 'copy-lake-uri'}
					<ClipboardCheck class="h-4 w-4" />
				{:else}
					<Copy
						class="h-4 w-4 cursor-pointer on-hover"
						onclick={() => {
							copyToClipboard('copy-lake-uri', metadata.Location);
						}}
					/>
				{/if}
			</div>
		</div>
		<hr class="elem-bottom-border" />

		<div class="loc-data-grid-elem">
			<p class="loc-data-field">Table UUID:</p>

			<div class="copy-able">
				<p class="loc-data-value">
					{metadata.TableUUID}
				</p>
				{#if copiedID == 'copy-lake-uri'}
					<ClipboardCheck class="h-4 w-4" />
				{:else}
					<Copy
						class="h-4 w-4 cursor-pointer on-hover"
						onclick={() => {
							copyToClipboard('copy-lake-uri', metadata.TableUUID);
						}}
					/>
				{/if}
			</div>
		</div>
		<hr class="elem-bottom-border" />

		{#each fileUriEntries as entry}
			<div class="loc-data-grid-elem">
				<p class="loc-data-field">{entry.name}:</p>

				<div class="copy-able">
					<p class="loc-data-value">
						{entry.value}
					</p>
					{#if copiedID == `copy-${entry.name}-uri`}
						<ClipboardCheck class="h-4 w-4" />
					{:else}
						<Copy
							class="h-4 w-4 cursor-pointer on-hover"
							onclick={() => {
								copyToClipboard(`copy-${entry.name}-uri`, entry.value);
							}}
						/>
					{/if}
				</div>
			</div>
			<hr class="elem-bottom-border" />
		{/each}
	</div>
{/if}

<style>
	.elem-bottom-border {
		border: 1px solid black;
		opacity: 0.4;
	}

	.copy-able {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		gap: 0.8rem;
	}

	.loc-data-field {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text);
		opacity: 0.9;
	}
	.loc-data-value {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text);
		opacity: 0.9;

		overflow-wrap: break-word;
		width: 100%;
	}

	.loc-data-grid-elem {
		display: grid;
		grid-template-columns: 2fr 6fr;
		grid-template-rows: 1fr;

		padding: 5px 5px;
	}

	.loc-data-grid-elem-uri {
		display: grid;
		grid-template-columns: 4fr 2fr;
		grid-template-rows: 1fr;
	}

	.loc-data-container {
		height: 100%;
		width: 100%;
		/* background-color: red; */
	}
</style>
