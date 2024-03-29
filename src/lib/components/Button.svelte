<script lang="ts">
	import type { TButton } from '$ts/types/TButton';

	export let buttonType: TButton = 'primary';
	export let onClick: (() => void) | undefined = undefined;
	export let href: string | undefined = undefined;
	export let isLeft = false;
	export let padding = 'px-6 py-3.5';
	export { classes as class };
	export let disabled = false;
	export let loading = false;
	let classes = '';

	$: bgAndTextClass = getBgAndTextClass(buttonType);

	function getBgAndTextClass(type: TButton) {
		switch (type) {
			case 'primary':
				return `bg-c-primary text-c-on-bg shadow-c-primary-shaded hover:shadow-c-primary-shaded hover:brightness-108`;
			case 'secondary':
				return `bg-c-secondary text-c-bg shadow-c-secondary-shaded hover:shadow-c-secondary-shaded hover:brightness-115`;
			case 'bg':
				return `bg-c-bg-secondary text-c-on-bg shadow-c-bg-secondary-shaded hover:shadow-c-bg-secondary-shaded hover:brightness-95`;
			case 'discord':
				return `bg-c-discord text-c-bg shadow-c-discord-shaded hover:shadow-c-discord-shaded hover:brightness-115`;
			case 'reddit':
				return `bg-c-reddit text-c-bg shadow-c-reddit-shaded hover:shadow-c-reddit-shaded hover:brightness-110`;
			case 'twitter':
				return `bg-c-twitter text-c-bg shadow-c-twitter-shaded hover:shadow-c-twitter-shaded hover:brightness-110`;
			case 'youtube':
				return `bg-c-youtube text-c-bg shadow-c-youtube-shaded hover:shadow-c-youtube-shaded hover:brightness-110`;
			case 'medium':
				return `bg-c-medium text-c-bg shadow-c-medium-shaded hover:shadow-c-medium-shaded hover:brightness-120`;
			case 'instagram':
				return `bg-c-instagram text-c-bg shadow-c-instagram-shaded hover:shadow-c-instagram-shaded hover:brightness-110`;
			case 'telegram':
				return `bg-c-telegram text-c-bg shadow-c-telegram-shaded hover:shadow-c-telegram-shaded hover:brightness-115`;
			case 'facebook':
				return `bg-c-facebook text-c-bg shadow-c-facebook-shaded hover:shadow-c-facebook-shaded hover:brightness-120`;
			default:
				return `bg-c-primary text-c-on-bg shadow-c-primary-shaded hover:shadow-c-primary-shaded hover:brightness-110`;
		}
	}
</script>

{#if href}
	<a
		{...$$restProps}
		{href}
		on:click={onClick}
		class="flex flex-row items-center {isLeft
			? 'justify-start'
			: 'justify-center'} {padding} relative font-bold text-lg rounded-xl shadow-button hover:shadow-button-hover
			transition-all hover:-translate-y-0.5 filter {bgAndTextClass} {classes}"
	>
		<slot />
	</a>
{:else}
	<button
		{...$$restProps}
		on:click={onClick}
		disabled={disabled || loading}
		class="flex flex-row items-center {isLeft
			? 'justify-start'
			: 'justify-center'} {padding} relative font-bold text-lg rounded-xl shadow-button {loading
			? 'opacity-85'
			: disabled
			? 'opacity-75'
			: 'opacity-100 hover:shadow-button-hover hover:-translate-y-0.5'} 
			transition-all filter {bgAndTextClass} {classes}"
	>
		<slot />
	</button>
{/if}
