import { blogApiUrl } from '$lib/ts/constants/blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	try {
		const key = String(import.meta.env.VITE_GHOST_KEY);
		const fields = [
			'id',
			'uuid',
			'title',
			'excerpt',
			'custom_excerpt',
			'slug',
			'created_at',
			'updated_at',
			'published_at',
			'reading_time',
			'featured',
			'feature_image'
		];
		const url = `${blogApiUrl}/posts?key=${key}&fields=${fields.join(',')}`;
		const res = await fetch(url);
		const resJson = await res.json();
		if (resJson && resJson.posts.length > 0) {
			return {
				status: 200,
				body: { posts: resJson.posts.slice(0, 9) }
			};
		} else {
			return {
				status: 404,
				body: { error: 'Posts not found' }
			};
		}
	} catch (error) {
		return {
			status: 404,
			body: { error: String(error) }
		};
	}
};
