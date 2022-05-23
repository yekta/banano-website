<script lang="ts">
	import { onMount } from 'svelte';

	export let width: number;
	export let height: number;
	export let src: string;
	export let alt: string;
	export { classes as class };
	export let loadMargin = '100px';

	let classes: string;
	let imageContainer: HTMLElement;

	function onShouldLoad() {
		console.log('should load');
	}

	onMount(() => {
		let options = {
			root: imageContainer,
			rootMargin: loadMargin,
			threshold: 0
		};
		let observer = new IntersectionObserver(onShouldLoad, options);
		observer.observe(imageContainer);
	});
</script>

<div bind:this={imageContainer} class={classes}>
	<div
		style="padding-top: {(height / width) *
			100}%; height:0; overflow: hidden; position: relative; z-index: 1;"
	>
		<img style="width:100%; height: 100%; position: absolute; top: 0; left: 0;" {src} {alt} />
	</div>
</div>
