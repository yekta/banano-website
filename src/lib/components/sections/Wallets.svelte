<script lang="ts">
	import { bananoWallets } from '$lib/ts/constants/bananoWallets';

	import Button from '../Button.svelte';

	interface Wallet {
		title: string;
		description: string;
		buttonText: string;
		url: string;
		img: string;
	}

	const wallets: Wallet[] = [
		{
			title: 'Kalium',
			description:
				'Send Banano to all your friends on the go with Kalium. Available on iOS & Android.',
			buttonText: 'Download Kalium',
			url: bananoWallets.kalium.url,
			img: 'kalium-wallet'
		},
		{
			title: 'BananoVault',
			description: 'Browser-based lightwallet that also supports Ledger Nano S. Ideal for desktop.',
			buttonText: 'Visit BananoVault',
			url: bananoWallets.vault.url,
			img: 'banano-vault'
		},
		{
			title: 'Discord Tipbot',
			description:
				'Ideal for small amounts, to tip and get tipped on Discord. It is fully managed.',
			buttonText: 'Join Discord',
			url: 'https://chat.banano.cc',
			img: 'discord-tipbot'
		},
		{
			title: 'Reddit Tipbot',
			description: 'Ideal for small amounts, to tip and get tipped on Reddit. It is fully managed.',
			buttonText: 'Check on Reddit',
			url: 'https://np.reddit.com/r/banano/wiki/reddit-tipbot',
			img: 'reddit-tipbot'
		}
		/* 		{
			title: 'Twitter Tipbot',
			description:
				'Ideal for small amounts, to tip and get tipped on Twitter. It is fully managed.',
			buttonText: 'Check on Twitter',
			url: 'https://ba.nanotipbot.com',
			img: 'twitter-tipbot'
		},
		{
			title: 'Telegram Tipbot',
			description:
				'Ideal for small amounts, to tip and get tipped on Telegram. It is fully managed.',
			buttonText: 'Check on Telegram',
			url: 'https://ba.nanotipbot.com',
			img: 'telegram-tipbot'
		} */
	];

	const imgExtention = 'png';
</script>

<div
	id="wallets"
	class="w-full flex justify-center relative -mt-8 pt-24 pb-20 px-4 md:px-12 text-center"
>
	<div class="container-b flex flex-col items-center">
		<h2 class="text-3xl font-bold px-5">Wallets</h2>
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
