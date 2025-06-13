
import { BACKEND_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';

export async function POST({request, cookies}) {

    const formData = await request.formData();
    const email = formData.get('email');
    const pass = formData.get('password');

    const payload = {
        email: email,
        password: pass,
        verified_email: true // TODO: remove this 
    };

    const bend = BACKEND_URL;
    const hit = bend + "/public/acc/auth";
    const resp = await fetch(hit, {
        method: 'POST',
        headers:  {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
    });
    const result = await resp.json();

    if (resp.status == 201) {

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

        return json({url: '/redirect?msg=Welcome+Back!&countdown=3&redirect=%2Flens%2Fdashboard'} , {status: 200});
    }

    return json(result, {status: resp.status});
}