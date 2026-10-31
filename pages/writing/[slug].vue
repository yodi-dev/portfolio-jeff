<template>
	<div class="py-16 sm:py-24 px-6 md:px-12 max-w-3xl mx-auto">
		<!-- Back to Writing -->
		<NuxtLink
			to="/writing"
			class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-ink transition-colors mb-12"
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
				<div class="flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-500 mb-4 font-mono">
					<span>{{ post.created_at }}</span>
					<span class="text-zinc-300">/</span>
					<span>Jef Lee</span>
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

			<!-- Editorial Content (Formatted Rich HTML or Plain Paragraphs) -->
			<div
				v-if="isHtmlContent"
				class="editorial-prose font-light text-base sm:text-lg text-zinc-700 leading-relaxed [&>p]:mb-7 [&>p]:leading-relaxed [&>p:first-of-type]:text-ink [&>p:first-of-type]:font-normal [&>h2]:font-serif [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-light [&>h2]:text-ink [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:text-ink [&>h3]:font-normal [&>h3]:mt-8 [&>h3]:mb-3 [&>blockquote]:border-l-2 [&>blockquote]:border-ink/50 [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-ink [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 [&>ol]:space-y-2 [&>a]:text-ink [&>a]:underline [&>a]:underline-offset-4 [&>img]:my-8 [&>img]:w-full"
				v-html="post.content"
			/>
			<div
				v-else
				class="text-zinc-700 font-light text-base sm:text-lg leading-relaxed space-y-7"
			>
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
						alt="Jef Lee"
						class="w-12 h-12 object-cover grayscale brightness-95"
					>
					<div>
						<h3 class="font-serif text-base text-ink tracking-wide font-normal">
							Jef Lee
						</h3>
						<p class="text-xs text-zinc-500 tracking-wider">
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
			<p class="text-xs uppercase tracking-widest text-zinc-500">
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
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useApi, type ArticleItem } from "~/composables/useApi";

definePageMeta({
	layout: "default",
});

const route = useRoute();
const currentSlug = computed(() => (route.params.slug as string) || "");
const { getArticle, resolveImageUrl, onImageError } = useApi();

// Fallback articles with aliases for both long and short slug forms
const fallbackArticles: Record<string, ArticleItem> = {
	"golden-hour": {
		id: 101,
		title: "The Magic of Golden Hour",
		slug: "golden-hour",
		excerpt: "Golden hour is every photographer’s best friend.",
		content: "Golden hour is a magical time for photographers. The soft, warm light can transform ordinary scenes into breathtaking images.\n\nI often schedule sessions during the 60 minutes before sunset to take advantage of the gentle contrast, golden highlights, and long, flattering shadows.\n\nIn portraiture, this light brings an emotional depth that flash photography struggles to replicate naturally.",
		cover_image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
		is_highlight: true,
		created_at: "10 Jul 2026",
	},
	"the-magic-of-golden-hour": {
		id: 101,
		title: "The Magic of Golden Hour",
		slug: "the-magic-of-golden-hour",
		excerpt: "Golden hour is every photographer’s best friend.",
		content: "Golden hour is a magical time for photographers. The soft, warm light can transform ordinary scenes into breathtaking images.\n\nI often schedule sessions during the 60 minutes before sunset to take advantage of the gentle contrast, golden highlights, and long, flattering shadows.\n\nIn portraiture, this light brings an emotional depth that flash photography struggles to replicate naturally.",
		cover_image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
		is_highlight: true,
		created_at: "10 Jul 2026",
	},
	"e2e-golden-hour-portrait-secrets": {
		id: 101,
		title: "E2E Golden Hour Portrait Secrets",
		slug: "e2e-golden-hour-portrait-secrets",
		excerpt: "The golden hour provides the most flattering, warm natural light for portrait photography.",
		content: "The golden hour provides the most flattering, warm natural light for portrait photography. In this guide, we explore the essential camera settings, framing techniques, and lens recommendations to make every shot count.",
		cover_image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80",
		is_highlight: true,
		created_at: "29 Oct 2026",
	},
	"family-photography": {
		id: 102,
		title: "Why I Love Family Photography",
		slug: "family-photography",
		excerpt: "Family sessions are not just photos—they’re pieces of history.",
		content: "Family photography is about more than just posed smiles. It is about capturing authentic connection, unscripted laughter, and tender glances between generations.\n\nEvery session brings something new and reminds me why I love what I do—preserving moments that families will cherish for decades to come.",
		cover_image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop",
		is_highlight: false,
		created_at: "28 Jun 2026",
	},
	"why-i-love-family-photography": {
		id: 102,
		title: "Why I Love Family Photography",
		slug: "why-i-love-family-photography",
		excerpt: "Family sessions are not just photos—they’re pieces of history.",
		content: "Family photography is about more than just posed smiles. It is about capturing authentic connection, unscripted laughter, and tender glances between generations.\n\nEvery session brings something new and reminds me why I love what I do—preserving moments that families will cherish for decades to come.",
		cover_image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop",
		is_highlight: false,
		created_at: "28 Jun 2026",
	},
	"minimal-gear": {
		id: 103,
		title: "Minimal Gear, Maximum Impact",
		slug: "minimal-gear",
		excerpt: "You don’t always need a studio full of equipment.",
		content: "Having the most expensive camera doesn’t automatically make a great image. Sometimes, creativity matters far more than equipment.\n\nWith a simple prime lens and an observant eye, you can focus on what truly matters: the story, light, and authentic emotion behind each frame.",
		cover_image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
		is_highlight: false,
		created_at: "15 Jun 2026",
	},
	"minimal-gear-maximum-impact": {
		id: 103,
		title: "Minimal Gear, Maximum Impact",
		slug: "minimal-gear-maximum-impact",
		excerpt: "You don’t always need a studio full of equipment.",
		content: "Having the most expensive camera doesn’t automatically make a great image. Sometimes, creativity matters far more than equipment.\n\nWith a simple prime lens and an observant eye, you can focus on what truly matters: the story, light, and authentic emotion behind each frame.",
		cover_image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
		is_highlight: false,
		created_at: "15 Jun 2026",
	},
	"sydney-mornings": {
		id: 104,
		title: "Chasing Sydney Mornings: Coastal Walks with a Camera",
		slug: "sydney-mornings",
		excerpt: "Before the city awakens, the coastline belongs to the gentle roar of waves and soft pastel hues of early dawn.",
		content: "There is a profound stillness that envelops Sydney's coastal cliffs at 5:30 in the morning. Long before the joggers and surfers pack the promenade, the sky turns shades of lilac, blush pink, and pale gold.\n\nWalking the coastal path from Bondi to Bronte with a camera in hand has been my greatest teacher.",
		cover_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
		is_highlight: false,
		created_at: "26 Oct 2026",
	},
};

// Fetch from API (non-blocking with cache and reactivity)
const { data, pending } = useLazyAsyncData(
	`article-${route.params.slug}`,
	async () => {
		const s = (route.params.slug as string) || "";
		if (!s) return null;
		try {
			const response = await getArticle(s);
			return response?.data || null;
		}
		catch (err) {
			console.warn(`API getArticle(${s}) unavailable, falling back to local dataset:`, err);
			return fallbackArticles[s] || null;
		}
	},
	{
		watch: [() => route.params.slug],
		default: () => fallbackArticles[(route.params.slug as string) || ""] || null,
		getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
	},
);

const post = computed<ArticleItem | null>(() => {
	if (data.value) return data.value;
	return fallbackArticles[(route.params.slug as string) || ""] || null;
});

const isHtmlContent = computed(() => {
	if (!post.value || !post.value.content) return false;
	return /<\/?[a-z][\s\S]*>/i.test(post.value.content);
});

const paragraphs = computed(() => {
	if (!post.value || !post.value.content) return [];
	return post.value.content
		.split("\n")
		.map(p => p.trim())
		.filter(p => p.length > 0);
});

useSeoMeta({
	title: () => (post.value ? `${post.value.title} — Jef Lee` : "Story — Jef Lee"),
	ogTitle: () => (post.value ? `${post.value.title} — Jef Lee` : "Story — Jef Lee"),
	description: () => (post.value?.excerpt || post.value?.title || "Reflections on natural light and photography by Jef Lee."),
	ogDescription: () => (post.value?.excerpt || post.value?.title || "Reflections on natural light and photography by Jef Lee."),
	ogImage: () => (post.value?.cover_image ? resolveImageUrl(post.value.cover_image) : "/images/preview2.jpeg"),
	ogType: "article",
	twitterCard: "summary_large_image",
	twitterTitle: () => (post.value ? `${post.value.title} — Jef Lee` : "Story — Jef Lee"),
	twitterDescription: () => (post.value?.excerpt || post.value?.title || "Reflections on natural light and photography by Jef Lee."),
	twitterImage: () => (post.value?.cover_image ? resolveImageUrl(post.value.cover_image) : "/images/preview2.jpeg"),
});
</script>
