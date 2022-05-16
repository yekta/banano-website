<script lang="ts">
	const testimonials: string[] = [
		'Went all-in with bananos and now I got my own plantation 🍌🍌🍌 A true dream come true!',
		'Mumble mumble genesis block mumble mumble rene exitscam 👀',
		'HALP! I, need, more, Bananos! Addicted. Feelsgoodman 😎',
		'Sold my house & took a second mortgage (neighbours house) to buy more bananos. WTB 💰',
		'Banano saved our marriage! 👰🤵',
		"I didn't let my memes become dreams 😏"
	];
</script>

<div
	id="testimonials"
	class="w-full bg-testimonials bg-c-secondary flex justify-center pt-16 pb-24 text-center text-c-bg"
>
	<div class="container-b-small flex flex-col items-center px-4">
		<h2 class="text-3xl font-bold">Testimonials</h2>
		<div class="w-full flex flex-wrap justify-center">
			{#each testimonials as testimonial}
				<div class="w-full md:w-1/2 mt-5 p-3">
					<div
						class="w-full chat-bubble bg-c-secondary filter brightness-110 shadow-card shadow-c-on-bg/6
						rounded-tl-xl rounded-tr-xl rounded-br-xl flex flex-col items-center text-center px-10 py-5"
					>
						<p>“{testimonial}”</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.bg-testimonials {
		background-image: url('/illustrations/backgrounds/bg-testimonials.svg');
		background-size: cover;
		background-position: 100% 100%;
		background-repeat: no-repeat;
	}

	.chat-bubble:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 0;
		border: 25px solid transparent;
		border-top-color: rgb(var(--c-secondary));
		border-bottom: 0;
		border-left: 0;
		margin-bottom: -20px;
	}
</style>
