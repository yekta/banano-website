import { browser } from '$app/environment';
import { readable } from 'svelte/store';

let _isTouchscreen = false;

export const isTouchscreen = readable<boolean>(_isTouchscreen, (set) => {
	let lastTouchTime = 0;

	if (browser) {
		document?.body.addEventListener('touchstart', handleTouch);
		document?.body.addEventListener('mousemove', disableTouch);
	}

	function handleTouch() {
		if (!_isTouchscreen) {
			lastTouchTime = Date.now();
			_isTouchscreen = true;
			set(_isTouchscreen);
		}
	}

	function disableTouch() {
		if (Date.now() - lastTouchTime < 1000) return;
		if (_isTouchscreen) {
			_isTouchscreen = false;
			set(_isTouchscreen);
		}
	}

	return () => {
		if (browser) {
			document?.body.removeEventListener('touchstart', handleTouch);
			document?.body.removeEventListener('mousemove', disableTouch);
		}
	};
});
