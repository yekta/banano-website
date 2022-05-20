<script lang="ts">
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';

	const currentYear = new Date().getFullYear();

	interface IFooterSection {
		title: string;
		entries: IFooterEntry[];
	}
	interface IFooterEntry {
		text: string;
		href: string;
		targetBlank?: boolean;
	}

	const footerSections: IFooterSection[] = [
		{
			title: 'Sections',
			entries: [
				{ text: 'Get Banano', href: '/#get-banano' },
				{ text: 'MonKey', href: '/#monkey' },
				{ text: 'wBAN', href: '/#wrapped-banano' },
				{ text: 'Yellow Paper™', href: '/#yellowpaper' },
				{ text: 'News', href: '/#news' },
				{ text: 'FAQ', href: '/#faq' }
			]
		},
		{
			title: 'Resources',
			entries: [
				{ text: 'Desktop Wallet', href: 'https://vault.banano.cc', targetBlank: true },
				{ text: 'Mobile Wallet', href: 'https://kalium.banano.cc', targetBlank: true },
				{ text: 'Network Explorer', href: 'https://creeper.banano.cc', targetBlank: true },
				{ text: 'Presskit', href: '/presskit' }
			]
		},
		{
			title: 'Community',
			entries: [
				{
					text: bananoSocials.discord.buttonText,
					href: bananoSocials.discord.url,
					targetBlank: true
				},
				{
					text: bananoSocials.reddit.buttonText,
					href: bananoSocials.reddit.url,
					targetBlank: true
				},
				{
					text: bananoSocials.twitter.buttonText,
					href: bananoSocials.twitter.url,
					targetBlank: true
				},
				{
					text: bananoSocials.youtube.buttonText,
					href: bananoSocials.youtube.url,
					targetBlank: true
				},
				{
					text: bananoSocials.instagram.buttonText,
					href: bananoSocials.instagram.url,
					targetBlank: true
				},
				{
					text: bananoSocials.telegram.buttonText,
					href: bananoSocials.telegram.url,
					targetBlank: true
				}
			]
		}
	];
</script>

<footer class="w-full flex flex-row items-start justify-center pt-12 bg-c-bg">
	<div
		class="w-full footer bg-cover bg-[position:85%_100%] md:bg-[position:10%_100%] lg:bg-[position:50%_100%] 
    flex flex-col items-center justify-start text-c-bg pt-18 bg-c-secondary relative overflow-hidden"
	>
		<div
			class="w-[110%] -ml-[5%] -mt-2 h-64 absolute top-0 left-0 overflow-hidden flex justify-center pointer-events-none"
		>
			<div
				class="w-full wave-top bg-[position:0%_0%] bg-[length:300%] md:bg-[length:200%] lg:bg-[length:100%] xl:bg-contain bg-no-repeat"
			/>
		</div>
		<div
			class="container-b-small flex flex-row flex-wrap items-start justify-center relative px-6 md:px-16"
		>
			{#each footerSections as section}
				<div class="w-full md:w-1/3 flex flex-col items-center md:items-start px-4 py-7">
					<h5 class="text-xl font-bold px-2.5">{section.title.toUpperCase()}</h5>
					<div class="flex flex-col items-center md:items-start mt-2">
						{#each section.entries as entry}
							<a
								class="px-2.5 py-2 hover:underline"
								href={entry.href}
								target={entry.targetBlank ? '_blank' : undefined}
							>
								{entry.text}
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<p class="w-full text-center py-7 px-8 border-t-2 border-c-bg/25 mt-5">
			© {currentYear} BANANO. Hundreds of 🍌 have been eaten and digested while coming up with this shit.
		</p>
	</div>
</footer>
