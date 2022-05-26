<script lang="ts">
	export let testimonials: string[];
</script>

<div id="testimonials" class="w-full pt-8">
	<div
		style="background-image: url('/illustrations/backgrounds/bg-testimonials.svg');"
		class="w-full bg-c-secondary flex justify-center pt-16 pb-24 text-center text-c-bg"
	>
		<div class="container-b-small flex flex-col items-center px-4 md:px-8">
			<h2 class="text-3xl font-bold px-4">Testimonials</h2>
			<div class="w-full flex flex-wrap justify-center">
				{#each testimonials as testimonial}
					<div class="w-full max-w-md md:w-1/2 md:max-w-full mt-5 p-3">
						<div
							class="w-full chat-bubble relative bg-c-secondary filter brightness-115 shadow-card shadow-c-on-bg/10
							rounded-tl-2xl rounded-tr-2xl rounded-br-2xl flex flex-col items-center text-center px-10 py-5"
						>
							<p>“{testimonial}”</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
