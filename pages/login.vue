<script setup lang="ts">
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const { login } = useAuth()
const router = useRouter()

const handleLogin = async () => {
    try {
        await login(email.value, password.value)
        router.push('/admin')
    } catch (err: any) {
        errorMsg.value = err.message
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-sm p-6 bg-white rounded-2xl shadow">
            <h1 class="text-2xl font-semibold mb-4 text-center">Login</h1>
            <input v-model="email" type="email" placeholder="Email" class="w-full mb-2 border p-2 rounded" />
            <input v-model="password" type="password" placeholder="Password" class="w-full mb-4 border p-2 rounded" />
            <button @click="handleLogin" class="w-full bg-black text-white py-2 rounded">Login</button>
            <p v-if="errorMsg" class="text-red-500 text-sm mt-2">{{ errorMsg }}</p>
        </div>
    </div>
</template>
