import {
	blogApiKey,
	shallowPostFields,
	typesenseApiKey,
	utilsBlogApiUrl
} from '$ts/constants/blog';
import type { ISearchResult } from '$ts/interfaces/Blog';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	try {
		const urlPosts = `${utilsBlogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(
			','
		)}&limit=12`;

		let searchResult: ISearchResult[] = [];
		const urlSearch = 'https://typesense.banano.cc/collections/blog-posts/documents/search';
		const query_by = ['title', 'slug', 'excerpt', 'custom_excerpt'];
		const include_fields = ['title', 'slug', 'excerpt', 'custom_excerpt', 'feature_image'];

		const resPostsPromise = fetch(urlPosts);
		const resSearchPromise = fetch(
			`${urlSearch}?x-typesense-api-key=${typesenseApiKey}&q=&query_by=${query_by.join(
				','
			)}&include_fields=${include_fields.join(',')}&page=1&per_page=10`
		);

		const [resPosts, resSearch] = await Promise.all([resPostsPromise, resSearchPromise]);
		const [resPostsJson, resJsonSearch] = await Promise.all([resPosts.json(), resSearch.json()]);

		if (resJsonSearch && resJsonSearch.hits) {
			searchResult = resJsonSearch.hits;
		}

		let posts = resPostsJson;

		if (resPostsJson && resPostsJson.posts.length > 0) {
			return { initialPosts: posts, searchResult: searchResult };
		} else {
			throw error(404, 'Posts not found');
		}
	} catch (err) {
		console.log(err);
		throw error(404, 'Posts not found');
	}
};
