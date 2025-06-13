<script>
	import * as Dialog from '$lib/components/shadcn/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/shadcn/ui/button/index.js';
	import { Input } from '$lib/components/shadcn/ui/input/index.js';
	import { Label } from '$lib/components/shadcn/ui/label/index.js';
	import * as HoverCard from '$lib/components/shadcn/ui/hover-card/index.js';
	import * as Select from '$lib/components/shadcn/ui/select/index.js';
	import Info from '@lucide/svelte/icons/info';
	import Plus from '@lucide/svelte/icons/plus';
	import Loader from '@lucide/svelte/icons/loader';

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

	// TODO: get this from somewhere async
	const providers = [
		{ value: 'awsS3', label: 'AWS-S3' },
		{ value: 'azure', label: 'Azure' },
		{ value: 'minIO', label: 'MinIO' }
	];

	let provider = $state('');
	const trigger = $derived(providers.find((p) => p.value === provider)?.label ?? 'Select Provider');

	// svelte-ignore non_reactive_update
	let name = '';
	// svelte-ignore non_reactive_update
	let s3AccessId = '';
	// svelte-ignore non_reactive_update
	let s3AccessKey = '';
	// svelte-ignore non_reactive_update
	let s3Region = '';

	// svelte-ignore non_reactive_update
	let isLoading = $state(false);

	let opErrored = $state(false);
	// svelte-ignore non_reactive_update
	let opError = '';

	// svelte-ignore non_reactive_update
	let locsResp = [];

	let locsFound = $state(false);
	let tncchecked = $state(false);

	async function submitNew(payload) {
		const update = await fetch('/api/lens/project/new', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const resp = await update.json();
		console.log(resp);

		if (resp.status !== 201) {
			opErrored = true;
			opError = resp.data.Message;
		} else {
			resp.data.forEach((elem) => {
				locsResp.push({
					Name: elem.Name,
					CreationDate: getReadableDate(elem.CreationDate),
					Region: elem.Region
				});
			});
			locsFound = true;
			console.log(locsResp);
		}
		isLoading = false;
	}

	function getReadableDate(date) {
		const dateDate = new Date(date);
		const readableDate = dateDate.toLocaleString('en-IN', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true
		});
		return readableDate;
	}

	async function newHelper() {
		isLoading = true;
		opErrored = false;
		opError = '';

		let payload = {};
		switch (provider) {
			case 'awsS3':
				payload = {
					Name: name,
					S3: { AccessID: s3AccessId, AccessKey: s3AccessKey, LakeRegion: s3Region }
				};
				break;

			default:
				break;
		}
		await submitNew(payload);
	}

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	import LocationsTable from './locsTable/LocsTable.svelte';
	import { columns, demoRows } from './locsTable/locs-columns.ts';
	import { locsSelected } from '$lib/stores/lens-global.ts';
	import { get } from 'svelte/store';

	function logSelected() {
		const a = get(locsSelected);
		console.log(a);
	}
	let selectedLimit = 5;

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	import { Checkbox } from '$lib/components/shadcn/ui/checkbox/index.js';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: '' })}>
		<Plus class="h-2 w-2" />
		New Lake
	</Dialog.Trigger>

	<!-- <Dialog.Content class="new-lake {locsFound ? '' : 'new-lake-table'}">
		{#if locsFound}
			{@render getInfoContent()}
		{:else}
			{@render locsTable(demoRows, columns)}
		{/if}
	</Dialog.Content> -->

	<Dialog.Content class="new-lake {locsFound ? 'new-lake-table' : 'max-w-lg'}">
		{#if !locsFound}
			{@render getInfoContent()}
		{:else}
			{@render locsTable(locsResp, columns)}
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
			bind:value={name}
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

		{@render select(providers)}
	</div>

	{#if provider === 'awsS3'}
		{@render awss3()}
	{/if}

	{#if provider === 'azure'}
		{@render azure()}
	{/if}

	{#if provider === 'minIO'}
		{@render minIO()}
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
				Checking Access
			{:else}
				Add
			{/if}
		</Button>
	</Dialog.Footer>
{/snippet}

{#snippet infoHover(title, desc)}
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

{#snippet select(items)}
	<Select.Root type="single" bind:value={provider}>
		<Select.Trigger class="w-24 select-trigger">{trigger}</Select.Trigger>
		<Select.Content class="select">
			<Select.Group>
				{#each items as item (item.value)}
					<Select.Item class="select-item" value={item.value} label={item.label}>
						{item.label}
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

{#snippet azure()}
	<div class="flex items-center space-x-2 setting-switch">
		<Label for="font-size" class="flex items-center gap-1">
			Blob ID
			{@render infoHover('', 'Give your project a unique name.')}
		</Label>

		<Input id="font-size" type="text" placeholder="e.g. my-project-x" class="w-24 settings-input" />
	</div>

	<div class="flex items-center space-x-2 setting-switch">
		<Label for="font-size" class="flex items-center gap-1">
			Blob Key
			{@render infoHover('', 'Give your project a unique name.')}
		</Label>

		<Input id="font-size" type="text" placeholder="e.g. my-project-x" class="w-24 settings-input" />
	</div>

	<div class="flex items-center space-x-2 setting-switch">
		<Label for="font-size" class="flex items-center gap-1">
			Region
			{@render infoHover('', 'Give your project a unique name.')}
		</Label>

		<Input id="font-size" type="text" placeholder="e.g. my-project-x" class="w-24 settings-input" />
	</div>
{/snippet}

{#snippet minIO()}
	<div class="flex items-center space-x-2 setting-switch">
		<Label for="font-size" class="flex items-center gap-1">
			Access Key
			{@render infoHover('', 'Give your project a unique name.')}
		</Label>

		<Input id="font-size" type="text" placeholder="e.g. my-project-x" class="w-24 settings-input" />
	</div>

	<div class="flex items-center space-x-2 setting-switch">
		<Label for="font-size" class="flex items-center gap-1">
			Secret Key
			{@render infoHover('', 'Give your project a unique name.')}
		</Label>

		<Input id="font-size" type="text" placeholder="e.g. my-project-x" class="w-24 settings-input" />
	</div>

	<div class="flex items-center space-x-2 setting-switch">
		<Label for="font-size" class="flex items-center gap-1">
			Region
			{@render infoHover('', 'Give your project a unique name.')}
		</Label>

		<Input id="font-size" type="text" placeholder="e.g. my-project-x" class="w-24 settings-input" />
	</div>
{/snippet}

{#snippet locsTable(data, columns)}
	<Dialog.Header>
		<Dialog.Title>Buckets Found</Dialog.Title>
	</Dialog.Header>

	<div class="space-y-1 px-1 text-sm">
		<p class="green">
			Found <strong>{data.length}</strong> buckets in the selected lake.
		</p>
		<p class="green">Please select the buckets you want to analyze.</p>
		<p class="red">
			Note: You can select up to <strong>{selectedLimit || 5}</strong> bucket{(selectedLimit || 5) >
			1
				? 's'
				: ''}.
		</p>
	</div>

	<LocationsTable {data} {columns} />

	<Dialog.Footer>
		<Button onclick={logSelected} class="select-button">Confirm</Button>
	</Dialog.Footer>
{/snippet}

{#snippet tncCheckbox()}
	<div class="flex flex-col gap-6">
		<div class="flex items-start gap-3">
			<Checkbox bind:checked={tncchecked} on id="terms-2" />
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
