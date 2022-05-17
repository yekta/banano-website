<script lang="ts">
	import { months } from '$lib/ts/constants/months';

	import type { IAnnouncement } from '$lib/ts/interfaces/IAnnouncement';

	export let announcements: IAnnouncement[];

	const dateFormatter = (date: Date) =>
		`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
</script>

<div id="news" class="w-full flex justify-center pt-16 pb-24">
	<div class="container-b flex flex-col items-center px-4 md:px-12">
		<h2 class="text-3xl font-bold">The Banano Republic Announces</h2>
		<div class="w-full bg-c-secondary h-[3px] rounded-full mt-8" />
		<div class="w-full flex flex-wrap justify-center items-start mt-5">
			{#each announcements as announcement, index}
				<div class="flex flex-col w-full md:w-1/2 lg:w-1/3 px-6 py-4">
					<h5 class="text-lg font-bold">{announcement.title}</h5>
					<p class="font-semibold text-sm mt-1.5">{dateFormatter(new Date(announcement.date))}</p>
					<p class="mt-3 cms">{@html announcement.body}</p>
				</div>
			{/each}
		</div>
		<div class="w-full bg-c-secondary h-[3px] rounded-full mt-6 mb-2" />
	</div>
</div>
