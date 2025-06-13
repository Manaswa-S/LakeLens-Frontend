// +page.server.js
import { callGoRoute } from '$lib/server/callGo.js';
import { redirect } from '@sveltejs/kit';

export async function load({cookies}) {
	
	async function safeCall(fn) {
		try {
			return await fn();
		} catch (e) {
			console.error(e);
			return null;
		}
	}
	
	const [accDetails, accBilling, accProjects] = await Promise.all([
		safeCall(() => loadAccDetails(cookies)),
		safeCall(() => loadAccBilling(cookies)),
		safeCall(() => loadAccProjects(cookies)),
	]);

	if (!accDetails || !accBilling || !accProjects) {
		redirect(308, "/home");
	}

	return {
		accDetails,
		accBilling,
		accProjects,
	}
	
}


async function loadAccDetails(cookies) {

	const resp = await callGoRoute({
        url: `/lens/manager/account/details`,
        cookies
    });
    if (resp.data === null){
		return null;
    }

    const pp = await getPP(resp.data.Picture);
    resp.data.Picture = pp;

    return resp.data;
}

async function getPP(pictureUrl) {
	if (!pictureUrl) {
		return { error: 'Missing picture URL' };
	}

	try {
		const res = await fetch(pictureUrl);

		if (!res.ok) {
			throw new Error(`Failed to fetch image: ${res.status}`);
		}

		const buffer = await res.arrayBuffer();
		const imageBase64 = Buffer.from(buffer).toString('base64');
		const contentType = res.headers.get('content-type') || 'image/jpeg';

		const dataUrl = `data:${contentType};base64,${imageBase64}`;

		return dataUrl;
	} catch (err) {
		console.error('Error fetching image:', err);
		return null;
	}
}


async function loadAccBilling(cookies) {

	const accBilling = await callGoRoute({
        url: `/lens/manager/account/billing`,
        cookies
    });
    return accBilling.data;
}

async function loadAccProjects(cookies) {

	const accProjects = await callGoRoute({
        url: `/lens/manager/account/projects`,
        cookies
    });
    return accProjects.data;
}

// async function loadSearchSet(cookies) {

// 	const accSettings = await callGoRoute({
//         url: `/lens/manager/account/settings`,
//         cookies
//     });
//     return accSettings.data;
// }