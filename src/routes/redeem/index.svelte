<script lang="ts">
	import '$lib/css/main.css';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import IconChevron from '$lib/components/icons/IconChevron.svelte';
	import SocialButtonGrid from '$lib/components/SocialButtonGrid.svelte';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import { bananoWallets } from '$lib/ts/constants/bananoWallets';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import BgHero from '$lib/components/backgrounds/BgHero.svg?src';

	const title = 'Redeem | Banano';
	const description = 'Instructions on how to redeem your BANANO from a paper wallet.';
	const canonical = `${canonicalUrl}/${$page.routeId}`;
	const imageUrl = `${canonicalUrl}/previews/${$page.routeId}.jpg`;

	let isAndroidOpen = false;
	let isIosOpen = false;

	const toggleAndroid = () => (isAndroidOpen = !isAndroidOpen);
	const toggleIos = () => (isIosOpen = !isIosOpen);
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
			style="background-image:url('/illustrations/backgrounds/bg-hero.svg');"
			class="w-full bg-c-secondary min-h-[550px] md:min-h-[650px] flex flex-row"
		>
			<div class="w-full h-full overflow-hidden absolute">
				{@html BgHero}
			</div>
			<BgWaveBottom />
			<div
				class="container-b-small px-8 md:px-24 max-w-full flex flex-col items-center self-center pt-20 pb-32 md:pb-36 relative z-10 text-c-bg"
			>
				<img class="w-full max-w-md h-auto" src="/gifs/transfer.gif" alt="Transfer" />
				<h1 class="font-medium text-2xl mt-12">
					Follow the instructions below to redeem your Banano from a paper wallet.
				</h1>
			</div>
		</div>
	</div>
	<div class="w-full bg-c-bg -mt-2 pt-14 relative px-8">
		<h2 class="text-3xl font-bold">Instructions</h2>
		<p class="container-b-small max-w-full text-xl mt-3 md:px-3">
			Pick your device to see the instructions.
		</p>
	</div>
	<div class="w-full bg-c-bg container-b-small flex flex-col relative px-4 md:px-8 pb-16">
		<div class="w-full flex flex-wrap justify-center items-start -mt-4">
			{#if !isIosOpen}
				<div
					class="w-full md:w-1/2 max-w-xs flex flex-col justify-start items-center mt-12 px-4 md:px-8"
				>
					<h3 class="text-xl font-bold">Android</h3>
					<img class="w-28 max-w-full h-auto mt-4" src="/redeem/android.svg" alt="Android Phone" />
					<Button
						type={isAndroidOpen ? 'secondary' : 'primary'}
						onClick={toggleAndroid}
						class="w-full max-w-xs mt-5"
					>
						{isAndroidOpen ? 'Hide' : 'Show me'}
					</Button>
				</div>
			{/if}
			{#if !isAndroidOpen}
				<div
					class="w-full md:w-1/2 max-w-xs flex flex-col justify-start items-center mt-12 px-4 md:px-8"
				>
					<h3 class="text-xl font-bold">iPhone</h3>
					<img class="w-28 max-w-full h-auto mt-4" src="/redeem/android.svg" alt="Android Phone" />
					<Button
						type={isIosOpen ? 'secondary' : 'primary'}
						onClick={toggleIos}
						class="w-full max-w-xs mt-5"
					>
						{isIosOpen ? 'Hide' : 'Show me'}
					</Button>
				</div>
			{/if}
		</div>
		{#if isAndroidOpen || isIosOpen}
			<div class="container-b-small flex flex-col justify-center items-center px-4">
				<h4 class="text-3xl font-bold mt-20">Step 1</h4>
				<p class="text-lg mt-4">
					Download Kalium Wallet from {isAndroidOpen ? 'Play Store' : 'App Store'}.
				</p>
				<Button class="mt-6 w-full max-w-xs" href={bananoWallets.kalium.url} target="_blank"
					>Download Kalium</Button
				>
				<h4 class="text-3xl font-bold mt-20">Step 2</h4>
				<p class="text-lg mt-4">Open up Kalium and create a wallet. Be sure to backup your seed!</p>
				<img
					class="w-full max-w-[17rem] h-auto mt-10"
					src="/redeem/kalium-new-wallet.png"
					alt="Kalium New Wallet Screen"
				/>
				<h4 class="text-3xl font-bold mt-20">Step 3</h4>
				<p class="text-lg mt-4">
					On the main screen, tap the settings icon on the top left. Then tap "<b
						>Load from Paper Wallet</b
					>". Follow the instructions in the menu and scan the QR code on your paper wallet.
				</p>
				<div class="w-full flex flex-row flex-wrap justify-center items-center mt-6 md:mt-0">
					<div class="w-full max-w-xs md:max-w-full md:flex-1 mt-3 md:mt-10">
						<img
							class="w-full h-auto"
							src="/redeem/kalium-settings-closed.png"
							alt="Kalium Settings Closed"
						/>
					</div>
					<div class="w-full md:w-auto flex justify-center mt-3">
						<div class="w-16 h-16">
							<IconChevron class="w-16 h-16 text-c-secondary transform md:-rotate-90" />
						</div>
					</div>
					<div class="w-full max-w-xs md:max-w-full md:flex-1 mt-3 md:mt-10">
						<img
							class="w-full h-auto"
							src="/redeem/kalium-settings-open.png"
							alt="Kalium Settings Open"
						/>
					</div>
					<div class="w-full md:w-auto flex justify-center mt-3">
						<div class="w-16 h-16">
							<IconChevron class="w-16 h-16 text-c-secondary transform md:-rotate-90" />
						</div>
					</div>
					<div class="w-full max-w-xs md:max-w-full md:flex-1 mt-3 md:mt-10">
						<img
							class="w-full h-auto"
							src="/redeem/kalium-transfer-funds.png"
							alt="Kalium Transfer Funds"
						/>
					</div>
				</div>
				<h4 class="text-3xl font-bold mt-20">Done!</h4>
				<p class="text-lg mt-4">
					The Banano that was in the paper wallet is now transferred to your Kalium wallet. Enjoy
					your potassium.<br />Join us to have some fun!
				</p>
			</div>
			<div class="container-b-smallest flex flex-wrap justify-center mt-5">
				<SocialButtonGrid />
			</div>
		{/if}
	</div>
</div>
