<script setup lang="ts">
const email = ref('')
const password = ref('')
const errorMsg = ref('')

const { handleLogin, loading } = useAuth()

definePageMeta({ layout: false })

const onSubmit = async () => {
    try {
        await handleLogin(email.value, password.value)
    } catch (err: any) {
        errorMsg.value = err.message
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <form @submit.prevent="onSubmit" class="w-full bg-gray-50 dark:bg-gray-800 max-w-sm p-6 rounded-2xl shadow">
            <h1 class="text-2xl text-brand dark:text-brand-dark font-semibold mb-4 text-center">Login</h1>

            <input v-model="email" type="email" placeholder="Email" class="w-full text-text-light dark:text-text-dark p-2 border rounded mb-2
               focus:ring-2 focus:ring-brand bg-white dark:bg-gray-900 dark:border-gray-700" autofocus />

            <input v-model="password" type="password" placeholder="Password" class="w-full text-text-light dark:text-text-dark p-2 border rounded mb-4
               focus:ring-2 focus:ring-brand bg-white dark:bg-gray-900 dark:border-gray-700" />

            <button type="submit" :disabled="loading"
                class="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark disabled:opacity-70 disabled:cursor-not-allowed">
                <span v-if="!loading">Login</span>
                <span v-else>Loading...</span>
            </button>

            <p v-if="errorMsg" class="text-red-500 text-sm mt-2">{{ errorMsg }}</p>
        </form>
    </div>
</template>
