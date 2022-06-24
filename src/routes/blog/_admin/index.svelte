<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import IconLoading from '$lib/components/icons/IconLoading.svelte';
	import '$lib/css/main.css';
	import { clickoutside } from '$lib/ts/actions/clickoutside';
	import type { IBlogPostShallow, ITag } from '$lib/ts/interfaces/Blog';
	import Fuse from 'fuse.js';

	export let posts: IBlogPostShallow[];
	export let tags: ITag[];

	let postsCopy = posts.map((o) => ({ ...o }));

	let fuse = new Fuse(tags, {
		keys: ['name'],
		threshold: 0.15
	});

	let postTagSets = posts.map((o) => o.tags);
	let repeatingTagSets: ITag[][] = [];

	let skipList: number[] = [];
	for (let i = 0; i < postTagSets.length; i++) {
		if (skipList.includes(i)) continue;
		let shouldAdd = false;
		let postTagSet = postTagSets[i];
		for (let x = i + 1; x < postTagSets.length; x++) {
			let nextPostTagSet = postTagSets[x];
			let matchingCount = 0;
			for (let j = 0; j < postTagSet.length; j++) {
				let postTag = postTagSet[j];
				if (nextPostTagSet.map((i) => i.id).includes(postTag?.id)) {
					matchingCount++;
				} else break;
			}
			if (matchingCount === postTagSet.length && matchingCount > 1) {
				skipList.push(x);
				shouldAdd = true;
			}
		}
		if (shouldAdd) repeatingTagSets.push(postTagSet);
	}

	const inputs = postsCopy.map((i) => {
		interface Input {
			input: any;
			isOpen: boolean;
			isLoading: boolean;
		}
		let input: Input = {
			input: undefined,
			isOpen: false,
			isLoading: false
		};
		return input;
	});

	function tagsFilteredByExisting(tags: ITag[], postTags: ITag[], inputValue: string) {
		const filteredTags = tags.filter((tag: any) => {
			return !postTags.find((postTag: any) => {
				return postTag.id === tag.id;
			});
		});
		if (inputValue !== undefined && inputValue !== null && inputValue !== '') {
			const res = fuse.search(inputValue);
			const searchRes = res.map((r: any) => r.item);
			const searchedTags = searchRes.filter((tag: any) => {
				return filteredTags.find((t: any) => t.id === tag.id);
			});
			return searchedTags;
		} else {
			const orderedTags = filteredTags.sort((a: any, b: any) => {
				return a.name.localeCompare(b.name);
			});
			return orderedTags;
		}
	}

	async function editPost(post: any, index: number) {
		try {
			inputs[index].isLoading = true;
			let res = await fetch(`/blog/admin/api`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					post: post
				})
			});
			let resJson = await res.json();
			console.log(resJson);
		} catch (error) {
			console.log(error);
		} finally {
			inputs[index].isLoading = false;
		}
	}

	function handleKeyPress(e: any, tags: any, post: any, inputValue: string, index: number) {
		let arr = tagsFilteredByExisting(tags, post.tags, inputValue);
		if (arr[0]?.id) {
			if (e.key === 'Enter') {
				post.tags = [...post.tags, arr[0]];
				inputs[index].input.value = '';
				editPost(post, index);
			}
		}
	}
</script>

<div class="w-full h-64 bg-c-secondary flex items-center justify-center">
	<p class="text-5xl text-c-bg font-bold px-5">Blog Admin</p>
</div>
<div class="w-full min-h-screen flex justify-center py-8 px-5 md:px-8">
	<div class="container-b flex flex-col">
		{#each postsCopy as post, index}
			<div class="w-full flex flex-row mt-4 p-2 bg-c-bg border-2 border-c-on-bg/8 rounded-lg">
				<div
					class="w-48 aspect-video relative bg-c-on-bg/15 rounded-md flex items-center justify-center"
				>
					{#if post.feature_image}
						<img
							loading="lazy"
							class="w-full h-full object-cover rounded-md"
							src={post.feature_image}
							alt={post.title}
						/>
					{:else}
						<p class="px-6 py-2 text-c-on-bg/40 font-medium">No preview</p>
					{/if}
				</div>
				<div class="flex-1 flex-col py-2 pl-6 pr-2">
					<div class="w-full flex items-start relative">
						<div class="flex-1 flex flex-col mr-4">
							<p class="w-full overflow-hidden overflow-ellipsis font-bold">{post.title}</p>
							<div class="w-full flex flex-wrap items-center mt-4 gap-2">
								{#each post.tags as tag}
									<button
										on:click={() => {
											post.tags = post.tags.filter((i) => i.id !== tag.id);
											editPost(post, index);
										}}
										class="px-2.5 py-1.5 text-sm rounded-lg bg-c-secondary/10 border border-c-secondary/10
										hover:bg-c-secondary/25 hover:border-c-secondary/25 transition text-c-secondary font-medium"
									>
										<span class="opacity-40 mr-1">X</span>
										{tag.name}
									</button>
								{/each}
								{#if inputs[index].isLoading}
									<div class="w-8 h-8 p-2 flex justify-center items-center">
										<IconLoading class="w-full h-full text-c-secondary animate-spin-faster" />
									</div>
								{/if}
							</div>
						</div>
						<div
							use:clickoutside={() => (inputs[index].isOpen = false)}
							class="relative flex flex-col"
						>
							<input
								on:click={() => (inputs[index].isOpen = true)}
								bind:this={inputs[index].input}
								on:input={() => (inputs[index].input.value = inputs[index].input.value)}
								on:keypress={(e) => {
									handleKeyPress(e, tags, post, inputs[index].input.value, index);
									post.tags = [...post.tags];
								}}
								placeholder="Enter tags"
								class="w-80 px-4 py-2 bg-c-on-bg/5 border-2 border-c-on-bg/5 rounded-lg peer 
								transition hover:border-c-on-bg/20 focus:border-c-secondary/50"
								type="text"
							/>
							{#if inputs[index].isOpen}
								<div
									class="w-full absolute mt-12 top-0 left-0 overflow-hidden border-2 border-c-on-bg/8 rounded-lg shadow-xl shadow-c-on-bg/8 z-50"
								>
									<div class="w-full flex flex-col max-h-[30rem] overflow-auto bg-c-bg py-2">
										{#each [...tagsFilteredByExisting(tags, post.tags, inputs[index].input.value)] as tag}
											<button
												on:click={() => {
													post.tags = [...post.tags, tag];
													inputs[index].input.value = '';
													editPost(post, index);
												}}
												class="w-full px-6 py-2.5 hover:bg-c-secondary/20 hover:text-c-secondary flex transition text-left"
											>
												<p>{tag.name}</p>
											</button>
										{:else}
											<p class="w-full px-6 py-2.5 opacity-50">No match...</p>
										{/each}
										{#each repeatingTagSets as tagArray}
											<button
												on:click={() => {
													post.tags = tagArray;
													inputs[index].input.value = '';
													editPost(post, index);
													inputs[index].isOpen = false;
												}}
												class="w-full px-6 py-2.5 hover:bg-c-secondary/20 hover:text-c-secondary flex transition text-left text-xs"
											>
												<p>{tagArray.map((i) => i.name).join(', ')}</p>
											</button>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
