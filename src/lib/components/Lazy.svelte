<script lang="ts">
	import Lazy from '$components/svelte-lazy/SvelteLazy.svelte';
	import AspectRatio from './AspectRatio.svelte';
	import Lqip from '$components/Lqip.svelte';

	export let width: number;
	export let height: number;
	export let placeholderSrc: string;
	export { classes as class };
	let classes: string;
</script>

<AspectRatio {width} {height} class={classes}>
	<Lazy offset={1000} placeholder={Lqip} placeholderProps={{ src: placeholderSrc }}>
		<slot />
	</Lazy>
</AspectRatio>
