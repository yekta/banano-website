export interface IBlogPost extends IBlogPostShallow {
	html: string;
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
	reading_time: number;
	tags: ITag[];
}

export interface IBlogPosts {
	posts: IBlogPostShallow[];
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
