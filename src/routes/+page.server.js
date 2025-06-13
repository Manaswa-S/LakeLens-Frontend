import { goto } from '$app/navigation';

// src/routes/+page.server.js
import { redirect } from '@sveltejs/kit';

export function load() {

	// const result = await callGoRoute({
	// 	url: `/public/acc/auth/check`,
	// 	cookies
	// });

	throw redirect(307, '/home');
}
