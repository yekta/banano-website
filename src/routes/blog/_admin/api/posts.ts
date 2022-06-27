import { blogApiKey, blogApiUrl } from '$lib/ts/constants/blog';
import type { IBlogPosts } from '$lib/ts/interfaces/Blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	try {
		const url = `${blogApiUrl}/posts?key=${blogApiKey}&include=tags?limit=500`;
		const res = await fetch(url);
		const resJson: IBlogPosts = await res.json();
		const posts = resJson.posts;
		return {
			status: 200,
			body: posts as any,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	} catch (e: any) {
		console.log(e);
		return {
			status: 404,
			body: { error: String(e) }
		};
	}
};
