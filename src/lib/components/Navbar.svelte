<script lang="ts">
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';
	import { numberFormatter } from '$lib/ts/helpers/numberFormatter';
	import type { TIconSocial } from '$lib/ts/types/TIconSocial';
	import { onMount } from 'svelte';
	import IconSocial from './icons/IconSocial.svelte';
	import Logo from './Logo.svelte';
	import IconMenu from './icons/IconMenu.svelte';
	import { dropdown } from '$lib/ts/transitions';
	import { clickoutside } from '$lib/ts/actions/clickoutside';

	let bananoPrice: number;
	const pricePlaceholder = '........';
	let isMenuOpen = false;

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
		},
		{
			title: bananoSocials.youtube.title,
			icon: bananoSocials.youtube.iconString,
			href: bananoSocials.youtube.url
		}
	];

	const sections: Section[] = [
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
			title: 'Wallets',
			id: 'wallets',
			href: '/#wallets'
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

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	onMount(() => {
		getAndSetBananoPrice();
	});
</script>

<nav class="w-full flex justify-center absolute top-0 left-0 right-0 text-c-primary z-50">
	<div class="container-b max-w-full flex flex-row items-center justify-between px-4 py-3">
		<a href="/" class="mr-12 py-2 px-1">
			<Logo class="text-c-primary w-48 h-auto" />
		</a>
		<div class="flex flex-row justify-end items-center">
			<div class="flex justify-end items-center min-w-0 flex-1">
				<div class="hidden lg:flex justify-end items-center mx-2">
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
				<div class="hidden md:flex justify-end items-center mx-2">
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
			<div class="w-22 hidden md:flex justify-end mx-2">
				<a
					href="https://www.coingecko.com/en/coins/banano"
					target="_blank"
					class="w-full text-center bg-c-primary/20 font-medium px-3 py-1.5 rounded-lg transition hover:bg-c-secondary hover:text-c-bg
						shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/40 hover:shadow-c-secondary-shaded"
				>
					${bananoPrice !== undefined ? numberFormatter(bananoPrice) : pricePlaceholder}
				</a>
			</div>
			<!-- Menu -->
			<div
				use:clickoutside={closeMenu}
				class="lg:hidden relative flex flex-col justify-start items-end text-c-secondary z-50 -mr-1 md:mr-0"
			>
				<button
					on:click={toggleMenu}
					class="h-12 w-12 p-1.5 md:w-auto md:h-auto md:pl-2 md:pr-3.5 md:py-1.5 flex flex-row items-center justify-center rounded-lg transition
					shadow-navbar-button hover:shadow-navbar-button-hover hover:shadow-c-secondary-shaded hover:bg-c-secondary {isMenuOpen
						? 'text-c-bg'
						: 'text-c-primary hover:text-c-bg'} shadow-c-on-bg/50"
				>
					<IconMenu
						class="lg:hidden w-full h-full md:w-8 md:h-8 md:mr-1.5 transition transform {isMenuOpen
							? 'rotate-90'
							: ''}"
					/>
					<p class="font-medium text-lg hidden md:block">Menu</p>
				</button>
				<div class="relative">
					{#if isMenuOpen}
						<div
							transition:dropdown|local
							class="mt-2 absolute top-0 right-0 transition transform origin-top-right max-h-[65vh] overflow-y-auto flex flex-row flex-wrap justify-center items-start text-center bg-c-bg rounded-2xl px-2 pt-2 pb-3
							shadow-navbar-button-hover shadow-c-secondary-shaded border-[3px] border-c-secondary-shaded"
						>
							{#each sections as section}
								<a
									href={section.href}
									class="w-56 max-w-full px-6 py-3 font-bold font-lg rounded-lg transition hover:bg-c-secondary hover:text-c-bg
									shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/50 hover:shadow-c-secondary-shaded"
								>
									{section.title}
								</a>
							{/each}
							{#each socials as social}
								<a
									href={social.href}
									as="a"
									target="_blank"
									class="mt-2 p-1.5 font-medium rounded-lg transition hover:bg-c-secondary hover:text-c-bg
							shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/40 hover:shadow-c-secondary-shaded"
								>
									<IconSocial type={social.icon} class="w-10 h-10" />
								</a>
							{/each}
							<a
								href="https://www.coingecko.com/en/coins/banano"
								target="_blank"
								class="w-full text-center mt-5 font-bold bg-c-secondary/20 px-3 py-1.5 rounded-lg transition hover:bg-c-secondary hover:text-c-bg
							shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/40 hover:shadow-c-secondary-shaded"
							>
								${bananoPrice !== undefined ? numberFormatter(bananoPrice) : pricePlaceholder}
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>
