<template>
	<div>
		<!-- Hero Section -->
		<section class="relative h-screen flex flex-col justify-center items-center text-center px-6 mb-24">
			<!-- Background Image -->
			<div
				class="absolute inset-0 bg-cover bg-center w-full"
				style="background-image: url('/images/preview3.jpeg')"
			/>

			<!-- Overlay -->
			<div class="absolute inset-0 bg-black/45" />

			<!-- Content -->
			<div class="relative z-10 max-w-3xl text-white">
				<!-- Nama Fotografer -->
				<p class="text-xl text-brand font-semibold mb-2 mt-24 tracking-wide uppercase">
					Jeff Lee
				</p>

				<!-- Headline -->
				<h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
					Telling real stories through natural light <br class="hidden md:block">
					and heartfelt moments.
				</h1>

				<!-- Subheadline -->
				<p class="text-base md:text-lg opacity-90 leading-relaxed max-w-2xl mx-auto mb-8">
					A portrait and documentary photographer based in Australia, with over 3 years of experience.
					Capturing timeless family moments and authentic emotions through natural light and storytelling visuals.
				</p>

				<div class="flex flex-wrap items-center justify-center gap-4">
					<NuxtLink
						to="/booking"
						class="px-6 py-3 bg-brand hover:bg-brand-dark text-white rounded-full font-semibold shadow-lg transition-colors"
					>
						Book a Photoshoot
					</NuxtLink>
					<NuxtLink
						to="/works"
						class="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold backdrop-blur-sm transition-colors border border-white/30"
					>
						View Portfolio
					</NuxtLink>
				</div>
			</div>
		</section>

		<!-- Selected Works -->
		<section class="container py-16 text-center px-6 md:px-10">
			<h2 class="text-3xl text-brand dark:text-brand-dark font-semibold mb-3">
				Selected Works
			</h2>
			<p class="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
				A preview of recent sessions captured across Australia.
			</p>

			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
				<NuxtLink
					v-for="work in selectedWorks"
					:key="work.id"
					to="/works"
					class="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100 dark:bg-gray-800 shadow hover:shadow-lg transition-all"
				>
					<img
						:src="resolveImageUrl(work.thumbnail)"
						:alt="work.title"
						class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						loading="lazy"
						@error="onImageError"
					>
					<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
						<span class="text-xs text-brand font-semibold">{{ work.category || 'Portrait' }}</span>
						<h3 class="text-white text-base font-bold">{{ work.title }}</h3>
					</div>
				</NuxtLink>
			</div>

			<NuxtLink
				to="/works"
				class="inline-block px-6 py-2.5 border border-brand text-brand rounded-full hover:bg-brand hover:text-white transition-colors font-medium text-sm"
			>
				See Full Gallery →
			</NuxtLink>
		</section>

		<!-- Writing / Stories Teaser -->
		<section class="container py-16 text-center px-6 md:px-10 bg-gray-50 dark:bg-gray-800/40 rounded-3xl my-10 max-w-5xl mx-auto">
			<h2 class="text-3xl text-brand dark:text-brand-dark font-semibold mb-6">
				Thoughts & Stories
			</h2>
			<blockquote class="italic text-lg md:text-xl text-text-light dark:text-text-dark max-w-2xl mx-auto mb-6 leading-relaxed">
				"Photography is more than capturing light—it's preserving life itself, pausing the fleeting smiles and quiet touches before they fade into memory."
			</blockquote>
			<p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
				— Jeff Lee
			</p>
			<NuxtLink
				to="/writing"
				class="inline-block px-6 py-2.5 border border-brand text-brand rounded-full hover:bg-brand hover:text-white transition-colors font-medium text-sm"
			>
				Read Reflections →
			</NuxtLink>
		</section>

		<!-- About Jeff Preview -->
		<section class="container py-16 px-6 md:px-10">
			<div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
				<img
					src="/images/jeff-portrait.jpeg"
					alt="Jeff Lee Portrait"
					class="w-56 h-56 object-cover rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800"
				>
				<div class="text-center md:text-left space-y-4 flex-1">
					<span class="text-xs uppercase tracking-wider text-brand font-semibold">Behind the Lens</span>
					<h2 class="text-3xl font-bold text-text-light dark:text-text-dark">
						About Jeff
					</h2>
					<p class="text-gray-600 dark:text-gray-300 leading-relaxed">
						Jeff is a photographer who finds meaning in genuine human moments—the gentle embrace of new parents, playful laughter between siblings, and quiet glances between loved ones.
					</p>
					<p class="text-gray-600 dark:text-gray-300 leading-relaxed">
						With over 3 years of experience in portraiture, family documentation, and intimate events across Australia, Jeff brings both relaxed professionalism and genuine heart to every shoot.
					</p>
					<div class="pt-2">
						<NuxtLink
							to="/about"
							class="text-brand font-semibold hover:underline inline-flex items-center gap-1"
						>
							Read Jeff's Full Journey →
						</NuxtLink>
					</div>
				</div>
			</div>
		</section>

		<!-- Testimonials -->
		<section class="container py-16 text-center px-6 md:px-10">
			<h2 class="text-3xl text-brand dark:text-brand-dark font-semibold mb-3">
				What Clients Say
			</h2>
			<p class="text-gray-500 dark:text-gray-400 mb-10 text-sm">
				Heartfelt feedback from recent photo sessions.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
				<blockquote class="bg-gray-50 text-text-light dark:text-text-dark dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 italic text-left shadow-sm">
					"Jeff made our family photo session feel so natural and effortless. The photos brought tears to my eyes when we opened the gallery!"
					<footer class="mt-4 text-xs font-semibold not-italic text-gray-500 dark:text-gray-400">
						— Amanda R. (Family Session)
					</footer>
				</blockquote>
				<blockquote class="bg-gray-50 text-text-light dark:text-text-dark dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 italic text-left shadow-sm">
					"His ability to capture fleeting, genuine emotions without forced poses is unmatched. Highly recommended for couples!"
					<footer class="mt-4 text-xs font-semibold not-italic text-gray-500 dark:text-gray-400">
						— David & Lina (Couple Story)
					</footer>
				</blockquote>
				<blockquote class="bg-gray-50 text-text-light dark:text-text-dark dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 italic text-left shadow-sm">
					"Jeff's calm demeanor and keen eye for natural light made our outdoor portrait session an absolute joy. We love every single shot."
					<footer class="mt-4 text-xs font-semibold not-italic text-gray-500 dark:text-gray-400">
						— Clara & Sam (Portrait Shoot)
					</footer>
				</blockquote>
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

useHead({
	title: "Jeff Lee — Portrait & Storytelling Photography",
	meta: [
		{ name: "description", content: "Personal photography portfolio of Jeff Lee. Telling real stories through natural light and heartfelt moments." },
	],
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

const { data } = await useAsyncData("home-portfolios", async () => {
	try {
		const res = await getPortfolios();
		return res?.data?.slice(0, 3) || [];
	}
	catch {
		return [];
	}
}, { default: () => [] });

const selectedWorks = computed<PortfolioItem[]>(() => {
	if (data.value && data.value.length > 0) {
		return data.value;
	}
	return fallbackPreviewWorks;
});
</script>
