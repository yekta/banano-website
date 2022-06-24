import type { RequestHandler } from '@sveltejs/kit';
import GhostAdminAPI from '@tryghost/admin-api';

const api = new GhostAdminAPI({
	url: 'https://ghost.banano.cc',
	key: String(import.meta.env.VITE_GHOST_ADMIN_KEY),
	version: 'v5.2'
});

export const get: RequestHandler = async ({ params }) => {
	try {
		const posts = await api.posts.browse({
			limit: 500,
			fields: ['id', 'title', 'feature_image', 'updated_at'],
			include: ['tags']
		});
		const tags = await api.tags.browse({ limit: 500 });
		if (posts && tags) {
			return {
				status: 200,
				body: { posts, tags }
			};
		} else {
			return {
				status: 404,
				body: { error: 'Posts not found' }
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
