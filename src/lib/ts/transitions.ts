import { cubicOut, cubicIn, linear, quadOut } from 'svelte/easing';

export const paperWalletIn = (
	node: Node,
	{ delay = 0, easing = quadOut, duration = 300, y = 0 }
) => {
	return {
		delay,
		duration,
		easing,
		css: (t: number) => {
			return `transform: translateY(-${(1 - t) * 100}%); tranform-origin: top;`;
		}
	};
};

interface IExpandCollapseOptions {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	y?: number;
	durationMultiplier?: number;
}

export const expandCollapse = (node: Node, options?: IExpandCollapseOptions) => {
	const delay = options?.delay || 0;
	const duration = options?.duration;
	const easing = options?.easing || cubicOut;
	const y = options?.y;
	const durationMultiplier = options?.durationMultiplier || 1;
	let height = Number(getComputedStyle(node as HTMLElement).height.split('px')[0]);
	const durationCalculated = Math.min(Math.round(height / 2 + 175), 300);
	return {
		delay,
		duration: duration ?? durationCalculated * durationMultiplier,
		easing,
		css: (t: number) => {
			return `height: ${t * height}px; transform: translateY(${
				y ?? 0 * (1 - t)
			}rem); tranform-origin: top;`;
		}
	};
};

interface TSlideAcrossScreenOptions {
	delay?: number;
	easing?: (t: number) => number;
}

export const slideAcrossScreen = (node: Node, options?: TSlideAcrossScreenOptions) => {
	const delay = options?.delay ?? 0;
	const easing = options?.easing ?? linear;
	let width = Number(getComputedStyle(node as HTMLElement).width.split('px')[0]);
	let windowWidth = window.innerWidth;
	let duration = ((windowWidth + 2 * width) / width) * 450;
	return {
		delay,
		duration,
		easing,
		css: (t: number) => {
			return `transform: translateX(${-1 * width + t * (windowWidth + width * 2)}px);`;
		}
	};
};

export const sidebar = (node: Node, { delay = 0, duration = 300, easing = cubicOut }) => {
	return {
		delay,
		duration,
		easing,
		css: (t: number) => {
			return `transform: translateX(${100 - t * 100}%);opacity: ${t}`;
		}
	};
};

interface TPropsDelayAndDuration {
	delay?: number;
	duration?: number;
}

export const dropdown = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 300;
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

export const monkeyLoadingIn = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 200;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: scale(${eased});opacity: ${(eased * 1) / 2 + 0.5}`;
		}
	};
};

export const formIn = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 300;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: scale(${eased}); opacity: ${eased}`;
		}
	};
};

export const formOut = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 300;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicIn(t);
			return `transform: scale(${eased}); opacity: ${eased}`;
		}
	};
};

export const curtainIn = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 750;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: translateY(${2 * (eased * 100) - 100}%)`;
		}
	};
};

export const againIn = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 400;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: translateY(${6 - 6 * eased}rem);`;
		}
	};
};

export const againOut = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 400;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicIn(t);
			return `transform: translateY(${5 - 5 * eased}rem);`;
		}
	};
};

export const monkeyContainerIn = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 700;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: translateY(${20 * eased - 20}%);`;
		}
	};
};

export const monkeyContainerOut = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 600;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicIn(t);
			return `transform: translateY(${100 * eased - 100}%); opacity: ${eased}`;
		}
	};
};

export const modalIn = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 200;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicOut(t);
			return `transform: scale(${t / 2 + 0.5}); opacity: ${eased}`;
		}
	};
};

export const modalOut = (node: Node, props?: TPropsDelayAndDuration) => {
	const delay = props?.delay || 0;
	const duration = props?.duration || 200;
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = cubicIn(t);
			return `transform: scale(${t / 2 + 0.5}); opacity: ${eased}`;
		}
	};
};
