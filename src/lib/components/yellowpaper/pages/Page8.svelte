<script lang="ts">
	import MonKeyGeneratorLazy from '$lib/components/MonKeyGeneratorLazy.svelte';
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={8} class={classes}>
	<p>
		Each MonKey has a unique combination of fur and eye colour, and can have additional accessories
		in varying styles, such as hats, glasses, shirts, pants, mouth types, tail decorations, and
		more! The value of the accessories is classified into 3 categories: basic, rare, and premium.
		The rarity ranges from 1/2 to 1/32 and 1/1024 MonKeys, respectively. There are hundreds of
		billions of possible MonKey combinations. Consider that RGB color ranges from (0,0,0) to
		(255,255,255). Therefore, there are 256³ = 16,777,216 color options. By only examining fur color
		and eye color generation we get 16,777,216² = 281,474,976,710,656 MonKey options. This is
		without even considering the 7 classes of accessories and their corresponding coloring! For
		testing purposes, we’ve implemented a MonKey generator right below (<b>Figure 9</b>). This
		generator allows you to experiment with MonKeys even without having a real wallet address (even
		though creating one is recommended and only takes seconds). You are welcome to try it for
		yourself, maybe you will be lucky and draw a premium accessory!
	</p>
	<p class="mt-8 px-4 md:px-12 text-sm text-center">
		<b>Figure 9</b>: MonKey Generator
	</p>
	<div class="w-full flex flex-row items-center justify-center monkey-generator mt-6">
		<MonKeyGeneratorLazy />
	</div>
</PageWrapper>
