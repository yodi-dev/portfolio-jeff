<template>
    <!-- Hero -->
    <section class="container py-16 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-brand">Welcome to Jef Photography</h1>
        <p class="mt-4 text-lg text-text-light dark:text-text-dark max-w-xl mx-auto">
            Mengabadikan momen berharga Anda.
        </p>
        <NuxtLink to="/works"
            class="inline-block mt-6 px-6 py-3 bg-brand text-white rounded hover:bg-brand-dark transition-colors">
            Lihat Portfolio
        </NuxtLink>
    </section>

    <!-- Selected Works -->
    <section class="container py-16 text-center">
        <h2 class="text-3xl font-semibold mb-8">Selected Works</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <img src="/images/preview1.jpeg" alt="Preview 1" class="w-full rounded-lg object-cover" />
            <img src="/images/preview2.jpeg" alt="Preview 2" class="w-full rounded-lg object-cover" />
            <img src="/images/preview3.jpeg" alt="Preview 3" class="w-full rounded-lg object-cover" />
        </div>
        <NuxtLink to="/works"
            class="inline-block px-6 py-2 border border-brand text-brand rounded hover:bg-brand hover:text-white transition-colors">
            See More
        </NuxtLink>
    </section>

    <!-- Writing -->
    <section class="container py-16 text-center">
        <h2 class="text-3xl font-semibold mb-6">Thoughts & Stories</h2>
        <blockquote class="italic text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            "Photography is more than capturing light—it's capturing life itself."
        </blockquote>
        <NuxtLink to="/writing"
            class="inline-block px-6 py-2 border border-brand text-brand rounded hover:bg-brand hover:text-white transition-colors">
            Read More
        </NuxtLink>
    </section>

    <!-- About Jeff -->
    <section class="container py-16">
        <h2 class="text-3xl font-semibold text-center mb-8">About Jeff</h2>
        <div class="flex flex-col md:flex-row items-center gap-8">
            <img src="/images/jeff-portrait.jpeg" alt="Jeff Portrait" class="w-48 rounded-lg" />
            <div class="max-w-xl text-center md:text-left space-y-4">
                <p>
                    Jeff is a photographer who finds meaning in moments—family smiles, newborn hands,
                    quiet glances between loved ones. Through the lens, he documents emotions and stories
                    that words often fail to describe.
                </p>
                <p>
                    With years of experience in portraiture, family shoots, and event documentation, Jeff
                    brings both professionalism and heart to every session.
                </p>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="container py-16 text-center">
        <h2 class="text-3xl font-semibold mb-8">What Clients Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <blockquote class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg italic">
                "Jeff made our family photo session feel so natural. The photos brought tears to my eyes."
                <footer class="mt-3 text-sm text-gray-500 dark:text-gray-400">— Amanda R.</footer>
            </blockquote>
            <blockquote class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg italic">
                "His ability to capture fleeting, genuine emotions is unmatched. Highly recommended!"
                <footer class="mt-3 text-sm text-gray-500 dark:text-gray-400">— David & Lina</footer>
            </blockquote>
            <blockquote class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg italic">
                "Jeff's professionalism and kindness made our wedding shoot unforgettable."
                <footer class="mt-3 text-sm text-gray-500 dark:text-gray-400">— Clara & Sam</footer>
            </blockquote>
        </div>
    </section>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})
</script>
