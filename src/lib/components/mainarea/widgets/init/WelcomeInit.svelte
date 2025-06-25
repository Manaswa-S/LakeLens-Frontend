<!-- Popular -->
<!-- Latest -->
<!-- Blogs, Socials -->
<!-- New -->
<!-- Welcome -->

<script lang="ts">
	import Label from '../../../shadcn/ui/label/label.svelte';

	import { scale } from 'svelte/transition';
</script>

<div class="welcome-card" transition:scale={{ delay: 50, duration: 500 }}>
	<div class="welcome-heading">
		<Label class="text-base flex items-center gap-1">Welcome to LakeLens</Label>
	</div>
	<p class="text-sm">
		The ultimate destination to manage, explore and query your data lake tables.
	</p>
</div>
<hr class="hr-style" />

<div class="welcome-card" transition:scale={{ delay: 50, duration: 500 }}>
	<div class="welcome-heading">
		<Label class="text-base flex items-center gap-1">Welcome to LakeLens</Label>
	</div>
	<p class="text-sm">
		The ultimate destination to manage, explore and query your data lake tables.
	</p>
</div>
<hr class="hr-style" />

<div class="welcome-card" transition:scale={{ delay: 50, duration: 500 }}>
	<div class="welcome-heading">
		<Label class="text-base flex items-center gap-1">Welcome to LakeLens</Label>
	</div>
	<p class="text-sm">
		The ultimate destination to manage, explore and query your data lake tables.
	</p>
</div>
<hr class="hr-style" />

<style>
	.welcome-heading {
		font-size: larger;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.welcome-container {
		width: 100%;
	}

	.welcome-card {
		/* padding: 8px 5px 5px 5px; */
		margin: 0px 0px;

		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.welcome-card p {
		max-width: 100%;
		text-align: center;

		/* font-weight: 500; */
		font-size: 15px;
	}

	.hr-style {
		border-color: black;
		margin: 6px 0px;
	}
</style>
