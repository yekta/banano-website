<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconSocial from '$lib/components/icons/IconSocial.svelte';
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';
	import { isEmail } from '$lib/ts/helpers/isEmail';
	import type {
		TFormQuestion,
		TFormQuestionSubmitResult,
		TFormSuccessMessage
	} from '$lib/ts/types/TForm';
	import Form from '../Form.svelte';

	let isFormOpen = false;

	let questions: TFormQuestion[] = [
		{
			fieldName: 'business-name',
			question: 'What is the name of your business?',
			placeholder: 'Enter the name here...',
			isValid: (value: string | undefined) =>
				value === undefined
					? false
					: typeof value === 'string' && value.length > 0 && value.length < 100,
			pageElement: undefined,
			inputElement: undefined,
			inputError: false
		},
		{
			fieldName: 'business-email',
			question: 'What is your business email?',
			placeholder: 'Enter the email here...',
			isValid: (value: string | undefined) => (value === undefined ? false : isEmail(value)),
			pageElement: undefined,
			inputElement: undefined,
			inputError: false
		},
		{
			fieldName: 'business-message',
			question: 'What is your inquiry?',
			placeholder: 'Enter your message here...',
			isValid: (value: string | undefined) =>
				value === undefined
					? false
					: typeof value === 'string' && value.length > 0 && value.length < 1000,
			pageElement: undefined,
			inputElement: undefined,
			inputError: false,
			inputElementType: 'textarea'
		}
	];

	async function submit() {
		const url = '/api/v1/business-form/submit';
		let postBody = {
			businessName: questions[0].inputElement?.value,
			businessEmail: questions[1].inputElement?.value,
			message: questions[2].inputElement?.value
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

	const successMessage: TFormSuccessMessage = {
		title: 'We got your inquiry!',
		paragraph: "We'll be in touch..."
	};

	let maxHeight: number | undefined;
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
		{isFormOpen ? 'Close' : 'Contact Form'}
	</Button>
	<div class="w-full md:px-8 flex justify-center">
		<div
			style="height:{isFormOpen ? maxHeight : 0}px"
			class="w-full max-w-xl md:max-w-3xl relative z-0 rounded-2xl overflow-hidden bg-c-bg-secondary 
			shadow-button shadow-c-bg-secondary-shaded transition-all duration-250"
		>
			<Form bind:questions {submit} {successMessage} bind:maxHeight isRepeatable={true} />
		</div>
	</div>
</div>
