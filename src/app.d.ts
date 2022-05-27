/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare module '*.md' {
	const render: () => { html: string };
}

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onenter?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
		onexit?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
	}
}

interface Window {
	mozRequestAnimationFrame: any;
	webkitRequestAnimationFrame: any;
	msRequestAnimationFrame: any;
	plausible: (str: string) => void;
}
