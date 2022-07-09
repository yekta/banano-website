export interface IBlogPost extends IBlogPostShallow {
	html: string;
	mobiledoc: string;
	similars: IBlogPostShallow[];
}

export interface IBlogPostShallow {
	title: string;
	slug: string;
	id: string;
	uid: string;
	feature_image: string;
	excerpt: string;
	custom_excerpt: string;
	published_at: string;
	updated_at: string;
	reading_time: number;
	tags: ITag[];
}

export interface IBlogPostsShallow {
	posts: IBlogPostShallow[];
	meta: {
		pagination: {
			next: number;
			limit: number;
		};
	};
}

export interface IBlogPosts {
	posts: IBlogPost[];
	meta: {
		pagination: {
			next: number;
			limit: number;
		};
	};
}

export interface ITag {
	id: string;
	name: string;
	slug: string;
}

export interface ISearchResult {
	document: {
		custom_excerpt: string;
		excerpt: string;
		published_at: number;
		slug: string;
		tags: string[];
		title: string;
		feature_image: string;
	};
	highlights: ISearchResultHighlight[];
}

interface ISearchResultHighlight {
	field: string;
	matched_tokens: string[];
	snippet: string;
}
