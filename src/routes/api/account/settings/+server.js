import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.js';

export async function PATCH({ request, cookies }) {
	try {
		const settingsData = await request.json();
		const resp = await callGoRoute({
			url: `/lens/manager/account/settings/update`,
			method: 'PATCH',
			body: settingsData,
			cookies
		});

		if (resp.data !== null) {
			return json({ message: 'Settings updated' }, { status: 200 });
		}
	} catch (err) {
		console.error('Error updating settings:', err);
		return json({ error: 'Failed to update settings' }, { status: 500 });
	}
}
