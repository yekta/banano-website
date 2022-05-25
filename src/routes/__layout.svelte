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

<style>
	@tailwind base;
	@tailwind components;

	.font-now-alt {
		font-family: now-alt, sans-serif;
	}

	@font-face {
		font-family: 'now-alt';
		font-weight: 400;
		src: url('/fonts/now-alt/now-alt-400.woff2') format('woff2'),
			url('/fonts/now-alt/now-alt-400.woff') format('woff');
		font-display: auto;
		font-style: normal;
	}
	@font-face {
		font-family: 'now-alt';
		font-weight: 500;
		src: url('/fonts/now-alt/now-alt-500.woff2') format('woff2'),
			url('/fonts/now-alt/now-alt-500.woff') format('woff');
		font-display: auto;
		font-style: normal;
	}
	@font-face {
		font-family: 'now-alt';
		font-weight: 700;
		src: url('/fonts/now-alt/now-alt-700.woff2') format('woff2'),
			url('/fonts/now-alt/now-alt-700.woff') format('woff');
		font-display: auto;
		font-style: normal;
	}

	:root {
		--c-primary: 251 221 17;
		--c-secondary: 46 151 55;
		--c-bg: 255 255 255;
		--c-bg-secondary: 240 240 245;
		--c-on-bg: 33 33 36;
		--c-danger: 255 80 80;
		--c-discord: 105 118 191;
		--c-reddit: 225 79 20;
		--c-twitter: 0 162 227;
		--c-instagram: 205 48 108;
		--c-telegram: 0 136 204;
		--c-facebook: 59 89 152;
		--c-youtube: 180 20 20;
		--c-medium: 60 60 70;

		--c-primary-shaded: 231 201 0;
		--c-secondary-shaded: 26 131 35;
		--c-bg-shaded: 235 235 235;
		--c-bg-secondary-shaded: 230 230 235;
		--c-on-bg-shaded: 13 13 16;
		--c-discord-shaded: 85 98 171;
		--c-reddit-shaded: 205 59 0;
		--c-twitter-shaded: 0 142 207;
		--c-instagram-shaded: 185 28 88;
		--c-telegram-shaded: 0 116 183;
		--c-facebook-shaded: 39 69 132;
		--c-youtube-shaded: 160 0 0;
		--c-medium-shaded: 40 40 50;

		--sm: 640px;
		--md: 768px;
		--lg: 1024px;
		--xl: 1280px;
		--2xl: '1536px';
	}

	@tailwind utilities;
</style>
