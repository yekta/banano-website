<script lang="ts">
	interface Advisor {
		name: string;
		description: string;
		img: string;
	}

	const advisors: Advisor[] = [
		{
			name: 'Mr. Carlos',
			description: 'PR specialist. Likes pyramids and meth. Wassa-wassa-wassa!',
			img: 'carlos'
		},
		{
			name: 'The Bummer',
			description: 'Professional blame shifter. Expert in twitter fights and JavaScript.',
			img: 'bummer'
		},
		{
			name: 'Satoshi Nakamoto',
			description: 'Is pretty sure that Banano is Colin LeMahieu’s true vision.',
			img: 'satoshi'
		},
		{
			name: 'Crypto Pajeet',
			description: 'TA guru. “Fibbanacci confettis suggest 10000% growth in the next 24hrs.”',
			img: 'pajeet'
		},
		{
			name: 'Trevon',
			description: 'Insecurity engineer and a trendsetter in dank hairstyles.',
			img: 'trevon'
		}
	];

	const imgExtention = 'svg';
</script>

<div id="advisors" class="w-full bg-c-bg flex justify-center pt-8 pb-10 text-center">
	<div class="container-b flex flex-col items-center px-2 md:px-4">
		<div class="container-b-small px-4 md:px-6">
			<div class="w-full bg-c-primary h-1 rounded-full" />
		</div>
		<h2 class="text-3xl font-bold px-3 md:px-12 mt-16">
			Inspired by the industry's least trusted masterminds
		</h2>
		<div class="container-b-small flex flex-wrap justify-center mt-5">
			{#each advisors as advisor}
				<div
					class="w-1/2 md:w-1/3 lg:w-1/3 max-w-[18rem] flex flex-col items-center px-3 py-4 md:p-4 text-center"
				>
					<img
						width="500"
						height="500"
						class="w-full h-auto"
						src="/illustrations/advisors/advisor-{advisor.img}.{imgExtention}"
						alt={advisor.name}
					/>
					<h3 class="font-bold mt-3">{advisor.name.toUpperCase()}</h3>
					<p class="mt-1">{advisor.description}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
