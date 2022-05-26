<script lang="ts">
	import '$lib/css/main.css';
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
	import Monkey from '$lib/components/sections/Monkey.svelte';
	import Yellowpaper from '$lib/components/sections/Yellowpaper.svelte';
	import GetBanano from '$lib/components/sections/GetBanano.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { canonicalUrl } from '$lib/ts/constants/canonical';

	export let faq: IFaq[];
	export let testimonials: string[];
	export let team: ITeamMember[];
	export let communityProjects: ICommunityProject[];
	export let announcements: IAnnouncement[];
	export let roadmap: IRoadmapItem[];
	export let faucets: IFaucet[];

	const description =
		'Banano is a feeless, instant, rich in potassium cryptocurrency powered by DAG technology disrupting the meme economy.';
	const title = "Banano | Don't let your memes be dreams";
	const canonical = canonicalUrl;
	const imageUrl = `${canonicalUrl}/previews/home.jpg`;
</script>

<MetaTags
	{title}
	{description}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title: title,
		description: description,
		images: [
			{
				url: imageUrl,
				width: 1200,
				height: 630
			}
		]
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: title,
		description: description,
		image: imageUrl
	}}
/>

<Hero />
<KeyFeatures />
<GetBanano {faucets} />
<Monkey />
<WrappedBanano />
<Explorer />
<Wallets />
<CommunityProjects {communityProjects} />
<Yellowpaper />
<Announcements {announcements} />
<Roadmap {roadmap} />
<Team {team} />
<Advisors />
<Testimonials {testimonials} />
<FAQ {faq} />
<JoinUs />
