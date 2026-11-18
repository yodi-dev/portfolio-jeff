<template>
	<div class="flex flex-col min-h-screen bg-canvas text-ink selection:bg-ink selection:text-canvas">
		<!-- Navigation Header -->
		<Navbar />

		<!-- Error Content -->
		<main class="flex-1 flex items-center justify-center px-6 py-20 md:py-32">
			<div class="max-w-2xl mx-auto text-center">
				<!-- Minimalist framing watermark -->
				<div class="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-line text-[10px] tracking-[0.25em] uppercase text-ink-muted">
					<span>{{ isNotFound ? 'STATUS 404' : `STATUS ${error?.statusCode || 500}` }}</span>
					<span class="w-1 h-1 bg-ink/40 rounded-full" />
					<span>{{ isNotFound ? 'OUT OF FRAME' : 'EXPOSURE PAUSED' }}</span>
				</div>

				<!-- Main Headline -->
				<h1 class="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-normal tracking-tight leading-[1.15] mb-6">
					{{ isNotFound ? 'This moment cannot be found under this light.' : 'A brief pause in the darkroom.' }}
				</h1>

				<!-- Subtitle / Narrative -->
				<p class="text-ink-muted text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10 font-light">
					{{
						isNotFound
							? 'The photograph, story, or archive you are seeking might have been moved, renamed, or was never captured into the permanent collection.'
							: (error?.message || 'An unexpected interruption occurred while loading this view. Please try refreshing the frame or return to the exhibition.')
					}}
				</p>

				<!-- Action Buttons -->
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<button
						type="button"
						class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-ink text-canvas text-xs uppercase tracking-[0.2em] font-medium hover:bg-ink-light transition-colors duration-200"
						@click="handleClear('/works')"
					>
						Explore Works
					</button>

					<button
						type="button"
						class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-line text-ink text-xs uppercase tracking-[0.2em] font-medium hover:border-ink hover:bg-canvas transition-colors duration-200"
						@click="handleClear('/')"
					>
						Return Home
					</button>
				</div>

				<!-- Subtle Framing Marks -->
				<div class="mt-16 flex items-center justify-center gap-4 text-ink-muted/30 text-[10px] tracking-[0.3em] uppercase">
					<span>[ 35MM ]</span>
					<span class="w-6 h-[1px] bg-line" />
					<span>[ ARCHIVE ]</span>
				</div>
			</div>
		</main>

		<!-- Minimalist Footer -->
		<Footer />
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import Navbar from "~/components/layout/Navbar.vue";
import Footer from "~/components/layout/Footer.vue";

const props = defineProps<{
	error: NuxtError;
}>();

const isNotFound = computed(() => props.error?.statusCode === 404);

const handleClear = (redirectPath: string) => {
	clearError({ redirect: redirectPath });
};

useHead({
	title: isNotFound.value
		? "404 — Out of Frame | Jef Lee Photography"
		: `${props.error?.statusCode || 500} — Transient Shutter Pause | Jef Lee Photography`,
	meta: [
		{
			name: "robots",
			content: "noindex, follow",
		},
	],
});
</script>
