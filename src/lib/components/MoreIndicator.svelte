<script lang="ts">
	import { quadOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import IconChevron from './icons/IconChevron.svelte';

	export let scrollWindow: HTMLElement;

	const scrollAmount = 400;

	function onIndicatorClick(e: Event) {
		let maxScroll = scrollWindow.scrollHeight - scrollWindow.clientHeight;
		let scrollTo = Math.min(scrollWindow.scrollTop + scrollAmount, maxScroll);
		scrollWindow.scrollTo({
			top: scrollTo,
			behavior: 'smooth'
		});
	}
</script>

<div
	transition:fly|local={{ duration: 200, easing: quadOut, y: 50 }}
	class="w-full flex flex-col justify-end items-center absolute bottom-0 left-0 z-10 
	bg-gradient-to-t from-c-bg to-c-bg/0 rounded-b-xl pointer-events-none"
>
	<button on:click={onIndicatorClick} class="py-2 px-4 min-h-full group pointer-events-auto">
		<p class="w-0 h-0 overflow-hidden opacity-0 pointer-events-none">Click to see more</p>
		<IconChevron
			class="w-12 h-12 animate-bounce text-c-secondary transition-all group-hover:brightness-120"
		/>
	</button>
</div>
