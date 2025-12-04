<script setup>
import WorkForm from '~/components/admin/workForm.vue'

definePageMeta({
    middleware: ['auth'],
    layout: 'admin',
})

const handleSubmit = async (form) => {
    await $fetch('/api/works', { method: 'POST', body: form })
    navigateTo('/admin/works')
}
</script>

<template>
    <WorkForm @submit="handleSubmit" />
</template>
