<script>
	//
	import { currentTheme, toggleTheme } from '$lib/styles/theme';

	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import Heart from '@lucide/svelte/icons/heart';
	import { onMount } from 'svelte';

	import { Toaster } from 'svelte-sonner';

	const switchTheme = () => {
		toggleTheme();
		const toggle = document.querySelector('.theme-toggle');
		toggle.addEventListener('click', () => {
			document.documentElement.classList.toggle('dark-mode');
		});
	};
	$: theme = $currentTheme;

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
	// get data from server.js
	// set all global stores

	import { settings } from '$lib/stores/lens-global.ts';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	export let data;

	function loadGlobals() {
		settings.set(data.accSettings);
	}
	loadGlobals();

	onMount(() => {
		function checks() {
			const width = window.innerWidth;
			const height = window.innerHeight;

			console.log('Viewport Width:', width);
			console.log('Viewport Height:', height);

			// if (width < 1200) {
			// 	goto('/redirect?msg=Device+Width+Too+Low&countdown=3&redirect=%2Fhome');
			// }
		}
		checks();
	});
</script>

<slot />

<Toaster position="top-center" expand={false} richColors closeButton theme={$currentTheme} />

<div class="footer">
	<div class="footer-left">
		<a href="/feedback">
			<p>Feedback</p>
		</a>
	</div>

	<p>© 2025 LakeLens. Built with ❤️ for data infrastructure.</p>

	<!-- <p>
		© 2025 LakeLens. Built with <Heart /> for data infrastructure.
	</p> -->

	<div class="footer-right">
		<a href="/privacy">
			<p>Privacy</p>
		</a>

		<a href="/terms">
			<p>Terms</p>
		</a>

		<button class="theme-toggle" aria-label="Toggle theme" onclick={switchTheme}>
			{#if theme === 'light'}
				<Moon />
			{:else}
				<Sun />
			{/if}
		</button>
	</div>
</div>

<style global>
	@import '$lib/styles/shadcn.css'; /* bleeds, but let it be for now.*/
	@import '$lib/styles/theme.css';
	@import '$lib/styles/lens.css';
</style>
