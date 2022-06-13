<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	let classes = 'h-6 w-6';
	export { classes as class };

	export let switched = false;
</script>

<div class="{classes} relative">
	{#if switched}
		<div
			in:scale|local={{ duration: 200, easing: cubicOut, start: 0.5, opacity: 1 }}
			out:scale|local={{ duration: 200, easing: cubicOut, start: 0.5, opacity: 0 }}
			class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full {switched
				? 'z-10'
				: 'z-0'}"
		>
			<slot name="1" />
		</div>
	{:else}
		<div
			in:scale|local={{ duration: 200, easing: cubicOut, start: 0.5, opacity: 1 }}
			out:scale|local={{ duration: 200, easing: cubicOut, start: 0.5, opacity: 0 }}
			class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full {!switched
				? 'z-10'
				: 'z-0'}"
		>
			<slot name="0" />
		</div>
	{/if}
</div>
