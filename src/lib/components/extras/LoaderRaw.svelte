<script>
	import { isLoading } from '$lib/stores/loader.ts';
	import { fade } from 'svelte/transition';
	let loading;
	isLoading.subscribe((v) => (loading = v));
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
		/* background: rgba(255, 255, 255, 0.5); */
		background: rgba(223, 215, 245, 0.1);
		/* background: var(--bg); */
		/* backdrop-filter: blur(0px); */
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
		
	}

	.spinner {
		width: 60px;
		height: 60px;
		border: 6px solid var(--bg);
		border-top: 6px solid var(--text);
		/* border-right: 6px solid var(--text); */
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
