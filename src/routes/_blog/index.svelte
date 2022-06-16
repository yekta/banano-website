<script lang="ts">
	import '$lib/css/blog.css';
	export let posts: any;

	const postIndex = 2;
</script>

<div class="w-full blog">
	<div class="w-full bg-c-secondary flex justify-center pt-32 pb-24 text-c-bg">
		<h1>{posts[postIndex].title}</h1>
	</div>
	<div class="container-b-smallest">
		{@html posts[postIndex].content}
	</div>
</div>
