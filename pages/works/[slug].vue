<template>
	<div class="py-16 sm:py-24 px-6 md:px-12 max-w-5xl mx-auto">
		<!-- Back to Works Breadcrumb -->
		<NuxtLink
			to="/works"
			class="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink-muted hover:text-ink transition-colors mb-10 sm:mb-14 font-mono group"
		>
			<span class="transition-transform group-hover:-translate-x-1">←</span>
			<span>All Works & Series</span>
		</NuxtLink>

		<!-- Loading State Skeleton -->
		<div
			v-if="pending"
			class="space-y-8 animate-pulse"
		>
			<div class="space-y-3">
				<div class="h-3 bg-line/60 w-32" />
				<div class="h-10 bg-line/60 w-3/4" />
				<div class="h-4 bg-line/40 w-full max-w-xl" />
			</div>
			<div class="aspect-[16/10] bg-line/40 w-full" />
			<div class="grid grid-cols-2 gap-4">
				<div class="aspect-[4/3] bg-line/30" />
				<div class="aspect-[4/3] bg-line/30" />
			</div>
		</div>

		<!-- Work Details -->
		<article
			v-else-if="work"
			class="space-y-12 sm:space-y-16"
		>
			<!-- Series Header -->
			<header class="max-w-3xl space-y-4">
				<div class="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ink-muted font-mono">
					<span>{{ work.category || 'Series' }}</span>
					<span class="text-ink-muted/40">/</span>
					<span>{{ work.created_at }}</span>
					<span
						v-if="work.is_highlight"
						class="text-amber-600 dark:text-amber-400 font-medium ml-1"
					>★ Highlight</span>
				</div>
				<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-ink tracking-tight leading-[1.15]">
					{{ work.title }}
				</h1>
				<p
					v-if="work.description"
					class="text-xs sm:text-sm md:text-base text-ink-muted font-light leading-relaxed tracking-[0.02em] pt-2"
				>
					{{ work.description }}
				</p>
			</header>

			<!-- Primary Hero Photograph (Click to Open Lightbox) -->
			<div
				class="overflow-hidden bg-line/30 aspect-[16/10] sm:aspect-[16/9] relative group cursor-pointer"
				@click="openLightbox(resolveImageUrl(work.thumbnail))"
			>
				<img
					:src="resolveImageUrl(work.thumbnail)"
					:alt="work.title"
					class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
					loading="eager"
					decoding="async"
					width="1400"
					height="900"
					@error="onImageError"
				>
				<div class="absolute bottom-4 right-4 bg-canvas/80 backdrop-blur-sm text-ink px-3 py-1.5 text-[10px] uppercase font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
					Click to Expand ↗
				</div>
			</div>

			<!-- Exhibition Gallery (Series Photographs) -->
			<section
				v-if="galleryImages.length > 0"
				class="space-y-8 pt-4"
			>
				<div class="flex items-baseline justify-between border-b border-line/60 pb-3">
					<h2 class="font-serif text-xl sm:text-2xl text-ink font-light">
						Series Gallery
					</h2>
					<span class="text-[11px] uppercase tracking-[0.2em] text-ink-muted font-mono">
						{{ galleryImages.length + 1 }} Photographs
					</span>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
					<div
						v-for="(photo, idx) in galleryImages"
						:key="idx"
						class="overflow-hidden bg-line/20 aspect-[4/3] group relative cursor-pointer"
						@click="openLightbox(resolveImageUrl(photo))"
					>
						<img
							:src="resolveImageUrl(photo)"
							:alt="`${work.title} photograph ${idx + 1}`"
							class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
							loading="lazy"
							decoding="async"
							width="900"
							height="675"
							@error="onImageError"
						>
						<div class="absolute bottom-3 right-3 bg-canvas/80 backdrop-blur-sm text-ink px-2.5 py-1 text-[9px] uppercase font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
							View Frame
						</div>
					</div>
				</div>
			</section>

			<!-- Colophon / Inquiry Action -->
			<footer class="pt-12 sm:pt-16 border-t border-line/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
				<div class="space-y-1">
					<p class="text-xs uppercase tracking-[0.2em] font-mono text-ink-muted">
						Photographed by {{ profile.name }}
					</p>
					<p class="text-xs text-ink-muted/80 font-light">
						Available for tailored portraiture, quiet documentaries, and family milestones.
					</p>
				</div>
				<NuxtLink
					:to="`/booking?package=${encodeURIComponent(work.category || 'Portrait')}`"
					class="px-6 py-3 border border-ink text-ink text-xs uppercase tracking-[0.2em] font-medium hover:bg-ink hover:text-canvas transition-colors whitespace-nowrap"
				>
					Inquire About This Session →
				</NuxtLink>
			</footer>
		</article>

		<!-- 404 Not Found -->
		<div
			v-else
			class="py-20 text-center space-y-4"
		>
			<h2 class="font-serif text-2xl sm:text-3xl font-light text-ink">
				Portfolio Work Not Found
			</h2>
			<p class="text-xs uppercase tracking-widest text-ink-muted font-mono">
				The gallery or series you are looking for has been moved or is currently in draft.
			</p>
			<div class="pt-4">
				<NuxtLink
					to="/works"
					class="inline-block text-xs uppercase tracking-[0.2em] border border-ink text-ink hover:bg-ink hover:text-canvas px-6 py-2.5 transition-colors font-medium"
				>
					Return to Works Catalog
				</NuxtLink>
			</div>
		</div>

		<!-- Lightbox Fullscreen Modal -->
		<div
			v-if="lightboxImage"
			class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md transition-opacity"
			role="dialog"
			aria-modal="true"
			aria-label="High-resolution photograph preview"
			@click.self="closeLightbox"
		>
			<button
				class="absolute top-6 right-6 z-20 min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 text-white/80 hover:text-white transition-opacity bg-black/40 rounded-full focus:outline-none"
				aria-label="Close dialog"
				@click="closeLightbox"
			>
				<svg
					class="w-6 h-6 stroke-[1.5]"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<div class="relative max-w-6xl max-h-[90vh] flex items-center justify-center">
				<img
					:src="lightboxImage"
					alt="Full resolution preview"
					class="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useApi, type PortfolioItem, type PhotographerProfile } from "~/composables/useApi";
import { useSeo } from "~/composables/useSeo";

definePageMeta({
	layout: "default",
});

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { getPortfolio, getProfile, resolveImageUrl, onImageError } = useApi();
const { toAbsoluteUrl, setSchema } = useSeo();

const defaultProfile: PhotographerProfile = {
	id: 1,
	name: "Jef Lee",
	tagline: "Natural Light & Storytelling Photographer",
	headline: "Telling honest stories through natural light and quiet moments.",
	avatar: "/images/jeff-portrait.jpeg",
};

const { data: profileData } = useLazyAsyncData("photographer-profile-works-detail", async () => {
	try {
		const res = await getProfile();
		return res?.data || null;
	}
	catch {
		return null;
	}
}, {
	default: () => null,
	getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
});

const profile = computed<PhotographerProfile>(() => {
	return profileData.value || defaultProfile;
});

// Fallback portfolios if API is offline or during SSR
const fallbackPortfolios: Record<string, PortfolioItem> = {
	"the-campbell-family-at-manly-beach": {
		id: 2,
		title: "The Campbell Family at Manly Beach",
		slug: "the-campbell-family-at-manly-beach",
		category: "Family",
		description: "A relaxed, barefoot late-afternoon session with the Campbell family. Golden sunlight bouncing off the pacific ocean as their two young boys played tag in the sand.",
		thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1200&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: true,
		created_at: "26 Oct 2026",
	},
	"aria-natural-light-golden-hour": {
		id: 3,
		title: "Aria — Natural Light Golden Hour",
		slug: "aria-natural-light-golden-hour",
		category: "Portrait",
		description: "A quiet editorial portrait study of Aria amidst the soft golden hour glow along the coast.",
		thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
		gallery: [],
		is_highlight: true,
		created_at: "26 Oct 2026",
	},
	"liam-chloe-coastal-sunset-romance": {
		id: 4,
		title: "Liam & Chloe — Coastal Sunset Romance",
		slug: "liam-chloe-coastal-sunset-romance",
		category: "Couple",
		description: "An intimate anniversary session walking along the ocean bluffs at twilight.",
		thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
		gallery: [],
		is_highlight: true,
		created_at: "26 Oct 2026",
	},
	"great-ocean-road-odyssey": {
		id: 12,
		title: "Great Ocean Road Odyssey",
		slug: "great-ocean-road-odyssey",
		category: "Work Documentary",
		description: "A documentary exploration along the windswept southern coastline of Australia.",
		thumbnail: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
		gallery: [],
		is_highlight: true,
		created_at: "26 Oct 2026",
	},
	"family-session": {
		id: 1,
		title: "Family Session at Sunset",
		slug: "family-session",
		category: "Family",
		description: "Cherished moments with family under the setting sun.",
		thumbnail: "/images/preview1.jpeg",
		gallery: ["/images/preview2.jpeg"],
		is_highlight: true,
		created_at: "Oct 2026",
	},
	"portrait-shot": {
		id: 2,
		title: "Natural Light Portrait",
		slug: "portrait-shot",
		category: "Portrait",
		description: "Quiet portraits captured in available ambient light.",
		thumbnail: "/images/preview2.jpeg",
		gallery: ["/images/preview3.jpeg"],
		is_highlight: true,
		created_at: "Sep 2026",
	},
	"couple-moment": {
		id: 3,
		title: "Couple Moment by the Coast",
		slug: "couple-moment",
		category: "Couple",
		description: "Authentic moments between couples by the Australian ocean shoreline.",
		thumbnail: "/images/preview3.jpeg",
		gallery: ["/images/preview1.jpeg"],
		is_highlight: true,
		created_at: "Aug 2026",
	},
};

const { data: apiData, pending } = useLazyAsyncData(`portfolio-detail-${slug.value}`, async () => {
	try {
		const res = await getPortfolio(slug.value);
		return res?.data || null;
	}
	catch {
		return null;
	}
}, {
	default: () => null,
	getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
});

const work = computed<PortfolioItem | null>(() => {
	if (apiData.value) return apiData.value;
	return fallbackPortfolios[slug.value] || null;
});

const galleryImages = computed<string[]>(() => {
	if (!work.value?.gallery) return [];
	return work.value.gallery;
});

// Lightbox state
const lightboxImage = ref<string | null>(null);

const openLightbox = (url: string) => {
	lightboxImage.value = url;
};

const closeLightbox = () => {
	lightboxImage.value = null;
};

const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === "Escape" && lightboxImage.value) {
		closeLightbox();
	}
};

onMounted(() => {
	if (typeof window !== "undefined") {
		window.addEventListener("keydown", handleKeyDown);
	}
});

onBeforeUnmount(() => {
	if (typeof window !== "undefined") {
		window.removeEventListener("keydown", handleKeyDown);
	}
});

useSeoMeta({
	title: computed(() => work.value ? `${work.value.title} — Jef Lee Photography` : "Portfolio — Jef Lee Photography"),
	ogTitle: computed(() => work.value ? `${work.value.title} — Jef Lee Photography` : "Portfolio — Jef Lee Photography"),
	description: computed(() => work.value?.description || "Explore curated photographs by Jef Lee."),
	ogDescription: computed(() => work.value?.description || "Explore curated photographs by Jef Lee."),
	ogImage: computed(() => work.value?.thumbnail ? resolveImageUrl(work.value.thumbnail) : toAbsoluteUrl("/images/preview1.jpeg")),
	twitterCard: "summary_large_image",
	twitterTitle: computed(() => work.value ? `${work.value.title} — Jef Lee Photography` : "Portfolio — Jef Lee Photography"),
	twitterDescription: computed(() => work.value?.description || "Explore curated photographs by Jef Lee."),
	twitterImage: computed(() => work.value?.thumbnail ? resolveImageUrl(work.value.thumbnail) : toAbsoluteUrl("/images/preview1.jpeg")),
});

setSchema(computed(() => {
	if (!work.value) return [];
	return [{
		"@context": "https://schema.org",
		"@type": "VisualArtwork",
		"name": work.value.title,
		"headline": work.value.title,
		"description": work.value.description,
		"image": work.value.thumbnail ? resolveImageUrl(work.value.thumbnail) : undefined,
		"creator": {
			"@type": "Person",
			"name": profile.value.name,
		},
		"genre": work.value.category,
	}];
}));
</script>
