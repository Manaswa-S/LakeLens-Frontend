<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let countdown = 3;
	let msg = 'Redirecting...';
	let redirectURL = '/home';

	// '/redirect?msg=Welcome+Back!&countdown=3&redirect=%2Flens%2Fdashboard'

	const unsubscribe = page.subscribe((p) => {
		const params = p.url.searchParams;

		// Parse countdown
		const cdParam = parseInt(params.get('countdown'));
		if (!isNaN(cdParam)) {
			countdown = cdParam;
		}

		// Get message
		const rawMsg = params.get('msg');
		if (rawMsg) {
			msg = decodeURIComponent(rawMsg);
		}

		// Get redirect URL
		const rawRedirect = params.get('redirect');
		if (rawRedirect) {
			redirectURL = decodeURIComponent(rawRedirect);
		}
	});

	onMount(() => {
		const timer = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				clearInterval(timer);
				goto(redirectURL);
			}
		}, 1000);
	});
</script>

<section class="hero">
	<h1>{msg}</h1>
	<p>Redirecting in {countdown} seconds...</p>
</section>

<style>
	@import '$lib/styles/theme.css';
	@import '$lib/styles/public.css';
</style>
