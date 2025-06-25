<script lang="ts">
	import { Checkbox } from '$lib/components/shadcn/ui/checkbox/index.js';
	import { Label } from '$lib/components/shadcn/ui/label/index.js';
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

<div class="auth-main">
	<div class="auth-container">
		<h2>Feedback</h2>
		<p class="subheading text-sm">Help us build a better experience — one response at a time.</p>

		<div class="separator">
			<hr class="line" />
			<hr class="line" />
		</div>

		<p class="subheading red"></p>

		<form>
			<div class="form-group">
				<label for="Description">Describe</label>
				<textarea
					class="description"
					id="Description"
					name="description"
					placeholder="Tell us..."
					required
				></textarea>
			</div>

			<div class="form-group">
				<label for="Description">Add a picture?</label>
				<input type="file" id="Screenshot" name="screenshot" accept="image/*" class="file-upload" />
			</div>
		</form>

		<div class="separator">
			<hr class="line" />
		</div>

		<div class="flex flex-col gap-6">
			{@render keepAnon()}
		</div>

		<button type="submit" class="login-btn">Continue</button>
	</div>
</div>

{#snippet keepAnon()}
	<div class="flex flex-col gap-6">
		<div class="flex items-start gap-3">
			<Checkbox id="terms-2" />
			<div class="grid gap-2 pl-2">
				<Label for="terms-2">Include my identity.</Label>
				<p class="text-muted-foreground text-sm">
					Feedback is anonymous, unless this checkbox is selected — and always respected.
				</p>
			</div>
		</div>
	</div>
{/snippet}

<!-- Thanks for helping us grow — every response matters. -->

<!-- Feedback is anonymous — and always respected. -->

<style>
	.subheading {
		margin-top: 10px;
		margin-bottom: 20px;
		color: var(--text);
		text-align: center;
		line-height: 1.4;
	}

	.file-upload {
		min-height: 2rem;
		max-width: 100%;
		min-width: 100%;
		padding: 10px 10px;
		border: 2px solid;
		border-radius: 6px;

		background-color: white;
	}

	.description {
		min-height: 10rem;
		max-width: 100%;
		min-width: 100%;

		padding: 10px 10px;

		border: 2px solid;
		border-radius: 6px;
	}

	.auth-main {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 8rem;
		color: var(--text);
	}

	.auth-container {
		justify-content: center;
		align-items: center;
		background: var(--bg);
		border-radius: 10px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		width: 30%;
		padding: 30px;
	}
	.auth-container h2 {
		text-align: center;
		margin-bottom: 20px;
		font-weight: bold;
		color: var(--button-bg);
	}

	.form-group {
		margin-bottom: 15px;
	}
	.form-group label {
		display: block;
		margin-bottom: 8px;
		/* font-size: 16px; */
		font-weight: 500;
	}
	.form-group input {
		width: 100%;
		padding: 10px;
		/* font-size: 14px; */
		border: solid 1px var(--text);
		/* background-color: var(--text); */
		border-radius: 5px;
		outline: none;
		transition: all 0.3s;
	}
	.form-group input:focus {
		border-color: var(--color-primary);
		box-shadow: 0 0 5px rgba(108, 99, 255, 0.3);
	}

	.login-btn {
		background: var(--button-bg);
		display: block;
		margin: 0 auto;
		margin-top: 25px;
		color: var(--text);
		/* font-size: 15px; */
		font-weight: 500;
		border: none;
		border-radius: 5px;
		padding: 10px;
		cursor: pointer;
		transition: all 0.3s;
	}
	.login-btn:hover {
		background: #8e94f2;
	}

	.extra-links {
		margin-top: 25px;
		text-align: center;
	}
	.extra-links a {
		color: var(--text);
		/* font-size: 15px; */
		text-decoration: none;
	}
	.extra-links a:hover {
		text-decoration: underline;
	}
</style>
