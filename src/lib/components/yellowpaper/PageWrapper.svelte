<script lang="ts">
	export let pageNumber: number;
	export { classes as class };
	let classes: string;
</script>

<div
	class="w-full bg-c-yellowpaper-bg shadow-yellowpaper-paper shadow-c-yellowpaper-on-bg/30
		px-4 md:px-24 lg:px-36 pt-12 md:pt-20 lg:pt-32 pb-12 md:pb-16 lg:pb-20 {classes}"
>
	<slot />
	<p class="w-full text-center mt-8 md:mt-14 lg:mt-16">{pageNumber}</p>
</div>
