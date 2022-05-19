<script lang="ts">
	import edjsHTML from 'editorjs-html';
	import showdown from 'showdown';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	let EditorJS: any;
	let Header: any;
	let editor: any = undefined;
	let edjsHTMLParser: any;
	let showdownConverter: any;

	let saveTimeout: NodeJS.Timeout;
	const saveDelay = 1000;

	function onKeypress() {
		clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			editor
				.save()
				.then((outputData: any) => {
					console.log('Saved');
				})
				.catch((error: any) => {
					console.log('Saving failed: ', error);
				});
		}, saveDelay);
	}

	function logMarkdown() {
		editor
			.save()
			.then((outputData: any) => {
				let html = edjsHTMLParser.parse(outputData).join('');
				let markdown: any[] = showdownConverter.makeMarkdown(html);
				console.log('Markdown Output', markdown);
			})
			.catch((error: Error) => {
				console.log('Saving failed: ', error);
			});
	}

	async function setup() {
		edjsHTMLParser = edjsHTML();
		showdownConverter = new showdown.Converter();
		let [resHtml, editor] = await Promise.all([getData(), loadEditor()]);
		editor.blocks.renderFromHTML(resHtml);
	}

	async function getData() {
		let res = await fetch(
			'https://raw.githubusercontent.com/yekta/banano-website/master/content/announcements.md'
		);
		let text = await res.text();
		let resHtml = showdownConverter.makeHtml(text);
		return resHtml;
	}

	async function loadEditor() {
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
		await editor.isReady;
		return editor;
	}

	onMount(async () => {
		setup();
	});
</script>

<svelte:window on:keypress={onKeypress} />
<div class="min-h-screen bg-c-bg flex flex-col py-12">
	<div class="flex flex-row items-center justify-center mb-6">
		<Button onClick={logMarkdown}>Log Markdown</Button>
	</div>
	<div id="editorjs" />
</div>
