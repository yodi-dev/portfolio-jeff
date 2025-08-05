<template>
    <header class="fixed top-0 left-0 w-full z-50">
        <nav
            class="flex justify-between items-center px-7 bg-white/70 dark:bg-gray-900/50 backdrop-blur-md shadow-md rounded-full mt-4 mx-10">
            <!-- Menu kiri -->
            <ul class="flex gap-3 text-sm text-text-light dark:text-text-dark">
                <li>
                    <NuxtLink to="/" class="hover:text-brand" active-class="text-brand font-semibold"
                        exact-active-class="text-brand font-semibold">
                        Home
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/works" class="hover:text-brand" active-class="text-brand font-semibold">
                        Works
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about" class="hover:text-brand" active-class="text-brand font-semibold">
                        About
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/writing" class="hover:text-brand" active-class="text-brand font-semibold">
                        Writing
                    </NuxtLink>
                </li>
                <DarkModeToggle />
            </ul>


            <!-- Tombol kanan -->
            <NuxtLink to="/booking"
                class="bg-brand text-sm text-white px-3 py-1.5 rounded-full hover:bg-brand-dark transition-colors">
                Book a Session
            </NuxtLink>
        </nav>
    </header>
</template>

<script setup>
import DarkModeToggle from '../ui/DarkModeToggle.vue';
</script>
