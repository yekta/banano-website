<script lang="ts">
	import { quadOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import IconChevron from './icons/IconChevron.svelte';

	export let scrollWindow: HTMLElement;

	function onIndicatorClick(e: Event) {
		let maxScroll = scrollWindow.scrollHeight - scrollWindow.clientHeight;
		let scrollTo = Math.min(scrollWindow.scrollTop + 500, maxScroll);
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
		<IconChevron
			class="w-12 h-12 animate-bounce text-c-secondary transition-all group-hover:brightness-115"
		/>
	</button>
</div>
