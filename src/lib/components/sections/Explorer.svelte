<script lang="ts">
	import Button from '../Button.svelte';

	let inputExplorer: string;

	async function handleSubmit(e: Event) {
		window.open(`https://creeper.banano.cc/explorer/auto/${inputExplorer}`, '_blank');
		inputExplorer = '';
	}
</script>

<div id="explorer" class="w-full py-10">
	<div class="bg-creeper bg-c-secondary flex justify-center pt-16 pb-20 text-center text-c-bg">
		<div class="container-b flex flex-col items-center px-4 md:px-8">
			<h2 class="text-3xl font-bold px-4">Explorer</h2>
			<p class="mt-3 container-b-small text-xl">
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
					<p class="px-3 text-lg font-bold">Enter an address or block hash:</p>
					<input
						placeholder="Address or block hash"
						id="explorer-input"
						bind:value={inputExplorer}
						type="text"
						class="text-c-on-bg w-full px-4 py-4.5 mt-3 rounded-lg"
					/>
				</label>
				<Button padding="px-8 md:px-12 py-3" class="w-full md:w-auto max-w-sm mt-3 mb-1.5"
					>Search</Button
				>
			</form>
		</div>
	</div>
</div>

<style>
	.bg-creeper {
		background-image: url('/illustrations/backgrounds/bg-creeper.svg');
		background-size: cover;
		background-position: 100% 100%;
		background-repeat: no-repeat;
	}
</style>
