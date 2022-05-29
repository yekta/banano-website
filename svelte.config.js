import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';
import svg from '@poppanator/sveltekit-svg';

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
		adapter: adapter(),
		prerender: {
			default: true
		},
		vite: {
			plugins: [svg({ includePaths: ['./src/lib/components/backgrounds/'], svgoOptions: false })]
		}
	}
};

export default config;
