import { json } from '@sveltejs/kit';
import { callGoRoute } from '$lib/server/callGo.ts';

export async function GET({cookies }) {
	try {
		const resp = await callGoRoute({
			url: `/lens/manager/account/projects`,
			method: 'GET',
			cookies
		});
		return json(resp)
	} catch (err) {
		console.error('Error :', err);
		return json({ error: 'Failed' }, { status: 500 });
	}
}
