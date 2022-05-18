<script lang="ts">
	import type { IRoadmapItem } from '$lib/ts/interfaces/IRoadmapItem';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import IconChevron from '../icons/IconChevron.svelte';

	export let roadmap: IRoadmapItem[];

	let scrollWindow: HTMLElement;
	let isIndicatorVisible = true;
	const indicatorHideThreshold = 100;

	function onScroll(e: Event) {
		let scrollTop = scrollWindow.scrollTop;
		if (isIndicatorVisible && scrollTop > indicatorHideThreshold) {
			isIndicatorVisible = false;
		} else if (!isIndicatorVisible && scrollTop <= indicatorHideThreshold) {
			isIndicatorVisible = true;
		}
	}
</script>

<div id="roadmap" class="w-full flex justify-center pt-16 pb-24">
	<div class="container-b flex flex-col items-center px-4 md:px-12">
		<h2 class="text-3xl font-bold px-4">Bumpy Roadmap</h2>
		<div
			class="relative rounded-xl bg-c-secondary/5 border-2 border-c-secondary/15 overflow-hidden mt-8"
		>
			<div
				bind:this={scrollWindow}
				on:scroll={onScroll}
				class="w-full flex flex-wrap justify-center overflow-x-hidden overflow-y-auto 
        h-[65vh] min-h-[20rem] max-h-[50rem] relative"
			>
				<div class="w-full flex flex-col pb-12">
					{#each roadmap as item, index}
						<div
							class="w-full p-2 md:p-4 flex flex-col relative {index !== 0 ? 'mt-6 md:mt-3' : ''}"
						>
							<div class="w-full flex flex-row justify-start px-2 py-1 -ml-6">
								<h3
									class="text-xl font-bold bg-c-secondary pl-12 pr-14 py-2 rounded-r-3xl text-c-bg"
								>
									{item.title}
								</h3>
							</div>
							<div class="flex flex-row flex-wrap items-stretch mt-1">
								{#each item.entries as entry}
									<div class="w-full md:w-1/2 lg:w-1/4 p-2 flex items-stretch">
										<div
											class="bg-c-bg flex flex-col w-full border-2 border-c-secondary/60 border-dotted rounded-lg p-1.5"
										>
											<h6 class="font-bold bg-c-secondary/15 text-c-secondary px-3 py-1 rounded-md">
												{entry.title}
											</h6>
											<p class="px-3 py-2">{@html entry.body}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
			{#if isIndicatorVisible}
				<div
					transition:fly|local={{ duration: 200, easing: quadOut, y: 50 }}
					class="w-full flex flex-col justify-end items-center absolute bottom-0 left-0 z-10 
          bg-gradient-to-t from-c-bg to-c-bg/0 rounded-b-xl pointer-events-none"
				>
					<div class="p-2 text-c-secondary animate-bounce">
						<IconChevron class="w-12 h-12" />
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
