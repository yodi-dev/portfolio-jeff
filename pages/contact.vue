<template>
    <main class="container py-16 max-w-xl mx-auto">
        <!-- Title -->
        <h2 class="text-3xl font-semibold mb-4 text-brand text-center">Contact Me</h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-8">
            Feel free to reach out for bookings, collaborations, or inquiries.
        </p>

        <!-- Email -->
        <div class="text-center mb-6">
            <p class="text-lg">
                Email:
                <a href="mailto:jeff@example.com" class="text-brand hover:underline">
                    jeff@example.com
                </a>
            </p>
        </div>

        <!-- Social Links -->
        <ul class="flex justify-center gap-6">
            <li>
                <a href="https://instagram.com/jeff" target="_blank" class="text-brand hover:underline">
                    Instagram
                </a>
            </li>
            <li>
                <a href="https://facebook.com/jeff" target="_blank" class="text-brand hover:underline">
                    Facebook
                </a>
            </li>
        </ul>
    </main>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})
</script>
