<script lang="ts">
	import PageWrapper from '$lib/components/yellowpaper/PageWrapper.svelte';
	import { bananoSocials } from '$lib/ts/constants/bananoSocials';
	import Lazy from '$lib/components/LazyImage.svelte';

	export { classes as class };
	let classes: string;
</script>

<PageWrapper pageNumber={10} class={classes}>
	<h2 class="font-bold text-2xl">
		<span class="mr-1ch">5.</span> Distribution
	</h2>
	<p class="mt-4">
		BANANO is freely distributed through faucets, games, contests, giveaways, and airdrops. To date,
		both NANO and Doge holders have been rejuvenated with yellow goodness via airdrops (more coming
		in the future). Apart from that, BANANO had a very unique distinction from basically all other
		cryptocurrency projects from the very beginning: <b
			>Free coin distribution through innovative faucet games</b
		>. You heard it right, we don’t have just some boring faucets, we have faucet games! The
		legendary BANANO Runner game (<b>Figure 11</b>) with its first round in April 2018 was a huge
		success and an unprecedented form of airdropping a new cryptocurrency to its community.
	</p>
	<Lazy
		width={800}
		height={450}
		class="mt-8 rounded-xl"
		placeholderSrc="/yellowpaper/lqip/banano-runner.png"
	>
		<video
			width="800"
			height="450"
			class="w-full h-auto rounded-xl relative z-0 overflow-hidden"
			controls
		>
			<source src="/yellowpaper/banano-runner.mp4" type="video/mp4" />
			<track kind="captions" />
		</video>
	</Lazy>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 11</b>: A video from BANANO Runner - we’ll never forget this legendary BANANO faucet
		game!
	</p>
	<p class="mt-8">
		One of the highest aims of the ongoing free distribution of BANANO always was (and still is) to
		keep the distribution fair. Unfortunately, there have been attempts to bot and exploit BANANO
		faucet games from the very beginning. That’s one of the reasons why BANANO Runner sadly had to
		be discontinued after 5 highly successful rounds with thousands of participants.
		<br /><br />
		In addition to rains and tips at our
		<a href={bananoSocials.discord.url} target="_blank">Discord server</a> and lots of tips also
		through tipbots at our <a href={bananoSocials.reddit.url}>subreddit</a>,
		<a href={bananoSocials.twitter.url} target="_blank">Twitter account</a> and
		<a href={bananoSocials.telegram.url} target="_blank">Telegram groups</a>
		(<b>Figure 12</b>), lots of often innovative events have been running in order to continue the
		free and fair ongoing distribution, including various contests & giveaways focusing on fun and
		creativity. Of note, both official and unofficial contests and games are an integral part of the
		BANANO ecosystem.
	</p>
	<div class="w-full flex flex-wrap justify-center mt-6">
		<div class="w-full max-w-xs md:flex-1">
			<a class="w-full" href={bananoSocials.discord.url} target="_blank">
				<Lazy
					width={720}
					height={1203}
					placeholderSrc="/yellowpaper/lqip/discord-tipbot.png"
					class="rounded-xl"
				>
					<img
						width="720"
						height="1203"
						class="w-full h-auto"
						src="/yellowpaper/discord-tipbot.png"
						alt="Discord Tipbot"
					/>
				</Lazy>
			</a>
		</div>
		<div class="w-full max-w-xs md:flex-1">
			<a class="w-full" href="https://www.reddit.com/user/Banano_Tipbot" target="_blank">
				<Lazy
					width={720}
					height={1203}
					placeholderSrc="/yellowpaper/lqip/reddit-tipbot.png"
					class="rounded-xl"
				>
					<img
						width="720"
						height="1203"
						class="w-full"
						src="/yellowpaper/reddit-tipbot.png"
						alt="Reddit Tipbot"
					/>
				</Lazy>
			</a>
		</div>
		<div class="w-full max-w-xs md:flex-1">
			<a class="w-full" href="https://twitter.com/bananotipperbot" target="_blank">
				<Lazy
					width={720}
					height={1203}
					placeholderSrc="/yellowpaper/lqip/twitter-tipbot.png"
					class="rounded-xl"
				>
					<img
						width="720"
						height="1203"
						class="w-full h-auto"
						src="/yellowpaper/twitter-tipbot.png"
						alt="Twitter Tipbot"
					/>
				</Lazy>
			</a>
		</div>
	</div>
	<p class="mt-4 px-4 md:px-12 text-sm text-center">
		<b>Figure 12</b>: BANANO Tipbot wallet overview.
	</p>
	<p class="mt-8">
		Finally, several new faucets and faucet games have been developed, tested, and are meanwhile
		running permanently or intermittently! Here’s a brief, incomplete insight about some current
		faucets at the time of writing. Please make sure to visit our website at <a
			href="https://banano.cc"
			target="_blank">banano.cc</a
		> for an updated overview.
	</p>
</PageWrapper>
