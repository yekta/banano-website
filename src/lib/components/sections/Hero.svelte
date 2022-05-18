<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { particlesConfig } from '$lib/ts/constants/particlesConfig';
	import { onMount } from 'svelte';
	import { loadFull } from 'tsparticles';

	let ParticlesComponent: any;

	const particlesInit = async (main: any) => {
		await loadFull(main);
	};
	onMount(async () => {
		ParticlesComponent = (await import('svelte-particles')).default;
	});
</script>

<div class="w-full bg-c-secondary flex flex-col items-center justify-start text-center">
	<div class="w-full relative flex flex-row justify-center overflow-hidden">
		<div
			class="w-full hero bg-c-secondary h-[550px] md:h-[720px] bg-cover flex flex-row
			bg-[position:19%_100%] md:bg-[position:20%_100%] lg:bg-[position:40%_50%]"
		>
			<div class="w-full h-full absolute left-0 top-0">
				<svelte:component
					this={ParticlesComponent}
					id="tsparticles"
					options={particlesConfig}
					{particlesInit}
				/>
			</div>
			<div
				class="container-b max-w-full flex flex-col items-center self-center pb-10 md:pb-12 relative z-10"
			>
				<h1 class="w-220 max-w-full text-2xl font-bold text-c-bg leading-relaxed px-6 md:px-12">
					Banano is a feeless, instant, rich in potassium cryptocurrency powered by DAG technology
					disrupting the meme economy.
				</h1>
				<Button href="/#faucets" class="mt-6 px-12 md:px-16">Get Banano</Button>
			</div>
		</div>
		<div class="w-[110%] -ml-[5%] absolute bottom-0 left-0 overflow-hidden flex justify-center">
			<div
				class="w-full wave h-64 bg-[position:0%_100%] bg-[length:300%] md:bg-[length:200%] lg:bg-[length:150%] xl:bg-contain bg-no-repeat"
			/>
		</div>
	</div>
</div>

<style>
	.hero {
		background-image: url('/illustrations/backgrounds/bg-hero.svg');
	}
	.wave {
		background-image: url('/illustrations/backgrounds/bg-wave-bottom.svg');
	}
</style>
