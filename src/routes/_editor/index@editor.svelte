<script lang="ts">
	import { onMount } from 'svelte';
	import { remark } from 'remark';
	import remarkHtml from 'remark-html';

	let EditorJS: any;
	let Header: any;
	let editor: any = undefined;
	let html: string;
	let isEditorShowing = false;

	let saveTimeout: NodeJS.Timeout;
	const saveDelay = 1000;

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

	async function setup() {
		let [resHtml, editor] = await Promise.all([getData(), loadEditor()]);
		editor.blocks.renderFromHTML(resHtml);
	}

	async function getData() {
		let res = await fetch(
			'https://raw.githubusercontent.com/yekta/banano-website/master/content/team.md'
		);
		let text = await res.text();
		let resHtml = await remark()
			.use(remarkHtml)
			.process(text)
			.then((file) => {
				return String(file);
			});
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
	<div id="editorjs" />
</div>
