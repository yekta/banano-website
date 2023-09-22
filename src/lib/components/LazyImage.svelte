<script lang="ts">
	import AspectRatio from './AspectRatio.svelte';
	import LazyImage from '$components/svelte-lazy-image/SvelteLazyImage.svelte';

	export let width: number;
	export let height: number;
	export let src: string;
	export let alt: string;
	export let placeholderSrc: string;
	export { classes as class };
	let classes: string;
</script>

<AspectRatio {width} {height} class={classes}>
	<LazyImage
		{src}
		placeholder={placeholderSrc}
		{alt}
		{width}
		{height}
		options={{ rootMargin: '100%' }}
	/>
</AspectRatio>
