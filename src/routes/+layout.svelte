<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initTheme } from '$lib/stores/theme.ts';

	onMount(() => {
		initTheme();
	});
</script>

<slot />
