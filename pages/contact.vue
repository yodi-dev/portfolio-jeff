<template>
    <main class="container py-24 px-6 md:px-10 max-w-3xl mx-auto">
        <!-- Title -->
        <div class="text-center mb-12">
            <h1 class="text-3xl md:text-4xl font-bold mb-3 text-brand">Get in Touch</h1>
            <p class="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-base">
                Have a question, collaboration proposal, or interested in a photoshoot? I'd love to hear from you.
            </p>
        </div>

        <!-- Contact Channels Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <!-- Email Card -->
            <a
                href="mailto:jeff@example.com"
                class="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
            >
                <div class="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-110 transition-transform">
                    ✉
                </div>
                <div>
                    <h2 class="text-base font-semibold text-text-light dark:text-text-dark group-hover:text-brand transition-colors">Email Directly</h2>
                    <p class="text-xs text-gray-400 mb-2">Replies typically within 24 hours</p>
                    <span class="text-sm text-brand font-medium">jeff@example.com</span>
                </div>
            </a>

            <!-- WhatsApp / Phone Card -->
            <a
                href="https://wa.me/61400123456"
                target="_blank"
                rel="noopener noreferrer"
                class="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
            >
                <div class="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-110 transition-transform">
                    💬
                </div>
                <div>
                    <h2 class="text-base font-semibold text-text-light dark:text-text-dark group-hover:text-brand transition-colors">WhatsApp Direct</h2>
                    <p class="text-xs text-gray-400 mb-2">Fastest for booking inquiries</p>
                    <span class="text-sm text-brand font-medium">+61 400 123 456</span>
                </div>
            </a>
        </div>

        <!-- Social Media Section -->
        <div class="bg-gray-50 dark:bg-gray-800/60 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 text-center mb-12">
            <h2 class="text-xl font-bold text-text-light dark:text-text-dark mb-2">Follow My Socials</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                See behind-the-scenes stories, daily camera rolls, and upcoming session availability.
            </p>

            <div class="flex flex-wrap justify-center gap-4">
                <a
                    href="https://instagram.com/jeff"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold text-text-light dark:text-text-dark hover:border-brand hover:text-brand shadow-sm transition-all inline-flex items-center gap-2"
                >
                    <span>📷</span> Instagram (@jeff)
                </a>
                <a
                    href="https://facebook.com/jeff"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold text-text-light dark:text-text-dark hover:border-brand hover:text-brand shadow-sm transition-all inline-flex items-center gap-2"
                >
                    <span>👥</span> Facebook (/jeff)
                </a>
            </div>
        </div>

        <!-- Fast Booking CTA -->
        <div class="text-center p-8 bg-brand text-white rounded-3xl shadow-lg">
            <h2 class="text-2xl font-bold mb-2">Ready to Schedule a Photoshoot?</h2>
            <p class="text-sm opacity-90 mb-6 max-w-md mx-auto">
                Skip the back-and-forth and fill in your preferred session details directly on the booking page.
            </p>
            <NuxtLink
                to="/booking"
                class="px-7 py-3 bg-white text-brand hover:bg-gray-100 rounded-full font-semibold transition-colors shadow inline-block"
            >
                Open Booking Form →
            </NuxtLink>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

useHead({
    title: 'Contact — Jeff Lee Photography',
    meta: [
        { name: 'description', content: 'Get in touch with Jeff Lee for photography inquiries, collaborations, and bookings.' }
    ]
})
</script>
