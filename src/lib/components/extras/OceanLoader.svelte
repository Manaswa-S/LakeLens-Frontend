<script lang="ts">
	let { loading } = $props();
</script>

{#if loading}
	<div class="loader-container">
		<div class="water"></div>
		<div class="magnifier"></div>
	</div>
{/if}

<style>
	.loader-container {
		position: relative;
		width: 200px;
		height: 100px;
		overflow: hidden;
		background: #f0f0f0;
		border-radius: 12px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.water {
		position: absolute;
		top: 40%;
		left: 0;
		width: 200%;
		height: 100%;
		background: linear-gradient(135deg, #4fc3f7 25%, #0288d1 75%);
		opacity: 0.7;
		animation: waveMove 3s linear infinite;
		border-radius: 50%;
		transform: translateY(-50%);
	}

	@keyframes waveMove {
		0% {
			transform: translateX(0) translateY(-50%);
		}
		100% {
			transform: translateX(-50%) translateY(-50%);
		}
	}

	.magnifier {
		position: absolute;
		top: 30%;
		left: -30px;
		width: 40px;
		height: 40px;
		border: 4px solid #555;
		border-radius: 50%;
		background: transparent;
		box-shadow: 0 0 0 1px white;
		animation: searchMove 4s ease-in-out infinite;
	}

	.magnifier::after {
		content: '';
		position: absolute;
		width: 20px;
		height: 4px;
		background: #555;
		transform: rotate(45deg);
		top: 30px;
		left: 20px;
		border-radius: 2px;
	}

	@keyframes searchMove {
		0% {
			left: -30px;
			top: 20%;
		}
		25% {
			left: 60px;
			top: 40%;
		}
		50% {
			left: 130px;
			top: 20%;
		}
		75% {
			left: 70px;
			top: 60%;
		}
		100% {
			left: -30px;
			top: 20%;
		}
	}
</style>
