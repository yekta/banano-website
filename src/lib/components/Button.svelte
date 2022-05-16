<script lang="ts">
	export let type: ButtonType = 'primary';
	export let onClick: () => void;
	export { classes as class };
	let classes = '';

	type ButtonType = 'primary' | 'secondary' | 'bg';

	function getBgAndTextClass() {
		switch (type) {
			case 'primary':
				return 'bg-c-primary text-c-on-bg';
			case 'secondary':
				return 'bg-c-secondary text-c-bg';
			case 'bg':
				return 'bg-c-bg text-c-on-bg';
			default:
				return 'bg-c-primary text-c-on-bg';
		}
	}
</script>

<button
	on:click={onClick}
	class="px-8 py-3 font-bold text-lg rounded-lg {getBgAndTextClass()} {classes}"
>
	<slot />
</button>
