<script lang="ts">
	import '$lib/css/main.css';
	import { page } from '$app/stores';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import type { TFormQuestion, TFormQuestionSubmitResult } from '$lib/ts/types/TForm';
	import Form from '$lib/components/Form.svelte';
	import { onMount } from 'svelte';

	const title = 'XGo Form | Banano';
	const description = 'Form for XGo.';
	const canonical = `${canonicalUrl}${$page.url.pathname}`;
	const imageUrl = `${canonicalUrl}/previews${$page.url.pathname}.jpg`;

	let innerHeight: number;
	let isAddress: (address: string) => boolean;

	let questions: TFormQuestion[] = [
		{
			fieldName: 'xgo-id',
			question: 'What is your XGo ID?',
			placeholder: 'Enter your ID here...',
			isValid: (value: string | undefined) => (value === undefined ? false : value.length < 100),
			pageElement: undefined,
			inputElement: undefined,
			inputError: false
		},
		{
			fieldName: 'address',
			question: 'What is the Banano address associated with your XGo account?',
			placeholder: 'Enter the address here...',
			isValid: (value: string | undefined) => (value === undefined ? false : isAddress(value)),
			pageElement: undefined,
			inputElement: undefined,
			inputError: false
		}
	];

	async function submit() {
		const url = '/api/v1/xgo-form/submit';
		let postBody = {
			xgoId: questions[0].inputElement?.value,
			address: questions[1].inputElement?.value
		};
		let res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postBody)
		});
		let { data, error } = await res.json();
		let ret: TFormQuestionSubmitResult = {
			data,
			error
		};
		return ret;
	}

	onMount(async () => {
		let { getBananoAccountValidationInfo } = await import('@bananocoin/bananojs');
		isAddress = (str) => getBananoAccountValidationInfo(str).valid;
	});
</script>

<MetaTags
	{title}
	{description}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title: title,
		description: description,
		images: [
			{
				url: imageUrl,
				width: 1200,
				height: 630
			}
		]
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: title,
		description: description,
		image: imageUrl
	}}
/>

<svelte:window bind:innerHeight />
<div
	style="background-image:url('/illustrations/backgrounds/bg-hero.svg'); min-height: {innerHeight ===
	undefined
		? '100vh'
		: innerHeight + 'px'};"
	class="w-full bg-cover bg-c-secondary flex flex-col items-center justify-start text-center"
>
	<div
		style="background:linear-gradient(0deg, rgb(17,51,13, 0) 50%, rgba(17,51,13, 0.3) 100%);"
		class="w-full h-full absolute left-0 top-0 pointer-events-none"
	/>
	<div class="w-full flex justify-center pt-24 pb-32 px-3 md:px-12 my-auto relative">
		<div
			class="w-full max-w-lg md:max-w-3xl bg-c-bg rounded-2xl md:rounded-3xl 
			shadow-button shadow-c-bg-secondary-shaded overflow-hidden relative z-0 transition"
		>
			<Form bind:questions {submit} />
		</div>
	</div>
</div>
