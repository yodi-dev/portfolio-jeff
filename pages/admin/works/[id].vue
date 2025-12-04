<script setup>
import WorkForm from '~/components/admin/workForm.vue'

definePageMeta({
    middleware: ['auth'],
    layout: 'admin',
})

const route = useRoute()
const { data: portfolio } = await useFetch(`/api/works/${route.params.id}`)

const handleSubmit = async (form) => {
    await $fetch(`/api/works/${route.params.id}`, { method: 'PUT', body: form })
    navigateTo('/admin/works')
}
</script>

<template>
    <WorkForm :model="portfolio" @submit="handleSubmit" />
</template>
