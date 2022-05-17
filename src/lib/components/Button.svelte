<script lang="ts">
	import type { TButton } from '$lib/ts/types/TButton';

	export let type: TButton = 'primary';
	export let onClick: (() => void) | undefined = undefined;
	export let href: string | undefined = undefined;
	export let targetBlank = false;
	export { classes as class };
	let classes = '';

	function getBgAndTextClass() {
		switch (type) {
			case 'primary':
				return 'bg-c-primary text-c-on-bg shadow-c-primary-shaded hover:shadow-c-primary-shaded';
			case 'secondary':
				return 'bg-c-secondary text-c-bg shadow-c-secondary-shaded hover:shadow-c-secondary-shaded';
			case 'bg':
				return 'bg-c-bg-secondary text-c-on-bg shadow-c-bg-secondary-shaded hover:shadow-c-bg-secondary-shaded';
			case 'discord':
				return 'bg-c-discord text-c-bg shadow-c-discord-shaded hover:shadow-c-discord-shaded';
			case 'reddit':
				return 'bg-c-reddit text-c-bg shadow-c-reddit-shaded hover:shadow-c-reddit-shaded';
			case 'twitter':
				return 'bg-c-twitter text-c-bg shadow-c-twitter-shaded hover:shadow-c-twitter-shaded';
			case 'instagram':
				return 'bg-c-instagram text-c-bg shadow-c-instagram-shaded hover:shadow-c-instagram-shaded';
			case 'telegram':
				return 'bg-c-telegram text-c-bg shadow-c-telegram-shaded hover:shadow-c-telegram-shaded';
			case 'facebook':
				return 'bg-c-facebook text-c-bg shadow-c-facebook-shaded hover:shadow-c-facebook-shaded';
			default:
				return 'bg-c-primary text-c-on-bg shadow-c-primary-shaded hover:shadow-c-primary-shaded';
		}
	}
</script>

{#if href}
	<a
		{href}
		target={targetBlank ? '_blank' : null}
		class="px-8 py-3 font-bold text-lg rounded-lg shadow-button hover:shadow-button-hover transition-all hover:-translate-y-0.5 {getBgAndTextClass()} {classes}"
	>
		<slot />
	</a>
{:else}
	<button
		on:click={onClick}
		class="px-8 py-3 font-bold text-lg rounded-lg shadow-button hover:shadow-button-hover transition-all hover:-translate-y-1 {getBgAndTextClass()} {classes}"
	>
		<slot />
	</button>
{/if}
