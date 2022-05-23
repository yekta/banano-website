<script lang="ts">
	import AspectRatio from '$lib/components/AspectRatio.svelte';
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';
	import Lazy from 'svelte-lazy';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={6} class={classes}>
	<h3 class="font-bold text-xl"><span class="mr-1ch">3.2.</span> Rise of the Block Lettuce</h3>
	<p class="mt-5">
		How is BANANO developed to offer feeless, almost instant transactions? Enter the Block Lettuce.
	</p>
	<div class="w-full flex flex-row flex-wrap justify-center">
		<div
			class="w-full max-w-sm md:max-w-[16rem] lg:max-w-[22rem] flex flex-col items-center justify-start md:mr-8 mt-6"
		>
			<AspectRatio width={896} height={1250}>
				<Lazy offset={1000} fadeOption={{ duration: 200, delay: 0 }}>
					<img
						width="896"
						height="1250"
						class="w-full h-auto"
						src="/yellowpaper/block-lettuce.png"
						alt="Block Lettuce"
					/>
				</Lazy>
			</AspectRatio>
			<p class="mt-4 px-4 md:px-12 text-sm text-center">
				<b>Figure 6</b>: Block Lettuce.
			</p>
		</div>
		<p class="w-full md:flex-1 md:min-w-0 mt-6">
			BANANO uses a Block Lettuce (<b>Figure 6</b>) architecture to achieve lightening-quick
			transfer speeds. Each account has its own blockchain. Transferring funds from one account to
			another requires two transactions: a send which deducts value from the sender's balance and a
			receive adds the same amount to the receiver's balance. An account encodes its accumulated
			total balance when it makes a transaction, therefore nodes only need to keep track of the
			latest block rather than expend larger resources to track an account's full transaction
			history. Correctness is maintained, however there is a vast reduction in time and work versus
			a single-blockchain architecture used by other cryptocurrencies.
		</p>
	</div>
	<h3 class="font-bold text-xl mt-10"><span class="mr-1ch">3.3.</span>BANANOdes</h3>
	<p class="mt-4">
		The BANANO ledger is secured through Open Representative Voting (previously called ‘delegated
		Proof-of-Stake’), a powerful decentralization mechanism that has no strong analog in
		Proof-of-Work (PoW) or Proof-of-Stake (POS) algorithms. In conventional PoS systems, the account
		owner's node must be running to participate in voting. By contrast, BANANO account holders
		choose a representative node to vote on their behalf in the event of conflicting transactions.
		Continuously running a node is impractical for many everyday users; giving a representative the
		power to proxy vote reduces that requirement. A user has the ability to easily reassign their
		representative to any account at any time through a change transaction. The weight of the
		account is subtracted from the old representative and added to the new representative. No funds
		are moved in this transaction, and the representative does not have spending power of the
		account's funds.
		<br /><br />
		PoW in BANANO is solely used as an anti-spam tool and computation is almost instant. Once a transaction
		is sent, the PoW for the next block can be pre-computed, as the previous block field is already known.
		Therefore, as long as the time between transactions is greater than the time required to compute
		the PoW, transactions appear instantaneous to users (<b>Figure 7</b>).
	</p>
	<div class="w-full flex flex-wrap items-center justify-center">
		<div class="w-full max-w-[18rem] md:w-1/2 mt-4 p-3">
			<AspectRatio width={305} height={600}>
				<Lazy offset={1000} fadeOption={{ duration: 200, delay: 0 }}>
					<img
						width="305"
						height="600"
						class="w-full h-auto"
						src="/yellowpaper/kalium-send.gif"
						alt="Kalium Send Process"
					/>
				</Lazy>
			</AspectRatio>
		</div>
		<div class="w-full max-w-md md:flex-1 md:min-w-0 mt-4 p-3">
			<AspectRatio width={534} height={486}>
				<Lazy offset={1000} fadeOption={{ duration: 200, delay: 0 }}>
					<img
						width="534"
						height="486"
						class="w-full h-auto rounded-xl relative z-0"
						src="/yellowpaper/nano-vs-banano-speed.gif"
						alt="Nano vs Banano Speed"
					/>
				</Lazy>
			</AspectRatio>
		</div>
	</div>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 7</b>: A real-time Kalium transaction and BANANO & NANO speed comparison.
	</p>
</PageWrapper>
