<script lang="ts">
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import { escapeHtml } from '$lib/common/actions.ts';

	import { Lightbulb } from '@lucide/svelte/icons';
	import { scale } from 'svelte/transition';

	let loading = $state(true);
	let tipid: any = $state(1);

	let tip: string = $state('');
	let hrefs: any = $state();

	async function getData() {
		const update = await fetch(`/api/tip/${tipid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		tip = resp.data.Tip;
		hrefs = resp.data.HRefs;
		loading = false;
	}

	function injectTipLinks(
		text: string,
		hrefs: Record<string, { name: string; link: string }>
	): string {
		const safeText = escapeHtml(text);
		return safeText.replace(/\{\.([^}]+)\}/g, (_, id) => {
			const href = hrefs[id];
			if (!href) return `{.${id}}`;

			const safeName = escapeHtml(href.name);
			const safeLink = escapeHtml(href.link);

			return `<a class="underline" href="${safeLink}" target="_blank" rel="noopener noreferrer">${safeName}</a>`;
		});
	}

	getData();

	function pollForNext() {
		setInterval(() => {
			tipid++;
			getData();
		}, 3000);
	}

	// pollForNext();
</script>

<div class="welcome-heading">
	<p class="flex items-center gap-1">
		<Lightbulb class="h-4 w-4 draw-icon" />
		Tip
	</p>
</div>
{#if loading}
	<LoaderSmall {loading} text={'Please wait...'} />
{:else}
	<div class="tip-container" transition:scale={{ delay: 10, duration: 300 }}>
		<p class="tip-text">{@html injectTipLinks(tip, hrefs)}</p>
	</div>
{/if}

<style>
	.tip-text {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text);
		opacity: 1;

		height: 100%;
		width: 100%;
	}

	.tip-container {
		height: 100%;
		width: 100%;

		/* background-color: red; */
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.welcome-heading {
		font-size: 0.85rem;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
