<script lang="ts">
	import LazyComponent from '$lib/components/LazyComponent.svelte';
	import MonKeyGeneratorPlaceholder from './MonKeyGeneratorPlaceholder.svelte';
</script>

<LazyComponent
	src="../components/MonKeyGenerator.svelte"
	placeholderComponent={MonKeyGeneratorPlaceholder}
/>
