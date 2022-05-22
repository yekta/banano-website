<script lang="ts">
	import type { IRoadmapItem } from '$lib/ts/interfaces/IRoadmapItem';
	import MoreIndicator from '../MoreIndicator.svelte';

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

<div id="roadmap" class="w-full flex justify-center pt-12 pb-12">
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
				<div class="w-full flex flex-col pb-8">
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
							<div class="flex flex-row flex-wrap items-stretch mt-1 md:mt-2">
								{#each item.entries as entry}
									<div class="w-full md:w-1/2 lg:w-1/4 p-2 flex items-stretch">
										<div
											class="bg-c-bg flex flex-col w-full border-2 border-c-secondary/60 border-dotted rounded-xl p-1.5"
										>
											<h6 class="font-bold bg-c-secondary/13 text-c-secondary px-3 py-1 rounded-md">
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
				<MoreIndicator {scrollWindow} />
			{/if}
		</div>
	</div>
</div>
