<script lang="ts">
	import * as AlertDialog from '$lib/components/shadcn/ui/alert-dialog/index.ts';
	import { CircleAlert } from '@lucide/svelte/icons';

	import { type Writable } from 'svelte/store';
	import { type ComponentState, type ActionDialogProps } from '$lib/stores/ui';
	import Separator from '$lib/components/shadcn/ui/separator/separator.svelte';
	let {
		active,
		compState
	}: { active: Writable<boolean>; compState: ComponentState<ActionDialogProps> } = $props();
</script>

<AlertDialog.Root bind:open={$active}>
	<AlertDialog.Content class="dialog">
		<AlertDialog.Header>
			<AlertDialog.Title>{compState.Props.Title}</AlertDialog.Title>
			<AlertDialog.Description>{compState.Props.Description}</AlertDialog.Description>
			<Separator />
			<AlertDialog.Description class="flex items-center gap-1">
				<CircleAlert class="h-4 w-4 " />
				Cached versions of the data may persist for a short time, but they are safe and non-editable.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel
				class="select-button"
				onclick={() => {
					if (compState.Props.OnCancel) {
						compState.Props.OnCancel?.();
					}
				}}
			>
				Cancel
			</AlertDialog.Cancel>
			<AlertDialog.Action
				class="select-button"
				onclick={() => {
					compState.Props.OnAction?.();
					active.set(false);
				}}
			>
				{compState.Props.ActionBtnTxt}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
