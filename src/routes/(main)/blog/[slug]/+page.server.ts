import { blogApiKey, utilsBlogApiUrl } from '$ts/constants/blog';
import { cleanHtml } from '$ts/helpers/ghost/ghost';
import type { IBlogPost } from '$ts/interfaces/Blog';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
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
			return { post: postCleaned as any, hasTwitterEmbed };
		} else {
			throw error(404, 'Post not found');
		}
	} catch (e: any) {
		console.log(e);
		throw error(404, 'Post not found');
	}
};
