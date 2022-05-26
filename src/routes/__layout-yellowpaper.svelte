<script lang="ts">
	import '$lib/css/yellowpaper.css';
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.backgroundColor = 'rgb(var(--c-yellowpaper-document-bg))';
	});
</script>

<main class="bg-c-yellowpaper-bg text-c-yellowpaper-on-bg">
	<slot />
</main>
