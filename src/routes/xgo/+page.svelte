<script lang="ts">
	import '$lib/css/main.css';
	import IconLoading from '$lib/components/icons/IconLoading.svelte';
	import { onMount } from 'svelte';
	import BgHeroCover from '$lib/components/backgrounds/BgHeroCover.svelte';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';

	export const prerender = false;

	const refLink = 'https://xgo.com/referral/658ab71c1ac86008';

	const title = 'Banano + XGo';
	const description =
		'3000 BAN will be rewarded to the first 2000 users that sign up to XGo using this link, complete KYC and do at least $10 of trading volume.';
	const canonical = `${canonicalUrl}${$page.url.pathname}`;
	const imageUrl = `${canonicalUrl}/previews${$page.url.pathname}.jpg`;

	onMount(() => {
		window.location.assign(refLink);
	});
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

<div class="w-full min-h-screen flex flex-col justify-center items-center text-c-bg relative">
	<BgHeroCover />
	<div class="flex flex-col items-center justify-center pt-12 pb-20">
		<IconLoading class="w-10 h-10 animate-spin-faster relative" />
		<h1 class="font-bold text-2xl mt-3 relative">Redirecting</h1>
	</div>
</div>
