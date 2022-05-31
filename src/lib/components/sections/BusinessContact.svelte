<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconSocial from '$lib/components/icons/IconSocial.svelte';
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';
	import { expandCollapse } from '$lib/ts/transitions';

	let form: { name: string; email: string; message: string } = { name: '', email: '', message: '' };
	let isFormOpen = false;
	let inputErrorName = false;
</script>

<div
	id="business-contact"
	class="container-b-small flex flex-col items-center justify-start -mt-8 pt-24 px-5 pb-4"
>
	<h2 class="text-3xl font-bold md:px-24 text-center">Business Contact</h2>
	<p class="mt-3 text-lg md:px-24 text-center">
		For business inquiries, you can click the button below and fill the form or reach out to us via
		<a
			target="_blank"
			href={bananoSocials.discord.url}
			class="font-bold text-c-secondary hover:underline">Discord</a
		>,
		<a
			target="_blank"
			href={bananoSocials.twitter.url}
			class="font-bold text-c-secondary hover:underline">Twitter</a
		>
		or
		<a
			target="_blank"
			href={bananoSocials.reddit.url}
			class="font-bold text-c-secondary hover:underline">Reddit</a
		>. For general questions, you can contact us via any of our social media accounts.
	</p>
	<Button onClick={() => (isFormOpen = !isFormOpen)} class="w-full max-w-[23rem] px-16 mt-6 mb-8">
		<IconSocial type="email" class="w-8 h-8 ml-3 absolute left-0" />
		{isFormOpen ? 'Close' : 'Contact Us'}
	</Button>
	{#if isFormOpen}
		<form
			transition:expandCollapse
			action="https://formspree.io/f/mvolllyn"
			method="POST"
			class="max-w-lg md:max-w-xl mx-auto bg-c-secondary/5 rounded-2xl 
			ring-3 ring-c-secondary/15 overflow-hidden relative z-0"
		>
			<div class="w-full flex flex-wrap p-1.5 md:p-4">
				<div class="w-full md:w-1/2 p-2 mt-1">
					<label for="business-name-input" class="w-full flex flex-col">
						<p class="px-2 text-lg font-medium">Business Name</p>
						<input
							bind:value={form.name}
							name="Business Name"
							id="business-name-input"
							class="w-full font-medium placeholder-c-on-bg/50 text-c-on-bg px-4 py-4.5 mt-2 rounded-xl
										border-[3px] bg-c-secondary/8 {inputErrorName
								? 'border-c-danger'
								: 'border-c-secondary/10 hover:border-c-secondary/40 focus:border-c-secondary'} transition"
							type="text"
							placeholder="Business name"
						/>
					</label>
				</div>
				<div class="w-full md:w-1/2 p-2 mt-1">
					<label for="business-email-input" class="w-full flex flex-col">
						<p class="px-2 text-lg font-medium">Business Email</p>
						<input
							bind:value={form.email}
							name="Business Email"
							id="business-email-input"
							class="w-full font-medium placeholder-c-on-bg/50 text-c-on-bg px-4 py-4.5 mt-2 rounded-xl
										border-[3px] bg-c-secondary/8 {inputErrorName
								? 'border-c-danger'
								: 'border-c-secondary/10 hover:border-c-secondary/40 focus:border-c-secondary'} transition"
							type="email"
							placeholder="Business email"
						/>
					</label>
				</div>
				<div class="w-full p-2 mt-1">
					<label for="business-message-input" class="w-full flex flex-col">
						<p class="px-2 text-lg font-medium">Message</p>
						<textarea
							bind:value={form.message}
							name="Message"
							id="business-message-input"
							class="w-full font-medium placeholder-c-on-bg/50 text-c-on-bg px-4 py-4.5 mt-2 rounded-xl
									border-[3px] bg-c-secondary/8 {inputErrorName
								? 'border-c-danger'
								: 'border-c-secondary/10 hover:border-c-secondary/40 focus:border-c-secondary'} transition"
							type="email"
							autocomplete="off"
							placeholder="Enter your message"
							rows="6"
						/>
					</label>
				</div>
				<div class="w-full p-2 my-2">
					<Button class="w-full" buttonType="secondary" type="submit">Send</Button>
				</div>
			</div>
		</form>
	{/if}
</div>
