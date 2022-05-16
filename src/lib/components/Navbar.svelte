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
			id: 'news'
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
			id: 'social'
		}
	];
</script>

<nav
	class="w-288 max-w-full mx-auto flex justify-between items-center 
  text-c-primary py-3 px-4"
>
	<Logo />
	<div class="flex flex-row justify-end items-center">
		{#each sections as section}
			<a href="/#{section.id}" class="px-4 py-2">{section.title}</a>
		{/each}
	</div>
</nav>
