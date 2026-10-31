<template>
	<main class="py-16 sm:py-24 px-6 md:px-12 max-w-3xl mx-auto">
		<!-- Back to Writing -->
		<NuxtLink
			to="/writing"
			class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-ink transition-colors mb-12"
		>
			<span class="text-sm">←</span>
			<span>Writing & Thoughts</span>
		</NuxtLink>

		<!-- Loading State -->
		<div
			v-if="pending"
			class="space-y-6 animate-pulse"
		>
			<div class="h-3 bg-zinc-200 w-24" />
			<div class="h-10 bg-zinc-200 w-4/5" />
			<div class="aspect-[16/10] bg-zinc-200 my-8" />
			<div class="space-y-3">
				<div class="h-4 bg-zinc-200 w-full" />
				<div class="h-4 bg-zinc-200 w-full" />
				<div class="h-4 bg-zinc-200 w-3/4" />
			</div>
		</div>

		<!-- Article Details -->
		<article v-else-if="post">
			<!-- Article Header -->
			<header class="mb-10 sm:mb-14">
				<div class="flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-400 mb-4 font-mono">
					<span>{{ post.created_at }}</span>
					<span class="text-zinc-300">/</span>
					<span>Jeff Lee</span>
				</div>
				<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight leading-tight">
					{{ post.title }}
				</h1>
			</header>

			<!-- Cover Image -->
			<div
				v-if="post.cover_image"
				class="mb-12 overflow-hidden aspect-[16/10] bg-zinc-100"
			>
				<img
					:src="resolveImageUrl(post.cover_image)"
					:alt="post.title"
					class="w-full h-full object-cover"
					loading="lazy"
					decoding="async"
					@error="onImageError"
				>
			</div>

			<!-- Editorial Content -->
			<div class="text-zinc-700 font-light text-base sm:text-lg leading-relaxed space-y-7">
				<p
					v-for="(paragraph, index) in paragraphs"
					:key="index"
					class="first-of-type:text-ink first-of-type:font-normal"
				>
					{{ paragraph }}
				</p>
			</div>

			<!-- Editorial Footer / Colophon -->
			<footer class="mt-20 pt-10 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
				<div class="flex items-center gap-4">
					<img
						src="/images/jeff-portrait.jpeg"
						alt="Jeff Lee"
						class="w-12 h-12 object-cover grayscale brightness-95"
					>
					<div>
						<h3 class="font-serif text-base text-ink tracking-wide font-normal">
							Jeff Lee
						</h3>
						<p class="text-xs text-zinc-400 tracking-wider">
							Natural Light & Storytelling Photographer
						</p>
					</div>
				</div>
				<NuxtLink
					to="/booking"
					class="text-xs uppercase tracking-widest text-ink hover:text-zinc-500 border border-ink hover:border-zinc-500 px-5 py-2.5 transition-colors duration-200"
				>
					Commission Session →
				</NuxtLink>
			</footer>
		</article>

		<!-- Not Found State -->
		<div
			v-else
			class="text-center py-24 space-y-4"
		>
			<h2 class="font-serif text-2xl sm:text-3xl font-light text-ink">
				Article Not Found
			</h2>
			<p class="text-xs uppercase tracking-widest text-zinc-400">
				The story you are looking for has been moved or does not exist.
			</p>
			<div class="pt-4">
				<NuxtLink
					to="/writing"
					class="inline-block text-xs uppercase tracking-widest border border-ink text-ink hover:bg-ink hover:text-white px-5 py-2.5 transition-colors"
				>
					Return to Index
				</NuxtLink>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useApi, type ArticleItem } from "~/composables/useApi";

definePageMeta({
	layout: "default",
});

const route = useRoute();
const slug = route.params.slug as string;
const { getArticle, resolveImageUrl, onImageError } = useApi();

// Fallback articles
const fallbackArticles: Record<string, ArticleItem> = {
	"golden-hour": {
		id: 101,
		title: "The Magic of Golden Hour",
		slug: "golden-hour",
		excerpt: "Golden hour is every photographer’s best friend.",
		content: "Golden hour is a magical time for photographers. The soft, warm light can transform ordinary scenes into breathtaking images.\n\nI often schedule sessions during the 60 minutes before sunset to take advantage of the gentle contrast, golden highlights, and long, flattering shadows.\n\nIn portraiture, this light brings an emotional depth that flash photography struggles to replicate naturally.",
		cover_image: "/images/preview1.jpeg",
		is_highlight: true,
		created_at: "10 Jul 2026",
	},
	"family-photography": {
		id: 102,
		title: "Why I Love Family Photography",
		slug: "family-photography",
		excerpt: "Family sessions are not just photos—they’re pieces of history.",
		content: "Family photography is about more than just posed smiles. It is about capturing authentic connection, unscripted laughter, and tender glances between generations.\n\nEvery session brings something new and reminds me why I love what I do—preserving moments that families will cherish for decades to come.",
		cover_image: "/images/preview2.jpeg",
		is_highlight: false,
		created_at: "28 Jun 2026",
	},
	"minimal-gear": {
		id: 103,
		title: "Minimal Gear, Maximum Impact",
		slug: "minimal-gear",
		excerpt: "You don’t always need a studio full of equipment.",
		content: "Having the most expensive camera doesn’t automatically make a great image. Sometimes, creativity matters far more than equipment.\n\nWith a simple prime lens and an observant eye, you can focus on what truly matters: the story, light, and authentic emotion behind each frame.",
		cover_image: "/images/preview3.jpeg",
		is_highlight: false,
		created_at: "15 Jun 2026",
	},
};

// Fetch from API (non-blocking with cache)
const { data, pending } = useLazyAsyncData(`article-${slug}`, async () => {
	try {
		const response = await getArticle(slug);
		return response?.data || null;
	}
	catch (err) {
		console.warn(`API getArticle(${slug}) unavailable, falling back to local dataset:`, err);
		return fallbackArticles[slug] || null;
	}
}, {
	default: () => null,
	getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
});

const post = computed<ArticleItem | null>(() => {
	if (data.value) return data.value;
	return fallbackArticles[slug] || null;
});

const paragraphs = computed(() => {
	if (!post.value || !post.value.content) return [];
	return post.value.content
		.split("\n")
		.map(p => p.trim())
		.filter(p => p.length > 0);
});

useHead({
	title: computed(() => post.value ? `${post.value.title} — Jeff Lee` : "Story — Jeff Lee"),
});
</script>
