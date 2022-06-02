import { parse } from 'node-html-parser';
import type { Node as NodeP, HTMLElement as HTMLElementP } from 'node-html-parser';

export function mdParser(md: typeof import('*.md'), splitterTag: string, otherTags: string[]) {
	let nodes = parse(md.render().html).childNodes.filter((n) => n.nodeType !== 3);

	let splitIndexes = nodes
		.map((n, index) => ({
			rawTagName: (n as HTMLElementP).rawTagName,
			index: index
		}))
		.filter((n) => n.rawTagName === splitterTag)
		.map((n) => n.index);

	let splits = [];

	for (let i = 0; i < splitIndexes.length; i++) {
		let start = splitIndexes[i];
		let end = splitIndexes[i + 1 < splitIndexes.length ? i + 1 : nodes.length];
		let split = nodes.slice(start, end) as HTMLElementP[];
		let splitter = split.filter((n) => n.rawTagName === splitterTag)[0].text;
		let others: string[] = [];
		otherTags.forEach((t) => {
			others.push(
				split
					.filter((n) => n.rawTagName === t)
					.map((n) => n.innerHTML)
					.join(t === 'p' ? '<br><br>' : ' ')
			);
		});
		splits.push([splitter, ...others]);
	}

	return splits;
}
