import type { RequestHandler } from '@sveltejs/kit';
import faqMd from '/content/faq.md';
import teamMd from '/content/team.md';
import faucetsMd from '/content/faucets.md';
import testimonialsMd from '/content/testimonials.md';
import communityProjectsMd from '/content/community-projects.md';
import announcementsMd from '/content/announcements.md';
import roadmapMd from '/content/roadmap.md';
import { parse } from 'node-html-parser';
import type { Node as NodeP, HTMLElement as HTMLElementP } from 'node-html-parser';
import { mdParser } from '$lib/ts/helpers/mdParser';

export const get: RequestHandler = async (event) => {
	let testimonials = mdParser(testimonialsMd, 'h3', []).map((r) => r[0]);

	let faq = mdParser(faqMd, 'h3', ['p']).map((r) => ({
		question: r[0],
		answer: r[1]
	}));

	let team = mdParser(teamMd, 'h3', ['p']).map((r) => ({
		nickname: r[0],
		description: parse(r[1]).textContent
	}));

	const announcementCount = 12;
	let announcements = mdParser(announcementsMd, 'h3', ['h4', 'p'])
		.map((r) => ({
			title: r[0],
			date: new Date(r[1]),
			body: r[2]
		}))
		.slice(0, announcementCount);

	let communityProjects = mdParser(communityProjectsMd, 'h3', ['p', 'h4']).map((r) => ({
		title: r[0],
		description: parse(r[1]).textContent,
		buttonName: parse(r[2]).innerText,
		buttonUrl: (parse(r[2]).firstChild as HTMLElementP).getAttribute('href')
	}));

	let faucets = mdParser(faucetsMd, 'h3', ['p', 'h4']).map((r) => ({
		title: r[0].replaceAll(' 🛑', '').replaceAll('🛑', ''),
		isStopped: r[0].includes('🛑'),
		description: parse(r[1]).textContent,
		buttonName: parse(r[2]).innerText,
		buttonUrl: (parse(r[2]).firstChild as HTMLElementP).getAttribute('href')
	}));

	let roadmapYearsEntries = mdParser(roadmapMd, 'h3', ['p']);
	let roadmap = mdParser(roadmapMd, 'h2', ['h3'])
		.map((o) => {
			let len = o[1].split(' ').length;
			let entries = roadmapYearsEntries.splice(0, len).map((r) => ({ title: r[0], body: r[1] }));
			return {
				title: o[0],
				entries: entries
			};
		})
		.reverse();

	return {
		status: 200,
		body: {
			faq,
			testimonials,
			faucets,
			team,
			communityProjects,
			announcements,
			roadmap
		}
	};
};
