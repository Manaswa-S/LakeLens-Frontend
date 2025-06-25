import { refreshSidebar } from "$lib/stores/lens-global";
import { toast } from "svelte-sonner";

export async function delLake(lakeid: any) {
    const update = await fetch(`/api/lens/lake/${lakeid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const resp = await update.json();

    console.log(resp);

    if (resp.status !== 410) {
        toast.error(resp.data.Message);
        return;
    }
    toast.success(resp.data.Message);
    refreshSidebar();
}

export async function delLoc(locid: any) {
    const update = await fetch(`/api/lens/loc/${locid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const resp = await update.json();

    console.log(resp);

    if (resp.status !== 410) {
        toast.error(resp.data.Message);
        return;
    }
    toast.success(resp.data.Message);
    refreshSidebar();
}

export async function lakeDetails(lakeid: any) {
    const update = await fetch(`/api/lens/lake/details/${lakeid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const resp = await update.json();

    console.log(resp);

    if (resp.status !== 200) {
        toast.error(resp.data.Message);
        return;
    }
}