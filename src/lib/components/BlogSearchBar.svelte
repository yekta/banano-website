<script lang="ts">
	import { clickoutside } from '$lib/ts/actions/clickoutside';
	import { typesenseApiKey } from '$lib/ts/constants/blog';
	import { getSpecificWidthSrcFromUrl } from '$lib/ts/helpers/ghost/utils';
	import { expandCollapse } from '$lib/ts/transitions';

	let searchResult: ISearchResult[];
	let isSearchResultsOpen = false;
	let inputValue: string = '';

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
		}
	}

	let searchTimeout: NodeJS.Timeout;

	async function debouncedSearch(q: string) {
		isSearchResultsOpen = true;
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(async () => {
			await search(q);
		}, 100);
	}

	function onInputClicked() {
		isSearchResultsOpen = true;
		if (inputValue == '' && searchResult === undefined) search('');
	}

	const closeDropdown = () => (isSearchResultsOpen = false);
</script>

<div use:clickoutside={closeDropdown} class="w-full">
	<input
		bind:value={inputValue}
		on:click={() => onInputClicked()}
		on:input={() => debouncedSearch(inputValue)}
		type="text"
		placeholder="Search blog posts..."
		class="w-full bg-c-on-bg/4 rounded-xl border-2 border-c-on-bg/4 px-5 py-3.5
    transition hover:border-c-secondary/40 hover:bg-c-secondary/6 focus:border-c-secondary focus:bg-c-secondary/10"
	/>
	<div class="w-full relative z-20">
		{#if searchResult && isSearchResultsOpen}
			<div
				in:expandCollapse={{ duration: 250 }}
				out:expandCollapse={{ duration: 250 }}
				class="absolute top-0 left-0 w-full bg-c-bg rounded-xl shadow-xl shadow-c-on-bg/40 mt-2 overflow-hidden dropdown"
			>
				<div class="w-full flex flex-col h-auto max-h-[50vh] overflow-auto">
					{#each searchResult as result}
						<a
							href="/blog/{result.document.slug}"
							on:click={closeDropdown}
							target="_blank"
							class="w-full p-5 rounded-lg hover:bg-c-secondary/10 focus:bg-c-secondary/10 transition group flex"
						>
							<div
								class="w-32 aspect-video relative flex items-center justify-center 
                bg-c-on-bg/15 rounded-md z-0 overflow-hidden"
							>
								{#if result.document.feature_image}
									<img
										class="absolute w-full h-full object-cover"
										src={getSpecificWidthSrcFromUrl(result.document.feature_image, 256)}
										alt={result.document.title}
									/>
								{/if}
							</div>
							<div class="flex-1 min-w-0 flex flex-col ml-4">
								<p
									class="font-bold group-hover:text-c-secondary group-focus:text-c-secondary transition"
								>
									{#if result.highlights.some((h) => h.field === 'title')}
										{@html result.highlights.find((h) => h.field == 'title')?.snippet}
									{:else}
										{result.document.title}
									{/if}
								</p>
								<p class="text-sm mt-1">
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
						<p class="px-8 py-4 text-c-on-bg/50">No matching results...</p>
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
