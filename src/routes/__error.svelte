<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ error, status }) => {
		return {
			props: {
				status: status,
				error: error
			}
		};
	};
</script>

<script lang="ts">
	import '$lib/css/main.css';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import BgHero from '$lib/components/backgrounds/BgHero.svelte';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';

	export let status: number;
	export let error: Error;

	onMount(() => {
		document.body.style.backgroundColor = 'rgb(var(--c-secondary))';
	});
</script>

<div class="w-full bg-c-bg flex flex-col items-center justify-start text-center relative">
	<div
		class="w-full bg-c-secondary min-h-[550px] md:min-h-[650px] flex justify-center overflow-hidden"
	>
		<BgHero />
		<BgWaveBottom />
		<div
			class="container-b max-w-full flex flex-col items-center self-center pt-20 pb-32 md:pb-36 relative z-10 px-5"
		>
			<div class="w-full flex flex-col items-center text-c-bg">
				<h1 class="font-bold text-6xl">{status}</h1>
				<p
					class="w-full text-xl max-w-lg font-medium rounded-lg bg-c-bg/10 px-5 py-4 border border-c-bg/10 text-center mt-4 break-all"
				>
					{#if status === 404}
						Page not found
					{:else}
						{error.message}
					{/if}
				</p>
			</div>
			<Button href={'/'} sveltekit:prefetch class="mt-4 w-full max-w-xs">Go Home</Button>
		</div>
	</div>
</div>
