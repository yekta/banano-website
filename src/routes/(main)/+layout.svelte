<script lang="ts">
	import Footer from '$components/Footer.svelte';
	import Navbar from '$components/Navbar.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.background = `rgb(var(--c-bg))`;
	});
</script>

<Navbar />
<main class="w-full bg-c-bg text-c-on-bg font-filson-pro flex flex-col justify-start">
	<slot />
</main>
<Footer />
