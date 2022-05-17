import type { RequestHandler } from '@sveltejs/kit';
import team from '/src/cms/team.md';
import { parse } from 'node-html-parser';

export const get: RequestHandler = async (event) => {
	let html = team.render().html;
	let parsedHtml = parse(html);
	let h1s = parsedHtml.getElementsByTagName('h1').map((n) => n.innerHTML);
	let p1s = parsedHtml.getElementsByTagName('p').map((n) => n.innerHTML);
	let arr = h1s.map((h, i) => {
		return {
			nickname: h,
			description: p1s?.[i]
		};
	});
	return {
		status: 200,
		body: arr
	};
};
