import { blogApiKey, blogApiUrl, shallowPostFields } from '$lib/ts/constants/blog';
import type { IBlogPostsShallow } from '$lib/ts/interfaces/Blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	try {
		const url = `${blogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(
			','
		)}&limit=12`;
		const res = await fetch(url);
		const resJson: IBlogPostsShallow = await res.json();

		if (resJson && resJson.posts.length > 0) {
			return {
				status: 200,
				body: { initialPosts: resJson as any }
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
