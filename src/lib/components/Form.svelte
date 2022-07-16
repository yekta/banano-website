<script lang="ts">
	import IconEnter from '$lib/components/icons/IconEnter.svelte';
	import { onMount } from 'svelte';
	import IconChevron from '$lib/components/icons/IconChevron.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { TFormQuestion } from '$lib/ts/types/TFormQuestion';

	export let questions: TFormQuestion[];

	let activePageIndex = 0;
	let maxHeight: number | undefined = undefined;

	function nextOrSubmit(index: number) {
		if (index < questions.length) {
			activePageIndex++;
		}
	}

	const prevPage = () => {
		if (activePageIndex > 0) {
			activePageIndex--;
		}
	};

	const nextPage = () => {
		if (activePageIndex < questions.length - 1) {
			activePageIndex++;
		}
	};

	onMount(() => {
		maxHeight = Math.max(...questions.map((question) => question.pageElement?.clientHeight || 0));
	});
</script>

<div class="w-full flex justify-center pt-24 pb-32 px-2 my-auto">
	<div
		style="height: {maxHeight ?? 0}px"
		class="{maxHeight
			? 'opacity-100'
			: 'opacity-0'} w-full max-w-[50rem] bg-c-bg rounded-2xl md:rounded-3xl shadow-2xl shadow-c-on-bg/30 
      overflow-hidden relative z-0 transition"
	>
		<!-- Progress bar -->
		<div
			class="w-full h-1 absolute top-0 left-0 bg-c-secondary/30 transition {activePageIndex ===
			questions.length
				? 'opacity-0'
				: ''}"
		>
			<div
				style="transform: scaleX({((activePageIndex + 1) / questions.length) * 100}%)"
				class="h-full w-full bg-c-secondary/60 transition origin-left"
			/>
		</div>
		<!-- Next, Prev Buttons -->
		<div
			class="absolute bottom-0 right-0 flex justify-end items-center px-3 py-5 z-20 transition {activePageIndex ===
			questions.length
				? 'opacity-0'
				: ''}"
		>
			<Button
				disabled={activePageIndex === 0 || activePageIndex === questions.length}
				onClick={prevPage}
				class="px-2 py-1 mr-2"
				padding="p-2"
				buttonType="secondary"
			>
				<IconChevron class="transform w-8 h-8 rotate-180" />
			</Button>
			<Button
				disabled={activePageIndex === questions.length - 1 || activePageIndex === questions.length}
				onClick={nextPage}
				class="px-2 py-1"
				padding="p-2"
				buttonType="secondary"
			>
				<IconChevron class="transform w-8 h-8" />
			</Button>
		</div>
		<!-- Form -->
		<div
			style={maxHeight !== undefined
				? `transform: translateY(-${maxHeight * activePageIndex}px)`
				: ''}
			class="w-full flex flex-col items-center overflow-hidden transition duration-300 relative z-10"
		>
			{#each questions as question, index}
				<div
					bind:this={question.pageElement}
					style={maxHeight ? `height:${maxHeight}px` : ''}
					class="w-full px-5 py-24 md:p-24 flex flex-col items-start justify-center transition {index ===
					activePageIndex
						? 'opacity-100'
						: 'opacity-0'}"
				>
					<label for="address" class="w-full font-medium text-2xl text-left px-2">
						{question.question}
					</label>
					<input
						type="text"
						name="adress"
						id="address"
						placeholder={question.placeholder}
						autocomplete="off"
						on:keypress={(e) => (e.key === 'Enter' ? nextOrSubmit(activePageIndex) : null)}
						class="w-full mt-4 px-2 py-3 text-2xl bg-transparent text-c-secondary placeholder:text-c-secondary/40 
              shadow-input shadow-c-secondary/40 hover:shadow-c-secondary/60 
              focus:shadow-input-active focus:shadow-c-secondary hover:placeholder:text-c-secondary/60 placeholder:transition transition"
					/>
					<div class="w-full flex justify-start items-center mt-6 ">
						<Button
							onClick={() => nextOrSubmit(activePageIndex)}
							class="w-auto mr-4"
							buttonType="secondary"
						>
							{activePageIndex == questions.length - 1 ? 'Finish' : 'Continue'}
						</Button>
						<div class="flex justify-start items-center text-sm">
							<p class="mr-1">Press <span class="font-bold">Enter</span></p>
							<IconEnter class="w-4 h-4" />
						</div>
					</div>
				</div>
			{/each}
			<div
				style={maxHeight ? `height:${maxHeight}px` : ''}
				class="w-full max-w-[50rem] px-5 py-24 md:p-24 flex flex-col items-start justify-center transition {questions.length ===
				activePageIndex
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<p class="text-2xl text-c-secondary font-bold text-left">
					Thanks for your submission!<br />
					<span class="text-c-on-bg/60 text-xl font-normal">We'll be in touch...</span>
				</p>
			</div>
		</div>
	</div>
</div>
