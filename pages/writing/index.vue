<template>
    <main class="container py-24 px-6 md:px-10 max-w-4xl mx-auto">
        <!-- Title & Subtitle -->
        <div class="text-center mb-12">
            <h1 class="text-3xl md:text-4xl font-semibold mb-3 text-brand">Writing & Reflections</h1>
            <p class="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-base">
                Personal thoughts, visual essays, and the emotional stories captured behind the lens.
            </p>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="space-y-6 animate-pulse">
            <div v-for="i in 3" :key="i" class="h-44 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
        </div>

        <!-- Article List -->
        <div v-else class="space-y-8">
            <article
                v-for="post in articlesList"
                :key="post.id"
                class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row"
            >
                <!-- Cover Image (if available) -->
                <div v-if="post.cover_image" class="md:w-1/3 aspect-[16/10] md:aspect-auto overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <img
                        :src="resolveImageUrl(post.cover_image)"
                        :alt="post.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>

                <!-- Content Info -->
                <div class="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-2 text-xs text-gray-400 mb-2 font-medium">
                            <span>{{ post.created_at }}</span>
                            <span>•</span>
                            <span>Photo Story</span>
                        </div>
                        <h2 class="text-xl md:text-2xl font-bold text-text-light dark:text-text-dark mb-3 group-hover:text-brand transition-colors">
                            <NuxtLink :to="`/writing/${post.slug}`">
                                {{ post.title }}
                            </NuxtLink>
                        </h2>
                        <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 mb-4">
                            {{ post.excerpt || post.content }}
                        </p>
                    </div>

                    <div>
                        <NuxtLink
                            :to="`/writing/${post.slug}`"
                            class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                        >
                            Read Full Story →
                        </NuxtLink>
                    </div>
                </div>
            </article>
        </div>
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApi, type ArticleItem } from '~/composables/useApi'

definePageMeta({
    layout: 'default'
})

useHead({
    title: 'Writing & Stories — Jeff Lee Photography',
    meta: [
        { name: 'description', content: 'Read stories, photography tips, and reflections by Jeff Lee.' }
    ]
})

const { getArticles, resolveImageUrl } = useApi()

// Fallback articles
const fallbackArticles: ArticleItem[] = [
    {
        id: 101,
        title: 'The Magic of Golden Hour',
        slug: 'golden-hour',
        excerpt: 'Golden hour is every photographer’s best friend. Here’s how I use natural ambient light to capture timeless moments without heavy flash equipment...',
        content: 'Golden hour is a magical time for photographers. The soft, warm light can transform ordinary scenes into breathtaking images...',
        cover_image: '/images/preview1.jpeg',
        is_highlight: true,
        created_at: '10 Jul 2026'
    },
    {
        id: 102,
        title: 'Why I Love Family Photography',
        slug: 'family-photography',
        excerpt: 'Family sessions are not just photos—they’re pieces of living history that can be passed down across generations. Here are reflections on documenting intimate family milestones...',
        content: 'Family photography is about more than just pictures. It is about capturing bonds, laughter, and memories that words often fail to describe...',
        cover_image: '/images/preview2.jpeg',
        is_highlight: false,
        created_at: '28 Jun 2026'
    },
    {
        id: 103,
        title: 'Minimal Gear, Maximum Impact',
        slug: 'minimal-gear',
        excerpt: 'You don’t always need a studio full of equipment. Sometimes, a single prime lens and keen observation tell the most compelling stories...',
        content: 'Having the most expensive camera doesn’t guarantee the most moving photo. Creativity and connection matter far more than megapixels...',
        cover_image: '/images/preview3.jpeg',
        is_highlight: false,
        created_at: '15 Jun 2026'
    }
]

// Fetch articles from API
const { data, pending } = await useAsyncData('articles', async () => {
    try {
        const response = await getArticles()
        return response?.data || []
    } catch (err) {
        console.warn('API getArticles unavailable, using fallback articles:', err)
        return []
    }
}, { default: () => [] })

const articlesList = computed<ArticleItem[]>(() => {
    if (data.value && data.value.length > 0) {
        return data.value
    }
    return fallbackArticles
})
</script>
