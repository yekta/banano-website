<script lang="ts">
	import Button from '../Button.svelte';
	import type { ICommunityProject } from '$lib/ts/interfaces/ICommunityProject';

	export let communityProjects: ICommunityProject[];
</script>

<div
	id="community-projects"
	style="background-image: url('/illustrations/backgrounds/bg-community.svg');"
	class="w-full bg-cover bg-c-secondary flex justify-center pt-16 pb-18 text-center text-c-bg"
>
	<div class="container-b flex flex-col items-center px-4">
		<h2 class="text-3xl font-bold px-4">Community Projects</h2>
		<p class="mt-3 text-lg container-b-small px-2 md:px-16 lg:px-24">
			Here are some of the projects that are made by our awesome community:
		</p>
		<div class="w-full flex flex-wrap justify-center items-end mt-2 md:mt-6">
			{#each communityProjects as project, index}
				<div
					class="w-full md:w-1/2 lg:w-1/4 max-w-[17rem] flex flex-col items-center text-center px-2 md:px-4 my-7"
				>
					<h3 class="font-bold text-xl">{project.title}</h3>
					<p class="mt-2">{project.description}</p>
					<Button class="mt-5 w-full" href={project.buttonUrl} target="_blank">
						{project.buttonName.toLocaleLowerCase()}
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
