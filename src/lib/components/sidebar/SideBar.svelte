<script lang="ts">
	import * as Collapsible from '$lib/components/shadcn/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/shadcn/ui/sidebar/index.js';
	import MenuItem from './MenuItem.svelte';
	import SubMenuItem from './SubMenuItem.svelte';

	import { RotateCcw, Grid2x2, House } from '@lucide/svelte/icons';

	import { resetWidgets } from '$lib/stores/mainarea.ts';
	import { sidebarOpen } from '$lib/stores/internal.ts';
	import type { ComponentProps } from 'svelte';
	import { projectsList, refreshSidebar } from '$lib/stores/lens-global.ts';

	import ContentMenu from './ContentMenu.svelte';
	import { analyzeActive, goHome } from '$lib/stores/mainarea.ts';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	let refreshClick = $state(false);
	let refreshDebounce = $state(false);
	let refreshDebounceCnt = $state(0);
	const refreshDebounceTime = 15;
	function refreshHelper() {
		if (!refreshDebounce) {
			refreshSidebar();
			refreshDebounce = true;
			refreshDebounceCnt = refreshDebounceTime;
			refreshClick = true;
			setTimeout(() => {
				refreshClick = false;
			}, 1800);

			const debInt = setInterval(() => {
				refreshDebounceCnt--;
			}, 1000);

			setTimeout(() => {
				clearInterval(debInt);
				refreshDebounce = false;
			}, refreshDebounceTime * 1000);
		}
	}
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Content class="sidebar">
		<Sidebar.GroupLabel class="pt-8 pl-6 text-sm tracking-wide uppercase"
			>Projects</Sidebar.GroupLabel
		>
		{#each $projectsList as project, index (project.Lake.LakeID)}
			<Sidebar.Group>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						<Collapsible.Root open={index === 0}>
							<MenuItem lake={project.Lake} />
							{#if project.Locs != null && project.Locs.length > 0}
								<Collapsible.Content>
									<Sidebar.MenuSub>
										{#each project.Locs as loc}
											<SubMenuItem {loc} />
										{/each}
									</Sidebar.MenuSub>
								</Collapsible.Content>
							{:else}
								<Collapsible.Content>
									<Sidebar.MenuSub>No locations added.</Sidebar.MenuSub>
								</Collapsible.Content>
							{/if}
						</Collapsible.Root>
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
</Sidebar.Root>

<Sidebar.Inset class="sidebar-trigger">
	<header class="sidebar-trigger-heading">
		<Sidebar.Trigger title={$sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'} />

		<div
			class:rotate-once={refreshClick}
			title={refreshDebounce ? `Wait for ${refreshDebounceCnt} seconds.` : `Refresh Sidebar`}
		>
			<RotateCcw
				onclick={() => {
					refreshHelper();
				}}
				class="h-4 w-4 {refreshDebounce ? '' : 'cursor-pointer'}"
			/>
		</div>

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative cursor-pointer"
			onclick={() => {
				resetWidgets.set(true);
			}}
			title="Reset Content Widgets"
		>
			<Grid2x2 class="h-4" />
			<div class="overlay-icon">
				<RotateCcw class="h-[10px] w-[10px] stroke-4" />
			</div>
		</div>

		{#if $analyzeActive}
			<ContentMenu />
		{/if}

		{#if $analyzeActive}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative cursor-pointer"
				onclick={() => {
					goHome();
				}}
				title="Home"
			>
				<House class="h-4 w-4" title="Home" />
			</div>
		{/if}
	</header>
</Sidebar.Inset>

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

	.sidebar-trigger-heading {
		padding: 0 0.5rem;
		margin-top: 1.2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.rotate-once {
		animation: rotateOnce 0.6s linear 3;
	}

	@keyframes rotateOnce {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(-360deg);
		}
	}
</style>
