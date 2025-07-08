<script lang="ts">
	import * as echarts from 'echarts/core';
	import { GridComponent, type GridComponentOption } from 'echarts/components';
	import { LineChart, type LineSeriesOption } from 'echarts/charts';
	import { UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	import { currentTheme } from '$lib/stores/theme.ts';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

	let { timeStamps, totalRecs }: { timeStamps: any[]; totalRecs: any[] } = $props();

	type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>;

	var chartDom: HTMLDivElement;
	var myChart: echarts.ECharts;
	var option: EChartsOption;

	function setOption() {
		option = {
			title: {
				text: 'Total Records per Snapshot',
				textStyle: {
					fontSize: 12,
					fontWeight: 'bold',
					fontFamily: 'sans-serif',
					color: '#333'
				},
				left: 'center'
			},
			xAxis: {
				type: 'category',
				data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				axisLabel: {
					fontSize: 11,
					fontWeight: 'bold',
					rotate: 0,
					margin: 10
				}
			},
			yAxis: {
				type: 'value'
			},
			grid: {
				left: '7%',
				top: '10%',
				right: '1%',
				bottom: '13%'
			},
			series: [
				{
					data: totalRecs,
					type: 'line',
					smooth: true
				},
				{
					data: totalRecs,
					type: 'line',
					smooth: true
				}
			]
		};
	}

	function initChart(theme: string) {
		if (myChart) {
			myChart.dispose();
		}
		setOption();
		myChart = echarts.init(chartDom, theme);
		option && myChart.setOption(option);
	}

	onMount(() => {
		initChart(get(currentTheme));

		currentTheme.subscribe(() => {
			initChart(get(currentTheme));
		});

		let obs = new ResizeObserver(() => {
			if (myChart) myChart.resize();
		});
		obs.observe(chartDom);

		return () => {
			obs.disconnect();
			myChart?.dispose();
		};
	});
</script>

<div bind:this={chartDom} class="line-chart"></div>

<style>
	.line-chart {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
