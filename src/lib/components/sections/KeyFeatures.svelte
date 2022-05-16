<script lang="ts">
	interface KeyFeature {
		title: string;
		img: string;
	}
	const keyFeatures: KeyFeature[] = [
		{ title: 'The Block-Lettuce™ DAG Architecture', img: 'block-lettuce' },
		{ title: 'Instant and Feeless Transactions', img: 'instant-feeless' },
		{ title: 'Fungible & Edible', img: 'fungible' },
		{ title: 'Daily Potassium Airdrops', img: 'airdrops' },
		{ title: 'Ripe for Memes', img: 'memes' },
		{ title: 'Literally Grows on Trees, No Mining Required', img: 'trees' },
		{ title: 'Not a Shitcoin (Until Digested)', img: 'shitcoin' },
		{ title: 'No More Confusing Units, 1 Banano = 100 Banoshi', img: 'units' }
	];

	const imgExtention = 'svg';
</script>

<div
	id="key-features"
	class="w-full flex justify-center bg-c-bg -mt-32 relative pb-20 px-4 text-center"
>
	<div class="container-b flex flex-col items-center">
		<h2 class="text-3xl font-bold">Key Features</h2>
		<p class="container-b-small max-w-full mt-3 text-lg px-4">
			Banano is a 4th generation fungible & edible cryptocurrency with a cool yellow logo and
			particles.js background. Our team is top-notch and the project advisors are by a moonshot best
			in the business.
		</p>
		<div class="container-b-small max-w-full flex flex-row flex-wrap justify-center mt-5">
			{#each keyFeatures as feature}
				<div class="w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center p-4">
					<img src="/illustrations/key-features/{feature.img}.{imgExtention}" alt={feature.title} />
					<p class="mt-3 w-full">{feature.title.toUpperCase()}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
