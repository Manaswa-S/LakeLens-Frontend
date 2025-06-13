<script>
	import { isLoading } from '$lib/stores/loader.js';
	import { fade } from 'svelte/transition';
	let loading;
	isLoading.subscribe(v => loading = v);
</script>

{#if loading}
	<div class="loader-backdrop" transition:fade={{ duration: 200 }}>
		<div class="spinner"></div>
	</div>
{/if}

<style>
	.loader-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(3px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.spinner {
		width: 60px;
		height: 60px;
		border: 6px solid #ccc;
		border-top: 6px solid #0070f3;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>
