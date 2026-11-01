<template>
	<footer class="border-t border-line/60 bg-canvas mt-24 py-16 px-6 md:px-12 text-ink">
		<div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
			<!-- Left: Photographer Branding -->
			<div class="space-y-2">
				<NuxtLink
					to="/"
					class="font-serif text-xl tracking-[0.08em] font-medium text-ink hover:opacity-60 transition-opacity uppercase"
				>
					{{ profile.name }}
				</NuxtLink>
				<p class="text-xs text-ink-muted tracking-[0.05em] max-w-sm leading-relaxed">
					{{ profile.tagline }}
				</p>
			</div>

			<!-- Center / Right: Minimalist Links & Socials -->
			<div class="flex flex-wrap gap-8 text-xs uppercase tracking-[0.18em] text-ink-muted">
				<NuxtLink
					to="/works"
					class="hover:text-ink transition-colors"
				>
					Works
				</NuxtLink>
				<NuxtLink
					to="/writing"
					class="hover:text-ink transition-colors"
				>
					Writing
				</NuxtLink>
				<NuxtLink
					to="/about"
					class="hover:text-ink transition-colors"
				>
					About
				</NuxtLink>
				<NuxtLink
					to="/contact"
					class="hover:text-ink transition-colors"
				>
					Contact
				</NuxtLink>
				<NuxtLink
					to="/booking"
					class="hover:text-ink transition-colors"
				>
					Booking
				</NuxtLink>
				<a
					:href="profile.instagram_url || 'https://instagram.com'"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-ink transition-colors"
				>
					Instagram
				</a>
			</div>
		</div>

		<!-- Bottom Copyright & Credit -->
		<div class="max-w-6xl mx-auto mt-12 pt-8 border-t border-line/40 flex flex-col sm:flex-row justify-between items-center text-[11px] text-ink-muted tracking-wider gap-4">
			<p>© {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.</p>
			<div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
				<span>Crafted by <a href="https://awanbeo.my.id" target="_blank" rel="noopener noreferrer" class="text-ink font-medium hover:underline underline-offset-4 transition-colors">awanbeo.my.id</a></span>
				<span class="text-zinc-300">/</span>
				<span class="tracking-widest uppercase text-[10px]">Natural Light & Stories</span>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useApi, type PhotographerProfile } from "~/composables/useApi";

const { getProfile } = useApi();

const defaultProfile: PhotographerProfile = {
	id: 1,
	name: "Jef Lee",
	tagline: "Portrait & documentary photography grounded in natural light, stillness, and honest moments.",
	headline: "Telling honest stories through natural light and quiet moments.",
	instagram_url: "https://instagram.com/jeflee",
};

const { data: profileData } = useLazyAsyncData("photographer-profile-footer", async () => {
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
