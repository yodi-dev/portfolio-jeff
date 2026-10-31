<template>
	<main class="py-16 sm:py-24 px-6 md:px-12 max-w-3xl mx-auto">
		<!-- Header -->
		<header class="mb-14 sm:mb-20">
			<span class="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-3">Communication</span>
			<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight mb-4">
				Contact & Inquiries
			</h1>
			<p class="text-zinc-600 font-light text-sm sm:text-base leading-relaxed max-w-lg">
				For editorial assignments, gallery print requests, or booking a portrait session, please feel free to reach out directly.
			</p>
		</header>

		<!-- Directory Listing -->
		<div class="border-t border-line divide-y divide-line mb-16">
			<!-- Email -->
			<div class="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
				<div>
					<span class="text-xs uppercase tracking-widest text-zinc-500 block font-mono">Electronic Mail</span>
					<span class="text-xs text-zinc-500">General correspondence & commissions</span>
				</div>
				<a
					href="mailto:jef@example.com"
					class="font-mono text-xs sm:text-sm text-ink hover:text-zinc-500 transition-colors"
				>
					jef@example.com
				</a>
			</div>

			<!-- Direct Line / WhatsApp -->
			<div class="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
				<div>
					<span class="text-xs uppercase tracking-widest text-zinc-500 block font-mono">Direct Line / WhatsApp</span>
					<span class="text-xs text-zinc-500">Fastest response for scheduling</span>
				</div>
				<a
					href="https://wa.me/61400123456"
					target="_blank"
					rel="noopener noreferrer"
					class="font-mono text-xs sm:text-sm text-ink hover:text-zinc-500 transition-colors"
				>
					+61 400 123 456
				</a>
			</div>

			<!-- Instagram -->
			<div class="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
				<div>
					<span class="text-xs uppercase tracking-widest text-zinc-500 block font-mono">Visual Journal</span>
					<span class="text-xs text-zinc-500">Daily rolls & behind-the-scenes</span>
				</div>
				<a
					href="https://instagram.com/jeflee"
					target="_blank"
					rel="noopener noreferrer"
					class="font-mono text-xs sm:text-sm text-ink hover:text-zinc-500 transition-colors"
				>
					instagram.com/jeflee
				</a>
			</div>

			<!-- Location -->
			<div class="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
				<div>
					<span class="text-xs uppercase tracking-widest text-zinc-500 block font-mono">Location Base</span>
					<span class="text-xs text-zinc-500">Available for travel commissions</span>
				</div>
				<span class="font-mono text-xs sm:text-sm text-zinc-600">
					Australia / Kyoto, Japan
				</span>
			</div>
		</div>

		<!-- Booking Invitation Card (Minimalist Paper) -->
		<div class="border border-line p-8 sm:p-10 bg-white/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
			<div class="space-y-1">
				<h2 class="font-serif text-xl sm:text-2xl text-ink font-light">
					Reserve a Session
				</h2>
				<p class="text-xs text-zinc-600 font-light leading-relaxed max-w-sm">
					Skip direct email exchange and submit your shoot details through our structured reservation sheet.
				</p>
			</div>
			<NuxtLink
				to="/booking"
				class="text-xs uppercase tracking-widest bg-ink text-white hover:bg-zinc-800 px-6 py-3 transition-colors duration-200 shrink-0"
			>
				Open Booking Sheet →
			</NuxtLink>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "default",
});

useSeoMeta({
	title: "Contact — Jef Lee",
	ogTitle: "Contact — Jef Lee",
	description: "Get in touch with Jef Lee for photography commissions, editorial assignments, and session reservations.",
	ogDescription: "Get in touch with Jef Lee for photography commissions, editorial assignments, and session reservations.",
	ogImage: "/images/preview3.jpeg",
	twitterCard: "summary_large_image",
	twitterTitle: "Contact — Jef Lee",
	twitterDescription: "Get in touch with Jef Lee for photography commissions, editorial assignments, and session reservations.",
	twitterImage: "/images/preview3.jpeg",
});
</script>
