<script lang="ts">
	import { bytesToHex } from '$ts/helpers/banano';

	import {
		monkeyLoadingIn,
		monkeyContainerIn,
		monkeyContainerOut,
		formIn,
		formOut,
		curtainIn,
		againIn,
		againOut
	} from '$ts/transitions';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';

	type TMonkeyLoadState = 'idle' | 'loading' | 'loaded' | 'fullyReady' | 'error';

	const defaultAddress = 'ban_1bananobh5rat99qfgt1ptpieie5swmoth87thi74qgbfrij7dcgjiij94xr';
	let inputValue: string = defaultAddress;
	let inputError = false;
	let monkeySvg: string | undefined;
	let monkeyLoadState: TMonkeyLoadState = 'idle';
	let randomizedAddresses: string[] = [];
	let isAddress: (a: string) => boolean = (a: string) => true;
	let genAddress: () => Promise<string> = async () => defaultAddress;

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
				address !== defaultAddress && !randomizedAddresses.includes(address)
					? window.plausible('MonKey Generator Used', {
							props: { Address: 'Custom' }
					  })
					: window.plausible('MonKey Generator Used', {
							props: { Address: 'Default' }
					  });
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
	async function generateRandomMonkey() {
		window.plausible('MonKey Generator Used', {
			props: { Address: 'Random' }
		});
		let address = await genAddress();
		randomizedAddresses.push(address);
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

	onMount(async () => {
		let bananojs = (await import('@bananocoin/bananojs')).default;
		let { getBananoAccountValidationInfo } = bananojs;
		isAddress = (str) => getBananoAccountValidationInfo(str).valid;
		genAddress = async () => {
			let bytes = new Uint8Array(32);
			window.crypto.getRandomValues(bytes);
			const seed = bytesToHex(bytes).toUpperCase();
			const privateKey = bananojs.getPrivateKey(seed, 0);
			const publicKey = await bananojs.getPublicKey(privateKey);
			const address: string = bananojs.getBananoAccount(publicKey);
			return address;
		};
	});
</script>

<div class="relative w-full max-w-[32rem] p-2">
	<div class="relative monkey-generator-container w-full">
		<!-- Ring animation -->
		<div class="a-ring a-ring-0 w-full h-full rounded-2xl absolute left-0 top-0 bg-c-secondary" />
		<div class="a-ring a-ring-1 w-full h-full rounded-2xl absolute left-0 top-0 bg-c-primary" />
		<div class="a-ring a-ring-2 w-full h-full rounded-2xl absolute left-0 top-0 bg-c-secondary" />
		<div class="a-ring a-ring-3 w-full h-full rounded-2xl absolute left-0 top-0 bg-c-primary" />
		<div
			class="w-full h-full flex flex-col bg-c-bg origin-top rounded-2xl
			overflow-hidden border-c-primary absolute left-0 top-0 z-10"
		>
			<!-- MonKey loading animation -->
			{#if monkeyLoadState === 'loading' || monkeyLoadState === 'loaded'}
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
			{#if monkeyLoadState === 'fullyReady' || monkeyLoadState === 'loaded' || monkeyLoadState === 'error'}
				<div class="w-full absolute left-0 top-0">
					<div
						in:monkeyContainerIn={{ delay: 100 }}
						out:monkeyContainerOut
						class="relative w-full monkey-svg-container"
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
				</div>
			{/if}
			<!-- Again Button -->
			{#if monkeyLoadState === 'fullyReady' || monkeyLoadState === 'error'}
				<div
					in:againIn={{ delay: 400 }}
					out:againOut
					class="w-full px-4 flex flex-row justify-center absolute bottom-0 pb-5"
				>
					<Button
						padding="px-8 py-3"
						class="w-full max-w-xxxs"
						buttonType="primary"
						onClick={resetGeneration}
					>
						Again!
					</Button>
				</div>
			{/if}
			<!-- Input, Show Me & Randomize -->
			{#if monkeyLoadState === 'idle'}
				<div class="w-full h-full flex flex-col relative">
					<form
						out:formOut
						in:formIn={{ delay: 100 }}
						on:submit|preventDefault={() => generateMonkey(inputValue)}
						class="flex flex-col items-center my-auto relative mx-4 md:mx-6"
						id="monkey-input"
					>
						<div class="w-full">
							<label for="monkey-input" class="w-full">
								<p class="w-0 h-0 overflow-hidden opacity-0 pointer-events-none">Banano Address</p>
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
							</label>
						</div>
						<Button type="submit" buttonType="primary" class="w-full mt-3">Show Me</Button>
						<p class="text-c-danger px-4 mt-5 font-bold text-sm">
							{#if inputError}
								Enter a valid address or click "Randomize!".
							{:else}
								&nbsp;
							{/if}
						</p>
					</form>
					<div
						out:formOut
						in:formIn={{ delay: 100 }}
						class="w-full px-4 flex flex-row justify-center absolute bottom-0 py-5"
					>
						<Button
							padding="px-8 py-3"
							class="w-full max-w-xxxs"
							buttonType="secondary"
							onClick={generateRandomMonkey}
						>
							Randomize!
						</Button>
					</div>
				</div>
			{/if}
			<!-- Curtain -->
			{#if monkeyLoadState === 'loaded' || monkeyLoadState === 'fullyReady' || monkeyLoadState === 'error'}
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
	.monkey-svg-container:after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	.monkey-generator-container:after {
		content: '';
		display: block;
		padding-bottom: calc(100% + 4rem);
	}
	.a-ring-0 {
		animation-delay: -1.2s;
	}
	.a-ring-1 {
		animation-delay: -0.8s;
	}
	.a-ring-2 {
		animation-delay: -0.4s;
	}
	.a-ring-3 {
		animation-delay: 0s;
	}
	.a-ring {
		transform: translate(-0.5rem, 0.5rem);
		animation-name: ring-animation;
		animation-duration: 1.6s;
		animation-timing-function: cubic-bezier(0.5, 1, 0.89, 1);
		animation-iteration-count: infinite;
	}
	@keyframes ring-animation {
		0% {
			transform: translate(-0.5rem, 0.5rem);
		}
		25% {
			transform: translate(-0.5rem, -0.5rem);
		}
		50% {
			transform: translate(0.5rem, -0.5rem);
		}
		75% {
			transform: translate(0.5rem, 0.5rem);
		}
		100% {
			transform: translate(-0.5rem, 0.5rem);
		}
	}
	.cube {
		border-radius: 15%;
		transform: translate(0rem, 0rem);
	}
	.cube-0 {
		background-color: rgb(var(--c-secondary));
		box-shadow: 0rem 0.3rem 0rem 0rem rgb(var(--c-secondary-shaded));
		animation: animation-0 1.2s infinite;
	}
	.cube-1 {
		background-color: rgb(var(--c-primary));
		box-shadow: 0rem 0.3rem 0rem 0rem rgb(var(--c-primary-shaded));
		animation: animation-1 1.1s -0.25s infinite;
	}
	.cube-2 {
		background-color: rgb(var(--c-secondary));
		box-shadow: 0rem 0.3rem 0rem 0rem rgb(var(--c-secondary-shaded));
		animation: animation-0 1.3s -0.5s infinite;
	}
	.cube-3 {
		background-color: rgb(var(--c-primary));
		box-shadow: 0rem 0.3rem 0rem 0rem rgb(var(--c-primary-shaded));
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
