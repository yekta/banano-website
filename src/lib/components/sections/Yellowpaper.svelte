<script lang="ts">
	import Button from '../Button.svelte';
</script>

<div id="yellowpaper" class="w-full flex justify-center relative -mt-8 pt-24 text-center">
	<div class="container-b flex flex-col">
		<div class="w-full flex flex-col items-center px-4">
			<h2 class="text-3xl font-bold px-4">Yellowpaper™</h2>
			<p class="mt-3 text-lg container-b-small px-2 md:px-16 lg:px-24">
				Check out our meme-rich, interactive and animated Yellowpaper™ to learn more about Banano's
				inner workings.
			</p>
			<Button class="mt-6" padding="py-3.5 px-8 md:px-14" href="/yellowpaper" sveltekit:prefetch>
				Check out Yellowpaper™
			</Button>
			<div class="container-b-smallest max-w-full flex flex-row flex-wrap justify-center mt-12">
				<img
					width="650"
					height="358"
					class="w-full"
					src="/illustrations/foreground/yellowpaper.svg"
					alt="Yellowpaper"
				/>
			</div>
		</div>
	</div>
</div>
