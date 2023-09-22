<script lang="ts">
	import { fade } from 'svelte/transition';
	import Placeholder from './Placeholder.svelte';
	export let height = 0;
	export let offset = 150;
	export let fadeOption = {
		delay: 0,
		duration: 400
	};
	export let resetHeightDelay = 0;
	export let onload: any = null;
	export let placeholder: any = null;
	export let placeholderProps: any = null;
	let className = '';
	export { className as class };

	const rootClass = 'svelte-lazy' + (className ? ' ' + className : '');
	const contentClass = 'svelte-lazy-content';
	const rootInitialHeight = getStyleHeight();
	let loaded = false;

	let contentShow = true;
	$: contentStyle = !contentShow ? 'display: none' : '';

	function load(node: any) {
		setHeight(node);
		const handler = createHandler(node);
		addListeners(handler);
		setTimeout(() => {
			// @ts-ignore
			handler();
		});
		const observer = observeNode(node, handler);

		return {
			destroy: () => {
				removeListeners(handler);
				observer.unobserve(node);
			}
		};
	}

	function createHandler(node: any) {
		// @ts-ignore
		const handler = throttle((e: any) => {
			const nodeTop = node.getBoundingClientRect().top;
			const expectedTop = getContainerHeight(e) + offset;

			if (nodeTop <= expectedTop) {
				loadNode(node, handler);
			}
		}, 200);
		return handler;
	}

	function observeNode(node: any, handler: any) {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].intersectionRatio > 0) {
				loadNode(node, handler);
				observer.unobserve(entries[0].target);
			}
		});
		observer.observe(node);
		return observer;
	}

	function loadNode(node: any, handler: any) {
		if (loaded) {
			return;
		}

		loaded = true;
		resetHeight(node);
		if (onload) {
			onload(node);
		}
		removeListeners(handler);
	}

	function addListeners(handler: any) {
		document.addEventListener('scroll', handler, true);
		window.addEventListener('resize', handler);
	}

	function removeListeners(handler: any) {
		document.removeEventListener('scroll', handler, true);
		window.removeEventListener('resize', handler);
	}

	function getStyleHeight() {
		return typeof height === 'number' ? height + 'px' : height;
	}

	function setHeight(node: any) {
		if (height) {
			node.style.height = getStyleHeight();
		}
	}

	function resetHeight(node: any) {
		setTimeout(() => {
			const isLoading = checkImgLoadingStatus(node);
			if (!isLoading) {
				node.style.height = 'auto';
			}
			// Add a delay to wait for remote resources like images to load
		}, resetHeightDelay);
	}

	function checkImgLoadingStatus(node: any) {
		const img = node.querySelector('img');
		if (!img) {
			return false;
		}

		if (!img.complete) {
			contentShow = false;

			node.addEventListener(
				'load',
				() => {
					// Use auto height if loading successfully
					contentShow = true;
					node.style.height = 'auto';
				},
				{ capture: true, once: true }
			);

			node.addEventListener(
				'error',
				() => {
					// Show content with fixed height if there is error
					contentShow = true;
				},
				{ capture: true, once: true }
			);

			return true;
		}

		if (img.naturalHeight === 0) {
			// Use fixed height if img has zero height
			return true;
		}

		return false;
	}

	function getContainerHeight(e: any) {
		if (e?.target?.getBoundingClientRect) {
			return e.target.getBoundingClientRect().bottom;
		} else {
			return window.innerHeight;
		}
	}

	// From underscore souce code
	function throttle(func: any, wait: any, options: any) {
		let context: any;
		let args: any;
		let result: any;
		let timeout: any = null;
		let previous: any = 0;
		if (!options) options = {};
		const later = function () {
			previous = options.leading === false ? 0 : new Date();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};

		return function (event: any) {
			const now: any = new Date();
			if (!previous && options.leading === false) previous = now;
			const remaining = wait - (now - previous);
			// @ts-ignore
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	}
</script>

<div use:load class={rootClass} style="height: {rootInitialHeight}">
	{#if loaded}
		<div in:fade={fadeOption || {}} class={contentClass} style={contentStyle}>
			<slot>Lazy load content</slot>
		</div>
		{#if !contentShow && placeholder}
			<Placeholder {placeholder} {placeholderProps} />
		{/if}
	{:else if placeholder}
		<Placeholder {placeholder} {placeholderProps} />
	{/if}
</div>
