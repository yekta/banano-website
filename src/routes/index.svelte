<script context="module" lang="ts">
	export const prerender = true;
</script>

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
	import Explorer from '$lib/components/sections/Explorer.svelte';
	import type { IFaq } from '$lib/ts/interfaces/IFaq';
	import type { ITeamMember } from '$lib/ts/interfaces/ITeamMember';
	import type { ICommunityProject } from '$lib/ts/interfaces/ICommunityProject';
	import type { IAnnouncement } from '$lib/ts/interfaces/IAnnouncement';
	import type { IRoadmapItem } from '$lib/ts/interfaces/IRoadmapItem';
	import type { IFaucet } from '$lib/ts/interfaces/IFaucet';
	import Announcements from '$lib/components/sections/Announcements.svelte';
	import Roadmap from '$lib/components/sections/Roadmap.svelte';
	import WrappedBanano from '$lib/components/sections/WrappedBanano.svelte';
	/* 	import Monkey from '$lib/components/sections/Monkey.svelte'; */
	import Yellowpaper from '$lib/components/sections/Yellowpaper.svelte';
	import GetBanano from '$lib/components/sections/GetBanano.svelte';

	export let faq: IFaq[];
	export let testimonials: string[];
	export let team: ITeamMember[];
	export let communityProjects: ICommunityProject[];
	export let announcements: IAnnouncement[];
	export let roadmap: IRoadmapItem[];
	export let faucets: IFaucet[];
</script>

<div class="w-full min-h-screen flex flex-col justify-start items-center bg-c-bg">
	<Hero />
	<KeyFeatures />
	<GetBanano {faucets} />
	<!-- 	<Monkey /> -->
	<WrappedBanano />
	<Explorer />
	<Wallets />
	<CommunityProjects {communityProjects} />
	<Yellowpaper />
	<Roadmap {roadmap} />
	<Announcements {announcements} />
	<Team {team} />
	<Advisors />
	<Testimonials {testimonials} />
	<FAQ {faq} />
	<JoinUs />
</div>
