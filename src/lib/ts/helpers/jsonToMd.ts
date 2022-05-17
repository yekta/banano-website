import announcements from '$lib/jsons/announcements.json';

interface IAnnouncement {
	title: string;
	bodyMd: string;
	date: Date;
	fullMd: string;
	firstPublishedAt: Date;
	lastPublishedAt: Date;
}

interface IRoadmap {
	year: number;
	entries: IRoadmapEntry[];
}

interface IRoadmapEntry {
	title: string;
	month: string;
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

		let markdownString = `### ${title}<br />#### ${dateFormatted}<br />${bodyMd}`;

		announcementsArray.push({
			title: title,
			bodyMd,
			date,
			firstPublishedAt: new Date(announcements[i].node._meta.firstPublicationDate),
			lastPublishedAt: new Date(announcements[i].node._meta.lastPublicationDate),
			fullMd: markdownString
		});
	}
	let announcementsArraySorted = announcementsArray.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});

	let markdown = announcementsArray.map((announcement) => announcement.fullMd).join('<br />');

	return [announcementsArraySorted, markdown];
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
