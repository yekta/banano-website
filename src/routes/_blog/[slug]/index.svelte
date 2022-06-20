<script lang="ts">
	import '$lib/css/main.css';
	import '$lib/css/blog.css';
	import { monthsShort } from '$lib/ts/constants/months';
	import type { IBlogPost, IBlogPostShallow } from '$lib/ts/interfaces/Blog';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import { notNull } from '$lib/ts/helpers/notNull';

	export let post: IBlogPost;
	export let similarPosts: IBlogPostShallow[];

	const formatDate = (str: string) => {
		const dateObj = new Date(str);
		const monthShort = monthsShort[dateObj.getMonth()];
		const day = dateObj.getDate();
		const year = dateObj.getFullYear();
		return `${monthShort} ${day}, ${year}`;
	};

	const title = `${post.title} | Blog`;
	const description = `${post.custom_excerpt ?? post.excerpt}`;
	const canonical = `${canonicalUrl}${$page.url.pathname}`;
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
		href="/fonts/lora/lora-400.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/lora/lora-700.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/lora/lora-400-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/lora/lora-700-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<style>
		@font-face {
			font-family: 'lora';
			font-weight: 400;
			src: url('/fonts/lora/lora-400.woff2') format('woff2'),
				url('/fonts/lora/lora-400.woff') format('woff');
			font-display: block;
			font-style: normal;
		}
		@font-face {
			font-family: 'lora';
			font-weight: 700;
			src: url('/fonts/lora/lora-700.woff2') format('woff2'),
				url('/fonts/lora/lora-700.woff') format('woff');
			font-display: block;
			font-style: normal;
		}
		@font-face {
			font-family: 'lora';
			font-weight: 400;
			src: url('/fonts/lora/lora-400.woff2') format('woff2'),
				url('/fonts/lora/lora-400.woff') format('woff');
			font-display: block;
			font-style: italic;
		}
		@font-face {
			font-family: 'lora';
			font-weight: 700;
			src: url('/fonts/lora/lora-700.woff2') format('woff2'),
				url('/fonts/lora/lora-700.woff') format('woff');
			font-display: block;
			font-style: italic;
		}
	</style>
</svelte:head>

<div class="w-full blog">
	<div class="container-b-smallest relative flex flex-col overflow-hidden pt-24 md:pt-28 px-5">
		<h1>{post.title}</h1>
		<p class="text-c-on-bg/60">
			{formatDate(post.published_at)} <span class="opacity-40">•</span>
			{post.reading_time} min read
		</p>
	</div>
	<div class="container-b-smallest px-5 py-8 bg-c-bg rounded-xl shadow-2xl shadow-c-bg">
		{@html post.html}
		<hr />
	</div>
</div>
{#if similarPosts.length > 0}
	<div class="w-full flex flex-col mt-4 pb-6">
		<div class="w-full flex justify-center">
			<p class="text-3xl font-bold">Read More</p>
		</div>
		<div class="container-b flex flex-row flex-wrap justify-center mt-1 md:px-8">
			{#each similarPosts as post}
				<div class="w-full md:w-1/2 xl:w-1/3 max-w-md p-3 mt-3 bg-c-bg">
					<BlogPostCard {post} />
				</div>
			{/each}
		</div>
	</div>
{/if}
