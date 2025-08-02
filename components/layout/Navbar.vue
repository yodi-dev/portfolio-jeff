<template>
    <header class="bg-white dark:bg-gray-800 shadow">
        <nav class="container flex items-center justify-between py-4">
            <NuxtLink to="/" class="text-2xl font-bold text-brand">Jef Photography</NuxtLink>
            <ul class="flex gap-6">
                <li>
                    <NuxtLink to="/works" class="hover:text-brand">Works</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about" class="hover:text-brand">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/booking" class="hover:text-brand">Booking</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact" class="hover:text-brand">Contact</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/writing" class="hover:text-brand">Writing</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>


<script setup>
import { useRoute } from 'vue-router'
import DarkModeToggle from '~/components/ui/DarkModeToggle.vue'

const $route = useRoute()

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Works', to: '/works' },
    { label: 'Writing', to: '/writing' },
    { label: 'About', to: '/about' },
    { label: 'Booking', to: '/booking' },
    { label: 'Contact', to: '/contact' }
]
</script>
