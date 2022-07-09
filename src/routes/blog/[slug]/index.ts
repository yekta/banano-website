import { blogApiKey, utilsBlogApiUrl } from '$lib/ts/constants/blog';
import { cleanHtml } from '$lib/ts/helpers/ghost/ghost';
import type { IBlogPost } from '$lib/ts/interfaces/Blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	try {
		const slug = String(params.slug);
		const url = `${utilsBlogApiUrl}/posts/slug/${slug}?key=${blogApiKey}`;
		const res = await fetch(url);
		const resJson: IBlogPost = await res.json();
		const post = resJson;

		const { html, ...rest } = post;

		const { html: cleanedHtml, hasTwitterEmbed } = cleanHtml(html);
		const postCleaned: IBlogPost = { html: cleanedHtml, ...rest };

		if (postCleaned && postCleaned.title) {
			return {
				status: 200,
				body: { post: postCleaned as any, hasTwitterEmbed }
			};
		} else {
			return {
				status: 404,
				body: { error: 'Post not found' }
			};
		}
	} catch (e: any) {
		console.log(e);
		return {
			status: 404,
			body: { error: String(e) }
		};
	}
};
