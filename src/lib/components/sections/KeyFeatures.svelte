<script lang="ts">
	interface KeyFeature {
		text: string;
		svg: string;
	}
	const keyFeatures: KeyFeature[] = [
		{ text: 'The Block-Lettuce™ DAG Architecture', svg: 'block-lettuce' },
		{ text: 'Instant and Feeless Transactions', svg: 'instant-feeless' },
		{ text: 'Fungible & Edible', svg: 'fungible' },
		{ text: 'Daily Potassium Airdrops', svg: 'airdrops' },
		{ text: 'Ripe for Memes', svg: 'memes' },
		{ text: 'Literally Grows on Trees, No Mining Required', svg: 'trees' },
		{ text: 'Not a Shitcoin (Until Digested)', svg: 'shitcoin' },
		{ text: 'No More Confusing Units, 1 Banano = 100 Banoshi', svg: 'units' }
	];
</script>

<div class="w-full flex justify-center bg-c-bg -mt-32 relative pb-20 px-4">
	<div class="container-b flex flex-col items-center text-center">
		<h2 class="text-3xl font-bold">Key Features</h2>
		<p class="container-b-small max-w-full mt-3 text-lg px-4">
			Banano is a 4th generation fungible & edible cryptocurrency with a cool yellow logo and
			particles.js background. Our team is top-notch and the project advisors are by a moonshot best
			in the business.
		</p>
		<div class="container-b-small max-w-full flex flex-row flex-wrap mt-5">
			{#each keyFeatures as feature}
				<div class="w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center p-4">
					<img src="/illustrations/key-features/{feature.svg}.svg" alt={feature.text} />
					<p class="mt-3 w-full">{feature.text.toUpperCase()}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
