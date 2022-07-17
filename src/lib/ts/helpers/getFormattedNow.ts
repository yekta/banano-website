import { monthsShort } from '$lib/ts/constants/months';

export const getFormattedNow = (): string => {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = now.getUTCMonth();
	const monthName = monthsShort[month];
	const day = now.getUTCDate();
	const hour = now.getUTCHours();
	const min = now.getUTCMinutes();
	const sec = now.getUTCSeconds();

	return `${monthName} ${day}, ${year} • ${dd(hour)}:${dd(min)}:${dd(sec)} (UTC)`;
};

const dd = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
