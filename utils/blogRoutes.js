import axios from 'axios';
import axiosRetry from 'axios-retry';
import 'dotenv/config';

axiosRetry(axios, {
	retries: 10,
	retryDelay: (retryCount) => {
		return retryCount * 500;
	}
});
//

const utilsBlogApiUrl = 'https://utils.banano.cc/blog';
const blogApiKey = process.env.PUBLIC_GHOST_KEY;
const shallowPostFields = ['slug'];
const limit = 2000;
const blogDirectory = '/blog';

const url = `${utilsBlogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(
	','
)}&limit=${limit}`;

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
	console.log(pages);
	return pages;
}
