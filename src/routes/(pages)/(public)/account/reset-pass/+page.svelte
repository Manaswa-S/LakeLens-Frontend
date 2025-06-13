<script>
	import { onMount } from 'svelte';
	import { modalState } from '$lib/stores/modal.js';
	import { isLoading } from '$lib/stores/loader.js';

	let token = '';
	let noToken = false;

	let err;
	let errType = 'red';

	let newPass = '';
	let confPass = '';

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		token = params.get('token') ?? '';

		if (!token) {
			errType = 'red';
			err = `No token found. Invalid request.`;
			noToken = true;
		}

		verifyToken();
	});

	$: if (newPass && confPass && newPass !== confPass) {
		errType = 'red';
		err = 'Passwords do not match';
	} else if (newPass === confPass) {
		err = null;
	}

	async function verifyToken() {
		err = null;

		const resp = await fetch(`/api/account/reset-pass/verify-token?token=${token}`, {
			method: 'GET'
		});

		if (resp.status !== 200) {
			const result = await resp.json();
			errType = 'red';
			err = result.Message;
			noToken = true;
		}
	}

	async function resetPass(e) {
		isLoading.set(true);
		e.preventDefault();
		err = null;

		if (newPass !== confPass) {
			err = 'Passwords do not match';
			return;
		}

		const formData = new FormData(document.getElementById('resetForm'));
		const resp = await fetch(`/api/account/reset-pass?token=${token}`, {
			method: 'POST',
			body: formData
		});
		const result = await resp.json();

		if (resp.status === 200) {
			modalState.set({
				show: true,
				type: 'success',
				msg: 'Password Reset Successfully! Please login.',
				countdown: 5,
				redirect: '/account'
			});
		} else {
			errType = 'red';
			err = result.Message;
		}
		isLoading.set(false);
	}
</script>

<header>
	<div class="logo">
		<a href="/home"> LakeLens </a>
	</div>

	<nav>
		<a href="/home">Home</a>
	</nav>
</header>

<div class="auth-main">
	<div class="auth-container">
		<h2>Reset Password</h2>
		<div class="separator">
			<hr class="line" />
			<hr class="line" />
		</div>

		<p class={`subheading ${errType}`}>{err}</p>

		<form id="resetForm" on:submit={resetPass}>
			{#if !noToken}
				<div class="form-group">
					<label for="Password">New Password</label>
					<input
						type="password"
						id="new-password"
						name="new-password"
						placeholder="Enter your password"
						required
						bind:value={newPass}
					/>
				</div>
				<div class="form-group">
					<label for="Password">Confirm Password</label>
					<input
						type="password"
						id="confirm-password"
						name="confirm-password"
						placeholder="Enter your password"
						required
						bind:value={confPass}
					/>
				</div>
				<button type="submit" class="login-btn">Continue</button>
			{/if}

			<div class="extra-links">
				<a href="/account">Account</a>
			</div>
		</form>
	</div>
</div>

<style>
	/*  */
</style>
