<script lang="ts">
	import LazyImage from '$components/LazyImage.svelte';
	import PageWrapper from '$components/yellowpaper/PageWrapper.svelte';
	import { bananoWallets } from '$ts/constants/bananoWallets';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={3} class={classes}>
	<h2 class="font-bold text-2xl"><span class="mr-1ch">2.</span> What is BANANO?</h2>
	<p class="mt-4">
		BANANO started as a joke between a devoted group of NANO contributors and resulted in a coin
		being the product of a considerable amount of effort (without taking itself too seriously).
		While it's true that BANANO kept big portions of the original node code to keep cross-chain
		compatibility between existing code libraries, many parameters have been fine-tuned, such as
		work requirements and units. As it progresses, the node code will likely diverge further. NANO
		has the mantra of ‘<b>do one thing and do it well</b>’. BANANO, however, is more open to feature
		additions, e.g. on-chain messaging or privacy. BANANO doesn’t aim for drastic modifications of
		the reference implementation of the node at this early stage: it’s more about improving the
		ecosystem and ensuring we have the best developers to do so!
		<br /><br />
		It’s hard to overlook the exceptional tools and utilities that our hard working
		<strike>developers</strike> monkeys have contributed thus far. Take a peek at BANANO’s mobile
		wallet, Kalium (<b>Figure 2</b>). It’s a modern mobile wallet designed to be efficient and
		effective when transferring BANANO between you and your banfam - that is to say, your BANANO
		Family. With it, you can send instant transactions to anyone, anywhere, for free! On top of this
		and in line with the overall philosophy behind BANANO, Kalium is easy-to-use to ensure anyone
		will be able to get started with BANANO in minutes, without requiring any crypto-related
		knowledge whatsoever.
	</p>
	<p class="mt-8 px-4 md:px-12 text-sm text-center">
		<b>Figure 2</b>: Kalium - BANANO’s mobile wallet (<a
			href={bananoWallets.kalium.url}
			target="_blank">Download</a
		>).
	</p>
	<div class="w-full mt-5">
		<a class="w-full" href={bananoWallets.kalium.url} target="_blank">
			<LazyImage
				width={1500}
				height={1194}
				placeholderSrc="/yellowpaper/lqip/kalium.png"
				class="w-full h-auto rounded-xl"
				src="/yellowpaper/kalium.png"
				alt="Kalium Wallet"
			/>
		</a>
	</div>
	<p>
		We also haven’t forgotten the roots of our BANANO tree. We made the tech from Kalium Wallet
		available for NANO users with <a href="https://natrium.io" target="_blank">Natrium</a>, a mobile
		wallet for NANO based on Kalium tech! Adding features and helping other developers to create
		feasible concepts are just some of the few things we do while hanging in our BANANO hammocks.
		Most importantly, we work on the BANANO ecosystem and second layer solutions such as
		<a
			href="https://medium.com/banano/introducing-camo-banano-bananos-privacy-layer-98a5bb0ecdb1"
			target="_blank">CAMO BANANO</a
		>, our super-secret privacy layer, which is currently in development (<a
			href="https://medium.com/banano/introducing-camo-banano-bananos-privacy-layer-98a5bb0ecdb1"
			target="_blank">Phase 1 announcement</a
		>).
	</p>
</PageWrapper>
