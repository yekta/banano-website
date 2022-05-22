<script lang="ts">
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={2} class={classes}>
	<h2 class="font-bold text-2xl"><span class="mr-1ch">1.</span> Introduction</h2>
	<p class="mt-4">
		In the year 2009, we saw the introduction of the first ever decentralized payment network, the
		mother of all coins, Bitcoin [<b>1</b>]. In the years that followed, global interest grew and
		Bitcoin inspired the genesis of numerous cryptography based projects that also worked towards
		trustless secure payment systems and storage of value.
		<br /><br />
		Bitcoin uses blockchain technology where a distributed ledger records transactions chronologically
		and publicly. Subsequent advancement in the space gave rise to second generation projects like Ethereum,
		Litecoin, EOS, Stellar, Monero and many others, which built on this concept by adding new features,
		and sometimes by acting as platforms for dApps - the execution of decentralised applications. Then
		finally in 2015, Sergio Lerner published a paper describing the applicability of so-called Directed
		Acyclic Graphs (DAG) to the field of cryptography [<b>2</b>]. This concept was adopted by
		multiple third generation cryptocurrencies. One such project originally developed by Colin
		LeMahieu emerged by specifically targeting the scalability issues plaguing generations one and
		two: Raiblocks. Raiblocks rebranded to NANO in January 2018 [<b>3</b>].
		<br /><br />
		BANANO is a feeless, instant, rich in potassium cryptocurrency powered by DAG technology disrupting
		the meme economy. It is the first <strike>fork</strike> peel of NANO, the genesis block
		redefining the memeconomy on 1 April 2018. Oh, did you know that Colin Lemahieu, the founder of
		Nano, likes us? Yea, that’s right (<b>Figure 1</b>)!
	</p>
	<video
		width="1280"
		height="720"
		class="w-full h-auto mt-8 rounded-xl relative z-0 overflow-hidden"
		controls
	>
		<source src="/yellowpaper/colin-likes-banano.mp4" type="video/mp4" />
		<track kind="captions" />
	</video>
	<p class="mt-4 px-4 md:px-12 text-sm">
		<b>Figure 1</b>: “I think memecoins are hilarious, we have one, we have BANANO, I like those
		guys!” Colin LeMahieu, Nano Founder
	</p>
	<p class="mt-10">
		Similar to NANO, BANANO has quite more properties and advantages over classical cryptocurrencies
		than simply being high in potassium, obviously (<b>Table 1</b>).
	</p>
	<p class="mt-8 px-4 md:px-12 text-sm text-center">
		<b>Table 1</b>: Feature comparison: BANANO vs. Bitcoin
	</p>
	<img
		width="1500"
		height="960"
		class="w-full h-auto mt-5"
		src="/yellowpaper/banano-vs-bitcoin.png"
		alt="Feature comparison: Banano vs. Bitcoin"
	/>
</PageWrapper>
