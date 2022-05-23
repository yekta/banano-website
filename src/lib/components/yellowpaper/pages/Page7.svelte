<script lang="ts">
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';
	import Lazy from 'svelte-lazy';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={7} class={classes}>
	<h3 class="font-bold text-xl"><span class="mr-1ch">3.4.</span> Proof-of-Work</h3>
	<p class="mt-4">
		NANO's Proof-of-Work mechanism intends to serve as an anti-spam mechanism at the cost of
		unnecessarily delaying block generation on low-end machines. This makes community projects and
		field studies harder to maintain and grow. NANO's ability to pre-cache one work upfront doesn't
		help much, and concurrent work caching often isn't feasible either. That's why for BANANO, we
		chose a quicker proof-of-work generation time, but kept the original algorithm (hashing a nonce
		that is concatenated with the block hash, until the result exceeds a certain threshold). As a
		result, the BANANO protocol runs on low power hardware, enabling it to be a lightweight,
		practical and decentralized cryptocurrency for everyday use. On average, generation times are 8x
		faster for BANANO than for NANO while consuming 8x less electricity. There's a mathematical
		formula to calculate this: (2⁶4 - 0xfffffe0000000000) / (2⁶4 - 0xffffffc000000000), this work
		generation is even mobile friendly! Existing work generator software is backwards compatible,
		but it should be adjusted to the new threshold to not waste energy unnecessarily.
	</p>
	<h3 class="font-bold text-xl mt-10"><span class="mr-1ch">3.5.</span> MonKey</h3>
	<p class="mt-4">
		Cryptocurrency wallet addresses are typically long strings of characters that can be nearly
		indistinguishable from each other. MonKeys solve this long-standing problem through the creation
		of unique, monkey-shaped avatars from a hash value based on a user's public key. These visual
		representations of wallet addresses serve to identify users while protecting the privacy of the
		account holders (<b>Figure 8</b>).
	</p>
	<Lazy offset={1000} fadeOption={{ duration: 200, delay: 0 }}>
		<img
			width="700"
			height="700"
			class="w-full h-auto rounded-xl overflow-hidden relative z-0 mt-8"
			src="/yellowpaper/monkey-change.gif"
			alt="MonKey Change"
		/>
	</Lazy>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 8</b>: Your MonKey is unique! No two wallet addresses share the same MonKey!
	</p>
</PageWrapper>
