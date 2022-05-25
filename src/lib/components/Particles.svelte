<script lang="ts">
	import { tick } from 'svelte';

	interface IParticle {
		startX: number;
		startY: number;
		endX: number;
		endY: number;
		scale: number;
		speed: number;
		distance: number;
		birth: number;
	}

	let particles: IParticle[];
	let containerWidth: number;
	let containerHeight: number;
	let context: any;

	const animDurationMultiplier = 13;

	let canvas: HTMLCanvasElement;

	let renderCanvas = false;
	$: if (containerWidth !== undefined && containerHeight !== undefined) {
		renderCanvas = true;
	}

	$: if (renderCanvas) startAnimating();

	let imgLoaded = false;
	let img: HTMLImageElement;

	async function startAnimating() {
		await tick();
		img = new Image();
		img.src = '/images/banana-for-particles.png';
		img.onload = () => {
			imgLoaded = true;
		};
		particles = Array.from(Array(40), (_, i) => {
			let randFlip = Math.round(Math.random());
			let randSpeedAndScale = Math.random();
			let x1: number;
			let y1: number;
			let x2: number;
			let y2: number;
			x1 = Math.random() * containerWidth;
			y1 = Math.random() * containerHeight;
			if (randFlip === 0) {
				x2 = Math.round(Math.random()) * containerWidth;
				y2 = Math.random() * containerHeight;
			} else {
				y2 = Math.round(Math.random()) * containerHeight;
				x2 = Math.random() * containerWidth;
			}
			let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
			return {
				startX: x1,
				startY: y1,
				endX: x2,
				endY: y2,
				scale: randSpeedAndScale * 0.5 + 0.1,
				speed: 1,
				distance: distance,
				birth: Date.now()
			};
		});
	}
	$: if (imgLoaded) init();

	function init() {
		context = canvas.getContext('2d');
		window.requestAnimationFrame(draw);
	}

	function createNewParticle(): IParticle {
		let randFlip = Math.round(Math.random());
		let randSpeedAndScale = Math.random();
		let x1: number;
		let y1: number;
		let x2: number;
		let y2: number;
		if (randFlip === 0) {
			x1 = Math.round(Math.random()) * containerWidth;
			x2 = containerWidth - x1;
			y1 = Math.random() * containerHeight;
			y2 = Math.random() * containerHeight;
		} else {
			y1 = Math.round(Math.random()) * containerHeight;
			y2 = containerHeight - y1;
			x1 = Math.random() * containerWidth;
			x2 = Math.random() * containerWidth;
		}
		let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		return {
			startX: x1,
			startY: y1,
			endX: x2,
			endY: y2,
			scale: randSpeedAndScale * 0.5 + 0.1,
			speed: 1,
			distance: distance,
			birth: Date.now()
		};
	}

	function draw() {
		context?.clearRect(
			-0.5 * containerWidth,
			-0.5 * containerHeight,
			containerWidth * 2,
			containerHeight * 2
		);
		for (let i = 0; i < particles.length; i++) {
			let particle = particles[i];
			let milliseconds = Date.now();
			let diff = milliseconds - particle.birth;
			let duration = (particle.distance / particle.speed) * animDurationMultiplier;
			let currentX = particle.startX + (particle.endX - particle.startX) * (diff / duration);
			let currentY = particle.startY + (particle.endY - particle.startY) * (diff / duration);
			if (currentX < 0 || currentX > containerWidth || currentY < 0 || currentY > containerHeight) {
				particles.splice(i, 1);
				particles.push(createNewParticle());
			} else {
				context?.drawImage(
					img,
					0,
					0,
					img.width,
					img.height,
					currentX,
					currentY,
					img.width * particle.scale,
					img.height * particle.scale
				);
			}
		}
		window.requestAnimationFrame(draw);
	}
</script>

<div
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
	class="w-full h-full absolute left-0 top-0 overflow-hidden"
>
	{#if renderCanvas}
		<canvas bind:this={canvas} width={containerWidth} height={containerHeight} />
	{/if}
</div>
