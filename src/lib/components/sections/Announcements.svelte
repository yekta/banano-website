<script lang="ts">
	import { months } from '$lib/ts/constants/months';

	import type { IAnnouncement } from '$lib/ts/interfaces/IAnnouncement';
	import MoreIndicator from '../MoreIndicator.svelte';

	export let announcements: IAnnouncement[];

	const dateFormatter = (date: Date) =>
		`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

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

<div id="news" class="w-full flex justify-center pt-8 pb-16">
	<div class="container-b flex flex-col items-center px-4 md:px-12">
		<h2 class="text-3xl font-bold text-center px-4">The Banano Republic Announces</h2>
		<div class="w-full bg-c-secondary h-[3px] rounded-full mt-8" />
		<div class="overflow-hidden relative">
			<div
				bind:this={scrollWindow}
				on:scroll={onScroll}
				class="w-full overflow-auto h-[65vh] min-h-[20rem] max-h-[50rem]"
			>
				<div class="w-full flex flex-wrap justify-center items-stretch mt-4 md:pt-2 pb-8 md:px-5">
					{#each announcements as announcement}
						<div class="w-full flex items-stretch md:w-1/2 lg:w-1/3 p-2">
							<div
								class="flex flex-col items-start w-full px-5 py-4 md:px-6 md:py-5 
								bg-c-secondary/8 border border-c-secondary/20 rounded-xl"
							>
								<h3 class="text-lg font-bold">{announcement.title}</h3>
								<p
									class="font-medium text-sm mt-2 text-c-on-bg/75 bg-c-on-bg/8 pl-3 pr-3.5 py-1 rounded-l rounded-r-2xl"
								>
									{dateFormatter(new Date(announcement.date))}
								</p>
								<p class="mt-3 markdown">{@html announcement.body}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
			{#if isIndicatorVisible}
				<MoreIndicator {scrollWindow} />
			{/if}
		</div>

		<div class="w-full bg-c-secondary h-[3px] rounded-full mb-2" />
	</div>
</div>
