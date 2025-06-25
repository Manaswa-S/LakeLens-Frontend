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
		font-size: 0.9rem;
		/* text-shadow: 0 1px 2px black; */
		letter-spacing: 1px;
	}

	.loader-backdrop {
		position: fixed;
		inset: 0;
		/* background: rgba(255, 255, 255, 0.5); */
		/* background: rgba(223, 215, 245, 0.1); */
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
		border: 5px solid var(--bg);
		border-top: 5px solid var(--text);
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
