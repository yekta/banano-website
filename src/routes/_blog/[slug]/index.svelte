<script lang="ts">
	import '$lib/css/main.css';
	import '$lib/css/blog.css';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import { monthsShort } from '$lib/ts/constants/months';
	import type { IBlogPost } from '$lib/ts/interfaces/Blog';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';

	export let post: IBlogPost;

	const formatDate = (str: string) => {
		const dateObj = new Date(str);
		const monthShort = monthsShort[dateObj.getMonth()];
		const day = dateObj.getDate();
		const year = dateObj.getFullYear();
		return `${monthShort} ${day}, ${year}`;
	};

	const title = `${post.title} | Blog`;
	const description = `${post.custom_excerpt ?? post.excerpt}`;
	const canonical = `${canonicalUrl}/${$page.routeId}`;
	const imageUrl = `${post.feature_image}`;
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
<svelte:head>
	<link
		rel="preload"
		href="/fonts/rooney/rooney-400.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/rooney/rooney-700.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/rooney/rooney-400-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/rooney/rooney-700-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<style>
		@font-face {
			font-family: 'rooney';
			font-weight: 400;
			src: url('/fonts/rooney/rooney-400.woff2') format('woff2'),
				url('/fonts/rooney/rooney-400.woff') format('woff');
			font-display: block;
			font-style: normal;
		}
		@font-face {
			font-family: 'rooney';
			font-weight: 700;
			src: url('/fonts/rooney/rooney-700.woff2') format('woff2'),
				url('/fonts/rooney/rooney-700.woff') format('woff');
			font-display: block;
			font-style: normal;
		}
		@font-face {
			font-family: 'rooney';
			font-weight: 400;
			src: url('/fonts/rooney/rooney-400.woff2') format('woff2'),
				url('/fonts/rooney/rooney-400.woff') format('woff');
			font-display: block;
			font-style: italic;
		}
		@font-face {
			font-family: 'rooney';
			font-weight: 700;
			src: url('/fonts/rooney/rooney-700.woff2') format('woff2'),
				url('/fonts/rooney/rooney-700.woff') format('woff');
			font-display: block;
			font-style: italic;
		}
	</style>
</svelte:head>

<div class="w-full blog">
	<div class="w-full relative flex flex-row justify-center overflow-hidden">
		<div
			style="background-image:url(/illustrations/backgrounds/bg-hero.svg)"
			class="w-full bg-c-secondary min-h-[450px] bg-cover bg-bottom flex justify-center overflow-hidden"
		>
			<BgWaveBottom />
			<div
				class="min-h-full container-b-smallest px-5 max-w-full flex flex-col
				self-center pt-28 pb-44 relative z-10 text-c-bg text-left justify-end"
			>
				<h1>{post.title}</h1>
				<p class="text-c-bg/75">
					{formatDate(post.published_at)} <span class="opacity-50">•</span>
					{post.reading_time} min read
				</p>
			</div>
		</div>
	</div>
	<div class="container-b-smallest -mt-36 relative z-10 px-5">
		<img
			class="w-full h-auto bg-c-on-bg/15 border-4 border-c-bg"
			src={post.feature_image}
			alt={post.title}
		/>
	</div>
	<div class="container-b-smallest px-5 py-8 bg-c-bg rounded-xl shadow-2xl shadow-c-bg">
		{@html post.html}
	</div>
</div>
