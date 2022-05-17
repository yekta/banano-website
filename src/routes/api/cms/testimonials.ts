import type { RequestHandler } from '@sveltejs/kit';
import testimonials from '/src/cms/testimonials.md';
import { parse } from 'node-html-parser';

export const get: RequestHandler = async (event) => {
	let html = testimonials.render().html;
	let parsedHtml = parse(html);
	let h1s = parsedHtml.getElementsByTagName('h1').map((n) => n.innerHTML);
	return {
		status: 200,
		body: h1s
	};
};
