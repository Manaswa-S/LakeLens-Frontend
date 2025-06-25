import { get, writable } from "svelte/store";


// 1) the objects in ui.ts, they control the grid, nothing inside it.
// Everything inside the grid is controlled from mainarea.ts and its internal warehouses.


// 1) a global state boolean, to denote if the grid is to be reset.
export const resetWidgets = writable<boolean>(false);

// 1) a global state boolean, for the entire analyze group.
// denotes whether we have shifted from the on load init page.
export const analyzeActive = writable<boolean>(false);

// 2) a global string denoting the current active option from the analyze group.
// this is changed from the grid menu.
export const contentActive = writable<string>('overview');

// 1) a global store to keep the cols data thats to be used in the grid.
export const gridCols = writable<any>(null);

// 2) a global store to keep the items data thats to be used in the grid.
export const gridItems = writable<any>(null);

// 1) a global store to denote if the area is still loading, the grid is not loaded until this is false.
export const dataLoading = writable<boolean>(false);

// 2) a global store to save the data of currently active location, like table type, etc.
export type ActiveLocData = {
    LocID: number | string;
    TableType: string;
}
export const activeLocData = writable<ActiveLocData>({
    LocID: 0,
    TableType: '',
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import { sidebarOpen } from '$lib/stores/internal.ts';
import { initAnalyzeLoc } from '$lib/common/overview.ts';
// the location analyze coordinator.
export async function analyzeLoc(locid: number | string) {
    dataLoading.set(true);
    sidebarOpen.set(false);


    await initAnalyzeLoc(locid);

    analyzeActive.set(true); // this should always come before 
    contentActive.set('overview'); // this
    setupGrid();

    dataLoading.set(false);

}

function setupGrid() {
    const setup = gridOptionMap.get(get(contentActive))

    if (!setup) {
        console.log("no grid setup yet.");
        gridCols.set([]);
        gridItems.set([]);
        return;
    }

    gridCols.set(setup?.Cols);
    gridItems.set(setup?.Items);

}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export function goHome() {

    analyzeActive.set(false);
    contentActive.set('home');

    setupGrid();
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import { initCols, initItems } from '$lib/components/mainarea/warehouse.ts';
import { overviewCols, overviewItems } from '$lib/components/mainarea/warehouse.ts';


export type GridSetup = {
    Option: string; // the option thats selected, 'overview', 'init', etc.
    Cols: any; // the cols to apply to the grid.
    Items: any; // the items to apply to the grid.
}

// this map is to be used to display current grid setup when options are selected.
export const gridOptionMap: Map<string, GridSetup> = new Map([

    ["home", {
        Option: '',
        Cols: initCols,
        Items: initItems,
    }],

    ["overview", {
        Option: '',
        Cols: overviewCols,
        Items: overviewItems,
    }]
])

