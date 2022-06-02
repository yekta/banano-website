<script lang="ts">
	export let testimonials: string[];
</script>

<div id="testimonials" class="w-full pt-8">
	<div
		style="background-image:url('/illustrations/backgrounds/bg-testimonials.svg');"
		class="w-full bg-c-secondary flex justify-center pt-16 pb-24 text-center text-c-bg"
	>
		<div class="container-b-small flex flex-col items-center px-5 md:px-8">
			<h2 class="text-3xl font-bold">Testimonials</h2>
			<div class="w-full flex flex-wrap justify-center">
				{#each testimonials as testimonial}
					<div class="w-full max-w-md md:w-1/2 md:max-w-full mt-5 py-3 md:px-3">
						<div class="w-full relative flex flex-col items-center text-center px-10 py-5">
							<div
								class="w-full h-full absolute left-0 top-0 chat-bubble bg-c-secondary shadow-card 
								shadow-c-on-bg/10 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl filter brightness-125"
							/>
							<p class="relative">“{testimonial}”</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
