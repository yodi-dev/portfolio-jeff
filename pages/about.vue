<template>
    <main class="container py-24 px-10">
        <!-- About Section -->
        <section class="mb-16 text-center">
            <h2 class="text-3xl font-semibold mb-4 text-brand">About Me</h2>
            <p class="max-w-2xl text-text-light dark:text-text-dark mx-auto text-md mb-6">
                I’m Jeff, a photographer with a passion for telling stories through pictures.
                I specialize in portraits, family moments, and documentary-style photography.
            </p>
            <img src="/images/jeff-portrait.jpeg" alt="Jeff Lee Portrait"
                class="w-40 h-40 object-cover rounded-full mx-auto shadow-lg" />
        </section>

        <!-- Contact Section -->
        <section class="text-center">
            <h3 class="text-2xl text-brand font-semibold mb-4">Get in Touch</h3>
            <p class="mb-4 text-lg text-text-light dark:text-text-dark">
                Feel free to reach out for collaborations or inquiries.
            </p>
            <p class="mb-4 text-text-light dark:text-text-dark">
                Email:
                <a href="mailto:jeff@example.com" class="text-brand hover:underline">
                    jeff@example.com
                </a>
            </p>
            <ul class="flex justify-center gap-7 mt-4 text-text-light dark:text-text-dark">
                <li>
                    <a href="https://instagram.com/jeff" target="_blank" class="hover:text-brand">Instagram</a>
                </li>
                <li>
                    <a href="https://facebook.com/jeff" target="_blank" class="hover:text-brand">Facebook</a>
                </li>
            </ul>
        </section>
    </main>
</template>
