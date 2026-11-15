<template>
	<div class="flex flex-col min-h-screen bg-canvas text-ink">
		<!-- Skip to Main Content Link for Accessibility -->
		<a
			href="#main-content"
			class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-canvas focus:text-xs focus:uppercase focus:tracking-widest focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 transition-transform"
		>
			Skip to main content
		</a>

		<!-- Minimalist Header -->
		<Navbar />

		<!-- Main Content -->
		<main
			id="main-content"
			class="flex-1"
		>
			<slot />
		</main>

		<!-- Minimalist Footer -->
		<Footer />
	</div>
</template>

<script setup>
import Navbar from "~/components/layout/Navbar.vue";
import Footer from "~/components/layout/Footer.vue";
import { useSeo } from "~/composables/useSeo";

const { setCanonical } = useSeo();
setCanonical();
</script>
