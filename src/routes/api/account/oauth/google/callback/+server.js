
import {json, redirect} from '@sveltejs/kit'
import { BACKEND_URL } from '$env/static/private';

export async function GET({url, cookies}) {

	const searchParams = url.searchParams;
    const params = Object.fromEntries(searchParams);
    const g_state = cookies.get("lens_g_oas");

    if (!g_state) {
        console.log("g_state not found.");
        return;
    }

    const payload = {
        ...params,
        cookie_state: g_state,
    };

    const bend = BACKEND_URL;
    const hit = bend + "/public/acc/oauth/callback";
    const resp = await fetch(hit, {
        method: 'POST',
        headers:  {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
    });

    if (resp.status == 201) {
        const result = await resp.json();

        const attl = parseInt(result.ATTTL);
        const rttl = parseInt(result.RTTTL);

        if (isNaN(attl) || isNaN(rttl)) {
            console.error("Invalid TTL values from backend:", result);
            throw new Error("Bad TTL values");
        }

        cookies.set("lens_t_acc", result.ATStr, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: attl
        });

        cookies.set("lens_t_ref", result.RTStr, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: rttl
        });

        cookies.delete('lens_g_oas', { path: '/' });
        
        redirect(302, '/redirect?msg=Success&redirect=%2Flens%2Fdashboard');
    }

    throw redirect(307, '/account');
}