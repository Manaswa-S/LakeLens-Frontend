import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.ts';

export async function GET({ params, cookies }) {
    try {
        const tipid = params.tipid;
        const resp = await callGoRoute({
            url: `/lens/manager/tip/${tipid}`,
            method: 'GET',
            cookies
        });
        return json(resp);
        
    } catch (err) {
        console.error('Error fetching location analysis:', err);
        return json({ error: 'Failed to fetch location analysis.' }, { status: 500 });
    }
}