<script setup lang="ts">
import DarkModeToggle from '~/components/ui/DarkModeToggle.vue'
const { logout } = useAuth()
const route = useRoute()

const navLinks = [
    { name: 'Dashboard', to: '/admin' },
    { name: 'Works', to: '/admin/works' },
    { name: 'Articles', to: '/admin/writing' },
    { name: 'Bookings', to: '/admin/bookings' }
]
</script>

<template>
    <header class="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h1 class="font-semibold text-brand dark:text-brand-dark text-lg">Admin Page</h1>

        <nav class="flex items-center gap-6">
            <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
                class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-brand-dark transition"
                active-class="text-brand font-semibold" exact-active-class="text-brand font-semibold">
                {{ link.name }}
            </NuxtLink>


        </nav>

        <div class=" flex items-center gap-3">
            <DarkModeToggle />

            <button @click="logout"
                class="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition">
                Logout
            </button>
        </div>
    </header>
</template>
