<script>
	import Button from '$lib/components/Button.svelte';
</script>

<div
	id="hero"
	class="hero w-full bg-c-secondary flex flex-col items-center justify-start text-center bg-cover bg-[position:19%_0%] md:bg-[position:22%_0%] lg:bg-[position:38%_0%] xl:bg-[position:50%_100%]"
>
	<div class="w-full relative flex justify-center px-6">
		<div class="container-b max-w-full h-210 md:h-230 py-44 md:py-64 flex flex-col items-center">
			<h1 class="w-200 max-w-full text-2xl font-bold text-c-bg leading-relaxed">
				Banano is a feeless, instant, rich in potassium cryptocurrency powered by DAG technology
				disrupting the meme economy.
			</h1>
			<Button href="/#faucets" class="mt-6 px-12 md:px-16">Get Banano</Button>
		</div>
		<div class="w-full absolute bottom-0 left-0 overflow-hidden">
			<div class="wave first-line:w-[105%] h-64 bg-left-top bg-cover" />
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
