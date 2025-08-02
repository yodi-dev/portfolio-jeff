<template>
    <main class="container py-24 px-10">
        <!-- Title -->
        <h2 class="text-3xl font-semibold mb-6 text-brand text-center">About Me</h2>

        <!-- Profile Section -->
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <!-- Portrait -->
            <img src="/images/jeff-portrait.jpeg" alt="Jeff Portrait"
                class="w-40 h-40 rounded-full object-cover shadow-md" />

            <!-- Bio -->
            <div class="text-center md:text-left max-w-xl space-y-4">
                <p class="text-text-light dark:text-text-dark">
                    I’m Jeff, a photographer with a passion for telling stories through pictures. I specialize in
                    portraits,
                    family moments, and documentary-style photography.
                </p>
                <p class="text-text-light dark:text-text-dark">
                    For me, photography isn’t just about capturing light—it’s about preserving emotions, relationships,
                    and memories that last a lifetime.
                </p>
            </div>
        </div>

        <!-- Skills / Specialties -->
        <section class="mt-12">
            <h3 class="text-2xl text-text-light dark:text-text-dark font-semibold mb-4 text-center md:text-left">
                Specialties</h3>
            <ul
                class="grid grid-cols-2 text-text-light dark:text-text-dark md:grid-cols-3 gap-4 text-center md:text-left">
                <li class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">Portrait Photography</li>
                <li class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">Family Sessions</li>
                <li class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">Event Documentation</li>
                <li class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">Couple Photography</li>
                <li class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">Newborn Shoots</li>
                <li class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">Travel & Lifestyle</li>
            </ul>
        </section>
    </main>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})
</script>
