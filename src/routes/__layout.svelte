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
<svelte:head>
	<link
		rel="preload"
		href="/fonts/filson-pro/filson-pro-400.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/filson-pro/filson-pro-500.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/filson-pro/filson-pro-700.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<style>
		@font-face {
			font-family: 'filson-pro';
			font-weight: 400;
			src: url('/fonts/filson-pro/filson-pro-400.woff2') format('woff2'),
				url('/fonts/filson-pro/filson-pro-400.woff') format('woff');
			font-display: block;
			font-style: normal;
		}
		@font-face {
			font-family: 'filson-pro';
			font-weight: 500;
			src: url('/fonts/filson-pro/filson-pro-500.woff2') format('woff2'),
				url('/fonts/filson-pro/filson-pro-500.woff') format('woff');
			font-display: block;
			font-style: normal;
		}
		@font-face {
			font-family: 'filson-pro';
			font-weight: 700;
			src: url('/fonts/filson-pro/filson-pro-700.woff2') format('woff2'),
				url('/fonts/filson-pro/filson-pro-700.woff') format('woff');
			font-display: block;
			font-style: normal;
		}
	</style>
</svelte:head>

<Navbar />
<main class="w-full bg-c-bg text-c-on-bg font-filson-pro flex flex-col justify-start">
	<slot />
</main>
<Footer />
