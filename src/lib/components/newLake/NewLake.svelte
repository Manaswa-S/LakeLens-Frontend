<script lang="ts">
	import * as Dialog from '$lib/components/shadcn/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/shadcn/ui/button/index.js';
	import { Input } from '$lib/components/shadcn/ui/input/index.js';
	import { Label } from '$lib/components/shadcn/ui/label/index.js';
	import * as HoverCard from '$lib/components/shadcn/ui/hover-card/index.js';
	import * as Select from '$lib/components/shadcn/ui/select/index.js';
	import { Checkbox } from '$lib/components/shadcn/ui/checkbox/index.js';
	import AddLocsRaw from '$lib/components/newLake/AddLocsRaw.svelte';

	import Info from '@lucide/svelte/icons/info';
	import Plus from '@lucide/svelte/icons/plus';
	import Loader from '@lucide/svelte/icons/loader';

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

	import { providers, type LakeProviders } from '$lib/stores/internal.ts';

	import { toReadableTime } from '$lib/common/time.ts';

	let provider = $state('');
	const trigger = $derived(
		$providers.find((p) => p.Value === provider)?.Label ?? 'Select Provider'
	);

	// svelte-ignore non_reactive_update
	let lakeName = '';
	// svelte-ignore non_reactive_update
	let s3AccessId = '';
	// svelte-ignore non_reactive_update
	let s3AccessKey = '';
	// svelte-ignore non_reactive_update
	let s3Region = '';
	// svelte-ignore non_reactive_update
	let lakeID = '';

	let isLoading = $state(false);
	let loadingText = $state('');

	let opErrored = $state(false);
	let opError = $state('');

	// svelte-ignore non_reactive_update
	let locsResp: any = [];

	let locsFound = $state(false);
	let tncchecked = $state(false); // TODO: have an explicit check
	let locsAdded = $state(false);

	async function submitNew(payload: any) {
		const update = await fetch('/api/lens/lake/new', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const resp = await update.json();

		if (resp.status !== 201) {
			opErrored = true;
			opError = resp.data.Message;
		} else {
			lakeID = resp.data.LakeID;
			lakeName = '';
			resp.data.Locations.forEach((elem: any) => {
				locsResp.push({
					Name: elem.Name,
					CreationDate: toReadableTime(elem.CreationDate),
					Region: elem.Region
				});
			});
			locsFound = true;
		}
		isLoading = false;
	}

	async function newHelper() {
		opErrored = false;
		opError = '';
		isLoading = true;
		loadingText = 'Checking Access';

		let payload = {};
		switch (provider) {
			case 'awsS3':
				payload = {
					Name: lakeName,
					S3: { AccessID: s3AccessId, AccessKey: s3AccessKey, LakeRegion: s3Region }
				};
				break;

			default:
				break;
		}
		await submitNew(payload);
	}

	// Props
	// whenDone: {the function that is to run at the very end}
	let { whenDone } = $props();

	let open = $state(false);
	function doneAdding() {
		open = false;
		whenDone?.(true);
	}

	function locsAddedRef() {
		locsAdded = true;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants()}>
		<Plus class="h-2 w-2" />
		New Lake
	</Dialog.Trigger>

	<Dialog.Content class="dialog {locsFound && !locsAdded ? 'new-lake-table' : 'max-w-lg'}">
		{#if !locsFound && !locsAdded}
			{@render getInfoContent()}
		{:else if locsFound}
			<AddLocsRaw
				{lakeID}
				locations={locsResp}
				whenDone={doneAdding}
				whenLocsAdded={locsAddedRef}
			/>
		{/if}
	</Dialog.Content>
</Dialog.Root>

{#snippet getInfoContent()}
	<Dialog.Header>
		<Dialog.Title>New</Dialog.Title>
	</Dialog.Header>

	<div class="setting-switch">
		<Label for="font-size" class="flex items-center gap-1">
			Name
			{@render infoHover('', 'Give your project a unique name.')}
		</Label>

		<Input
			id="font-size"
			type="text"
			placeholder="e.g. my-project-x"
			class="w-24 settings-input"
			bind:value={lakeName}
		/>
	</div>

	<div class="setting-switch">
		<Label for="theme" class="flex items-center gap-1">
			Provider
			{@render infoHover(
				'',
				'Specifies the cloud provider or storage service (e.g., AWS, GCP, Azure, DigitalOcean) your credentials and settings are meant for. Determines how connections and APIs are configured internally.'
			)}
		</Label>

		{@render select($providers)}
	</div>

	{#if provider === 'awsS3'}
		{@render awss3()}
	{/if}

	{#if opErrored}
		<div class="">
			<Label class="flex items-center gap-1 red">{opError}</Label>
		</div>
	{/if}

	{#if provider !== ''}
		{@render tncCheckbox()}
	{/if}

	<Dialog.Footer>
		<Button onclick={newHelper} class="select-button" disabled={isLoading || !tncchecked}>
			{#if isLoading}
				<Loader class="animate-spin" />
				{' '}
				{loadingText}
			{:else}
				Add
			{/if}
		</Button>
	</Dialog.Footer>
{/snippet}

{#snippet infoHover(title: string, desc: string)}
	<HoverCard.Root>
		<HoverCard.Trigger>
			<Info class="w-4 h-4" />
		</HoverCard.Trigger>
		<HoverCard.Content class="hovercard">
			<div>
				<h4 class="text-sm font-semibold">{title}</h4>
				<p class="text-sm">{desc}</p>
			</div>
		</HoverCard.Content>
	</HoverCard.Root>
{/snippet}

{#snippet select(providers: LakeProviders[])}
	<Select.Root type="single" bind:value={provider}>
		<Select.Trigger class="w-24 select-trigger">{trigger}</Select.Trigger>
		<Select.Content class="select">
			<Select.Group>
				{#each providers as item (item.Value)}
					<Select.Item class="select-item" value={item.Value} label={item.Label}>
						{item.Label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
{/snippet}

{#snippet awss3()}
	<div class="setting-switch">
		<Label for="s3-access-id" class="flex items-center gap-1">
			Access ID
			{@render infoHover('', 'This is your AWS Access Key ID used to authenticate requests.')}
		</Label>

		<Input
			id="s3-access-id"
			type="text"
			placeholder="e.g. AKIAIOSFODNN7EXAMPLE"
			class="w-24 settings-input"
			bind:value={s3AccessId}
		/>
	</div>

	<div class="setting-switch">
		<Label for="s3-access-key" class="flex items-center gap-1">
			Access Key
			{@render infoHover('', 'Your AWS Secret Access Key. Keep this private and secure.')}
		</Label>

		<Input
			id="s3-access-key"
			bind:value={s3AccessKey}
			type="password"
			placeholder="e.g."
			class="w-24 settings-input"
		/>
	</div>

	<div class="setting-switch">
		<Label for="s3-region" class="flex items-center gap-1">
			Region
			{@render infoHover('', 'The AWS region where your S3 bucket is located.')}
		</Label>

		<Input
			id="s3-region"
			bind:value={s3Region}
			type="text"
			placeholder="e.g. us-east-1"
			class="w-24 settings-input"
		/>
	</div>
{/snippet}

{#snippet tncCheckbox()}
	<div class="flex flex-col gap-6">
		<div class="flex items-start gap-3">
			<Checkbox bind:checked={tncchecked} />
			<div class="grid gap-2 pl-2">
				<Label for="terms-2">Accept terms and conditions</Label>
				<p class="text-muted-foreground text-sm">
					By clicking this checkbox, you agree to our
					<a href="/terms" class="underline" target="_blank" rel="noopener noreferrer">
						terms and conditions
					</a>.
				</p>
			</div>
		</div>
	</div>
{/snippet}
