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
	import { isTouchscreen } from '$lib/ts/stores/isTouchscreen';
	import { page } from '$app/stores';
	import Icon from '$lib/components/icons/Icon.svelte';

	export { classes as class };
	let classes = '';

	let bananoPrice: number;
	const pricePlaceholder = '..........';

	interface Section {
		title: string;
		id: string;
		href: string;
		classes?: string;
		icon?: string;
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
			title: 'Explorer',
			id: 'explorer',
			href: '/#explorer',
			classes: 'lg:hidden'
		},
		{
			title: 'Yellowpaper™',
			id: 'yellowpaper',
			href: '/#yellowpaper',
			classes: 'lg:hidden xl:flex'
		},
		{
			title: 'News',
			id: 'news',
			href: '/#news',
			classes: 'lg:hidden xl:flex'
		},
		{
			title: 'FAQ',
			id: 'faq',
			href: '/#faq'
		} /* ,
		{
			title: 'Blog',
			id: 'blog',
			href: '/blog'
		} */
	];
	/* const blogSections: Section[] = [
		{
			title: 'Home',
			id: 'blog',
			href: '/',
			icon: 'home'
		}
	]; */

	async function getAndSetBananoPrice() {
		try {
			let res = await fetch('https://utils.banano.cc/prices');
			let resJson = await res.json();
			const price = resJson?.main?.USD;
			if (price !== undefined) {
				bananoPrice = price;
			}
		} catch (error) {
			console.error(error);
		}
	}
	onMount(() => {
		getAndSetBananoPrice();
		setNotAtTheTop();
	});

	let isSidebarOpen = false;

	const toggleMenu = () => (isSidebarOpen = !isSidebarOpen);
	const closeMenu = () => (isSidebarOpen = false);

	let notAtTheTop = false;

	function setNotAtTheTop() {
		if (window.scrollY > 30) {
			notAtTheTop = true;
		} else {
			notAtTheTop = false;
		}
	}

	function handleScroll() {
		setNotAtTheTop();
	}
</script>

<svelte:window on:scroll={handleScroll} />
<nav
	class="{notAtTheTop || $page.routeId === 'blog/[slug]'
		? 'text-c-secondary'
		: 'text-c-primary'} font-filson-pro w-full flex justify-center fixed top-0 left-0 right-0 z-50 {classes}"
>
	<div
		class="{notAtTheTop
			? 'translate-0'
			: '-translate-y-24'} transform transition duration-250 bg-c-bg shadow-navbar 
			shadow-c-secondary/13 absolute left-0 bottom-2 w-full h-full pointer-events-none ring-4 ring-c-bg-shaded"
	/>
	<div
		class="{notAtTheTop
			? '-translate-y-1'
			: 'translate-0'} transition container-b-larger max-w-full flex flex-row items-stretch justify-between px-4 relative"
	>
		<a
			aria-label="Logo Link to Homescreen"
			href={$page.routeId?.startsWith('blog') ? '/blog' : '/'}
			sveltekit:prefetch
			class="mr-4 md:mr-12 py-3 group rounded-lg relative z-0 h-full flex flex-row items-center"
		>
			<div class="pt-2 pb-2 md:pb-2.5 px-1">
				<Logo
					class="{notAtTheTop || $page.routeId === 'blog/[slug]'
						? 'group-hover:text-c-on-bg'
						: 'group-hover:text-c-bg'} {notAtTheTop
						? 'scale-90'
						: ''} transition max-w-full w-44 md:w-48 h-auto transform origin-left"
				/>
			</div>
		</a>
		<div class="flex justify-end">
			<div class="hidden lg:flex justify-end mx-1.5">
				<!-- $page.routeId?.startsWith('blog') ? blogSections : -->
				{#each sections as section}
					<a
						sveltekit:prefetch
						href={section.href}
						class="{section.classes !== undefined
							? section.classes
							: ''} font-medium group py-3 flex items-center"
					>
						<div
							class="flex items-center px-4 py-2 rounded-lg transition group-hover:bg-c-secondary group-hover:text-c-bg
							shadow-navbar-button group-hover:shadow-navbar-button-hover shadow-c-on-bg/50 group-hover:shadow-c-secondary-shaded"
						>
							{#if section.icon}
								<Icon type={section.icon} class="w-6 h-6 mr-1.5" />
							{/if}
							<p>
								{section.title}
							</p>
						</div>
					</a>
				{/each}
			</div>
			<div class="hidden md:flex justify-end mx-1.5">
				{#each socials as social}
					<a
						sveltekit:prefetch
						href={social.href}
						target="_blank"
						class="font-medium group flex items-center py-3"
					>
						<div
							class="p-1.5 rounded-lg transition group-hover:bg-c-secondary group-hover:text-c-bg
							shadow-navbar-button group-hover:shadow-navbar-button-hover shadow-c-on-bg/40 group-hover:shadow-c-secondary-shaded"
						>
							<IconSocial type={social.icon} class="w-9 h-9" />
						</div>
					</a>
				{/each}
			</div>
			<div class="w-19 hidden md:flex justify-end mx-1.5">
				<a
					href="https://www.coingecko.com/en/coins/banano"
					target="_blank"
					class="w-full overflow-hidden text-sm text-center font-medium flex items-center group"
				>
					<p
						class="{notAtTheTop || $page.routeId === 'blog/[slug]'
							? 'bg-c-secondary/20'
							: 'bg-c-primary/20'} w-full px-3 py-1.5 rounded-lg transition group-hover:bg-c-secondary group-hover:text-c-bg
							shadow-navbar-button group-hover:shadow-navbar-button-hover shadow-c-on-bg/40 group-hover:shadow-c-secondary-shaded"
					>
						${bananoPrice !== undefined ? numberFormatter(bananoPrice) : pricePlaceholder}
					</p>
				</a>
			</div>
			<button
				aria-label="Toggle Menu Button"
				on:click={toggleMenu}
				class="{notAtTheTop || $page.routeId === 'blog/[slug]'
					? 'text-c-secondary'
					: 'text-c-primary'} lg:hidden h-full flex items-center group py-3"
			>
				<div
					class="h-12 w-12 p-1.5 md:w-auto md:h-auto md:pl-2 md:pr-3.5 md:py-1.5 justify-center rounded-lg transition shadow-navbar-button 
					shadow-c-on-bg/50 group-hover:text-c-bg flex flex-row items-center {$isTouchscreen
						? ''
						: 'group-hover:shadow-navbar-button-hover group-hover:shadow-c-secondary-shaded group-hover:bg-c-secondary'}"
				>
					<IconMenu
						class="lg:hidden w-full h-full md:w-8 md:h-8 md:mr-1.5 transition transform {isSidebarOpen
							? 'rotate-180'
							: ''}"
					/>
					<div class="font-medium text-lg hidden md:block">Menu</div>
				</div>
			</button>
		</div>
	</div>
	{#if isSidebarOpen}
		<div
			transition:fade={{ duration: 250, easing: cubicOut }}
			class="fixed lg:hidden z-50 w-full h-full top-0 right-0 flex flex-row justify-end bg-c-on-bg/85 overflow-hidden text-c-on-bg"
		>
			<div
				transition:sidebar={{ duration: 250, easing: cubicOut }}
				use:clickoutside={closeMenu}
				class="w-[70vw] max-w-[18rem] h-full flex flex-col items-start bg-c-bg 
				rounded-l-xl p-3 overflow-y-auto shadow-sidebar shadow-c-bg-secondary-shaded"
			>
				<p class="text-2xl font-bold px-6 py-3">Sections</p>
				<div class="w-full px-2">
					<div class="h-1 w-full rounded-full bg-c-secondary mt-2 mb-3" />
				</div>
				<!-- $page.routeId?.startsWith('blog') ? blogSections :  -->
				{#each sections as section}
					<a
						sveltekit:prefetch
						on:click={closeMenu}
						href={section.href}
						class="flex items-center text-lg w-full max-w-full px-6 py-3 font-medium rounded-xl transition hover:bg-c-secondary hover:text-c-bg
						shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/50 hover:shadow-c-secondary-shaded"
					>
						{#if section.icon}
							<Icon type={section.icon} class="w-7 h-7 mr-2" />
						{/if}
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
</nav>
