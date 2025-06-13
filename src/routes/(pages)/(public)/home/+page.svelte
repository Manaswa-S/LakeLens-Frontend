<script>
	import { PUBLIC_GITHUB_LINK } from '$env/static/public';

	export let data;
</script>

<header>
	<div class="logo">
		<a href="/home"> LakeLens </a>
	</div>

	<nav>
		<a href="/features">Features</a>
		<a href="/docs">Docs</a>
		<a href={PUBLIC_GITHUB_LINK}>GitHub</a>

		{#if data.result}
			<a href="/lens/dashboard">Dashboard</a>
		{:else}
			<a href="/account">Account</a>
		{/if}
	</nav>
</header>

<section class="hero">
	<h1>Visualize & Explore Your Data Lake Tables</h1>
	<p>
		Inspect Iceberg, Delta, Hudi & Parquet tables with full metadata, snapshots, schema evolution &
		more.
	</p>
</section>

<section id="features" class="features">
	<!-- <div class="feature-card">
		<h3>Multi-Format Support</h3>
		<p>
			View and inspect tables stored in Apache Iceberg, Delta Lake, Apache Hudi, and raw Parquet.
		</p>
	</div> -->
</section>

<style>
</style>
