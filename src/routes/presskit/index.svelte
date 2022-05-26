<script lang="ts">
	import '$lib/css/main.css';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';

	const title = 'Presskit | Banano';
	const description = 'Press Kit for Banano assets, colors and fonts.';
	const canonical = `${canonicalUrl}/${$page.routeId}`;
	const imageUrl = `${canonicalUrl}/previews/${$page.routeId}.jpg`;

	interface IAsset {
		title: string;
		assetSlug: string;
	}

	interface IColor {
		title: string;
		hex: string;
	}

	interface IFont {
		title: string;
		fontSlug: string;
		url: string;
	}

	const assets: IAsset[] = [
		{
			title: 'Logo',
			assetSlug: 'banano-logo'
		},
		{
			title: 'Logo Vertical',
			assetSlug: 'banano-logo-vertical'
		},
		{
			title: 'Mark',
			assetSlug: 'banano-mark'
		},
		{
			title: 'Icon',
			assetSlug: 'banano-icon'
		}
	];

	const colors: IColor[] = [
		{
			title: 'Yellow (Primary)',
			hex: '#FBDD11'
		},
		{
			title: 'Green (Secondary)',
			hex: '#4CBF4B'
		},
		{
			title: 'Gray (Primary)',
			hex: '#2A2A2E'
		},
		{
			title: 'Gray Dark (Secondary)',
			hex: '#212124'
		}
	];

	const fonts: IFont[] = [
		{
			title: 'Primary Font',
			fontSlug: 'filson-pro',
			url: 'https://fonts.adobe.com/fonts/filson'
		},
		{
			title: 'Secondary Font',
			fontSlug: 'overpass-mono',
			url: 'https://fonts.google.com/specimen/Overpass+Mono'
		}
	];
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
			class="w-full bg-c-secondary min-h-[550px] md:min-h-[650px] bg-cover flex flex-row
			bg-[position:19%_100%] md:bg-[position:20%_100%] lg:bg-[position:40%_50%]"
		>
			<div
				class="container-b-small px-8 md:px-24 max-w-full flex flex-col items-center self-center pt-20 pb-32 md:pb-36 relative z-10 text-c-bg"
			>
				<img class="w-full h-auto" src="/illustrations/foreground/press-kit.svg" alt="Press Kit" />
				<h1 class="font-medium text-2xl mt-12">
					You can find our brands assets, colors and fonts below.
				</h1>
			</div>
		</div>
		<div
			class="w-[110%] -ml-[5%] h-64 absolute bottom-0 left-0 overflow-hidden flex justify-center pointer-events-none"
		>
			<div
				style="background-image:url('/illustrations/backgrounds/bg-wave-bottom.svg');"
				class="w-full bg-[position:0%_100%] bg-[length:300%] md:bg-[length:200%] lg:bg-[length:150%] xl:bg-contain bg-no-repeat"
			/>
		</div>
	</div>
	<div class="w-full bg-c-bg -mt-2 pt-14 pb-12 relative px-8">
		<h2 class="text-3xl font-bold">Assets</h2>
		<p class="container-b-small max-w-full text-lg mt-3 md:px-3">
			SVG assets don't lose quality when scaled but they might not be compatible with some
			platforms.<br />PNG assets lose quality when scaled but they have wide compatibility across
			all platforms.
		</p>
		<div class="container-b flex flex-wrap justify-center items-start md:px-8 -mt-4">
			{#each assets as asset}
				<div
					class="w-full md:w-1/2 lg:w-1/4 max-w-sm flex flex-col items-center px-4 md:px-4 mt-16"
				>
					<h3 class="font-bold text-xl">{asset.title}</h3>
					<img
						class="w-full h-auto rounded-xl mt-6 overflow-hidden shadow-asset shadow-c-on-bg/8"
						src="/presskit/{asset.assetSlug}-w.svg"
						alt={asset.title}
					/>
					<Button
						href={`/presskit/${asset.assetSlug}.svg`}
						download={`${asset.assetSlug}.svg`}
						padding="px-4 py-3.5"
						class="mt-8 w-full"
					>
						Download SVG
					</Button>
					<Button
						href={`/presskit/${asset.assetSlug}.png`}
						download={`${asset.assetSlug}.png`}
						padding="px-4 py-3.5"
						class="mt-5 w-full"
					>
						Download PNG
					</Button>
				</div>
			{/each}
		</div>
	</div>
	<div class="w-full bg-c-bg pt-14 pb-10 relative px-8">
		<h2 class="text-3xl font-bold">Colors</h2>
		<p class="container-b-small max-w-full text-lg mt-3 md:px-8">
			We have four colors in total:<br />Yellow and green is for mostly for foreground items, grays
			are mostly for backgrounds.
		</p>
		<div class="container-b flex flex-wrap justify-center items-end md:px-8 -mt-4">
			{#each colors as color}
				<div
					class="w-full md:w-1/2 lg:w-1/4 max-w-sm flex flex-col items-center px-4 md:px-6 mt-16"
				>
					<h3 class="font-bold text-xl">{color.title}</h3>
					<div style="background: {color.hex}" class="w-full h-28 rounded-2xl mt-4" />
					<p class="font-medium text-xl mt-4">{color.hex}</p>
				</div>
			{/each}
		</div>
	</div>
	<div class="w-full bg-c-bg pt-12 pb-16 relative px-8">
		<h2 class="text-3xl font-bold">Fonts</h2>
		<p class="container-b-small max-w-full text-lg mt-3 md:px-8">
			We have 2 fonts, one primary, one secondary. We use the primary font for almost everything,
			like titles, paragraphs etc. The secondary mono font is mostly used for Banano addresses.
		</p>
		<div class="container-b flex flex-wrap justify-center items-end md:px-8 -mt-4">
			{#each fonts as font}
				<div
					class="w-full md:w-1/2 lg:w-1/3 max-w-sm flex flex-col items-center px-4 md:px-6 mt-16"
				>
					<h3 class="font-bold text-xl">{font.title}</h3>
					<img
						class="w-full h-auto rounded-xl mt-6 overflow-hidden shadow-asset shadow-c-on-bg/8"
						src="/presskit/{font.fontSlug}.svg"
						alt={font.title}
					/>
					<Button padding="px-4 py-3.5" class="mt-8 w-full" href={font.url} target="_blank">
						Check Out Font
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
