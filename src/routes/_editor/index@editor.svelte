<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';

	let EditorJS: any;
	let Header: any;
	let editor: any;

	let saveTimeout: NodeJS.Timeout;
	const saveDelay = 1000;

	let data = {
		blocks: [
			{
				type: 'header',
				data: {
					text: 'This is a test',
					level: 1
				}
			},
			{
				type: 'paragraph',
				data: {
					text: "I'm testing something here."
				}
			}
		]
	};

	function setData() {
		editor.render(data);
	}

	function onKeypress() {
		clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			editor
				.save()
				.then((outputData: any) => {
					console.log('Article data: ', outputData);
				})
				.catch((error: any) => {
					console.log('Saving failed: ', error);
				});
		}, saveDelay);
	}

	async function getData() {
		let res = await fetch(
			'https://raw.githubusercontent.com/yekta/banano-website/master/content/announcements.md'
		);
		let text = await res.text();
	}

	onMount(async () => {
		Header = (await import('@editorjs/header' as any)).default;
		EditorJS = (await import('@editorjs/editorjs')).default;
		editor = new EditorJS({
			placeholder: 'Start writing by clicking on this text...',
			holderId: 'editorjs',
			inlineToolbar: ['link', 'bold', 'italic'],
			tools: {
				header: {
					inlineToolbar: ['link', 'italic'],
					class: Header,
					config: {
						placeholder: 'Enter a header',
						levels: [1, 2, 3, 4, 5, 6],
						defaultLevel: 1
					}
				}
			}
		});
		await getData();
	});
</script>

<svelte:window on:keypress={onKeypress} />
<div class="min-h-screen bg-c-bg flex flex-col py-12">
	<div class="w-[650px] max-w-full flex flex-row justify-start items-center mx-auto mb-8">
		<Button onClick={setData} padding="px-12 py-2">Fill</Button>
	</div>
	<div id="editorjs" />
</div>
