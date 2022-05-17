<script lang="ts">
	import type { IFaq } from '$lib/ts/interfaces/IFaq';

	export let faq: IFaq[];

	let editedFaq = faq.map((q) => {
		return {
			...q,
			isOpen: false
		};
	});

	function toggle(index: number) {
		editedFaq[index].isOpen = !editedFaq[index].isOpen;
	}
</script>

<div id="faq" class="w-full flex justify-center pt-16 pb-24">
	<div class="container-b flex flex-col items-center px-4">
		<h2 class="text-3xl font-bold">Frequently Asked Questions</h2>
		<div class="w-full flex flex-wrap max-w-2xl justify-center mt-5">
			{#each editedFaq as singleFaq, index}
				<div class="w-full p-1">
					<div class="w-full flex flex-col items-start justify-start bg-c-on-bg/10 rounded-lg">
						<button
							on:click={() => toggle(index)}
							class="w-full text-left font-bold text-lg px-6 py-4">{singleFaq.question}</button
						>
						{#if singleFaq.isOpen}
							<div class="px-6 py-4 cms">{@html singleFaq.answer}</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
