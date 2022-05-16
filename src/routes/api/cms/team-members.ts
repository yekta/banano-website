import type { RequestHandler } from '@sveltejs/kit';
import teamMembers from '/src/cms/team-members.md';

export const get: RequestHandler = async (event) => {
	let html = teamMembers.render().html;
	return {
		status: 200,
		body: html
	};
};
