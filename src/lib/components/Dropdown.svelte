<script lang="ts">
	type T = {
		name: string;
		[key: string]: any;
	};

	import IconChevron from './icons/IconChevron.svelte';
	import { expandCollapse } from '$lib/ts/transitions';
	import { clickoutside } from '$lib/ts/actions/clickoutside';

	export let items: T[];
	export let selectedItem: T;

	let isDropdownOpen = false;

	const toggleDropdown = () => (isDropdownOpen = !isDropdownOpen);
	const closeDropdown = () => (isDropdownOpen = false);

	const setSelectedItem = (item: T) => {
		selectedItem = item;
		toggleDropdown();
	};
</script>

<div use:clickoutside={closeDropdown} class="w-full rounded-xl mt-3 relative z-0">
	<button
		on:click={toggleDropdown}
		class="w-full px-6 py-3.5 bg-c-bg-secondary rounded-t-xl transition-all {isDropdownOpen
			? 'rounded-b-none'
			: 'rounded-b-xl'} overflow-hidden shadow-button shadow-c-bg-secondary-shaded text-lg 
      font-bold flex items-center justify-between group relative z-0 hover:text-c-secondary"
	>
		<p>
			<span class="opacity-50 mr-0.5ch">
				{#if selectedItem.listNumber !== undefined}
					{selectedItem.listNumber})
				{/if}
			</span>
			{selectedItem.name}
		</p>
		<IconChevron
			class="text-c-on-bg/50 group-hover:text-c-secondary w-6 h-6 -mr-2 transition transform {isDropdownOpen
				? 'rotate-180'
				: ''}"
		/>
	</button>
	{#if isDropdownOpen}
		<div class="w-full relative">
			<div
				transition:expandCollapse={{ y: -0.5 }}
				class="w-full absolute bg-c-bg-secondary left-0 top-0 rounded-b-xl overflow-hidden z-0 shadow-button shadow-c-bg-secondary-shaded"
			>
				{#each items.filter((i) => i !== selectedItem) as item (item.name)}
					<button
						class="w-full text-left flex justify-start px-6 py-4 text-lg font-bold transition hover:cursor-pointer
							hover:bg-c-secondary/15 focus:bg-c-on-bg/15 hover:text-c-secondary focus:text-c-on-bg"
						on:click={() => setSelectedItem(item)}
					>
						<p>
							<span class="opacity-50 mr-0.5ch">
								{#if item.listNumber !== undefined}
									{item.listNumber})
								{/if}
							</span>
							{item.name}
						</p>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
