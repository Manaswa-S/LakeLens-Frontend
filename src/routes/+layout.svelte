<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { initTheme } from '$lib/styles/theme';

	onMount(() => {
		initTheme();
	});

	
</script>

<slot />
