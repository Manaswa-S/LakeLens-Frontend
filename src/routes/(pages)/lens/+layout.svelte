<script lang="ts">
	import { currentTheme, toggleTheme } from '$lib/stores/theme.ts';

	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import LoaderRaw from '$lib/components/extras/LoaderRaw.svelte';

	import { onMount } from 'svelte';

	import { vhHeight, vhWidth } from '$lib/stores/internal.ts';
	import { settings } from '$lib/stores/lens-global.ts';
	import type { PageProps } from '../../$types.js';
	import { Toaster } from 'svelte-sonner';

	let { data }: PageProps = $props();

	settings.set(data.accSettings); // remember, this runs twice, ssr and hydration.

	onMount(() => {
		if (typeof window == 'undefined') {
			// TODO: do something, this can break everything else.
			return;
		}

		function updateDimensions() {
			vhHeight.set(window.innerHeight);
			vhWidth.set(window.innerWidth);
		}
		updateDimensions();

		window.addEventListener('resize', updateDimensions);
	});

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
</script>

<slot />

<LoaderRaw />
<Toaster position="top-center" expand={false} richColors closeButton theme={$currentTheme} />

<div class="footer">
	<div class="footer-left">
		<a href="/feedback" target="_blank" rel="noopener noreferrer">
			<p>Feedback</p>
		</a>
	</div>

	<p>© 2025 LakeLens. Built with ❤️ for data infrastructure.</p>

	<div class="footer-right">
		<a href="/privacy">
			<p>Privacy</p>
		</a>

		<a href="/terms">
			<p>Terms</p>
		</a>

		<button
			class="theme-toggle"
			aria-label="Toggle theme"
			onclick={() => {
				toggleTheme();
			}}
		>
			{#if $currentTheme === 'light'}
				<Moon />
			{:else}
				<Sun />
			{/if}
		</button>
	</div>
</div>

<style>
	@import '$lib/styles/theme.css';

	@import '$lib/styles/lens/shadcn-lens.css';
	@import '$lib/styles/lens/lens.css';
</style>
