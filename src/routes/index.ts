import type { RequestHandler } from '@sveltejs/kit';
import faqMd from '/content/faq.md';
import teamMd from '/content/team.md';
import testimonialsMd from '/content/testimonials.md';
import communityProjectsMd from '/content/community-projects.md';
import announcementsMd from '/content/announcements.md';
import roadmapMd from '/content/roadmap.md';
import { parse } from 'node-html-parser';
import type { Node as NodeP, HTMLElement as HTMLElementP } from 'node-html-parser';

export const get: RequestHandler = async (event) => {
	let faq;
	let team;
	let testimonials;
	let communityProjects;
	let announcements;
	let roadmap;

	let htmlFaq = faqMd.render().html;
	let htmlTestimonials = testimonialsMd.render().html;
	let htmlTeam = teamMd.render().html;
	let htmlCommunityProjects = communityProjectsMd.render().html;
	let htmlAnnouncements = announcementsMd.render().html;
	let htmlRoadmap = roadmapMd.render().html;

	let parsedHtmlFaq = parse(htmlFaq);
	let parsedHtmlTestimonials = parse(htmlTestimonials);
	let parsedHtmlTeam = parse(htmlTeam);
	let parsedHtmlCommunityProjects = parse(htmlCommunityProjects);
	let parsedHtmlAnnouncements = parse(htmlAnnouncements);
	let parsedHtmlRoadmap = parse(htmlRoadmap);

	// FAQ
	let questions = parsedHtmlFaq.getElementsByTagName('h3').map((n) => n.text);
	let answers = parsedHtmlFaq.getElementsByTagName('p').map((n) => n.innerHTML);
	faq = questions.map((q, index) => ({
		question: q,
		answer: answers[index]
	}));

	// Team
	let nicknamesTeam = parsedHtmlTeam.getElementsByTagName('h3').map((n) => n.text);
	let descriptionsTeam = parsedHtmlTeam.getElementsByTagName('p').map((n) => n.text);
	team = nicknamesTeam.map((n, i) => ({
		nickname: n,
		description: descriptionsTeam[i]
	}));

	// Testimonials
	testimonials = parsedHtmlTestimonials.getElementsByTagName('h3').map((n) => n.text);

	// Community Projects
	let titlesCommunityProjects = parsedHtmlCommunityProjects
		.getElementsByTagName('h3')
		.map((n) => n.innerHTML);
	let descriptionsCommunityProjects = parsedHtmlCommunityProjects
		.getElementsByTagName('p')
		.map((n) => n.innerHTML);
	let buttonNameCommunityProjects = parsedHtmlCommunityProjects
		.getElementsByTagName('a')
		.map((n) => n.innerText);
	let buttonUrlCommunityProjects = parsedHtmlCommunityProjects
		.getElementsByTagName('a')
		.map((n) => n.getAttribute('href'));
	communityProjects = titlesCommunityProjects.map((t, i) => ({
		title: t,
		description: descriptionsCommunityProjects[i],
		buttonName: buttonNameCommunityProjects[i],
		buttonUrl: String(buttonUrlCommunityProjects[i])
	}));

	// Announcements
	let titleAnnouncements = parsedHtmlAnnouncements
		.getElementsByTagName('h3')
		.map((n) => n.innerHTML);
	let dateAnnouncements = parsedHtmlAnnouncements
		.getElementsByTagName('h4')
		.map((n) => n.innerHTML);
	let bodyAnnouncements = parsedHtmlAnnouncements.getElementsByTagName('p').map((n) => n.innerHTML);
	announcements = titleAnnouncements
		.map((t, i) => ({
			title: t,
			date: new Date(dateAnnouncements[i]),
			body: bodyAnnouncements[i]
		}))
		.slice(0, 12);

	// Roadmap
	let filteredRoadmap: NodeP[] = parsedHtmlRoadmap.childNodes.filter((n) => {
		let nStr = n.toString();
		return nStr.includes('h2') || nStr.includes('h3') || nStr.includes('p');
	});
	let roadmapArrayOfArrays: NodeP[][] = [];
	let lastSliceIndex = 0;
	filteredRoadmap.forEach((item, index) => {
		if (index !== 0 && (item.toString().includes('h2') || index === filteredRoadmap.length - 1)) {
			roadmapArrayOfArrays.push(filteredRoadmap.slice(lastSliceIndex, index));
			lastSliceIndex = index;
		}
	});

	roadmap = roadmapArrayOfArrays.map((nArray: unknown[]) => {
		let nArrayHTML = nArray as HTMLElementP[];
		let title = nArrayHTML.filter((n) => n.rawTagName === 'h2')[0].text;
		let entryTitles = nArrayHTML.filter((n) => n.rawTagName === 'h3').map((n) => n.text);
		let entryBodies = nArrayHTML.filter((n) => n.rawTagName === 'p').map((n) => n.innerHTML);
		return { title, entries: entryTitles.map((t, i) => ({ title: t, body: entryBodies[i] })) };
	});

	return {
		status: 200,
		body: {
			team,
			faq,
			testimonials,
			communityProjects,
			announcements,
			roadmap
		}
	};
};
