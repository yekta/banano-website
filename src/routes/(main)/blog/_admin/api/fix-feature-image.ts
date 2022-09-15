import { GHOST_ADMIN_KEY } from '$env/static/private';
import type { IBlogPost } from '$lib/ts/interfaces/Blog';
import type { RequestHandler } from '@sveltejs/kit';
import GhostAdminAPI from '@tryghost/admin-api';

export const GET: RequestHandler = async ({ params, request }) => {
	try {
		const res = await fixImageResponsiveness();
		return {
			status: 200,
			body: { data: res }
		};
	} catch (error) {
		console.log(error);
		return {
			status: 404,
			body: { error: String(error) }
		};
	}
};

const api = new GhostAdminAPI({
	url: 'https://ghost.banano.cc',
	key: GHOST_ADMIN_KEY,
	version: 'v5.2'
});

const postGetCount = 400;
const searchTerm = '/images/max/';

async function fixImageResponsiveness() {
	let arr: string[] = [];
	const res = await api.posts.browse({ limit: postGetCount });

	for (let i = 0; i < res.length; i++) {
		const post: IBlogPost = res[i];

		console.log(`\n\n--- Started (${i + 1}/${res.length}): ${post.title}`);

		const mobileDocString: string = post.mobiledoc;
		const mobileDoc = JSON.parse(mobileDocString);

		let hadAChange = false;
		let featureImage = post.feature_image;
		if (featureImage === null || featureImage === undefined || featureImage === '') continue;

		let featureImageEnd = post.feature_image.split('/').pop();

		if (featureImage.includes(searchTerm)) {
			for (let y = 0; y < mobileDoc.cards.length; y++) {
				const card = mobileDoc.cards[y];
				if (card && card[0] === 'image') {
					let src = card[1].src;
					let srcEnd = src.split('/').pop();
					let srcEndName = srcEnd.split('.')[0];
					let srcEndExtention = srcEnd.split('.')[1];
					if (
						srcEnd === featureImageEnd ||
						srcEndName + '-1.' + srcEndExtention === featureImageEnd
					) {
						post.feature_image = src;
						hadAChange = true;
						console.log('Feature image is set to: ' + src);
						console.log('Had a change');
						arr.push(post.title);
					}
				}
			}
		}

		// update the article
		if (hadAChange) {
			try {
				let { id, feature_image, published_at, updated_at } = post;
				let result = await api.posts.edit({ id, feature_image, published_at, updated_at });
			} catch (error) {
				console.log(error);
			}
		}
		console.log(`--- Completed (${i + 1}/${res.length}): ${post.title}`);
	}

	console.log(`---------------------------`);
	console.log(`FULLY COMPLETED`);
	return arr;
}
