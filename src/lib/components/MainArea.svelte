<script>
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';

	import { Skeleton } from '$lib/components/shadcn/ui/skeleton/index.js';

	const id = () => '_' + Math.random().toString(36).substr(2, 9);

	let items = [
		{
			6: gridHelp.item({
				x: 0,
				y: 0,
				w: 4,
				h: 2
			}),

			12: gridHelp.item({
				x: 0,
				y: 0,
				w: 8,
				h: 2
			}),

			18: gridHelp.item({
				x: 0,
				y: 0,
				w: 12,
				h: 2
			}),
			id: id()
		},
		{
			6: gridHelp.item({
				x: 4,
				y: 0,
				w: 2,
				h: 8
			}),

			12: gridHelp.item({
				x: 8,
				y: 0,
				w: 4,
				h: 8
			}),

			18: gridHelp.item({
				x: 12,
				y: 0,
				w: 6,
				h: 8
			}),
			id: id()
		},
		{
			6: gridHelp.item({
				x: 0,
				y: 2,
				w: 4,
				h: 6
			}),

			12: gridHelp.item({
				x: 0,
				y: 2,
				w: 8,
				h: 6
			}),

			18: gridHelp.item({
				x: 0,
				y: 2,
				w: 12,
				h: 6
			}),
			id: id()
		}
	];

	let originalItems = items;

	const cols = [
		[600, 6],
		[1200, 12],
		[1800, 18]
	];

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	import { settings } from '$lib/stores/lens-global.ts';

	function restoreOriginal(value) {
		if (value === true) items = originalItems;
	}
	$: restoreOriginal($settings.CompactView);

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	function fetchingData() {}
</script>

<Skeleton class="h-[20px] w-[100px] rounded-full" />

<div class="demo-container">
	<Grid bind:items fillSpace={$settings.CompactView} rowHeight={100} let:item let:dataItem {cols}>
		<div class="demo-widget">{dataItem.id}</div>
	</Grid>
</div>

<style>
	.demo-widget {
		background: #f1f1f1;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.demo-container {
		/* max-width: 800px; */
		width: 100%;
	}
</style>
