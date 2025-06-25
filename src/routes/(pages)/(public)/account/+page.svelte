<script>
	import { goto } from '$app/navigation';

	import { modalState } from '$lib/stores/modal.js';
	import { isLoading } from '$lib/stores/loader';
	import { redirect } from '@sveltejs/kit';

	//
	let failed = 2;
	let showHint = false;
	$: showHint = failed <= 0;

	let showForgot = false;

	let err;
	async function epassAuth(e) {
		isLoading.set(true);
		e.preventDefault();
		err = null;
		showHint = false;

		const formData = new FormData(document.getElementById('authForm'));
		const resp = await fetch('/api/account/epass', {
			method: 'POST',
			body: formData
		});
		const result = await resp.json();

		if (resp.status === 200) {
			modalState.set({
				show: true,
				type: 'success',
				msg: 'Login successful!',
				countdown: 2,
				redirect: '/lens/dashboard'
			});
		} else {
			console.log(result);
			err = result.Message;
			failed--;
		}
		isLoading.set(false);
	}

	async function oauthGoogle() {
		const url = `/api/account/oauth/google`;

		const resp = await fetch(url);
		if (resp.status != 200) {
			goto('/errors/500');
		}

		const result = await resp.json();
		window.location = result;
	}

	async function forgotPass(e) {
		e.preventDefault();
		err = null;

		const formData = new FormData(document.getElementById('forgotForm'));
		const resp = await fetch('/api/account/forgot-pass', {
			method: 'POST',
			body: formData
		});
		const result = await resp.json();
		err = result.Message;
	}

	function toggleForgot() {
		err = null;
		showForgot = !showForgot;
	}
</script>

<div class="top-bar">
	<div class="top-bar-left">
		<div class="top-bar-logo">
			<a href="/home">
				<img src="/favicon.png" alt="PP" />
			</a>
		</div>
		<a class="top-bar-logo" href="/home">LakeLens</a>
	</div>

	<div class="top-bar-nav">
		<div class="top-bar-nav-elem">
			<a href="/home">Home</a>
		</div>
	</div>
</div>

{#if !showForgot}
	<div class="auth-main" id="loginCard">
		<div class="auth-container">
			<h2>Welcome</h2>
			<p class="sub-top-bar">Just sign in - we'll create your account if it's your first time.</p>

			<div class="separator">
				<hr class="line" />
				<hr class="line" />
			</div>

			<div class="g-signin">
				<a
					href="/"
					onclick={(e) => {
						e.preventDefault();
						oauthGoogle();
					}}
					class="google-btn"
				>
					<div class="google-icon-wrapper">
						<img
							class="google-icon"
							src="https://developers.google.com/identity/images/g-logo.png"
							alt="Google logo"
						/>
					</div>
					<p class="btn-text"><b>Sign in with Google</b></p>
				</a>
			</div>

			<div class="separator">
				<hr class="line" />
				<span class="separator-text">or</span>
				<hr class="line" />
			</div>

			<p class="sub-top-bar red">{err}</p>

			<form
				id="authForm"
				onsubmit={(e) => {
					epassAuth(e);
				}}
			>
				<div class="form-group">
					<label for="Email">Email</label>
					<input type="email" id="email" name="email" placeholder="Enter your email" required />
				</div>
				<div class="form-group">
					<label for="Password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Enter your password"
						required
					/>
				</div>
				<button type="submit" class="login-btn">Continue</button>

				<p class="extra-links text-sm">By continuing, you agree to our terms and conditions.</p>

				<div class="extra-links {showHint ? 'jump' : ''}">
					<a
						href="/"
						onclick={(e) => {
							e.preventDefault();
							toggleForgot();
						}}>Forgot Password?</a
					>
				</div>
			</form>
		</div>
	</div>
{:else}
	<div class="auth-main" id="forgotCard">
		<div class="auth-container">
			<h2>Forgot Password ?</h2>
			<p class="sub-top-bar">No worries! Enter your email and reset your password.</p>
			<div class="separator">
				<hr class="line" />
				<hr class="line" />
			</div>

			<p class="sub-top-bar red">{err}</p>

			<form
				id="forgotForm"
				onsubmit={(e) => {
					forgotPass(e);
				}}
			>
				<div class="form-group">
					<label for="Email">Email</label>
					<input type="email" id="email" name="email" placeholder="Enter your email" required />
				</div>
				<button type="submit" class="login-btn">Continue</button>
				<div class="extra-links">
					<a
						href="/"
						onclick={(e) => {
							e.preventDefault();
							toggleForgot();
						}}>Account</a
					>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
</style>
