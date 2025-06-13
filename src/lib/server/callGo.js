import { json, redirect } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { BACKEND_URL } from '$env/static/private';

export async function callGoRoute({ url, method = 'GET', body = null, cookies, retry = true }) {

	let cookieHeader;
	let headers;
	let response;

    const bend = BACKEND_URL;
    if (!bend) {
        console.error("Missing backend url in env");
        return null;
    }

	// 1. get both cookies, check if !null
	
	let t_acc = cookies.get('lens_t_acc');
	let t_ref = cookies.get('lens_t_ref');
	if (t_ref) {

		if (t_acc) {
			// 2. try fetching original request
			cookieHeader = cookie.serialize('t_acc', t_acc);
			headers = {
				'Cookie': cookieHeader,
				'Content-Type': 'application/json',
			};
			try {
				response = await fetch(`${bend}${url}`, {
					method,
					headers,
					body: body ? JSON.stringify(body) : undefined
				});	
			} catch (err) {
				console.error("Error contacting backend:", err);
				return null;
			}
			// if response is non 401, return as it is.
			if (response.status !== 401) {
				const data = await response.json();
				return {
					data: data,
					status: response.status,
				};
			}
		}

		// 3. if response if 401, t_acc has expired or is invalid.
		// try refreshing
		cookieHeader = cookie.serialize('t_ref', t_ref);
		headers = {
			'Cookie': cookieHeader,
			'Content-Type': 'application/json',
		};
		let newTokenResp;
		try {
			newTokenResp = await fetch(`${bend}/public/acc/auth/refresh`, {
				method: 'POST',
				headers,
			});
		} catch(err) {
			console.error("Error contacting backend:", err);
			return null;
		}

		// if refresh fetch is successful, new t_acc is received.
		if (newTokenResp.ok) {
			const newTokens = await newTokenResp.json();
			// set new cookies

			if (newTokens.ATStr != null) {
				const atttl = parseInt(newTokens.ATTTL);
				if (!isNaN(atttl)) {
					cookies.set('lens_t_acc', newTokens.ATStr, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: true,
						maxAge: atttl
					});
				}
			}

			// if t_ref was also sent, update it too.
			if (newTokens.RTStr != null) {
				const rtttl = parseInt(newTokens.RTTTL);
				if (!isNaN(rtttl)) {
					cookies.set('lens_t_ref', newTokens.RTStr, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: true,
						maxAge: newTokens.RTTTL
					});
				}
			}
			
			// now retry original request

			t_acc = newTokens.ATStr;
			if (!t_acc) {
				return null;
			}
			cookieHeader = cookie.serialize('t_acc', t_acc);
			headers = {
				'Cookie': cookieHeader,
				'Content-Type': 'application/json',
			};
			response;
			try {
				response = await fetch(`${bend}${url}`, {
					method,
					headers,
					body: body ? JSON.stringify(body) : undefined
				});				
			} catch (err) {
				console.error("Error contacting backend:", err);
				return null;
			}

			if (response.status !== 401) {
				const data = await response.json();
				return {
					data: data,
					status: response.status,
				};
			} else {
				const data = await response.json();
				console.log(data);
			}
		} else {
			const errResp = await newTokenResp.json();
			console.log(errResp);
		}
	}
	
	// Refresh failed everything else failed — clear cookies, send 401
	cookies.delete('lens_t_acc', { path: '/' });
	cookies.delete('lens_t_ref', { path: '/' });
	return null;
}
