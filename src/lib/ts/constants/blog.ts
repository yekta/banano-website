import { PUBLIC_GHOST_KEY, PUBLIC_TYPESENSE_API_KEY } from '$env/static/public';

export const blogApiUrl = 'https://ghost.banano.cc/ghost/api/content';
export const utilsBlogApiUrl = 'https://utils.banano.cc/blog';
export const blogApiKey = PUBLIC_GHOST_KEY;
export const typesenseApiKey = PUBLIC_TYPESENSE_API_KEY;
export const shallowPostFields = [
	'title',
	'excerpt',
	'custom_excerpt',
	'slug',
	'published_at',
	'feature_image',
	'reading_time'
];
export const excerptLength = 150;
