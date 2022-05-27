<script lang="ts">
	import { inview } from 'svelte-inview';

	export let importFunc: () => Promise<any>;
	export let placeholderComponent: any;
	export let rootMargin: number = 1000;

	let isShowingComponent = false;
	let componentPromise: Promise<any>;

	const options = {
		rootMargin: rootMargin.toString() + 'px',
		unobserveOnEnter: true
	};
</script>

{#if !isShowingComponent}
	<div
		class="w-0 h-0"
		use:inview={options}
		on:enter={() => {
			componentPromise = importFunc();
			isShowingComponent = true;
		}}
	/>
	<svelte:component this={placeholderComponent} />
{:else}
	{#await componentPromise}
		<svelte:component this={placeholderComponent} />
	{:then { default: Component }}
		<svelte:component this={Component} />
	{/await}
{/if}
