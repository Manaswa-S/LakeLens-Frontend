import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.ts';

export async function GET({ params, cookies }) {
    try {
        const lakeid = params.lakeid;
        const resp = await callGoRoute({
            url: `/lens/manager/lake/details/${lakeid}`,
            method: 'GET',
            cookies
        });
        return json(resp);
        
    } catch (err) {
        console.error('Error getting lake details :', err);
        return json({ error: 'Failed to get lake details.' }, { status: 500 });
    }
}
