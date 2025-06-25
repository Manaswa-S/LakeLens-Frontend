<script lang="ts">
	//
	import { currentTheme, toggleTheme } from '$lib/stores/theme.ts';
	import Modal from '$lib/components/extras/Modal.svelte';
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import LoaderRaw from '$lib/components/extras/LoaderRaw.svelte';
	import { Toaster } from 'svelte-sonner';
</script>

<slot />

<Modal />
<LoaderRaw />
<Toaster position="top-center" expand={false} richColors closeButton theme={$currentTheme} />

<div class="footer">
	<div class="footer-left"></div>

	<p>© 2025 LakeLens. Built with ❤️ for data infrastructure.</p>

	<div class="footer-right">
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

	@import '$lib/styles/public/shadcn-public.css';
	@import '$lib/styles/public/home.css';
	@import '$lib/styles/public/account.css';
</style>
