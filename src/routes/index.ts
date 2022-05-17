import type { RequestHandler } from '@sveltejs/kit';
import faqMd from '/content/faq.md';
import teamMd from '/content/team.md';
import testimonialsMd from '/content/testimonials.md';
import communityProjectsMd from '/content/community-projects.md';
import { parse } from 'node-html-parser';

export const get: RequestHandler = async (event) => {
	let htmlFaq = faqMd.render().html;
	let htmlTestimonials = testimonialsMd.render().html;
	let htmlTeam = teamMd.render().html;
	let htmlCommunityProjects = communityProjectsMd.render().html;

	let parsedHtmlFaq = parse(htmlFaq);
	let parsedHtmlTestimonials = parse(htmlTestimonials);
	let parsedHtmlTeam = parse(htmlTeam);
	let parsedHtmlCommunityProjects = parse(htmlCommunityProjects);

	let questions = parsedHtmlFaq.getElementsByTagName('h3').map((n) => n.innerHTML);
	let answers = parsedHtmlFaq.getElementsByTagName('p').map((n) => n.innerHTML);
	let faq = questions.map((q, index) => ({
		question: q,
		answer: answers[index]
	}));

	let nicknamesTeam = parsedHtmlTeam.getElementsByTagName('h3').map((n) => n.innerHTML);
	let descriptionsTeam = parsedHtmlTeam.getElementsByTagName('p').map((n) => n.innerHTML);
	let team = nicknamesTeam.map((n, i) => ({
		nickname: n,
		description: descriptionsTeam[i]
	}));

	let testimonials = parsedHtmlTestimonials.getElementsByTagName('h3').map((n) => n.innerHTML);

	let titlesCommunityProjects = parsedHtmlCommunityProjects
		.getElementsByTagName('h3')
		.map((n) => n.innerHTML);
	let descriptionsCommunityProjects = parsedHtmlCommunityProjects
		.getElementsByTagName('p')
		.map((n) => n.innerHTML);
	let buttonNameCommunityProjects = parsedHtmlCommunityProjects
		.getElementsByTagName('a')
		.map((n) => n.innerText);
	let buttonLinkCommunityProjects = parsedHtmlCommunityProjects
		.getElementsByTagName('a')
		.map((n) => n.getAttribute('href'));
	let communityProjects = titlesCommunityProjects.map((t, i) => ({
		title: t,
		description: descriptionsCommunityProjects[i],
		buttonName: buttonNameCommunityProjects[i],
		buttonUrl: buttonLinkCommunityProjects[i]
	}));

	return {
		status: 200,
		body: {
			team,
			faq,
			testimonials,
			communityProjects
		}
	};
};
