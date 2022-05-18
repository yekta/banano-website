export function numberFormatter(number: number, decimals = 4): string {
	let rounded = (Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)).toString();
	if (rounded.startsWith('0.')) {
		rounded = rounded.substring(1);
	}
	return rounded;
}
