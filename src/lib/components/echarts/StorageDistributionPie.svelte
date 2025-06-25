<script lang="ts">
	import * as echarts from 'echarts/core';
	import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
	import { PieChart } from 'echarts/charts';
	import { LabelLayout } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	import { onMount } from 'svelte';

	import { currentTheme } from '$lib/stores/theme.ts';
	import { get } from 'svelte/store';

	echarts.use([
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		PieChart,
		CanvasRenderer,
		LabelLayout
	]);

	export type SeriesData = {
		value: number;
		name: string;
	}[];

	let { data, lakeName }: { data: SeriesData; lakeName: string } = $props();

	let seriesData = data;

	$effect(() => {
		seriesData = data;
		initChart(get(currentTheme));
	});

	var chartDom: HTMLDivElement;
	var myChart: echarts.ECharts;
	var option: any;

	function initChart(theme: string) {
		if (myChart) {
			myChart.dispose();
		}
		setOption();
		myChart = echarts.init(chartDom, theme);
		option && myChart.setOption(option);
	}

	function setOption() {
		option = {
			title: {
				text: `File Distribution:  ${lakeName}`,
				textStyle: {
					fontSize: 15,
					fontWeight: 'bold',
					fontFamily: 'sans-serif',
					color: '#333'
				},
				left: 'center'
			},
			tooltip: {
				show: true,
				trigger: 'item',
				textStyle: {
					fontSize: 13
				}
			},
			series: [
				{
					name: 'Extension',
					type: 'pie',
					radius: '50%',
					data: [...seriesData],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					// label: {
					// 	show: true,
					// 	color: '#000',
					// 	fontFamily: 'Inter',
					// 	fontWeight: '500',
					// 	fontSize: 12
					// },
					label: {
						formatter: '{b|{b}}\n{hr|}\n  {c}  {per|{d}%} ',
						backgroundColor: '#F6F8FC',
						borderColor: '#8C8D8E',
						borderWidth: 1,
						borderRadius: 4,
						rich: {
							hr: {
								borderColor: '#8C8D8E',
								width: '100%',
								borderWidth: 1,
								height: 0
							},
							b: {
								color: '#6E7079',
								lineHeight: 20,
								align: 'center',
								fontFamily: 'Inter',
								fontWeight: '600',
								fontSize: 13
							},
							per: {
								color: '#6E7079',
								padding: [3, 4],
								borderRadius: 4
							}
						}
					},
					top: 0
				}
			]
		};
	}

	function setOption2() {
		option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			series: [
				{
					name: 'Access From',
					type: 'pie',
					selectedMode: 'single',
					radius: [0, '30%'],
					label: {
						position: 'inner',
						fontSize: 14
					},
					labelLine: {
						show: false
					},
					data: [...seriesData]
				},
				{
					name: 'Access From',
					type: 'pie',
					radius: ['45%', '60%'],
					labelLine: {
						length: 30
					},
					label: {
						formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
						backgroundColor: '#F6F8FC',
						borderColor: '#8C8D8E',
						borderWidth: 1,
						borderRadius: 4,
						rich: {
							a: {
								color: '#6E7079',
								lineHeight: 22,
								align: 'center'
							},
							hr: {
								borderColor: '#8C8D8E',
								width: '100%',
								borderWidth: 1,
								height: 0
							},
							b: {
								color: '#4C5058',
								fontSize: 14,
								fontWeight: 'bold',
								lineHeight: 33
							},
							per: {
								color: '#fff',
								backgroundColor: '#4C5058',
								padding: [3, 4],
								borderRadius: 4
							}
						}
					},
					data: [
						{ value: 1048, name: 'Baidu' },
						{ value: 335, name: 'Direct' },
						{ value: 310, name: 'Email' },
						{ value: 251, name: 'Google' },
						{ value: 234, name: 'Union Ads' },
						{ value: 147, name: 'Bing' },
						{ value: 135, name: 'Video Ads' },
						{ value: 102, name: 'Others' }
					]
				}
			]
		};
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
