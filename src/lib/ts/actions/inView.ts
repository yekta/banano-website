export default function inView(node: any, params: any) {
	let observer: IntersectionObserver;

	const handleIntersect = (e: any) => {
		const v = e[0].isIntersecting ? 'enter' : 'exit';
		node.dispatchEvent(new CustomEvent(v));
	};

	const setObserver = (params: any) => {
		let { root, top, bottom } = params;
		const marginTop = top ? top * -1 : 0;
		const marginBottom = bottom ? bottom * -1 : 0;
		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
		const options = { root, rootMargin };
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(handleIntersect, options);
		observer.observe(node);
	};

	setObserver(params);

	return {
		update(params: any) {
			setObserver(params);
		},

		destroy() {
			if (observer) observer.disconnect();
		}
	};
}
