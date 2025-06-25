<script lang="ts">
	import Label from '../../../shadcn/ui/label/label.svelte';
	import * as HoverCard from '$lib/components/shadcn/ui/hover-card/index.ts';

	import {
		CircleCheckBig,
		ShieldCheck,
		FolderPen,
		FolderOutput,
		Info,
		ShieldAlert
	} from '@lucide/svelte/icons';
	import { get } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';

	import { type LocChecks } from '$lib/types/global.ts';

	let { projectsList }: { projectsList: any } = $props();
	let currIndex: number = $state(0);

	let locsChecks: LocChecks[] = $state([]);
	let loading = $state(true);

	async function getData() {
		const projs: any = get(projectsList);
		const update = await fetch(`/api/lens/meta/bucs-check/${projs[currIndex].Lake.LakeID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		locsChecks = resp.data;
		loading = false;
	}

	getData();
</script>

<div class="welcome-heading">
	<Label class="text-base flex items-center gap-1"
		>Bucket Checks
		{@render infoHover('', '')}
	</Label>
</div>

{#if loading}
	<LoaderSmall {loading} text={'Please wait...'} />
{:else}
	<div class="checks-container">
		{#each locsChecks as loc, i}
			<div class="check-elem" transition:scale={{ delay: 50, duration: 500 }}>
				<div class="sr-no-loc-name">
					<p class="text-sm minw-minc">{i + 1}.</p>
					<p class="text-sm" title={loc.BucketName}>{loc.BucketName}</p>
				</div>
				<div class="check-icons">
					<ShieldCheck class="h-5 w-5 stroke-{loc.AuthCheck ? 'green' : 'red'}-600 ml-2" />
					<FolderOutput class="h-5 w-5 stroke-{loc.ReadCheck ? 'green' : 'red'}-600 ml-2" />
					<FolderPen class="h-5 w-5 stroke-{loc.WriteCheck ? 'green' : 'red'}-600 ml-2" />
					<CircleCheckBig class="h-5 w-5 stroke-{loc.PolicyCheck ? 'green' : 'red'}-600 ml-2" />
				</div>
			</div>
			<hr class="hr-style" />
		{/each}

		<div class="disclaimer-card" transition:scale={{ delay: 50, duration: 500 }}>
			<div class="disclaimer-icon">
				<ShieldAlert class="w-5 h-5" />
			</div>
			<p class="text-sm">
				We require S3 write access only to store lightweight cache files that help speed up
				operations and queries, otherwise stored on our servers.
				<br />
				All cached files are stored in a dedicated internal prefix ".lakelens-cache/".
			</p>
		</div>
	</div>
{/if}

{#snippet infoHover(title: string, desc: string)}
	<HoverCard.Root>
		<HoverCard.Trigger>
			<Info class="w-4 h-4 ml-2" />
		</HoverCard.Trigger>
		<HoverCard.Content class="hovercard">
			<div>
				<h4 class="text-sm font-semibold">{title}</h4>
				<p class="text-sm">{desc}</p>
				<div class="main-info">
					<CircleCheckBig class="h-4 w-4 stroke-green-600" />
					<p class="ml-2">All ACL/Policy checks.</p>
				</div>
				<div class="main-info">
					<FolderOutput class="h-4 w-4 stroke-green-600" />
					<p class="ml-2">S3 Read Access check.</p>
				</div>
				<div class="main-info">
					<FolderPen class="h-4 w-4 stroke-green-600" />
					<p class="ml-2">S3 Write Access check.</p>
				</div>
				<div class="main-info">
					<ShieldCheck class="h-4 w-4 stroke-green-600" />
					<p class="ml-2">Authenticate check.</p>
				</div>

				<div class="main-info">
					<ShieldCheck class="h-4 w-4 stroke-red-500" />
					<p class="ml-2">Check failed.</p>
				</div>

				<div class="main-info">
					<ShieldCheck class="h-4 w-4 stroke-green-600" />
					<p class="ml-2">Check passed.</p>
				</div>
			</div>
		</HoverCard.Content>
	</HoverCard.Root>
{/snippet}

<style>
	.sr-no-loc-name {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;

		overflow: hidden;
		text-overflow: ellipsis;
	}

	.minw-minc {
		min-width: min-content !important;
	}

	.welcome-heading {
		font-size: larger;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.checks-container {
		width: 100%;

		margin-top: 1rem;
	}

	.check-elem {
		padding: 0px 5px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.check-elem p {
		margin-right: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	.disclaimer-card {
		/* padding: 8px 5px 5px 5px; */
		margin: 10px 0px;

		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.disclaimer-card p {
		max-width: 100%;
	}

	.disclaimer-icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.check-icons {
		display: flex;
		flex-direction: row;
	}

	.main-info {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.main-info p {
		font-size: 14px;
	}

	.hr-style {
		border-color: black;
		margin: 6px 0px;
	}
</style>
