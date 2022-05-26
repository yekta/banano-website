<script lang="ts">
	import type { IFaucet } from '$lib/ts/interfaces/IFaucet';
	import Button from '$lib/components/Button.svelte';
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';
	import type { TButton } from '$lib/ts/types/TButton';
	import type { TIconSocial } from '$lib/ts/types/TIconSocial';
	import IconSocial from '$lib/components/icons/IconSocial.svelte';

	export let faucets: IFaucet[];

	interface SocialButton {
		url: string;
		text: string;
		type: TButton;
		icon: TIconSocial;
	}

	const socialButtons: SocialButton[] = [
		{
			url: bananoSocials.discord.url,
			text: bananoSocials.discord.buttonText,
			type: bananoSocials.discord.buttonType,
			icon: bananoSocials.discord.iconString
		},
		{
			url: bananoSocials.reddit.url,
			text: bananoSocials.reddit.buttonText,
			type: bananoSocials.reddit.buttonType,
			icon: bananoSocials.reddit.iconString
		},
		{
			url: bananoSocials.twitter.url,
			text: bananoSocials.twitter.buttonText,
			type: bananoSocials.twitter.buttonType,
			icon: bananoSocials.twitter.iconString
		},
		{
			url: bananoSocials.telegram.url,
			text: bananoSocials.telegram.buttonText,
			type: bananoSocials.telegram.buttonType,
			icon: bananoSocials.telegram.iconString
		}
	];
</script>

<div id="get-banano" class="w-full pt-18">
	<div
		style="background-image: url('/illustrations/backgrounds/bg-faucet.svg');"
		class="w-full bg-cover bg-c-secondary flex justify-center pt-18 pb-16 text-center text-c-bg"
	>
		<div class="container-b flex flex-col items-center px-4">
			<h2 class="text-3xl font-bold px-4">Get Banano</h2>
			<p class="mt-3 text-lg container-b-small px-2 md:px-16 lg:px-24">
				First, be sure to join our Discord, Reddit & Telegram. Then you can participate in random
				airdrops, monkey around with random tips/rains. We also do giveaways on Twitter, real ones.
				No need to send us any Ethereum.
			</p>
			<div class="w-full flex flex-wrap justify-center items-end mt-2 md:mt-4 md:px-16">
				{#each socialButtons as socialButton}
					<div
						class="w-full md:w-1/2 max-w-[24rem] flex flex-col items-center text-center px-2 mt-2"
					>
						<Button
							padding="px-14 py-3.5"
							class="mt-4 w-full"
							href={socialButton.url}
							target="_blank"
							type={socialButton.type}
						>
							<IconSocial type={socialButton.icon} class="w-8 h-8 ml-3 absolute left-0" />
							{socialButton.text}
						</Button>
					</div>
				{/each}
			</div>
			<h2 class="text-3xl font-bold px-4 mt-20">Banano Faucets</h2>
			<p class="mt-3 text-lg container-b-small px-2 md:px-16 lg:px-24">
				Once you joined our channels and set up a wallet, it's time to try our faucets. We have a
				lot of them, so be sure to try each one.
			</p>
			<div class="w-full flex flex-wrap justify-center items-end mt-2 md:mt-4 md:px-8">
				{#each faucets as faucet}
					{#if !faucet.isStopped}
						<div
							class="w-full md:w-1/2 lg:w-1/3 max-w-[22rem] flex flex-col items-center text-center px-4 my-7"
						>
							<h3 class="font-bold text-xl">{faucet.title}</h3>
							<p class="mt-2 px-2">{faucet.description}</p>
							<Button class="mt-5 w-full" href={faucet.buttonUrl} target="_blank"
								>{faucet.buttonName}</Button
							>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
