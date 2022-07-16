<script lang="ts">
	import IconEnter from '$lib/components/icons/IconEnter.svelte';
	import { onMount } from 'svelte';
	import IconChevron from '$lib/components/icons/IconChevron.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { TFormQuestion, TFormQuestionSubmitResult } from '$lib/ts/types/TFormQuestion';
	import IconLoading from './icons/IconLoading.svelte';
	import IconTick from './icons/IconTick.svelte';

	export let questions: TFormQuestion[];
	export let submit: () => Promise<TFormQuestionSubmitResult>;

	type TSubmitStatus = 'idle' | 'loading' | 'success' | 'error';

	let activePageIndex = 0;
	let maxHeight: number | undefined = undefined;
	let submitStatus: TSubmitStatus = 'idle';

	async function nextOrSubmit() {
		let isValid = questions[activePageIndex].isValid;
		let value = questions[activePageIndex].inputElement?.value;
		if (!isValid(value)) {
			questions[activePageIndex].inputError = true;
			return;
		}
		if (activePageIndex < questions.length - 1) {
			activePageIndex++;
		}
		if (activePageIndex === questions.length - 1) {
			submitStatus = 'loading';
			try {
				let { data, error } = await submit();
				if (data && !error) {
					submitStatus = 'success';
					activePageIndex++;
				} else {
					submitStatus = 'error';
				}
			} catch (error) {
				console.log(error);
				submitStatus = 'error';
			}
		}
	}

	const prevPage = () => {
		if (activePageIndex > 0) {
			activePageIndex--;
		}
	};

	const nextPage = () => {
		let isValid = questions[activePageIndex].isValid;
		let value = questions[activePageIndex].inputElement?.value;
		if (!isValid(value)) {
			questions[activePageIndex].inputError = true;
			return;
		}
		if (activePageIndex < questions.length - 1) {
			activePageIndex++;
		}
	};

	onMount(() => {
		maxHeight = Math.max(...questions.map((q) => q.pageElement?.clientHeight || 0));
	});
</script>

<div class="w-full flex justify-center pt-24 pb-32 px-3 md:px-12 my-auto">
	<div
		style="height: {maxHeight ?? 0}px"
		class="{maxHeight
			? 'opacity-100'
			: 'opacity-0'} w-full max-w-[50rem] bg-c-bg rounded-2xl md:rounded-3xl shadow-2xl shadow-c-on-bg/30 
      overflow-hidden relative z-0 transition"
	>
		<!-- Progress bar -->
		<div
			class="w-full h-1 absolute top-0 left-0 bg-c-secondary/25 transition {activePageIndex ===
			questions.length
				? 'opacity-0'
				: ''}"
		>
			<div
				style="transform: scaleX({((activePageIndex + 1) / questions.length) * 100}%)"
				class="h-full w-full bg-c-secondary/50 transition origin-left"
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
				<IconChevron class="transform w-7 h-7 rotate-180" />
			</Button>
			<Button
				disabled={activePageIndex === questions.length - 1 || activePageIndex === questions.length}
				onClick={nextPage}
				class="px-2 py-1"
				padding="p-2"
				buttonType="secondary"
			>
				<IconChevron class="transform w-7 h-7" />
			</Button>
		</div>
		<!-- Form -->
		<div
			style={maxHeight !== undefined
				? `transform: translateY(-${maxHeight * activePageIndex}px)`
				: ''}
			class="w-full flex flex-col items-center overflow-hidden transition duration-350 relative z-10"
		>
			{#each questions as q, index}
				<div
					bind:this={q.pageElement}
					style={maxHeight ? `height:${maxHeight}px` : ''}
					class="w-full px-5 pt-10 pb-20 md:px-24 md:pt-20 md:pb-24 flex flex-col items-start justify-center transition {index ===
					activePageIndex
						? 'opacity-100'
						: 'opacity-0'}"
				>
					<label for={q.fieldName} class="w-full font-medium text-xl text-left px-2">
						{q.question}
					</label>
					<input
						bind:this={q.inputElement}
						type="text"
						name={q.fieldName}
						id={q.fieldName}
						placeholder={q.placeholder}
						autocomplete="off"
						on:input={() => (q.inputError = false)}
						on:click={() => (q.inputError = false)}
						on:keypress={(e) => (e.key === 'Enter' ? nextOrSubmit() : null)}
						class="w-full mt-4 px-2 py-3 text-xl md:text-2xl bg-transparent
              shadow-input focus:shadow-input-active {q.inputError
							? 'focus:shadow-c-danger text-c-danger shadow-c-danger/40 hover:shadow-c-danger/60 placeholder:hover:text-c-danger/60 placeholder:text-c-danger/40'
							: 'focus:shadow-c-secondary text-c-secondary shadow-c-secondary/40 hover:shadow-c-secondary/60 hover:placeholder:text-c-secondary/60 focus:placeholder:text-c-secondary/60 placeholder:text-c-secondary/40'} placeholder:transition transition"
					/>
					<div class="w-full flex justify-start items-center mt-6 ">
						<Button
							loading={submitStatus === 'loading'}
							onClick={nextOrSubmit}
							class="mr-4 w-full max-w-xxxs"
							buttonType="secondary"
							padding="py-3.5 px-6"
						>
							{#if submitStatus === 'loading'}
								<IconLoading class="animate-spin-faster w-6 h-6 mr-3" />
							{/if}
							<p>
								{submitStatus === 'loading'
									? 'Submitting'
									: activePageIndex == questions.length - 1
									? 'Finish'
									: 'Continue'}
							</p>
						</Button>
						<div class="hidden md:flex justify-start items-center text-sm text-c-on-bg/60">
							<p class="mr-1">Press <span class="font-bold">Enter</span></p>
							<IconEnter class="w-4 h-4" />
						</div>
					</div>
				</div>
			{/each}
			<div
				style={maxHeight ? `height:${maxHeight}px` : ''}
				class="w-full max-w-[50rem] px-5 py-12 md:p-12 flex flex-col items-center justify-center transition {questions.length ===
				activePageIndex
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<IconTick class="text-c-secondary w-20 h-20" />
				<p class="text-2xl text-c-secondary font-bold text-center mt-2">
					We got your submission!<br />
				</p>
				<p class="text-xl text-c-on-bg/60 font-normal mt-2 text-center">We'll be in touch...</p>
			</div>
		</div>
	</div>
</div>
