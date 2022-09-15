import { GHOST_ADMIN_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import GhostAdminAPI from '@tryghost/admin-api';

export const GET: RequestHandler = async ({ params, request }) => {
	try {
		const res = await fixATags();
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

const postGetCount = 15;

async function fixATags() {
	let arr: string[] = [];
	const res = await api.posts.browse({ limit: postGetCount });

	for (let i = 0; i < res.length; i++) {
		const post = res[i];

		console.log(`\n\n--- Started (${i + 1}/${res.length}): ${post.title}`);

		const mobileDocString: string = post.mobiledoc;
		const mobileDoc = JSON.parse(mobileDocString);

		let hadAChange = false;

		for (let j = 0; j < mobileDoc.markups.length; j++) {
			let markup = mobileDoc.markups[j];
			let type = markup[0];
			let arr = markup[1];
			if (type === 'a' && arr[1]) {
				if (
					arr[1].startsWith('https://banano.cc') ||
					arr[1].startsWith('https://ghost.banano.cc')
				) {
				} else {
					mobileDoc.markups[j][1][2] = 'rel';
					mobileDoc.markups[j][1][3] = 'noopener';
					hadAChange = true;
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
