<script lang="ts">
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';
	import Lazy from '$lib/components/LazyImage.svelte';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={4} class={classes}>
	<p class="mt-4">
		BANANO prides itself in its active development and pro-active community. BANANO community
		members have created fascinating projects, such as an implementation of BANANO into Minecraft,
		guild rewards in mobile games and apps, and even faucet bots on popular streaming platforms and
		highly used tipbots on major social media platforms such as Telegram, Twitter, Discord and
		Reddit.
		<br /><br />
		One of the most impactful differences between NANO and BANANO is that we started with billions of
		newly minted coins (<b>Figure 3</b>), 3.4 billion to be exact, that we use to continually run
		faucets that propagate DAG technology, fuel the tipping economy, and fund community projects. In
		that way, our objectives are similar to those of the NanoCenter—a community of NANO fans,
		investors, and contributors who operate parallel to NANO core.
		<br /><br />
		BANANO follows a gamification approach and strives to also get into the hands of people who have
		never interacted with crypto before. Given its (apparently) silly and potassium-rich nature, BANANO
		is friendly and somewhat forgiving to new users. Let’s be real, losing “some memecoins earned from
		sh*tposting” is not half as bad as “suffering a stolen” on a large investment. After all, making
		the start with cryptocurrency as easy as possible through a fun attitude, gamification, and education
		is a main aim of the project, finally enabling everyone to finally handle crypto assets in general
		in a responsible way.
		<br /><br />
		ALSO, it’s important to note: behind all the memes and sh*tposting, the BANANO operation has a
		<strike>highly skilled team</strike> dedicated community, and it is very, very, legit.
	</p>
	<Lazy
		width={700}
		height={700}
		class="mt-10 rounded-xl"
		placeholderSrc="/yellowpaper/lqip/factory.png"
	>
		<img
			width="700"
			height="700"
			class="w-full h-auto rounded-xl relative z-0 overflow-hidden"
			src="/yellowpaper/factory.gif"
			alt="Nano to Banano Factory Animation"
		/>
	</Lazy>
	<p class="mt-4 px-4 md:px-12 text-sm">
		<b>Figure 3</b>: BANANO is the first peel of the NANO cryptocurrency and adheres to the
		open-source spirit. In the figure above, NANO in its raw form is remodelled through a
		combination of proof-of-work optimisation and potassium doping, resulting in unprecedented
		performance..
	</p>
</PageWrapper>
