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
	import Announcements from '$lib/components/sections/Announcements.svelte';
	import Roadmap from '$lib/components/sections/Roadmap.svelte';

	export let faq: IFaq[];
	export let testimonials: string[];
	export let team: ITeamMember[];
	export let communityProjects: ICommunityProject[];
	export let announcements: IAnnouncement[];
	export let roadmap: IRoadmapItem[];
</script>

<div class="w-full min-h-screen flex flex-col justify-start items-center pb-64">
	<Hero />
	<KeyFeatures />
	<Wallets />
	<Team {team} />
	<Testimonials {testimonials} />
	<Advisors />
	<CommunityProjects {communityProjects} />
	<FAQ {faq} />
	<Explorer />
	<Roadmap {roadmap} />
	<Announcements announcements={announcements.slice(0, 6)} />
	<JoinUs />
</div>
