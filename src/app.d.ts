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

declare module '@bananocoin/bananojs';
declare module 'svelte-qr';
declare module '@tryghost/admin-api';
declare module '@sveltejs/svelte-virtual-list';

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onenter?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
		onexit?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
		oncopied?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
	}
}

interface PlausibleObj {
	callback?: function;
	props?: { [key: string]: string };
}

interface Window {
	plausible: (goalName: string, obj?: PlausibleObj) => void;
}
