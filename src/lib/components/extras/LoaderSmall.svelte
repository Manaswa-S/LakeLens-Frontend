<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	let { loading, text } = $props();
</script>

{#if loading}
	<div class="loader-backdrop" transition:fade={{ duration: 200 }}>
		<div class="loader-box" transition:scale={{ duration: 300 }}>
			<div class="spinner"></div>
			<p class="loader-text">{text}</p>
		</div>
	</div>
{/if}

<style>
	.loader-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.loader-text {
		color: var(--text);
		font-size: 0.8rem;
		letter-spacing: 1px;
	}

	.loader-backdrop {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid transparent;
		border-top: 3px solid var(--text);
		/* border-right: 6px solid var(--text); */
		border-radius: 50%;
		animation: spin 1s linear infinite;
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
