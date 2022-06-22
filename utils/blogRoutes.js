import axios from 'axios';
import axiosRetry from 'axios-retry';
import 'dotenv/config';
/* import fs from 'fs';*/

axiosRetry(axios, {
	retries: 5,
	retryDelay: (retryCount) => {
		return retryCount * 500;
	}
});

const blogApiUrl = 'https://ghost.banano.cc/ghost/api/content';
const blogApiKey = process.env.VITE_GHOST_KEY;
const shallowPostFields = ['id', 'uuid', 'title', 'slug'];

const url = `${blogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(',')}&limit=500`;
const blogDirectory = '/blog';

export async function getBlogRoutesArray() {
	const pages = ['*'];
	try {
		const res = await axios.get(url);
		const resJson = res.data;
		const routes = resJson.posts.map((p) => `${blogDirectory}/${p.slug}`);
		pages.push(...routes);
		console.log('Pages to fetch:', pages);

		/* const slugFile = `./post-slugs.txt`;
		const slugFileContent = resJson.posts.map((i) => `https://banano.cc/blog/${i.slug}`).join('\n');
		fs.writeFile(slugFile, slugFileContent, function (err) {
			console.log(err);
		});
		console.log('Slug file created:', slugFile); */
	} catch (error) {
		console.log(error);
	}
	return pages;
}
