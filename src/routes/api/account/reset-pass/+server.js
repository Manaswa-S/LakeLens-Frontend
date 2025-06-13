
import { BACKEND_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';

export async function POST({request, url}) {

    const formData = await request.formData();
    const newPass = formData.get('new-password');
    const confPass = formData.get('confirm-password');
    const token = url.searchParams.get('token');

    const payload = {
        token: token,
        newpass: newPass,
        confpass: confPass,
    };

    const bend = BACKEND_URL;
    const resp = await fetch(`${bend}/public/acc/auth/reset-pass`, {
        method: 'POST',
        headers:  {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
    });
    if (resp.status === 200) {
        // return json(null, {status: 200});
        return json({url: '/redirect?msg=Password+Reset+Successfully! Please login.&countdown=5&redirect=%2Faccount'} , {status: 200});
    }

    const result = await resp.json();
    return json(result, {status: resp.status});
}