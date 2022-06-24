import { blogApiKey, blogApiUrl, shallowPostFields } from '$lib/ts/constants/blog';
import type { IBlogPostsShallow } from '$lib/ts/interfaces/Blog';
import type { RequestHandler } from '@sveltejs/kit';
/* import GhostAdminAPI from '@tryghost/admin-api'; */

export const get: RequestHandler = async ({ params }) => {
	try {
		const url = `${blogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(
			','
		)}&limit=12`;
		const res = await fetch(url);
		const resJson: IBlogPostsShallow = await res.json();

		/* 		await adminStuff(); */

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

/* async function adminStuff() {
	const api = new GhostAdminAPI({
		url: 'https://ghost.banano.cc',
		key: String(import.meta.env.VITE_GHOST_ADMIN_KEY),
		version: 'v5.2'
	});

	const res = await api.posts.browse();
	const postIndex = 10;
	const post = res[postIndex];
	const mobileDoc = JSON.parse(post.mobiledoc);
	const cards = mobileDoc.cards;
	for (let i = 0; i < cards.length; i++) {
		const card = cards[i];
		if (card[0] === 'image') {
			card[1].width = 1200;
			card[1].height = 640;
		}
	}
	console.log(mobileDoc.cards);
	console.log(post.title);
	console.log(post.id);
	post.mobiledoc = JSON.stringify(mobileDoc);

	let result = await api.posts.edit(post);

	console.log(result);
} */
