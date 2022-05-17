<script lang="ts">
	import type { TButton } from '$lib/ts/types/TButton';
	import Button from '../Button.svelte';

	interface SocialButton {
		text: string;
		url: string;
		type: TButton;
	}

	const socialButtons: SocialButton[] = [
		{
			text: 'Join our Discord',
			url: 'https://chat.banano.cc',
			type: 'discord'
		},
		{
			text: 'Subscribe on Reddit',
			url: 'https://reddit.com/r/banano',
			type: 'reddit'
		},
		{
			text: 'Follow on Twitter',
			url: 'https://twitter.com/bananocoin',
			type: 'twitter'
		},
		{
			text: 'Follow on Instagram',
			url: 'https://instagram/bananocurrency',
			type: 'instagram'
		},
		{
			text: 'Join our Telegram',
			url: 'https://t.me/banano_official',
			type: 'telegram'
		},
		{
			text: 'Follow on Facebook',
			url: 'https://www.facebook.com/bananocurrency/',
			type: 'facebook'
		}
	];
</script>

<div id="join-us" class="w-full bg-community flex justify-center pt-20 pb-28 text-center">
	<div class="container-b-small flex flex-col items-center">
		<h2 class="text-3xl font-bold px-4">Join the Crypto-Potassium Revolution</h2>
		<div class="w-full flex flex-wrap justify-center mt-2">
			{#each socialButtons as socialButton}
				<div
					class="w-full md:w-1/2 lg:w-1/3 max-w-xs flex flex-col items-center text-center px-4 mt-2"
				>
					<Button
						class="mt-4 w-full"
						href={socialButton.url}
						targetBlank={true}
						type={socialButton.type}
					>
						{socialButton.text}
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
