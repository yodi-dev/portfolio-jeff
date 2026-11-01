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
			<div
				v-if="profile.email"
				class="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
			>
				<div>
					<span class="text-xs uppercase tracking-widest text-zinc-500 block font-mono">Electronic Mail</span>
					<span class="text-xs text-zinc-500">General correspondence & commissions</span>
				</div>
				<a
					:href="`mailto:${profile.email}`"
					class="font-mono text-xs sm:text-sm text-ink hover:text-zinc-500 transition-colors"
				>
					{{ profile.email }}
				</a>
			</div>

			<!-- Direct Line / WhatsApp -->
			<div
				v-if="profile.phone"
				class="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
			>
				<div>
					<span class="text-xs uppercase tracking-widest text-zinc-500 block font-mono">Direct Line / WhatsApp</span>
					<span class="text-xs text-zinc-500">Fastest response for scheduling</span>
				</div>
				<a
					:href="`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`"
					target="_blank"
					rel="noopener noreferrer"
					class="font-mono text-xs sm:text-sm text-ink hover:text-zinc-500 transition-colors"
				>
					{{ profile.phone }}
				</a>
			</div>

			<!-- Instagram -->
			<div
				v-if="profile.instagram"
				class="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
			>
				<div>
					<span class="text-xs uppercase tracking-widest text-zinc-500 block font-mono">Visual Journal</span>
					<span class="text-xs text-zinc-500">Daily rolls & behind-the-scenes</span>
				</div>
				<a
					:href="profile.instagram_url || `https://instagram.com/${profile.instagram.replace('@', '')}`"
					target="_blank"
					rel="noopener noreferrer"
					class="font-mono text-xs sm:text-sm text-ink hover:text-zinc-500 transition-colors"
				>
					{{ profile.instagram_url ? profile.instagram_url.replace('https://', '') : `instagram.com/${profile.instagram.replace('@', '')}` }}
				</a>
			</div>

			<!-- Location -->
			<div
				v-if="profile.location"
				class="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
			>
				<div>
					<span class="text-xs uppercase tracking-widest text-zinc-500 block font-mono">Location Base</span>
					<span class="text-xs text-zinc-500">Available for travel commissions</span>
				</div>
				<span class="font-mono text-xs sm:text-sm text-zinc-600">
					{{ profile.location }}
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
import { computed } from "vue";
import { useApi, type PhotographerProfile } from "~/composables/useApi";

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

const { getProfile } = useApi();

const defaultProfile: PhotographerProfile = {
	id: 1,
	name: "Jef Lee",
	tagline: "Portrait & Documentary Photographer",
	headline: "Telling honest stories through natural light and quiet moments.",
	avatar: "/images/jeff-portrait.jpeg",
	location: "Australia / Kyoto, Japan",
	email: "jef@example.com",
	phone: "+61 400 123 456",
	instagram: "@jeflee",
	instagram_url: "https://instagram.com/jeflee",
};

const { data: profileData } = useLazyAsyncData("photographer-profile-contact", async () => {
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
</script>
