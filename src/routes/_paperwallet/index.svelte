<script lang="ts">
	import '$lib/css/main.css';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import BgHero from '$lib/components/backgrounds/BgHero.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import bananojs from '@bananocoin/bananojs';
	// @ts-ignore
	import QR from 'svelte-qr';

	const title = 'Paper Wallet | Banano';
	const description =
		'Create Banano gift cards or paper wallets for your family, friends or strangers.';
	const canonical = `${canonicalUrl}/${$page.routeId}`;
	const imageUrl = `${canonicalUrl}/previews/${$page.routeId}.jpg`;

	const imgPrefix = '/paper-wallets/paper-wallet';
	const placeholderAddress = 'ban_1yekta1xn94qdnbmmj1tqg76zk3apcfd31pjmuy6d879e3mr469a4o4sdhd4';

	const hightlightChCountStart = 9;
	const hightlightChCountEnd = 5;

	interface IPaperWallet {
		name: string;
		slug: string;
		listNumber: number;
		qrMarginClasses: string;
	}

	const paperWallets: IPaperWallet[] = [
		{
			name: 'Yellow & Gray',
			slug: 'gray-yellow',
			listNumber: 1,
			qrMarginClasses: 'mt-[32.8%] mr-[16.43%]'
		},
		{
			name: 'Green & White',
			slug: 'green-white',
			listNumber: 2,
			qrMarginClasses: 'mt-[32.8%] mr-[18.25%]'
		},
		{
			name: 'Green & Gray',
			slug: 'gray-green',
			listNumber: 3,
			qrMarginClasses: 'mt-[32.8%] mr-[16.43%]'
		},
		{
			name: 'Christmas',
			slug: 'christmas',
			listNumber: 4,
			qrMarginClasses: 'mt-[20.7%] mr-[15.47%]'
		}
	];
	let selectedPaperWallet = paperWallets[0];

	interface IQuantityOption {
		name: string;
		value: number;
	}
	const quantityOptions: IQuantityOption[] = [
		{ name: '1', value: 1 },
		{ name: '5', value: 5 },
		{ name: '10', value: 10 }
	];
	let selectedQuantity = quantityOptions[0];

	interface IGeneratedPaperWallet {
		seed: string;
		address: string;
		designIndex: number;
	}

	let generatedPaperWallets: IGeneratedPaperWallet[] = [];

	let isFreshlyGenerated = false;
	let isFreshlyGeneratedTimeout: NodeJS.Timeout;

	async function onGenerate() {
		clearTimeout(isFreshlyGeneratedTimeout);
		isFreshlyGenerated = true;
		isFreshlyGeneratedTimeout = setTimeout(() => {
			isFreshlyGenerated = false;
		}, 1000);
		let _generatedPaperWallets: IGeneratedPaperWallet[] = [];
		let designIndex = paperWallets.indexOf(selectedPaperWallet);
		for (let i = 0; i < selectedQuantity.value; i++) {
			const { seed, address } = await generateSeedAddressPair();
			_generatedPaperWallets.push({
				seed,
				address,
				designIndex
			});
		}
		generatedPaperWallets = [...generatedPaperWallets, ..._generatedPaperWallets];
	}

	async function generateSeedAddressPair() {
		let bytes = new Uint8Array(32);
		window.crypto.getRandomValues(bytes);
		const seed = bytesToHex(bytes).toUpperCase();
		const privateKey = bananojs.getPrivateKey(seed, 0);
		const publicKey = await bananojs.getPublicKey(privateKey);
		const address: string = bananojs.getBananoAccount(publicKey);
		return { seed, address };
	}
	// a function to conver uint8 array to hex string
	function bytesToHex(bytes: Uint8Array) {
		return Array.from(bytes)
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
	}
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
			class="w-full bg-c-secondary min-h-[550px] md:min-h-[650px] flex justify-center overflow-hidden"
		>
			<BgHero />
			<BgWaveBottom />
			<div
				class="container-b-small px-5 md:px-24 max-w-full flex flex-col items-center self-center pt-24 pb-32 md:pb-36 relative z-10 text-c-bg"
			>
				<h1 class="font-bold text-4xl md:text-5xl leading-tight">Paper Wallet Generator</h1>
				<p class="text-xl mt-4">
					Gift Banano to friends, family or strangers. Choose a design, click "Generate", print the
					page and load the account with funds. The recepient of your gift can sweep the funds using
					Kalium.
				</p>
				<Button href="#paper-wallet-generator" class="mt-6" padding="px-12 md:px-16 py-3.5">
					Let's Start!
				</Button>
			</div>
		</div>
	</div>
	<div id="paper-wallet-generator" class="w-full bg-c-bg -mt-2 pt-12 pb-12 relative">
		<h2 class="text-3xl font-bold px-5 md:px-12">Generator</h2>
		<p class="container-b-smallest max-w-full text-xl mt-3 px-5 md:px-12">
			Take a look at the design options, then scroll down and start generating paper wallets.
		</p>
		<div class="container-b flex flex-wrap justify-center mt-5">
			{#each paperWallets as paperWallet, index}
				<div class="w-full max-w-md md:max-w-lg md:w-1/2 py-3 md:p-3 lg:p-4">
					<div class="w-full flex flex-col items-start relative">
						<img
							class="w-full h-auto relative z-0 shadow-lg shadow-c-on-bg/15"
							src="{imgPrefix}-{paperWallet.slug}.svg"
							alt="{paperWallet.name} Paper Wallet"
						/>
						<p
							class="font-bold text-lg px-3 py-1.5 shadow-lg shadow-c-on-bg/15 bg-c-bg absolute left-0 top-0 -mt-3 -ml-3"
						>
							{index + 1}
						</p>
						<div class="absolute right-0 top-0 z-10 w-[15%] {paperWallet.qrMarginClasses}">
							<QR text={placeholderAddress} level="H" />
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="w-full mt-2 flex flex-col">
			<div class="container-b-small flex flex-row items-end justify-center relative z-20">
				<div class="flex flex-col items-start py-2 px-4 max-w-full w-72">
					<h2 class="font-bold text-xl px-2">Design</h2>
					<Dropdown items={paperWallets} bind:selectedItem={selectedPaperWallet} />
				</div>
				<div class="flex flex-col items-start py-2 px-4 w-44">
					<h2 class="font-bold text-xl px-2">Quantity</h2>
					<Dropdown items={quantityOptions} bind:selectedItem={selectedQuantity} />
				</div>
				<div class="py-2 px-4 w-64">
					<Button
						class="w-full active:scale-90"
						buttonType={isFreshlyGenerated ? 'secondary' : 'primary'}
						onClick={onGenerate}
					>
						{isFreshlyGenerated ? 'Generated!' : 'Generate'}
					</Button>
				</div>
			</div>
		</div>
		<div class="container-b-smallest flex flex-col items-start mt-8 relative z-0">
			<h3 class="px-5 font-bold text-xl">Generated Addresses</h3>
			<div
				class="w-full h-56 max-h-50vh bg-c-bg text-c-on-bg shadow-xl shadow-c-on-bg/8 mt-3 p-5 
				text-left border border-c-on-bg/5 overflow-auto"
			>
				{#if generatedPaperWallets.length > 0}
					<p class="w-full leading-loose text-sm font-mono">
						{#each [...generatedPaperWallets].reverse() as wallet (wallet.address)}
							<span class="colored-fade-in rounded px-2 py-1">{wallet.address + '\n'}</span>
						{/each}
					</p>
				{:else}
					<div class="w-full h-full flex items-center justify-center">
						<p class="text-c-on-bg/60 text-center">
							You didn't generate any wallets yet.<br />Start by clicking "<span class="font-bold"
								>Generate.</span
							>"
						</p>
					</div>
				{/if}
			</div>
		</div>
		{#if generatedPaperWallets.length > 0}
			<div class="container-b-small flex flex-col items-center mt-8 relative z-0">
				<Button>Print Everything Below</Button>
				<div
					class="w-full bg-c-bg text-c-on-bg shadow-xl shadow-c-on-bg/8 mt-6 p-5 
					text-left border border-c-on-bg/5 h-160 max-h-60vh overflow-y-auto"
				>
					{#each [...generatedPaperWallets].reverse() as wallet (wallet.address)}
						<div class="w-full relative flex items-center">
							<div class="flex flex-col items-center w-56 p-4 text-center">
								<p class="font-bold px-3">ADDRESS</p>
								<p class="text-xs break-all leading-relaxed px-3 mb-4">
									<span class="text-c-secondary font-bold"
										>{wallet.address.slice(0, hightlightChCountStart)}</span
									>{wallet.address.slice(
										hightlightChCountStart,
										wallet.address.length - hightlightChCountEnd
									)}<span class="text-c-secondary font-bold"
										>{wallet.address.slice(wallet.address.length - hightlightChCountEnd)}</span
									>
								</p>
								<div class="w-full px-6 pb-6">
									<QR text={wallet.address} level="H" />
								</div>
							</div>
							<div class="flex-1 relative">
								<img
									class="w-full h-auto relative z-0 mb-2"
									src="{imgPrefix}-{paperWallets[wallet.designIndex].slug}.svg"
									alt="{wallet.address} Paper Wallet"
								/>
								<div
									class="absolute right-0 top-0 z-10 w-[15%] {paperWallets[wallet.designIndex]
										.qrMarginClasses}"
								>
									<QR text={wallet.seed} level="H" />
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.colored-fade-in {
		animation: colored-fade-in-keys 1s ease;
	}
	@keyframes colored-fade-in-keys {
		0% {
			opacity: 0.25;
			color: rgb(var(--c-secondary));
			background: rgb(var(--c-secondary) / 0.15);
		}
		30% {
			opacity: 1;
			color: rgb(var(--c-secondary));
			background: rgb(var(--c-secondary) / 0.15);
		}
		70% {
			opacity: 1;
			color: rgb(var(--c-secondary));
			background: rgb(var(--c-secondary) / 0.15);
		}
		100% {
			color: rgb(var(--c-on-bg));
			background: rgb(var(--c-bg));
		}
	}
</style>
