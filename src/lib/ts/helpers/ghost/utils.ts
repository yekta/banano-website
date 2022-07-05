import { monthsShort } from '$lib/ts/constants/months';
import { getSignedProxyUrl } from '../imgproxy';

export const defaultWidths = [512, 768, 1024, 1536, 2048];

export const formatDate = (str: string) => {
	const dateObj = new Date(str);
	const monthShort = monthsShort[dateObj.getMonth()];
	const day = dateObj.getDate();
	const year = dateObj.getFullYear();
	return `${monthShort} ${day}, ${year}`;
};

export function getSrcAndSrcSetFromUrl(url: string, widths = defaultWidths) {
	const src = getSignedProxyUrl(url, 2048);
	const srcset = widths.map((width) => `${getSignedProxyUrl(url, width)} ${width}w`).join(', ');
	return { src, srcset };
}

export function getSpecificWidthSrcFromUrl(url: string, width: number) {
	let str = '/content/images';
	let parts = url.split(str);
	const src = `${parts[0]}${str}/size/w${width}${parts[1]}`;
	return src;
}
