import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.ts';

export async function GET({ params, cookies }) {
    try {
        const lakeid = params.lakeid;
        const resp = await callGoRoute({
            url: `/lens/manager/getlocs/${lakeid}`,
            method: 'GET',
            cookies
        });
        return json(resp);
        
    } catch (err) {
        console.error('Error fetching locations:', err);
        return json({ error: 'Failed to fetch locations' }, { status: 500 });
    }
}