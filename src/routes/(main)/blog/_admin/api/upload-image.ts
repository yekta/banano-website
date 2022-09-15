import type { RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { FormData } from 'formdata-node';
import { GHOST_ADMIN_KEY } from '$env/static/private';

const key = GHOST_ADMIN_KEY;
const [id, secret] = key.split(':');

// Create the token (including decoding secret)
const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
	keyid: id,
	algorithm: 'HS256',
	expiresIn: '30m',
	audience: `/admin/`
});

export const GET: RequestHandler = async ({ request, params, url }) => {
	try {
		const _url = String(url.searchParams.get('url'));
		const res = await fetch(_url);
		const blob = await res.blob();
		const formData = new FormData();
		const filename = _url.split('/').pop();
		formData.append('file', blob, filename);

		if (formData) {
			let res = await fetch('https://ghost.banano.cc/ghost/api/admin/images/upload/', {
				method: 'POST',
				body: formData as BodyInit,
				headers: {
					Authorization: `Ghost ${token}`
				}
			});
			const json = await res.json();
			const url = json.images[0].url;
			return {
				status: 200,
				body: { url: url }
			};
		} else {
			return {
				status: 404,
				body: { error: 'Something went wrong' }
			};
		}
	} catch (error) {
		console.log(error);
		return {
			status: 404,
			body: { error: String(error) }
		};
	}
};
