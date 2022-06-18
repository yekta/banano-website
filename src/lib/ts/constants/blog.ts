export const blogApiUrl = 'https://ghost.banano.cc/ghost/api/content';
export const blogApiKey = String(import.meta.env.VITE_GHOST_KEY);
export const shallowPostFields = [
	'id',
	'uuid',
	'title',
	'excerpt',
	'custom_excerpt',
	'slug',
	'created_at',
	'updated_at',
	'published_at',
	'reading_time',
	'featured',
	'feature_image'
];
