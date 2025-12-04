<script setup>
definePageMeta({
    middleware: ['auth'],
    layout: 'admin',
})

const remove = async (id) => {
    await $fetch(`/api/works/${id}`, { method: "DELETE" })
    refresh()
}

const { data: portfolios, refresh } = await useFetch('/api/works')

</script>

<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-xl font-bold">Portfolio</h1>
            <NuxtLink to="/admin/works/create" class="px-4 py-2 bg-black text-white rounded">
                + Create
            </NuxtLink>
        </div>

        <table class="w-full border">
            <thead>
                <tr class="border-b">
                    <th class="p-2">Title</th>
                    <th class="p-2">Description</th>
                    <th class="p-2">Highlight</th>
                    <th class="p-2">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in portfolios" :key="item.id" class="border-b">
                    <td class="p-2">{{ item.title }}</td>
                    <td class="p-2">{{ item.description }}</td>
                    <td class="p-2">
                        <span v-if="item.highlight">⭐</span>
                    </td>
                    <td class="p-2 space-x-2">
                        <NuxtLink :to="`/admin/works/${item.id}`" class="text-blue-500">Edit</NuxtLink>
                        <button @click="remove(item.id)" class="text-red-500">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>