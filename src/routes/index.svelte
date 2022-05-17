<script lang="ts">
	import Advisors from '$lib/components/sections/Advisors.svelte';
	import CommunityProjects from '$lib/components/sections/CommunityProjects.svelte';
	import FAQ from '$lib/components/sections/FAQ.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import JoinUs from '$lib/components/sections/JoinUs.svelte';
	import KeyFeatures from '$lib/components/sections/KeyFeatures.svelte';
	import Team from '$lib/components/sections/Team.svelte';
	import Testimonials from '$lib/components/sections/Testimonials.svelte';
	import Wallets from '$lib/components/sections/Wallets.svelte';
	import type { Faq } from '$lib/ts/types/interfaces/faq';
	import type { TeamMember } from '$lib/ts/types/interfaces/teamMember';

	export let faq: Faq[];
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
	<FAQ {faq} />
	<JoinUs />
</div>
