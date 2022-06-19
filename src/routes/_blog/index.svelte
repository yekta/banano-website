<script lang="ts">
	import '$lib/css/main.css';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import { inview } from 'svelte-inview';
	import { blogApiKey, blogApiUrl, shallowPostFields } from '$lib/ts/constants/blog';
	import Button from '$lib/components/Button.svelte';
	import type { IBlogPosts } from '$lib/ts/interfaces/Blog';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';

	export let initialPosts: IBlogPosts;

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
		try {
			const url = `${blogApiUrl}/posts?key=${blogApiKey}&fields=${shallowPostFields.join(
				','
			)}&limit=${limit}&page=${next}`;
			const response = await fetch(url);
			const data: IBlogPosts = await response.json();
			posts = {
				meta: data.meta,
				posts: [...posts.posts, ...data.posts]
			};
			if (posts.meta.pagination.next === null) {
				hasMoreToLoad = false;
			}
		} catch (error) {
			console.log(error);
		} finally {
			isLoadingMore = false;
		}
	}

	const title = 'Blog | Banano';
	const description = 'Latest news, developments, and educational content on Banano.';
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
		class="w-full bg-c-secondary min-h-[450px] bg-cover bg-bottom flex justify-center overflow-hidden"
	>
		<BgWaveBottom />
		<div
			class="container-b-small px-5 md:px-12 max-w-full flex flex-col items-center self-center pt-28 pb-32 relative z-10 text-c-bg text-center"
		>
			<h1 class="text-6xl font-bold">Blog</h1>
			<p class="text-xl mt-5">Latest news & developments on the Banano ecosystem.</p>
		</div>
	</div>
</div>
<div class="container-b flex flex-row flex-wrap py-6 md:px-8">
	{#each posts.posts as post}
		<div class="w-full md:w-1/2 lg:w-1/3 p-3 mt-3 bg-c-bg">
			<a
				href="/blog/{post.slug}"
				sveltekit:prefetch
				class="w-full flex flex-col transition hover:-translate-y-1 shadow-blog-post 
				shadow-c-on-bg/40 hover:shadow-blog-post-hover hover:shadow-c-on-bg/15 rounded-2xl group p-1"
			>
				<div class="aspect-[16/9] overflow-hidden rounded-xl relative z-0">
					<img
						class="w-full h-full object-cover rounded-xl relative z-0 transform 
						transition duration-300 origin-bottom group-hover:scale-101 bg-c-on-bg/15"
						src={post.feature_image}
						alt={post.title}
					/>
				</div>
				<h2 class="w-full text-xl font-bold mt-4 px-4">
					{post.title}
				</h2>
				<p class="text-c-on-bg/60 px-4 mt-2 mb-4">{post.custom_excerpt ?? post.excerpt}...</p>
			</a>
		</div>
	{/each}
	{#if hasMoreToLoad}
		<div use:inview={inviewOptions} on:enter={getMorePosts} class="w-full" />
		<div class="w-full flex justify-center mt-4">
			<Button onClick={getMorePosts} class="w-64 max-w-full">Load More</Button>
		</div>
	{/if}
</div>
