import adapter from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';
import { getBlogPages } from './utils/blogroutelist.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			rehypePlugins: [rehypeExternalLinks]
		})
	],
	kit: {
		adapter: process.env.STATIC ? adapterStatic() : adapter(),
		prerender: {
			concurrency: 10,
			default: true,
			crawl: true,
			entries: [...(await getBlogPages())]
		}
	}
};

export default config;
