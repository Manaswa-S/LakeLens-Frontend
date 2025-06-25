<script>
	import { onMount } from 'svelte';
	import { modalState } from '$lib/stores/modal.ts';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	let modal;
	let timer;
	modalState.subscribe((value) => {
		if (timer) clearInterval(timer);
		modal = value;

		if (modal.show && modal.countdown > 0) {
			timer = setInterval(() => {
				modal.countdown--;

				if (modal.countdown <= 1) {
					clearInterval(timer);

					if (modal.redirect !== '') {
						goto(modal.redirect).then(() => {
							modalState.set({ show: false, msg: '', countdown: 0, redirect: '' });
						});
					} else {
						modalState.set({ show: false, msg: '', countdown: 0, redirect: '' });
					}
				} else {
					modalState.update((m) => ({ ...m, countdown: modal.countdown }));
				}
			}, 1000);
		}
	});

	function handleConfirm() {
		modal.confirmCallback?.();
		modalState.update((m) => ({ ...m, show: false }));
	}

	function handleCancel() {
		modalState.update((m) => ({ ...m, show: false }));
	}
</script>

{#if modal.show}
	<div class="modal-backdrop" transition:fade={{ duration: 200 }}>
		{#if modal.type === 'success' || modal.type === 'error' || modal.type === 'info'}
			<div class="modal-box" transition:fade={{ duration: 200 }}>
				<h2>{modal.msg}</h2>
				{#if modal.countdown}
					<p>Redirecting in {modal.countdown} seconds...</p>
				{/if}
			</div>
		{:else if modal.type === 'confirm'}
			<div class="modal-box" transition:fade={{ duration: 200 }}>
				<h2>{modal.msg}</h2>
				<div class="modal-actions">
					<button on:click={handleConfirm}>Yes</button>
					<button on:click={handleCancel}>Cancel</button>
				</div>
			</div>
		{:else if modal.type === 'input'}
			<div class="modal-box" transition:fade={{ duration: 200 }}>
				<h2>{modal.msg}</h2>
				<input bind:value={modal.inputValue} />
				<button
					on:click={() => {
						console.log('Input value is:', modal.inputValue);
						modalState.update((m) => ({ ...m, show: false }));
					}}>Submit</button
				>
			</div>
		{/if}
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
	}
	.modal-box {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
		min-width: 300px;
		max-width: 90vw;
		text-align: center;
	}
	.modal-actions {
		margin-top: 1rem;
		display: flex;
		justify-content: space-evenly;
	}
</style>
