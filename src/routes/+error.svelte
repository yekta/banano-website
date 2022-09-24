<script context="module" lang="ts">
	import { page } from '$app/stores';
</script>

<script lang="ts">
	import '$css/main.css';
	import Button from '$components/Button.svelte';
	import { onMount } from 'svelte';
	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';
	import BgHeroCover from '$components/backgrounds/BgHeroCover.svelte';

	onMount(() => {
		document.body.style.backgroundColor = 'rgb(var(--c-secondary))';
	});
</script>

<div class="w-full min-h-screen flex flex-col justify-center items-center text-c-bg relative">
	<BgHeroCover />
	<Navbar />
	<div class="flex-1 w-full flex flex-col items-center justify-center">
		<div
			class="container-b max-w-full flex flex-col items-center self-center pt-32 pb-24 relative z-10 px-5"
		>
			<div class="w-full flex flex-col items-center text-c-bg">
				<h1 class="font-bold text-7xl md:text-8xl">{$page.status}</h1>
				<p
					class="w-full text-xl max-w-lg font-medium rounded-xl bg-c-bg/10 px-5 
					py-4 border border-c-bg/10 text-center mt-5 break-all"
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
	<Footer hasBg={false} />
</div>
