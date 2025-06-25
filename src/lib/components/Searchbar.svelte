<script lang="ts">
	import { Input } from '$lib/components/shadcn/ui/input/index.ts';
	import * as Popover from '$lib/components/shadcn/ui/popover/index.ts';
	import Search from '@lucide/svelte/icons/search';
	import { searchChoices, type SearchChoice } from '$lib/stores/internal.ts';

	let {} = $props();

	let open = $state(false);
	let results: SearchChoice[] = $state([]);
	let query = $state('');

	function handleSearch() {
		results = $searchChoices.filter((item) =>
			item.Label.toLowerCase().includes(query.toLowerCase())
		);
		open = true;
	}

	// TODO: on pressing space as the input to the search bar, it shifts focus
	
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
