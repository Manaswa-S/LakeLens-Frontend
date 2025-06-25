<script lang="ts">
	import * as echarts from 'echarts/core';
	import {
		TitleComponent,
		type TitleComponentOption,
		ToolboxComponent,
		type ToolboxComponentOption,
		TooltipComponent,
		type TooltipComponentOption,
		GridComponent,
		type GridComponentOption,
		DataZoomComponent,
		type DataZoomComponentOption
	} from 'echarts/components';
	import { LineChart, type LineSeriesOption } from 'echarts/charts';
	import { UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	import { currentTheme } from '$lib/stores/theme.ts';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	echarts.use([
		TitleComponent,
		ToolboxComponent,
		TooltipComponent,
		GridComponent,
		DataZoomComponent,
		LineChart,
		CanvasRenderer,
		UniversalTransition
	]);

	type EChartsOption = echarts.ComposeOption<
		| TitleComponentOption
		| ToolboxComponentOption
		| TooltipComponentOption
		| GridComponentOption
		| DataZoomComponentOption
		| LineSeriesOption
	>;

	var chartDom: HTMLDivElement;
	var myChart: echarts.ECharts;
	var option: EChartsOption;

	let base = +new Date(1968, 9, 3);
	let oneDay = 24 * 3600 * 1000;
	let date: any = [];

	let data = [Math.random() * 300];

	for (let i = 1; i < 20000; i++) {
		var now = new Date((base += oneDay));
		date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
		data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
	}

	function setOption() {
		option = {
			tooltip: {
				trigger: 'axis',
				position: function (pt) {
					return [pt[0], '10%'];
				}
			},
			title: {
				left: 'center',
				text: 'Large Area Chart'
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: date
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%']
			},
			dataZoom: [
				{
					type: 'inside',
					start: 0,
					end: 10
				},
				{
					start: 0,
					end: 10
				}
			],
			series: [
				{
					name: 'Fake Data',
					type: 'line',
					symbol: 'none',
					sampling: 'lttb',
					itemStyle: {
						color: 'rgb(255, 70, 131)'
					},
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgb(255, 158, 68)'
							},
							{
								offset: 1,
								color: 'rgb(255, 70, 131)'
							}
						])
					},
					data: data
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

<div bind:this={chartDom} class="pie-chart"></div>

<style>
	.pie-chart {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
