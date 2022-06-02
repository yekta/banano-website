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
	let faucets;
	let announcements;
	let roadmap;

	let testimonials = mdParser(testimonialsMd, 'h3', []).map((r) => r[0]);

	let faq = mdParser(faqMd, 'h3', ['p']).map((r) => ({
		question: r[0],
		answer: r[1]
	}));

	let team = mdParser(teamMd, 'h3', ['p']).map((r) => ({
		nickname: r[0],
		description: r[1]
	}));

	let communityProjects = mdParser(communityProjectsMd, 'h3', ['p', 'h4']).map((r) => {
		let buttonEl = parse(r[2]);
		return {
			title: r[0],
			description: r[1],
			buttonName: buttonEl.innerText,
			buttonUrl: (buttonEl.firstChild as HTMLElementP).getAttribute('href')
		};
	});

	let htmlFaucets = faucetsMd.render().html;
	let htmlAnnouncements = announcementsMd.render().html;
	let htmlRoadmap = roadmapMd.render().html;

	let parsedHtmlFaucets = parse(htmlFaucets);
	let parsedHtmlAnnouncements = parse(htmlAnnouncements);
	let parsedHtmlRoadmap = parse(htmlRoadmap);

	// Faucets
	let titlesFaucets = parsedHtmlFaucets.getElementsByTagName('h3').map((n) => n.text);
	let descriptionsFaucets = parsedHtmlFaucets.getElementsByTagName('p').map((n) => n.text);
	let buttonNameFaucets = parsedHtmlFaucets.getElementsByTagName('a').map((n) => n.text);
	let buttonUrlFaucets = parsedHtmlFaucets
		.getElementsByTagName('a')
		.map((n) => n.getAttribute('href'));
	faucets = titlesFaucets.map((t, i) => ({
		isStopped: t.includes('🛑'),
		title: t.replaceAll(' 🛑', '').replaceAll('🛑', ''),
		description: descriptionsFaucets[i],
		buttonName: buttonNameFaucets[i],
		buttonUrl: String(buttonUrlFaucets[i])
	}));

	// Announcements
	const announcementCount = 12;
	let titleAnnouncements = parsedHtmlAnnouncements.getElementsByTagName('h3').map((n) => n.text);
	let dateAnnouncements = parsedHtmlAnnouncements.getElementsByTagName('h4').map((n) => n.text);
	let bodyAnnouncements = parsedHtmlAnnouncements.getElementsByTagName('p').map((n) => n.innerHTML);
	announcements = titleAnnouncements
		.map((t, i) => ({
			title: t,
			date: new Date(dateAnnouncements[i]),
			body: bodyAnnouncements[i]
		}))
		.slice(0, announcementCount);

	// Roadmap
	let filteredRoadmap: NodeP[] = parsedHtmlRoadmap.childNodes.filter((n) => {
		let nStr = n.toString();
		return nStr.includes('h2') || nStr.includes('h3') || nStr.includes('p');
	});
	let roadmapArrayOfArrays: NodeP[][] = [];
	let h2Indexes: number[] = [];
	filteredRoadmap.forEach((item, index) => {
		if (item.toString().includes('h2')) {
			h2Indexes.push(index);
		}
	});

	for (let i = 0; i < h2Indexes.length; i++) {
		let startIndex = h2Indexes[i];
		let endIndex = h2Indexes[i + 1];
		roadmapArrayOfArrays.push(filteredRoadmap.slice(startIndex, endIndex));
	}

	roadmap = roadmapArrayOfArrays
		.map((nArray: unknown[]) => {
			let nArrayHTML = nArray as HTMLElementP[];
			let title = nArrayHTML.filter((n) => n.rawTagName === 'h2')[0].text;
			let entryTitles = nArrayHTML.filter((n) => n.rawTagName === 'h3').map((n) => n.text);
			let entryBodies = nArrayHTML.filter((n) => n.rawTagName === 'p').map((n) => n.innerHTML);
			return { title, entries: entryTitles.map((t, i) => ({ title: t, body: entryBodies[i] })) };
		})
		.sort((a, b) => b.title.localeCompare(a.title));

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
