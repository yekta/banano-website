import axios from 'axios';
import 'dotenv/config';

const blogApiUrl = 'https://ghost.banano.cc/ghost/api/content';
const blogApiKey = process.env.VITE_GHOST_KEY;
const shallowPostFields = ['id', 'uuid', 'title', 'slug'];

const url = `${blogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(',')}&limit=500`;
const blogDirectory = '/blog';

export async function getBlogPages() {
	const res = await axios.get(url);
	const resJson = res.data;
	const routes = resJson.posts.map((p) => `${blogDirectory}/${p.slug}`);
	const pages = ['*'];
	pages.push(...routes);

	return pages;
}
