<script lang="ts">
	import inView from '$lib/ts/actions/inView';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let density = 0.13;
	export let lineOpacity = 0.5;
	export let lineConnectionThreshold = 300;
	export let animDurationMultiplier = 15;
	export let particleSrc: string;
	export let lineColorRgb: IRgb;

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
	let context: any;
	let canvas: HTMLCanvasElement;
	let mouseX: number;
	let mouseY: number;
	let isBanticlesPaused = false;
	let { r, g, b } = lineColorRgb;
	let particleCount: number;

	let img: HTMLImageElement;
	let imgLoaded = false;
	let dpr: number;

	$: if (imgLoaded && canvas) init();

	function init() {
		context = canvas.getContext('2d');
		dpr = window.devicePixelRatio;
		if (dpr > 1) {
			canvas.width = containerWidth * dpr;
			canvas.height = containerHeight * dpr;
			canvas.style.width = containerWidth + 'px';
			canvas.style.height = containerHeight + 'px';
			context.scale(dpr, dpr);
		} else {
			canvas.width = containerWidth;
			canvas.height = containerHeight;
		}
		window.requestAnimationFrame(draw);
	}

	function createNewParticle(isInitial = false): IParticle {
		let randFlip = Math.round(Math.random());
		let randSpeedAndScale = Math.random();
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
		const speed = 1;
		const scale = randSpeedAndScale * 0.6 + 0.1;

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
		particleCount = calculateParticleCount();
		context?.clearRect(
			-0.5 * canvas.width,
			-0.5 * canvas.height,
			canvas.width * 2,
			canvas.height * 2
		);
		let milliseconds = Date.now();
		for (let i = 0; i < particles.length; i++) {
			let particle = particles[i];
			let diff = milliseconds - particle.birth;
			let currentX =
				particle.startX + (particle.endX - particle.startX) * (diff / particle.duration);
			let currentY =
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
				particle.currentX = currentX;
				particle.currentY = currentY;
				let halfSize = particle.scaledSize / 2;
				if (isMouseInsideCanvas()) {
					let distance = Math.sqrt(Math.pow(currentX - mouseX, 2) + Math.pow(currentY - mouseY, 2));
					let opacity = 1 - distance / lineConnectionThreshold;
					drawLine(currentX + halfSize, currentY + halfSize, mouseX, mouseY, opacity);
				}
				for (let y = i; y > 0; y--) {
					let otherParticle = particles[y];
					let distance = Math.sqrt(
						Math.pow(currentX - otherParticle.currentX, 2) +
							Math.pow(currentY - otherParticle.currentY, 2)
					);
					if (distance < lineConnectionThreshold) {
						let opacity = lineOpacity - distance / lineConnectionThreshold;
						let halfSizeOther = otherParticle.scaledSize / 2;
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
			while (particles.length < particleCount) {
				particles.push(createNewParticle());
			}
		}
		if (!isBanticlesPaused) window.requestAnimationFrame(draw);
	}

	function drawLine(x1: number, y1: number, x2: number, y2: number, opacity: number) {
		context?.beginPath();
		context?.moveTo(x1, y1);
		context?.lineTo(x2, y2);
		context.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
		context?.stroke();
	}

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}

	const minX = () => -1 * img.width;
	const maxX = () => containerWidth + img.width;
	const minY = () => -1 * img.height;
	const maxY = () => containerHeight + img.height;

	const randomizedX = () => random(minX(), maxX());
	const randomizedY = () => random(minY(), maxY());

	const random = (min: number, max: number) => Math.random() * (max - min) + min;

	const isMouseInsideCanvas = () => {
		let rect = canvas.getBoundingClientRect();
		let { left, top, width, height } = rect;
		return mouseX > left && mouseX < left + width && mouseY > top && mouseY < top + height;
	};

	const calculateParticleCount = () => {
		let area = containerWidth * containerHeight;
		let particleArea = img.width * img.height;
		return Math.ceil((area / particleArea) * density);
	};

	onMount(() => {
		img = new Image();
		img.src = particleSrc;
		img.onload = () => {
			imgLoaded = true;
			particleCount = calculateParticleCount();
			particles = Array.from(Array(particleCount), (_, i) => createNewParticle(true));
		};
	});
</script>

<svelte:window on:mousemove={handleMouseMove} />
<div
	use:inView
	on:enter={() => {
		if (isBanticlesPaused) {
			isBanticlesPaused = false;
			window.requestAnimationFrame(draw);
		}
	}}
	on:exit={() => (isBanticlesPaused = true)}
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
	class="w-full h-full absolute left-0 top-0 overflow-hidden"
>
	{#if containerWidth !== undefined && containerHeight !== undefined}
		<canvas in:fade={{ duration: 300 }} bind:this={canvas} />
	{/if}
</div>
