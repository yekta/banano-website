<script lang="ts">
	export let pageNumber: number;
</script>

<div
	class="w-full bg-c-yellowpaper-bg shadow-yellowpaper-paper shadow-c-yellowpaper-on-bg/30
		px-6 md:px-24 lg:px-36 pt-8 md:pt-20 lg:pt-32 pb-8 md:pb-16 lg:pb-20"
>
	<slot />
	<p class="w-full text-center mt-8 md:mt-16 lg:mt-20">{pageNumber}</p>
</div>
