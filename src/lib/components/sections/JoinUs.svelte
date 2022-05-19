<script lang="ts">
	import type { TButton } from '$lib/ts/types/TButton';
	import type { TIconSocial } from '$lib/ts/types/TIconSocial';
	import Button from '../Button.svelte';
	import IconSocial from '../icons/IconSocial.svelte';

	interface SocialButton {
		text: string;
		url: string;
		type: TButton;
		icon: TIconSocial;
	}

	const socialButtons: SocialButton[] = [
		{
			text: 'Join our Discord',
			url: 'https://chat.banano.cc',
			type: 'discord',
			icon: 'discord'
		},
		{
			text: 'Subscribe on Reddit',
			url: 'https://reddit.com/r/banano',
			type: 'reddit',
			icon: 'reddit'
		},
		{
			text: 'Follow on Twitter',
			url: 'https://twitter.com/bananocoin',
			type: 'twitter',
			icon: 'twitter'
		},
		{
			text: 'Follow on Instagram',
			url: 'https://instagram/bananocurrency',
			type: 'instagram',
			icon: 'instagram'
		},
		{
			text: 'Join our Telegram',
			url: 'https://t.me/banano_official',
			type: 'telegram',
			icon: 'telegram'
		},
		{
			text: 'Follow on Facebook',
			url: 'https://www.facebook.com/bananocurrency/',
			type: 'facebook',
			icon: 'facebook'
		}
	];
</script>

<div id="join-us" class="w-full bg-community flex justify-center pt-20 pb-28 text-center">
	<div class="container-b-small flex flex-col items-center">
		<h2 class="text-3xl font-bold px-4">Join the Crypto-Potassium Revolution!</h2>
		<div class="w-full flex flex-wrap justify-center mt-2">
			{#each socialButtons as socialButton}
				<div
					class="w-full max-w-sm md:w-1/2 lg:w-1/3 flex flex-col items-center text-center px-4 md:px-2 mt-2"
				>
					<Button
						padding="px-14 py-3.5"
						class="mt-4 w-full"
						href={socialButton.url}
						targetBlank={true}
						type={socialButton.type}
					>
						<IconSocial type={socialButton.icon} class="w-8 h-8 ml-3 absolute left-0" />
						{socialButton.text}
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
