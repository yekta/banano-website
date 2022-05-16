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
			url: 'https://banano.how',
			img: 'kalium-wallet'
		},
		{
			title: 'BananoVault',
			description: 'Browser-based lightwallet that also supports Ledger Nano S. Ideal for desktop.',
			buttonText: "Let's Go",
			url: 'https://banano.bet',
			img: 'banano-vault'
		},
		{
			title: 'Discord Tipbot',
			description:
				'Ideal for small amounts, to tip and get tipped on Discord. It is fully managed.',
			buttonText: 'Join Discord',
			url: 'https://jungletv.live',
			img: 'discord-tipbot'
		},
		{
			title: 'Reddit Tipbot',
			description: 'Ideal for small amounts, to tip and get tipped on Reddit. It is fully managed.',
			buttonText: 'I Want This',
			url: 'https://banano.fun',
			img: 'reddit-tipbot'
		},
		{
			title: 'Twitter Tipbot',
			description:
				'Ideal for small amounts, to tip and get tipped on Twitter. It is fully managed.',
			buttonText: 'I Want This',
			url: 'https://banano.fun',
			img: 'twitter-tipbot'
		},
		{
			title: 'Telegram Tipbot',
			description:
				'Ideal for small amounts, to tip and get tipped on Telegram. It is fully managed.',
			buttonText: 'I Want This',
			url: 'https://banano.fun',
			img: 'telegram-tipbot'
		}
	];

	const imgExtention = 'png';
</script>

<div
	id="key-features"
	class="w-full flex justify-center bg-c-bg relative pt-16 pb-28 px-4 text-center"
>
	<div class="container-b flex flex-col items-center">
		<h2 class="text-3xl font-bold">Wallets</h2>
		<div class="container-b-small max-w-full flex flex-row flex-wrap justify-center -mt-3">
			{#each wallets as wallet}
				<div
					class="w-full md:w-1/2 lg:w-1/3 max-w-[18rem] flex flex-col items-center px-6 py-4 mt-8"
				>
					<img src="/images/wallets/{wallet.img}.{imgExtention}" alt={wallet.title} />
					<h4 class="w-full font-bold text-xl mt-4">{wallet.title.toUpperCase()}</h4>
					<p class="mt-2">{wallet.description}</p>
					<Button class="w-full mt-4" type="secondary" href={wallet.url} targetBlank={true}>
						{wallet.buttonText}
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
