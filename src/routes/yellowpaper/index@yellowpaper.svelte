<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import '$lib/css/yellowpaper.css';
	import { page } from '$app/stores';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import Page1 from '$lib/components/yellowpaper/pages/Page1.svelte';
	import Page2 from '$lib/components/yellowpaper/pages/Page2.svelte';
	import Page3 from '$lib/components/yellowpaper/pages/Page3.svelte';
	import Page4 from '$lib/components/yellowpaper/pages/Page4.svelte';
	import Page5 from '$lib/components/yellowpaper/pages/Page5.svelte';
	import Page6 from '$lib/components/yellowpaper/pages/Page6.svelte';
	import Page7 from '$lib/components/yellowpaper/pages/Page7.svelte';

	const title = 'Yellowpaper™ | Banano';
	const description =
		"Meme-rich, interactive and animated Yellowpaper™ of Banano. Learn about Banano's inner workings.";
	const canonical = `${canonicalUrl}/${$page.routeId}`;
	const imageUrl = `${canonicalUrl}/previews/${$page.routeId}.jpg`;
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

<main class="w-full flex justify-center items-start yellowpaper">
	<div class="yellowpaper-container p-3 md:p-5">
		<Page1 />
		<Page2 class="mt-3 md:mt-5" />
		<Page3 class="mt-3 md:mt-5" />
		<Page4 class="mt-3 md:mt-5" />
		<Page5 class="mt-3 md:mt-5" />
		<Page6 class="mt-3 md:mt-5" />
		<Page7 class="mt-3 md:mt-5" />
	</div>
</main>
