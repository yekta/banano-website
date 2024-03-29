<script lang="ts">
	import '$css/main.css';
	import BgWaveBottom from '$components/backgrounds/BgWaveBottom.svelte';
	import { inview } from 'svelte-inview';
	import {
		blogApiKey,
		excerptLength,
		shallowPostFields,
		utilsBlogApiUrl
	} from '$ts/constants/blog';
	import Button from '$components/Button.svelte';
	import type { IBlogPostsShallow, ISearchResult } from '$ts/interfaces/Blog';
	import { canonicalUrl } from '$ts/constants/canonical';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import BlogPostCard from '$components/BlogPostCard.svelte';
	import IconLoading from '$components/icons/IconLoading.svelte';
	import { tick } from 'svelte';
	import BlogSearchBar from '$components/BlogSearchBar.svelte';

	export let data: {
		initialPosts: IBlogPostsShallow;
		searchResult: ISearchResult[];
		error: string | undefined;
	};

	const { initialPosts, searchResult, error } = data;

	let posts = initialPosts;
	let isLoadingMore = false;
	const inviewOptions = {
		rootMargin: '1000px'
	};

	let hasMoreToLoad = true;

	async function getMorePosts() {
		if (isLoadingMore || !hasMoreToLoad) return;
		let { next, limit } = posts.meta.pagination;
		if (next === null || next === undefined) {
			hasMoreToLoad = false;
			isLoadingMore = false;
			return;
		}
		isLoadingMore = true;
		await tick();
		try {
			const url = `${utilsBlogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(
				','
			)}&limit=${limit}&page=${next}`;
			const response = await fetch(url);
			const data: IBlogPostsShallow = await response.json();
			let editedPosts = data.posts.map((post) => {
				let { excerpt, ...rest } = post;
				let editedExcerpt = excerpt.slice(0, excerptLength) + '...';
				return { excerpt: editedExcerpt, ...rest };
			});
			posts = {
				meta: data.meta,
				posts: [...posts.posts, ...editedPosts]
			};
			if (posts.meta.pagination.next === null || posts.meta.pagination.next === undefined) {
				hasMoreToLoad = false;
				window.plausible('Blog | Loaded More Articles', {
					props: { 'Total Article Count': `${posts.posts.length.toString()} (Max)` }
				});
			} else {
				window.plausible('Blog | Loaded More Articles', {
					props: { 'Total Article Count': posts.posts.length.toString() }
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			isLoadingMore = false;
		}
	}

	const title = 'Blog | Banano';
	const description = 'Latest Banano news, developments, and educational content.';
	const canonical = `${canonicalUrl}${$page.url.pathname}`;
	const imageUrl = `${canonicalUrl}/previews${$page.url.pathname}.jpg`;
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
		class="w-full bg-c-secondary min-h-[400px] bg-cover bg-bottom flex justify-center items-center overflow-hidden"
	>
		<BgWaveBottom />
		<div
			class="container-b-small px-5 md:px-12 max-w-full flex flex-col items-center self-center pt-20 pb-26 md:pb-28 relative z-10 text-c-bg text-center"
		>
			<h1 class="text-6xl font-bold">Blog</h1>
			<p class="text-xl mt-5">Latest news & developments on the Banano ecosystem.</p>
		</div>
	</div>
</div>
<div
	class="container-b flex flex-row flex-wrap justify-center md:pt-6 pb-6 md:px-8 bg-c-bg -mt-1 relative z-10"
>
	<div class="w-full flex justify-center mt-3 md:mb-1">
		<div class="w-full max-w-lg md:max-w-2xl px-4">
			<BlogSearchBar {searchResult} />
		</div>
	</div>
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
