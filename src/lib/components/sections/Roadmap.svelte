<script lang="ts">
	import type { IRoadmapItem } from '$lib/ts/interfaces/IRoadmapItem';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

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
		<h2 class="text-3xl font-bold">Bumpy Roadmap</h2>
		<div class="relative rounded-xl border-[3px] border-c-secondary overflow-hidden mt-5">
			<div
				bind:this={scrollWindow}
				on:scroll={onScroll}
				class="w-full flex flex-wrap justify-center overflow-auto 
        h-[65vh] min-h-[20rem] max-h-[50rem] relative"
			>
				<div class="w-full flex flex-col">
					{#each roadmap as item, index}
						<div
							class="w-full p-2 md:p-4 flex flex-col relative {index !== 0 ? 'mt-4 md:mt-2' : ''}"
						>
							<div class="w-full flex flex-row justify-start px-2 py-1">
								<h5
									class="text-xl font-bold bg-c-secondary px-8 md:px-16 py-2 rounded-lg text-c-bg"
								>
									{item.title}
								</h5>
							</div>
							<div class="flex flex-row flex-wrap items-stretch mt-1">
								{#each item.entries as entry}
									<div class="w-full md:w-1/2 lg:w-1/4 p-2 flex items-stretch">
										<div
											class="flex flex-col w-full border-2 border-c-secondary/60 border-dotted rounded-lg p-2"
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-10 w-10"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
