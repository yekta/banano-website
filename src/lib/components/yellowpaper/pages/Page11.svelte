<script lang="ts">
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';
	import { bananoFaucets } from '$lib/ts/constants/bananoFaucets';
	import LazyImage from '$lib/components/LazyImage.svelte';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={11} class={classes}>
	<h3 class="font-bold text-xl"><span class="mr-1ch">5.1.</span> Black Monkey</h3>
	<p class="mt-4">
		With the name being a reference to the term of the “black sheep”, the Black Monkey faucet game
		revolves around finding the odd MonKey out of 6 MonKeys. Each MonKey will have some combination
		of hat, glasses, smile, skin color, clothing, shoes, and accessories. The goal is to identify
		the one MonKey being different, while the other 5 MonKeys have absolutely identical items of
		that type (<b>Figure 13</b>). Visit
		<a href={bananoFaucets.blackMonkey.url} target="_blank">blackmonkey.banano.cc</a> to play.
	</p>
	<div class="w-full mt-8">
		<a href={bananoFaucets.blackMonkey.url} target="_blank" class="w-full">
			<LazyImage
				width={1500}
				height={989}
				class="w-full h-auto rounded-xl overflow-hidden relative z-0"
				src="/yellowpaper/black-monkey.jpeg"
				placeholderSrc="/yellowpaper/lqip/black-monkey.png"
				alt="Black Monkey"
			/>
		</a>
	</div>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 13</b>: One of the most popular BANANO faucets: Black Monkey
	</p>
	<h3 class="font-bold text-xl mt-8"><span class="mr-1ch">5.2.</span> Meme Faucet</h3>
	<p class="mt-4">
		The BANANO Meme Faucet consists of writing and verifying descriptions of various memes or other
		images. When you submit a description, it will be evaluated and compared to the relative picture
		by another user, who will act as both faucet-user and “inspector” (<b>Figure 14</b>). Meme
		Faucet is available on <b>memefaucet.banano.cc</b> while it's active but it's not active currently.
	</p>
	<LazyImage
		width={1341}
		height={645}
		class="w-full h-auto rounded-xl overflow-hidden relative z-0 mt-8"
		src="/yellowpaper/meme-faucet.jpeg"
		placeholderSrc="/yellowpaper/lqip/meme-faucet.png"
		alt="Meme Faucet"
	/>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 14</b>: A screenshot from BANANO Meme Faucet.
	</p>
	<h3 class="font-bold text-xl mt-8"><span class="mr-1ch">5.3.</span> Crane Faucet</h3>
	<p class="mt-4">
		The crane faucet is run 24/7 and consists of solving captchas and various other “minigames” such
		as ‘Monkey Match’ or ‘Catch the Monkey’ (<b>Figure 15</b>). Crane Faucet is available on
		<b>faucet.banano.coranos.io</b> while it's active but it's not active currently.
	</p>
	<LazyImage
		width={1496}
		height={978}
		class="w-full h-auto mt-8 rounded-xl overflow-hidden relative z-0 border-2 border-c-yellowpaper-on-bg"
		src="/yellowpaper/crane-faucet.jpeg"
		placeholderSrc="/yellowpaper/lqip/crane-faucet.png"
		alt="Crane Faucet"
	/>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 15</b>: A screenshot from BANANO Crane Faucet.
	</p>
</PageWrapper>
