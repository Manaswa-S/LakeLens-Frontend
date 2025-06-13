<script>
	import { onMount } from 'svelte';
	import { isLoading } from '$lib/stores/loader.js';
	export let data;

	import Settings from '$lib/components/Settings.svelte';
	import ProfileMenu from '$lib/components/ProfileMenu.svelte';
	import LocInfoCard from '$lib/components/dashboard/LocInfoCard.svelte';
	import LakeInfoCard from '$lib/components/dashboard/LakeInfoCard.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import MainArea from '$lib/components/MainArea.svelte';
	import NewLake from '$lib/components/NewProject.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import FolderSearch2 from '@lucide/svelte/icons/folder-search-2';

	onMount(() => {
		isLoading.set(false);
	});

	let faviconErrored = false;

	import * as Sidebar from '$lib/components/shadcn/ui/sidebar/index.js';
</script>

<div class="header">
	<div class="left-header">
		<div class="logo nav">
			{#if !faviconErrored}
				<a href="/home">
					<img
						src="/favicon.png"
						on:error={() => {
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
		<div class="elem">
			<NewLake />
		</div>

		<div class="elem">
			<Settings />
		</div>

		<div class="elem">
			<ProfileMenu {data}></ProfileMenu>
		</div>
	</nav>
</div>

<div class="content">
	<div class="sidebar sidebar-right-border">
		<Sidebar.Provider>
			<SideBar data={data.accProjects.LocsForLake} />
		</Sidebar.Provider>
	</div>

	<div class="main-area">
		<MainArea />
	</div>
</div>
