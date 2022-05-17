export interface IRoadmapItem {
	title: string;
	entries: IRoadmapEntry[];
}

interface IRoadmapEntry {
	title: string;
	body: string;
}
