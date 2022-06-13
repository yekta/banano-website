<script lang="ts">
	type T = {
		name: string;
		[key: string]: any;
	};

	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import IconChevron from './icons/IconChevron.svelte';
	import { expandCollapse } from '$lib/ts/transitions';

	export let items: T[];
	export let selectedItem: T;
</script>

<Listbox
	class="w-full rounded-xl mt-3 relative"
	value={selectedItem}
	on:change={(e) => (selectedItem = e.detail)}
	let:open
>
	<ListboxButton
		class="w-full px-6 py-3.5 bg-c-bg-secondary rounded-t-xl transition-all {open
			? 'rounded-b-none'
			: 'rounded-b-xl'} overflow-hidden shadow-button shadow-c-bg-secondary-shaded text-lg 
      font-bold flex items-center justify-between group relative hover:text-c-secondary"
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
			class="text-c-on-bg/50 group-hover:text-c-secondary w-6 h-6 -mr-2 transition transform {open
				? 'rotate-180'
				: ''}"
		/>
	</ListboxButton>
	{#if open}
		<div class="w-full relative z-30">
			<div
				transition:expandCollapse={{ y: -0.5 }}
				class="w-full absolute bg-c-bg-secondary left-0 top-0 rounded-b-xl overflow-hidden shadow-button shadow-c-bg-secondary-shaded"
			>
				<ListboxOptions static class="w-full rounded-b-xl">
					{#each items.filter((i) => i !== selectedItem) as item (item.name)}
						<ListboxOption
							class="w-full text-left flex justify-start px-6 py-4 text-lg font-bold transition hover:cursor-pointer
							hover:bg-c-secondary/15 focus:bg-c-on-bg/15 hover:text-c-secondary focus:text-c-on-bg"
							value={item}
						>
							<p>
								<span class="opacity-50 mr-0.5ch">
									{#if item.listNumber !== undefined}
										{item.listNumber})
									{/if}
								</span>
								{item.name}
							</p>
						</ListboxOption>
					{/each}
				</ListboxOptions>
			</div>
		</div>
	{/if}
</Listbox>
