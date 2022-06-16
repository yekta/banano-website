<script lang="ts">
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import '$lib/css/blog.css';
	import { monthsShort } from '$lib/ts/constants/months';

	export let post: any;

	const formatDate = (date: string) => {
		const dateObj = new Date(date);
		const monthShort = monthsShort[dateObj.getMonth()];
		const day = dateObj.getDate();
		const year = dateObj.getFullYear();
		return `${monthShort} ${day}, ${year}`;
	};
</script>

<div class="w-full blog pb-16">
	<div class="w-full relative flex flex-row justify-center overflow-hidden">
		<div
			style="background-image:url(/illustrations/backgrounds/bg-hero.svg)"
			class="w-full bg-c-secondary bg-cover bg-bottom flex justify-center overflow-hidden"
		>
			<BgWaveBottom />
			<div
				class="container-b-small px-5 md:px-12 max-w-full flex flex-col items-center self-center pt-28 pb-32 relative z-10 text-c-bg text-center"
			>
				<h1>{post.title}</h1>
				<p class="text-c-bg/75">{formatDate(post.date)}</p>
			</div>
		</div>
	</div>
	<div class="container-b-smallest px-5 py-5 bg-c-bg rounded-xl shadow-2xl shadow-c-bg">
		{@html post.content}
	</div>
</div>
