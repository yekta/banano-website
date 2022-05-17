<script lang="ts">
	import type { Question } from '$lib/ts/types/interfaces/question';

	export let questions: Question[];
</script>

<div id="faq" class="w-full flex justify-center pt-16 pb-24">
	<div class="container-b-small flex flex-col items-center px-4">
		<h2 class="text-3xl font-bold">Frequently Asked Questions</h2>
		<div class="w-full flex flex-wrap justify-center">
			{#each questions as question}
				<div class="w-full p-3">
					<p>{question.question}</p>
					{@html question.answer}
				</div>
			{/each}
		</div>
	</div>
</div>
