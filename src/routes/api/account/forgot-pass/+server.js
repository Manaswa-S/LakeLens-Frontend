
import { BACKEND_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';

export async function POST({request}) {

    const formData = await request.formData();
    const email = formData.get('email');

    const bend = BACKEND_URL;
    const resp = await fetch(`${bend}/public/acc/auth/forgot-pass`, {
        method: 'POST',
        headers:  {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
            email: email,
        })
    });
    if (resp.status == 500) {
        return json({Message: "Something went wrong. Try again later."},
            {status: 500})
    }
    if (resp.status == 200) {
        return json({Message: `If an account exists with that email, a reset link has been sent.\nPlease check your inbox and spam folder.`},
            {status: 200})
    } else {
        const result = await resp.json();
        return json(result, {status: resp.status});
    }
}