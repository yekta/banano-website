<script lang="ts">
	export let pageNumber: number;
</script>

<div>
	<slot />
	{pageNumber}
</div>
