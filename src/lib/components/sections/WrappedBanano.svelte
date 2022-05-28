<script lang="ts">
	import { bananoServices } from '$lib/ts/constants/bananoServices';

	import Button from '../Button.svelte';
</script>

<div id="wban" class="w-full flex justify-center bg-c-bg relative pt-12 text-center">
	<div class="container-b flex flex-col">
		<div class="container-b-small mb-12 md:px-8">
			<div class="w-full relative opacity-75">
				<div
					style="background-image:url('/illustrations/foreground/squiggle.svg');"
					class="w-full bg-contain bg-repeat relative h-4 overflow-hidden"
				/>
				<div class="w-16 h-full bg-gradient-to-r from-c-bg to-c-bg/0 absolute left-0 top-0" />
				<div class="w-16 h-full bg-gradient-to-r from-c-bg/0 to-c-bg absolute right-0 top-0" />
			</div>
		</div>
		<div class="w-full flex flex-col items-center px-5">
			<h2 class="text-3xl font-bold">Wrapped Banano</h2>
			<p class="mt-3 text-lg container-b-small md:px-16 lg:px-24">
				Use Banano to learn about and participate in DeFi in a fun & easy way! Our monkeys take your
				Banano, wrap it with special ribbons and deliver it to other chains such as <a
					href="https://polygon.technology/"
					target="_blank"
					class="font-bold text-c-secondary hover:underline">Polygon</a
				>,
				<a
					href="https://www.bnbchain.world/en"
					target="_blank"
					class="font-bold text-c-secondary hover:underline">BNB Chain</a
				>, and
				<a
					href="https://fantom.foundation"
					target="_blank"
					class="font-bold text-c-secondary hover:underline">Fantom</a
				>. Visit
				<a
					href="{bananoServices.wBan.url}/?utm_source=banano.cc"
					target="_blank"
					class="font-bold text-c-secondary hover:underline">wrap.banano.cc</a
				> for more info.
			</p>
			<div class="container-b-smallest max-w-full flex flex-row flex-wrap justify-center mt-10">
				<img
					width="602"
					height="401"
					class="w-full"
					src="/illustrations/wban/wban-hero.svg"
					alt="wBAN Hero"
				/>
			</div>
			<Button
				type="secondary"
				padding="py-3.5 px-8 md:px-14"
				href="{bananoServices.wBan.url}/?utm_source=banano.cc"
				target="_blank"
				class="mt-10 w-full max-w-xxs">Start Wrapping</Button
			>
		</div>
		<div class="container-b-small mt-16 px-4 md:px-8">
			<div class="w-full relative opacity-75">
				<div
					style="background-image:url('/illustrations/foreground/squiggle.svg');"
					class="w-full bg-contain bg-repeat relative h-4 overflow-hidden"
				/>
				<div class="w-16 h-full bg-gradient-to-r from-c-bg to-c-bg/0 absolute left-0 top-0" />
				<div class="w-16 h-full bg-gradient-to-r from-c-bg/0 to-c-bg absolute right-0 top-0" />
			</div>
		</div>
	</div>
</div>
