<script>
	//
	import { currentTheme, toggleTheme } from '$lib/styles/theme';
	import Modal from '$lib/components/Modal.svelte';
	import Loader from '$lib/components/Loader.svelte';

	const switchTheme = () => {
		toggleTheme();
		const toggle = document.querySelector('.theme-toggle');
		toggle.addEventListener('click', () => {
			document.documentElement.classList.toggle('dark-mode');
		});
	};
	$: theme = $currentTheme;
</script>

<slot />

<div class="footer">© 2025 LakeLens. Built with ❤️ for data infrastructure.</div>
<button class="theme-toggle" aria-label="Toggle theme" onclick={switchTheme}>
	{#if theme === 'dark'}
		<svg
			class="theme-icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M22 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7"
			/>
			<circle cx="12" cy="12" r="5" />
		</svg>
	{:else}
		<svg
			class="theme-icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 12.79A9 9 0 0 1 12.21 3 7 7 0 0 0 12 21a9 9 0 0 0 9-8.21z" />
		</svg>
	{/if}
</button>

<Modal />
<Loader />

<style global>
	@import '$lib/styles/theme.css';
	@import '$lib/styles/public.css';
	@import '$lib/styles/account.css';
</style>
