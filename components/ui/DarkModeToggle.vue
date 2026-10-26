<template>
	<button
		class="border-none"
		@click="toggleDark"
	>
		<span v-if="isDark">🌙</span>
		<span v-else>☀️</span>
	</button>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDark = ref(false);

onMounted(() => {
	isDark.value = document.documentElement.classList.contains("dark");
});

function toggleDark() {
	isDark.value = !isDark.value;
	if (isDark.value) {
		document.documentElement.classList.add("dark");
	}
	else {
		document.documentElement.classList.remove("dark");
	}
}
</script>
