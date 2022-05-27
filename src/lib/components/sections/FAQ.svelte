<script lang="ts">
	import type { IFaq } from '$lib/ts/interfaces/IFaq';
	import Button from '../Button.svelte';
	import IconChevron from '../icons/IconChevron.svelte';

	export let faq: IFaq[];

	let editedFaq = faq.map((q) => {
		return {
			...q,
			isOpen: false
		};
	});

	function onClick(index: number) {
		editedFaq[index].isOpen = !editedFaq[index].isOpen;
		if (editedFaq[index].isOpen) window.plausible('FAQ Opened');
	}
</script>

<div id="faq" class="w-full flex justify-center -mt-8 pt-24 pb-8">
	<div class="container-b flex flex-col items-center">
		<h2 class="text-3xl font-bold text-center px-5">Frequently Asked Questions</h2>
		<div class="w-full flex flex-wrap max-w-2xl justify-center mt-6 px-4">
			{#each editedFaq as singleFaq, index}
				<div
					class="mt-3.5 w-full flex flex-col items-start justify-start bg-c-bg-secondary-shaded rounded-xl"
				>
					<button
						on:click={() => onClick(index)}
						class="w-full px-6 md:px-8 py-4.5 text-left font-bold rounded-xl text-base bg-c-bg-secondary 
						shadow-c-bg-secondary-shaded shadow-button group flex justify-between items-center"
					>
						<p
							class="group-hover:translate-x-2 text-c-on-bg group-hover:text-c-secondary transition flex-1 pr-4"
						>
							{singleFaq.question}
						</p>
						<IconChevron
							class="{editedFaq[index].isOpen
								? '-rotate-180'
								: ''} transition text-c-on-bg/25 group-hover:text-c-secondary h-6 w-6"
						/>
					</button>
					{#if singleFaq.isOpen}
						<div class="px-6 md:px-8 py-5 markdown">{@html singleFaq.answer}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
