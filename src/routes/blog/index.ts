import { blogApiKey, blogApiUrl, shallowPostFields } from '$lib/ts/constants/blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	try {
		const url = `${blogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(
			','
		)}&limit=12`;
		const res = await fetch(url);
		const resJson = await res.json();
		if (resJson && resJson.posts.length > 0) {
			return {
				status: 200,
				body: { initialPosts: resJson }
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
