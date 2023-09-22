<script lang="ts">
	export let placeholder: any = null;
	export let placeholderProps: any = null;
	const placeholderClass = 'svelte-lazy-placeholder';
</script>

{#if placeholder}
	<div class={placeholderClass}>
		{#if typeof placeholder === 'string'}
			<div>{placeholder}</div>
		{:else if ['function', 'object'].includes(typeof placeholder)}
			<svelte:component this={placeholder} {...placeholderProps} />
		{/if}
	</div>
{/if}
