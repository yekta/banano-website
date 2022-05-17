import type { RequestHandler } from '@sveltejs/kit';
import questions from '/src/cms/questions.md';
import { parse } from 'node-html-parser';

export const get: RequestHandler = async (event) => {
	let html = questions.render().html;
	let parsedHtml = parse(html);
	let h1s = parsedHtml.getElementsByTagName('h1').map((n) => n.innerHTML);
	let p1s = parsedHtml.getElementsByTagName('p').map((n) => n.innerHTML);
	let arr = h1s.map((h, index) => {
		return {
			question: h,
			answer: p1s[index]
		};
	});
	return {
		status: 200,
		body: arr
	};
};
