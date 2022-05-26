<script lang="ts">
	import type { ITeamMember } from '$lib/ts/interfaces/ITeamMember';
	import { onMount } from 'svelte';

	export let team: ITeamMember[];

	const dancingBananaCount = 8;
	let teamShuffled = [...team];

	onMount(() => {
		teamShuffled = [...teamShuffled.sort(() => Math.random() - 0.5)];
	});
</script>

<div id="team" class="w-full bg-c-bg flex justify-center py-6 text-center">
	<div class="container-b flex flex-col items-center px-4">
		<h2 class="text-3xl font-bold px-1">Meet the Overworked Team</h2>
		<div class="container-b flex flex-wrap justify-center mt-4 md:px-16 lg:px-20">
			{#each teamShuffled as teamMember, index}
				<div
					class="w-1/2 md:w-1/3 lg:w-1/4 max-w-[14rem] flex flex-col items-center px-3 py-4 md:p-4 mt-2"
				>
					<img
						width="500"
						height="500"
						class="w-full h-auto"
						src="/illustrations/dancing-banana/dancing-banana-{index % dancingBananaCount}.svg"
						alt={teamMember.nickname}
					/>
					<h3 class="font-bold mt-3">{teamMember.nickname.toUpperCase()}</h3>
					<p class="mt-1">{teamMember.description}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
