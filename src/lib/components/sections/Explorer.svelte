<script lang="ts">
	import { isAddress, isHash } from '$lib/ts/helpers/banano';

	import Button from '../Button.svelte';

	let inputExplorer: string;
	let inputError = false;

	async function handleSubmit(e: Event) {
		if (isAddress(inputExplorer) || isHash(inputExplorer)) {
			window.open(`https://creeper.banano.cc/explorer/auto/${inputExplorer}`, '_blank');
			inputExplorer = '';
		} else {
			inputError = true;
		}
	}

	const clearInputError = () => {
		if (inputError) {
			inputError = false;
		}
	};
</script>

<div id="explorer" class="w-full pt-20">
	<div
		style="background-image:url('/illustrations/backgrounds/bg-creeper.svg');"
		class="bg-c-secondary bg-cover flex justify-center pt-12 pb-16 text-center text-c-bg"
	>
		<div class="container-b flex flex-col items-center px-5 md:px-8">
			<h2 class="text-3xl font-bold">Explorer</h2>
			<p class="mt-3 text-lg container-b-small md:px-16 lg:px-24">
				You have a banano address or a hash that you want to search? Or you just like creeping on
				people? Go ahead, try our network explorer (creeper) below or visit <a
					href="https://creeper.banano.cc"
					target="_blank"
					class="hover:underline font-bold">creeper.banano.cc</a
				>.
			</p>
			<form
				on:submit|preventDefault={handleSubmit}
				class="container-b-smallest flex flex-col items-center md:flex-row md:items-end mt-8
				text-left"
			>
				<label for="explorer-input" class="w-full max-w-sm md:max-w-full flex flex-col md:pr-4">
					<p class="px-3 text-lg font-bold">Address or Block Hash</p>
					<input
						placeholder="Enter an address or a block hash"
						id="explorer-input"
						on:input={clearInputError}
						bind:value={inputExplorer}
						type="text"
						class="w-full text-c-on-bg px-4 py-4.5 mt-2 rounded-xl font-medium placeholder-c-on-bg/50
						border-[3px] {inputError
							? 'border-c-danger'
							: 'border-transparent hover:border-c-on-bg/20 focus:border-c-primary'} transition"
					/>
				</label>
				<Button padding="px-8 md:px-12 py-4" class="w-full md:w-auto max-w-sm mt-3 mb-1.5">
					Search
				</Button>
			</form>
		</div>
	</div>
</div>
