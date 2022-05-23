<script lang="ts">
	import type { IFaq } from '$lib/ts/interfaces/IFaq';
	import Button from '../Button.svelte';

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

<div id="faq" class="w-full flex justify-center py-8">
	<div class="container-b flex flex-col items-center px-4">
		<h2 class="text-3xl font-bold px-4 text-center">Frequently Asked Questions</h2>
		<div class="w-full flex flex-wrap max-w-2xl justify-center mt-6">
			{#each editedFaq as singleFaq, index}
				<div class="w-full p-1 mt-1.5">
					<div
						class="w-full flex flex-col items-start justify-start bg-c-bg-secondary-shaded rounded-xl"
					>
						<Button
							type="bg"
							isLeft={true}
							onClick={() => toggle(index)}
							padding="px-6 py-4.5 md:px-8"
							class="w-full text-left font-bold text-base">{singleFaq.question}</Button
						>
						{#if singleFaq.isOpen}
							<div class="px-6 md:px-8 py-5 markdown">{@html singleFaq.answer}</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
