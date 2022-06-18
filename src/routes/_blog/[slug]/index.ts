import { blogApiUrl } from '$lib/ts/constants/blog';
import type { RequestHandler } from '@sveltejs/kit';
export const get: RequestHandler = async ({ params }) => {
	try {
		const slug = String(params.slug);
		const key = String(import.meta.env.VITE_GHOST_KEY);
		const url = `${blogApiUrl}/posts/slug/${slug}?key=${key}`;
		const res = await fetch(url);
		const resJson = await res.json();
		const post = resJson.posts[0];
		if (post && post.title) {
			return {
				status: 200,
				body: { post }
			};
		} else {
			return {
				status: 404,
				body: { error: 'Post not found' }
			};
		}
	} catch (e: any) {
		return {
			status: 404,
			body: { error: String(e) }
		};
	}
};
