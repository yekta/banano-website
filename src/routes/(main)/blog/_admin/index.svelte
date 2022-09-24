<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import IconLoading from '$components/icons/IconLoading.svelte';
	import '$css/main.css';
	import { clickoutside } from '$ts/actions/clickoutside';
	import type { IBlogPostShallow, ITag } from '$ts/interfaces/Blog';
	import Fuse from 'fuse.js';

	export let posts: IBlogPostShallow[];
	export let tags: ITag[];

	let postsCopy = posts.map((o) => ({ ...o }));

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

	let fuse = new Fuse(tags, {
		keys: ['name'],
		threshold: 0.3
	});

	let fuseSets = new Fuse(tagSetStringFromTagSet(repeatingTagSets), {
		keys: ['name'],
		threshold: 0.3
	});

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

	function tagSetStringFromTagSet(s: ITag[][]) {
		return s.map((i) => {
			return { name: i.map((y) => y.name).join(',') };
		});
	}

	function tagSetsFiltered(tagSets: ITag[][], inputValue: string) {
		if (inputValue !== undefined && inputValue !== null && inputValue !== '') {
			let searchedTagSets: ITag[][] = [];
			const res = fuseSets.search(inputValue);
			const searchRes = res.map((r) => r.item);
			const searchResStrings = searchRes.map((r: any) => r.name);
			repeatingTagSets.forEach((i) => {
				let tagSetString = i.map((i) => i.name).join(',');
				if (searchResStrings.includes(tagSetString)) {
					searchedTagSets.push(i);
				}
			});
			return searchedTagSets;
		} else {
			return repeatingTagSets;
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
			<div
				class="w-full flex flex-row mt-4 bg-c-bg border border-c-on-bg/5 
				shadow-md shadow-c-on-bg/5 rounded-lg"
			>
				<div
					class="w-48 min-w-[12rem] aspect-video bg-c-on-bg/15 rounded-l-lg flex items-center justify-center overflow-hidden relative z-0"
				>
					{#if post.feature_image}
						<img
							loading="lazy"
							class="w-full h-full object-cover"
							src={post.feature_image}
							alt={post.title}
						/>
					{:else}
						<p class="px-6 py-2 text-c-on-bg/40 font-medium">No preview</p>
					{/if}
				</div>
				<div class="flex-1 min-w-0 flex items-start relative p-2">
					<div class="flex-1 min-w-0 flex flex-col px-4 py-2 mr-4">
						<a
							href="/blog/{post.slug}"
							target="_blank"
							class="w-full overflow-hidden overflow-ellipsis font-bold whitespace-nowrap hover:underline"
						>
							{post.title}
						</a>
						<div class="w-full flex flex-wrap items-center mt-4 gap-2">
							{#each post.tags as tag}
								<button
									on:click={() => {
										post.tags = post.tags.filter((i) => i.id !== tag.id);
										editPost(post, index);
									}}
									class="px-2.5 py-1.5 text-sm rounded-md bg-c-secondary/10 border border-c-secondary/10
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
						class="relative flex flex-col w-64 min-w-[16rem]"
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
							class="w-full px-4 py-2 bg-c-on-bg/5 border border-c-on-bg/5 rounded-md peer 
							transition hover:border-c-on-bg/20 focus:border-c-secondary/50"
							type="text"
						/>
						{#if inputs[index].isOpen}
							<div
								class="w-128 absolute mt-12 top-0 right-0 overflow-hidden border border-c-on-bg/8 rounded-lg shadow-xl shadow-c-on-bg/8 z-50"
							>
								<div class="w-full flex flex-wrap max-h-[30rem] overflow-auto bg-c-bg py-2">
									{#each [...tagsFilteredByExisting(tags, post.tags, inputs[index].input.value)] as tag}
										<button
											on:click={() => {
												post.tags = [...post.tags, tag];
												inputs[index].input.value = '';
												editPost(post, index);
											}}
											class="w-1/2 px-6 py-2.5 hover:bg-c-secondary/20 hover:text-c-secondary flex transition text-left"
										>
											<p>{tag.name}</p>
										</button>
									{:else}
										<p class="w-full px-6 py-2.5 opacity-50">No matching tags</p>
									{/each}
									{#each [...tagSetsFiltered(repeatingTagSets, inputs[index].input.value)] as tagArray}
										<button
											on:click={() => {
												post.tags = tagArray;
												inputs[index].input.value = '';
												editPost(post, index);
												inputs[index].isOpen = false;
											}}
											class="w-1/2 px-6 py-4 hover:bg-c-secondary/20 hover:text-c-secondary flex transition text-left text-xs"
										>
											<p>{tagArray.map((i) => i.name).join(', ')}</p>
										</button>
									{:else}
										<p class="w-full px-6 py-2.5 opacity-50">No matching sets</p>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
