<script lang="ts">
	import Button from '../Button.svelte';

	const monkeyArray = [0, 1, 2, 3];
</script>

<div id="monkey" class="w-full bg-c-bg flex flex-col justify-center py-12 text-center">
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
	<div class="container-b flex flex-row flex-wrap justify-center mt-4 px-4 md:px-12">
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
			Check out how MonKey works below by clicking the randomize button.<br />If you have an address
			already, enter it and click the generate button to see your MonKey!
		</p>
	</div>
	<!-- Generator -->
	<div class="container-b-small flex flex-row flex-wrap items-center justify-center mt-10 md:px-6">
		<div class="w-full md:w-1/2 max-w-[30rem] md:max-w-[50%] px-6">
			<div class="square bg-c-on-bg/8 rounded-2xl overflow-hidden">
				<img
					class="w-full h-auto absolute"
					src="/illustrations/monkeys/monkey-4.svg"
					alt="Generated MonKey"
				/>
			</div>
		</div>
		<!-- Inputs and buttons -->
		<div class="w-full md:w-1/2 max-w-[30rem] md:max-w-[50%] flex flex-col px-6 my-4">
			<div class="w-full p-1">
				<input
					placeholder="Enter an address "
					type="text"
					class="w-full bg-c-on-bg/5 text-c-on-bg px-4 py-4.5 mt-2 rounded-xl font-medium
					border-[3px] border-c-on-bg/5 hover:border-c-on-bg/20 focus:border-c-primary transition"
				/>
			</div>
			<div class="w-full flex flex-row mt-2">
				<div class="w-full p-1">
					<Button class="w-full">Generate</Button>
				</div>
			</div>
		</div>
	</div>
</div>
