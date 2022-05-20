<script lang="ts">
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';

	import type { TButton } from '$lib/ts/types/TButton';
	import type { TIconSocial } from '$lib/ts/types/TIconSocial';
	import Button from '../Button.svelte';
	import IconSocial from '../icons/IconSocial.svelte';

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
			url: bananoSocials.youtube.url,
			text: bananoSocials.youtube.buttonText,
			type: bananoSocials.youtube.buttonType,
			icon: bananoSocials.youtube.iconString
		},
		{
			url: bananoSocials.instagram.url,
			text: bananoSocials.instagram.buttonText,
			type: bananoSocials.instagram.buttonType,
			icon: bananoSocials.instagram.iconString
		},
		{
			url: bananoSocials.telegram.url,
			text: bananoSocials.telegram.buttonText,
			type: bananoSocials.telegram.buttonType,
			icon: bananoSocials.telegram.iconString
		}
	];
</script>

<div id="join-us" class="w-full bg-community flex justify-center py-16 text-center">
	<div class="container-b-small flex flex-col items-center">
		<h2 class="text-3xl font-bold px-4">Join the Crypto-Potassium Revolution!</h2>
		<div class="w-full flex flex-wrap justify-center mt-2 px-4 md:px-8">
			{#each socialButtons as socialButton}
				<div
					class="w-full max-w-sm md:w-1/2 lg:w-1/2 flex flex-col items-center text-center px-2 mt-2"
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
