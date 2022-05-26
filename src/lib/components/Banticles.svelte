<script lang="ts">
	import inView from '$lib/ts/actions/inView';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let particleSrc: string;
	export let lineColorRgb: IRgb;
	export const density = 0.13;
	export const lineOpacity = 0.5;
	export const lineConnectionThreshold = 400;
	export const animDurationMultiplier = 15;
	export const particleScaleMin = 0.1;
	export const particleScaleMax = 0.7;

	interface IRgb {
		r: number;
		g: number;
		b: number;
	}

	interface IParticle {
		startX: number;
		startY: number;
		endX: number;
		endY: number;
		currentX: number;
		currentY: number;
		speed: number;
		distance: number;
		birth: number;
		duration: number;
		scaledSize: number;
	}

	let particles: IParticle[];
	let containerWidth: number;
	let containerHeight: number;
	let containerArea: number;
	let context: any;
	let canvas: HTMLCanvasElement;
	let mouseX: number;
	let mouseY: number;
	let isBanticlesPaused = false;
	let { r, g, b } = lineColorRgb;
	let particleCount: number;
	let particleArea: number;

	let img: HTMLImageElement;
	let imgLoaded = false;
	let dpr: number;

	$: if (containerHeight !== undefined && containerWidth !== undefined)
		containerArea = containerHeight * containerWidth;
	$: if (containerArea !== undefined && particleArea !== undefined) setParticleCount();
	$: if (imgLoaded && canvas !== undefined) init();

	function init() {
		context = canvas.getContext('2d');
		dpr = Math.max(Math.min(window.devicePixelRatio, 2), 1);
		canvas.width = containerWidth * dpr;
		canvas.height = containerHeight * dpr;
		context.scale(dpr, dpr);
		canvas.style.width = containerWidth + 'px';
		canvas.style.height = containerHeight + 'px';
		window.requestAnimationFrame(draw);
	}

	function createNewParticle(isInitial = false): IParticle {
		const randFlip = Math.round(Math.random());
		const randSpeedAndScale = Math.random();
		let x1: number;
		let y1: number;
		let x2: number;
		let y2: number;
		if (isInitial) {
			x1 = randomizedX();
			y1 = randomizedY();
			if (randFlip === 0) {
				x2 = Math.random() > 0.5 ? maxX() : minX();
				y2 = randomizedY();
			} else {
				y2 = Math.random() > 0.5 ? maxY() : minY();
				x2 = randomizedX();
			}
		} else {
			if (randFlip === 0) {
				x1 = Math.random() > 0.5 ? maxX() : minX();
				x2 = maxX() - x1;
				y1 = randomizedY();
				y2 = randomizedY();
			} else {
				y1 = Math.random() > 0.5 ? maxY() : minY();
				y2 = maxY() - y1;
				x1 = randomizedX();
				x2 = randomizedX();
			}
		}

		const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		const scale = particleScaleMin + randSpeedAndScale * (particleScaleMax - particleScaleMin);
		const speed = 1;

		return {
			startX: x1,
			startY: y1,
			endX: x2,
			endY: y2,
			currentX: x1,
			currentY: y1,
			scaledSize: scale * img.width,
			speed: speed,
			distance: distance,
			birth: Date.now(),
			duration: (distance / speed) * animDurationMultiplier
		};
	}

	function draw() {
		if (containerHeight > canvas.height / dpr || containerWidth > canvas.width / dpr) {
			init();
			return;
		}
		context?.clearRect(
			-0.5 * canvas.width,
			-0.5 * canvas.height,
			canvas.width * 2,
			canvas.height * 2
		);
		const now = Date.now();
		for (let i = 0; i < particles.length; i++) {
			const particle = particles[i];
			const diff = now - particle.birth;
			const currentX =
				particle.startX + (particle.endX - particle.startX) * (diff / particle.duration);
			const currentY =
				particle.startY + (particle.endY - particle.startY) * (diff / particle.duration);
			if (currentX < minX() || currentX > maxX() || currentY < minY() || currentY > maxY()) {
				particles.splice(i, 1);
			} else {
				context?.drawImage(
					img,
					0,
					0,
					img.width,
					img.height,
					currentX,
					currentY,
					particle.scaledSize,
					particle.scaledSize
				);
				const halfSize = particle.scaledSize / 2;
				if (isMouseInsideCanvas()) {
					const distance = Math.sqrt(
						Math.pow(currentX - mouseX, 2) + Math.pow(currentY - mouseY, 2)
					);
					const opacity = 1 - distance / lineConnectionThreshold;
					drawLine(currentX + halfSize, currentY + halfSize, mouseX, mouseY, opacity);
				}
				for (let y = i; y > 0; y--) {
					const otherParticle = particles[y];
					const distance = Math.sqrt(
						Math.pow(currentX - otherParticle.currentX, 2) +
							Math.pow(currentY - otherParticle.currentY, 2)
					);
					if (distance < lineConnectionThreshold) {
						const opacity = lineOpacity - distance / lineConnectionThreshold;
						const halfSizeOther = otherParticle.scaledSize / 2;
						drawLine(
							currentX + halfSize,
							currentY + halfSize,
							otherParticle.currentX + halfSizeOther,
							otherParticle.currentY + halfSizeOther,
							opacity
						);
					}
				}
			}
			particle.currentX = currentX;
			particle.currentY = currentY;
		}
		const countDiff = particleCount - particles.length;
		if (countDiff > 0) {
			for (let j = 0; j < countDiff; j++) {
				particles.push(createNewParticle());
			}
		}
		if (!isBanticlesPaused) window.requestAnimationFrame(draw);
	}

	const drawLine = (x1: number, y1: number, x2: number, y2: number, opacity: number) => {
		context?.beginPath();
		context?.moveTo(x1, y1);
		context?.lineTo(x2, y2);
		context.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
		context?.stroke();
	};

	const handleMouseMove = (e: MouseEvent) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	};

	const minX = () => -1 * img.naturalWidth;
	const maxX = () => containerWidth + img.naturalWidth;
	const minY = () => -1 * img.naturalHeight;
	const maxY = () => containerHeight + img.naturalHeight;

	const randomizedX = () => random(minX(), maxX());
	const randomizedY = () => random(minY(), maxY());

	const random = (min: number, max: number) => Math.random() * (max - min) + min;

	const isMouseInsideCanvas = () => {
		let rect = canvas.getBoundingClientRect();
		let { left, top, width, height } = rect;
		return mouseX > left && mouseX < left + width && mouseY > top && mouseY < top + height;
	};

	const onEnter = () => {
		if (isBanticlesPaused) {
			isBanticlesPaused = false;
			window.requestAnimationFrame(draw);
		}
	};
	const onExit = () => (isBanticlesPaused = true);

	const setParticleCount = () =>
		(particleCount = Math.ceil((containerArea / particleArea) * density));

	onMount(() => {
		img = new Image();
		img.src = particleSrc;
		img.onload = () => {
			imgLoaded = true;
			particleArea = img.naturalWidth * img.naturalHeight;
			containerArea = containerHeight * containerWidth;
			setParticleCount();
			particles = Array.from(Array(particleCount), (_, i) => createNewParticle(true));
		};
	});
</script>

<svelte:window on:mousemove={handleMouseMove} />
<div
	use:inView
	on:enter={onEnter}
	on:exit={onExit}
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
	class="w-full h-full absolute left-0 top-0 overflow-hidden z-0"
>
	{#if containerWidth !== undefined && containerHeight !== undefined}
		<canvas in:fade={{ duration: 300 }} bind:this={canvas} />
	{/if}
</div>
