import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.ts';

export async function GET({ params, cookies }) {
    try {
        const locid = params.locid;
        const tabletype = params.tabletype;
        const resp = await callGoRoute({
            url: `/lens/${tabletype}/schema/compare/list/${locid}`,
            method: 'GET',
            cookies
        });
        return json(resp);
        
    } catch (err) {
        console.error('Error fetching location analysis:', err);
        return json({ error: 'Failed to fetch location analysis.' }, { status: 500 });
    }
}