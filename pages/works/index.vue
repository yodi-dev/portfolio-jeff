<template>
    <main class="container py-24 px-10">
        <!-- Title -->
        <h2 class="text-3xl font-semibold mb-3 text-brand">Portfolio</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-7">
            Select a category to view my work:
        </p>

        <!-- Categories -->
        <ul class="flex flex-wrap gap-7 gap-y-3 mb-7">
            <li v-for="category in categories" :key="category"
                class="px-2 py-1 text-sm border border-brand text-brand rounded cursor-pointer hover:bg-brand hover:text-white transition-colors">
                {{ category }}
            </li>
        </ul>

        <!-- Works Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="(work, index) in works" :key="index"
                class="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                <img :src="work.image" :alt="work.title" class="w-full h-48 object-cover" />
                <div class="p-4">
                    <h3 class="text-lg text-text-light dark:text-text-dark font-semibold mb-2">{{ work.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ work.category }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})

const categories = [
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

const works = [
    { title: 'Family Session', category: 'Family', image: '/images/preview1.jpeg' },
    { title: 'Portrait Shot', category: 'Portrait', image: '/images/preview2.jpeg' },
    { title: 'Couple Moment', category: 'Couple', image: '/images/preview3.jpeg' }
]
</script>
