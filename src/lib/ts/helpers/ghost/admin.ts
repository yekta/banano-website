import { GHOST_ADMIN_KEY } from '$env/static/private';
import GhostAdminAPI from '@tryghost/admin-api';
import probe from 'probe-image-size';

const postGetCount = 10;

const api = new GhostAdminAPI({
	url: 'https://ghost.banano.cc',
	key: GHOST_ADMIN_KEY,
	version: 'v5.2'
});

export async function addWidthAndHeightToImages() {
	let arr: any[] = [];
	const res = await api.posts.browse({ limit: postGetCount });
	for (let i = 0; i < res.length; i++) {
		const post = res[i];
		console.log(`\n\n--- Started: ${post.title}`);

		const mobileDoc = JSON.parse(post.mobiledoc);
		const cards = mobileDoc.cards;

		let hadAChange = false;

		for (let i = 0; i < cards.length; i++) {
			const card = cards[i];
			if (card[0] === 'image' && (!card[1].width || !card[1].height)) {
				arr.push(card);
				try {
					let result = await probe(card[1].src);
					let { width, height } = result;
					card[1].width = width;
					card[1].height = height;
					hadAChange = true;
					console.log(`src:${card[1].src}, width: ${width}, height: ${height}`);
				} catch (error) {
					console.log(error);
				}
			}
		}

		// update the article
		if (hadAChange) {
			post.mobiledoc = JSON.stringify(mobileDoc);
			try {
				let result = await api.posts.edit(post);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('No changes');
		}
		console.log(`--- Completed: ${post.title}`);
	}

	console.log(`---------------------------`);
	console.log(`FULLY COMPLETED`);
	return arr;
}

export interface IFindReplace {
	regex: RegExp;
	replaceWith: string;
}

export async function findAndReplace(findReplaceArr: IFindReplace[]) {
	let arr: string[] = [];
	const res = await api.posts.browse({ limit: postGetCount });

	for (let i = 0; i < res.length; i++) {
		const post = res[i];
		console.log(`\n\n--- Started: ${post.title}`);

		const mobileDocString: string = post.mobiledoc;

		let hadAChange = false;

		let newMobileDocString = mobileDocString;
		for (let i = 0; i < findReplaceArr.length; i++) {
			const { regex, replaceWith } = findReplaceArr[i];
			newMobileDocString = newMobileDocString.replace(regex, replaceWith);
		}

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
		console.log(`--- Completed: ${post.title}`);
	}

	console.log(`---------------------------`);
	console.log(`FULLY COMPLETED`);
	return arr;
}
