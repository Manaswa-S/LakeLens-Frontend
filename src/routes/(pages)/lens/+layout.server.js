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
    
    const [accSettings] = await Promise.all([
        safeCall(() => loadAccSettings(cookies)),
    ]);

    if (!accSettings) {
        redirect(308, "/home");
    }

    return {
        accSettings
    }
    
}


async function loadAccSettings(cookies) {

    const accSettings = await callGoRoute({
        url: `/lens/manager/account/settings`,
        cookies
    });
    return accSettings.data;
}
