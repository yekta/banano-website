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

export const get: RequestHandler = async ({ params }) => {
	const id = params.id;
	const feed = await getFeed();
	const post = feed.items
		.map((item) => {
			const content = item['content:encoded'];
			const title = item.title;
			const date = new Date(String(item.isoDate));
			const link = item.link;
			const slug = item.link?.split('/')[item.link?.split('/').length - 1].split('?')[0];
			return { title, content, date, link, slug };
		})
		.filter((i) => i.slug === id)[0];
	if (!post) {
		return {
			status: 404,
			body: {
				error: 'Post not found'
			}
		};
	}
	return {
		status: 200,
		body: { post }
	};
};
