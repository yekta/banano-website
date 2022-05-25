<script lang="ts">
	import { tick } from 'svelte';

	const particles = Array.from(Array(50).keys());
	let containerWidth: number;
	let containerHeight: number;

	let canvas: HTMLCanvasElement;

	const multiplier = 2;

	function getTop() {
		return Math.random() * containerHeight * multiplier;
	}

	function getLeft() {
		return Math.random() * containerWidth * multiplier;
	}

	function getScale() {
		return Math.random() * 0.6 + 0.5;
	}

	let renderCanvas = false;
	$: if (containerWidth !== undefined && containerHeight !== undefined) renderCanvas = true;

	$: if (renderCanvas) startAnimating();

	async function startAnimating() {
		await tick();
		let context = canvas.getContext('2d');
		const img = new Image();
		img.src = '/images/banana-for-particles.png';
		img.onload = () => {
			for (let i = 0; i < particles.length; i++) {
				let top = getTop();
				let left = getLeft();
				let scale = getScale();
				context?.drawImage(
					img,
					0,
					0,
					img.width,
					img.height,
					left,
					top,
					img.width * scale,
					img.height * scale
				);
			}
		};
	}
</script>

<div
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
	class="w-full h-full absolute left-0 top-0 overflow-hidden"
>
	{#if renderCanvas}
		<canvas
			bind:this={canvas}
			width={containerWidth * multiplier}
			height={containerHeight * multiplier}
			class="transform origin-top-left scale-50"
		/>
	{/if}
</div>
