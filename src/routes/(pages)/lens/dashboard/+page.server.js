// +page.server.js
import { callGoRoute } from '$lib/server/callGo.ts';
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
		accProjects,
		accBilling,
	};
}


async function loadAccDetails(cookies) {

	const details = await callGoRoute({
        url: `/lens/manager/account/details`,
        cookies
    });
    if (details.data === null){
		return null;
    }

    const pp = await getPP(details.data.Picture);
    details.data.Picture = pp;

    return details.data;
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
