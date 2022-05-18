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
	<div class="w-full relative flex justify-center">
		<div
			class="w-full hero bg-c-secondary h-[550px] md:h-[700px] bg-cover flex flex-row
			bg-[position:19%_100%] md:bg-[position:20%_100%] lg:bg-[position:50%_100%] xl:bg-[position:50%_100%]"
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
				class="container-b max-w-full flex flex-col items-center self-center pb-8 md:pb-12 relative z-10"
			>
				<h1 class="w-220 max-w-full text-2xl font-bold text-c-bg leading-relaxed px-6 md:px-12">
					Banano is a feeless, instant, rich in potassium cryptocurrency powered by DAG technology
					disrupting the meme economy.
				</h1>
				<Button href="/#faucets" class="mt-6 px-12 md:px-16">Get Banano</Button>
			</div>
		</div>
		<div class="w-full absolute -bottom-48 left-0 overflow-hidden">
			<div class="wave w-[103%] h-64 bg-left-top bg-cover" />
		</div>
	</div>
</div>

<style>
	.hero {
		background-image: url('/illustrations/backgrounds/bg-hero.svg');
	}
	.wave {
		background-image: url('/illustrations/backgrounds/bg-wave-top.svg');
	}
</style>
