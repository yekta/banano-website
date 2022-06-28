<script lang="ts">
	import { clickoutside } from '$lib/ts/actions/clickoutside';
	import { typesenseApiKey } from '$lib/ts/constants/blog';
	import { getSpecificWidthSrcFromUrl } from '$lib/ts/helpers/ghost/utils';
	import { expandCollapse } from '$lib/ts/transitions';
	import IconSearch from './icons/IconSearch.svelte';

	let searchResult: ISearchResult[];
	let isSearchResultsOpen = false;
	let inputValue: string = '';
	let isSearching = false;

	interface ISearchResult {
		document: {
			custom_excerpt: string;
			excerpt: string;
			published_at: number;
			slug: string;
			tags: string[];
			title: string;
			feature_image: string;
		};
		highlights: IHighlight[];
	}

	interface IHighlight {
		field: string;
		matched_tokens: string[];
		snippet: string;
	}

	async function search(q: string) {
		isSearching = true;
		clearTimeout(eventTimeout);
		eventTimeout = setTimeout(() => {
			if (q !== '') {
				window.plausible('Blog | Search Bar Used', {
					props: { Query: q }
				});
			}
		}, 500);
		try {
			const url = 'https://typesense.banano.cc/collections/blog-posts/documents/search';
			const query_by = ['title', 'slug', 'excerpt', 'custom_excerpt'];
			const include_fields = ['title', 'slug', 'excerpt', 'custom_excerpt', 'feature_image'];
			let res = await fetch(
				`${url}?x-typesense-api-key=${typesenseApiKey}&q=${q}&query_by=${query_by.join(
					','
				)}&include_fields=${include_fields.join(',')}&page=1&per_page=10`
			);
			let resJson = await res.json();
			if (resJson && resJson.hits) {
				searchResult = resJson.hits;
			}
		} catch (error) {
			console.log(error);
		} finally {
			isSearching = false;
		}
	}

	let searchTimeout: NodeJS.Timeout;
	let eventTimeout: NodeJS.Timeout;

	async function debouncedSearch(q: string) {
		isSearchResultsOpen = true;
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(async () => {
			if (!isSearching) await search(q);
		}, 100);
	}

	function onInputClicked() {
		isSearchResultsOpen = true;
		if (inputValue == '' && searchResult === undefined && !isSearching) search('');
	}

	const closeSearchBarResults = () => (isSearchResultsOpen = false);
</script>

<div use:clickoutside={closeSearchBarResults} class="w-full">
	<div class="relative">
		<input
			bind:value={inputValue}
			on:click={() => onInputClicked()}
			on:input={() => debouncedSearch(inputValue)}
			type="text"
			placeholder="Search blog posts..."
			class="w-full bg-c-on-bg/4 rounded-xl ring-2 ring-c-on-bg/10 pl-12 pr-5 py-3.5 placeholder:text-c-on-bg/40
    	transition hover:ring-c-secondary/40 hover:bg-c-secondary/6 focus:ring-c-secondary/80 focus:bg-c-secondary/10 peer"
		/>
		<IconSearch
			class="absolute text-c-on-bg/40 peer-hover:text-c-secondary/60 peer-focus:text-c-secondary transition left-4 h-5 w-5 top-1/2 -translate-y-1/2"
		/>
	</div>
	<div class="w-full relative z-20">
		{#if searchResult && isSearchResultsOpen}
			<div
				in:expandCollapse={{ duration: 250 }}
				out:expandCollapse={{ duration: 250 }}
				class="absolute top-0 left-0 w-full bg-c-bg rounded-xl shadow-xl shadow-c-on-bg/30 ring-2 ring-c-on-bg/6 mt-2 overflow-hidden dropdown"
			>
				<div class="w-full flex flex-col h-auto max-h-[50vh] overflow-auto">
					{#each searchResult as result}
						<a
							sveltekit:prefetch
							href="/blog/{result.document.slug}"
							on:click={closeSearchBarResults}
							class="w-full p-3 md:p-4 hover:bg-c-secondary/10 focus:bg-c-secondary/10 transition group flex items-center"
						>
							<div
								class="w-16 md:w-24 aspect-video relative flex items-center justify-center 
                bg-c-on-bg/15 rounded md:rounded-md z-0 overflow-hidden"
							>
								{#if result.document.feature_image}
									<img
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
								<p
									class="w-full text-sm md:text-base font-bold group-hover:text-c-secondary 
									group-focus:text-c-secondary transition"
								>
									{#if result.highlights.some((h) => h.field === 'title')}
										{@html result.highlights.find((h) => h.field == 'title')?.snippet}
									{:else}
										{result.document.title}
									{/if}
								</p>
								<p class="w-full text-xs md:text-sm mt-1">
									{#if result.document.custom_excerpt}
										{#if result.highlights.some((h) => h.field === 'custom_excerpt')}
											{@html result.highlights.find((h) => h.field == 'custom_excerpt')?.snippet}
										{:else}
											{result.document.custom_excerpt}
										{/if}
									{:else if result.highlights.some((h) => h.field === 'excerpt')}
										{@html result.highlights.find((h) => h.field == 'excerpt')?.snippet}
									{:else}
										{result.document.excerpt}
									{/if}
								</p>
							</div>
						</a>
					{:else}
						<p class="px-8 py-5 text-c-on-bg/50">No matching results...</p>
					{/each}
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
