<script lang="ts">
	import PageWrapper from '$components/yellowpaper/PageWrapper.svelte';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={1} class={classes}>
	<h1 class="font-bold text-3xl text-center">
		BANANO: a Feeless, Instant, Rich in Potassium Cryptocurrency Powered by DAG Technology
		Disrupting the Meme Economy
	</h1>
	<p class="mt-12 text-center">
		Banoshi Nakanano
		<br />
		www.banano.cc
	</p>
	<p class="mt-12 text-center">
		<b>Abstract</b>
		<br />
		Don't let your memes be dreams.
	</p>
	<div class="w-full mt-12 flex justify-center">
		<img
			width="1200"
			height="1200"
			class="w-full h-auto max-w-xl"
			src="/yellowpaper/smug.svg"
			alt="Smug Illustration"
		/>
	</div>
</PageWrapper>
