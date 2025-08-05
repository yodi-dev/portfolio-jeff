<template>
    <section class="relative h-screen flex flex-col justify-center items-center text-center px-6 mb-24">
        <!-- Background Image -->
        <div class="absolute inset-0 bg-cover bg-center w-full" style="background-image: url('/images/preview3.jpeg')">
        </div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40"></div>

        <!-- Content -->
        <div class="relative z-10 max-w-3xl text-white">
            <!-- Nama Fotografer -->
            <p class="text-xl text-brand font-semibold mb-2 mt-24">Jef Lee</p>

            <!-- Headline -->
            <h1 class="text-4xl md:text-3xl font-semibold leading-tight mb-4">
                Telling real stories through natural light <br class="hidden md:block" />
                and heartfelt moments.
            </h1>

            <!-- Subheadline -->
            <p class="text-base md:text-sm opacity-80">
                A portrait photographer based in Australia, with over 3 years of experience. <br
                    class="hidden md:block" />
                Capturing timeless family moments and authentic emotions through natural light and storytelling
                visuals.
            </p>
        </div>
    </section>

    <!-- Selected Works -->
    <section class="container py-16 text-center px-10">
        <h2 class="text-3xl text-brand dark:text-brand-dark font-semibold mb-10">Selected Works</h2>
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
    <section class="container py-16 text-center px-10">
        <h2 class="text-3xl text-brand dark:text-brand-dark font-semibold mb-6">Thoughts & Stories</h2>
        <blockquote class="italic text-lg text-text-light dark:text-text-dark max-w-2xl mx-auto mb-6">
            "Photography is more than capturing light—it's capturing life itself."
        </blockquote>
        <NuxtLink to="/writing"
            class="inline-block px-6 py-2 border border-brand text-brand rounded hover:bg-brand hover:text-white transition-colors">
            Read More
        </NuxtLink>
    </section>

    <!-- About Jeff -->
    <section class="container py-16 px-10">
        <h2 class="text-3xl text-brand dark:text-brand-dark font-semibold text-center mb-8">About Jeff</h2>
        <div class="flex flex-col md:flex-row items-center gap-8">
            <img src="/images/jeff-portrait.jpeg" alt="Jeff Portrait" class="w-48 rounded-lg" />
            <div class="max-w-xl text-center md:text-left space-y-4">
                <p class="text-text-light dark:text-text-dark">
                    Jeff is a photographer who finds meaning in moments—family smiles, newborn hands,
                    quiet glances between loved ones. Through the lens, he documents emotions and stories
                    that words often fail to describe.
                </p>
                <p class="text-text-light dark:text-text-dark">
                    With years of experience in portraiture, family shoots, and event documentation, Jeff
                    brings both professionalism and heart to every session.
                </p>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="container py-16 text-center px-10">
        <h2 class="text-3xl text-brand dark:text-brand-dark font-semibold mb-8">What Clients Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <blockquote class="bg-gray-100 text-text-light dark:text-text-dark dark:bg-gray-800 p-6 rounded-lg italic">
                "Jeff made our family photo session feel so natural. The photos brought tears to my eyes."
                <footer class="mt-3 text-sm text-gray-500 dark:text-gray-400">— Amanda R.</footer>
            </blockquote>
            <blockquote class="bg-gray-100 text-text-light dark:text-text-dark dark:bg-gray-800 p-6 rounded-lg italic">
                "His ability to capture fleeting, genuine emotions is unmatched. Highly recommended!"
                <footer class="mt-3 text-sm text-gray-500 dark:text-gray-400">— David & Lina</footer>
            </blockquote>
            <blockquote class="bg-gray-100 text-text-light dark:text-text-dark dark:bg-gray-800 p-6 rounded-lg italic">
                "Jeff's professionalism and kindness made our wedding shoot unforgettable."
                <footer class="mt-3 text-sm text-gray-500 dark:text-gray-400">— Clara & Sam</footer>
            </blockquote>
        </div>
    </section>

    <call-to-action />

</template>

<script setup>
import CallToAction from '~/components/sections/CallToAction.vue';
definePageMeta({
    layout: 'default'
})
</script>
