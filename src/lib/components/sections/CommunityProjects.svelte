<script lang="ts">
	import Button from '../Button.svelte';
	import type { ICommunityProject } from '$lib/ts/interfaces/ICommunityProject';

	export let communityProjects: ICommunityProject[];
</script>

<div
	id="community-projects"
	class="w-full bg-community bg-c-secondary flex justify-center pt-20 pb-28 text-center text-c-bg"
>
	<div class="container-b flex flex-col items-center px-4">
		<h2 class="text-3xl font-bold">Community Projects</h2>
		<p class="mt-2 text-xl">
			Here are some of the projects that are made by our awesome community:
		</p>
		<div class="w-full flex flex-wrap justify-center items-end">
			{#each communityProjects as project}
				<div
					class="w-full md:w-1/2 lg:w-1/4 max-w-[17rem] flex flex-col items-center text-center px-4 mt-5"
				>
					<h5 class="font-bold mt-3">{project.title.toUpperCase()}</h5>
					<p class="mt-1">{project.description}</p>
					<Button class="mt-4 w-full" href={project.buttonUrl} targetBlank={true}
						>{project.buttonName.toLocaleLowerCase()}</Button
					>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.bg-community {
		background-image: url('/illustrations/backgrounds/bg-community.svg');
		background-size: cover;
		background-position: 100% 100%;
		background-repeat: no-repeat;
	}
</style>
