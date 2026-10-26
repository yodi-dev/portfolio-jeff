<template>
	<main class="container py-24 px-6 md:px-10 max-w-3xl mx-auto">
		<!-- Back Link -->
		<NuxtLink
			to="/writing"
			class="inline-flex items-center gap-1.5 text-sm text-brand font-medium hover:underline mb-8"
		>
			← Back to Stories & Reflections
		</NuxtLink>

		<!-- Loading State -->
		<div
			v-if="pending"
			class="space-y-4 animate-pulse"
		>
			<div class="h-10 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
			<div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
			<div class="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl my-6" />
			<div class="space-y-2">
				<div class="h-4 bg-gray-100 dark:bg-gray-800 rounded" />
				<div class="h-4 bg-gray-100 dark:bg-gray-800 rounded" />
				<div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
			</div>
		</div>

		<article v-else-if="post">
			<!-- Article Header -->
			<header class="mb-8">
				<div class="flex items-center gap-3 text-xs text-gray-400 mb-3 font-medium">
					<span>{{ post.created_at }}</span>
					<span>•</span>
					<span>By Jeff Lee</span>
				</div>
				<h1 class="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight">
					{{ post.title }}
				</h1>
			</header>

			<!-- Cover Image -->
			<div
				v-if="post.cover_image"
				class="mb-10 rounded-2xl overflow-hidden aspect-[16/9] bg-gray-100 dark:bg-gray-900 shadow-md"
			>
				<img
					:src="resolveImageUrl(post.cover_image)"
					:alt="post.title"
					class="w-full h-full object-cover"
				>
			</div>

			<!-- Content -->
			<div class="prose dark:prose-invert max-w-none text-text-light dark:text-text-dark text-base md:text-lg leading-relaxed space-y-6">
				<p
					v-for="(paragraph, index) in paragraphs"
					:key="index"
				>
					{{ paragraph }}
				</p>
			</div>

			<!-- Author Card & CTA -->
			<footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
				<div class="flex items-center gap-4">
					<img
						src="/images/jeff-portrait.jpeg"
						alt="Jeff Lee"
						class="w-14 h-14 rounded-full object-cover shadow"
					>
					<div>
						<h3 class="font-semibold text-text-light dark:text-text-dark">
							Jeff Lee
						</h3>
						<p class="text-xs text-gray-400">
							Storytelling & Portrait Photographer
						</p>
					</div>
				</div>
				<NuxtLink
					to="/booking"
					class="px-5 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-full text-sm font-medium transition-colors"
				>
					Book a Session with Jeff
				</NuxtLink>
			</footer>
		</article>

		<!-- Not Found State -->
		<div
			v-else
			class="text-center py-20"
		>
			<h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
				Story Not Found
			</h2>
			<p class="text-gray-500 mb-6">
				The article you are looking for doesn't exist or has been moved.
			</p>
			<NuxtLink
				to="/writing"
				class="px-5 py-2 bg-brand text-white rounded-full text-sm font-medium"
			>
				Return to Writing List
			</NuxtLink>
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
const { getArticle, resolveImageUrl } = useApi();

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

// Fetch from API
const { data, pending } = await useAsyncData(`article-${slug}`, async () => {
	try {
		const response = await getArticle(slug);
		return response?.data || null;
	}
	catch (err) {
		console.warn(`API getArticle(${slug}) unavailable, falling back to local dataset:`, err);
		return fallbackArticles[slug] || null;
	}
}, { default: () => null });

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
	title: computed(() => post.value ? `${post.value.title} — Jeff Lee` : "Story — Jeff Lee Photography"),
});
</script>
