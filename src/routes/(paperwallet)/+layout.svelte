<script lang="ts">
	import Footer from '$components/Footer.svelte';
	import Navbar from '$components/Navbar.svelte';
</script>

<Navbar class="print:hidden" />
<main class="w-full bg-c-bg text-c-on-bg font-filson-pro flex flex-col justify-start">
	<slot />
</main>
<Footer class="print:hidden" />
