<script lang="ts">
	import * as Dialog from '$lib/components/shadcn/ui/dialog/index.js';
	import { Label } from '$lib/components/shadcn/ui/label/index.js';
	import Separator from '$lib/components/shadcn/ui/separator/separator.svelte';

	import { type Writable } from 'svelte/store';
	import { toReadableTime } from '$lib/common/time.ts';
	import { toast } from 'svelte-sonner';

	import { type ComponentState, type LakeDetailsDialogProps } from '$lib/stores/ui';

	let {
		active,
		compState
	}: { active: Writable<boolean>; compState: ComponentState<LakeDetailsDialogProps> } = $props();

	async function getDetails(lakeid: any) {
		const update = await fetch(`/api/lens/lake/details/${lakeid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();

		console.log(resp);

		if (resp.status !== 200) {
			toast.error(resp.data.Message);
			return;
		}
	}

	async function loadInit() {
		await getDetails(compState.Props.Details.LakeID);
	}
	loadInit();
</script>

<Dialog.Root bind:open={$active}>
	<Dialog.Content class="dialog lake-details-dialog">
		<!-- <Tabs.Root value="details">
			<Tabs.List>
				<Tabs.Trigger value="details">Details</Tabs.Trigger>
				<Tabs.Trigger value="history">History</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content class="dialog" value="details"> -->
		<Dialog.Header>
			<Dialog.Title>Details</Dialog.Title>
		</Dialog.Header>

		<Separator />

		<div class="setting-switch">
			<Label for="advanced-mode" class="flex items-center gap-1">Name</Label>
			<Label for="advanced-mode" class="flex items-center gap-1">
				{compState.Props.Details.Name}
			</Label>
		</div>

		<div class="setting-switch">
			<Label for="advanced-mode" class="flex items-center gap-1">Provider</Label>
			<Label for="advanced-mode" class="flex items-center gap-1">
				{compState.Props.Details.Ptype}
			</Label>
		</div>

		<div class="setting-switch">
			<Label for="advanced-mode" class="flex items-center gap-1">Region</Label>
			<Label for="advanced-mode" class="flex items-center gap-1">
				{compState.Props.Details.Region}
			</Label>
		</div>

		<div class="setting-switch">
			<Label for="advanced-mode" class="flex items-center gap-1">Created At</Label>
			<Label for="advanced-mode" class="flex items-center gap-1">
				{toReadableTime(compState.Props.Details.CreatedAt)}
			</Label>
		</div>
		<!-- </Tabs.Content>
			<Tabs.Content value="history"> -->
		<!-- </Tabs.Content>
		</Tabs.Root> -->
	</Dialog.Content>
</Dialog.Root>

<!--
    1) Associated Buckets	List of bucket.Names under this lake
    2)  Registered Locations	Derived from GetLocsListForLake	Indicate registered vs. unregistered
    3) Last Modified	If tracked (e.g., lake.UpdatedAt)
    4) Storage Type	Parquet / Iceberg / Delta / Hudi, etc. (from config)
    5) Size / Object Count	If available via stats API or metadata

    6) IAM Role / Access Policy	lake.AccessRole, access policies available
    7) other data that we pull from the provider

    8) history
    


    use tabs for this, 'locations', 'history', 'details', etc

-->
