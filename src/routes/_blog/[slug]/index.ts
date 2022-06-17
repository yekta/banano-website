import type { RequestHandler } from '@sveltejs/kit';
export const get: RequestHandler = async ({ params }) => {
	try {
		const slug = params.slug;
		const postsUrl = 'https://utils.banano.cc/medium-posts';
		const res = await fetch(`${postsUrl}/${slug}`);
		const post = await res.json();
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
