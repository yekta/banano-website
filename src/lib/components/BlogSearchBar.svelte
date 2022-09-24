<script lang="ts">
	import { clickoutside } from '$ts/actions/clickoutside';
	import { typesenseApiKey } from '$ts/constants/blog';
	import { debounce } from '$ts/helpers/debounce';
	import { getSpecificWidthSrcFromUrl } from '$ts/helpers/ghost/utils';
	import type { ISearchResult } from '$ts/interfaces/Blog';
	import { expandCollapse } from '$ts/transitions';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import IconClose from './icons/IconClose.svelte';
	import IconSearch from './icons/IconSearch.svelte';

	export let searchResult: ISearchResult[];
	let lastSearchTimestamp = 0;

	let isSearchResultsOpen = false;
	let inputValue: string = '';
	let inputElement: HTMLInputElement;
	let isSearching = false;

	async function search(q: string) {
		isSearching = true;
		isSearchResultsOpen = true;
		const now = Date.now();

		debounce(() => {
			if (q !== '' && now > lastSearchTimestamp) {
				window.plausible('Blog | Search Bar Used', {
					props: { Query: q }
				});
			}
		}, 500);

		try {
			const url = 'https://typesense.banano.cc/collections/blog-posts/documents/search';
			const query_by = ['title', 'custom_excerpt', 'excerpt', 'plaintext'];
			const infix = ['always', 'off', 'off', 'off'];
			const include_fields = [
				'title',
				'custom_excerpt',
				'excerpt',
				'slug',
				'plaintext',
				'feature_image'
			];
			const affix_num_tokens = 10;
			let res = await fetch(
				`${url}?x-typesense-api-key=${typesenseApiKey}&q=${q}&query_by=${query_by.join(
					','
				)}&infix=${infix.join(',')}&include_fields=${include_fields.join(
					','
				)}&page=1&per_page=10&highlight_affix_num_tokens=${affix_num_tokens}`
			);
			let resJson = await res.json();
			if (resJson && resJson.hits && now > lastSearchTimestamp) {
				searchResult = resJson.hits;
			}
		} catch (error) {
			console.log(error);
		} finally {
			isSearching = false;
		}
	}

	function onInputFocused() {
		isSearchResultsOpen = true;
		if (inputValue == '' && searchResult === undefined && !isSearching) search('');
	}

	const closeSearchBarResults = () => (isSearchResultsOpen = false);

	async function closeOnClick() {
		inputValue = '';
		inputElement.focus();
		await search(inputValue);
	}
</script>

<div use:clickoutside={closeSearchBarResults} class="w-full">
	<div
		class="relative overflow-hidden z-30 transition-all shadow-c-secondary/20 {isSearchResultsOpen
			? 'rounded-t-xl rounded-b-none shadow-search-bar'
			: 'rounded-t-xl rounded-b-xl shadow-none'}"
	>
		<input
			bind:this={inputElement}
			bind:value={inputValue}
			on:focus={onInputFocused}
			on:input={() => debounce(() => search(inputValue), 100)}
			type="text"
			placeholder="Search blog posts..."
			class="w-full bg-c-on-bg/8 rounded-xl {isSearchResultsOpen
				? 'rounded-t-xl rounded-b-none'
				: 'rounded-t-xl rounded-b-xl'} px-12 py-4 placeholder:font-normal placeholder:text-c-on-bg/40
				transition-all hover:placeholder:text-c-secondary/60 focus:placeholder:text-c-secondary/60 
				hover:bg-c-secondary/12 hover:placeholder:translate-x-1 focus:placeholder:translate-x-0 
				placeholder:transition placeholder:duration-150 hover:text-c-secondary focus:bg-c-secondary/12 focus:text-c-secondary font-medium peer"
		/>
		<IconSearch
			class="absolute text-c-on-bg/30 peer-hover:text-c-secondary/60 peer-focus:text-c-secondary/60 
			transition left-4 h-5 w-5 top-1/2 -translate-y-1/2 pointer-events-none"
		/>
		{#if inputValue !== '' && inputValue !== null && inputValue !== undefined}
			<button
				aria-label="Clear Search"
				transition:fly={{ duration: 200, easing: cubicOut, x: 32 }}
				on:click={closeOnClick}
				class="absolute h-full rounded-tr-xl w-12 right-0 top-0 p-2 flex justify-center items-center transition 
				text-c-on-bg/40 peer-hover:text-c-secondary/60 peer-focus:text-c-secondary/60 hover:text-c-secondary hover:bg-c-secondary/10"
			>
				<IconClose />
			</button>
		{/if}
	</div>
	<div class="w-full relative z-20">
		{#if isSearchResultsOpen}
			<div
				in:fly={{ duration: 200, easing: cubicOut, y: -16 }}
				class="absolute top-0 left-0 w-full"
			>
				<div
					in:expandCollapse={{ durationMultiplier: 0.8 }}
					out:expandCollapse={{ durationMultiplier: 0.6 }}
					class="w-full bg-c-bg rounded-b-xl transition-all shadow-2xl shadow-c-on-bg/30 overflow-hidden dropdown"
				>
					<div class="w-full flex flex-col h-auto max-h-[42vh] overflow-auto">
						{#each searchResult ? searchResult : [] as result}
							<a
								data-sveltekit-prefetch
								href="/blog/{result.document.slug}"
								on:click={closeSearchBarResults}
								class="w-full p-3 md:p-4 hover:bg-c-secondary/20 focus:bg-c-secondary/20 transition group flex items-center"
							>
								<div
									class="w-16 md:w-24 aspect-video relative flex items-center justify-center 
                	 bg-c-on-bg/15 rounded md:rounded-md z-0 overflow-hidden"
								>
									{#if result.document.feature_image}
										<img
											loading="lazy"
											class="absolute w-full h-full object-cover"
											src={getSpecificWidthSrcFromUrl(result.document.feature_image, 256)}
											srcset={`${getSpecificWidthSrcFromUrl(
												result.document.feature_image,
												128
											)} 128w, ${getSpecificWidthSrcFromUrl(
												result.document.feature_image,
												256
											)} 256w,`}
											sizes="(min-width: 768px) 6rem, 4rem"
											alt={result.document.title}
										/>
									{/if}
								</div>
								<div class="flex-1 min-w-0 flex flex-col pl-3 pr-1 md:px-4">
									<p class="w-full text-sm md:text-base font-bold transition">
										{#if result.highlights.some((h) => h.field === 'title')}
											{@html result.highlights.find((h) => h.field == 'title')?.snippet}
										{:else}
											{result.document.title}
										{/if}
									</p>
									<p class="w-full text-xs md:text-sm mt-1 break-words">
										{#if result.highlights.some((h) => h.field === 'custom_excerpt')}
											{@html result.highlights.find((h) => h.field == 'custom_excerpt')?.snippet}
										{:else if result.highlights.some((h) => h.field === 'excerpt')}
											{@html result.highlights.find((h) => h.field == 'excerpt')?.snippet}
										{:else if result.highlights.some((h) => h.field === 'plaintext')}
											...{@html result.highlights.find((h) => h.field == 'plaintext')?.snippet}...
										{:else}
											{result.document.excerpt}
										{/if}
									</p>
								</div>
							</a>
						{:else}
							<p class="px-8 py-5 text-c-on-bg/50">No matching results.</p>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.dropdown a:focus {
		outline: none;
	}
</style>
