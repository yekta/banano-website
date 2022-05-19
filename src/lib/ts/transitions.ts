import { cubicOut, cubicIn } from 'svelte/easing';

export const monkeyLoadingIn = (node: Node, { delay = 0, duration = 200 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: scale(${eased});opacity: ${(eased * 1) / 2 + 0.5}`;
		}
	};
};

export const formIn = (node: Node, { delay = 0, duration = 300 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: scale(${eased}); opacity: ${eased}`;
		}
	};
};

export const formOut = (node: Node, { delay = 0, duration = 300 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicIn(t);
			return `transform: scale(${eased}); opacity: ${eased}`;
		}
	};
};

export const curtainIn = (node: Node, { delay = 0, duration = 750 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: translateY(${2 * (eased * 100) - 100}%)`;
		}
	};
};

export const againIn = (node: Node, { delay = 0, duration = 400 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: translateY(${6 - 6 * eased}rem);`;
		}
	};
};

export const againOut = (node: Node, { delay = 0, duration = 400 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicIn(t);
			return `transform: translateY(${5 - 5 * eased}rem);`;
		}
	};
};

export const monkeyContainerIn = (node: Node, { delay = 0, duration = 700 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: translateY(${20 * eased - 20}%);`;
		}
	};
};

export const monkeyContainerOut = (node: Node, { delay = 0, duration = 600 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicIn(t);
			return `transform: translateY(${100 * eased - 100}%); opacity: ${eased}`;
		}
	};
};

export const modalIn = (node: Node, { delay = 0, duration = 200 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: scale(${t / 2 + 0.5}); opacity: ${eased}`;
		}
	};
};

export const modalOut = (node: Node, { delay = 0, duration = 200 }) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicIn(t);
			return `transform: scale(${t / 2 + 0.5}); opacity: ${eased}`;
		}
	};
};
