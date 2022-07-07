import { blogApiKey, blogApiUrl } from '$lib/ts/constants/blog';
import type { ITag } from '$lib/ts/interfaces/Blog';
import type { RequestHandler } from '@sveltejs/kit';

const limit = 500;
export const get: RequestHandler = async () => {
	try {
		const url = `${blogApiUrl}/posts/?key=${blogApiKey}&fields=${fields.join(
			','
		)}&formats=${formats.join(',')}&include=${include.join(',')}?limit=${limit}`;
		const res = await fetch(url);
		const resJson = await res.json();
		let posts: IBlogPost[] = resJson.posts;
		let editedPosts = posts.map((post) => {
			let publishedAtTimestamp = new Date(post.published_at).getTime();
			let tags = post.tags.map((tag) => tag.name);
			return {
				title: post.title,
				slug: post.slug,
				id: post.id,
				published_at: publishedAtTimestamp,
				custom_excerpt: post.custom_excerpt,
				excerpt: post.excerpt,
				tags: tags,
				feature_image: post.feature_image,
				plaintext: post.plaintext
			};
		});
		return {
			status: 200,
			body: editedPosts as any,
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

const fields = [
	'id',
	'title',
	'slug',
	'published_at',
	'excerpt',
	'custom_excerpt',
	'feature_image'
];
const include = ['tags'];
const formats = ['mobiledoc', 'html', 'plaintext'];
interface IBlogPost {
	id: string;
	title: string;
	slug: string;
	updated_at: string;
	published_at: string;
	html: string;
	mobiledoc: string;
	plaintext: string;
	excerpt: string;
	custom_excerpt: string;
	tags: ITag[];
	feature_image: string;
}
