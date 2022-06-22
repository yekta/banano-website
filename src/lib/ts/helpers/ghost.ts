import { parse } from 'node-html-parser';
import type { HTMLElement as HTMLElementP } from 'node-html-parser';
import type { IBlogPosts, IBlogPostShallow, IBlogPostsShallow } from '../interfaces/Blog';
import { monthsShort } from '$lib/ts/constants/months';

const ghostUrl = 'https://ghost.banano.cc';
const siteUrl = 'https://banano.cc';
const mediumUrl = 'https://medium.com/banano';
const bananoMediumUser = 'bananocurrency';

// a function that finds "a" tags that has an href attribute anywhere in the tag that starts with "https://ghost.banano.cc" and replaces it with "/blog"
export function fixATags(dom: HTMLElementP) {
	const aTags = dom.querySelectorAll('a');
	for (let i = 0; i < aTags.length; i++) {
		const aTag = aTags[i];
		const href = aTag.getAttribute('href');
		if (href?.startsWith(`${siteUrl}/`)) {
			aTag.setAttribute('href', href.replace(`${siteUrl}/`, '/'));
			aTag.setAttribute('rel', '');
		} else if (href?.startsWith(`${siteUrl}`)) {
			aTag.setAttribute('href', href.replace(`${siteUrl}`, '/'));
			aTag.setAttribute('rel', '');
		} else if (href?.startsWith(ghostUrl)) {
			if (
				href.startsWith(`${ghostUrl}/author/${bananoMediumUser}`) ||
				href.startsWith(`${ghostUrl}/@${bananoMediumUser}`)
			) {
				aTag.setAttribute('href', mediumUrl);
				aTag.setAttribute('target', '_blank');
			} else {
				aTag.setAttribute('href', href.replace(ghostUrl, '/blog'));
				aTag.setAttribute('rel', '');
			}
		} else {
			aTag.setAttribute('target', '_blank');
		}
	}
	return dom;
}

export function fixYoutubeIframes(dom: HTMLElementP) {
	const iFrames = dom.querySelectorAll('iframe');
	for (let i = 0; i < iFrames.length; i++) {
		const iFrame = iFrames[i];
		const src = iFrame.getAttribute('src');
		if (isYoutubeUrl(src)) {
			const width = Number(iFrame.getAttribute('width'));
			const height = Number(iFrame.getAttribute('height'));
			const ratio = height / width;
			iFrame.parentNode.setAttribute('style', `padding-bottom: ${ratio * 100}%`);
			iFrame.setAttribute('style', `position: absolute; width: 100%; height: 100%`);
		}
	}
	return dom;
}

export function cleanHtml(html: string) {
	const dom = parse(html);
	const youtubeCleanedHtml = fixYoutubeIframes(dom);
	const aTagCleanedHtml = fixATags(youtubeCleanedHtml);
	const res = aTagCleanedHtml.toString();
	return res;
}

const isYoutubeUrl = (url: string | undefined) =>
	url && (url.startsWith('https://youtube.com') || url.startsWith('https://www.youtube.com'));

export function postsToShallowPosts(p: IBlogPosts) {
	const shallowPosts: IBlogPostShallow[] = p.posts.map((i) => {
		const { html, feature_image, ...rest } = i;
		const extractedFeatureImage = getFeaturedImageFromHtml(html);
		return { feature_image: feature_image ?? extractedFeatureImage, ...rest };
	});
	const res: IBlogPostsShallow = {
		posts: shallowPosts,
		meta: p.meta
	};
	return res;
}

const getFeaturedImageFromHtml = (html: string) => {
	const dom = parse(html);
	const img = dom.querySelector('img');
	if (img) {
		return img.getAttribute('src');
	}
	return undefined;
};

export const formatDate = (str: string) => {
	const dateObj = new Date(str);
	const monthShort = monthsShort[dateObj.getMonth()];
	const day = dateObj.getDate();
	const year = dateObj.getFullYear();
	return `${monthShort} ${day}, ${year}`;
};
