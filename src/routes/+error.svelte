<script context="module" lang="ts">
	import { page } from '$app/stores';
</script>

<script lang="ts">
	import '$lib/css/main.css';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import BgHero from '$lib/components/backgrounds/BgHero.svelte';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	onMount(() => {
		document.body.style.backgroundColor = 'rgb(var(--c-secondary))';
	});
</script>

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
	<div
		class="w-full bg-c-bg flex flex-col items-center justify-start text-center relative overflow-hidden"
	>
		<div
			class="w-full bg-c-secondary min-h-[550px] md:min-h-[650px] flex justify-center overflow-hidden"
		>
			<BgHero />
			<BgWaveBottom />
			<div
				class="container-b max-w-full flex flex-col items-center self-center pt-20 pb-32 md:pb-36 relative z-10 px-5"
			>
				<div class="w-full flex flex-col items-center text-c-bg">
					<h1 class="font-bold text-6xl">{$page.status}</h1>
					<p
						class="w-full text-xl max-w-lg font-medium rounded-lg bg-c-bg/10 px-5 py-4 border border-c-bg/10 text-center mt-4 break-all"
					>
						{#if $page.status === 404}
							Page not found
						{:else}
							{$page.error?.message}
						{/if}
					</p>
				</div>
				<Button href={'/'} data-sveltekit-prefetch class="mt-4 w-full max-w-xs">Go Home</Button>
			</div>
		</div>
	</div>
</main>
<Footer />
