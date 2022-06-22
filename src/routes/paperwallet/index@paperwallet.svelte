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
	import QR from 'svelte-qr';
	import { clipboard } from 'svelte-copy-clipboard-action';
	import IconCopy from '$lib/components/icons/IconCopy.svelte';
	import IconMorpher from '$lib/components/IconMorpher.svelte';
	import IconTick from '$lib/components/icons/IconTick.svelte';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { onMount, tick } from 'svelte';
	import IconLoading from '$lib/components/icons/IconLoading.svelte';

	const title = 'Paper Wallet | Banano';
	const description = 'Create Banano paper wallets for your family, friends or strangers.';
	const canonical = `${canonicalUrl}/${$page.routeId?.split('@')[0]}`;
	const imageUrl = `${canonicalUrl}/previews/${$page.routeId?.split('@')[0]}.jpg`;

	const imgPrefix = '/paper-wallets/paper-wallet';
	const placeholderAddress = 'ban_1yekta1xn94qdnbmmj1tqg76zk3apcfd31pjmuy6d879e3mr469a4o4sdhd4';

	const hightlightChCountStart = 10;
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
		{ name: '10', value: 10 },
		{ name: '25', value: 25 }
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
		window.plausible('PaperWallet | Generator Used', {
			props: { Design: selectedPaperWallet.name, Quantity: selectedQuantity.value.toString() }
		});
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

	let isPrinting = false;
	let shouldRenderPrinting = false;

	async function printPage() {
		window.plausible('PaperWallet | Print Clicked', {
			props: { 'Wallet Count': generatedPaperWallets.length.toString() }
		});
		isPrinting = true;
		await tick();
		setTimeout(async () => {
			shouldRenderPrinting = true;
			await tick();
			setTimeout(() => {
				window.print();
			}, 100);
		}, 600);
	}

	let isRecentlyCopied = false;
	let isRecentlyCopiedTimeout: NodeJS.Timeout;
	const activateRecentlyCopied = () => {
		clearTimeout(isRecentlyCopiedTimeout);
		isRecentlyCopied = true;
		isRecentlyCopiedTimeout = setTimeout(() => {
			isRecentlyCopied = false;
		}, 1000);
	};

	onMount(() => {
		window.addEventListener('afterprint', (event) => {
			shouldRenderPrinting = false;
			isPrinting = false;
		});
	});
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

<div
	class="w-full bg-c-secondary print:bg-c-bg flex flex-col items-center justify-start text-center print:hidden"
>
	<div class="w-full relative flex flex-row justify-center overflow-hidden">
		<div
			class="w-full bg-c-secondary min-h-[550px] md:min-h-[650px] flex justify-center overflow-hidden"
		>
			<BgHero />
			<BgWaveBottom />
			<div
				class="container-b-small px-5 md:px-24 max-w-full flex flex-col items-center self-center pt-24 pb-36 md:pb-44 relative z-10 text-c-bg"
			>
				<h1 class="font-bold text-4xl md:text-5xl leading-tight">Paper Wallet Generator</h1>
				<p class="text-xl mt-4">
					Gift Banano to friends, family or strangers. Choose a design, click "Generate", print the
					page and load the account with funds. The recepient of your gift can sweep the funds using
					Kalium.
				</p>
			</div>
		</div>
	</div>
	<div
		id="paper-wallet-generator"
		class="w-full bg-c-bg -mt-2 pt-10 pb-12 relative flex flex-col items-center"
	>
		<h2 class="text-3xl font-bold px-5 md:px-12">Generator</h2>
		<p class="container-b-smallest max-w-full text-xl mt-3 px-5 md:px-12">
			Take a look at the design options, then scroll down and start generating paper wallets.
		</p>
		<div class="container-b flex flex-wrap justify-center mt-6 px-2 md:px-8">
			{#each paperWallets as paperWallet, index}
				<div class="w-full max-w-md md:max-w-lg md:w-1/2 p-3 lg:p-4">
					<div class="w-full flex flex-col items-start relative">
						<img
							class="w-full h-auto relative z-0 shadow-lg shadow-c-on-bg/25"
							src="{imgPrefix}-{paperWallet.slug}.svg"
							alt="{paperWallet.name} Paper Wallet"
						/>
						<p
							class="font-bold px-2.5 py-0.5 rounded-md z-0 shadow-lg shadow-c-on-bg/25 bg-c-bg absolute left-0 top-0 -mt-3 -ml-3"
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
		<div class="w-full max-w-md md:max-w-full mt-2 flex flex-col">
			<div class="container-b-small flex flex-row flex-wrap items-end justify-center relative z-10">
				<div class="w-full md:w-72 flex flex-col items-start p-3 max-w-full relative z-10">
					<h2 class="font-bold text-xl px-2">Design</h2>
					<Dropdown items={paperWallets} bind:selectedItem={selectedPaperWallet} />
				</div>
				<div class="w-full md:w-auto flex items-end relative p-3 mt-1 md:mt-0">
					<div class="flex flex-col items-start w-28 mr-3 md:mr-6 relative">
						<h2 class="font-bold text-xl px-2">Quantity</h2>
						<Dropdown items={quantityOptions} bind:selectedItem={selectedQuantity} />
					</div>
					<div class="w-64 flex-1 min-w-0 md:flex-auto relative">
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
		</div>
		<div
			class="container-b-smallest px-3 md:px-8 flex flex-col items-start mt-6 relative z-0 print:hidden"
		>
			<div class="w-full flex flex-row justify-between">
				<h3 class="px-3 font-bold text-xl">
					Generated Addresses {#if generatedPaperWallets.length > 0}
						<span class="opacity-50">({generatedPaperWallets.length})</span>
					{/if}
				</h3>
			</div>
			<div class="w-full relative mt-3">
				<div
					class="w-full h-66 max-h-50vh bg-c-bg text-c-on-bg rounded-xl z-0 shadow-xl shadow-c-on-bg/5 p-3 md:p-4 
					text-left border border-c-on-bg/10 overflow-auto relative"
				>
					{#if generatedPaperWallets.length > 0}
						<p class="w-full leading-loose text-sm font-mono relative">
							{#each [...generatedPaperWallets].reverse() as wallet (wallet.address)}
								<span class="colored-fade-in rounded px-2 py-1">{wallet.address + '\n'}</span>
							{/each}
						</p>
					{:else}
						<div class="w-full h-full flex items-center justify-center relative">
							<p class="text-c-on-bg/60 text-center">
								You didn't generate any wallets yet.<br />Start by clicking "<span class="font-bold"
									>Generate</span
								>".
							</p>
						</div>
					{/if}
				</div>
				{#if generatedPaperWallets.length > 0}
					<div
						class="absolute right-0 top-0 mr-2 mt-2 rounded-lg z-10 bg-c-bg shadow-lg shadow-c-on-bg/15"
					>
						<button
							use:clipboard={{
								trigger: 'click',
								text: generatedPaperWallets
									.map((w) => w.address)
									.reverse()
									.join('\n')
							}}
							on:copied={activateRecentlyCopied}
							class="w-12 h-12 p-2.5 transition group hover:bg-c-secondary/15 hover:text-c-secondary 
							rounded-lg z-0 flex flex-row items-center justify-center"
						>
							<IconMorpher switched={isRecentlyCopied} class="w-full h-full">
								<IconCopy slot="0" class="w-full h-full" />
								<IconTick
									slot="1"
									class="transform scale-125 w-full h-full {isRecentlyCopied
										? 'text-c-secondary'
										: ''}"
								/>
							</IconMorpher>
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
<div class="w-full -mt-3 pb-12 print:m-0 print:p-0">
	{#if generatedPaperWallets.length > 0}
		<div
			class="container-b-smallest flex flex-col items-center relative z-0 px-3 md:px-8 print:px-0 print:w-full print:block"
		>
			<Button
				disabled={isPrinting}
				buttonType={isPrinting ? 'secondary' : 'primary'}
				onClick={printPage}
				class="print:hidden"
				padding="py-3.5 px-8 w-56 max-w-full"
			>
				{#if isPrinting}
					<div class="mr-2"><IconLoading class="w-6 h-6 animate-spin-faster" /></div>
					Printing...
				{:else}
					Print Wallets
				{/if}
			</Button>
			<div
				class="w-full bg-c-bg text-c-on-bg shadow-xl shadow-c-on-bg/5 mt-6
				text-left border border-c-on-bg/10 h-160 max-h-60vh overflow-auto
				print:h-auto print:max-h-full print:border-none print:p-0 print:m-0 print:shadow-none relative"
			>
				<div class="w-[650px] md:w-full h-full print:w-full print:h-full relative">
					<!-- Virtual list, hidden in print mode -->
					<div class="w-full h-full print:hidden">
						<VirtualList items={[...generatedPaperWallets].reverse()} let:item={wallet}>
							<div
								class="w-full relative print:break-inside-avoid table h-auto px-4 pt-4 {wallet.address ===
								generatedPaperWallets[0].address
									? 'pb-4'
									: ''}"
							>
								<div class="w-full relative flex items-center">
									<div class="flex flex-col items-center min-w-[30%] mr-[3%] text-center">
										<p class="font-bold px-3 print:px-0">ADDRESS</p>
										<p class="text-xs break-all leading-relaxed mb-4 font-mono w-[22ch]">
											<span class="text-c-secondary font-bold"
												>{wallet.address.slice(0, hightlightChCountStart)}</span
											>{wallet.address.slice(
												hightlightChCountStart,
												wallet.address.length - hightlightChCountEnd
											)}<span class="text-c-secondary font-bold"
												>{wallet.address.slice(wallet.address.length - hightlightChCountEnd)}</span
											>
										</p>
										<div class="w-full px-[22%]">
											<QR text={wallet.address} level="H" />
										</div>
									</div>
									<div class="flex-1 relative">
										<img
											class="w-full h-auto relative z-0"
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
							</div>
						</VirtualList>
					</div>
					<!-- The list to print, hidden in normal mode -->
					{#if isPrinting && shouldRenderPrinting}
						<div class="w-full h-auto hidden print:block">
							{#each [...generatedPaperWallets].reverse() as wallet}
								<div class="w-full relative break-inside-avoid table h-auto mb-[12pt]">
									<div class="w-full relative flex items-center">
										<div class="flex flex-col items-center min-w-[24%] mr-[4%] text-center">
											<p class="font-bold">ADDRESS</p>
											<p
												class="text-xs break-all font-mono w-[22ch] text-[10pt] leading-[14pt] mt-[2pt] p-0 mb-[12pt]"
											>
												<span class="text-c-secondary font-bold"
													>{wallet.address.slice(0, hightlightChCountStart)}</span
												>{wallet.address.slice(
													hightlightChCountStart,
													wallet.address.length - hightlightChCountEnd
												)}<span class="text-c-secondary font-bold"
													>{wallet.address.slice(
														wallet.address.length - hightlightChCountEnd
													)}</span
												>
											</p>
											<div class="w-full px-[12%]">
												<QR text={wallet.address} level="H" />
											</div>
										</div>
										<div class="flex-1 relative">
											<img
												class="w-full h-auto relative z-0"
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
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
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
