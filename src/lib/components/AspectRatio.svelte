<script lang="ts">
	export let width: number;
	export let height: number;
	export { classes as class };
	let classes: string = '';
</script>

<div
	class={classes}
	style="width: 100%; overflow: hidden; padding-top: {(height / width) *
		100}%; height: 0; position: relative;"
>
	<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%">
		<slot />
	</div>
</div>
