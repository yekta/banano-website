<script lang="ts">
	import { onMount } from 'svelte';

	const dancingBananaCount = 8;

	interface TeamMember {
		nickname: string;
		description: string;
	}

	const teamMembers: TeamMember[] = [
		{
			nickname: 'Yekta',
			description: 'Leonardo Da Banano'
		},
		{
			nickname: 'Bbedward',
			description: 'Ima bot bleep blob'
		},
		{
			nickname: 'Fudcake',
			description: 'The Banano Republic dictator trainee'
		},
		{
			nickname: 'Renesq',
			description: 'Gandalf level code wizard and chronice procrastinator'
		},
		{
			nickname: 'Coranos',
			description: 'Hardware wallet, vulcanology, and burn specialist'
		},
		{
			nickname: 'Anemone',
			description: 'Chief shitposting orangutan, meme historian'
		},
		{
			nickname: 'Bantano',
			description: 'Ringleader of media operations'
		},
		{
			nickname: 'SoggyApplePie',
			description: 'Baked goods connoisseur'
		},
		{
			nickname: 'Just_Dmitry',
			description: 'бест рашн хацкер'
		},
		{
			nickname: 'Meltingice',
			description: 'Leader of the curious explorers'
		},
		{
			nickname: 'Mitche50',
			description: 'Doer of things'
		},
		{
			nickname: 'Losha1x',
			description: 'Professional life hater'
		}
	];

	let teamMembersShuffled = [...teamMembers];

	onMount(() => {
		teamMembersShuffled = [...teamMembersShuffled.sort(() => Math.random() - 0.5)];
	});
</script>

<div id="team" class="w-full bg-c-bg flex justify-center py-12 text-center">
	<div class="container-b flex flex-col items-center">
		<h2 class="text-3xl font-bold">Meet the Overworked Team</h2>
		<div class="container-b-small flex flex-wrap justify-center mt-5">
			{#each teamMembersShuffled as teamMember, index}
				<div class="w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center p-4">
					<img
						class="w-full h-auto"
						src="/illustrations/dancing-banana/dancing-banana-{index % dancingBananaCount}.svg"
						alt={teamMember.nickname}
					/>
					<h5 class="font-bold mt-3">{teamMember.nickname.toUpperCase()}</h5>
					<p class="mt-1">{teamMember.description}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
