<script setup lang="ts">
import DarkModeToggle from '~/components/ui/DarkModeToggle.vue'
const { logout } = useAuth()
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <header class="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h1 class="font-semibold text-brand dark:text-brand-dark text-lg">Admin Dashboard</h1>
            <div class="flex items-center gap-3">
                <DarkModeToggle />

                <button @click="logout"
                    class="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition">
                    Logout
                </button>
            </div>
        </header>

        <main class="p-6">
            <slot />
        </main>
    </div>
</template>
