<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import Page1 from '$lib/components/yellowpaper/pages/Page1.svelte';

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

<main class="w-full flex justify-center items-start">
	<div class="yellowpaper-container p-3 md:p-5">
		<Page1 />
	</div>
</main>
