<script lang="ts">
	export let testimonials: string[];
</script>

<div id="testimonials" class="w-full pt-8">
	<div
		style="background-image:url('/illustrations/backgrounds/bg-testimonials.svg');"
		class="w-full bg-c-secondary flex justify-center pt-16 pb-24 text-center text-c-bg"
	>
		<div class="container-b-small flex flex-col items-center px-5 md:px-12">
			<h2 class="text-3xl font-bold">Testimonials</h2>
			<div class="w-full flex flex-wrap justify-center items-start -mt-3">
				{#each testimonials as testimonial}
					<div
						class="w-full max-w-md md:max-w-lg md:w-[calc(50%-1.5rem)] md:mx-3 mt-11 relative px-5 md:px-7 py-5"
					>
						<div
							class="w-full h-full absolute left-0 top-0 chat-bubble bg-c-chat-bubble shadow-card 
								shadow-c-on-bg/15 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
						/>
						<p class="relative">“{testimonial}”</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
