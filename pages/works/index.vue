<template>
	<main class="container py-24 px-6 md:px-10">
		<!-- Title & Subtitle -->
		<div class="max-w-3xl mb-8">
			<h1 class="text-3xl md:text-4xl font-semibold mb-3 text-brand">
				Portfolio
			</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Explore a collection of authentic moments, candid stories, and natural light photography organized by theme.
			</p>
		</div>

		<!-- Category Filters -->
		<div class="mb-10 overflow-x-auto pb-2">
			<ul class="flex flex-wrap gap-2 md:gap-3 text-sm">
				<li
					v-for="category in categories"
					:key="category"
				>
					<button
						type="button"
						:class="[
							'px-3.5 py-1.5 rounded-full border transition-all duration-200 font-medium',
							activeCategory === category
								? 'bg-brand text-white border-brand shadow-sm'
								: 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand hover:text-brand',
						]"
						@click="selectCategory(category)"
					>
						{{ category }}
					</button>
				</li>
			</ul>
		</div>

		<!-- Loading State -->
		<div
			v-if="pending"
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse"
		>
			<div
				v-for="i in 6"
				:key="i"
				class="bg-gray-200 dark:bg-gray-800 rounded-lg h-64"
			/>
		</div>

		<!-- Works Grid -->
		<div
			v-else-if="filteredWorks.length > 0"
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
		>
			<div
				v-for="work in filteredWorks"
				:key="work.id"
				class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 flex flex-col"
				@click="openLightbox(work)"
			>
				<!-- Thumbnail -->
				<div class="relative overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-900">
					<img
						:src="resolveImageUrl(work.thumbnail)"
						:alt="work.title"
						class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						loading="lazy"
						decoding="async"
						@error="onImageError"
					>
					<div class="absolute top-3 left-3">
						<span class="px-2.5 py-1 text-xs font-medium rounded-full bg-black/60 text-white backdrop-blur-sm">
							{{ work.category || 'Portrait' }}
						</span>
					</div>
				</div>

				<!-- Info -->
				<div class="p-4 flex-1 flex flex-col justify-between">
					<div>
						<h3 class="text-lg font-semibold text-text-light dark:text-text-dark group-hover:text-brand transition-colors">
							{{ work.title }}
						</h3>
						<p
							v-if="work.description"
							class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2"
						>
							{{ work.description }}
						</p>
					</div>
					<div class="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
						<span>{{ work.created_at }}</span>
						<span class="text-brand font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
							View Details →
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div
			v-else
			class="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700"
		>
			<p class="text-gray-500 dark:text-gray-400 text-lg mb-2">
				No photos found in "{{ activeCategory }}"
			</p>
			<p class="text-sm text-gray-400 dark:text-gray-500 mb-6">
				Check back soon as new sessions are published frequently.
			</p>
			<button
				class="px-5 py-2 text-sm bg-brand text-white rounded-full hover:bg-brand-dark transition-colors font-medium"
				@click="selectCategory('All')"
			>
				View All Works
			</button>
		</div>

		<!-- Lightbox / Modal Preview -->
		<div
			v-if="activeWork"
			class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity"
			@click.self="closeLightbox"
		>
			<div class="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
				<!-- Close Button -->
				<button
					class="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
					aria-label="Close modal"
					@click="closeLightbox"
				>
					<svg
						class="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<!-- Modal Body -->
				<div class="overflow-y-auto">
					<!-- Main Preview Image -->
					<div class="bg-black/10 dark:bg-black/40 flex items-center justify-center max-h-[60vh] overflow-hidden">
						<img
							:src="activeModalImage"
							:alt="activeWork.title"
							class="max-h-[60vh] w-auto object-contain mx-auto"
							decoding="async"
							@error="onImageError"
						>
					</div>

					<!-- Multiple Gallery Thumbnails if available -->
					<div
						v-if="allModalImages.length > 1"
						class="flex gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto border-b border-gray-200 dark:border-gray-800"
					>
						<button
							v-for="(img, idx) in allModalImages"
							:key="idx"
							:class="[
								'relative rounded-lg overflow-hidden flex-shrink-0 w-16 h-16 border-2 transition-all',
								activeModalImage === img ? 'border-brand scale-105' : 'border-transparent opacity-70 hover:opacity-100',
							]"
							@click="activeModalImage = img"
						>
							<img
								:src="img"
								class="w-full h-full object-cover"
								loading="lazy"
								decoding="async"
								@error="onImageError"
							>
						</button>
					</div>

					<!-- Details -->
					<div class="p-6">
						<div class="flex flex-wrap items-center justify-between gap-3 mb-2">
							<span class="px-3 py-1 text-xs font-semibold rounded-full bg-brand/10 text-brand">
								{{ activeWork.category || 'Portrait' }}
							</span>
							<span class="text-xs text-gray-400">{{ activeWork.created_at }}</span>
						</div>
						<h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-3">
							{{ activeWork.title }}
						</h2>
						<p
							v-if="activeWork.description"
							class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6"
						>
							{{ activeWork.description }}
						</p>

						<div class="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
							<p class="text-xs text-gray-400">
								Captured by Jeff Lee
							</p>
							<NuxtLink
								:to="`/booking?package=${encodeURIComponent(activeWork.category || 'Portrait')}`"
								class="px-5 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-medium rounded-full transition-colors"
							>
								Book Similar Session →
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useApi, type PortfolioItem } from "~/composables/useApi";

definePageMeta({
	layout: "default",
});

useHead({
	title: "Portfolio & Works — Jeff Lee Photography",
	meta: [
		{ name: "description", content: "Explore Jeff Lee photography portfolio organized by theme: Family, Portrait, Couple, Newborn, Sports, and more." },
	],
});

const { getPortfolios, resolveImageUrl, onImageError } = useApi();

// Brief categories + All
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

// Sample fallback items if backend is offline or empty during local development
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
	{
		id: 104,
		title: "Baby Leo — First Two Weeks of Wonder",
		slug: "baby-leo-first-two-weeks-of-wonder",
		category: "Newborn",
		description: "A quiet, gentle in-home lifestyle newborn shoot. Wrapped in organic linen next to a window casting soft diffused morning light.",
		thumbnail: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: false,
		created_at: "Jul 2026",
	},
	{
		id: 105,
		title: "The Artisan Ceramicist at Work",
		slug: "the-artisan-ceramicist-at-work",
		category: "Work Documentary",
		description: "Documenting the tactile craft of hand-thrown stoneware pottery in an old Melbourne brick warehouse.",
		thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: false,
		created_at: "Jun 2026",
	},
	{
		id: 106,
		title: "Archie — Joyful Coastal Retriever",
		slug: "archie-joyful-coastal-retriever",
		category: "Animal",
		description: "Energetic dog portraiture at dawn. Catching the pure, uninhibited happiness of Archie sprinting through tidal pools.",
		thumbnail: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: false,
		created_at: "May 2026",
	},
	{
		id: 107,
		title: "Eucalyptus & Morning Dew",
		slug: "eucalyptus-and-morning-dew",
		category: "Plant",
		description: "Macro and ambient botanical study of native Australian eucalyptus leaves backlit by early morning mist.",
		thumbnail: "https://images.unsplash.com/photo-1457530378978-8bac673b8062?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: false,
		created_at: "Apr 2026",
	},
	{
		id: 108,
		title: "Chasing Ocean Barrels at Sunrise",
		slug: "chasing-ocean-barrels-at-sunrise",
		category: "Sports",
		description: "Action surf photography at Snapper Rocks. Freezing the high-speed velocity, ocean spray, and golden water reflections.",
		thumbnail: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: false,
		created_at: "Mar 2026",
	},
	{
		id: 109,
		title: "Acoustic Garden Gathering",
		slug: "acoustic-garden-gathering",
		category: "Event",
		description: "Intimate backyard musical performance under warm string lights. Capturing the connection between musician and audience in natural ambience.",
		thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: false,
		created_at: "Feb 2026",
	},
	{
		id: 110,
		title: "The Glasshouse 30th Birthday",
		slug: "the-glasshouse-30th-birthday",
		category: "Celebration",
		description: "An evening of candlelit tables, sparkling toasts, and genuine celebratory embraces in a historic glasshouse venue.",
		thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: false,
		created_at: "Jan 2026",
	},
	{
		id: 111,
		title: "Great Ocean Road Odyssey",
		slug: "great-ocean-road-odyssey",
		category: "Travel",
		description: "Winding coastal cliffs, towering sea stacks, and dramatic tempestuous skies along Victoria's world-famous coastline.",
		thumbnail: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
		gallery: [
			"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
		],
		is_highlight: true,
		created_at: "Jan 2026",
	},
];

// Fetch from API (non-blocking with cache)
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

// Compute works (combining API items, or fallback if API items are empty)
const worksList = computed<PortfolioItem[]>(() => {
	if (data.value && data.value.length > 0) {
		return data.value;
	}
	return fallbackWorks;
});

// Filter by selected category
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
</script>
