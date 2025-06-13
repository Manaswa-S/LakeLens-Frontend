// +page.server.js
import { callGoRoute } from '$lib/server/callGo.js';

export async function load({ cookies }) {

    const result = await callGoRoute({
        url: `/public/acc/auth/check`,
        cookies
    });

    if (result == null) {
        return {};
    }

	return {
		result: result.data,
	};
}
