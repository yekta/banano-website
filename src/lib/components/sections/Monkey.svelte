<script lang="ts">
	import MonKeyGenerator from '../MonKeyGenerator.svelte';

	const monkeyArray = [0, 1, 2, 3];
</script>

<div id="monkey" class="w-full bg-c-bg flex flex-col justify-center pt-8 pb-10 text-center">
	<div class="container-b-small flex flex-col items-center px-4">
		<h2 class="text-3xl font-bold px-4">Meet MonKey</h2>
		<p class="mt-3 text-xl md:px-8 lg:px-0">
			You member CryptoKitties? We have something much better. In Banano Republic, every account has
			its own unique MonKey! Check out your MonKey at <a
				href="https://monkey.banano.cc"
				target="_blank"
				class="font-bold hover:underline text-c-secondary">monkey.banano.cc</a
			> or try it below!
		</p>
	</div>
	<div class="container-b flex flex-row flex-wrap justify-center mt-4 md:mt-7 px-4 md:px-12">
		{#each monkeyArray as number}
			<img
				class="w-1/2 lg:w-1/4 max-w-[16rem] md:max-w-[20rem] h-auto"
				src="/illustrations/monkeys/monkey-{number}.svg"
				alt="MonKey {number}"
			/>
		{/each}
	</div>
	<div class="container-b-small flex flex-col items-center px-4 mt-6">
		<h2 class="text-3xl font-bold px-4">Try MonKey Now!</h2>
		<p class="mt-3 text-xl md:px-8 lg:px-0">
			Check out how MonKey works below by clicking the randomize button.<br />You can also enter an
			address to see your own MonKey!
		</p>
	</div>
	<!-- Generator -->
	<div class="container-b-small flex flex-row flex-wrap items-center justify-center mt-6 md:px-6">
		<MonKeyGenerator />
	</div>
</div>
