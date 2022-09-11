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
	key: String(import.meta.env.VITE_GHOST_ADMIN_KEY),
	version: 'v5.2'
});

const postGetCount = 15;
const searchTerm = '/images/max/';

async function fixImageResponsiveness() {
	let arr: string[] = [];
	const res = await api.posts.browse({ limit: postGetCount });

	for (let i = 0; i < res.length; i++) {
		const post = res[i];

		console.log(`\n\n--- Started (${i + 1}/${res.length}): ${post.title}`);

		const mobileDocString: string = post.mobiledoc;
		const mobileDoc = JSON.parse(mobileDocString);

		let hadAChange = false;

		for (let y = 0; y < mobileDoc.cards.length; y++) {
			const card = mobileDoc.cards[y];
			if (card && card[0] === 'image') {
				let src = card[1].src;
				if (src.includes(searchTerm)) {
					let error = false;
					try {
						console.log(`getting matching src: ${src}`);
						const res = await fetch(`http://localhost:3000/blog/admin/api/upload-image?url=${src}`);
						const resJson = await res.json();
						const { url } = resJson;
						if (
							url &&
							url !== undefined &&
							url !== null &&
							url !== '' &&
							url !== 'undefined' &&
							url !== 'null'
						) {
							card[1].src = url;
							hadAChange = true;
							console.log(`set matching src: ${url}`);
						}
					} catch (e) {
						console.log(e);
						error = true;
					}
				} else {
					console.log(`not matching src: ${src}`);
				}
			}
		}

		const newMobileDocString = JSON.stringify(mobileDoc);

		if (newMobileDocString !== mobileDocString) {
			console.log('Had a change');
			arr.push(post.title);
			hadAChange = true;
		} else {
			console.log('No changes');
		}

		// update the article
		if (hadAChange) {
			post.mobiledoc = newMobileDocString;
			try {
				let result = await api.posts.edit(post);
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
