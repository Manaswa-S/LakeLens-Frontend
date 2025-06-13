<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';

	// Extract query parameters
	const queryParams = derived(page, ($page) => {
		const urlParams = $page.url.searchParams;
		return {
			code: urlParams.get('code') ?? '500',
			msg: urlParams.get('msg') ?? 'Something went wrong.'
		};
	});

	let countdown = 10;
	onMount(() => {
		const interval = setInterval(() => {
			if (countdown > 0) {
				countdown--;
			} else {
				clearInterval(interval);
				window.location.href = '/home';
			}
		}, 1000);
	});
</script>

<header>
	<div class="logo">
		<a href="/home"> LakeLens </a>
	</div>

	<nav>
		<a href="/features">Features</a>
		<a href="/docs">Docs</a>
		<a href="/github">GitHub</a>
		<a href="/home">Home</a>
	</nav>
</header>

<section class="hero">
	<h1>{$queryParams.msg}</h1>
	<p>Status Code: <strong>{$queryParams.code}</strong></p>
	<p>Redirecting to <a href="/home">Home</a> in <strong>{countdown}</strong> seconds...</p>
</section>

<style>
</style>
