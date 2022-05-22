<script lang="ts">
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';
	import { numberFormatter } from '$lib/ts/helpers/numberFormatter';
	import type { TIconSocial } from '$lib/ts/types/TIconSocial';
	import { onMount } from 'svelte';
	import IconSocial from './icons/IconSocial.svelte';
	import Logo from './Logo.svelte';
	import IconMenu from './icons/IconMenu.svelte';
	import { clickoutside } from '$lib/ts/actions/clickoutside';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { sidebar } from '$lib/ts/transitions';

	let bananoPrice: number;
	const pricePlaceholder = '..........';

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

	let isSidebarOpen = false;

	const toggleMenu = () => (isSidebarOpen = !isSidebarOpen);
	const closeMenu = () => (isSidebarOpen = false);
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
			<button
				on:click={toggleMenu}
				class="lg:hidden h-12 w-12 p-1.5 md:w-auto md:h-auto md:pl-2 md:pr-3.5 md:py-1.5 flex flex-row items-center justify-center rounded-lg transition
				shadow-navbar-button hover:shadow-navbar-button-hover hover:shadow-c-secondary-shaded hover:bg-c-secondary {isSidebarOpen
					? 'text-c-bg'
					: 'text-c-primary hover:text-c-bg'} shadow-c-on-bg/50"
			>
				<IconMenu
					class="lg:hidden w-full h-full md:w-8 md:h-8 md:mr-1.5 transition transform {isSidebarOpen
						? 'rotate-180'
						: ''}"
				/>
				<div class="font-medium text-lg hidden md:block">Menu</div>
			</button>
		</div>
	</div>
</nav>

{#if isSidebarOpen}
	<div
		transition:fade={{ duration: 250, easing: cubicOut }}
		class="fixed lg:hidden z-50 w-full h-full top-0 right-0 flex flex-row justify-end bg-c-on-bg/85 overflow-hidden"
	>
		<div
			transition:sidebar={{ duration: 250, easing: cubicOut }}
			use:clickoutside={closeMenu}
			class="w-[70vw] max-w-[16rem] h-full flex flex-col items-start bg-c-bg 
			rounded-l-xl p-3 overflow-y-auto shadow-sidebar shadow-c-bg-secondary-shaded"
		>
			<h4 class="text-2xl font-bold px-6 py-3">Sections</h4>
			<div class="w-full px-2">
				<div class="h-1 w-full rounded-full bg-c-secondary mt-2 mb-3" />
			</div>
			{#each sections as section}
				<a
					on:click={closeMenu}
					href={section.href}
					class="text-lg w-full max-w-full px-6 py-3 font-medium rounded-xl transition hover:bg-c-secondary hover:text-c-bg
					shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/50 hover:shadow-c-secondary-shaded"
				>
					{section.title}
				</a>
			{/each}
			<div class="flex flex-wrap justify-center mt-auto pt-2 pb-1">
				{#each socials as social, index}
					<a
						on:click={closeMenu}
						href={social.href}
						target="_blank"
						class="mt-2 p-1.5 rounded-xl transition hover:bg-c-secondary hover:text-c-bg
						shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/40 hover:shadow-c-secondary-shaded"
					>
						<IconSocial type={social.icon} class="w-11 h-11" />
					</a>
				{/each}
				<a
					on:click={closeMenu}
					href="https://www.coingecko.com/en/coins/banano"
					target="_blank"
					class="w-full text-center mt-4 font-bold text-lg bg-c-secondary/20 px-3 py-2 rounded-lg transition hover:bg-c-secondary hover:text-c-bg
					shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/40 hover:shadow-c-secondary-shaded"
				>
					${bananoPrice !== undefined ? numberFormatter(bananoPrice) : pricePlaceholder}
				</a>
			</div>
		</div>
	</div>
{/if}
