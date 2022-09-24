<script lang="ts">
	import '$css/main.css';
	import Advisors from '$components/sections/Advisors.svelte';
	import CommunityProjects from '$components/sections/CommunityProjects.svelte';
	import FAQ from '$components/sections/FAQ.svelte';
	import Hero from '$components/sections/Hero.svelte';
	import JoinUs from '$components/sections/JoinUs.svelte';
	import KeyFeatures from '$components/sections/KeyFeatures.svelte';
	import Team from '$components/sections/Team.svelte';
	import Testimonials from '$components/sections/Testimonials.svelte';
	import Wallets from '$components/sections/Wallets.svelte';
	import Explorer from '$components/sections/Explorer.svelte';
	import type { IFaq } from '$ts/interfaces/Faq';
	import type { ITeamMember } from '$ts/interfaces/TeamMember';
	import type { ICommunityProject } from '$ts/interfaces/CommunityProject';
	import type { IAnnouncement } from '$ts/interfaces/Announcement';
	import type { IRoadmapItem } from '$ts/interfaces/RoadmapItem';
	import type { IFaucet } from '$ts/interfaces/Faucet';
	import Announcements from '$components/sections/Announcements.svelte';
	import Roadmap from '$components/sections/Roadmap.svelte';
	import WrappedBanano from '$components/sections/WrappedBanano.svelte';
	import Monkey from '$components/sections/Monkey.svelte';
	import Yellowpaper from '$components/sections/Yellowpaper.svelte';
	import GetBanano from '$components/sections/GetBanano.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { canonicalUrl } from '$ts/constants/canonical';
	import BusinessContact from '$components/sections/BusinessContact.svelte';

	export let data: {
		faq: IFaq[];
		team: ITeamMember[];
		communityProjects: ICommunityProject[];
		announcements: IAnnouncement[];
		roadmap: IRoadmapItem[];
		faucets: IFaucet[];
		testimonials: string[];
	};

	const { faq, team, communityProjects, announcements, roadmap, faucets, testimonials } = data;

	const description =
		"Banano is a feeless, instant, rich in potassium cryptocurrency powered by DAG technology disrupting the meme economy. Don't let your memes be dreams.";
	const title = 'Banano';
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
<BusinessContact />
<JoinUs />
