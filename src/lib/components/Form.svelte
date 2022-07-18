<script lang="ts">
	import IconEnter from '$lib/components/icons/IconEnter.svelte';
	import { onMount } from 'svelte';
	import IconChevron from '$lib/components/icons/IconChevron.svelte';
	import Button from '$lib/components/Button.svelte';
	import type {
		TFormQuestion,
		TFormQuestionSubmitResult,
		TFormSuccessMessage
	} from '$lib/ts/types/TForm';
	import IconLoading from './icons/IconLoading.svelte';
	import IconTick from './icons/IconTick.svelte';
	import IconRefresh from './icons/IconRefresh.svelte';

	export let questions: TFormQuestion[];
	export let submit: () => Promise<TFormQuestionSubmitResult>;
	export let maxHeight: number | undefined = undefined;
	export let successMessage: TFormSuccessMessage = {
		title: 'We got your submission!',
		paragraph: "We'll be in touch..."
	};
	export let isRepeatable: boolean = false;

	type TSubmitStatus = 'idle' | 'loading' | 'success' | 'error';

	let activePageIndex = 0;
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
			return;
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

	const repeat = () => {
		activePageIndex = 0;
		submitStatus = 'idle';
		questions.forEach((question) => {
			question.inputError = false;
			if (question.inputElement) {
				question.inputElement.value = '';
			}
		});
	};

	onMount(() => {
		maxHeight = Math.max(...questions.map((q) => q.pageElement?.clientHeight || 0));
	});
</script>

<div
	style="height: {maxHeight ?? 0}px"
	class="w-full relative overflow-hidden z-0 {maxHeight ? 'opacity-100' : 'opacity-0'}"
>
	<!-- Progress bar -->
	<div
		class="w-full h-1 absolute top-0 left-0 bg-c-secondary/25 transition transform {activePageIndex ===
		questions.length
			? '-translate-y-1'
			: 'translate-0'}"
	>
		<div
			style="transform: scaleX({((activePageIndex + 1) / questions.length) * 100}%)"
			class="h-full w-full bg-c-secondary/60 transition origin-left"
		/>
	</div>
	<!-- Repeat Button -->
	{#if isRepeatable}
		<div
			class="absolute bottom-0 right-0 flex justify-end items-center px-3 py-5 z-20 transition transform {activePageIndex ===
			questions.length
				? 'translate-0'
				: 'translate-y-20'}"
		>
			<Button
				disabled={activePageIndex !== questions.length}
				onClick={repeat}
				class="px-3 py-2"
				padding="p-2"
				buttonType="secondary"
			>
				<IconRefresh class="transform w-7 h-7" />
			</Button>
		</div>
	{/if}
	<!-- Next, Prev Buttons -->
	<div
		class="absolute bottom-0 right-0 flex justify-end items-center px-3 py-5 z-20 transition transform {activePageIndex ===
		questions.length
			? 'translate-y-20'
			: 'translate-0'}"
	>
		<Button
			disabled={activePageIndex === 0 ||
				activePageIndex === questions.length ||
				submitStatus == 'loading'}
			onClick={prevPage}
			class="px-2 py-1 mr-2"
			padding="p-2"
			buttonType="secondary"
		>
			<IconChevron class="transform w-7 h-7 rotate-180" />
		</Button>
		<Button
			disabled={activePageIndex === questions.length - 1 ||
				activePageIndex === questions.length ||
				submitStatus == 'loading'}
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
		class="w-full flex flex-col items-center overflow-hidden transition duration-400 relative z-10"
	>
		{#each questions as q, index}
			<div
				bind:this={q.pageElement}
				style={maxHeight ? `height:${maxHeight}px` : ''}
				class="w-full px-5 pt-16 pb-28 md:px-24 md:pt-20 md:pb-24 flex flex-col items-start justify-center transition {index ===
				activePageIndex
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<label for={q.fieldName} class="w-full font-medium text-xl text-left px-2">
					{q.question}
				</label>
				{#if q.inputElementType === 'textarea'}
					<textarea
						bind:this={q.inputElement}
						type={q.inputType === 'email'
							? 'email'
							: q.inputType === 'password'
							? 'password'
							: q.inputType === 'number'
							? 'number'
							: 'text'}
						name={q.fieldName}
						id={q.fieldName}
						placeholder={q.placeholder}
						autocomplete="off"
						rows="4"
						disabled={submitStatus == 'loading'}
						on:input={() => (q.inputError = false)}
						on:click={() => (q.inputError = false)}
						class="w-full rounded-none mt-4 px-2 py-3.5 text-lg md:text-xl bg-transparent
              shadow-input focus:shadow-input-active {q.inputError ||
						(q.lengthLimit && q.inputElement?.value?.length > q.lengthLimit)
							? 'focus:shadow-c-danger text-c-danger shadow-c-danger/40 hover:shadow-c-danger/60 placeholder:hover:text-c-danger/60 placeholder:text-c-danger/40'
							: 'focus:shadow-c-secondary text-c-secondary shadow-c-secondary/40 hover:shadow-c-secondary/60 hover:placeholder:text-c-secondary/60 focus:placeholder:text-c-secondary/60 placeholder:text-c-secondary/40'} placeholder:transition transition"
					/>
				{:else}
					<input
						bind:this={q.inputElement}
						type={q.inputType === 'email'
							? 'email'
							: q.inputType === 'password'
							? 'password'
							: q.inputType === 'number'
							? 'number'
							: 'text'}
						name={q.fieldName}
						id={q.fieldName}
						placeholder={q.placeholder}
						autocomplete="off"
						disabled={submitStatus == 'loading'}
						on:input={() => (q.inputError = false)}
						on:click={() => (q.inputError = false)}
						on:keypress={(e) => (e.key === 'Enter' ? nextOrSubmit() : null)}
						class="w-full rounded-none mt-4 px-2 py-3.5 text-xl md:text-2xl bg-transparent
              shadow-input focus:shadow-input-active {q.inputError ||
						(q.lengthLimit && q.inputElement?.value?.length > q.lengthLimit)
							? 'focus:shadow-c-danger text-c-danger shadow-c-danger/40 hover:shadow-c-danger/60 placeholder:hover:text-c-danger/60 placeholder:text-c-danger/40'
							: 'focus:shadow-c-secondary text-c-secondary shadow-c-secondary/40 hover:shadow-c-secondary/60 hover:placeholder:text-c-secondary/60 focus:placeholder:text-c-secondary/60 placeholder:text-c-secondary/40'} placeholder:transition transition"
					/>
				{/if}
				<div
					class="w-full flex justify-end text-xs mt-2 {q.lengthLimit ? 'opacity-100' : 'opacity-0'}"
				>
					<p class="text-c-secondary/50 font-medium">
						<span
							class="{q.lengthLimit && q.inputElement?.value?.length > q.lengthLimit
								? 'text-c-danger'
								: ''} transition">{q.inputElement?.value?.length}</span
						>/{q.lengthLimit}
					</p>
				</div>
				<div class="w-full flex justify-start items-center mt-3">
					<Button
						loading={submitStatus === 'loading'}
						onClick={nextOrSubmit}
						class="w-full md:max-w-xxs"
						buttonType="secondary"
						padding="py-3.5 px-6"
					>
						{#if submitStatus === 'loading'}
							<IconLoading class="animate-spin-faster w-6 h-6 mr-3" />
						{/if}
						<p>
							{submitStatus === 'loading'
								? 'Submitting'
								: index == questions.length - 1
								? 'Submit'
								: 'Continue'}
						</p>
					</Button>
				</div>
			</div>
		{/each}
		<div
			style={maxHeight ? `height:${maxHeight}px` : ''}
			class="w-full max-w-[50rem] px-5 py-8 md:p-8 flex flex-col items-center justify-center transition {questions.length ===
			activePageIndex
				? 'opacity-100'
				: 'opacity-0'}"
		>
			<IconTick
				class="text-c-secondary w-20 h-20 transform transition duration-800 ease-bounce-out {questions.length ===
				activePageIndex
					? 'scale-100'
					: 'scale-0'}"
			/>
			<p class="text-2xl text-c-secondary font-bold text-center mt-2">{successMessage.title}</p>
			<p class="text-xl text-c-on-bg/60 font-normal mt-3 text-center">{successMessage.paragraph}</p>
		</div>
	</div>
</div>
