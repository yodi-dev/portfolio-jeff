<template>
	<main class="py-16 sm:py-24 px-6 md:px-12 max-w-4xl mx-auto">
		<!-- Profile Header Grid -->
		<section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start mb-24">
			<!-- Portrait Photo -->
			<div class="md:col-span-5">
				<div class="aspect-[3/4] bg-zinc-100 overflow-hidden">
					<img
						src="/images/jeff-portrait.jpeg"
						alt="Jef Lee Portrait"
						class="w-full h-full object-cover grayscale brightness-95"
						loading="lazy"
						decoding="async"
					>
				</div>
				<p class="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mt-3">
					Jef Lee — Australia / Kyoto
				</p>
			</div>

			<!-- Bio Intro -->
			<div class="md:col-span-7 space-y-6">
				<span class="text-xs uppercase tracking-widest text-zinc-500 font-mono block">Biography & Vision</span>
				<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight leading-tight">
					Documenting the quiet cadence of ordinary life.
				</h1>
				<div class="text-zinc-600 font-light text-base leading-relaxed space-y-5 pt-2">
					<p>
						My journey in photography began not in a commercial studio, but on the quiet morning coastlines of Australia, carrying a single mechanical camera. I became fascinated with how fleeting ambient light turns everyday moments into enduring memories.
					</p>
					<p>
						Over the past several years, that fascination evolved into an intentional practice: photographing families, quiet portraits, artisan workshops, and unscripted daily life. I believe photography reaches its highest emotional truth when the camera ceases to be an intrusion and becomes an unobtrusive observer.
					</p>
				</div>
			</div>
		</section>

		<!-- Philosophy / Methodology -->
		<section class="border-t border-line pt-16 mb-24">
			<div class="mb-12">
				<span class="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">Approach</span>
				<h2 class="font-serif text-2xl sm:text-3xl font-light text-ink">
					Working Philosophy
				</h2>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
				<div class="space-y-3">
					<span class="font-mono text-xs text-zinc-500">01</span>
					<h3 class="font-serif text-lg text-ink">Natural Ambient Light</h3>
					<p class="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
						Working strictly with natural morning glow and twilight to preserve the authentic mood and emotional warmth of the atmosphere.
					</p>
				</div>

				<div class="space-y-3">
					<span class="font-mono text-xs text-zinc-500">02</span>
					<h3 class="font-serif text-lg text-ink">The Unrehearsed Moment</h3>
					<p class="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
						Avoiding rigid posing in favor of patient observation. Allowing genuine connection, laughter, and intimacy to unfold naturally.
					</p>
				</div>

				<div class="space-y-3">
					<span class="font-mono text-xs text-zinc-500">03</span>
					<h3 class="font-serif text-lg text-ink">Archival Craftsmanship</h3>
					<p class="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
						Each photograph is individually graded with timeless, film-inspired tone curves suited for fine art print collections.
					</p>
				</div>
			</div>
		</section>

		<!-- Inquiries & Contact Info -->
		<section class="border-t border-line pt-16">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
				<div class="md:col-span-5">
					<span class="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">Commissions</span>
					<h2 class="font-serif text-2xl font-light text-ink">
						Inquiries & Sessions
					</h2>
					<p class="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed mt-3">
						Available worldwide for portrait sessions, family documentary, and editorial commissions.
					</p>
				</div>

				<div class="md:col-span-7 space-y-6 pt-2">
					<div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-line text-sm">
						<span class="text-zinc-500 text-xs uppercase tracking-widest">Email</span>
						<a
							href="mailto:jef@example.com"
							class="text-ink hover:text-zinc-500 font-mono text-xs tracking-wider transition-colors mt-1 sm:mt-0"
						>
							jef@example.com
						</a>
					</div>
					<div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-line text-sm">
						<span class="text-zinc-500 text-xs uppercase tracking-widest">Instagram</span>
						<a
							href="https://instagram.com/jeflee"
							target="_blank"
							rel="noopener noreferrer"
							class="text-ink hover:text-zinc-500 font-mono text-xs tracking-wider transition-colors mt-1 sm:mt-0"
						>
							@jeflee
						</a>
					</div>
					<div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-line text-sm">
						<span class="text-zinc-500 text-xs uppercase tracking-widest">Direct Line</span>
						<a
							href="https://wa.me/61400123456"
							target="_blank"
							rel="noopener noreferrer"
							class="text-ink hover:text-zinc-500 font-mono text-xs tracking-wider transition-colors mt-1 sm:mt-0"
						>
							+61 400 123 456
						</a>
					</div>

					<div class="pt-4">
						<NuxtLink
							to="/booking"
							class="inline-block text-xs uppercase tracking-widest border border-ink text-ink hover:bg-ink hover:text-white px-7 py-3 transition-colors duration-200"
						>
							Book a Photoshoot →
						</NuxtLink>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "default",
});

useSeoMeta({
	title: "About — Jef Lee",
	ogTitle: "About — Jef Lee",
	description: "Jef Lee is a natural light and storytelling photographer capturing genuine moments across Australia and Kyoto.",
	ogDescription: "Jef Lee is a natural light and storytelling photographer capturing genuine moments across Australia and Kyoto.",
	ogImage: "/images/jeff-portrait.jpeg",
	twitterCard: "summary_large_image",
	twitterTitle: "About — Jef Lee",
	twitterDescription: "Jef Lee is a natural light and storytelling photographer capturing genuine moments across Australia and Kyoto.",
	twitterImage: "/images/jeff-portrait.jpeg",
});
</script>
