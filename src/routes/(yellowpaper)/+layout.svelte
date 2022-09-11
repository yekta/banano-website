<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.backgroundColor = 'rgb(var(--c-yellowpaper-document-bg))';
	});
</script>

<svelte:head>
	<link
		rel="preload"
		href="/fonts/lm-roman-10/lm-roman-10-400.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/lm-roman-10/lm-roman-10-700.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/lm-roman-10/lm-roman-10-400-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/lm-roman-10/lm-roman-10-700-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<style>
		@font-face {
			font-family: 'lm-roman-10';
			font-weight: 400;
			src: url('/fonts/lm-roman-10/lm-roman-10-400.woff2') format('woff2'),
				url('/fonts/lm-roman-10/lm-roman-10-400.woff') format('woff');
			font-display: block;
			font-style: normal;
		}
		@font-face {
			font-family: 'lm-roman-10';
			font-weight: 400;
			src: url('/fonts/lm-roman-10/lm-roman-10-400-italic.woff2') format('woff2'),
				url('/fonts/lm-roman-10/lm-roman-10-400-italic.woff') format('woff');
			font-display: block;
			font-style: italic;
		}
		@font-face {
			font-family: 'lm-roman-10';
			font-weight: 700;
			src: url('/fonts/lm-roman-10/lm-roman-10-700.woff2') format('woff2'),
				url('/fonts/lm-roman-10/lm-roman-10-700.woff') format('woff');
			font-display: block;
			font-style: normal;
		}
		@font-face {
			font-family: 'lm-roman-10';
			font-weight: 700;
			src: url('/fonts/lm-roman-10/lm-roman-10-700-italic.woff2') format('woff2'),
				url('/fonts/lm-roman-10/lm-roman-10-700-italic.woff') format('woff');
			font-display: block;
			font-style: italic;
		}
	</style>
</svelte:head>
<main class="bg-c-yellowpaper-bg text-c-yellowpaper-on-bg">
	<slot />
</main>
