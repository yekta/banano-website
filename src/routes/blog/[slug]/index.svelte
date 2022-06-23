<script lang="ts">
	import '$lib/css/main.css';
	import '$lib/css/blog.css';
	import type { IBlogPost, IBlogPostShallow } from '$lib/ts/interfaces/Blog';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import { inview } from 'svelte-inview';
	import { formatDate } from '$lib/ts/helpers/ghost/utils';

	export let post: IBlogPost;
	export let similarPosts: IBlogPostShallow[];

	const title = `${post.title} | Blog`;
	const description = `${post.custom_excerpt ?? post.excerpt}`;
	const canonical = `${canonicalUrl}${$page.url.pathname}`;
	const imageUrl = `${post.feature_image}`;

	const inviewOptions = {
		unobserveOnEnter: true
	};

	const onInview = () => {
		window.plausible('Blog | Article End Reached', {
			props: { Title: post.title, Id: post.id }
		});
	};
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

<article class="w-full blog mt-24 md:mt-28">
	<div class="container-b-smallest relative flex flex-col overflow-hidden px-5">
		<h1>{post.title}</h1>
		<p class="text-c-on-bg/60">
			{formatDate(post.published_at)} <span class="opacity-40 mx-0.3ch">•</span>
			{post.reading_time} min read
		</p>
	</div>
	<div class="container-b-smallest px-5 py-8 bg-c-bg rounded-xl shadow-2xl shadow-c-bg">
		{@html post.html}
		<hr />
	</div>
	<div use:inview={inviewOptions} class="w-full" on:enter={onInview} />
</article>
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
