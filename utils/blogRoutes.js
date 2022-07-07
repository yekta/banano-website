import axios from 'axios';
import axiosRetry from 'axios-retry';
import 'dotenv/config';

axiosRetry(axios, {
	retries: 5,
	retryDelay: (retryCount) => {
		return retryCount * 500;
	}
});

const blogApiUrl = 'https://ghost.banano.cc/ghost/api/content';
const blogApiKey = process.env.VITE_GHOST_KEY;
const shallowPostFields = ['id', 'slug'];
const limit = 1000;

const url = `${blogApiUrl}/posts/?key=${blogApiKey}&fields=${shallowPostFields.join(
	','
)}&limit=${limit}`;
const blogDirectory = '/blog';

export async function getBlogRoutesArray() {
	const pages = ['*'];
	try {
		const res = await axios.get(url);
		const resJson = res.data;
		const routes = resJson.posts.map((p) => `${blogDirectory}/${p.slug}`);
		pages.push(...routes);
		console.log('Pages to fetch:', pages);
	} catch (error) {
		console.log(error);
	}
	return pages;
}
