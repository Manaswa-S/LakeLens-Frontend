<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type PaginationState,
		type SortingState,
		type ColumnFiltersState,
		type RowSelectionState,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		getFilteredRowModel
	} from '@tanstack/table-core';
	import { createSvelteTable, FlexRender } from '$lib/components/shadcn/ui/data-table/index.ts';
	import * as TableUI from '$lib/components/shadcn/ui/table/index.ts';
	import { Button } from '$lib/components/shadcn/ui/button/index.ts';
	import { Input } from '$lib/components/shadcn/ui/input/index.ts';

	import { locsSelected } from '$lib/stores/internal.ts';

	const {
		columns,
		data
	}: {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
	} = $props();

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let rowSelection = $state<RowSelectionState>({});

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get rowSelection() {
				return rowSelection;
			}
		}
	});

	$effect(() => {
		if (table) {
			const rows = table.getFilteredSelectedRowModel().rows;
			let selected: any[] = [];
			rows.forEach((row) => {
				selected.push(row.original);
			});
			locsSelected.set(selected);
		}
	});
</script>

<div class="pt-2 pl-1 pr-1 pb-0">
	<Input
		class="search-input"
		placeholder="Search properties..."
		value={(table.getColumn('Property')?.getFilterValue() as string) ?? ''}
		onchange={(e) => {
			table.getColumn('Property')?.setFilterValue(e.currentTarget.value);
		}}
		oninput={(e) => {
			table.getColumn('Property')?.setFilterValue(e.currentTarget.value);
		}}
	/>
</div>
<TableUI.Root>
	<TableUI.Header>
		{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
			<TableUI.Row>
				{#each headerGroup.headers as header (header.id)}
					<TableUI.Head>
						{#if !header.isPlaceholder}
							<FlexRender content={header.column.columnDef.header} context={header.getContext()} />
						{/if}
					</TableUI.Head>
				{/each}
			</TableUI.Row>
		{/each}
	</TableUI.Header>
	<TableUI.Body>
		{#each table.getRowModel().rows as row (row.id)}
			<TableUI.Row data-state={row.getIsSelected() && 'selected'}>
				{#each row.getVisibleCells() as cell (cell.id)}
					<TableUI.Cell>
						<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
					</TableUI.Cell>
				{/each}
			</TableUI.Row>
		{:else}
			<TableUI.Row>
				<TableUI.Cell colspan={columns.length} class="h-24 text-center">No results.</TableUI.Cell>
			</TableUI.Row>
		{/each}
	</TableUI.Body>
</TableUI.Root>

<div class="flex items-center justify-between text-muted-foreground text-sm w-full">
	<div>
		{table.getFilteredSelectedRowModel().rows.length} of{' '}
		{table.getFilteredRowModel().rows.length} bucket{table.getFilteredRowModel().rows.length > 1
			? 's'
			: ''} selected.
	</div>

	<div class="flex ml-auto">
		<Button
			class="pagination-btn"
			variant="outline"
			size="sm"
			onclick={() => table.previousPage()}
			disabled={!table.getCanPreviousPage()}
		>
			Previous
		</Button>
		<Button
			class="pagination-btn"
			variant="outline"
			size="sm"
			onclick={() => table.nextPage()}
			disabled={!table.getCanNextPage()}
		>
			Next
		</Button>
	</div>
</div>
