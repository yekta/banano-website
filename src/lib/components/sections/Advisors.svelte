<script lang="ts">
	interface Advisor {
		name: string;
		description: string;
		svg: string;
	}

	const advisors: Advisor[] = [
		{
			name: 'Mr. Carlos',
			description: 'PR specialist. Likes pyramids and meth. Wassa-wassa-wassa!',
			svg: 'carlos'
		},
		{
			name: 'The Bummer',
			description: 'Professional blame shifter. Expert in twitter fights and JavaScript.',
			svg: 'bummer'
		},
		{
			name: 'Satoshi Nakamoto',
			description: 'Is pretty sure that Banano is Colin LeMahieu’s true vision.',
			svg: 'satoshi'
		},
		{
			name: 'Crypto Pajeet',
			description: 'TA guru. “Fibbanacci confettis suggest 10000% growth in the next 24hrs.”',
			svg: 'pajeet'
		},
		{
			name: 'Trevon',
			description: 'Insecurity engineer and a trendsetter in dank hairstyles.',
			svg: 'trevon'
		}
	];
</script>

<div id="advisors" class="w-full bg-c-bg flex justify-center py-12 text-center">
	<div class="container-b flex flex-col items-center">
		<h2 class="text-3xl font-bold">Inspired by the industry's least trusted masterminds</h2>
		<div class="container-b-small flex justify-center flex-wrap mt-5">
			{#each advisors as advisor}
				<div class="w-1/2 md:w-1/2 lg:w-1/3 flex flex-col items-center p-4 text-center">
					<img
						class="w-full h-auto"
						src="/illustrations/advisors/advisor-{advisor.svg}.svg"
						alt={advisor.name}
					/>
					<h5 class="font-bold mt-3">{advisor.name.toUpperCase()}</h5>
					<p class="mt-1">{advisor.description}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
