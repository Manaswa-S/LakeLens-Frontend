import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.ts';

export async function DELETE({ params, cookies }) {
    try {
        const lakeid = params.lakeid;
        const resp = await callGoRoute({
            url: `/lens/manager/lake/${lakeid}`,
            method: 'DELETE',
            cookies
        });
        return json(resp);
        
    } catch (err) {
        console.error('Error deleting lake :', err);
        return json({ error: 'Failed to delete lake.' }, { status: 500 });
    }
}
