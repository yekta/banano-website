<script lang="ts">
	import '$css/blog.css';
	import type { IBlogPost } from '$ts/interfaces/Blog';
	import { canonicalUrl } from '$ts/constants/canonical';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import BlogPostCard from '$components/BlogPostCard.svelte';
	import { inview } from 'svelte-inview';
	import { formatDate } from '$ts/helpers/ghost/utils';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import BgWaveBottom from '$components/backgrounds/BgWaveBottom.svelte';
	import { browser } from '$app/environment';
	import { getSignedProxyUrl } from '$ts/helpers/imgproxy';
	import { excerptLength } from '$ts/constants/blog';

	export let data: {
		post: IBlogPost;
		hasTwitterEmbed: boolean;
	};

	$: post = data.post;
	$: hasTwitterEmbed = data.hasTwitterEmbed;

	$: title = `${post.title} | Blog`;
	$: description = `${post.custom_excerpt ?? post.excerpt.slice(0, excerptLength) + '...'}`;
	$: canonical = `${canonicalUrl}${$page.url.pathname}`;
	$: imageUrl = `${post.feature_image ? getSignedProxyUrl(post.feature_image, 1200) : ''}`;

	const inviewOptions = {
		unobserveOnEnter: true
	};

	const onInview = () => {
		window.plausible('Blog | Article End Reached', {
			props: { Title: post.title, Id: post.id }
		});
	};

	let mounted = false;
	$: if (post.title && mounted) {
		handleImages(true);
	}

	afterNavigate(() => {
		handleImages();
	});

	onMount(() => {
		mounted = true;
	});

	function handleImages(onLoad = false) {
		let images = document.querySelectorAll('img');
		images.forEach((i) => {
			if (onLoad) {
				i.onload = () => {
					i.classList.remove('img-loading');
				};
			}
			setTimeout(() => {
				if (i.naturalWidth && i.naturalHeight) {
					i.classList.remove('img-loading');
				}
			}, 200);
		});
	}
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

<article class="w-full blog">
	<div
		style="background-image:url(/illustrations/backgrounds/bg-hero.svg)"
		class="w-full bg-c-secondary min-h-[400px] bg-cover bg-bottom flex justify-center items-center overflow-hidden relative"
	>
		<BgWaveBottom />
		<div
			class="container-b-smallest px-5 max-w-full flex flex-col items-center self-center pt-20 pb-26 md:pb-28 relative z-10 text-c-bg text-center"
		>
			<h1>
				{post.title}
			</h1>
			<p class="text-c-bg/75">
				{formatDate(post.published_at)} <span class="opacity-50 mx-0.3ch">•</span>
				{post.reading_time} min read
			</p>
		</div>
	</div>
	<div class="w-full bg-c-bg -mt-1 relative z-10">
		<div class="container-b-smallest px-5 py-6 md:pt-10">
			{@html post.html}
			{#if browser && hasTwitterEmbed}
				<script async defer src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
			{/if}
			<hr />
		</div>
	</div>
	{#key post.title}
		<div use:inview={inviewOptions} class="w-full" on:enter={onInview} />
	{/key}
</article>
{#if post.similars?.length > 0}
	<div class="w-full flex flex-col mt-6 pb-6">
		<div class="w-full flex justify-center">
			<p class="text-3xl font-bold">Read More</p>
		</div>
		<div class="container-b flex flex-row flex-wrap justify-center mt-1 md:px-8">
			{#each post.similars as p (p.slug)}
				<div class="w-full md:w-1/2 xl:w-1/3 max-w-md p-3 mt-3 bg-c-bg">
					<BlogPostCard post={p} />
				</div>
			{/each}
		</div>
	</div>
{/if}
