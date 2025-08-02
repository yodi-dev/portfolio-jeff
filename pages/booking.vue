<template>
    <main class="container py-16 max-w-2xl mx-auto">
        <!-- Title -->
        <h2 class="text-3xl font-semibold mb-6 text-brand text-center">Book a Photoshoot</h2>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-8">
            Fill in the form below to schedule your photoshoot with Jeff.
        </p>

        <!-- Booking Form -->
        <form @submit.prevent="submitForm" class="space-y-5 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div>
                <label class="block mb-1 font-medium">Name</label>
                <input v-model="form.name" type="text" placeholder="Your name"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-brand dark:bg-gray-900 dark:border-gray-700" />
            </div>

            <div>
                <label class="block mb-1 font-medium">Email</label>
                <input v-model="form.email" type="email" placeholder="Your email"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-brand dark:bg-gray-900 dark:border-gray-700" />
            </div>

            <div>
                <label class="block mb-1 font-medium">Shoot Type</label>
                <select v-model="form.type"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-brand dark:bg-gray-900 dark:border-gray-700">
                    <option>Family</option>
                    <option>Portrait</option>
                    <option>Event</option>
                    <option>Other</option>
                </select>
            </div>

            <div>
                <label class="block mb-1 font-medium">Date</label>
                <input v-model="form.date" type="date"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-brand dark:bg-gray-900 dark:border-gray-700" />
            </div>

            <div>
                <label class="block mb-1 font-medium">Location</label>
                <input v-model="form.location" type="text" placeholder="Preferred location"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-brand dark:bg-gray-900 dark:border-gray-700" />
            </div>

            <div>
                <label class="block mb-1 font-medium">Additional Notes</label>
                <textarea v-model="form.notes" rows="4"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-brand dark:bg-gray-900 dark:border-gray-700"></textarea>
            </div>

            <button type="submit" class="w-full py-2 bg-brand text-white rounded hover:bg-brand-dark transition-colors">
                Submit
            </button>
        </form>
    </main>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})

import { reactive } from 'vue'

const form = reactive({
    name: '',
    email: '',
    type: 'Family',
    date: '',
    location: '',
    notes: ''
})

function submitForm() {
    console.log('Form Submitted:', form)
    alert('Booking request submitted successfully!')
}
</script>
