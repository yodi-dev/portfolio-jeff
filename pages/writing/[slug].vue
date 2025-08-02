<template>
    <main class="container py-24 px-10 max-w-3xl mx-auto">
        <!-- Title -->
        <h1 class="text-3xl font-bold mb-2 text-brand">{{ post.title }}</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">{{ post.date }}</p>

        <!-- Content -->
        <article class="prose dark:prose-invert max-w-none">
            <p v-for="(paragraph, index) in post.content" :key="index">
                {{ paragraph }}
            </p>
        </article>

        <!-- Back Link -->
        <NuxtLink to="/writing" class="inline-block mt-8 text-brand hover:underline">
            ← Back to Reflections
        </NuxtLink>
    </main>
</template>

<script setup>
import { useRoute } from 'vue-router'

definePageMeta({
    layout: 'default'
})

const route = useRoute()

// Dummy articles (nanti bisa dipindah ke API atau CMS)
const articles = {
    'golden-hour': {
        title: 'The Magic of Golden Hour',
        date: 'July 10, 2025',
        content: [
            'Golden hour is a magical time for photographers. The soft, warm light can transform ordinary scenes into breathtaking images.',
            'I often schedule sessions during golden hour to take advantage of the natural lighting conditions.',
            'In this article, I will share tips for maximizing your golden hour shoots.'
        ]
    },
    'family-photography': {
        title: 'Why I Love Family Photography',
        date: 'June 28, 2025',
        content: [
            'Family photography is about more than just pictures. It is about capturing bonds, laughter, and memories.',
            'Every session brings something new and reminds me why I love what I do.'
        ]
    },
    'minimal-gear': {
        title: 'Minimal Gear, Maximum Impact',
        date: 'June 15, 2025',
        content: [
            'Having the best camera doesn’t always mean the best photos. Sometimes, creativity matters more than equipment.',
            'With a simple kit, you can focus on what truly matters: the story behind each shot.'
        ]
    }
}

// Ambil artikel berdasarkan slug dari route
const post = articles[route.params.slug] || {
    title: 'Article Not Found',
    date: '',
    content: ['The article you are looking for does not exist.']
}
</script>
