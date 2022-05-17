<script lang="ts">
	import Logo from './Logo.svelte';

	interface Section {
		title: string;
		id: string;
	}

	const sections: Section[] = [
		{
			title: 'Wallets',
			id: 'wallets'
		},
		{
			title: 'Explorer',
			id: 'explorer'
		},
		{
			title: 'MonKey',
			id: 'monkey'
		},
		{
			title: 'Team',
			id: 'team'
		},
		{
			title: 'News',
			id: 'news'
		},
		{
			title: 'FAQ',
			id: 'faq'
		},
		{
			title: 'Social',
			id: 'join-us'
		}
	];
</script>

<nav class="w-full flex justify-center absolute top-0 left-0 right-0 text-c-primary z-50">
	<div class="container-b max-w-full flex flex-row items-center justify-between px-4 py-3">
		<Logo class="text-c-primary w-48 h-auto mr-12 py-1.5" />
		<div class="hidden md:flex min-w-0 flex-row flex-1 justify-end items-center overflow-hidden">
			{#each sections as section}
				<a href="/#{section.id}" class="px-4 py-2">{section.title}</a>
			{/each}
		</div>
	</div>
</nav>
