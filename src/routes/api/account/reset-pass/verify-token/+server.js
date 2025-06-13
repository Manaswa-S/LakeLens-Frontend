
import { BACKEND_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';

export async function GET({url}) {

    const token = url.searchParams.get('token');

    const bend = BACKEND_URL;
    const resp = await fetch(`${bend}/public/acc/auth/reset-pass/verify/${token}`, {
        method: 'GET',
    });
    const result = await resp.json();

    return json(result, {status: resp.status});
}