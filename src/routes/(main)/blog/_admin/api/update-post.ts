import { GHOST_ADMIN_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import GhostAdminAPI from '@tryghost/admin-api';

const api = new GhostAdminAPI({
	url: 'https://ghost.banano.cc',
	key: GHOST_ADMIN_KEY,
	version: 'v5.2'
});

export const put: RequestHandler = async ({ params, request }) => {
	try {
		const res = await request.json();
		const post = res.post;
		if (post && post.title) {
			let res = await api.posts.edit(post);
			return {
				status: 200,
				body: { data: `ok: ${post.title}` }
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
