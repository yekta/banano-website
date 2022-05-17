import announcements from '$lib/jsons/announcements.json';
import roadmap from '$lib/jsons/roadmap.json';

interface IAnnouncement {
	title: string;
	bodyMd: string;
	date: Date;
	fullMd: string;
	firstPublishedAt: Date;
	lastPublishedAt: Date;
}

interface IRoadmapEntry {
	year: number;
	subentries: IRoadmapSubentry[];
}
interface IRoadmapSubentry {
	month: number;
	monthText: string;
	text: string;
}

export function getAnnouncements() {
	let announcementsArray: IAnnouncement[] = [];
	for (let i = 0; i < announcements.length; i++) {
		let title = announcements[i].node.news_title[0].text;
		let bodyMd = newsBodyToMarkdown(announcements[i].node.news_body);
		let date = new Date(announcements[i].node.date);
		let dateFormatted =
			date.getFullYear() +
			'-' +
			(date.getMonth() + 1 < 10 ? '0' : '') +
			(date.getMonth() + 1) +
			'-' +
			(date.getDate() < 10 ? '0' : '') +
			date.getDate();

		let markdownString = `## ${title}<br />### ${dateFormatted}<br />${bodyMd}`;

		announcementsArray.push({
			title: title,
			bodyMd,
			date,
			firstPublishedAt: new Date(announcements[i].node._meta.firstPublicationDate),
			lastPublishedAt: new Date(announcements[i].node._meta.lastPublicationDate),
			fullMd: markdownString
		});
	}
	let announcementsArraySorted = announcementsArray.sort(
		(a, b) => b.date.getTime() - a.date.getTime()
	);

	let markdown = announcementsArray.map((announcement) => announcement.fullMd).join('<br />');

	return [announcementsArraySorted, markdown];
}

export function getRoadmap() {
	let roadmapEntries: IRoadmapEntry[] = [];
	for (let i = 0; i < roadmap.length; i++) {
		let year = Number(roadmap[i].node.roadmap_column_name[0].text);
		let subentries: IRoadmapSubentry[] = [];
		let items = roadmap[i].node.roadmap_column_items;
		for (let j = 0; j < items.length; j += 2) {
			let monthText = items[j].text.replace(':', '');
			let month = months.indexOf(monthText);
			let text = items[j + 1].text;
			subentries.push({
				month,
				monthText,
				text
			});
		}
		roadmapEntries.push({ year, subentries });
	}

	let roadmapEntriesSorted = roadmapEntries.sort((a, b) => b.year - a.year);
	let markdown = '';
	roadmapEntriesSorted.forEach((entry) => {
		markdown += `## ${entry.year}<br />`;
		entry.subentries.forEach((subentry) => {
			markdown += `### ${subentry.monthText}<br />${subentry.text}<br />`;
		});
	});
	return [roadmapEntriesSorted, markdown];
}

function newsBodyToMarkdown(body: any) {
	let markdown = '';

	body.forEach((paragraph: any) => {
		let text: string = paragraph.text;
		let paragraphEdited = text;

		let currentAddition = 0;
		let spans = paragraph.spans;
		spans.forEach((span: any) => {
			let start = Number(span.start);
			let end = Number(span.end);
			let url = span.data.url;
			let newStr = `[${text.substring(start, end)}](${url})`;
			paragraphEdited = replaceString(
				paragraphEdited,
				start + currentAddition,
				end + currentAddition,
				newStr
			);
			currentAddition += newStr.length - (end - start);
		});

		markdown += paragraphEdited;
	});
	return markdown;
}

function replaceString(str: string, indexStart: number, indexEnd: number, chr: string) {
	return str.substring(0, indexStart) + chr + str.substring(indexEnd);
}

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
