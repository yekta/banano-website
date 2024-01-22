<script lang="ts">
	import '$css/main.css';
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import { canonicalUrl } from '$ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import BgWaveBottom from '$components/backgrounds/BgWaveBottom.svelte';
	import BgHero from '$components/backgrounds/BgHero.svelte';
	import { bananoWallets } from '$ts/constants/bananoWallets';
	import type { TWallet } from '$ts/types/Wallets';

	const title = 'Vault | Banano';
	const description =
		'The old & official browser-based Banano wallet that is now deprecated. The new one is TheBananoVault. Time to move on.';
	const canonical = `${canonicalUrl}${$page.url.pathname}`;
	const imageUrl = `${canonicalUrl}/previews${$page.url.pathname}.jpg`;

	const wallets: TWallet[] = [
		{
			title: 'TheBananoStand',
			description: 'Browser-based lightwallet that also supports Ledger Nano S. Ideal for desktop.',
			buttonText: 'Visit BananoStand',
			url: bananoWallets.thebananostand.url,
			img: 'thebananostand'
		},
		{
			title: 'Kalium',
			description:
				'Send Banano to all your friends on the go with Kalium. Available on iOS & Android.',
			buttonText: 'Download Kalium',
			url: bananoWallets.kalium.url,
			img: 'kalium-wallet'
		}
	];

	const imgExtention = 'png';
</script>

<MetaTags
	{title}
	{description}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title: title,
		description: description,
		images: [
			{
				url: imageUrl,
				width: 1200,
				height: 630
			}
		]
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: title,
		description: description,
		image: imageUrl
	}}
/>

<div class="w-full bg-c-secondary flex flex-col items-center justify-start text-center">
	<div class="w-full relative flex flex-row justify-center overflow-hidden">
		<div
			class="w-full bg-c-secondary min-h-[450px] md:min-h-[450px] flex justify-center overflow-hidden"
		>
			<BgHero />
			<BgWaveBottom />
			<div
				class="container-b-small px-8 md:px-24 max-w-full flex flex-col items-center self-center pt-24 pb-28 md:pb-36 relative z-10 text-c-bg"
			>
				<h1 class="font-bold text-4xl md:text-5xl">Time to move on!</h1>
				<p class="text-xl mt-5">
					Banano Vault is no longer supported. We have a better official browser-based wallet now:
					TheBananoVault.
				</p>
				<p />
			</div>
		</div>
	</div>
	<div class="w-full bg-c-bg -mt-2 pt-14 pb-12 relative px-8">
		<h2 class="text-3xl font-bold">Use TheBananoVault</h2>
		<p class="container-b-small max-w-full text-lg mt-3 md:px-3">
			TheBananoVault is the official browser-based wallet for Banano going forward. You can use it
			instead of Banano Vault. Alternatively, you can use Kalium which is our mobile wallet for iOS
			and Android.
		</p>
		<div class="container-b max-w-full flex flex-row flex-wrap justify-center -mt-8">
			{#each wallets as wallet}
				<div
					class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[19rem] flex flex-col items-center px-4 md:px-6 py-4 mt-10 md:mt-12"
				>
					<img
						width="620"
						height="1100"
						src="/images/wallets/{wallet.img}.{imgExtention}"
						alt={wallet.title}
					/>
					<h3 class="w-full font-bold text-xl mt-4">{wallet.title}</h3>
					<p class="mt-2">{wallet.description}</p>
					<Button class="w-full mt-5" buttonType="secondary" href={wallet.url} target="_blank">
						{wallet.buttonText}
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
