import { canonicalUrl } from '$ts/constants/canonical';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const headers = {
		'Cache-Control': `public, max-age=${3600}, s-max-age=${3600}`,
		'Content-Type': 'text/xml'
	};
	const body = render(sitemaps);
	return new Response(body, { headers });
};

function render(routes: ISitemap[]) {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    	${routes.map((route) => `<sitemap><loc>${canonicalUrl}${route.loc}</loc></sitemap>`).join('')}
    </sitemapindex>`;
	return xml;
}

const sitemaps: ISitemap[] = [
	{
		loc: '/sitemap.xml'
	},
	{
		loc: '/sitemap_blog.xml'
	}
];

interface ISitemap {
	loc: string;
}
