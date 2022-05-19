<script lang="ts">
	import { genAddress, validateAddress } from '$lib/ts/helpers/address';
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

	let inputValue: string;
	let inputError = false;
	let monkeySvg: string | undefined;
	let monkeyLoading = false;
	let monkeyLoaded = false;

	async function getMonkey(address: string) {
		try {
			let res = await fetch(`https://monkey.banano.cc/api/v1/monkey/${address}?svc=banano.cc`);
			let resJson = await res.blob();
			let svg = URL.createObjectURL(resJson);
			return svg;
		} catch (e) {
			console.error(e);
		}
	}

	async function generateMonkey(address: string) {
		if (validateAddress(address)) {
			monkeyLoading = true;
			let monkeyResult = await getMonkey(address);
			monkeyLoaded = true;
			setTimeout(() => {
				monkeySvg = monkeyResult;
				monkeyLoading = false;
			}, 150);
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
		monkeyLoading = false;
		monkeyLoaded = false;
		inputError = false;
		monkeySvg = undefined;
	}

	function clearInputError() {
		if (inputError) {
			inputError = false;
		}
	}
</script>

<div class="w-[32rem] max-w-full p-6">
	<div class="generator-container">
		<div class="generator w-full h-full flex flex-col bg-c-bg absolute left-0 top-0">
			<!-- MonKey loading animation -->
			{#if monkeyLoading}
				<div
					in:monkeyLoadingIn={{ delay: 150 }}
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
			{#if monkeyLoaded}
				<div
					in:monkeyContainerIn={{ delay: 100 }}
					out:monkeyContainerOut
					class="w-full h-auto absolute left-0 top-0"
				>
					{#if monkeySvg}
						<img class="w-full h-auto" src={monkeySvg} alt="Generated MonKey" />
					{/if}
				</div>
			{/if}
			<!-- Again Button -->
			{#if monkeyLoaded}
				<div
					in:againIn={{ delay: 400 }}
					out:againOut
					class="w-full flex flex-row justify-center absolute bottom-0 pb-5"
				>
					<Button class="px-8 py-3" type="secondary" onClick={resetGeneration}>Again!</Button>
				</div>
			{/if}
			<!-- Input, Show Me & Randomize -->
			{#if !monkeyLoading && !monkeyLoaded}
				<div class="w-full h-full flex flex-col relative">
					{#if !monkeyLoading && !monkeyLoaded}
						<form
							out:formOut
							in:formIn={{ delay: 100 }}
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
										: 'border-c-on-bg/8 hover:border-c-on-bg/30 focus:border-c-secondary'} transition"
									type="text"
									autocomplete="off"
									placeholder="Enter your address"
								/>
							</div>
							<Button
								type="secondary"
								class="w-full mt-3"
								onClick={() => generateMonkey(inputValue)}>Show Me</Button
							>
						</form>
					{/if}
					{#if !monkeyLoading && !monkeyLoaded}
						<div
							out:formOut
							in:formIn={{ delay: 100 }}
							class="w-full flex flex-row justify-center absolute bottom-0 pb-5"
						>
							<Button class="px-8 py-3" type="secondary" onClick={generateRandomMonkey}>
								Randomize!
							</Button>
						</div>
					{/if}
				</div>
			{/if}
			<!-- Curtain -->
			{#if monkeyLoaded}
				<div
					in:curtainIn
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

<style>
	.generator-container {
		position: relative;
		width: 100%;
	}
	.generator-container:after {
		content: '';
		display: block;
		padding-bottom: calc(100% + 3rem);
	}
	.generator {
		border-radius: 1rem;
		border-width: 0rem;
		border-color: rgb(var(--c-secondary));
		box-shadow: -0.5rem -0.5rem 0rem 0rem rgb(var(--c-secondary)),
			0.5rem -0.5rem 0rem 0rem rgb(var(--c-primary)),
			0.5rem 0.5rem 0rem 0rem rgb(var(--c-secondary)),
			-0.5rem 0.5rem 0rem 0rem rgb(var(--c-primary));
		transform-origin: top center;
		overflow: hidden;
		animation: generatorAnimation 2s infinite;
	}
	@keyframes generatorAnimation {
		0% {
			box-shadow: -0.5rem -0.5rem 0rem 0rem rgb(var(--c-secondary)),
				0.5rem -0.5rem 0rem 0rem rgb(var(--c-primary)),
				0.5rem 0.5rem 0rem 0rem rgb(var(--c-secondary)),
				-0.5rem 0.5rem 0rem 0rem rgb(var(--c-primary));
		}
		25% {
			box-shadow: 0.5rem -0.5rem 0rem 0rem rgb(var(--c-secondary)),
				0.5rem 0.5rem 0rem 0rem rgb(var(--c-primary)),
				-0.5rem 0.5rem 0rem 0rem rgb(var(--c-secondary)),
				-0.5rem -0.5rem 0rem 0rem rgb(var(--c-primary));
		}
		50% {
			box-shadow: 0.5rem 0.5rem 0rem 0rem rgb(var(--c-secondary)),
				-0.5rem 0.5rem 0rem 0rem rgb(var(--c-primary)),
				-0.5rem -0.5rem 0rem 0rem rgb(var(--c-secondary)),
				0.5rem -0.5rem 0rem 0rem rgb(var(--c-primary));
		}
		75% {
			box-shadow: -0.5rem 0.5rem 0rem 0rem rgb(var(--c-secondary)),
				-0.5rem -0.5rem 0rem 0rem rgb(var(--c-primary)),
				0.5rem -0.5rem 0rem 0rem rgb(var(--c-secondary)),
				0.5rem 0.5rem 0rem 0rem rgb(var(--c-primary));
		}
		100% {
			box-shadow: -0.5rem -0.5rem 0rem 0rem rgb(var(--c-secondary)),
				0.5rem -0.5rem 0rem 0rem rgb(var(--c-primary)),
				0.5rem 0.5rem 0rem 0rem rgb(var(--c-secondary)),
				-0.5rem 0.5rem 0rem 0rem rgb(var(--c-primary));
		}
	}
	.cube {
		border-radius: 15%;
		transform: translate(0rem, 0rem);
	}
	.cube-0 {
		background-color: rgb(var(--c-primary));
		box-shadow: 0rem 0.3rem 0rem 0rem rgb(var(--c-primary-shaded));
		animation: animation-0 1.2s infinite;
	}
	.cube-1 {
		background-color: rgb(var(--c-secondary));
		box-shadow: 0rem 0.3rem 0rem 0rem rgb(var(--c-secondary-shaded));
		animation: animation-1 1.1s -0.25s infinite;
	}
	.cube-2 {
		background-color: rgb(var(--c-primary));
		box-shadow: 0rem 0.3rem 0rem 0rem rgb(var(--c-primary-shaded));
		animation: animation-0 1.3s -0.5s infinite;
	}
	.cube-3 {
		background-color: rgb(var(--c-secondary));
		box-shadow: 0rem 0.3rem 0rem 0rem rgb(var(--c-secondary-shaded));
		animation: animation-1 1s -0.75s infinite;
	}
	@keyframes animation-0 {
		0% {
			transform: translate(-2rem, 2rem);
		}
		50% {
			transform: translate(2rem, -2rem);
		}
		100% {
			transform: translate(-2rem, 2rem);
		}
	}
	@keyframes animation-1 {
		0% {
			transform: translate(2.5rem, 2.5rem);
		}
		50% {
			transform: translate(-2.5rem, -2.5rem);
		}
		100% {
			transform: translate(2.5rem, 2.5rem);
		}
	}
</style>
