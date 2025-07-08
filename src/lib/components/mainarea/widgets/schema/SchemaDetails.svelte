<script lang="ts">
	import { activeLocData, type ActiveLocData } from '$lib/stores/mainarea.ts';
	import { get } from 'svelte/store';

	async function getData() {
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(`/api/analyze/schema/data/${data.TableType}/${data.LocID}/1`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();
		console.log(resp);
	}

	getData();
</script>

<div class="welcome-heading">Schema Details</div>

<style>
	.welcome-heading {
		font-size: larger;
		font-weight: 500;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
