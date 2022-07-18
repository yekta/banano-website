import { utilsBlogApiUrl } from '$lib/ts/constants/blog';
import { canonicalUrl } from '$lib/ts/constants/canonical';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const allBlogRoutes = await getBlogRoutesArray();
	const allRoutes = [...definedRoutes, ...allBlogRoutes];
	const headers = {
		'Cache-Control': `max-age=${3600}, s-max-age=${3600}`,
		'Content-Type': 'text/xml'
	};
	const body = render(allRoutes);
	return {
		status: 200,
		headers,
		body
	};
};

function render(routes: IRoute[]) {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    	${routes
				.map(
					(route) =>
						`<url><loc>${canonicalUrl}${route.loc}</loc><lastmod>${route.lastmod}</lastmod><changefreq>${route.changefreq}</changefreq></url>`
				)
				.join('')}
    </urlset>`;
	return xml;
}

async function getBlogRoutesArray() {
	const routes: IRoute[] = [];
	const fields = ['slug', 'updated_at'];
	const limit = 2000;
	const url = `${utilsBlogApiUrl}/posts?key=${blogApiKey}&fields=${fields.join(
		','
	)}&limit=${limit}`;
	let res: Response | undefined;
	try {
		res = await fetch(url);
	} catch (error) {
		console.log(error);
		try {
			res = await fetch(ghostUrl);
		} catch (error) {
			console.log(error);
			return routes;
		}
	}
	const resJson = await res?.json();
	const posts: IPost[] = resJson.posts;
	const blogRoutes = posts.map((p) => {
		let date = new Date(p.updated_at);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let dateString = `${year}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day}`;
		let route: IRoute = {
			loc: `${blogDirectory}/${p.slug}`,
			lastmod: dateString,
			changefreq: 'weekly'
		};
		return route;
	});
	routes.push(...blogRoutes);
	return routes;
}

const blogApiUrl = 'https://ghost.banano.cc/ghost/api/content';
const blogApiKey = String(import.meta.env.VITE_GHOST_KEY);
const shallowPostFields = ['slug', 'updated_at'];
const limit = 1000;

const ghostUrl = `${blogApiUrl}/posts/?key=${blogApiKey}&fields=${shallowPostFields.join(
	','
)}&limit=${limit}`;

const blogDirectory = '/blog';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const todayString = `${year}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day}`;

const definedRoutes: IRoute[] = [
	{
		loc: '/',
		lastmod: todayString,
		changefreq: 'daily'
	},
	{
		loc: '/blog',
		lastmod: todayString,
		changefreq: 'daily'
	},
	{
		loc: '/paperwallet',
		lastmod: todayString,
		changefreq: 'daily'
	},
	{
		loc: '/yellowpaper',
		lastmod: todayString,
		changefreq: 'daily'
	},
	{
		loc: '/redeem',
		lastmod: todayString,
		changefreq: 'daily'
	},
	{
		loc: '/presskit',
		lastmod: todayString,
		changefreq: 'daily'
	}
];

interface IRoute {
	loc: string;
	lastmod: string;
	changefreq: string;
}

interface IPost {
	slug: string;
	updated_at: string;
}
