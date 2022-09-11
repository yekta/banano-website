import { addWidthAndHeightToImages } from '$lib/ts/helpers/ghost/admin';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request }) => {
	try {
		const res = await addWidthAndHeightToImages();
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
