import { Buffer } from 'buffer';

const imgproxyUrl = 'https://imgproxy.banano.cc';

export function getSignedProxyUrl(url: string, width = 1024) {
	const urlSafeBase64 = (string: string | Buffer) => {
		return Buffer.from(string)
			.toString('base64')
			.replace(/=/g, '')
			.replace(/\+/g, '-')
			.replace(/\//g, '_');
	};

	const resizing_type = 'fit';
	const extension = url.split('.')[url.split('.').length - 1].toLowerCase();
	const encoded_url = urlSafeBase64(url);
	const path = `/insecure/rs:${resizing_type}:${width}:${width}/${encoded_url}.${extension}`;
	return imgproxyUrl + path;
}
