import type { RequestHandler } from '@sveltejs/kit';
import team from '/src/cms/team.md';

export const get: RequestHandler = async (event) => {
	let html = team.render().html;
	const regexH1 = /(?<=<h1>)(.*)(?=<\/h1>)/g;
	const regexP1 = /(?<=<p>)(.*)(?=<\/p>)/g;
	let h1s = html.match(regexH1);
	let p1s = html.match(regexP1);
	let arr = h1s?.map((h, i) => {
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
