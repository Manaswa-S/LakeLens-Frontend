<script lang="ts">
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu/index.ts';
	import DropdownMenuLabel from '$lib/components/shadcn/ui/dropdown-menu/dropdown-menu-label.svelte';
	import * as Sidebar from '$lib/components/shadcn/ui/sidebar/index.ts';
	import Box from '@lucide/svelte/icons/box';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import * as ContextMenu from '$lib/components/shadcn/ui/context-menu/index.ts';

	import { type Writable } from 'svelte/store';

	let { loc }: { loc: LocDetails } = $props();

	import { type LocDetails } from '$lib/types/global.ts';
	import { type ComponentState } from '$lib/stores/ui.ts';
	import { type ActionDialogProps } from '$lib/stores/ui.ts';
	import { ActionDialogActive } from '$lib/stores/ui.ts';
	import { ActionDialogState } from '$lib/stores/ui.ts';
	import { delLoc } from '$lib/common/calls';

	import { analyzeLoc } from '$lib/stores/mainarea.ts';

	type menuOpt = {
		value: string;
		label: string;
		todoFunc: any;
		uiActive: Writable<boolean> | null;
		uiState: Writable<ComponentState<any>> | null;
		uiArgs: ActionDialogProps | null;
		whenDone: any;
	};

	type menuOptions = {
		title: string;
		options: menuOpt[];
	};

	function buildSubMenuItems(loc: LocDetails) {
		const a: menuOptions[] = [
			{
				title: 'Options',
				options: [
					{
						label: 'Analyze',
						value: '',
						todoFunc: () => {
							analyzeLoc(loc.LocID);
						},
						uiActive: null,
						uiState: null,
						uiArgs: null,
						whenDone: null
					},
					{
						label: 'Remove',
						value: '',
						todoFunc: () => {},
						uiActive: ActionDialogActive,
						uiState: ActionDialogState,
						uiArgs: {
							Title: `Delete location "${loc.BucketName}"?`,
							Description: `This action is irreversible. The location "${loc.BucketName}" and all associated data will be permanently removed from your account and our servers.`,
							OnAction: () => {
								delLoc(loc.LocID);
							},
							ActionBtnTxt: 'Delete',
							OnCancel: null
						},
						whenDone: null
					}
				]
			}
		];

		return a;
	}

	// {
	// 	title: 'Options',
	// 	options: [
	// 		{ value: 'light', label: 'Analyze' },
	// 		{ value: 'light', label: 'Ignore' },
	// 		{ value: 'light', label: 'Export' },
	// 		{ value: 'light', label: 'Refresh' },
	// 		{ value: 'dark', label: 'Preview' },
	// 		{ value: 'system', label: 'Pin' },
	// 		{ value: 'system', label: 'Details' }
	// 	]
	// }
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger class="flex items-center rounded-md text-sm">
		<Sidebar.MenuItem>
			<Sidebar.MenuButton class="flex items-center justify-between rounded">
				<div class="flex items-center gap-2">
					<Box class="w-4 h-4" />
					{loc.BucketName}
				</div>
				<div class="flex items-center">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Ellipsis class="w-4 h-4" />
						</DropdownMenu.Trigger>

						<DropdownMenu.Content class="options-menu ">
							{#each buildSubMenuItems(loc) as subMenu}
								<DropdownMenuLabel>{subMenu.title}</DropdownMenuLabel>
								<DropdownMenu.Group>
									{#each subMenu.options as option}
										<DropdownMenu.Item
											onclick={() => {
												if (option.uiState) {
													option.uiState.update((s) => {
														s.Props = option.uiArgs;
														s.WhenDone = option.whenDone;
														return s;
													});
												}
												if (option.uiActive) {
													option.uiActive.set(true);
												}
												if (option.todoFunc) {
													option.todoFunc();
												}
											}}
											class="options-menu-item"
										>
											{option.label}
										</DropdownMenu.Item>
									{/each}
								</DropdownMenu.Group>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</ContextMenu.Trigger>
	<ContextMenu.Content class="options-menu">
		{#each buildSubMenuItems(loc) as subMenu}
			<ContextMenu.Group>
				<ContextMenu.GroupHeading>{subMenu.title}</ContextMenu.GroupHeading>
				{#each subMenu.options as option}
					<ContextMenu.Item
						onclick={() => {
							if (option.uiState) {
								option.uiState.update((s) => {
									s.Props = option.uiArgs;
									s.WhenDone = option.whenDone;
									return s;
								});
							}
							if (option.uiActive) {
								option.uiActive.set(true);
							}
							if (option.todoFunc) {
								option.todoFunc();
							}
						}}
						class="options-menu-item">{option.label}</ContextMenu.Item
					>
				{/each}
			</ContextMenu.Group>
			<ContextMenu.Separator />
		{/each}
	</ContextMenu.Content>
</ContextMenu.Root>