import { cubicOut, cubicIn, quadOut } from 'svelte/easing';

export const menu = (node: Node, { delay = 0, duration = 300, easing = cubicOut }) => {
	return {
		delay,
		duration,
		easing,
		css: (t: number) => {
			return `transform: translateX(${100 - t * 100}%);opacity: ${t}`;
		}
	};
};
export const dropdown = (node: Node, { delay = 0, duration = 300 }) => {
	return {
		delay,
		duration,
		easing: cubicOut,
		css: (t: number) => {
			const translateYMaxRem = -1;
			return `transform: scale(${t / 2 + 0.5}) translateY(${
				translateYMaxRem + t * translateYMaxRem * -1
			}rem);opacity: ${t}`;
		}
	};
};

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
