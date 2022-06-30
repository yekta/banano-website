let timeout: NodeJS.Timeout;

export function debounce(f: Function, debounceTime = 200) {
	clearTimeout(timeout);
	timeout = setTimeout(async () => {
		f();
	}, debounceTime);
}
