<script lang="ts">
	import '$lib/css/main.css';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import BgWaveBottom from '$lib/components/backgrounds/BgWaveBottom.svelte';
	import BgHero from '$lib/components/backgrounds/BgHero.svelte';

	const title = 'Paper Wallet | Banano';
	const description =
		'Create Banano gift cards or paper wallets for your family, friends or strangers.';
	const canonical = `${canonicalUrl}/${$page.routeId}`;
	const imageUrl = `${canonicalUrl}/previews/${$page.routeId}.jpg`;

	interface IPaperWallet {
		name: string;
		imgSlug: string;
	}

	let selectedPaperWalletIndex = 0;
	const prefix = 'paperwallet';
	const paperwallets: IPaperWallet[] = [
		{
			name: 'Yellow & Gray',
			imgSlug: 'gray-yellow'
		},
		{
			name: 'Green & White',
			imgSlug: 'green-white'
		},
		{
			name: 'Green & Gray',
			imgSlug: 'gray-green'
		},
		{
			name: 'Merry Christmas',
			imgSlug: 'christmas'
		}
	];

	let selectedQuantityIndex = 0;
	const quantityOptions = [1, 5, 10];
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
			{#each paperwallets as paperwallet, index}
				<div class="w-full max-w-md md:max-w-lg md:w-1/2 py-3 md:p-3 lg:p-4">
					<div class="w-full flex flex-col items-start relative">
						<img
							class="w-full h-auto rounded-2xl relative z-0 border-4 border-c-bg shadow-lg shadow-c-on-bg/15"
							src="/paperwallets/{prefix}-{paperwallet.imgSlug}.svg"
							alt="{paperwallet.name} Paper Wallet"
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
			<div class="flex flex-col items-start py-2 px-4 max-w-full w-64">
				<p class="font-bold text-xl px-2">Design</p>
				<Button class="mt-3 w-full"
					>{selectedPaperWalletIndex + 1}) {paperwallets[selectedPaperWalletIndex].name}</Button
				>
			</div>
			<div class="flex flex-col items-start py-2 px-4 w-64">
				<p class="font-bold text-xl px-2">Quantity</p>
				<Button class="mt-3 w-full">{quantityOptions[selectedQuantityIndex]}</Button>
			</div>
			<div class="py-2 px-4 w-64">
				<Button class="w-full" buttonType="secondary">Generate</Button>
			</div>
		</div>
	</div>
</div>
