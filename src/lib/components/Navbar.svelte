<script lang="ts">
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';

	import { numberFormatter } from '$lib/ts/helpers/numberFormatter';
	import type { TIconSocial } from '$lib/ts/types/TIconSocial';

	import { onMount } from 'svelte';
	import IconSocial from './icons/IconSocial.svelte';
	import Logo from './Logo.svelte';

	let bananoPrice: number;

	interface Section {
		title: string;
		id: string;
		href: string;
	}

	interface SocialButton {
		title: string;
		icon: TIconSocial;
		href: string;
	}

	const socials: SocialButton[] = [
		{
			title: bananoSocials.discord.title,
			icon: bananoSocials.discord.iconString,
			href: bananoSocials.discord.url
		},
		{
			title: bananoSocials.twitter.title,
			icon: bananoSocials.twitter.iconString,
			href: bananoSocials.twitter.url
		},
		{
			title: bananoSocials.reddit.title,
			icon: bananoSocials.reddit.iconString,
			href: bananoSocials.reddit.url
		}
	];

	const sections: Section[] = [
		{
			title: 'Wallets',
			id: 'wallets',
			href: '/#wallets'
		},
		{
			title: 'MonKey',
			id: 'monkey',
			href: '/#monkey'
		},
		{
			title: 'wBAN',
			id: 'wban',
			href: '/#wban'
		},
		{
			title: 'News',
			id: 'news',
			href: '/#news'
		},
		{
			title: 'FAQ',
			id: 'faq',
			href: '/#faq'
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
		<Logo class="text-c-primary w-48 h-auto mr-12 py-2" />
		<div class="flex justify-end items-center min-w-0 flex-1">
			<div class="hidden lg:flex justify-end items-center">
				{#each sections as section}
					<a
						href={section.href}
						class="px-4 py-2 font-medium rounded-lg transition hover:bg-c-secondary hover:text-c-bg
						shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/50 hover:shadow-c-secondary-shaded"
					>
						{section.title}
					</a>
				{/each}
			</div>
			<div class="hidden md:flex justify-end items-center">
				{#each socials as social}
					<a
						href={social.href}
						target="_blank"
						class="p-1.5 font-medium rounded-lg transition hover:bg-c-secondary hover:text-c-bg
					shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/40 hover:shadow-c-secondary-shaded"
					>
						<IconSocial type={social.icon} class="w-9 h-9" />
					</a>
				{/each}
			</div>
		</div>
		<div class="w-22 flex justify-end">
			{#if bananoPrice !== undefined}
				<a
					href="https://www.coingecko.com/en/coins/banano"
					target="_blank"
					class="bg-c-primary/20 font-medium px-3 py-1.5 rounded-lg transition hover:bg-c-secondary hover:text-c-bg
					shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/40 hover:shadow-c-secondary-shaded"
				>
					${numberFormatter(bananoPrice)}
				</a>
			{/if}
		</div>
	</div>
</nav>
