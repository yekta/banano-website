<script lang="ts">
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';
	import { bananoWallets } from '$lib/ts/constants/bananoWallets';
	import type { TIconSocial } from '$lib/ts/types/TIconSocial';
	import BgWaveTop from './backgrounds/BgWaveTop.svelte';
	import IconSocial from './icons/IconSocial.svelte';

	const currentYear = new Date().getFullYear();

	interface IFooterSection {
		title: string;
		entries: IFooterEntry[];
		wClass: string;
	}
	interface IFooterEntry {
		text: string;
		icon?: TIconSocial;
		href: string;
		targetBlank?: boolean;
	}

	const footerSections: IFooterSection[] = [
		{
			title: 'Sections',
			wClass: 'w-56',
			entries: [
				{ text: 'Get Banano', href: '/#get-banano' },
				{ text: 'MonKey', href: '/#monkey' },
				{ text: 'wBAN', href: '/#wban' },
				{ text: 'Wallets', href: '/#wallets' },
				{ text: 'Explorer', href: '/#explorer' },
				{ text: 'News', href: '/#news' },
				{ text: 'Roadmap', href: '/#roadmap' },
				{ text: 'FAQ', href: '/#faq' }
			]
		},
		{
			title: 'Resources',
			wClass: 'w-64',
			entries: [
				{ text: 'Desktop Wallet', href: bananoWallets.vault.url, targetBlank: true },
				{ text: 'Mobile Wallet', href: bananoWallets.kalium.url, targetBlank: true },
				{ text: 'Network Explorer', href: 'https://creeper.banano.cc', targetBlank: true },
				{ text: 'Yellowpaper™', href: '/yellowpaper' },
				{ text: 'Blog', href: 'https://medium.com/banano', targetBlank: true },
				{ text: 'Presskit', href: '/presskit' },
				{ text: 'Redeem Banano', href: '/redeem' },
				{ text: 'Business Contact', href: '/#business-contact' }
			]
		},
		{
			title: 'Community',
			wClass: 'w-68',
			entries: [
				{
					text: bananoSocials.discord.buttonText,
					icon: bananoSocials.discord.iconString,
					href: bananoSocials.discord.url,
					targetBlank: true
				},
				{
					text: bananoSocials.reddit.buttonText,
					icon: bananoSocials.reddit.iconString,
					href: bananoSocials.reddit.url,
					targetBlank: true
				},
				{
					text: bananoSocials.twitter.buttonText,
					icon: bananoSocials.twitter.iconString,
					href: bananoSocials.twitter.url,
					targetBlank: true
				},
				{
					text: bananoSocials.youtube.buttonText,
					icon: bananoSocials.youtube.iconString,
					href: bananoSocials.youtube.url,
					targetBlank: true
				},
				{
					text: bananoSocials.medium.buttonText,
					icon: bananoSocials.medium.iconString,
					href: bananoSocials.medium.url,
					targetBlank: true
				},
				{
					text: bananoSocials.telegram.buttonText,
					icon: bananoSocials.telegram.iconString,
					href: bananoSocials.telegram.url,
					targetBlank: true
				},
				{
					text: bananoSocials.instagram.buttonText,
					icon: bananoSocials.instagram.iconString,
					href: bananoSocials.instagram.url,
					targetBlank: true
				},
				{
					text: bananoSocials.facebook.buttonText,
					icon: bananoSocials.facebook.iconString,
					href: bananoSocials.facebook.url,
					targetBlank: true
				}
			]
		}
	];
</script>

<footer
	class="bg-c-bg text-c-bg font-filson-pro w-full flex flex-row items-start justify-center relative overflow-hidden pt-12"
>
	<div
		style="background-image:url('/illustrations/backgrounds/bg-footer.svg');"
		class="w-full bg-c-secondary bg-cover bg-[position:85%_100%] md:bg-[position:10%_100%] lg:bg-[position:50%_100%] 
			flex flex-col items-center justify-start pt-14 md:pt-16 lg:pt-14 relative"
	>
		<div
			class="container-b-small flex flex-row flex-wrap items-start justify-center relative px-6 md:px-10"
		>
			{#each footerSections as section}
				<div
					class="{section.wClass} max-w-full flex flex-col items-center md:items-start px-4 pt-4 pb-6 md:pt-7 md:pb-6 2xl:pt-12"
				>
					<p class="text-xl font-bold px-4 mb-2">{section.title.toUpperCase()}</p>
					{#each section.entries as entry}
						<a
							sveltekit:prefetch
							class="w-full flex flex-row items-center justify-center md:justify-start 
								px-4 py-2 transition hover:bg-c-secondary rounded-lg
								shadow-navbar-button hover:shadow-navbar-button-hover shadow-c-on-bg/50 hover:shadow-c-secondary-shaded"
							href={entry.href}
							target={entry.targetBlank ? '_blank' : undefined}
						>
							{#if entry.icon !== undefined}
								<IconSocial type={entry.icon} class="w-6 h-6 mr-2.5" />
							{/if}
							<span>{entry.text}</span>
						</a>
					{/each}
				</div>
			{/each}
		</div>
		<div
			class="w-full flex flex-col items-center justify-center mt-5 text-center py-7 px-6 md:px-8 border-t-2 border-c-bg/25 relative"
		>
			<p>Hundreds of 🍌 have been eaten and digested while coming up with this shit.</p>
			<p class="mt-4">Banano © {currentYear}</p>
		</div>
	</div>
	<BgWaveTop />
</footer>
