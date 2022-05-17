import type { RequestHandler } from '@sveltejs/kit';
import testimonials from '/src/cms/testimonials.md';

export const get: RequestHandler = async (event) => {
	let html = testimonials.render().html;
	const regex = /(?<=<h1>)(.*)(?=<\/h1>)/g;
	let arr = html.match(regex);
	return {
		status: 200,
		body: arr
	};
};
