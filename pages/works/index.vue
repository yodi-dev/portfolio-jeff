<template>
    <main class="container py-24 px-6 md:px-10">
        <!-- Title & Subtitle -->
        <div class="max-w-3xl mb-8">
            <h1 class="text-3xl md:text-4xl font-semibold mb-3 text-brand">Portfolio</h1>
            <p class="text-gray-600 dark:text-gray-400">
                Explore a collection of authentic moments, candid stories, and natural light photography organized by theme.
            </p>
        </div>

        <!-- Category Filters -->
        <div class="mb-10 overflow-x-auto pb-2">
            <ul class="flex flex-wrap gap-2 md:gap-3 text-sm">
                <li v-for="category in categories" :key="category">
                    <button
                        type="button"
                        @click="selectCategory(category)"
                        :class="[
                            'px-3.5 py-1.5 rounded-full border transition-all duration-200 font-medium',
                            activeCategory === category
                                ? 'bg-brand text-white border-brand shadow-sm'
                                : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand hover:text-brand'
                        ]"
                    >
                        {{ category }}
                    </button>
                </li>
            </ul>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            <div v-for="i in 6" :key="i" class="bg-gray-200 dark:bg-gray-800 rounded-lg h-64"></div>
        </div>

        <!-- Works Grid -->
        <div v-else-if="filteredWorks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div
                v-for="work in filteredWorks"
                :key="work.id"
                @click="openLightbox(work)"
                class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 flex flex-col"
            >
                <!-- Thumbnail -->
                <div class="relative overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-900">
                    <img
                        :src="resolveImageUrl(work.thumbnail)"
                        :alt="work.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
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
                        <p v-if="work.description" class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
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
        <div v-else class="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <p class="text-gray-500 dark:text-gray-400 text-lg mb-2">No photos found in "{{ activeCategory }}"</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mb-6">Check back soon as new sessions are published frequently.</p>
            <button
                @click="selectCategory('All')"
                class="px-5 py-2 text-sm bg-brand text-white rounded-full hover:bg-brand-dark transition-colors font-medium"
            >
                View All Works
            </button>
        </div>

        <!-- Lightbox / Modal Preview -->
        <div
            v-if="activeWork"
            @click.self="closeLightbox"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity"
        >
            <div class="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                <!-- Close Button -->
                <button
                    @click="closeLightbox"
                    class="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Close modal"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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
                        />
                    </div>

                    <!-- Multiple Gallery Thumbnails if available -->
                    <div v-if="allModalImages.length > 1" class="flex gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                        <button
                            v-for="(img, idx) in allModalImages"
                            :key="idx"
                            @click="activeModalImage = img"
                            :class="[
                                'relative rounded-lg overflow-hidden flex-shrink-0 w-16 h-16 border-2 transition-all',
                                activeModalImage === img ? 'border-brand scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                            ]"
                        >
                            <img :src="img" class="w-full h-full object-cover" />
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
                        <p v-if="activeWork.description" class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {{ activeWork.description }}
                        </p>

                        <div class="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <p class="text-xs text-gray-400">Captured by Jeff Lee</p>
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
import { ref, computed } from 'vue'
import { useApi, type PortfolioItem } from '~/composables/useApi'

definePageMeta({
    layout: 'default'
})

useHead({
    title: 'Portfolio & Works — Jeff Lee Photography',
    meta: [
        { name: 'description', content: 'Explore Jeff Lee photography portfolio organized by theme: Family, Portrait, Couple, Newborn, Sports, and more.' }
    ]
})

const { getPortfolios, resolveImageUrl } = useApi()

// Brief categories + All
const categories = [
    'All',
    'Family',
    'Portrait',
    'Couple',
    'Newborn',
    'Work Documentary',
    'Animal',
    'Plant',
    'Sports',
    'Event',
    'Celebration',
    'Travel'
]

const activeCategory = ref('All')

// Sample fallback items if backend is offline or empty during local development
const fallbackWorks: PortfolioItem[] = [
    {
        id: 101,
        title: 'Golden Hour Family Warmth',
        slug: 'golden-hour-family-warmth',
        category: 'Family',
        description: 'A candid evening session capturing laughter and sunset glow with the Reynolds family.',
        thumbnail: '/images/preview1.jpeg',
        is_highlight: true,
        created_at: 'Oct 2026'
    },
    {
        id: 102,
        title: 'Natural Light Studio Portrait',
        slug: 'natural-light-studio-portrait',
        category: 'Portrait',
        description: 'Authentic expression documented with soft window light and 85mm prime lens.',
        thumbnail: '/images/preview2.jpeg',
        is_highlight: true,
        created_at: 'Sep 2026'
    },
    {
        id: 103,
        title: 'Whispers by the Coast',
        slug: 'whispers-by-the-coast',
        category: 'Couple',
        description: 'Intimate pre-wedding story photographed along the dramatic cliffs at dusk.',
        thumbnail: '/images/preview3.jpeg',
        is_highlight: true,
        created_at: 'Aug 2026'
    }
]

// Fetch from API
const { data, pending } = await useAsyncData('portfolios', async () => {
    try {
        const response = await getPortfolios()
        return response?.data || []
    } catch (err) {
        console.warn('API getPortfolios unavailable, using fallback items:', err)
        return []
    }
}, { default: () => [] })

// Compute works (combining API items, or fallback if API items are empty)
const worksList = computed<PortfolioItem[]>(() => {
    if (data.value && data.value.length > 0) {
        return data.value
    }
    return fallbackWorks
})

// Filter by selected category
const filteredWorks = computed(() => {
    if (activeCategory.value === 'All') {
        return worksList.value
    }
    return worksList.value.filter(item => 
        (item.category || '').toLowerCase() === activeCategory.value.toLowerCase()
    )
})

function selectCategory(cat: string) {
    activeCategory.value = cat
}

// Lightbox state
const activeWork = ref<PortfolioItem | null>(null)
const activeModalImage = ref<string>('')

const allModalImages = computed(() => {
    if (!activeWork.value) return []
    const images: string[] = []
    if (activeWork.value.thumbnail) {
        images.push(resolveImageUrl(activeWork.value.thumbnail))
    }
    if (Array.isArray(activeWork.value.gallery)) {
        activeWork.value.gallery.forEach(img => {
            const resolved = resolveImageUrl(img)
            if (!images.includes(resolved)) {
                images.push(resolved)
            }
        })
    }
    return images
})

function openLightbox(work: PortfolioItem) {
    activeWork.value = work
    activeModalImage.value = resolveImageUrl(work.thumbnail)
}

function closeLightbox() {
    activeWork.value = null
    activeModalImage.value = ''
}
</script>
