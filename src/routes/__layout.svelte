<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.backgroundColor = 'rgb(var(--c-secondary))';
		document.body.style.color = 'rgb(var(--c-on-bg))';
		document.body.style.fontFamily = 'now-alt, system-ui, sans-serif';
	});
</script>

<Navbar />
<slot />
<Footer />
