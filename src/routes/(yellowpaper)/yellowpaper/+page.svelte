<script lang="ts">
	import '$css/yellowpaper.css';
	import { page } from '$app/stores';
	import { canonicalUrl } from '$ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import Page1 from '$components/yellowpaper/pages/Page1.svelte';
	import Page2 from '$components/yellowpaper/pages/Page2.svelte';
	import Page3 from '$components/yellowpaper/pages/Page3.svelte';
	import Page4 from '$components/yellowpaper/pages/Page4.svelte';
	import Page5 from '$components/yellowpaper/pages/Page5.svelte';
	import Page6 from '$components/yellowpaper/pages/Page6.svelte';
	import Page7 from '$components/yellowpaper/pages/Page7.svelte';
	import Page8 from '$components/yellowpaper/pages/Page8.svelte';
	import Page9 from '$components/yellowpaper/pages/Page9.svelte';
	import Page10 from '$components/yellowpaper/pages/Page10.svelte';
	import Page11 from '$components/yellowpaper/pages/Page11.svelte';
	import Page12 from '$components/yellowpaper/pages/Page12.svelte';
	import Page13 from '$components/yellowpaper/pages/Page13.svelte';
	import Page14 from '$components/yellowpaper/pages/Page14.svelte';
	import { bananoFaucets } from '$ts/constants/bananoFaucets';
	import LazyImage from '$components/LazyImage.svelte';
	import { inview } from 'svelte-inview';
	import { slideAcrossScreen } from '$ts/transitions';
	import { afterNavigate } from '$app/navigation';
	import IconArrow from '$components/icons/IconArrow.svelte';

	const title = 'Yellowpaper™ | Banano';
	const description =
		"Meme-rich, interactive and animated Yellowpaper™ of Banano. Learn about Banano's inner workings.";
	const canonical = `${canonicalUrl}${$page.url.pathname}`;
	const imageUrl = `${canonicalUrl}/previews${$page.url.pathname}.jpg`;

	let isRocketTrigged = false;
	let shouldShowRocket = false;

	let isRickTriggered = false;
	let shouldShowRickCart = false;

	function loadAndSendRocket() {
		if (isRocketTrigged) return;
		window.plausible('Yellowpaper | Rocket Launched');
		isRocketTrigged = true;
		const rocketSrc = '/yellowpaper/banano-rocket.gif';
		const rocketImg = new Image();
		rocketImg.src = rocketSrc;
		rocketImg.onload = () => {
			shouldShowRocket = true;
		};
	}

	function loadAndSendRickCart() {
		if (isRickTriggered) return;
		window.plausible('Yellowpaper | Rick Launched');
		isRickTriggered = true;
		const rickSrc = '/yellowpaper/rick-roller-coaster.gif';
		const rickImg = new Image();
		rickImg.src = rickSrc;
		rickImg.onload = () => {
			shouldShowRickCart = true;
		};
	}

	let previousPage: string | undefined;

	const options = {
		unobserveOnEnter: true
	};

	afterNavigate((navigaton) => {
		previousPage = navigaton?.from?.url.pathname;
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

<div class="w-full flex justify-center items-start yellowpaper overflow-hidden relative z-10">
	<div class="yellowpaper-container p-2 md:p-5 relative">
		{#if previousPage !== undefined}
			<button
				aria-label="Go Back"
				on:click={() => history.back()}
				class="rounded-full p-2 bg-c-yellowpaper-bg text-c-yellowpaper-document-bg mb-3 md:mb-5 shadow-lg
				shadow-c-yellowpaper-on-bg/30 transition xl:absolute xl:left-0 xl:top-0 xl:mt-5 xl:-ml-10
				hover:shadow-xl hover:shadow-c-yellowpaper-on-bg/50 group"
			>
				<IconArrow class="h-7 w-7 group-hover:text-c-yellowpaper-on-bg transition" />
			</button>
		{/if}
		<Page1 />
		<Page2 class="mt-2 md:mt-5" />
		<div use:inview={options} class="w-full" on:enter={loadAndSendRocket} />
		<Page3 class="mt-2 md:mt-5" />
		<Page4 class="mt-2 md:mt-5" />
		<Page5 class="mt-2 md:mt-5" />
		<Page6 class="mt-2 md:mt-5" />
		<Page7 class="mt-2 md:mt-5" />
		<Page8 class="mt-2 md:mt-5" />
		<div class="w-full relative pt-8 items-center flex flex-col">
			<div class="w-full max-w-[16rem] -mb-12 md:-mb-20 lg:-mb-32 relative z-10">
				<LazyImage
					width={488}
					height={601}
					class="w-full h-auto"
					src="/yellowpaper/shady-monkey.gif"
					alt="Shady MonKey"
					placeholderSrc="/yellowpaper/lqip/shady-monkey.png"
				/>
			</div>
			<Page9 />
		</div>
		<div class="w-full flex px-2">
			<div class="flex-1">
				<LazyImage
					width={600}
					height={600}
					class="w-full h-auto"
					src="/yellowpaper/airdrop.gif"
					placeholderSrc="/yellowpaper/lqip/airdrop.png"
					alt="Airdrop Animation"
				/>
			</div>
			<div class="flex-1">
				<LazyImage
					width={600}
					height={600}
					class="w-full h-auto"
					src="/yellowpaper/airdrop.gif"
					placeholderSrc="/yellowpaper/lqip/airdrop.png"
					alt="Airdrop Animation"
				/>
			</div>
			<div class="flex-1 hidden md:block">
				<LazyImage
					width={600}
					height={600}
					class="w-full h-auto"
					src="/yellowpaper/airdrop.gif"
					placeholderSrc="/yellowpaper/lqip/airdrop.png"
					alt="Airdrop Animation"
				/>
			</div>
		</div>
		<Page10 />
		<Page11 class="mt-2 md:mt-5" />
		<Page12 class="mt-2 md:mt-5" />
		<div class="w-full relative pt-12 items-start flex flex-col">
			<div class="w-full -mb-8 md:-mb-16 lg:-mb-28 relative z-10 px-6 md:px-24 lg:px-36">
				<div class="w-full max-w-md">
					<a class="w-full" target="_blank" href={bananoFaucets.MonkeyTalks.url}>
						<LazyImage
							width={1000}
							height={639}
							class="w-full h-auto"
							src="/yellowpaper/deadpool.png"
							alt="Shady MonKey"
							placeholderSrc="/yellowpaper/lqip/deadpool.png"
						/>
					</a>
				</div>
			</div>
			<Page13 />
		</div>
		<div class="w-full justify-center items-center flex">
			<div class="w-2/3 max-w-md">
				<LazyImage
					width={600}
					height={600}
					class="w-full h-auto"
					src="/yellowpaper/banburner.gif"
					placeholderSrc="/yellowpaper/lqip/banburner.png"
					alt="Banburner"
				/>
			</div>
		</div>
		<Page14 onTriggered={loadAndSendRickCart} />
	</div>
	<div
		class="fixed w-full h-full left-0 top-0 flex flex-row pointer-events-none z-50 overflow-hidden"
	>
		{#if shouldShowRocket}
			<img
				in:slideAcrossScreen
				on:introend={() => (shouldShowRocket = false)}
				src="/yellowpaper/banano-rocket.gif"
				alt="Banano Rocket"
				class="w-full h-auto max-w-xs md:max-w-md lg:max-w-lg my-auto"
			/>
		{/if}
		{#if shouldShowRickCart}
			<img
				in:slideAcrossScreen
				on:introend={() => (shouldShowRickCart = false)}
				src="/yellowpaper/rick-roller-coaster.gif"
				alt="Banano Rick Cart"
				class="w-full h-auto max-w-[13rem] md:max-w-xs lg:max-w-sm mt-auto -mb-2.5 md:-mb-6"
			/>
		{/if}
	</div>
</div>
