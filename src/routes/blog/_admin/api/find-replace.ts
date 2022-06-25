import { findAndReplace, type IFindReplace } from '$lib/ts/helpers/ghost/admin';
import type { RequestHandler } from '@sveltejs/kit';

const ghostUrl = 'https://ghost.banano.cc';
const mediumUrl = 'https://medium.com/banano';
const bananoMediumUser = 'bananocurrency';

const findAndReplaceArr: IFindReplace[] = [
	/* {
		regex: new RegExp(`${ghostUrl}/author/${bananoMediumUser}`, 'g'),
		replaceWith: mediumUrl
	},
	{
		regex: new RegExp(`${ghostUrl}/@${bananoMediumUser}`, 'g'),
		replaceWith: mediumUrl
	}, */
	{
		regex: new RegExp(`This is a test y y y`, 'g'),
		replaceWith: 'Yekta'
	}
];

export const get: RequestHandler = async ({ params, request }) => {
	try {
		const res = await findAndReplace(findAndReplaceArr);
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
