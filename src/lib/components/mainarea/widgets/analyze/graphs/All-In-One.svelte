<script lang="ts">
	import { currentTheme } from '$lib/stores/theme.ts';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { fromUnixToReadable, abbreviateNumber, abbreviateBytes } from '$lib/common/time.ts';

	import * as echarts from 'echarts/core';
	import {
		ToolboxComponent,
		type ToolboxComponentOption,
		TooltipComponent,
		type TooltipComponentOption,
		GridComponent,
		type GridComponentOption,
		LegendComponent,
		type LegendComponentOption
	} from 'echarts/components';
	import { BarChart, type BarSeriesOption, LineChart, type LineSeriesOption } from 'echarts/charts';
	import { UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';

	echarts.use([
		ToolboxComponent,
		TooltipComponent,
		GridComponent,
		LegendComponent,
		BarChart,
		LineChart,
		CanvasRenderer,
		UniversalTransition
	]);

	type EChartsOption = echarts.ComposeOption<
		| ToolboxComponentOption
		| TooltipComponentOption
		| GridComponentOption
		| LegendComponentOption
		| BarSeriesOption
		| LineSeriesOption
	>;

	let {
		timeStamps,
		totalRecs,
		totalFileSizes,
		totalDataFiles,
		totalDeleteFiles
	}: {
		timeStamps: any[];
		totalRecs: any[];
		totalFileSizes: any[];
		totalDataFiles: any[];
		totalDeleteFiles: any[];
	} = $props();

	var chartDom: HTMLDivElement;
	var myChart: echarts.ECharts;
	var option: EChartsOption;

	const auxColors = ['#3bab0c', '#F44336', '#607D8B', '#1E88E5'];
	const colors = ['#3cc702', '#f23527', '#4c3e61', '#0272d4'];

	function setOption() {
		option = {
			color: colors,

			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross'
				}
			},
			grid: {
				right: '13%',
				left: '5%',
				top: '14%',
				bottom: '8%'
			},
			toolbox: {
				feature: {
					dataView: { show: true, readOnly: false },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			legend: {
				data: ['Data Files', 'Delete Files', 'Total Files Size (in Bytes)', 'Total Records']
			},
			xAxis: [
				{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					axisLine: {
						lineStyle: {
							width: 1
						}
					},
					data: timeStamps,
					axisLabel: {
						// interval: 0,
						formatter: function (value) {
							return value.replace(', ', '\n');
						}
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					name: 'Files\nCount',
					position: 'right',
					alignTicks: true,
					axisLine: {
						show: true,
						lineStyle: {
							width: 2,
							color: auxColors[0]
						}
					},
					axisLabel: {
						formatter: '{value}'
					}
				},
				{
					type: 'value',
					name: 'Total\nFiles Size',
					position: 'right',
					alignTicks: true,
					offset: 60,
					axisLine: {
						show: true,
						lineStyle: {
							width: 2,
							color: colors[2]
						}
					},
					axisLabel: {
						formatter: function (value: any) {
							return abbreviateBytes(value);
						}
					}
				},
				{
					type: 'value',
					name: 'Total\nRecords',
					position: 'left',
					alignTicks: true,
					axisLine: {
						show: true,
						lineStyle: {
							width: 2,
							color: colors[3]
						}
					},
					axisLabel: {
						formatter: function (value: any) {
							return abbreviateNumber(value);
						}
					}
				}
			],
			series: [
				{
					name: 'Data Files',
					type: 'bar',
					stack: 'files',
					// barWidth: '50%',
					yAxisIndex: 0,
					color: colors[0],

					data: totalDataFiles
				},
				{
					name: 'Delete Files',
					type: 'bar',
					stack: 'files',
					// barWidth: '50%',
					yAxisIndex: 0,
					color: colors[1],

					data: totalDeleteFiles
				},
				{
					name: 'Total Files Size (in Bytes)',
					type: 'bar',
					yAxisIndex: 1,
					color: colors[2],
					data: totalFileSizes
				},
				{
					name: 'Total Records',
					type: 'line',
					smooth: true,
					yAxisIndex: 2,
					color: colors[3],
					lineStyle: {
						width: 3,
						type: 'solid'
					},
					data: totalRecs,
					symbol: 'circle',
					symbolSize: 10
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
		height: 100% !important;
		width: 100% !important;
		display: block;
		align-items: center;
		justify-content: center;

        overflow-x: hidden;
	}
</style>
