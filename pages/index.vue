<template>
	<div class="space-y-24 md:space-y-36">
		<!-- Hero Intro & Feature Photograph -->
		<section class="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20">
			<!-- Quiet Editorial Statement -->
			<div class="max-w-2xl space-y-4 mb-12 md:mb-16">
				<p class="text-[10px] md:text-xs uppercase tracking-[0.28em] text-ink-muted">
					Jef Lee — Australia
				</p>
				<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink font-light leading-[1.18] tracking-tight">
					Telling honest stories through natural light and quiet moments.
				</h1>
				<p class="text-xs md:text-sm text-ink-muted tracking-[0.04em] font-light leading-relaxed pt-2">
					A portrait and documentary photographer dedicated to capturing genuine human warmth, family milestones, and timeless atmosphere.
				</p>
			</div>

			<!-- Hero Feature Image (Framed Print Aesthetic) -->
			<div class="relative overflow-hidden bg-line/40 aspect-[16/9] md:aspect-[21/9]">
				<img
					src="/images/preview3.jpeg"
					alt="Coastal Moment by Jef Lee"
					class="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.01]"
					loading="eager"
					decoding="async"
				>
			</div>
			<div class="flex justify-between items-center text-[11px] text-ink-faint tracking-widest uppercase mt-3">
				<span>01 / Recent Atmosphere</span>
				<span>Natural Light Study</span>
			</div>
		</section>

		<!-- Selected Works (Japanese Exhibition Grid) -->
		<section class="max-w-6xl mx-auto px-6 md:px-12">
			<!-- Section Header -->
			<div class="flex justify-between items-end border-b border-line/60 pb-4 mb-12">
				<div>
					<span class="text-[10px] uppercase tracking-[0.25em] text-ink-muted block mb-1">Portfolio</span>
					<h2 class="font-serif text-2xl md:text-3xl text-ink font-light">
						Selected Works
					</h2>
				</div>
				<NuxtLink
					to="/works"
					class="text-xs uppercase tracking-[0.18em] text-ink-muted hover:text-ink transition-colors pb-0.5 border-b border-transparent hover:border-ink"
				>
					View All Works →
				</NuxtLink>
			</div>

			<!-- Photography Exhibition Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
				<NuxtLink
					v-for="(work, index) in selectedWorks"
					:key="work.id"
					to="/works"
					class="group block space-y-3"
				>
					<!-- Image Frame -->
					<div class="overflow-hidden bg-line/30 aspect-[4/3] relative">
						<img
							:src="resolveImageUrl(work.thumbnail)"
							:alt="work.title"
							class="w-full h-full object-cover transition-all duration-700 group-hover:opacity-90 group-hover:scale-[1.02]"
							loading="lazy"
							decoding="async"
							@error="onImageError"
						>
					</div>

					<!-- Minimalist Typography Caption (Clean Japanese Print Style) -->
					<div class="space-y-1">
						<div class="flex justify-between items-baseline text-[11px] uppercase tracking-[0.2em] text-ink-muted font-mono">
							<span>{{ work.category || 'Series' }}</span>
							<span>{{ String(index + 1).padStart(2, '0') }}</span>
						</div>
						<h3 class="font-serif text-lg text-ink font-normal group-hover:opacity-60 transition-opacity">
							{{ work.title }}
						</h3>
					</div>
				</NuxtLink>
			</div>
		</section>

		<!-- Photographer Philosophy / Quote -->
		<section class="max-w-3xl mx-auto px-6 md:px-12 text-center py-12">
			<span class="block w-8 h-[1px] bg-ink-muted/40 mx-auto mb-10" />
			<blockquote class="font-serif italic text-xl md:text-2xl lg:text-3xl text-ink font-light leading-relaxed">
				"Photography is more than capturing light — it is preserving life itself, pausing the fleeting smiles and quiet touches before they fade into memory."
			</blockquote>
			<p class="text-xs uppercase tracking-[0.25em] text-ink-muted mt-6">
				— Jef Lee
			</p>
			<span class="block w-8 h-[1px] bg-ink-muted/40 mx-auto mt-10" />
		</section>

		<!-- About Teaser (Editorial Layout) -->
		<section class="max-w-6xl mx-auto px-6 md:px-12">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
				<div class="md:col-span-5">
					<div class="overflow-hidden bg-line/40 aspect-[4/5]">
						<img
							src="/images/jeff-portrait.jpeg"
							alt="Portrait of Jef Lee"
							class="w-full h-full object-cover grayscale contrast-90 transition-transform duration-700 hover:scale-[1.02]"
							loading="lazy"
							decoding="async"
						>
					</div>
				</div>
				<div class="md:col-span-7 space-y-6">
					<span class="text-[10px] uppercase tracking-[0.25em] text-ink-muted block">About The Photographer</span>
					<h2 class="font-serif text-3xl md:text-4xl text-ink font-light">
						A quiet observer of life’s everyday poetry.
					</h2>
					<p class="text-xs md:text-sm text-ink-muted font-light leading-relaxed tracking-[0.02em]">
						Based along the Australian coast, Jef finds meaning in genuine human moments — the gentle embrace of new parents, unposed laughter, and the serene golden light falling over everyday lives.
					</p>
					<p class="text-xs md:text-sm text-ink-muted font-light leading-relaxed tracking-[0.02em]">
						Over the past three years, he has developed an aesthetic rooted in stillness, warm natural tones, and an unhurried, comfortable presence during every session.
					</p>
					<div class="pt-2">
						<NuxtLink
							to="/about"
							class="text-xs uppercase tracking-[0.2em] font-medium text-ink hover:opacity-60 transition-opacity border-b border-ink pb-1"
						>
							Read Full Background →
						</NuxtLink>
					</div>
				</div>
			</div>
		</section>

		<!-- Call to Action -->
		<CallToAction />
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CallToAction from "~/components/sections/CallToAction.vue";
import { useApi, type PortfolioItem } from "~/composables/useApi";

definePageMeta({
	layout: "default",
});

useSeoMeta({
	title: "Jef Lee — Portrait & Documentary Photography",
	ogTitle: "Jef Lee — Portrait & Documentary Photography",
	description: "Personal photography portfolio of Jef Lee. Telling real stories through natural light, family milestones, and heartfelt moments.",
	ogDescription: "Personal photography portfolio of Jef Lee. Telling real stories through natural light, family milestones, and heartfelt moments.",
	ogImage: "/images/preview3.jpeg",
	twitterCard: "summary_large_image",
	twitterTitle: "Jef Lee — Portrait & Documentary Photography",
	twitterDescription: "Personal photography portfolio of Jef Lee. Telling real stories through natural light, family milestones, and heartfelt moments.",
	twitterImage: "/images/preview3.jpeg",
});

const { getPortfolios, resolveImageUrl, onImageError } = useApi();

const fallbackPreviewWorks: PortfolioItem[] = [
	{
		id: 1,
		title: "Family Session at Sunset",
		slug: "family-session",
		category: "Family",
		thumbnail: "/images/preview1.jpeg",
		is_highlight: true,
		created_at: "Oct 2026",
	},
	{
		id: 2,
		title: "Natural Light Portrait",
		slug: "portrait-shot",
		category: "Portrait",
		thumbnail: "/images/preview2.jpeg",
		is_highlight: true,
		created_at: "Sep 2026",
	},
	{
		id: 3,
		title: "Couple Moment by the Coast",
		slug: "couple-moment",
		category: "Couple",
		thumbnail: "/images/preview3.jpeg",
		is_highlight: true,
		created_at: "Aug 2026",
	},
];

const { data } = useLazyAsyncData("home-portfolios", async () => {
	try {
		const res = await getPortfolios();
		return res?.data?.slice(0, 6) || [];
	}
	catch {
		return [];
	}
}, {
	default: () => [],
	getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
});

const selectedWorks = computed<PortfolioItem[]>(() => {
	if (data.value && data.value.length > 0) {
		return data.value;
	}
	return fallbackPreviewWorks;
});
</script>
