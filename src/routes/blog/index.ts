import { blogApiKey, blogApiUrl, shallowPostFields, typesenseApiKey } from '$lib/ts/constants/blog';
import type { IBlogPostsShallow, ISearchResult } from '$lib/ts/interfaces/Blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	try {
		const url = `${blogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(
			','
		)}&limit=12`;

		let searchResult: ISearchResult[] = [];
		const urlSearch = 'https://typesense.banano.cc/collections/blog-posts/documents/search';
		const query_by = ['title', 'slug', 'excerpt', 'custom_excerpt'];
		const include_fields = ['title', 'slug', 'excerpt', 'custom_excerpt', 'feature_image'];

		const resPromise = fetch(url);
		const resSearchPromise = fetch(
			`${urlSearch}?x-typesense-api-key=${typesenseApiKey}&q=&query_by=${query_by.join(
				','
			)}&include_fields=${include_fields.join(',')}&page=1&per_page=10`
		);

		const [res, resSearch] = await Promise.all([resPromise, resSearchPromise]);
		const [resJsonSearch, resJson] = await Promise.all([resSearch.json(), res.json()]);

		if (resJsonSearch && resJsonSearch.hits) {
			searchResult = resJsonSearch.hits;
		}

		if (resJson && resJson.posts.length > 0) {
			return {
				status: 200,
				body: { initialPosts: resJson as any, searchResult: searchResult as any }
			};
		} else {
			return {
				status: 404,
				body: { error: 'Posts not found' }
			};
		}
	} catch (error) {
		console.log(error);
		return {
			status: 404,
			body: { error: String(error) }
		};
	}
};
