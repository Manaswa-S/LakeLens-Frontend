import { browser } from "$app/environment";
import { get, writable } from "svelte/store";


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Document, viewport, browser, etc states and data.

export const vhHeight = writable<number>(0);
export const vhWidth = writable<number>(0);

if (browser) {

    // vhHeight.subscribe(() => {
    //     // console.log('Viewport Height:', get(vhHeight));
    // })

    // vhWidth.subscribe(() => {
    //     // console.log('Viewport Width:', get(vhWidth));

    //     // if (width < 1200) {
    //     // 	goto('/redirect?msg=Device+Width+Too+Low&countdown=3&redirect=%2Fhome');
    //     // }
    // })
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Sidebar states and data.

export const sidebarOpen = writable<boolean>(true);
export const sidebarWidth = writable<number>(0);

if (browser) {
    // sidebarOpen.subscribe(() => {
    //     console.log("Sidebar Open: ", get(sidebarOpen));
    // })
    // sidebarWidth.subscribe(() => {
    //     console.log("Sidebar width: ", get(sidebarWidth));
    // })
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Main area states and data.

export const mainAreaHeight = writable<number>(0);
export const mainAreaWidth = writable<number>(0);

if (browser) {
    // mainAreaHeight.subscribe(() => {
    //     console.log("Main area height: ", get(mainAreaHeight));
    // })
    // mainAreaWidth.subscribe(() => {
    //     console.log("Main area width: ", get(mainAreaWidth));
    // })
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Search bar and choices related data.

export type SearchChoice = {
    Label: string
    Link: string
};

export const searchChoices = writable<SearchChoice[]>();

if (browser) {
    getChoices();
}

async function getChoices() {
    const update = await fetch('/api/lens/search/choices', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resp = await update.json();
    searchChoices.set(resp.data);
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// New Lake and related data.

export const locsSelected = writable<any>();

export const MAX_ADD_LOCS_LIMIT = 5;

export type LakeProviders = {
    Label: string;
    Value: string;
};

export const providers = writable<LakeProviders[]>([
    {
        Label: 'AWS-S3',
        Value: 'awsS3'
    },
    {
        Label: 'Azure',
        Value: 'azure'
    },
    {
        Label: 'MinIO',
        Value: 'minIO'
    }
]);

export type AddLocsPayload = {
    LakeID: number;
    LocNames: string[];
}