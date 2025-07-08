<script lang="ts">
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Boxes from '@lucide/svelte/icons/boxes';

	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu/index.js';
	import DropdownMenuLabel from '$lib/components/shadcn/ui/dropdown-menu/dropdown-menu-label.svelte';
	import * as Collapsible from '$lib/components/shadcn/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/shadcn/ui/sidebar/index.js';
	import * as ContextMenu from '$lib/components/shadcn/ui/context-menu/index.js';

	import type { Writable } from 'svelte/store';

	import { getProjects } from '$lib/stores/lens-global.ts';

	import { type ComponentState } from '$lib/stores/ui.ts';
	import {
		type AddLocsProps,
		type ActionDialogProps,
		type LakeDetailsDialogProps
	} from '$lib/stores/ui.ts';
	import {
		AddLocsDialogActive,
		ActionDialogActive,
		LakeDetailsDialogActive
	} from '$lib/stores/ui.ts';
	import { AddLocsDialogState, ActionDialogState, LakeDetailsDialogState } from '$lib/stores/ui.ts';
	import { delLake } from '$lib/common/calls';
	import type { LakeDetails } from '$lib/types/global.ts';

	let { lake }: { lake: LakeDetails } = $props();

	type menuOpt = {
		value: string;
		label: string;
		todoFunc: any;
		uiActive: Writable<boolean>;
		uiState: Writable<ComponentState<any>>;
		uiArgs: AddLocsProps | ActionDialogProps | LakeDetailsDialogProps;
		whenDone: any;
	};

	type menuOptions = {
		title: string;
		options: menuOpt[];
	};

	function buildMenuItems(lake: LakeDetails) {
		const a: menuOptions[] = [
			{
				title: 'Options',
				options: [
					{
						label: 'Add Location',
						value: '',
						todoFunc: () => {},
						uiActive: AddLocsDialogActive,
						uiState: AddLocsDialogState,
						uiArgs: {
							LakeID: lake.LakeID,
							Locations: null,
							WhenLocsAdded: null
						},
						whenDone: () => {
							getProjects();
						}
					},
					{
						label: 'Delete Lake',
						value: '',
						todoFunc: () => {},
						uiActive: ActionDialogActive,
						uiState: ActionDialogState,
						uiArgs: {
							Title: `Delete lake "${lake.Name}"?`,
							Description: `This action is irreversible. The lake "${lake.Name}", all associated locations and credentials will be permanently removed from your account and our servers.`,
							OnAction: () => {
								delLake(lake.LakeID);
							},
							ActionBtnTxt: 'Delete',
							OnCancel: null
						},
						whenDone: null
					},
					{
						label: 'View Details',
						value: '',
						todoFunc: () => {},
						uiActive: LakeDetailsDialogActive,
						uiState: LakeDetailsDialogState,
						uiArgs: {
							Details: lake
						},
						whenDone: null
					}
				]
			}
		];

		return a;

		// 			{ value: 'light', label: 'Refresh Lake' },
		// 			{ value: 'light', label: 'Open Dashboard' },
		// 			{ value: 'light', label: 'Run Query' },
		// 			{ value: 'dark', label: 'Edit Config' },
		// 			{ value: 'dark', label: 'Export Data' },
		// 			{ value: 'dark', label: 'Re-authenticate' }
	}

	let chevdown = $state(true);
</script>

<ContextMenu.Root >
	<ContextMenu.Trigger class="flex">
		<Collapsible.Trigger
			onclick={() => {
				chevdown = !chevdown;
			}}
		>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="flex items-center justify-between rounded">
					<ChevronRight class="w-4 h-4 transition-transform {chevdown ? 'rotate-90' : ''}" />
					<Boxes class="w-4 h-4" />
					{lake.Name}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore event_directive_deprecated -->
					<div class="flex items-center" on:click|stopPropagation on:mousedown|stopPropagation>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Ellipsis class="w-4 h-4" />
							</DropdownMenu.Trigger>

							<DropdownMenu.Content class="options-menu ">
								{#each buildMenuItems(lake) as menu}
									<DropdownMenuLabel>{menu.title}</DropdownMenuLabel>
									<DropdownMenu.Group>
										{#each menu.options as option}
											<DropdownMenu.Item
												onclick={() => {
													option.uiState.update((s) => {
														s.Props = option.uiArgs;
														s.WhenDone = option.whenDone;
														return s;
													});
													option.uiActive.set(true);
													option.todoFunc();
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
		</Collapsible.Trigger>
	</ContextMenu.Trigger>
	<ContextMenu.Content class="options-menu">
		{#each buildMenuItems(lake) as menu}
			<ContextMenu.Group>
				<ContextMenu.GroupHeading>Options</ContextMenu.GroupHeading>
				{#each menu.options as option}
					<ContextMenu.Item
						onclick={() => {
							option.uiState.update((s) => {
								s.Props = option.uiArgs;
								s.WhenDone = option.whenDone;
								return s;
							});
							option.uiActive.set(true);
							option.todoFunc();
						}}
						class="options-menu-item"
						>{option.label}
					</ContextMenu.Item>
				{/each}
			</ContextMenu.Group>
			<ContextMenu.Separator />
		{/each}
	</ContextMenu.Content>
</ContextMenu.Root>
