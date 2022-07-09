import adapter from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';
import { getBlogRoutesArray } from './utils/blogRoutes.js';

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
			default: true,
			crawl: true,
			concurrency: 30,
			entries: process.env.BUILD ? [...(await getBlogRoutesArray())] : ['*'],
			onError: 'continue'
		},
		// inline all stylesheets smaller than 15kb
		inlineStyleThreshold: 15360
	}
};

export default config;
