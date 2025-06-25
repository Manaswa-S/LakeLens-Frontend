<script lang="ts">
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu/index.js';
	import { Grid2x2, Menu } from '@lucide/svelte/icons';
	import { contentActive } from '$lib/stores/mainarea.ts';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<div class="relative cursor-pointer" title="Content Menu">
			<Grid2x2 class="h-4" />
			<div class="overlay-icon">
				<Menu class="h-[10px] w-[12px] stroke-3" />
			</div>
		</div>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content side="right" class="content-menu" align="start">
		<DropdownMenu.Label>View Content</DropdownMenu.Label>
		<DropdownMenu.RadioGroup bind:value={$contentActive}>
			<DropdownMenu.RadioItem value="overview" class="content-menu-radio-item"
				>Overview</DropdownMenu.RadioItem
			>
			<DropdownMenu.RadioItem value="schema" class="content-menu-radio-item"
				>Schema</DropdownMenu.RadioItem
			>
			<DropdownMenu.RadioItem value="snapshots" class="content-menu-radio-item"
				>Snapshots</DropdownMenu.RadioItem
			>
			<DropdownMenu.RadioItem value="partitions" class="content-menu-radio-item"
				>Partitions</DropdownMenu.RadioItem
			>
			<DropdownMenu.RadioItem value="files" class="content-menu-radio-item"
				>Files</DropdownMenu.RadioItem
			>
			<DropdownMenu.RadioItem value="data" class="content-menu-radio-item"
				>Data</DropdownMenu.RadioItem
			>
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<style>
	.overlay-icon {
		position: absolute;
		bottom: 0;
		right: 0;

		backdrop-filter: blur(1px);
		background-color: var(--bg);

		/* background: transparent; */
		padding: 1px 1px;
		border-radius: 50%;
	}
</style>
