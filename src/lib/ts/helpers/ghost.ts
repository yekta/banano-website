// a function that finds "a" tags that has an href attribute anywhere in the tag that starts with "https://ghost.banano.cc" and replaces it with "/blog"
export function replaceHrefs(html: string) {
	const regex = /href="https:\/\/ghost.banano.cc/g;
	return html.replace(regex, 'href="https://banano.cc/blog');
}

export function cleanHtml(html: string) {
	const cleanHtml = replaceHrefs(html);
	return cleanHtml;
}
