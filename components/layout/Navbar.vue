<template>
    <header class="fixed top-0 left-0 w-full z-50">
        <nav
            class="flex justify-between items-center px-4 md:px-7 py-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md rounded-full mt-4 mx-4 md:mx-10 border border-gray-100 dark:border-gray-800"
        >
            <!-- Navigation Links -->
            <ul class="flex items-center gap-2 md:gap-5 text-xs md:text-sm text-text-light dark:text-text-dark font-medium">
                <li>
                    <NuxtLink
                        to="/"
                        class="hover:text-brand transition-colors py-1 px-1.5"
                        active-class="text-brand font-semibold"
                        exact-active-class="text-brand font-semibold"
                    >
                        Home
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/works"
                        class="hover:text-brand transition-colors py-1 px-1.5"
                        active-class="text-brand font-semibold"
                    >
                        Works
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/writing"
                        class="hover:text-brand transition-colors py-1 px-1.5"
                        active-class="text-brand font-semibold"
                    >
                        Writing
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/about"
                        class="hover:text-brand transition-colors py-1 px-1.5"
                        active-class="text-brand font-semibold"
                    >
                        About
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/contact"
                        class="hover:text-brand transition-colors py-1 px-1.5"
                        active-class="text-brand font-semibold"
                    >
                        Contact
                    </NuxtLink>
                </li>
                <li class="pl-1">
                    <DarkModeToggle />
                </li>
            </ul>

            <!-- Book a Session Button -->
            <NuxtLink
                to="/booking"
                class="bg-brand text-xs md:text-sm text-white px-3.5 py-1.5 rounded-full hover:bg-brand-dark transition-colors font-medium shadow-sm flex-shrink-0"
            >
                Book a Session
            </NuxtLink>
        </nav>
    </header>
</template>

<script setup>
import DarkModeToggle from '../ui/DarkModeToggle.vue';
</script>
