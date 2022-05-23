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
		document.body.style.color = 'rgb(var(--c-on-bg))';
		document.body.style.fontFamily = 'now-alt, system-ui, sans-serif';
	});
</script>

<div class="w-full min-h-screen flex flex-col items-center px-4 py-64 bg-c-secondary">
	<div
		class="max-w-xl min-w-[15rem] my-auto flex flex-col items-center justify-center 
    rounded-xl bg-c-bg/10 border border-c-bg/10 px-8 py-6"
	>
		<div class="w-full flex flex-col gap-3 items-center text-c-bg">
			<h1 class="font-bold text-3xl">{status}</h1>
			<p
				class="w-full font-medium rounded-lg bg-c-bg/10 px-3 py-1.5 border border-c-bg/10 text-center"
			>
				{#if status === 404}
					Page not found
				{:else}
					{error.message}
				{/if}
			</p>
		</div>
		{#if status === 404}
			<Button href={'/'} class="mt-4">Go Home</Button>
		{/if}
	</div>
</div>
