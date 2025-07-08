<script lang="ts">
	import * as Select from '$lib/components/shadcn/ui/select/index.ts';
	import LoaderSmall from '$lib/components/extras/LoaderSmall.svelte';
	import { Check, X } from '@lucide/svelte/icons';
	import { get } from 'svelte/store';

	import { activeLocData, type ActiveLocData } from '$lib/stores/mainarea.ts';
	import { fromUnixToReadable } from '$lib/common/time.ts';

	// *************************************************************************************
	// Loading states for the tables.
	let loadingAll: boolean = $state(false);
	let loadingLeft: boolean = $state(false);
	let loadingRight: boolean = $state(false);

	let refreshLeft: number = $state(0);
	let refreshRight: number = $state(0);

	// *************************************************************************************
	// The options for the schema select list.
	type SchemaOption = {
		SchemaID: string;
		FromTimeStampMS: number;
		ValidUptoSnapshotID: Number;
		Label: string;
	};
	let schemaOptions: SchemaOption[] = $state([]);

	// *************************************************************************************
	//

	import { type Schema } from '$lib/types/global';
	type TableInfo = {
		CurrSchemaID: string;
		TriggerContent: string;
		Schema: Schema;
		Stat: Map<string, string[]>;
	};

	let TableLeft: TableInfo = $state({
		CurrSchemaID: '',
		TriggerContent: '',
		Schema: {
			SchemaID: 0,
			Fields: []
		},
		Stat: new Map<string, string[]>()
	});

	let TableRight: TableInfo = $state({
		CurrSchemaID: '',
		TriggerContent: '',
		Schema: {
			SchemaID: 0,
			Fields: []
		},
		Stat: new Map<string, string[]>()
	});

	function getTriggerContent(id: any) {
		return schemaOptions.find((f) => f.SchemaID === id)?.Label ?? 'Select a schema.';
	}

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	async function getSchemaList() {
		loadingAll = true;
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(`/api/analyze/schema/compare/list/${data.TableType}/${data.LocID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const resp = await update.json();

		schemaOptions = [];
		Object.entries(resp.data.List).forEach(([_key, value]: [key: any, value: any]) => {
			schemaOptions.push({
				FromTimeStampMS: value.FromTimeStampMS,
				ValidUptoSnapshotID: value.ValidUptoSnapshotID,
				SchemaID: value.SchemaID,
				Label: `Schema ${value.SchemaID} : ${fromUnixToReadable(value.FromTimeStampMS)}. Valid upto: ${value.ValidUptoSnapshotID}`
			});
		});

		schemaOptions.sort((a, b) => b.FromTimeStampMS - a.FromTimeStampMS);
		loadingAll = false;

		TableLeft.CurrSchemaID = schemaOptions[0].SchemaID;
		// TableRight.CurrSchemaID = schemaOptions[schemaOptions.length - 1].SchemaID;
		// getSchemaRight();
		getSchemaLeft();
	}
	getSchemaList();

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	async function getSchemaLeft() {
		let schemaid = TableLeft.CurrSchemaID;
		loadingLeft = true;
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(
			`/api/analyze/schema/compare/getschema/${data.TableType}/${data.LocID}/${schemaid}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const resp = await update.json();
		TableLeft.Schema = resp.data;

		cmpHelper();

		loadingLeft = false;
	}

	async function getSchemaRight() {
		let schemaid = TableRight.CurrSchemaID;
		loadingRight = true;
		const data: ActiveLocData = get(activeLocData);
		const update = await fetch(
			`/api/analyze/schema/compare/getschema/${data.TableType}/${data.LocID}/${schemaid}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const resp = await update.json();
		TableRight.Schema = resp.data;

		cmpHelper();

		loadingRight = false;
	}

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	type FieldStat =
		| 'unchanged'
		| 'field-added'
		| 'field-removed'
		| 'type-changed'
		| 'required-changed';

	function cmpHelper() {
		if (TableLeft.Schema.Fields.length == 0 || TableRight.Schema.Fields.length == 0) {
			return;
		}

		TableLeft.Stat.clear();
		TableRight.Stat.clear();

		const timestampLeft =
			schemaOptions.find((f) => f.SchemaID === TableLeft.CurrSchemaID)?.FromTimeStampMS ?? 0;
		const timestampRight =
			schemaOptions.find((f) => f.SchemaID === TableRight.CurrSchemaID)?.FromTimeStampMS ?? 0;

		if (timestampLeft <= timestampRight) {
			compare(TableLeft, TableRight);
		} else {
			compare(TableRight, TableLeft);
		}

		getExtraStats();

		refreshLeft++;
		refreshRight++;
	}

	function pushToStat(statMap: Map<string, string[]>, key: string, value: string) {
		if (!statMap.has(key)) statMap.set(key, []);
		statMap.get(key)!.push(value);
	}

	function compare(oldSchema: TableInfo, newSchema: TableInfo) {
		const oldMap = new Map(oldSchema.Schema.Fields.map((f) => [f.Name, f]));
		const newMap = new Map(newSchema.Schema.Fields.map((f) => [f.Name, f]));

		for (const [oname, ofield] of oldMap) {
			const nfield = newMap.get(oname);
			if (!nfield) {
				pushToStat(oldSchema.Stat, oname, 'field-removed');
				continue;
			}

			const oldType = JSON.stringify(ofield.Type);
			const newType = JSON.stringify(nfield.Type);

			if (oldType != newType) {
				pushToStat(oldSchema.Stat, oname, 'type-changed');
				pushToStat(newSchema.Stat, oname, 'type-changed');
			}

			if (ofield.Required != nfield.Required) {
				pushToStat(oldSchema.Stat, oname, 'required-changed');
				pushToStat(newSchema.Stat, oname, 'required-changed');
			}
		}

		for (const [nname, _nfield] of newMap) {
			if (!oldMap.has(nname)) {
				pushToStat(newSchema.Stat, nname, 'field-added');
			}
		}

		for (const [nname, _nfield] of newMap) {
			if ((newSchema.Stat.get(nname) ?? []).length <= 0) {
				pushToStat(newSchema.Stat, nname, 'unchanged');
			}
		}

		for (const [oname, _ofield] of oldMap) {
			if ((oldSchema.Stat.get(oname) ?? []).length <= 0) {
				pushToStat(oldSchema.Stat, oname, 'unchanged');
			}
		}
	}

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	type ExtraSchemaCmpStats = {
		UnChangedCnt: number;
		AddedCnt: number;
		DeletedCnt: number;
		TypeChangedCnt: number;
		RequiredChangedCnt: number;
	};
	let extraStats: ExtraSchemaCmpStats = $state({
		UnChangedCnt: 0,
		AddedCnt: 0,
		DeletedCnt: 0,
		TypeChangedCnt: 0,
		RequiredChangedCnt: 0
	});

	function getExtraStats() {
		extraStats = {
			UnChangedCnt: 0,
			AddedCnt: 0,
			DeletedCnt: 0,
			TypeChangedCnt: 0,
			RequiredChangedCnt: 0
		};

		let abc = new Map<string, string[]>();

		for (const [lname, lfield] of TableLeft.Stat) {
			if (!abc.has(lname)) abc.set(lname, []);
			lfield.forEach((elem) => {
				if (!abc.get(lname)?.includes(elem)) {
					abc.get(lname)?.push(elem);
				}
			});
		}

		for (const [rname, rfield] of TableRight.Stat) {
			if (!abc.has(rname)) abc.set(rname, []);
			rfield.forEach((elem) => {
				if (!abc.get(rname)?.includes(elem)) {
					abc.get(rname)?.push(elem);
				}
			});
		}

		for (const [_lname, lfield] of abc) {
			lfield.forEach((elem) => {
				switch (elem) {
					case 'unchanged':
						extraStats.UnChangedCnt++;
						break;

					case 'field-added':
						extraStats.AddedCnt++;
						break;

					case 'field-removed':
						extraStats.DeletedCnt++;
						break;

					case 'type-changed':
						extraStats.TypeChangedCnt++;
						break;

					case 'required-changed':
						extraStats.RequiredChangedCnt++;
						break;

					default:
						break;
				}
			});
		}
	}
</script>

{#if loadingAll}
	<LoaderSmall loading={loadingAll} text={'Please wait...'} />
{:else}
	<div class="compare-wrapper">
		<div class="compare-select-wrapper">
			<div class="compare-select-list">
				<Select.Root type="single" bind:value={TableLeft.CurrSchemaID}>
					<Select.Trigger class="select-trigger w-full schema-compare-select">
						{getTriggerContent(TableLeft.CurrSchemaID)}
					</Select.Trigger>
					<Select.Content class="select">
						{#each schemaOptions as option (option.SchemaID)}
							<Select.Item
								value={option.SchemaID}
								onclick={() => {
									getSchemaLeft();
								}}
								class="select-item"
							>
								{option.Label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="compare-vs">
				<p>vs</p>
			</div>
			<div class="compare-select-list">
				<Select.Root type="single" bind:value={TableRight.CurrSchemaID}>
					<Select.Trigger class="select-trigger w-full schema-compare-select">
						{getTriggerContent(TableRight.CurrSchemaID)}
					</Select.Trigger>
					<Select.Content class="select">
						{#each schemaOptions as option (option.SchemaID)}
							<Select.Item
								value={option.SchemaID}
								onclick={() => {
									getSchemaRight();
								}}
								class="select-item"
							>
								{option.Label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="compare-table-wrapper">
			<div class="compare-table-container">
				{#key refreshLeft}
					{#key TableLeft}
						{@render schemaTable(loadingLeft, TableLeft)}
					{/key}
				{/key}
			</div>
			<div class="compare-table-container">
				<div class="center-border"></div>
			</div>
			<div class="compare-table-container">
				{#key refreshRight}
					{#key TableRight}
						{@render schemaTable(loadingRight, TableRight)}
					{/key}
				{/key}
			</div>
		</div>

		<div class="extra-stats-wrapper">
			<div class="extra-stats-container">
				<div class="extra-stats-elem field-added">
					<p class="center-it">{extraStats.AddedCnt}</p>
					<p class=" center-it">Added</p>
				</div>
				<div class="extra-stats-elem field-removed">
					<p class="center-it">{extraStats.DeletedCnt}</p>
					<p class=" center-it">Removed</p>
				</div>
				<div class="extra-stats-elem unchanged">
					<p class="center-it">{extraStats.UnChangedCnt}</p>
					<p class="center-it">Unchanged</p>
				</div>
			</div>
			<div class="extra-stats-container">
				<div class="extra-stats-elem type-changed">
					<p class="center-it">{extraStats.TypeChangedCnt}</p>
					<p class="center-it">Types Changed</p>
				</div>
				<div class="extra-stats-elem required-changed">
					<p class="center-it">{extraStats.RequiredChangedCnt}</p>
					<p class="center-it">Nullabilities Changed</p>
				</div>
			</div>
			<!-- <div class="extra-stats-elem">
				<p>Each row storage went up by average 30 KB.</p>
			</div> -->
		</div>
	</div>
{/if}

{#snippet schemaTable(loading: boolean, tableInfo: TableInfo)}
	<div class="schema-container">
		{#if loading}
			<LoaderSmall {loading} text={'Please wait...'} />
		{:else}
			<p class="schema-head">Schema ID: {tableInfo.Schema.SchemaID}</p>

			<div class="schema-table">
				<div class="schema-item">
					<p class="schema-id schema-head">ID</p>
					<p class="schema-field schema-head">Field</p>
					<p class="schema-type schema-head">Type</p>
					<p class="schema-required schema-head">Required</p>
				</div>
				<hr class="elem-bottom-border" />

				{#each tableInfo.Schema.Fields as field}
					<div
						class="schema-item on-hover {tableInfo.Stat.get(field.Name)?.includes('field-added')
							? 'field-added'
							: ''} {tableInfo.Stat.get(field.Name)?.includes('field-removed')
							? 'field-removed'
							: ''}"
					>
						<p class="schema-id schema-row">{field.ID}.</p>
						<p class="schema-field schema-row">
							{field.Name}
						</p>
						<p
							class="schema-type schema-row {tableInfo.Stat.get(field.Name)?.includes(
								'type-changed'
							)
								? 'type-changed'
								: ''}"
						>
							{field.Type}
						</p>
						<div
							class="schema-required schema-row {tableInfo.Stat.get(field.Name)?.includes(
								'required-changed'
							)
								? 'required-changed'
								: ''}"
						>
							{#if field.Required}
								<Check class="h-4 w-4 stroke-green-600" />
							{:else if !field.Required}
								<X class="h-4 w-4 stroke-red-500" />
							{/if}
						</div>
					</div>
					<hr class="elem-bottom-border" />
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

<!-- 
This many cols were removed/added
The net change in storage etc from that (compare snapshots) -->

<!-- | 'field-added' | 'field-removed' | 'type-changed' | 'required-changed' -->

<style>
	.extra-stats-container {
		height: 100%;
		width: 30%;

		border: 2px solid black;
		border-radius: 4px;

		padding: 5px 5px 5px 5px;

		display: grid;
		grid-template-rows: 1fr 1fr 1fr;
	}

	.extra-stats-elem {
		margin: 1px 3px;
		display: grid;
		grid-template-columns: 1fr 5fr;

		font-size: 0.9rem;
		font-weight: 400;
		color: var(--text);
		opacity: 0.9;
	}

	.center-it {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.extra-stats-wrapper {
		height: 15%;
		width: 100%;

		/* padding: 5px; */

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		gap: 10px;

		flex-wrap: wrap;
		overflow-x: auto;

		margin-top: auto;
	}

	/* // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

	.unchanged {
		background-color: rgba(66, 66, 71, 0.2);
	}

	.required-changed {
		border: 2px dashed rgba(29, 29, 197, 0.35);
		background-color: rgba(29, 29, 197, 0.1);
	}

	.type-changed {
		border: 2px dashed rgb(206, 181, 17);
		background-color: rgba(206, 181, 17, 0.1);
	}

	.field-removed {
		background-color: rgba(231, 76, 60, 0.55);
	}

	.field-added {
		background-color: rgba(86, 204, 113, 0.55);
	}

	.elem-bottom-border {
		border: 1px solid black;
		opacity: 0.2;
	}

	.schema-row {
		font-size: 0.9rem;
		font-weight: 400;
		color: var(--text);
		opacity: 0.9;
	}

	.schema-head {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text);
		opacity: 0.9;
	}

	.schema-id {
		padding: 0px 0px 0px 8px;
		width: 100%;
	}

	.schema-field {
		word-break: break-word;
		overflow-wrap: break-word;
		white-space: normal;
		width: 100%;
	}

	.schema-type {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.schema-required {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.schema-item {
		display: grid;
		grid-template-columns: 1fr 5fr 2fr 2fr;
		gap: 0.3rem;
		padding: 8px 0px 8px 0px;
	}

	.schema-table {
		width: 100%;
		min-height: 100%;

		display: flex;
		flex-direction: column;

		padding: 0px 0px;
	}

	.schema-container {
		height: 50%;
		width: 100%;
	}

	/* // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

	.center-border {
		width: 1px;
		background-color: rgba(0, 0, 0, 0.2);
		margin: 0 auto;
		height: 100%;
	}
	/* // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>. */

	.compare-wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	.compare-vs {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
	}

	.compare-select-list {
		border-radius: 5px;
	}

	.compare-table-container {
		height: auto;
		width: 100%;

		padding: 10px;
		overflow-y: auto;
	}

	.compare-select-wrapper {
		height: 5%;
		width: 100%;

		display: grid;
		grid-template-columns: 15fr 1fr 15fr;
		margin: 0px 0px 0px 0px;
	}

	.compare-table-wrapper {
		height: 80%;
		width: 100%;

		display: grid;
		grid-template-columns: 15fr 1fr 15fr;
		gap: 0px;

		/* border-bottom: 1px solid black; */

		overflow-y: hidden;
	}
</style>
