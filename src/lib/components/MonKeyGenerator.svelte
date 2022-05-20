<script lang="ts">
	import { genAddress, isAddress } from '$lib/ts/helpers/banano';
	import {
		monkeyLoadingIn,
		monkeyContainerIn,
		monkeyContainerOut,
		formIn,
		formOut,
		curtainIn,
		againIn,
		againOut
	} from '$lib/ts/transitions';
	import Button from './Button.svelte';

	type TMonkeyLoadState = 'idle' | 'loading' | 'loaded' | 'fullyReady' | 'error';

	let inputValue: string;
	let inputError = false;
	let monkeySvg: string | undefined;
	let monkeyLoadState: TMonkeyLoadState = 'idle';

	async function getMonkey(address: string) {
		try {
			let res = await fetch(`https://monkey.banano.cc/api/v1/monkey/${address}?svc=banano.cc`);
			let resJson = await res.blob();
			let svg = URL.createObjectURL(resJson);
			return svg;
		} catch (e) {
			monkeyLoadState = 'error';
			console.error(e);
		}
	}

	async function generateMonkey(address: string) {
		if (isAddress(address)) {
			monkeyLoadState = 'loading';
			let monkeyResult = await getMonkey(address);
			if (monkeyResult !== undefined) {
				monkeyLoadState = 'loaded';
				setTimeout(() => {
					monkeySvg = monkeyResult;
					monkeyLoadState = 'fullyReady';
				}, 150);
			}
		} else {
			inputError = true;
		}
	}
	function generateRandomMonkey() {
		let address = genAddress();
		generateMonkey(address);
		setTimeout(() => {
			inputValue = address;
		}, 200);
	}
	function resetGeneration() {
		monkeyLoadState = 'idle';
		inputError = false;
		monkeySvg = undefined;
	}

	function clearInputError() {
		if (inputError) {
			inputError = false;
		}
	}
</script>

<div class="relative w-[32rem] max-w-full p-6">
	<div class="relative monkey-generator-container w-full">
		<div class="monkey-generator w-full h-full flex flex-col bg-c-bg absolute left-0 top-0">
			<!-- MonKey loading animation -->
			{#if monkeyLoadState === 'loading' || monkeyLoadState === 'loaded'}
				<div
					in:monkeyLoadingIn|local={{ delay: 150 }}
					class="w-full h-full flex flex-row justify-center items-center absolute left-0 top-0"
				>
					<div class="w-20 h-20 md:w-24 md:h-24 relative">
						<div class="w-full h-full absolute cube cube-0" />
						<div class="w-full h-full absolute cube cube-1" />
						<div class="w-full h-full absolute cube cube-2" />
						<div class="w-full h-full absolute cube cube-3" />
					</div>
				</div>
			{/if}
			<!-- MonKey container -->
			{#if monkeyLoadState === 'fullyReady' || monkeyLoadState === 'loaded' || monkeyLoadState === 'error'}
				<div
					in:monkeyContainerIn|local={{ delay: 100 }}
					out:monkeyContainerOut|local
					class="square absolute left-0 top-0"
				>
					<div class="w-full h-full absolute left-0">
						{#if monkeySvg !== undefined}
							<img class="w-full h-auto" src={monkeySvg} alt="Generated MonKey" />
						{:else if monkeyLoadState === 'error'}
							<div class="w-full h-full flex flex-col items-center justify-center p-4">
								<p class="text-5xl font-bold text-c-danger">:(</p>
								<p class="font-medium text-c-danger mt-6 px-4">
									Something went wrong.<br />Please try again.
								</p>
							</div>
						{/if}
					</div>
				</div>
			{/if}
			<!-- Again Button -->
			{#if monkeyLoadState === 'fullyReady' || monkeyLoadState === 'error'}
				<div
					in:againIn|local={{ delay: 400 }}
					out:againOut|local
					class="w-full flex flex-row justify-center absolute bottom-0 pb-5"
				>
					<Button class="px-8 py-3" type="primary" onClick={resetGeneration}>Again!</Button>
				</div>
			{/if}
			<!-- Input, Show Me & Randomize -->
			{#if monkeyLoadState === 'idle'}
				<div class="w-full h-full flex flex-col relative">
					<form
						out:formOut|local
						in:formIn|local={{ delay: 100 }}
						on:submit|preventDefault={() => generateMonkey(inputValue)}
						class="flex flex-col items-center my-auto relative mx-4 md:mx-6"
					>
						<div class="w-full">
							<input
								name="bananoAddress"
								id="bananoAddress"
								bind:value={inputValue}
								on:input={clearInputError}
								class="w-full font-medium placeholder-c-on-bg/50 text-c-on-bg px-4 py-4.5 mt-2 rounded-xl
                  border-[3px] bg-c-on-bg/5 {inputError
									? 'border-c-danger'
									: 'border-c-on-bg/8 hover:border-c-on-bg/30 focus:border-c-primary'} transition"
								type="text"
								autocomplete="off"
								placeholder="Enter your address"
							/>
						</div>
						<Button type="primary" class="w-full mt-3" onClick={() => generateMonkey(inputValue)}
							>Show Me</Button
						>
					</form>
					<div
						out:formOut|local
						in:formIn|local={{ delay: 100 }}
						class="w-full flex flex-row justify-center absolute bottom-0 pb-5"
					>
						<Button class="px-8 py-3" type="secondary" onClick={generateRandomMonkey}>
							Randomize!
						</Button>
					</div>
				</div>
			{/if}
			<!-- Curtain -->
			{#if monkeyLoadState === 'loaded' || monkeyLoadState === 'fullyReady' || monkeyLoadState === 'error'}
				<div
					in:curtainIn|local
					class="w-full h-full absolute transform -translate-y-full overflow-hidden z-10"
				>
					<div class="w-full h-full bg-c-primary absolute" />
					<div class="w-full h-full bg-c-secondary absolute mt-[8%]" />
					<div class="w-full h-full bg-c-primary absolute mt-[20%]" />
					<div class="w-full h-full bg-c-secondary absolute mt-[35%]" />
				</div>
			{/if}
		</div>
	</div>
</div>
