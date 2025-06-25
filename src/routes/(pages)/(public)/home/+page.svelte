<script lang="ts">
	import { PUBLIC_GITHUB_LINK } from '$env/static/public';
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu';
	import DropdownMenuItem from '$lib/components/shadcn/ui/dropdown-menu/dropdown-menu-item.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	let open = $state(false);

	onMount(() => {
		let abc = document.getElementById('support-btn');
	});
</script>

<div class="top-bar">
	<div class="top-bar-left">
		<div class="top-bar-logo">
			<a href="/home">
				<img src="/favicon.png" alt="PP" />
			</a>
		</div>
		<a class="top-bar-logo" href="/home">LakeLens</a>
	</div>

	<div class="top-bar-nav">
		<div class="top-bar-nav-elem">
			<a href="/feedback">Feedback</a>
		</div>
		<div class="top-bar-nav-elem">
			<a href="/features">Terms</a>
		</div>
		<!-- <div class="top-bar-nav-elem">
			<a href="/features">Privacy</a>
		</div> -->

		<!-- <div class="top-bar-nav-elem">
			<a href="/features">Features</a>
		</div> -->
		<div class="top-bar-nav-elem">
			<a href="/docs">Docs</a>
		</div>
		<!-- <div class="top-bar-nav-elem">
			<a href={PUBLIC_GITHUB_LINK}>Github</a>
		</div> -->
		<div class="top-bar-nav-elem">
			{#if data.result}
				<a href="/lens/dashboard">Dashboard</a>
			{:else}
				<a href="/account">Account</a>
			{/if}
		</div>
	</div>
</div>

<section class="home-main-area">
	<h1>Visualize & Explore Your Data Lake Tables</h1>
	<p>
		Inspect Iceberg, Delta, Hudi & Parquet tables with full metadata, snapshots, schema evolution &
		more.
	</p>
</section>

<section id="features" class="home-features">
	<!-- <div class="feature-card">
		<h3>Multi-Format Support</h3>
		<p>
			View and inspect tables stored in Apache Iceberg, Delta Lake, Apache Hudi, and raw Parquet.
		</p>
	</div> -->
</section>

<style>
</style>
