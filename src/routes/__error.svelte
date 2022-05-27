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

	export let status: number;
	export let error: Error;

	onMount(() => {
		document.body.style.backgroundColor = 'rgb(var(--c-secondary))';
	});
</script>

<div class="w-full bg-c-secondary flex flex-col items-center justify-start text-center">
	<div class="w-full relative flex flex-row justify-center overflow-hidden">
		<div
			style="background-image:url('/illustrations/backgrounds/bg-hero.svg');"
			class="w-full bg-c-secondary min-h-[550px] md:min-h-[720px] bg-cover flex flex-row
			bg-[position:19%_100%] md:bg-[position:20%_100%] lg:bg-[position:40%_50%] px-4"
		>
			<div
				class="container-b max-w-full flex flex-col items-center self-center pt-20 pb-32 md:pb-36 relative z-10"
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
				<Button href={'/'} class="mt-4 w-full max-w-xs">Go Home</Button>
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
