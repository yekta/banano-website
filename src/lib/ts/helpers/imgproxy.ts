import { Buffer } from 'buffer';

const imgproxyUrl = 'https://imgproxy.banano.cc';
/* const IMGPROXY_KEY = String(import.meta.env.VITE_IMGPROXY_KEY);
const IMGPROXY_SALT = String(import.meta.env.VITE_IMGPROXY_SALT); */

export function getSignedProxyUrl(url: string, width = 1024, height = 1024) {
	const urlSafeBase64 = (string: string | Buffer) => {
		return Buffer.from(string)
			.toString('base64')
			.replace(/=/g, '')
			.replace(/\+/g, '-')
			.replace(/\//g, '_');
	};

	const resizing_type = 'fit';
	const extension = url.split('.')[url.split('.').length - 1];
	const encoded_url = urlSafeBase64(url);
	const path = `/insecure/rs:${resizing_type}:${width}:${height}/${encoded_url}.${extension}`;
	return imgproxyUrl + path;
}
