import type { RequestHandler } from '@sveltejs/kit';
import questions from '/src/cms/questions.md';

export const get: RequestHandler = async (event) => {
	let html = questions.render().html;
	return {
		status: 200,
		body: html
	};
};
