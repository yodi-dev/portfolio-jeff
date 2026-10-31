<template>
	<div class="flex flex-col min-h-screen bg-canvas text-ink">
		<!-- Minimalist Header -->
		<Navbar />

		<!-- Main Content -->
		<main class="flex-1">
			<slot />
		</main>

		<!-- Minimalist Footer -->
		<Footer />
	</div>
</template>

<script setup>
import Navbar from "~/components/layout/Navbar.vue";
import Footer from "~/components/layout/Footer.vue";
</script>
