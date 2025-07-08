<script lang="ts">
	import * as Sidebar from '$lib/components/shadcn/ui/sidebar/index.js';
	import Settings from '$lib/components/Settings.svelte';
	import ProfileMenu from '$lib/components/ProfileMenu.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import MainArea from '$lib/components/mainarea/MainArea.svelte';
	import NewLake from '$lib/components/newLake/NewLake.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import FolderSearch2 from '@lucide/svelte/icons/folder-search-2';

	import { profileData, projectsList, accBilling, getProjects } from '$lib/stores/lens-global.ts';
	import { sidebarOpen, sidebarWidth } from '$lib/stores/internal.ts';

	import { type PageProps } from './$types';

	let { data }: PageProps = $props();

	profileData.set(data.accDetails);
	projectsList.set(data.accProjects.LocsForLake);
	accBilling.set(data.accBilling);

	//

	let faviconErrored = $state(false);
	let renderAddNew = $state(false);

	async function refreshSidebar(_value: any) {
		renderAddNew = true;
		await getProjects();
	}

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	import {
		AddLocsDialogActive,
		ActionDialogActive,
		LakeDetailsDialogActive
	} from '$lib/stores/ui.ts';
	import { AddLocsDialogState, ActionDialogState, LakeDetailsDialogState } from '$lib/stores/ui.ts';

	import Addloc from '$lib/components/newLake/AddLocs.svelte';
	import ActionDialog from '$lib/components/extras/ActionDialog.svelte';
	import LakeDetails from '$lib/components/extras/LakeDetails.svelte';

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	import { MainAreaGridActive } from '$lib/stores/ui.ts';
	import { gridCols, gridItems } from '$lib/stores/mainarea.ts';
	import {
		initCols,
		initItems,
		overviewCols,
		overviewItems,
		schemaCols,
		schemaItems
	} from '$lib/components/mainarea/warehouse.ts';

	gridCols.set(initCols);
	gridItems.set(initItems);
</script>

<div class="header">
	<div class="left-header">
		<div class="logo nav">
			{#if !faviconErrored}
				<a href="/home">
					<img
						src="/favicon.png"
						onerror={() => {
							faviconErrored = true;
						}}
						alt="PP"
					/>
				</a>
			{:else}
				<a href="/home">
					<FolderSearch2 />
				</a>
			{/if}
		</div>

		<div class="nav">
			<Menu />
		</div>

		<div class="nav">
			<Searchbar />
		</div>
	</div>

	<nav class="nav">
		{#key renderAddNew}
			<div class="elem">
				<NewLake whenDone={refreshSidebar} />
			</div>
		{/key}

		<div class="elem">
			<Settings />
		</div>

		<div class="elem">
			<ProfileMenu />
		</div>
	</nav>
</div>

<div class="content">
	<div class="sidebar sidebar-right-border" bind:clientWidth={$sidebarWidth}>
		<Sidebar.Provider bind:open={$sidebarOpen}>
			<SideBar />
		</Sidebar.Provider>
	</div>

	{#if $MainAreaGridActive}
		<div class="main-area">
			<MainArea />
		</div>
	{/if}
</div>

{#if $AddLocsDialogActive}
	<Addloc active={AddLocsDialogActive} compState={$AddLocsDialogState} />
{/if}

{#if $ActionDialogActive}
	<ActionDialog active={ActionDialogActive} compState={$ActionDialogState} />
{/if}

{#if $LakeDetailsDialogActive}
	<LakeDetails active={LakeDetailsDialogActive} compState={$LakeDetailsDialogState} />
{/if}
