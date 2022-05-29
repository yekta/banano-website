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
			window.plausible('Announcements End Reached');
		}
	}
</script>

<div id="news" class="w-full flex justify-center -mt-8 pt-24">
	<div class="container-b flex flex-col items-center px-5 md:px-12">
		<h2 class="text-3xl font-bold text-center">The Banano Republic Announces</h2>
		<div class="w-full bg-c-secondary h-3px rounded-full mt-8" />
		<div class="overflow-hidden relative">
			<div
				bind:this={scrollWindow}
				on:scroll={onScroll}
				class="w-full overflow-auto h-[65vh] min-h-[20rem] max-h-[50rem]"
			>
				<div class="w-full flex flex-wrap justify-center mt-4 md:pt-2 pb-8 md:px-5">
					{#each announcements as announcement}
						<div
							class="flex-grow md:flex-none w-[calc(100%-1rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] m-2 flex flex-col items-start px-5 py-4 md:px-6 md:py-5 
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
					{/each}
				</div>
			</div>
			{#if isIndicatorVisible}
				<MoreIndicator {scrollWindow} />
			{/if}
		</div>

		<div class="w-full bg-c-secondary h-3px rounded-full mb-2" />
	</div>
</div>
