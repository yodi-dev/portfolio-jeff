<template>
    <main class="container py-24 px-10 max-w-3xl mx-auto">
        <!-- Title -->
        <h2 class="text-3xl font-semibold mb-4 text-brand text-center">Reflections</h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-10">
            Here I share my thoughts and stories behind the photos I take.
        </p>

        <!-- Article List -->
        <div class="space-y-6">
            <article v-for="(post, index) in posts" :key="index"
                class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 class="text-xl text-text-light dark:text-text-dark font-semibold mb-2">{{ post.title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ post.date }}</p>
                <p class="text-gray-700 dark:text-gray-300 mb-4">{{ post.excerpt }}</p>
                <NuxtLink :to="`/writing/${post.slug}`" class="text-brand hover:underline">
                    Read More →
                </NuxtLink>
            </article>
        </div>
    </main>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})

const posts = [
    {
        title: 'The Magic of Golden Hour',
        date: 'July 10, 2025',
        excerpt: 'Golden hour is every photographer’s best friend. Here’s how I use it to capture timeless moments...',
        slug: 'golden-hour'
    },
    {
        title: 'Why I Love Family Photography',
        date: 'June 28, 2025',
        excerpt: 'Family sessions are not just photos—they’re pieces of history that can be passed down...',
        slug: 'family-photography'
    },
    {
        title: 'Minimal Gear, Maximum Impact',
        date: 'June 15, 2025',
        excerpt: 'You don’t always need a studio full of equipment. Sometimes, the simplest tools tell the best stories...',
        slug: 'minimal-gear'
    }
]
</script>
