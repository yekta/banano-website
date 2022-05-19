<script lang="ts">
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
			url: 'https://kalium.banano.cc',
			img: 'kalium-wallet'
		},
		{
			title: 'BananoVault',
			description: 'Browser-based lightwallet that also supports Ledger Nano S. Ideal for desktop.',
			buttonText: "Let's Go",
			url: 'https://vault.banano.cc',
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
			buttonText: 'I Want This',
			url: 'https://np.reddit.com/r/bananocoin/wiki/reddit-tipbot',
			img: 'reddit-tipbot'
		},
		{
			title: 'Twitter Tipbot',
			description:
				'Ideal for small amounts, to tip and get tipped on Twitter. It is fully managed.',
			buttonText: 'I Want This',
			url: 'https://ba.nanotipbot.com',
			img: 'twitter-tipbot'
		},
		{
			title: 'Telegram Tipbot',
			description:
				'Ideal for small amounts, to tip and get tipped on Telegram. It is fully managed.',
			buttonText: 'I Want This',
			url: 'https://ba.nanotipbot.com',
			img: 'telegram-tipbot'
		}
	];

	const imgExtention = 'png';
</script>

<div id="wallets" class="w-full flex justify-center bg-c-bg relative pt-16 pb-28 px-4 text-center">
	<div class="container-b flex flex-col items-center">
		<h2 class="text-3xl font-bold px-4">Wallets</h2>
		<div class="container-b-small max-w-full flex flex-row flex-wrap justify-center -mt-5">
			{#each wallets as wallet}
				<div
					class="w-full md:w-1/2 lg:w-1/3 max-w-[19rem] flex flex-col items-center px-6 py-4 mt-10 md:mt-12"
				>
					<img src="/images/wallets/{wallet.img}.{imgExtention}" alt={wallet.title} />
					<h3 class="w-full font-bold text-xl mt-4">{wallet.title.toUpperCase()}</h3>
					<p class="mt-2">{wallet.description}</p>
					<Button class="w-full mt-5" type="secondary" href={wallet.url} targetBlank={true}>
						{wallet.buttonText}
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
