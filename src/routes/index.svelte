<script>
	import Advisors from '$lib/components/sections/Advisors.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import KeyFeatures from '$lib/components/sections/KeyFeatures.svelte';
	import Team from '$lib/components/sections/Team.svelte';
</script>

<div class="w-full min-h-screen flex flex-col justify-start items-center">
	<Hero />
	<KeyFeatures />
	<Team />
	<Advisors />
</div>
