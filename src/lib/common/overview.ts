import { toast } from "svelte-sonner";
import { activeLocData } from '$lib/stores/mainarea.ts';

export async function initAnalyzeLoc(locid: number | string) {

    if (!locid) {
        return;
    }

    const update = await fetch(`/api/analyze/loc/${locid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const resp = await update.json();

    console.log(resp.data);

    if (resp.status !== 200) {
        toast.error(resp.data.Message);
        return;
    }

    activeLocData.update((s) => {
        s.TableType = resp.data.TableType;

        if (locid != resp.data.LocationID) {
            s.LocID = locid;
        }
        return s;
    })

}