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
    
    const [accSettings, tourData] = await Promise.all([
        safeCall(() => loadAccSettings(cookies)),
        safeCall(() => loadFeaturesTour(cookies)),
    ]);

    if (!accSettings || !tourData) {
        redirect(308, "/home");
    }

    return {
        accSettings,
        tourData
    }
    
}


async function loadAccSettings(cookies) {

    const accSettings = await callGoRoute({
        url: `/lens/manager/account/settings`,
        cookies
    });
    return accSettings.data;
}


async function loadFeaturesTour(cookies) {

	const tourData = await callGoRoute({
        url: `/lens/manager/features/tour`,
        cookies
    });
    return tourData.data;
}