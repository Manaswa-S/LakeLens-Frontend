<script lang="ts">
	import Grid from 'svelte-grid';
	import { MoveDiagonal2, Tally2, RotateCcw } from '@lucide/svelte/icons';
	import { settings } from '$lib/stores/lens-global.ts';
	import { mainAreaHeight, mainAreaWidth } from '$lib/stores/internal.ts';

	import { resetWidgets, gridCols, gridItems, dataLoading } from '$lib/stores/mainarea.ts';
	import { get } from 'svelte/store';
	import Loader from '$lib/components/extras/Loader.svelte';

	// store the original cols and items, so that we can reset the grid on demand.
	let ogCols: any = $state(get(gridCols));
	let ogItems: any = $state(get(gridItems));

	// subscribe to the cols and items stores to update our ogCols and ogItems when they change.
	gridCols.subscribe(() => {
		ogCols = get(gridCols);
	});
	gridItems.subscribe(() => {
		ogItems = get(gridItems);
	});

	// subscribe to the reset boolean, reset grid when true.
	resetWidgets.subscribe(() => {
		if (get(resetWidgets)) {
			ogCols = get(gridCols);
			ogItems = get(gridItems);
			resetWidgets.set(false);
		}
	});
</script>

{#if $dataLoading}
	<Loader loading={$dataLoading} text={'Loading...'} />
{:else}
	{#key $gridItems}
		<div
			class="widgets-container"
			bind:clientHeight={$mainAreaHeight}
			bind:clientWidth={$mainAreaWidth}
		>
			<Grid
				bind:items={ogItems}
				fillSpace={$settings.CompactView}
				rowHeight={50}
				let:dataItem
				bind:cols={ogCols}
				fastStart={true}
				let:movePointerDown
				let:resizePointerDown
			>
				<!-- <div class="widget" transition:scale={{ delay: 50, duration: 500 }}> -->
				<div class="widget">
					<div class="widget-top-bar">
						{#if !dataItem.Config}
							<div class="drag-icon" onpointerdown={movePointerDown}>
								<Tally2 class="h-4 w-4 rotate-90" />
							</div>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								class="reload-icon"
								onclick={() => {
									dataItem.Reload++;
								}}
							>
								<RotateCcw class="h-4 w-4" />
							</div>
						{:else}
							{#if dataItem.Config.Draggable}
								<div class="drag-icon" onpointerdown={movePointerDown}>
									<Tally2 class="h-4 w-4 rotate-90" />
								</div>
							{/if}
							{#if dataItem.Config.Reloadable}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<div
									class="reload-icon"
									onclick={() => {
										dataItem.Reload++;
									}}
								>
									<RotateCcw class="h-4 w-4" />
								</div>
							{/if}
						{/if}
					</div>

					{#key dataItem.Reload}
						<div class="widget-data">
							{#if dataItem.Widget}
								{#if dataItem.Widget.Render}
									<dataItem.Widget.Render {...dataItem.Widget.Params} />
								{/if}
							{/if}
						</div>
					{/key}

					<div class="widget-bottom-bar">
						{#if !dataItem.Config}
							<div class="resize-icon" onpointerdown={resizePointerDown}>
								<MoveDiagonal2 class="w-4 h-4" />
							</div>
						{:else if dataItem.Config.Resizeable}
							<div class="resize-icon" onpointerdown={resizePointerDown}>
								<MoveDiagonal2 class="w-4 h-4" />
							</div>
						{/if}
					</div>
				</div>
			</Grid>
		</div>
	{/key}
{/if}

<style>
	.widgets-container {
		background-color: transparent;
		width: 100%;
	}

	.widget {
		height: 100%;
		width: 100%;
		overflow-y: hidden !important;

		display: flex;
		flex-direction: column;
		background: transparent;
		border-color: black;
		border-radius: 5px;
		border-width: 2px;
	}

	.widget-top-bar {
		position: sticky;
		top: 0;
		width: 100%;
		height: 1rem;

		padding: 3px 3px 3px 3px;

		background: transparent;
		display: flex;
		justify-content: space-between;
	}

	.widget-data {
		height: calc(100% - 2rem);
		width: 100%;
		margin-top: 0;

		overflow-y: auto !important;
		background: transparent;
		padding: 5px 5px 5px 5px;

		/* position: relative; */
	}

	.widget-bottom-bar {
		position: sticky;
		bottom: 0;
		width: 100%;
		height: 1rem;

		padding: 0px 0px 3px 3px;

		background: transparent;
		display: flex;
		justify-content: space-between;
	}

	.drag-icon {
		width: 100%;
		height: 100%;

		display: flex !important;
		justify-content: center;

		color: #161616;
		opacity: 0.5;
		transition: all 0.2s ease;
	}
	.drag-icon:hover {
		opacity: 1;
		cursor: move;
	}

	.reload-icon {
		height: 100%;
		width: 5%;

		display: flex !important;
		justify-content: right !important;

		color: #161616;
		opacity: 0.5;
		transition: all 0.2s ease;
	}
	.reload-icon:hover {
		opacity: 1;
		cursor: pointer;
	}

	.resize-icon {
		width: 100%;
		height: 100%;

		display: flex !important;
		justify-content: right !important;

		color: #161616;
		opacity: 0.5;
		transition: all 0.2s ease;
	}
	.resize-icon:hover {
		opacity: 1;
		cursor: nwse-resize;
	}
</style>
