<script lang="ts">
	import { getSrcAndSrcSetFromUrl } from '$lib/ts/helpers/ghost/utils';

	import { notNull } from '$lib/ts/helpers/notNull';

	import type { IBlogPostShallow } from '$lib/ts/interfaces/Blog';
	import { isTouchscreen } from '$lib/ts/stores/isTouchscreen';
	export let post: IBlogPostShallow;
</script>

<a
	href="/blog/{post.slug}"
	data-sveltekit-prefetch
	class="w-full flex flex-col transition shadow-blog-post shadow-c-on-bg/20 
	 rounded-2xl overflow-hidden relative z-10 group p-1.5 pb-5 {$isTouchscreen
		? ''
		: 'hover:-translate-y-1.5 hover:shadow-blog-post-hover hover:shadow-c-on-bg/10 hover:bg-c-on-bg/5'}"
>
	<div class="aspect-[16/9] overflow-hidden rounded-xl relative z-0">
		{#if notNull(post.feature_image)}
			{@const { src, srcset } = getSrcAndSrcSetFromUrl(post.feature_image)}
			<img
				loading="lazy"
				class="w-full h-full object-cover rounded-xl relative z-0 transform transition 
					duration-400 origin-bottom bg-c-on-bg/15 overflow-hidden {$isTouchscreen
					? ''
					: 'group-hover:scale-101'}"
				{src}
				{srcset}
				sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
				alt={post.title}
			/>
		{:else}
			<div
				class="w-full h-full flex justify-center items-center 
				px-12 py-8 bg-c-on-bg/15 font-bold text-2xl text-center text-c-on-bg/50"
			>
				<img
					loading="lazy"
					class="w-full h-full object-cover absolute saturate-0 opacity-75 overflow-hidden"
					src="/illustrations/backgrounds/bg-hero.svg"
					alt={post.title}
				/>
				<p class="max-w-full max-h-full relative overflow-hidden filter filter- overflow-ellipsis">
					{post.title}
				</p>
			</div>
		{/if}
	</div>
	<h2 class="w-full text-xl font-bold mt-4 px-2 md:px-4">
		{post.title}
	</h2>
	{#if notNull(post.custom_excerpt) || notNull(post.excerpt)}
		<p class="text-c-on-bg/60 px-2 md:px-4 mt-2">{post.custom_excerpt ?? post.excerpt}</p>
	{/if}
	<!-- <p class="text-c-on-bg/40 text-sm px-4 mt-2">
		{formatDate(post.published_at)} <span class="opacity-40">•</span>
		{post.reading_time} min read
	</p> -->
</a>
