<script setup lang="ts">
import AdminNavbar from '~/components/layout/AdminNavbar.vue';
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <AdminNavbar />

        <main class="p-6">
            <slot />
        </main>
    </div>
</template>
