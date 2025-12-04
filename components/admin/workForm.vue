<script setup>
const props = defineProps({
    model: Object
})

const emit = defineEmits(['submit'])

const form = reactive({
    title: props.model?.title ?? '',
    description: props.model?.description ?? '',
    images: props.model?.images ?? [],
    highlight: props.model?.highlight ?? false
})
</script>

<template>
    <form @submit.prevent="emit('submit', form)" class="space-y-4">

        <input v-model="form.title" type="text" placeholder="Title" class="w-full border p-2 rounded" />

        <textarea v-model="form.description" placeholder="Description" class="w-full border p-2 rounded" />

        <!-- toggle highlight -->
        <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="form.highlight" class="h-4 w-4" />
            <span>Tandai sebagai Selected Work</span>
        </label>

        <!-- images upload disusulkan, kita fokus CRUD dulu -->

        <button class="px-4 py-2 bg-black text-white rounded">
            Save
        </button>
    </form>
</template>
