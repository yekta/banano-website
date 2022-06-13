<script lang="ts">
	let classes = 'h-6 w-6';
	export { classes as class };

	export let switched = false;
</script>

<div class="{classes} relative">
	<div
		class="absolute top-1/2 left-1/2 transition transform -translate-x-1/2 -translate-y-1/2 w-full h-full {switched
			? 'z-10'
			: 'z-0'} {switched ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}"
	>
		<slot name="1" />
	</div>
	<div
		class="absolute top-1/2 left-1/2 transition transform -translate-x-1/2 -translate-y-1/2 w-full h-full {!switched
			? 'z-10'
			: 'z-0'} {switched ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}"
	>
		<slot name="0" />
	</div>
</div>
