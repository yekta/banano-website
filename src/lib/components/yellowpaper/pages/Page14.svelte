<script lang="ts">
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';
	import { inview } from 'svelte-inview';
	import { bananoFaucets } from '$lib/ts/constants/bananoFaucets';
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';
	import { bananoWallets } from '$lib/ts/constants/bananoWallets';

	export { classes as class };
	export let onTriggered: () => void;

	let classes: string;

	const options = {
		unobserveOnEnter: true
	};
</script>

<PageWrapper pageNumber={14} class={classes}>
	<h2 class="font-bold text-2xl">
		<span class="mr-1ch">6.</span> Summary
	</h2>
	<p class="mt-4">
		• BANANO (BAN) is a fourth-generation cryptocurrency that offers feeless, instant and
		ecologically green transactions. It utilizes a novel DAG (Directed Acyclic Graph) based
		block-lettuce™ architecture, where each user possesses his own blockchain.
		<br /><br />
		• BANANO was forked in April 2018 from NANO. BANANO did no ICO whatsoever, instead all coins were
		and are distributed through an ongoing free and fair distribution program, through Airdrops, Faucet
		Games and other events. Meanwhile, BANANO is also experimenting with feature additions such as a
		privacy layer (<a
			target="_blank"
			href="https://medium.com/banano/introducing-camo-banano-bananos-privacy-layer-98a5bb0ecdb1"
			>Camo BANANO</a
		>), on-chain messaging (<a target="_blank" href={bananoFaucets.MonkeyTalks.url}>MonkeyTalks</a>)
		and more.
		<br /><br />
		• In the context of distribution, one major aim of BANANO is using their infrastructure with easy-to-use
		mobile wallets (<a target="_blank" href={bananoWallets.kalium.url}>Kalium</a>) and Tipbots on
		several major social media platforms to onboard normies and crypto-noobs who have no idea yet
		what a cryptocurrency is. Of note, the key here is to make the start with crypto as easy as
		possible, and use a fun attitude and a gamification approach to get new users started without
		all the usual hassle, and then educate them to handle cryptocurrencies in a responsible way.
		<br /><br />
		• At the time of writing, BANANO is already heavily used in tens of thousands of daily on-chain transactions
		for tipping and payment within our community and on several third-party platforms.
		<br /><br />
		• The main hub where the BANANO community resides and collaborates is our
		<a target="_blank" href={bananoSocials.discord.url}>Discord server</a>. Here you'll find BANANO
		constantly flying around between the community members. We recommend an expedition to the Jungle
		channel where it frequently rains BANANO on all active MonKeys. Please join us there, everyone
		is welcome! We are genuinely a very open project, so if you have a great faucet idea or want to
		contribute otherwise, chat to us! We’re looking forward to your visit!
		<br /><br />
		• If you can't wait to get your paws on some juicy, yellow BANANO, we are listed on several exchanges
		already (overview at
		<a target="_blank" href="https://www.coingecko.com/en/coins/banano">Coingecko</a>).
	</p>
	<h2 class="font-bold text-2xl mt-12">
		<span class="mr-1ch">7.</span> Acknowledgements
	</h2>
	<p class="mt-4">
		The authors of this yellowpaper would like to warmly thank all members of the BANANO community
		for their valuable contributions to the BANANO ecosphere.
	</p>
	<h2 class="font-bold text-2xl mt-12">
		<span class="mr-1ch">8.</span> References
	</h2>
	<div use:inview={options} class="w-full" on:enter={onTriggered} />
	<ol class="mt-4">
		<li>
			S. Nakamoto, Bitcoin: A peer-to-peer electronic cash system. http://bitcoin.org/bitcoin.pdf.
			2008.
		</li>
		<li>S. D. Lerner, DagCoin Draft. SEPTEMBER 2015.</li>
		<li>C. LeMahieu, Nano: A Feeless Distributed Cryptocurrency Network.</li>
		https://nano.org/en/whitepaper. Accessed: 2018-10-21.
		<li>
			D. Whiteld, New Directions in Cryptography. IEEE Transactions on Information Theory, Vol.
			IT-22, NO 6, NOVEMBER 1976.
		</li>
	</ol>
</PageWrapper>

<style>
	ol {
		list-style-type: number;
	}
</style>
