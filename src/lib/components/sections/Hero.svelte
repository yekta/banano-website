<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<div class="text-c-bg w-full bg-c-secondary flex flex-col items-center justify-start text-center">
	<div class="w-full relative flex flex-row justify-center overflow-hidden">
		<div
			style="background-image:url('/illustrations/backgrounds/bg-hero.svg');"
			class="w-full bg-c-secondary min-h-[550px] md:min-h-[650px] bg-cover flex flex-row
			bg-[position:19%_100%] md:bg-[position:20%_100%] lg:bg-[position:40%_50%]"
		>
			<div
				class="container-b max-w-full flex flex-col items-center self-center pt-20 pb-32 md:pb-36 relative z-10"
			>
				<h1 class="w-220 max-w-full text-2xl font-medium leading-relaxed px-4 md:px-12">
					Banano is a feeless, instant, rich in potassium cryptocurrency powered by DAG technology
					disrupting the meme economy.
				</h1>
				<Button href="/#get-banano" padding="px-12 md:px-16 py-3.5" class="mt-6">Get Banano</Button>
			</div>
		</div>
		<div
			class="w-[110%] -ml-[5%] h-64 absolute bottom-0 left-0 overflow-hidden flex justify-center pointer-events-none"
		>
			<div
				style="background-image:url('/illustrations/backgrounds/bg-wave-bottom.svg');"
				class="w-full bg-[position:0%_100%] bg-[length:300%] md:bg-[length:200%] lg:bg-[length:150%] xl:bg-contain bg-no-repeat"
			/>
		</div>
	</div>
</div>
