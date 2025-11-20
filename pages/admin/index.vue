<script setup>
definePageMeta({
    middleware: ['auth'],
    layout: 'admin',
})

</script>

<template>
    <div>
        <h2 class="text-xl font-semibold">Dashboard</h2>
        <p class="text-gray-500 mt-2">Selamat datang di panel admin.</p>
    </div>
</template>
