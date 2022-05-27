<script lang="ts">
	import LazyComponent from '$lib/components/LazyComponent.svelte';
	import MonKeyGeneratorPlaceholder from './MonKeyGeneratorPlaceholder.svelte';
</script>

<LazyComponent
	importFunc={() => import('./MonKeyGenerator.svelte')}
	placeholderComponent={MonKeyGeneratorPlaceholder}
/>
