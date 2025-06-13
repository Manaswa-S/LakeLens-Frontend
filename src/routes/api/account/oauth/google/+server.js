
import {json} from '@sveltejs/kit'
import { BACKEND_URL } from '$env/static/private';

export async function GET({request, cookies}) {

    const bend = BACKEND_URL;
    const url = `/public/acc/oauth`;
    
    try {
        let response = await fetch(`${bend}${url}`);	
        const result = await response.json();
        
        if (result.state != null) {
            const stttl = parseInt(result.stttl);
            if (!isNaN(stttl)) {
                cookies.set('lens_g_oas', result.state, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: true,
                    maxAge: stttl
                });
                return json(result.url, {status: 200});
            }
        }

    } catch (err) {
        console.error("Error contacting backend:", err);
    }

    return json(null, {status: 500});
}
