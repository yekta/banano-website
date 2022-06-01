<script lang="ts">
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';
	import { bananoWallets } from '$lib/ts/constants/bananoWallets';
	import LazyImage from '$lib/components/LazyImage.svelte';
	import { bananoServices } from '$lib/ts/constants/bananoServices';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={5} class={classes}>
	<h2 class="font-bold text-2xl"><span class="mr-1ch">3.</span> BANANO Specifications</h2>
	<h3 class="font-bold text-xl mt-5"><span class="mr-1ch">3.1.</span> Accounts</h3>
	<p class="mt-4">
		In order to keep your precious BANANO safe, you'll need a wallet. A wallet can be accessed using
		a public key, also known as a wallet address; and a private key, also known as a seed. Together,
		the public key and the private key form a key-pair. The wallet address is its public key, it’s
		basically like your bank account number. You can share your wallet address with anyone in the
		world and your BANANO will remain secure. Every BANANO wallet address begins with the prefix,
		"ban_" (<b>Figure 4</b>).
	</p>
	<div class="w-full mt-8">
		<a
			class="w-full"
			href="{bananoServices.creeper
				.url}/explorer/account/ban_1meme1yacdi5iu69wcu7et3kzrr1s4yoizd9mx7nstqp1c9e69979mjd4fun/history"
			target="_blank"
		>
			<LazyImage
				width={1205}
				height={625}
				placeholderSrc="/yellowpaper/lqip/share-card.png"
				class="w-full h-auto rounded-2xl"
				src="/yellowpaper/share-card.png"
				alt="Kalium Share Card"
			/>
		</a>
	</div>
	<p class="mt-4 px-4 md:px-12 text-sm">
		<b>Figure 4</b>: A BANANO public address, starting with “ban_”. The QR code shown contains the
		exact same information and can be read by applications such as Kalium.
	</p>
	<p class="mt-6">
		A wallet seed is known as its private key because it absolutely must be kept private. It’s the
		equivalent to your bank account login information. Never share your BANANO seed! Anyone that has
		your seed can access your delicious pile of BANANO, which can lead to a potassium deficiency.
		<br /><br />
		To join the other jungle MonKeys and get a BANANO wallet of your own, you've got several options
		(<b>Figure 5</b>):
	</p>
	<ul class="mt-4">
		<li>
			Mobile Wallet: <a target="_blank" href={bananoWallets.kalium.url}>Kalium (Android & iOS)</a>.
		</li>
		<li>
			Desktop Wallet: <a target="_blank" href={bananoWallets.vault.url}>BANANO Vault Web Wallet</a>.
		</li>
		<li>
			Hardware wallet: <a target="_blank" href="https://shop.ledger.com/products/ledger-nano-s"
				>Ledger Nano S</a
			> model is supported with the BANANO Vault.
		</li>
	</ul>
	<div class="w-full flex flex-row flex-wrap justify-center items-center">
		<div class="w-full max-w-xs md:max-w-[16rem] h-auto mt-8 px-4">
			<a class="w-full" href={bananoWallets.kalium.url} target="_blank">
				<LazyImage
					width={783}
					height={1500}
					src="/yellowpaper/kalium-clay.png"
					placeholderSrc="/yellowpaper/lqip/kalium-clay.png"
					alt="Kalium Wallet"
					class="w-full h-auto rounded-xl"
				/>
			</a>
		</div>
		<div class="w-full md:flex-1 min-w-0 h-auto flex flex-col">
			<div class="w-full mt-8 px-4">
				<a class="w-full" href={bananoWallets.vault.url} target="_blank">
					<LazyImage
						width={1500}
						height={863}
						src="/yellowpaper/vault.png"
						placeholderSrc="/yellowpaper/lqip/vault.png"
						alt="Banano Vault"
						class="w-full h-auto rounded-xl"
					/>
				</a>
			</div>
			<div class="w-full mt-8 px-4">
				<a class="w-full" href="https://shop.ledger.com/products/ledger-nano-s" target="_blank">
					<LazyImage
						width={1000}
						height={227}
						src="/yellowpaper/ledger.png"
						placeholderSrc="/yellowpaper/lqip/ledger.png"
						alt="Ledger Hardware Wallet"
						class="w-full h-auto rounded-xl"
					/>
				</a>
			</div>
		</div>
	</div>
	<p class="mt-6 px-4 md:px-12 text-sm text-center">
		<b>Figure 5</b>: Overview of main BANANO wallets.
	</p>
</PageWrapper>
