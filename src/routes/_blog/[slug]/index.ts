import { blogApiKey, blogApiUrl } from '$lib/ts/constants/blog';
import type { IBlogPosts } from '$lib/ts/interfaces/Blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	try {
		const slug = String(params.slug);
		const url = `${blogApiUrl}/posts/slug/${slug}?key=${blogApiKey}`;
		const res = await fetch(url);
		const resJson: IBlogPosts = await res.json();
		const post = resJson.posts[0];

		if (post && post.title) {
			return {
				status: 200,
				body: { post: JSON.stringify(post) }
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
