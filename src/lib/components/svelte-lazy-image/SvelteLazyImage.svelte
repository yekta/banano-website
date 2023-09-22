<script lang="ts">
	import { onMount } from 'svelte';

	export let placeholder: string;
	export let src: string;
	export let alt: string;

	export let options: { root?: any; rootMargin?: string; threshold?: number } = {
		root: null,
		rootMargin: '0px 0px 0px 0px',
		threshold: 0.0
	};

	let imgElement: HTMLImageElement;
	let path: string;

	let observer: any;
	let intersected = false;
	let loaded = false;

	$: path = intersected ? src : placeholder;
	$: cssClass = $$props.class || '';

	onMount(() => {
		observer = new IntersectionObserver((entries, self) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					intersected = true;
					self.unobserve(imgElement);
				}
			});
		}, options);
		observer.observe(imgElement);

		return () => {
			if (observer) {
				observer.unobserve(imgElement);
			}
		};
	});

	function handleLoad() {
		if (!loaded && path === src) {
			loaded = true;
		}
	}
</script>

<img
	src={path}
	{alt}
	on:load={handleLoad}
	bind:this={imgElement}
	{...$$restProps}
	class="svelte-lazy-image {cssClass}"
	class:svelte-lazy-image--loaded={loaded}
/>
