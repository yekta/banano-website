<script lang="ts">
	import '$lib/css/main.css';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import BgHero from '$lib/components/backgrounds/BgHero.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	// @ts-ignore
	import bananojs from '@bananocoin/bananojs';

	const title = 'Paper Wallet | Banano';
	const description =
		'Create Banano gift cards or paper wallets for your family, friends or strangers.';
	const canonical = `${canonicalUrl}/${$page.routeId}`;
	const imageUrl = `${canonicalUrl}/previews/${$page.routeId}.jpg`;

	const imgPrefix = 'paperwallet';

	interface IPaperWallet {
		name: string;
		slug: string;
		listNumber: number;
	}
	const paperWallets: IPaperWallet[] = [
		{
			name: 'Yellow & Gray',
			slug: 'gray-yellow',
			listNumber: 1
		},
		{
			name: 'Green & White',
			slug: 'green-white',
			listNumber: 2
		},
		{
			name: 'Green & Gray',
			slug: 'gray-green',
			listNumber: 3
		},
		{
			name: 'Christmas',
			slug: 'christmas',
			listNumber: 4
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
		{ name: '10', value: 10 },
		{ name: '20', value: 20 }
	];
	let selectedQuantity = quantityOptions[0];

	interface IGeneratedAccount {
		seed: string;
		address: string;
	}

	let generatedAccounts: IGeneratedAccount[] = [];

	async function onGenerate() {
		let bytes = new Uint8Array(32);
		window.crypto.getRandomValues(bytes);
		const seed = bytesToHex(bytes).toUpperCase();
		const privateKey = bananojs.getPrivateKey(seed, 0);
		const publicKey = await bananojs.getPublicKey(privateKey);
		const address = bananojs.getBananoAccount(publicKey);
		generatedAccounts.push({ seed, address });
		generatedAccounts = generatedAccounts;
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
				class="container-b-small px-5 md:px-24 max-w-full flex flex-col items-center self-center pt-24 pb-32 relative z-10 text-c-bg"
			>
				<h1 class="font-bold text-4xl md:text-5xl leading-tight">Paper Wallet Generator</h1>
				<p class="text-xl mt-4">
					Gift Banano to friends, family or strangers. Choose a design, click "Generate", print the
					page and load the account with funds. The recepient of your gift can sweep the funds using
					Kalium.
				</p>
				<Button href="#paperwallet-generator" class="mt-6" padding="px-12 md:px-16 py-3.5"
					>Let's Start!</Button
				>
			</div>
		</div>
	</div>
	<div id="paperwallet-generator" class="w-full bg-c-bg -mt-2 pt-12 relative px-5 md:px-8 pb-12">
		<h2 class="text-3xl font-bold">Generator</h2>
		<div class="container-b flex flex-wrap justify-center mt-5">
			{#each paperWallets as paperWallet, index}
				<div class="w-full max-w-md md:max-w-lg md:w-1/2 py-3 md:p-3 lg:p-4">
					<div class="w-full flex flex-col items-start relative">
						<img
							class="w-full h-auto rounded-2xl relative z-0 border-4 border-c-bg shadow-lg shadow-c-on-bg/15"
							src="/paperwallets/{imgPrefix}-{paperWallet.slug}.svg"
							alt="{paperWallet.name} Paper Wallet"
						/>
						<p
							class="font-bold text-lg rounded-md px-3 py-1.5 shadow-lg shadow-c-on-bg/15 bg-c-bg absolute left-0 top-0 -mt-3 -ml-3"
						>
							{index + 1}
						</p>
					</div>
				</div>
			{/each}
		</div>
		<div class="container-b-small flex flex-row items-end justify-center mt-5">
			<div class="flex flex-col items-start py-2 px-4 max-w-full w-72">
				<h2 class="font-bold text-xl px-2">Design</h2>
				<Dropdown items={paperWallets} bind:selectedItem={selectedPaperWallet} />
			</div>
			<div class="flex flex-col items-start py-2 px-4 w-44">
				<h2 class="font-bold text-xl px-2">Quantity</h2>
				<Dropdown items={quantityOptions} bind:selectedItem={selectedQuantity} />
			</div>
			<div class="py-2 px-4 w-64">
				<Button class="w-full" buttonType="secondary" onClick={onGenerate}>Generate</Button>
			</div>
		</div>
		<div class="container-b-small flex flex-col items-start mt-8">
			<h3 class="px-5 font-bold text-xl">Generated Addresses</h3>
			<div
				class="w-full h-80 max-h-50vh bg-c-bg text-c-on-bg shadow-xl shadow-c-on-bg/8 mt-3 px-8 py-6 
				text-left border border-c-on-bg/5 rounded-xl overflow-auto"
			>
				<p class="w-full leading-relaxed">
					{generatedAccounts.map((i) => i.address).join(`\n`)}
				</p>
			</div>
		</div>
	</div>
</div>
