<script>
	import Footer from '$lib/components/Footer.svelte';
	/* 	import Navbar from '$lib/components/Navbar.svelte'; */

	import '../app.css';
</script>

<!-- <Navbar /> -->
<slot />
<Footer />

<svelte:head>
	<style>
		body {
			color: rgb(var(--c-on-bg));
			background-color: rgb(var(--c-secondary));
		}
	</style>
</svelte:head>
