<script setup>
const { logout, user } = useAuth()
definePageMeta({
    middleware: ['auth'],
})
</script>

<template>
    <div class="p-4">
        <div class="flex justify-between items-center">
            <h1 class="text-xl">Welcome, {{ user?.email }}</h1>
            <button @click="logout" class="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
        </div>
    </div>
</template>
