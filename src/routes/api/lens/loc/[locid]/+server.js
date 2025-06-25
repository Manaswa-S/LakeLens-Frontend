import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.ts';

export async function DELETE({ params, cookies }) {
    try {
        const locid = params.locid;
        const resp = await callGoRoute({
            url: `/lens/manager/loc/${locid}`,
            method: 'DELETE',
            cookies
        });
        return json(resp);
        
    } catch (err) {
        console.error('Error deleting location :', err);
        return json({ error: 'Failed to delete location.' }, { status: 500 });
    }
}
