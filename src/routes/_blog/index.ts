import Parser from 'rss-parser';
import type { RequestHandler } from '@sveltejs/kit';
import { parse } from 'node-html-parser';
import type { Node as NodeP, HTMLElement as HTMLElementP } from 'node-html-parser';

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

export const get: RequestHandler = async ({ params }) => {
	const feed = await getFeed();
	const posts = feed.items
		.map((item) => {
			const title = item.title;
			const date = new Date(String(item.isoDate));
			const link = item.link;
			const slug = item.link?.split('/')[item.link?.split('/').length - 1].split('?')[0];
			const body = parse(item['content:encoded']);
			const image = body.querySelector('img')?.attributes?.src;
			const description = parse(item['content:encoded']).textContent.slice(0, 150);
			return { title, date, link, slug, image, description };
		})
		.slice(0, 9);
	return {
		status: 200,
		body: { posts }
	};
};
