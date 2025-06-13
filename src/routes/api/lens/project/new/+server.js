import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.js';

export async function POST({ request, cookies }) {
    try {
        const newcreds = await request.json();
        const resp = await callGoRoute({
            url: `/lens/manager/newlake`,
            method: 'POST',
            body: newcreds,
            cookies
        });
        return json(resp);
        
    } catch (err) {
        console.error('Error updating settings:', err);
        return json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
