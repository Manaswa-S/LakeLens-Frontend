import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.ts';

export async function POST({ request, cookies }) {
    try {
        const newlocs = await request.json();
        const resp = await callGoRoute({
            url: `/lens/manager/addlocs`,
            method: 'POST',
            body: newlocs,
            cookies
        });
        return json(resp);
        
    } catch (err) {
        console.error('Error updating settings:', err);
        return json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
