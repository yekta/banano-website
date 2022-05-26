<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { isTouchscreen } from '$lib/ts/stores/isTouchscreen';
	import { onMount } from 'svelte';

	let lastTouchTime = 0;
	function handleTouch() {
		lastTouchTime = Date.now();
		if (!$isTouchscreen) {
			$isTouchscreen = true;
		}
	}
	async function disableTouch() {
		if (Date.now() - lastTouchTime < 1000) {
			return;
		} else if ($isTouchscreen) {
			$isTouchscreen = false;
		}
	}

	onMount(() => {
		document.body.style.backgroundColor = 'rgb(var(--c-secondary))';
	});
</script>

<svelte:window on:touchstart={handleTouch} on:mousemove={disableTouch} />

<div class="w-full bg-c-bg text-c-on-bg font-now-alt min-h-screen flex flex-col justify-start">
	<Navbar />
	<main>
		<slot />
	</main>
	<Footer />
</div>
