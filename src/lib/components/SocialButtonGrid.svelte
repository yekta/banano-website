<script lang="ts">
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';

	import type { TButton } from '$lib/ts/types/TButton';
	import type { TIconSocial } from '$lib/ts/types/TIconSocial';
	import Button from '$lib/components/Button.svelte';
	import IconSocial from '$lib/components/icons/IconSocial.svelte';

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
			url: bananoSocials.medium.url,
			text: bananoSocials.medium.buttonText,
			type: bananoSocials.medium.buttonType,
			icon: bananoSocials.medium.iconString
		},
		{
			url: bananoSocials.telegram.url,
			text: bananoSocials.telegram.buttonText,
			type: bananoSocials.telegram.buttonType,
			icon: bananoSocials.telegram.iconString
		},
		{
			url: bananoSocials.instagram.url,
			text: bananoSocials.instagram.buttonText,
			type: bananoSocials.instagram.buttonType,
			icon: bananoSocials.instagram.iconString
		},
		{
			url: bananoSocials.facebook.url,
			text: bananoSocials.facebook.buttonText,
			type: bananoSocials.facebook.buttonType,
			icon: bananoSocials.facebook.iconString
		},
		{
			url: bananoSocials.email.url,
			text: bananoSocials.email.buttonText,
			type: bananoSocials.email.buttonType,
			icon: bananoSocials.email.iconString
		}
	];
</script>

<div class="w-full flex flex-wrap justify-center">
	{#each socialButtons as socialButton}
		<Button
			padding="px-14 py-3.5"
			class="mt-6 mx-2 w-[calc(100%-0.5rem)] md:w-[calc(100%-0.5rem)] max-w-[23rem]"
			href={socialButton.url}
			target="_blank"
			buttonType={socialButton.type}
		>
			<IconSocial type={socialButton.icon} class="w-8 h-8 ml-3 absolute left-0" />
			{socialButton.text}
		</Button>
	{/each}
</div>
