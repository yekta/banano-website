<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.backgroundColor = 'rgb(var(--c-yellowpaper-document-bg))';
		document.body.style.color = 'rgb(var(--c-yellowpaper-on-bg))';
		document.body.style.fontFamily = 'lm-roman-10, system-ui, serif';
	});
</script>

<slot />
