<template>
	<main class="max-w-4xl mx-auto py-16 md:py-24 px-6 md:px-12">
		<!-- Header -->
		<div class="mb-16 space-y-3">
			<span class="text-[10px] uppercase tracking-[0.25em] text-ink-muted block">Journal & Essays</span>
			<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink">
				Writing & Reflections
			</h1>
			<p class="text-xs md:text-sm text-ink-muted font-light leading-relaxed tracking-[0.03em] max-w-lg">
				Personal thoughts, field notes, and reflections on natural light, memory, and authentic connection.
			</p>
		</div>

		<!-- Loading Skeleton -->
		<div
			v-if="pending"
			class="space-y-12 animate-pulse"
		>
			<div
				v-for="i in 3"
				:key="i"
				class="space-y-3 border-b border-line/50 pb-10"
			>
				<div class="h-3 bg-line/50 w-24" />
				<div class="h-6 bg-line/40 w-3/4" />
				<div class="h-4 bg-line/30 w-full" />
			</div>
		</div>

		<!-- Articles List (Editorial Japanese Journal Style) -->
		<div
			v-else
			class="divide-y divide-line/60"
		>
			<article
				v-for="post in articlesList"
				:key="post.id"
				class="group py-12 md:py-16 first:pt-0"
			>
				<div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
					<!-- Cover Image (Clean Print Aspect) -->
					<div
						v-if="post.cover_image"
						class="md:col-span-5 aspect-[16/10] overflow-hidden bg-line/30 order-first md:order-last"
					>
						<NuxtLink :to="`/writing/${post.slug}`">
							<img
								:src="resolveImageUrl(post.cover_image)"
								:alt="post.title"
								class="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-90"
								loading="lazy"
								decoding="async"
								@error="onImageError"
							>
						</NuxtLink>
					</div>

					<!-- Content Info -->
					<div :class="[post.cover_image ? 'md:col-span-7' : 'md:col-span-12', 'space-y-3']">
						<span class="text-[11px] uppercase tracking-[0.22em] text-ink-muted font-mono block">
							{{ post.created_at }} — Essay
						</span>

						<h2 class="font-serif text-2xl md:text-3xl font-normal text-ink group-hover:opacity-60 transition-opacity leading-snug">
							<NuxtLink :to="`/writing/${post.slug}`">
								{{ post.title }}
							</NuxtLink>
						</h2>

						<p class="text-xs md:text-sm text-ink-muted font-light leading-relaxed tracking-[0.02em] line-clamp-3">
							{{ post.excerpt || post.content }}
						</p>

						<div class="pt-2">
							<NuxtLink
								:to="`/writing/${post.slug}`"
								class="text-xs uppercase tracking-[0.18em] font-medium text-ink hover:opacity-60 transition-opacity inline-flex items-center gap-1 border-b border-ink pb-0.5"
							>
								Read Story →
							</NuxtLink>
						</div>
					</div>
				</div>
			</article>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useApi, type ArticleItem } from "~/composables/useApi";

definePageMeta({
	layout: "default",
});

useSeoMeta({
	title: "Writing & Journal — Jef Lee Photography",
	ogTitle: "Writing & Journal — Jef Lee Photography",
	description: "Reflections, essays, and field notes on natural light, memory, and authentic documentary photography by Jef Lee.",
	ogDescription: "Reflections, essays, and field notes on natural light, memory, and authentic documentary photography by Jef Lee.",
	ogImage: "/images/preview2.jpeg",
	twitterCard: "summary_large_image",
	twitterTitle: "Writing & Journal — Jef Lee Photography",
	twitterDescription: "Reflections, essays, and field notes on natural light, memory, and authentic documentary photography by Jef Lee.",
	twitterImage: "/images/preview2.jpeg",
});

const { getArticles, resolveImageUrl, onImageError } = useApi();

// Fallback articles
const fallbackArticles: ArticleItem[] = [
	{
		id: 201,
		title: "The Magic of Golden Hour",
		slug: "the-magic-of-golden-hour",
		excerpt: "Golden hour is every photographer’s best friend. Here is how I use ambient natural light to craft timeless photographs without heavy artificial equipment.",
		content: "The golden hour provides the most flattering, warm natural light for portrait photography. In this guide, we explore the essential camera settings, framing techniques, and lens recommendations to make every shot count.",
		cover_image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
		is_highlight: true,
		created_at: "Oct 2026",
	},
	{
		id: 202,
		title: "Why I Love Family Photography",
		slug: "why-i-love-family-photography",
		excerpt: "Family sessions are not just photos—they are living pieces of history that bridge generations. Here are reflections on documenting intimate family milestones.",
		content: "Family photography is about far more than matching outfits or posed smiles looking directly into the camera lens. It is about capturing connection: the spontaneous burst of laughter when dad spins a toddler around.",
		cover_image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop",
		is_highlight: true,
		created_at: "Sep 2026",
	},
	{
		id: 203,
		title: "Minimal Gear, Maximum Impact",
		slug: "minimal-gear-maximum-impact",
		excerpt: "Having an arsenal of camera lenses does not make an image evocative. Here is why I choose a single prime lens and deep human rapport.",
		content: "Early in my photography journey, I thought the secret to better photos lay inside gear catalogs. Today, I shoot almost 90% of my sessions with a single 35mm or 50mm prime lens.",
		cover_image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
		is_highlight: true,
		created_at: "Aug 2026",
	},
];

const { data, pending } = useLazyAsyncData("articles", async () => {
	try {
		const response = await getArticles();
		return response?.data || [];
	}
	catch (err) {
		console.warn("API getArticles unavailable, using fallback items:", err);
		return [];
	}
}, {
	default: () => [],
	getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
});

const articlesList = computed<ArticleItem[]>(() => {
	if (data.value && data.value.length > 0) {
		return data.value;
	}
	return fallbackArticles;
});
</script>
