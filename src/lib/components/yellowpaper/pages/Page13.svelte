<script lang="ts">
	import PageWrapper from '$components/yellowpaper/PageWrapper.svelte';
	import { bananoFaucets } from '$ts/constants/bananoFaucets';
	import LazyImage from '$components/LazyImage.svelte';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={13} class={classes}>
	<h3 class="font-bold text-xl"><span class="mr-1ch">5.5.</span> MonkeyTalks</h3>
	<p class="mt-4">
		MonkeyTalks is a proof-of-concept application showing how versatile BANANO can be, and how easy
		it can be used in new contexts. MonkeyTalks is a combination of a <b
			>self-sustaining BANANO faucet</b
		>
		and an <b>on-chain messaging platform (Figure 18)</b>. First it’s a faucet because for sending a
		message you’ll need to pay a small fee in BANANO. Second, it’s self-sustaining since your
		payment in turn refills the faucet. And finally, it's on-chain because any message sent through
		MonkeyTalks it’s engraved into the transaction’s RAW: this means that all of the messages are
		publicly visible and basically immutable because they were written into the BANANO blockchain.
		MonkeyTalks is basically a proof-of-concept website that combines a faucet giving out free
		BANANO with an actual application BANANO can be used for. There’s a clear incentive to visit the
		site to claim the faucet, which in turn incentivizes users to pay BANANO for a message many
		people will see. To make this more interesting, you can also choose to pay a little more to
		highlight your message in a different color.
		<br />
		Visit <a href={bananoFaucets.MonkeyTalks.url} target="_blank">MonkeyTalks.cc</a> to try it out.
	</p>
	<div class="w-full mt-8">
		<a href={bananoFaucets.MonkeyTalks.url} target="_blank" class="w-full">
			<LazyImage
				width={1500}
				height={1101}
				class="w-full h-auto rounded-xl overflow-hidden relative z-0"
				src="/yellowpaper/monkey-talks.jpeg"
				placeholderSrc="/yellowpaper/lqip/monkey-talks.png"
				alt="MonkeyTalks"
			/>
		</a>
	</div>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 18</b>: MonkeyTalks - A self-sustaining BANANO faucet including on-chain messaging!
	</p>
	<h3 class="font-bold text-xl mt-8">
		<span class="mr-1ch">5.6.</span> Inflation versus Deflation
	</h3>
	<p class="mt-4">
		While its ongoing free and fair distribution program surely resembles one of the biggest
		strengths of BANANO and has led to a rapidly growing community, it also logically leads to
		inflation. That’s why the BANANO team in July 2019 announced a monthly ‘Buy-Back and Burn’
		scheme (<a
			href="https://medium.com/banano/banano-is-becoming-deflationary-3215ba3b41f5"
			target="_blank">article</a
		>). In brief, the BANANO team uses earnings from faucet monetization (mainly mined coins and
		income from advertisements) to buy back BANANO from exchanges and subsequently sends all bought
		BANANO to a burn address, making respective coins ultimately inaccessible. The overall aim of
		this approach is to stabilize markets especially during the ongoing free distribution phase (<b
			>Figure 19</b
		>). Coin burns unrelated to this program have occurred, and may happen again in the future.
	</p>
	<LazyImage
		width={800}
		height={800}
		class="w-full h-auto rounded-xl overflow-hidden relative z-0 mt-8"
		src="/yellowpaper/buy-back.jpeg"
		placeholderSrc="/yellowpaper/lqip/buy-back.png"
		alt="Buy-Back and Burn"
	/>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 19</b>: BANANO has a ‘Buy-Back and Burn’ program.
	</p>
</PageWrapper>
