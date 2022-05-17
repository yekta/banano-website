<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const prerender = true;

	export const load: Load = async ({ fetch }) => {
		let [questions, team, testimonials] = await Promise.all([
			fetch('/api/cms/questions').then((res) => res.json()),
			fetch('/api/cms/team').then((res) => res.json()),
			fetch('/api/cms/testimonials').then((res) => res.json())
		]);
		return {
			props: {
				questions,
				team,
				testimonials
			}
		};
	};
</script>

<script lang="ts">
	import Advisors from '$lib/components/sections/Advisors.svelte';
	import CommunityProjects from '$lib/components/sections/CommunityProjects.svelte';
	import Questions from '$lib/components/sections/Questions.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import JoinUs from '$lib/components/sections/JoinUs.svelte';
	import KeyFeatures from '$lib/components/sections/KeyFeatures.svelte';
	import Team from '$lib/components/sections/Team.svelte';
	import Testimonials from '$lib/components/sections/Testimonials.svelte';
	import Wallets from '$lib/components/sections/Wallets.svelte';
	import type { Question } from '$lib/ts/types/interfaces/question';
	import type { TeamMember } from '$lib/ts/types/interfaces/teamMember';

	export let questions: Question[];
	export let testimonials: string[];
	export let team: TeamMember[];
</script>

<div class="w-full min-h-screen flex flex-col justify-start items-center pb-64">
	<Hero />
	<KeyFeatures />
	<Wallets />
	<Team {team} />
	<Testimonials {testimonials} />
	<Advisors />
	<CommunityProjects />
	<Questions {questions} />
	<JoinUs />
</div>
