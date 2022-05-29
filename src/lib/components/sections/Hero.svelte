<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import Banticles from '$lib/components/Banticles.svelte';
	import BgHero from '../backgrounds/BgHero.svelte';
</script>

<div class="text-c-bg w-full bg-c-secondary flex flex-col items-center justify-start text-center">
	<div class="w-full relative flex flex-row justify-center overflow-hidden">
		<div class="w-full bg-c-secondary min-h-[550px] md:min-h-[650px] flex flex-row relative">
			<BgHero />
			<Banticles
				particleSrc="/images/banana-for-particles.png"
				lineColorRgb={{ r: 251, g: 221, b: 17 }}
			/>
			<BgWaveBottom />
			<div
				class="container-b max-w-full flex flex-col items-center self-center pt-20 pb-32 md:pb-36 relative z-10"
			>
				<h1 class="w-220 max-w-full text-2xl font-medium leading-relaxed px-5 md:px-12">
					Banano is a feeless, instant, rich in potassium cryptocurrency powered by DAG technology
					disrupting the meme economy.
				</h1>
				<div on:click={() => window.plausible('Get Banano Clicked')}>
					<Button href="/#get-banano" padding="px-14 md:px-16 py-3.5" class="mt-6">
						Get Banano
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
