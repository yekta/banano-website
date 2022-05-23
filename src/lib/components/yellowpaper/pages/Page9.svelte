<script lang="ts">
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';
	import Lazy from 'svelte-lazy';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={9} class={classes}>
	<h2 class="font-bold text-2xl">
		<span class="mr-1ch">4.</span> CAMO BANANO - Private Coins on BANANO using ECDH
	</h2>
	<p class="mt-4">
		A well known cryptographic challenge is that of privacy: prevention of unauthorized extraction
		of information from communications over an insecure channel. Neither companies nor individuals
		want all of their information being publicly visible on a blockchain, in a way it can be read
		without any restrictions by governments, family members, friends, or business competitors.
		Serving as BANANO's privacy layer, CAMO (<b>Figure 10</b>) at its current stage is a way for two
		people to share a seed. To share it securely they put it in the blockchain, that's essentially
		it!
		<br /><br />
		Of note, CAMO BANANO Phase 1 as described here and currently being available allows for confidential
		transactions, but not for real privacy yet. Ongoing development will include the requirement of adding
		a new block type to the BANANO protocol and subsequently allow for sum-of-squares private transactions.
	</p>
	<a
		href="https://medium.com/banano/introducing-camo-banano-bananos-privacy-layer-98a5bb0ecdb1"
		target="_blank"
		class="w-full"
	>
		<Lazy offset={500} fadeOption={{ duration: 200, delay: 0 }}>
			<img
				width="1000"
				height="487"
				class="w-full h-auto rounded-xl overflow-hidden relative z-0 mt-8"
				src="/yellowpaper/camo.jpeg"
				alt="CAMO Banano"
			/>
		</Lazy>
	</a>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 10</b>: CAMO BANANO graphic.
	</p>
	<p class="mt-6">The current CAMO solution currently consists of three layers of technology:</p>
	<ol class="mt-4" type="A">
		<li>Blockchain steganography.</li>
		<li>Storing ECDH public key in the blockchain.</li>
		<li>
			Private reversible transactions using shared seeds.
			<br />
			Private irreversible transactions using shared public keys.
		</li>
	</ol>
	<h3 class="font-bold text-xl mt-10">
		<span class="mr-1ch">4.1.</span> Blockchain Stenography and ECDH
	</h3>
	<p class="mt-4">
		Each BANANO wallet houses multiple addresses and is accessed using a seed. It is assumed that
		both party A (Alice) and B (Bob) in the transaction have an existing seed for an existing
		wallet. The main purpose of this system is to send funds from Alice's wallet to one of the
		wallets owned by Bob, knowing only Bobs seed and its first enclosed wallet. By splitting
		transactions of funds between multiple wallets under a single seed each party is in control of
		the funds but do not show up on a rich list.
	</p>
	<h3 class="font-bold text-xl mt-10">
		<span class="mr-1ch">4.2.</span> A Private Reversible Transaction
	</h3>
	<p class="mt-4">
		<b>1-</b> Assume Part A (Alice) and B (Bob) have an existing seed and wallet.
		<br /><br />
		<b>2-</b> Alice and Bob achieve a shared secret using Elliptic-curve Diffie-Hellman (ECDH) [4].
		<br /><br />
		<b>3-</b> Alice and Bob must agree on a third neutral location to use to mix the funds and
		obfuscate records of their transactions to any eavesdropper (Eve).
		<br /><br />
		<b>4-</b> Alice sends three transactions to herself to store the seed of a third party on the
		blockchain. To do this, she leverages the fact the BANANO balance field has a precision of 29
		places after the decimal point, i.e. you can store 11 bytes of data in the balance field 2.
		Alice splits the 32 byte public key into three chunks of 11, 11, and 10 bytes and sends three
		transactions to herself encoding these bytes in the balance field.
		<br /><br />
		<b>5-</b> Bob looks through Alice's transactions history and finds three where the
		representative is the hash of the shared secret. Bob combines theses to obtain the seed Alice
		hid in the blockchain. This seed is now neutral to both participating parties, and only both
		parties have access to it. At this point, if Alice sends funds to this neutral location the
		transaction can be considered reversible.
		<br /><br />
		<b>6-</b> Alice sends funds to the first N addresses contained in the neutral seed, starting at
		the zeroth address. She uses multiple transactions where the total number N is determined by the
		total amount of funds to be sent. In the Camo Phase 1 release this is orders of 10 BANANO: 10,
		100, 1000 .... In production it is intended to be split according to how transactions in the
		blockchain look at that point in time.
		<br /><br />
		<b>7-</b> Bob moves funds from each used address in the neutral seed to N separate addresses under
		a seed in his control. To Eve, it appears Alice simply sent out many random low payments, which then
		each went onto a second address. However, if Bob consolidated into his wallet at only its zeroth
		address, Eve could then collapse the graph and see all the transactions went from Alice to Bob.
	</p>
	<h3 class="font-bold text-xl mt-10">
		<span class="mr-1ch">4.3.</span> A Private Irreversible Transaction
	</h3>
	<p class="mt-4">
		Using the same method as reversible transactions, a new wallet is created instead of a new seed.
		The new wallet is controlled by only one party, so transactions are not reversible. The new
		wallet is stored on the blockchain in almost the same way as the reversible seed. The only
		difference is that the representative is set to the hash of the hashed shared secret and the
		public key, to distinguish it from the reversible transaction.
	</p>
</PageWrapper>

<style>
	ol {
		list-style-type: upper-alpha;
	}
</style>
