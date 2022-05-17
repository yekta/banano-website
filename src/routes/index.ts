import type { RequestHandler } from '@sveltejs/kit';
import faqMd from '/src/cms/faq.md';
import teamMd from '/src/cms/team.md';
import testimonialsMd from '/src/cms/testimonials.md';
import { parse } from 'node-html-parser';

export const get: RequestHandler = async (event) => {
	let htmlFaq = faqMd.render().html;
	let htmlTestimonials = testimonialsMd.render().html;
	let htmlTeam = teamMd.render().html;

	let parsedHtmlFaq = parse(htmlFaq);
	let parsedHtmlTestimonials = parse(htmlTestimonials);
	let parsedHtmlTeam = parse(htmlTeam);

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

	return {
		status: 200,
		body: {
			team,
			faq,
			testimonials
		}
	};
};
