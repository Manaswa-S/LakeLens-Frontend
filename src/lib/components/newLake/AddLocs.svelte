<script lang="ts">
	import * as Dialog from '$lib/components/shadcn/ui/dialog';
	import AddLocations from '$lib/components/newLake/AddLocsRaw.svelte';
	import { type ComponentState, type AddLocsProps } from '$lib/stores/ui.ts';
	import { type Writable } from 'svelte/store';

	let {
		active,
		compState
	}: { active: Writable<boolean>; compState: ComponentState<AddLocsProps> } = $props();

	let extraClass = $state('new-lake-table');
	function changeClasses() {
		extraClass = 'max-w-lg';
		compState.Props.WhenLocsAdded?.();
	}

	function onDone() {
		active.set(false);
		compState.WhenDone?.();
	}
</script>

<Dialog.Root bind:open={$active}>
	<Dialog.Content class="dialog {extraClass}">
		<AddLocations
			lakeID={compState.Props.LakeID}
			locations={compState.Props.Locations}
			whenLocsAdded={changeClasses}
			whenDone={onDone}
		/>
	</Dialog.Content>
</Dialog.Root>
