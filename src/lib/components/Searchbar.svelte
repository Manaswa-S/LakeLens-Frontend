<script lang="ts">
	import { Input } from '$lib/components/shadcn/ui/input';
	import * as Popover from '$lib/components/shadcn/ui/popover/index.js';

	import Search from '@lucide/svelte/icons/search';
	import { onMount } from 'svelte';

	import type { SearchChoice } from '$lib/types/global';

	// TODO: this should be all dynamic, fetch the searchable set and send searches back
	// export let data;
	// let choices: string[] = data.Choices;

	let choices: SearchChoice[] = [];

	async function getChoices() {
		const update = await fetch('/api/lens/search/choices', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const resp = await update.json();
		console.log(resp);
		choices = resp.data;
		console.log(choices);
	}

	onMount(() => {
		getChoices();
	});

	let open = false;
	let results: SearchChoice[] = [];
	let query = '';

	function handleSearch() {
		results = choices.filter((item) => item.Label.toLowerCase().includes(query.toLowerCase()));
		open = true;
	}
</script>

<div class="search-list">
	<Popover.Root bind:open>
		<Popover.Trigger>
			<div class="searchbar-wrapper">
				<Search class="search-icon" />
				<Input
					class="search-input pl-10"
					placeholder="Search..."
					bind:value={query}
					oninput={handleSearch}
					onfocusout={() => {
						query = '';
					}}
				/>
			</div>
		</Popover.Trigger>
		<Popover.Content onOpenAutoFocus={(e) => e.preventDefault()} class="popover-content">
			{#if results.length > 0}
				{#each results as result}
					<div class="popover-elem">
						<button>
							<p class="text-sm">{result.Label}</p>
						</button>
						<br />
					</div>
				{/each}
			{:else}
				<div class="popover-elem">
					<p class="text-sm">No results!</p>
				</div>
			{/if}
		</Popover.Content>
	</Popover.Root>
</div>
