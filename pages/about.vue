<template>
	<main class="py-16 sm:py-24 px-6 md:px-12 max-w-4xl mx-auto">
		<!-- Profile Header Grid -->
		<section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start mb-24">
			<!-- Portrait Photo -->
			<div class="md:col-span-5">
				<div class="aspect-[3/4] bg-zinc-100 overflow-hidden">
					<img
						:src="resolveImageUrl(profile.avatar, '/images/jeff-portrait.jpeg')"
						:alt="`${profile.name} Portrait`"
						class="w-full h-full object-cover grayscale brightness-95"
						loading="lazy"
						decoding="async"
						@error="(e) => onImageError(e, '/images/jeff-portrait.jpeg')"
					>
				</div>
				<p class="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mt-3">
					{{ profile.name }} — {{ profile.location || 'Australia / Kyoto' }}
				</p>
			</div>

			<!-- Bio Intro -->
			<div class="md:col-span-7 space-y-6">
				<span class="text-xs uppercase tracking-widest text-zinc-500 font-mono block">Biography & Vision</span>
				<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight leading-tight">
					{{ profile.about_title || 'Documenting the quiet cadence of ordinary life.' }}
				</h1>
				<div class="text-zinc-600 font-light text-base leading-relaxed space-y-5 pt-2">
					<p
						v-for="(para, idx) in journeyParagraphs"
						:key="idx"
					>
						{{ para }}
					</p>
				</div>
			</div>
		</section>

		<!-- Philosophy / Methodology -->
		<section class="border-t border-line pt-16 mb-24">
			<div class="mb-12 max-w-2xl">
				<span class="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">Approach</span>
				<h2 class="font-serif text-2xl sm:text-3xl font-light text-ink mb-4">
					Working Philosophy
				</h2>
				<p
					v-if="profile.about_philosophy"
					class="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed"
				>
					{{ profile.about_philosophy }}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
				<div
					v-for="phil in philosophies"
					:key="phil.number"
					class="space-y-3"
				>
					<span class="font-mono text-xs text-zinc-500">{{ phil.number }}</span>
					<h3 class="font-serif text-lg text-ink">
						{{ phil.title }}
					</h3>
					<p class="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
						{{ phil.description }}
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
					<div
						v-if="profile.email"
						class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-line text-sm"
					>
						<span class="text-zinc-500 text-xs uppercase tracking-widest">Email</span>
						<a
							:href="`mailto:${profile.email}`"
							class="text-ink hover:text-zinc-500 font-mono text-xs tracking-wider transition-colors mt-1 sm:mt-0"
						>
							{{ profile.email }}
						</a>
					</div>
					<div
						v-if="profile.instagram"
						class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-line text-sm"
					>
						<span class="text-zinc-500 text-xs uppercase tracking-widest">Instagram</span>
						<a
							:href="profile.instagram_url || `https://instagram.com/${profile.instagram.replace('@', '')}`"
							target="_blank"
							rel="noopener noreferrer"
							class="text-ink hover:text-zinc-500 font-mono text-xs tracking-wider transition-colors mt-1 sm:mt-0"
						>
							{{ profile.instagram }}
						</a>
					</div>
					<div
						v-if="profile.phone"
						class="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-line text-sm"
					>
						<span class="text-zinc-500 text-xs uppercase tracking-widest">Direct Line</span>
						<a
							:href="`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`"
							target="_blank"
							rel="noopener noreferrer"
							class="text-ink hover:text-zinc-500 font-mono text-xs tracking-wider transition-colors mt-1 sm:mt-0"
						>
							{{ profile.phone }}
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
import { computed } from "vue";
import { useApi, type PhotographerProfile, type PhotographerPhilosophy } from "~/composables/useApi";

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

const { getProfile, resolveImageUrl, onImageError } = useApi();

const defaultProfile: PhotographerProfile = {
	id: 1,
	name: "Jef Lee",
	tagline: "Portrait & Documentary Photographer",
	headline: "Telling honest stories through natural light and quiet moments.",
	sub_headline: "A portrait and documentary photographer dedicated to capturing genuine human warmth, family milestones, and timeless atmosphere.",
	quote: "Photography is more than capturing light — it is preserving life itself, pausing the fleeting smiles and quiet touches before they fade into memory.",
	about_title: "Documenting the quiet cadence of ordinary life.",
	about_journey: "My journey in photography began not in a commercial studio, but on the quiet morning coastlines of Australia, carrying a single mechanical camera. I became fascinated with how fleeting ambient light turns everyday moments into enduring memories.\n\nOver the past several years, that fascination evolved into an intentional practice: photographing families, quiet portraits, artisan workshops, and unscripted daily life. I believe photography reaches its highest emotional truth when the camera ceases to be an intrusion and becomes an unobtrusive observer.",
	about_philosophy: "My philosophy is grounded in minimal gear and maximum connection. Rather than directing rigid poses, I facilitate a relaxed, unhurried space where your natural laughter, spontaneous smiles, and tender glances can unfold organically under soft ambient light.",
	journey_paragraphs: [
		"My journey in photography began not in a commercial studio, but on the quiet morning coastlines of Australia, carrying a single mechanical camera. I became fascinated with how fleeting ambient light turns everyday moments into enduring memories.",
		"Over the past several years, that fascination evolved into an intentional practice: photographing families, quiet portraits, artisan workshops, and unscripted daily life. I believe photography reaches its highest emotional truth when the camera ceases to be an intrusion and becomes an unobtrusive observer.",
	],
	philosophies: [
		{
			number: "01",
			title: "Natural Ambient Light",
			description: "Working strictly with natural morning glow and twilight to preserve the authentic mood and emotional warmth of the atmosphere.",
		},
		{
			number: "02",
			title: "The Unrehearsed Moment",
			description: "Avoiding rigid posing in favor of patient observation. Allowing genuine connection, laughter, and intimacy to unfold naturally.",
		},
		{
			number: "03",
			title: "Archival Craftsmanship",
			description: "Each photograph is individually graded with timeless, film-inspired tone curves suited for fine art print collections.",
		},
	],
	avatar: "/images/jeff-portrait.jpeg",
	location: "Australia / Kyoto, Japan",
	email: "jef@example.com",
	phone: "+61 400 123 456",
	instagram: "@jeflee",
	instagram_url: "https://instagram.com/jeflee",
};

const { data: profileData } = useLazyAsyncData("photographer-profile-about", async () => {
	try {
		const res = await getProfile();
		return res?.data || null;
	}
	catch {
		return null;
	}
}, {
	default: () => null,
	getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
});

const profile = computed<PhotographerProfile>(() => {
	return profileData.value || defaultProfile;
});

const journeyParagraphs = computed<string[]>(() => {
	if (profile.value.journey_paragraphs && profile.value.journey_paragraphs.length > 0) {
		return profile.value.journey_paragraphs;
	}
	if (profile.value.about_journey) {
		return profile.value.about_journey.split("\n").map(s => s.trim()).filter(Boolean);
	}
	return defaultProfile.journey_paragraphs || [];
});

const philosophies = computed<PhotographerPhilosophy[]>(() => {
	if (profile.value.philosophies && profile.value.philosophies.length > 0) {
		return profile.value.philosophies;
	}
	return defaultProfile.philosophies || [];
});
</script>
