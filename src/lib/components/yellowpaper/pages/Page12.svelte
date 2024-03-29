<script lang="ts">
	import PageWrapper from '$components/yellowpaper/PageWrapper.svelte';
	import { bananoFaucets } from '$ts/constants/bananoFaucets';
	import LazyImage from '$components/LazyImage.svelte';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={12} class={classes}>
	<h3 class="font-bold text-xl"><span class="mr-1ch">5.4.</span> BANANO Mining</h3>
	<p class="mt-4">
		It’s rarely mentioned that some fresh cryptocurrencies like BANANO (and it’s father NANO) do not
		require mining and therefore are highly innovative examples for ecologically “green”
		cryptocurrencies. However, in this case we purposefully branded our new <a
			href="https://foldingathome.org"
			target="_blank">Folding@Home</a
		>
		faucet as “<b>BANANO Miner” (Figure 16</b>). This naming choice was made as a way of stating
		that cryptocurrency mining is not without alternatives!
	</p>
	<div class="w-full mt-8">
		<a href={bananoFaucets.bananoMiner.url} target="_blank" class="w-full">
			<LazyImage
				width={1500}
				height={788}
				src="/yellowpaper/banano-miner.jpeg"
				placeholderSrc="/yellowpaper/lqip/banano-miner.png"
				alt="Banano Miner"
				class="w-full h-auto rounded-xl overflow-hidden relative z-0"
			/>
		</a>
	</div>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 16</b>: BANANO Miner - Contribute to Medical Research while earning BANANO!
	</p>
	<p class="mt-8">
		There are 2 separate faucet projects in this category, <b>BANANO Powerplant</b> and the
		<b>BANANO Miner Faucet</b>.
		<br /><br />
		<b>BANANO Powerplant</b> is a CPU mining pool faucet that mines a range of different altcoins
		and pays out with BANANO. The payments are subsidized by BANANO, so the rates are better than
		mining the altcoins directly. Powerplant was available on <b>powerplant.banano.cc</b> while it
		was active but it has been discontinued.
		<br /><br />
		<b>BANANO Miner</b> is not really a miner. Instead of running arbitrary calculations to “mine” a
		cryptocurrency, your computer runs protein folding simulations through <b>Folding@Home</b>,
		which helps researchers fight Parkinson’s, Huntington’s, Cancer, Alzheimer’s and many more
		genetic diseases, and infectious diseases. Then, we send BANANO to your wallet based on the size
		of your computational contribution (<b>Figure 17</b>). Visit
		<a href={bananoFaucets.bananoMiner.url} target="_blank">bananominer.com</a> to try it out.
	</p>
	<LazyImage
		width={800}
		height={300}
		class="w-full h-auto mt-8 rounded-xl overflow-hidden relative z-0"
		src="/yellowpaper/banano-miner-animation.gif"
		placeholderSrc="/yellowpaper/lqip/banano-miner-animation.png"
		alt="Banano Miner Animation"
	/>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 17</b>: Fight diseases with computational power while earning BANANO!
	</p>
</PageWrapper>
