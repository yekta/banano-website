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

<nav class="w-full flex justify-center absolute top-0 left-0 right-0 text-c-primary">
	<div class="w-288 max-w-full flex flex-row items-center justify-between px-4 py-3">
		<Logo />
		<div class="flex flex-row justify-end items-center">
			{#each sections as section}
				<a href="/#{section.id}" class="px-4 py-2">{section.title}</a>
			{/each}
		</div>
	</div>
</nav>
