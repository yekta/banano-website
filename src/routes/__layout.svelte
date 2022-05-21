<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '$lib/css/main.css';
</script>

<Navbar />
<slot />
<Footer />
