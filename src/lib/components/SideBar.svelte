<script lang="ts">
	import * as Collapsible from '$lib/components/shadcn/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/shadcn/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Box from '@lucide/svelte/icons/box';
	import Boxes from '@lucide/svelte/icons/boxes';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';

	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu/index.js';
	import DropdownMenuLabel from '$lib/components/shadcn/ui/dropdown-menu/dropdown-menu-label.svelte';

	type LakeDetails = {
		CreatedAt: string;
		LakeID: Number;
		Name: string;
		Ptype: string;
		Region: string;
	};
	type LocDetails = { BucketName: string; CreatedAt: string; LakeID: Number; LocID: Number };
	type Locations = { Lake: LakeDetails; Locs: LocDetails[] };

	let {
		ref = $bindable(null),
		data,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & { data: Locations[] } = $props();

	type Options = { value: string; label: string };
	type OptGrp = { title: string; options: Options[] };

	const groupedThemes: OptGrp[] = [
		{
			title: 'Interface Themes',
			options: [
				{ value: 'light', label: 'Light' },
				{ value: 'dark', label: 'Dark' },
				{ value: 'system', label: 'System Default' }
			]
		},
		{
			title: 'Editor Themes',
			options: [
				{ value: 'monokai', label: 'Monokai' },
				{ value: 'dracula', label: 'Dracula' },
				{ value: 'solarized', label: 'Solarized Light' }
			]
		}
	];

	import * as ContextMenu from '$lib/components/shadcn/ui/context-menu/index.js';

	let showBookmarks = $state(false);
	let showFullURLs = $state(true);

	let value = $state('pedro');
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Content class="sidebar">
		<Sidebar.Group>
			{#each data as item, index (item.Lake.LakeID)}
				<Sidebar.Group>
					<Sidebar.GroupLabel class="text-sm tracking-wide uppercase">Projects</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							<Collapsible.Root open={index === 0}>
								<Collapsible.Trigger>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton class="flex items-center justify-between">
											<div class="flex items-center gap-2">
												<ChevronRight class="w-4 h-4" />
												<Boxes class="w-4 h-4" />
												{item.Lake.Name}
											</div>
											<div class="">
												{@render optionsMenu(groupedThemes)}
											</div>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								</Collapsible.Trigger>

								<Collapsible.Content>
									<Sidebar.MenuSub>
										{#each item.Locs as loc}
											<Sidebar.MenuItem>
												<Sidebar.MenuButton class="flex items-center justify-between">
													<div class="flex items-center gap-2">
														<Box class="w-4 h-4" />
														{loc.BucketName}
													</div>
													<div class="">
														{@render optionsMenu(groupedThemes)}
													</div>
												</Sidebar.MenuButton>
											</Sidebar.MenuItem>
										{/each}
									</Sidebar.MenuSub>
								</Collapsible.Content>
							</Collapsible.Root>
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			{/each}
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>

<Sidebar.Inset class="sidebar-trigger">
	<header class="flex h-16 shrink-0 items-center gap-2 px-2">
		<Sidebar.Trigger class="" />
	</header>
</Sidebar.Inset>

{#snippet optionsMenu(options: OptGrp[])}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild>
			<Ellipsis class="w-4 h-4" />
		</DropdownMenu.Trigger>

		<DropdownMenu.Content class="max-w-[450px] dropdown ">
			{#each options as grp}
				<DropdownMenuLabel>{grp.title}</DropdownMenuLabel>
				<DropdownMenu.Group>
					{#each grp.options as option}
						<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
							<span>{option.label} : </span>
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Group>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

{#snippet optionsMenuRC()}
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content class="w-52">
			<ContextMenu.Item inset>
				Back
				<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
			</ContextMenu.Item>
			<ContextMenu.Item inset disabled>
				Forward
				<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
			</ContextMenu.Item>
			<ContextMenu.Item inset>
				Reload
				<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
			</ContextMenu.Item>
			<ContextMenu.Sub>
				<ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
				<ContextMenu.SubContent class="w-48">
					<ContextMenu.Item>
						Save Page As...
						<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
					</ContextMenu.Item>
					<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
					<ContextMenu.Item>Name Window...</ContextMenu.Item>
					<ContextMenu.Separator />
					<ContextMenu.Item>Developer Tools</ContextMenu.Item>
				</ContextMenu.SubContent>
			</ContextMenu.Sub>
			<ContextMenu.Separator />
			<ContextMenu.CheckboxItem bind:checked={showBookmarks}>
				Show Bookmarks
			</ContextMenu.CheckboxItem>
			<ContextMenu.CheckboxItem bind:checked={showFullURLs}>
				Show Full URLs
			</ContextMenu.CheckboxItem>
			<ContextMenu.Separator />
			<ContextMenu.RadioGroup bind:value>
				<ContextMenu.Group>
					<ContextMenu.GroupHeading inset>People</ContextMenu.GroupHeading>
					<ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
					<ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
				</ContextMenu.Group>
			</ContextMenu.RadioGroup>
		</ContextMenu.Content>
	</ContextMenu.Root>
{/snippet}
