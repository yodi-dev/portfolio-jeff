<template>
	<main class="max-w-6xl mx-auto py-16 md:py-24 px-6 md:px-12">
		<!-- Title & Subtitle -->
		<div class="max-w-2xl mb-12 space-y-3">
			<span class="text-[10px] uppercase tracking-[0.25em] text-ink-muted block">Portfolio Archive</span>
			<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink">
				Works & Series
			</h1>
			<p class="text-xs md:text-sm text-ink-muted font-light leading-relaxed tracking-[0.03em]">
				A visual catalog of portraits, family chronicles, and environmental documentaries captured under ambient natural light.
			</p>
		</div>

		<!-- Category Filters (Minimalist Japanese Text Tabs) -->
		<div class="mb-14 overflow-x-auto pb-2 scrollbar-none border-b border-line/50">
			<ul class="flex items-center gap-6 md:gap-8 text-xs uppercase tracking-[0.2em] whitespace-nowrap">
				<li
					v-for="category in categories"
					:key="category"
				>
					<button
						type="button"
						:class="[
							'pb-3 transition-all duration-200',
							activeCategory === category
								? 'text-ink font-semibold border-b-2 border-ink'
								: 'text-ink-muted hover:text-ink font-normal border-b-2 border-transparent',
						]"
						@click="selectCategory(category)"
					>
						{{ category }}
					</button>
				</li>
			</ul>
		</div>

		<!-- Loading Skeleton -->
		<div
			v-if="pending"
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 animate-pulse"
		>
			<div
				v-for="i in 6"
				:key="i"
				class="space-y-3"
			>
				<div class="bg-line/40 aspect-[4/3]" />
				<div class="h-3 bg-line/50 w-24" />
				<div class="h-4 bg-line/40 w-48" />
			</div>
		</div>

		<!-- Works Grid (Editorial Exhibition Catalog) -->
		<div
			v-else-if="filteredWorks.length > 0"
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14"
		>
			<div
				v-for="(work, index) in filteredWorks"
				:key="work.id"
				class="group cursor-pointer space-y-3"
				@click="openLightbox(work)"
			>
				<!-- Thumbnail Frame -->
				<div class="relative overflow-hidden aspect-[4/3] bg-line/30">
					<img
						:src="resolveImageUrl(work.thumbnail)"
						:alt="work.title"
						class="w-full h-full object-cover transition-all duration-700 group-hover:opacity-90 group-hover:scale-[1.02]"
						loading="lazy"
						decoding="async"
						@error="onImageError"
					>
				</div>

				<!-- Minimalist Details Below Image -->
				<div class="space-y-1">
					<div class="flex justify-between items-baseline text-[11px] uppercase tracking-[0.2em] text-ink-muted font-mono">
						<span>{{ work.category || 'Series' }}</span>
						<span>{{ String(index + 1).padStart(2, '0') }}</span>
					</div>
					<h3 class="font-serif text-lg text-ink font-normal group-hover:opacity-60 transition-opacity">
						{{ work.title }}
					</h3>
					<p
						v-if="work.description"
						class="text-xs text-ink-muted line-clamp-2 font-light leading-relaxed pt-0.5 tracking-[0.02em]"
					>
						{{ work.description }}
					</p>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div
			v-else
			class="text-center py-20 border border-line/60 my-8"
		>
			<p class="font-serif text-xl text-ink font-light mb-2">
				No photographs found in “{{ activeCategory }}”
			</p>
			<p class="text-xs text-ink-muted mb-6 tracking-wider uppercase">
				New sessions are added regularly.
			</p>
			<button
				class="px-6 py-2.5 border border-ink text-xs uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-canvas transition-colors font-medium"
				@click="selectCategory('All')"
			>
				View All Works
			</button>
		</div>

		<!-- Lightbox / Exhibition View Modal -->
		<div
			v-if="activeWork"
			class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-sm transition-opacity"
			role="dialog"
			aria-modal="true"
			:aria-label="activeWork.title"
			@click.self="closeLightbox"
		>
			<div class="relative bg-canvas max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-line/40">
				<!-- Close Button -->
				<button
					class="absolute top-4 right-4 z-20 p-2 text-ink hover:opacity-60 transition-opacity bg-canvas/80 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-ink"
					aria-label="Close dialog"
					@click="closeLightbox"
				>
					<svg
						class="w-5 h-5 stroke-[1.5]"
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

				<!-- Modal Scrollable Content -->
				<div class="overflow-y-auto">
					<!-- Main High-Res Preview -->
					<div class="bg-black/5 flex items-center justify-center max-h-[62vh] overflow-hidden">
						<img
							:src="activeModalImage"
							:alt="activeWork.title"
							class="max-h-[62vh] w-auto object-contain mx-auto"
							decoding="async"
							@error="onImageError"
						>
					</div>

					<!-- Gallery Thumbnails (if multiple images exist) -->
					<div
						v-if="allModalImages.length > 1"
						class="flex gap-2 p-4 bg-canvas border-b border-line/50 overflow-x-auto"
					>
						<button
							v-for="(img, idx) in allModalImages"
							:key="idx"
							:class="[
								'relative overflow-hidden flex-shrink-0 w-16 h-16 border transition-all',
								activeModalImage === img ? 'border-ink opacity-100' : 'border-transparent opacity-50 hover:opacity-100',
							]"
							@click="activeModalImage = img"
						>
							<img
								:src="img"
								:alt="`${activeWork.title} - view ${idx + 1}`"
								class="w-full h-full object-cover"
								loading="lazy"
								decoding="async"
								@error="onImageError"
							>
						</button>
					</div>

					<!-- Exhibition Details -->
					<div class="p-6 md:p-8 space-y-4">
						<div class="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-ink-muted">
							<span>{{ activeWork.category || 'Series' }}</span>
							<span>{{ activeWork.created_at }}</span>
						</div>
						<h2 class="font-serif text-2xl md:text-3xl text-ink font-light">
							{{ activeWork.title }}
						</h2>
						<p
							v-if="activeWork.description"
							class="text-xs md:text-sm text-ink-muted font-light leading-relaxed tracking-[0.02em] max-w-2xl"
						>
							{{ activeWork.description }}
						</p>

						<div class="pt-6 border-t border-line/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
							<p class="text-[11px] text-ink-muted tracking-widest uppercase font-mono">
								Jef Lee Photography
							</p>
							<NuxtLink
								:to="`/booking?package=${encodeURIComponent(activeWork.category || 'Portrait')}`"
								class="px-5 py-2.5 border border-ink text-ink text-xs uppercase tracking-[0.2em] font-medium hover:bg-ink hover:text-canvas transition-colors"
							>
								Inquire About This Theme →
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useApi, type PortfolioItem } from "~/composables/useApi";

definePageMeta({
	layout: "default",
});

useSeoMeta({
	title: "Works & Series — Jef Lee Photography",
	ogTitle: "Works & Series — Jef Lee Photography",
	description: "Explore the photography catalog of Jef Lee. Natural light, portraiture, family moments, and documentary series across Australia and Kyoto.",
	ogDescription: "Explore the photography catalog of Jef Lee. Natural light, portraiture, family moments, and documentary series across Australia and Kyoto.",
	ogImage: "/images/preview1.jpeg",
	twitterCard: "summary_large_image",
	twitterTitle: "Works & Series — Jef Lee Photography",
	twitterDescription: "Explore the photography catalog of Jef Lee. Natural light, portraiture, family moments, and documentary series across Australia and Kyoto.",
	twitterImage: "/images/preview1.jpeg",
});

const { getPortfolios, resolveImageUrl, onImageError } = useApi();

const categories = [
	"All",
	"Family",
	"Portrait",
	"Couple",
	"Newborn",
	"Work Documentary",
	"Animal",
	"Plant",
	"Sports",
	"Event",
	"Celebration",
	"Travel",
];

const activeCategory = ref("All");

// Fallback items if backend is empty
const fallbackWorks: PortfolioItem[] = [
	{
		id: 101,
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
		created_at: "Oct 2026",
	},
	{
		id: 102,
		title: "Aria — Natural Light Golden Hour",
		slug: "aria-natural-light-golden-hour",
		category: "Portrait",
		description: "Capturing candid expressions under soft 35mm lens rendering. Focused on natural skin tones, ambient rim light, and effortless gaze.",
		thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: true,
		created_at: "Sep 2026",
	},
	{
		id: 103,
		title: "Liam & Chloe — Coastal Sunset Romance",
		slug: "liam-chloe-coastal-sunset-romance",
		category: "Couple",
		description: "An intimate couple session along the rugged coastline of Byron Bay. Unscripted laughter, hand-in-hand seaside walks, and twilight warmth.",
		thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: true,
		created_at: "Aug 2026",
	},
];

const { data, pending } = useLazyAsyncData("portfolios", async () => {
	try {
		const response = await getPortfolios();
		return response?.data || [];
	}
	catch (err) {
		console.warn("API getPortfolios unavailable, using fallback items:", err);
		return [];
	}
}, {
	default: () => [],
	getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
});

const worksList = computed<PortfolioItem[]>(() => {
	if (data.value && data.value.length > 0) {
		return data.value;
	}
	return fallbackWorks;
});

const filteredWorks = computed(() => {
	if (activeCategory.value === "All") {
		return worksList.value;
	}
	return worksList.value.filter(item =>
		(item.category || "").toLowerCase() === activeCategory.value.toLowerCase(),
	);
});

function selectCategory(cat: string) {
	activeCategory.value = cat;
}

// Lightbox state
const activeWork = ref<PortfolioItem | null>(null);
const activeModalImage = ref<string>("");

const allModalImages = computed(() => {
	if (!activeWork.value) return [];
	const images: string[] = [];
	if (activeWork.value.thumbnail) {
		images.push(resolveImageUrl(activeWork.value.thumbnail));
	}
	if (Array.isArray(activeWork.value.gallery)) {
		activeWork.value.gallery.forEach((img) => {
			const resolved = resolveImageUrl(img);
			if (!images.includes(resolved)) {
				images.push(resolved);
			}
		});
	}
	return images;
});

function openLightbox(work: PortfolioItem) {
	activeWork.value = work;
	activeModalImage.value = resolveImageUrl(work.thumbnail);
}

function closeLightbox() {
	activeWork.value = null;
	activeModalImage.value = "";
}

function handleKeydown(e: KeyboardEvent) {
	if (!activeWork.value) return;
	if (e.key === "Escape") {
		closeLightbox();
	}
	else if (e.key === "ArrowRight" && allModalImages.value.length > 1) {
		const currentIndex = allModalImages.value.indexOf(activeModalImage.value);
		const nextIndex = (currentIndex + 1) % allModalImages.value.length;
		activeModalImage.value = allModalImages.value[nextIndex];
	}
	else if (e.key === "ArrowLeft" && allModalImages.value.length > 1) {
		const currentIndex = allModalImages.value.indexOf(activeModalImage.value);
		const prevIndex = (currentIndex - 1 + allModalImages.value.length) % allModalImages.value.length;
		activeModalImage.value = allModalImages.value[prevIndex];
	}
}

watch(activeWork, (newVal) => {
	if (import.meta.client) {
		document.body.style.overflow = newVal ? "hidden" : "";
	}
});

onMounted(() => {
	window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
	window.removeEventListener("keydown", handleKeydown);
	if (import.meta.client) {
		document.body.style.overflow = "";
	}
});
</script>
