<script lang="ts">
	export let width: number;
	export let height: number;
</script>

<div
	style="overflow: hidden; padding-top: {(height / width) * 100}%; height: 0; position: relative;"
>
	<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%">
		<slot />
	</div>
</div>
