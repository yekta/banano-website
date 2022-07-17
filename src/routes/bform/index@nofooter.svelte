<script lang="ts">
	import '$lib/css/main.css';
	import { page } from '$app/stores';
	import { canonicalUrl } from '$lib/ts/constants/canonical';
	import { MetaTags } from 'svelte-meta-tags';
	import type { TFormQuestion, TFormQuestionSubmitResult } from '$lib/ts/types/TFormQuestion';
	import Form from '$lib/components/Form.svelte';
	import { isAddress } from '$lib/ts/helpers/banano';

	const title = 'BForm | Banano';
	const description = 'BForm';
	const canonical = `${canonicalUrl}${$page.url.pathname}`;
	const imageUrl = `${canonicalUrl}/previews${$page.url.pathname}.jpg`;

	let innerHeight: number;

	let questions: TFormQuestion[] = [
		{
			fieldName: 'b-id',
			question: 'What is your B?',
			placeholder: 'Enter your B here...',
			isValid: (value: string | undefined) =>
				value === undefined ? false : value.startsWith('a') && value.length < 65,
			pageElement: undefined,
			inputElement: undefined,
			inputError: false
		},
		{
			fieldName: 'address',
			question: 'What is your address?',
			placeholder: 'Enter your address here...',
			isValid: (value: string | undefined) => (value === undefined ? false : isAddress(value)),
			pageElement: undefined,
			inputElement: undefined,
			inputError: false
		}
	];

	async function submit() {
		const url = '/api/v1/bform/submit';
		let postBody = {
			bId: questions[0].inputElement?.value,
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
	<div class="w-full flex justify-center pt-24 pb-32 px-3 md:px-12 my-auto">
		<div
			class="w-full max-w-lg md:max-w-3xl bg-c-bg rounded-2xl md:rounded-3xl 
			shadow-button shadow-c-bg-secondary-shaded overflow-hidden relative z-0 transition"
		>
			<Form bind:questions {submit} />
		</div>
	</div>
</div>
