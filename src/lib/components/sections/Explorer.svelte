<script lang="ts">
	import { bananoServices } from '$ts/constants/bananoServices';
	import { isHash } from '$ts/helpers/banano';
	import { inview } from 'svelte-inview';
	import Button from '../Button.svelte';

	let inputError = false;
	let isAddress: (a: string) => boolean = (a: string) => true;
	const defaultAddress = 'ban_1bananobh5rat99qfgt1ptpieie5swmoth87thi74qgbfrij7dcgjiij94xr';
	let inputExplorer = defaultAddress;

	async function handleSubmit(e: Event) {
		if (
			inputExplorer !== '' &&
			inputExplorer !== null &&
			inputExplorer !== undefined &&
			(isAddress(inputExplorer) || isHash(inputExplorer))
		) {
			window.plausible('Creeper Used', {
				props: { Address: inputExplorer === defaultAddress ? 'Default' : 'Custom' }
			});
			window.open(`https://creeper.banano.cc/explorer/auto/${inputExplorer}`, '_blank');
		} else {
			window.plausible('Creeper Used', { props: { Address: 'Invalid' } });
			inputError = true;
		}
	}

	const clearInputError = () => {
		if (inputError) {
			inputError = false;
		}
	};

	const options = {
		rootMargin: '1000px',
		unobserveOnEnter: true
	};

	const onEnter = async () => {
		let { getBananoAccountValidationInfo } = await import('@bananocoin/bananojs');
		isAddress = (str) => getBananoAccountValidationInfo(str).valid;
	};
</script>

<div use:inview={options} on:enter={onEnter} id="explorer" class="w-full pt-20">
	<div
		style="background-image:url('/illustrations/backgrounds/bg-creeper.svg');"
		class="bg-c-secondary bg-cover flex justify-center pt-12 pb-16 text-center text-c-bg"
	>
		<div class="container-b flex flex-col items-center px-5 md:px-8">
			<h2 class="text-3xl font-bold">Explorer</h2>
			<p class="mt-3 text-lg container-b-small md:px-16 lg:px-24">
				You have a banano address or a hash that you want to search? Or you just like creeping on
				people? Go ahead, try our network explorer (creeper) below or visit <a
					href={bananoServices.creeper.url}
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
				<Button
					type="submit"
					padding="px-8 md:px-12 py-4"
					class="w-full md:w-auto max-w-sm mt-3 mb-1.5"
				>
					Search
				</Button>
			</form>
		</div>
	</div>
</div>
