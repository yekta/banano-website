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

	let dropdownElementHeight: number;

	$: console.log(dropdownElementHeight);
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
	<div class="w-full relative">
		<div
			style="height:{isDropdownOpen ? dropdownElementHeight + 14 : 0}px"
			class="w-full absolute left-0 top-0 overflow-hidden transition-all"
		>
			<div
				bind:clientHeight={dropdownElementHeight}
				class="w-full bg-c-bg-secondary rounded-b-xl overflow-hidden z-0 shadow-button shadow-c-bg-secondary-shaded"
			>
				{#each items.filter((i) => i !== selectedItem) as item (item.name)}
					<button
						disabled={!isDropdownOpen}
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
	</div>
</div>
