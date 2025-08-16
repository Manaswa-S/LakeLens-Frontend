import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.ts';

export async function GET({ params, cookies }) {
    try {
        const version = params.version;
        const resp = await callGoRoute({
            url: `/lens/manager/features/tour/${version}`,
            method: 'PATCH',
            cookies
        });
        return json(resp);
        
    } catch (err) {
        console.error('Error fetching location analysis:', err);
        return json({ error: 'Failed to fetch location analysis.' }, { status: 500 });
    }
}