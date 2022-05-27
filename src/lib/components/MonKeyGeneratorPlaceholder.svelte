<div class="relative w-full max-w-[32rem] p-2">
	<div class="relative monkey-generator-container w-full">
		<!-- Ring animation -->
		<div class="a-ring a-ring-0 w-full h-full rounded-2xl absolute left-0 top-0 bg-c-secondary" />
		<div class="a-ring a-ring-1 w-full h-full rounded-2xl absolute left-0 top-0 bg-c-primary" />
		<div class="a-ring a-ring-2 w-full h-full rounded-2xl absolute left-0 top-0 bg-c-secondary" />
		<div class="a-ring a-ring-3 w-full h-full rounded-2xl absolute left-0 top-0 bg-c-primary" />
		<div class="w-full h-full bg-c-bg absolute left-0 top-0 rounded-2xl" />
	</div>
</div>

<style>
	.monkey-generator-container:after {
		content: '';
		display: block;
		padding-bottom: calc(100% + 4rem);
	}
	.a-ring-0 {
		animation-delay: -1.2s;
	}
	.a-ring-1 {
		animation-delay: -0.8s;
	}
	.a-ring-2 {
		animation-delay: -0.4s;
	}
	.a-ring-3 {
		animation-delay: 0s;
	}
	.a-ring {
		transform: translate(-0.5rem, 0.5rem);
		animation-name: ring-animation;
		animation-duration: 1.6s;
		animation-timing-function: cubic-bezier(0.5, 1, 0.89, 1);
		animation-iteration-count: infinite;
	}
	@keyframes ring-animation {
		0% {
			transform: translate(-0.5rem, 0.5rem);
		}
		25% {
			transform: translate(-0.5rem, -0.5rem);
		}
		50% {
			transform: translate(0.5rem, -0.5rem);
		}
		75% {
			transform: translate(0.5rem, 0.5rem);
		}
		100% {
			transform: translate(-0.5rem, 0.5rem);
		}
	}
</style>
