<template>
	<main class="container py-24 px-6 md:px-10 max-w-4xl mx-auto">
		<!-- Hero Profile -->
		<section class="text-center mb-16">
			<div class="relative inline-block mb-6">
				<img
					src="/images/jeff-portrait.jpeg"
					alt="Jeff Lee Portrait"
					class="w-44 h-44 object-cover rounded-full mx-auto shadow-xl ring-4 ring-brand/20"
				>
				<span class="absolute bottom-2 right-2 bg-brand text-white text-xs px-2.5 py-1 rounded-full font-medium shadow">
					Based in Australia
				</span>
			</div>
			<h1 class="text-3xl md:text-4xl font-bold mb-3 text-brand">
				About Jeff Lee
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
				Storyteller, natural light enthusiast, and documenter of genuine human connections.
			</p>
		</section>

		<!-- Journey Story -->
		<section class="mb-16 space-y-6 text-text-light dark:text-text-dark text-base md:text-lg leading-relaxed">
			<h2 class="text-2xl font-bold text-brand mb-4">
				My Journey Behind the Lens
			</h2>
			<p>
				My passion for photography didn’t start in a sterile studio. It began over 3 years ago on the sun-drenched coastlines of Australia, carrying a single camera on quiet morning walks. I was captivated by the way changing light transforms ordinary moments into visual poetry.
			</p>
			<p>
				Over the years, that fascination grew into an obsession with documenting people—families welcoming their newborns, couples celebrating unspoken intimacy, athletes in peak momentum, and quiet everyday work documentary. I believe the most poignant photographs happen when people forget the camera exists.
			</p>
			<p>
				My philosophy is grounded in <strong>minimal gear and maximum connection</strong>. Rather than directing rigid poses, I facilitate a relaxed, unhurried space where your natural laughter, spontaneous smiles, and tender glances can unfold organically under soft ambient light.
			</p>
		</section>

		<!-- Photography Pillars / Behind the Scenes -->
		<section class="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
				<div class="text-brand font-bold text-xl mb-2">
					01. Natural Light
				</div>
				<p class="text-sm text-gray-600 dark:text-gray-400">
					Utilizing morning glow and golden hour sunsets to create warm, flattering, and timeless imagery.
				</p>
			</div>
			<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
				<div class="text-brand font-bold text-xl mb-2">
					02. Candid Moments
				</div>
				<p class="text-sm text-gray-600 dark:text-gray-400">
					Documenting honest emotions and unscripted memories rather than stiff, artificial posing.
				</p>
			</div>
			<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
				<div class="text-brand font-bold text-xl mb-2">
					03. High Craftsmanship
				</div>
				<p class="text-sm text-gray-600 dark:text-gray-400">
					Every image is carefully hand-graded and delivered in high resolution for archival prints.
				</p>
			</div>
		</section>

		<!-- Get In Touch / Contact Section (Brief Item 6) -->
		<section class="bg-gray-50 dark:bg-gray-800/60 p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-gray-700 text-center">
			<h2 class="text-2xl md:text-3xl text-brand font-bold mb-3">
				Get in Touch
			</h2>
			<p class="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base">
				Whether you’re planning a family session, commercial documentary, or intimate couple shoot, I’d love to hear your story.
			</p>

			<div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
				<!-- Email -->
				<a
					href="mailto:jeff@example.com"
					class="flex items-center gap-2 text-text-light dark:text-text-dark hover:text-brand transition-colors font-medium text-sm md:text-base"
				>
					<span class="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center">✉</span>
					jeff@example.com
				</a>

				<!-- Instagram -->
				<a
					href="https://instagram.com/jeff"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 text-text-light dark:text-text-dark hover:text-brand transition-colors font-medium text-sm md:text-base"
				>
					<span class="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center">📷</span>
					Instagram (@jeff)
				</a>

				<!-- Facebook -->
				<a
					href="https://facebook.com/jeff"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 text-text-light dark:text-text-dark hover:text-brand transition-colors font-medium text-sm md:text-base"
				>
					<span class="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center">👥</span>
					Facebook (/jeff)
				</a>
			</div>

			<div>
				<NuxtLink
					to="/booking"
					class="inline-block px-7 py-3 bg-brand hover:bg-brand-dark text-white rounded-full font-semibold shadow transition-colors"
				>
					Schedule a Photoshoot with Jeff →
				</NuxtLink>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "default",
});

useHead({
	title: "About Jeff Lee — Story & Journey",
	meta: [
		{ name: "description", content: "Learn about Jeff Lee, a storyteller and natural light portrait photographer based in Australia." },
	],
});
</script>
