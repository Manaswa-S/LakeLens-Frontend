<script lang="ts">
	import * as echarts from 'echarts/core';
	import {
		DatasetComponent,
		type DatasetComponentOption,
		TitleComponent,
		type TitleComponentOption,
		TooltipComponent,
		type TooltipComponentOption,
		GridComponent,
		type GridComponentOption,
		TransformComponent
	} from 'echarts/components';
	import { LineChart, type LineSeriesOption } from 'echarts/charts';
	import { LabelLayout, UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	import { currentTheme } from '$lib/stores/theme.ts';

	echarts.use([
		DatasetComponent,
		TitleComponent,
		TooltipComponent,
		GridComponent,
		TransformComponent,
		LineChart,
		CanvasRenderer,
		LabelLayout,
		UniversalTransition
	]);

	type EChartsOption = echarts.ComposeOption<
		| DatasetComponentOption
		| TitleComponentOption
		| TooltipComponentOption
		| GridComponentOption
		| LineSeriesOption
	>;

	var chartDom: HTMLDivElement;
	var myChart: echarts.ECharts;
	var option: EChartsOption;

	import { ourData } from './demo-data.ts';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	function run() {
		const buckets = [
			'TotalFiles',
			'TotalSize',
			'NewFilesCnt',
			'DelFilesCnt',
			'ModFilesCnt',
			'AvgFileSize'
		];
		const datasetWithFilters: any[] = [];
		const seriesList: any[] = [];
		echarts.util.each(buckets, function (bucket) {
			var datasetId = 'dataset_' + bucket;
			datasetWithFilters.push({
				id: datasetId,
				fromDatasetId: 'dataset_raw',
				transform: {
					type: 'filter',
					config: {
						and: [
							{ dimension: 'TimeStamp', gte: 100 },
							{ dimension: 'Metric', '=': bucket }
						]
					}
				}
			});
			seriesList.push({
				type: 'line',
				datasetId: datasetId,
				showSymbol: false,
				name: bucket,
				endLabel: {
					show: true,
					formatter: function (params: any) {
						return params.value[1];
					},
					fontSize: 12,
					color: '#000',
					fontFamily: 'Inter',
					fontWeight: '500'
				},
				labelLayout: {
					moveOverlap: 'shiftY'
				},
				emphasis: {
					focus: 'series'
				},
				encode: {
					x: 'TimeStamp',
					y: 'Size',
					label: ['Size', 'TimeStamp'],
					itemName: 'TimeStamp',
					tooltip: ['Size']
				}
			});
		});

		option = {
			animationDuration: 7000,
			dataset: [
				{
					id: 'dataset_raw',
					source: ourData
				},
				...datasetWithFilters
			],
			title: {
				text: 'Bucket File-Level Lineage',
				textStyle: {
					fontSize: 15,
					fontWeight: 'bold',
					fontFamily: 'sans-serif',
					color: '#333'
				},
				left: 'center'
			},
			tooltip: {
				order: 'valueDesc',
				trigger: 'axis',
				textStyle: {
					fontSize: 13
				}
			},
			xAxis: {
				type: 'category',
				nameLocation: 'middle',
				name: 'Date'
			},
			yAxis: {
				name: 'Size'
			},
			grid: {
				left: 60,
				right: 70,
				top: 70,
				bottom: 40
			},
			series: seriesList
		};
		myChart.setOption(option);
	}

	function initChart(theme: string) {
		if (myChart) {
			myChart.dispose();
		}
		myChart = echarts.init(chartDom, theme);
		option && myChart.setOption(option);
		run();
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
