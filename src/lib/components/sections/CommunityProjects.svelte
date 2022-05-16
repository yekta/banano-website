<script lang="ts">
	import Button from '../Button.svelte';

	interface CommunityProject {
		name: string;
		description: string;
		url: string;
	}

	const communityProjects: CommunityProject[] = [
		{
			name: 'Banano.how',
			description: 'A place to get help getting started.',
			url: 'https://banano.how'
		},
		{
			name: 'Banano.bet',
			description: 'A provably fair dice game for Banano.',
			url: 'https://banano.bet'
		},
		{
			name: 'JungleTV.live',
			description: 'A video sharing platform where you can earn & spend Banano.',
			url: 'https://jungletv.live'
		},
		{
			name: 'Banano.fun',
			description: 'Tailor-made Banano memes and animations.',
			url: 'https://banano.fun'
		}
	];
</script>

<div
	id="community-projects"
	class="w-full bg-community bg-c-secondary flex justify-center pt-20 pb-28 text-center text-c-bg"
>
	<div class="container-b flex flex-col items-center">
		<h2 class="text-3xl font-bold">Community Projects</h2>
		<p class="mt-2 text-xl">
			Here are some of the projects that are made by our awesome community:
		</p>
		<div class="w-full flex justify-center flex-wrap">
			{#each communityProjects as project}
				<div
					class="w-full md:w-1/2 lg:w-1/4 max-w-[17rem] flex flex-col items-center text-center px-4 mt-5"
				>
					<h5 class="font-bold mt-3">{project.name.toUpperCase()}</h5>
					<p class="mt-1">{project.description}</p>
					<Button class="mt-4 w-full" href={project.url} targetBlank={true}
						>{project.name.toLocaleLowerCase()}</Button
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
