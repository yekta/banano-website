<script lang="ts">
	import MonKeyGeneratorLazy from '../MonKeyGeneratorLazy.svelte';

	const monkeyArray = [0, 1, 2, 3];
</script>

<div id="monkey" class="w-full flex flex-col justify-center -mt-8 pt-24 pb-10 text-center">
	<div class="container-b-small flex flex-col items-center">
		<h2 class="text-3xl font-bold px-5">Meet MonKey</h2>
		<p class="mt-3 text-lg container-b-small px-5 md:px-16 lg:px-24">
			You member CryptoKitties? We have something much better. In Banano Republic, every account has
			its own unique MonKey! Check out your MonKey at <a
				href="https://monkey.banano.cc"
				target="_blank"
				class="font-bold hover:underline text-c-secondary">monkey.banano.cc</a
			> or try it below!
		</p>
	</div>
	<div
		class="container-b flex flex-row flex-wrap justify-center items-center mt-4 md:mt-7 px-4 md:px-12"
	>
		{#each monkeyArray as number}
			<img
				width="512"
				height="620"
				class="w-1/2 lg:w-1/4 max-w-[16rem] md:max-w-[20rem] h-auto"
				src="/illustrations/monkeys/monkey-{number}.svg"
				alt="MonKey {number}"
			/>
		{/each}
	</div>
	<div class="container-b-small flex flex-col items-center mt-4">
		<h2 class="text-3xl font-bold px-5">Try MonKey Now!</h2>
		<p class="mt-3 text-lg container-b-small px-5 md:px-16 lg:px-24">
			Check out how MonKey works below by clicking the randomize button.<br />You can also enter an
			address to see your own MonKey!
		</p>
	</div>
	<!-- Generator -->
	<div class="container-b-small flex flex-row flex-wrap items-center justify-center mt-10 px-4">
		<MonKeyGeneratorLazy />
	</div>
</div>
