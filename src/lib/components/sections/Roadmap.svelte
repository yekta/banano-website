<script lang="ts">
	import type { IRoadmapItem } from '$lib/ts/interfaces/IRoadmapItem';
	import MoreIndicator from '../MoreIndicator.svelte';

	export let roadmap: IRoadmapItem[];

	let scrollWindow: HTMLElement;
	let isIndicatorVisible = true;
	const indicatorHideThreshold = 100;
	let isEndReached = false;

	function onScroll(e: Event) {
		let scrollTop = scrollWindow.scrollTop;
		if (isIndicatorVisible && scrollTop > indicatorHideThreshold) {
			isIndicatorVisible = false;
		} else if (!isIndicatorVisible && scrollTop <= indicatorHideThreshold) {
			isIndicatorVisible = true;
		}
		if (!isEndReached && scrollTop >= scrollWindow.scrollHeight - scrollWindow.clientHeight) {
			isEndReached = true;
			window.plausible('Roadmap End Reached');
		}
	}
</script>

<div id="roadmap" class="w-full flex justify-center -mt-8 pt-24 pb-12">
	<div class="container-b flex flex-col items-center px-4 md:px-12">
		<h2 class="text-3xl font-bold px-1">Bumpy Roadmap</h2>
		<div
			class="relative rounded-xl bg-c-secondary/5 border-2 border-c-secondary/15 overflow-hidden mt-8"
		>
			<div
				bind:this={scrollWindow}
				on:scroll={onScroll}
				class="w-full flex flex-wrap justify-center overflow-x-hidden overflow-y-auto 
        h-[65vh] min-h-[20rem] max-h-[50rem] relative"
			>
				<div class="w-full flex flex-col justify-start items-start pb-8">
					{#each roadmap as item, index}
						<div
							class="w-full p-1 md:p-4 flex flex-col justify-start items-start relative {index !== 0
								? 'mt-6 md:mt-3'
								: 'mt-1 md:mt-0'}"
						>
							<div class="w-full flex flex-row justify-start px-2 py-1 -ml-6">
								<h3
									class="text-xl font-bold bg-c-secondary pl-12 pr-14 py-2 rounded-r-3xl text-c-bg"
								>
									{item.title}
								</h3>
							</div>
							<div class="flex flex-row flex-wrap mt-1 md:mt-2">
								{#each item.entries as entry}
									<div
										class="flex-grow md:flex-none w-[100%-1rem] md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)] mx-2 my-1 md:m-2 bg-c-bg flex flex-col border-2 border-c-secondary/60 border-dotted rounded-xl p-1.5"
									>
										<h4
											class="w-full font-bold bg-c-secondary/13 text-c-secondary px-3 py-1 rounded-md"
										>
											{entry.title}
										</h4>
										<p class="w-full px-3 py-2">{@html entry.body}</p>
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
