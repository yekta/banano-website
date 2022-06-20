<script lang="ts">
	import { notNull } from '$lib/ts/helpers/notNull';

	import type { IBlogPostShallow } from '$lib/ts/interfaces/Blog';
	export let post: IBlogPostShallow;
</script>

<a
	href="/blog/{post.slug}"
	sveltekit:prefetch
	class="w-full flex flex-col transition hover:-translate-y-1 
	shadow-blog-post shadow-c-on-bg/20 hover:shadow-blog-post-hover 
	hover:shadow-c-on-bg/10 rounded-2xl group p-1 pb-5"
>
	<div class="aspect-[16/9] overflow-hidden rounded-xl relative z-0">
		{#if notNull(post.feature_image)}
			<img
				class="w-full h-full object-cover rounded-xl relative z-0 transform 
					transition duration-400 origin-bottom group-hover:scale-101 bg-c-on-bg/15"
				src={post.feature_image}
				alt={post.title}
			/>
		{:else}
			<div
				class="w-full h-full flex justify-center items-center 
				px-4 py-3 bg-c-on-bg/15 font-bold text-xl text-c-on-bg/40"
			>
				Read More...
			</div>
		{/if}
	</div>
	<h2 class="w-full text-xl font-bold mt-4 px-4">
		{post.title}
	</h2>
	{#if notNull(post.custom_excerpt) || notNull(post.excerpt)}
		<p class="text-c-on-bg/60 px-4 mt-2">{post.custom_excerpt ?? post.excerpt}...</p>
	{/if}
</a>
