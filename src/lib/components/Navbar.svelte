<script lang="ts">
	import { numberFormatter } from '$lib/ts/helpers/numberFormatter';

	import { onMount } from 'svelte';
	import Logo from './Logo.svelte';

	let bananoPrice: number;

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

	async function getAndSetBananoPrice() {
		try {
			let res = await fetch(
				'https://api.coingecko.com/api/v3/simple/price?ids=banano&vs_currencies=usd'
			);
			let resJson = await res.json();
			if (resJson?.banano?.usd !== undefined) {
				bananoPrice = Number(resJson.banano.usd);
			}
		} catch (error) {
			console.error(error);
		}
	}

	onMount(() => {
		getAndSetBananoPrice();
	});
</script>

<nav class="w-full flex justify-center absolute top-0 left-0 right-0 text-c-primary z-50">
	<div class="container-b max-w-full flex flex-row items-center justify-between px-4 py-3">
		<Logo class="text-c-primary w-48 h-auto mr-12 py-1.5" />
		<div class="hidden md:flex min-w-0 flex-row flex-1 justify-end items-center overflow-hidden">
			{#each sections as section}
				<a href="/#{section.id}" class="px-4 py-2 font-medium">{section.title}</a>
			{/each}
		</div>
		<div class="w-24 flex justify-end">
			{#if bananoPrice !== undefined}
				<a
					href="https://www.coingecko.com/en/coins/banano"
					target="_blank"
					class="bg-c-primary/20 font-medium hover:bg-c-primary/30 transition px-2.5 py-1 rounded-md border border-c-primary/10"
				>
					${numberFormatter(bananoPrice)}
				</a>
			{/if}
		</div>
	</div>
</nav>
