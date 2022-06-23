<script lang="ts">
	import '$lib/css/main.css';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import { inview } from 'svelte-inview';
	import { blogApiKey, blogApiUrl, shallowPostFields } from '$lib/ts/constants/blog';
	import Button from '$lib/components/Button.svelte';
	import type { IBlogPosts, IBlogPostsShallow } from '$lib/ts/interfaces/Blog';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import IconLoading from '$lib/components/icons/IconLoading.svelte';
	import { tick } from 'svelte';

	export let initialPosts: IBlogPostsShallow;

	let posts = initialPosts;
	let isLoadingMore = false;
	const inviewOptions = {
		rootMargin: '1000px'
	};

	let hasMoreToLoad = true;

	async function getMorePosts() {
		if (isLoadingMore || !hasMoreToLoad) return;

		let { next, limit } = posts.meta.pagination;
		isLoadingMore = true;
		await tick();
		try {
			const url = `${blogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(
				','
			)}&limit=${limit}&page=${next}`;
			const response = await fetch(url);
			const data: IBlogPostsShallow = await response.json();
			posts = {
				meta: data.meta,
				posts: [...posts.posts, ...data.posts]
			};
			if (posts.meta.pagination.next === null) {
				hasMoreToLoad = false;
			}
			window.plausible('Blog | Loaded More Articles', {
				props: { 'Total Article Count': posts.posts.length.toString() }
			});
		} catch (error) {
			console.log(error);
		} finally {
			isLoadingMore = false;
		}
	}

	const title = 'Blog | Banano';
	const description = 'Latest Banano news, developments, and educational content.';
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
<div class="w-full relative flex flex-row justify-center overflow-hidden">
	<div
		style="background-image:url(/illustrations/backgrounds/bg-hero.svg)"
		class="w-full bg-c-secondary bg-cover bg-bottom flex justify-center overflow-hidden"
	>
		<BgWaveBottom />
		<div
			class="container-b-small px-5 md:px-12 max-w-full flex flex-col items-center self-center pt-28 pb-36 xl:pb-40 relative z-10 text-c-bg text-center"
		>
			<h1 class="text-6xl font-bold">Blog</h1>
			<p class="text-xl mt-5">Latest news & developments on the Banano ecosystem.</p>
		</div>
	</div>
</div>
<div class="container-b flex flex-row flex-wrap justify-center md:pt-6 pb-6 md:px-8">
	{#each posts.posts as post}
		<div class="w-full md:w-1/2 xl:w-1/3 max-w-lg p-3 mt-3 bg-c-bg">
			<BlogPostCard {post} />
		</div>
	{/each}
	{#if hasMoreToLoad}
		<div use:inview={inviewOptions} on:enter={getMorePosts} class="w-full" />
		<div class="w-full flex justify-center mt-4 relative">
			<Button
				disabled={isLoadingMore}
				onClick={getMorePosts}
				class="w-64 max-w-full {isLoadingMore ? 'opacity-0' : ''}"
			>
				Load More
			</Button>
			<div
				class="absolute w-full h-full flex justify-center items-center left-0 top-0 pointer-events-none z-10"
			>
				<IconLoading
					class="w-10 h-10 text-c-secondary animate-spin-faster transition {isLoadingMore
						? 'opacity-100'
						: 'opacity-0'}"
				/>
			</div>
		</div>
	{/if}
</div>
