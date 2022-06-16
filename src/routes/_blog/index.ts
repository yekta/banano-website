import Parser from 'rss-parser';
import type { RequestHandler } from '@sveltejs/kit';

export type CustomFeed = { title: string; description: string };
export type CustomItem = { 'content:encoded': string };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
	customFields: {
		feed: ['title', 'description'],
		item: ['content:encoded']
	}
});
const bananoRssUrl = 'https://medium.com/feed/banano';

async function getFeed() {
	const feed = await parser.parseURL(bananoRssUrl);
	return feed;
}

export const get: RequestHandler = async (event) => {
	const feed = await getFeed();
	let posts = feed.items.map((item) => {
		let content = item['content:encoded'];
		let title = item.title;
		return { title, content };
	});
	return {
		status: 200,
		body: {
			posts
		}
	};
};
