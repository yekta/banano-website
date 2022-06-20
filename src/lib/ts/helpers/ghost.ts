import { parse } from 'node-html-parser';
import type { HTMLElement as HTMLElementP } from 'node-html-parser';

const ghostUrl = 'https://ghost.banano.cc';
const blogUrl = 'https://banano.cc/blog';

// a function that finds "a" tags that has an href attribute anywhere in the tag that starts with "https://ghost.banano.cc" and replaces it with "/blog"
export function fixATags(dom: HTMLElementP) {
	const aTags = dom.querySelectorAll('a');
	for (let i = 0; i < aTags.length; i++) {
		const aTag = aTags[i];
		const href = aTag.getAttribute('href');
		if (href && href.startsWith(ghostUrl)) {
			aTag.setAttribute('href', href.replace(ghostUrl, blogUrl));
		}
		aTag.setAttribute('rel', 'noopener noreferrer');
	}
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
	const cleanHtml = fixATags(dom);
	return cleanHtml.toString();
}

const isYoutubeUrl = (url: string | undefined) =>
	url && (url.startsWith('https://youtube.com') || url.startsWith('https://www.youtube.com'));
