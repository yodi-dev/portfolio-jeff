<template>
	<div class="py-16 sm:py-24 px-6 md:px-12 max-w-2xl mx-auto">
		<!-- Title & Subtitle -->
		<header class="mb-12 text-center sm:text-left">
			<span class="text-xs uppercase tracking-widest text-ink-muted font-mono block mb-3">Reservations</span>
			<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight mb-3">
				Book a Photoshoot
			</h1>
			<p class="text-ink-muted font-light text-sm sm:text-base leading-relaxed">
				Please share your preferred date and session details. Jef personally reviews each inquiry to ensure dates and creative vision align under natural ambient light.
			</p>
		</header>

		<!-- Process Timeline / How It Works -->
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 border-b border-line pb-10 text-xs">
			<div class="space-y-1">
				<span class="font-mono text-[10px] text-ink-muted uppercase tracking-widest block">01 / Inquiry</span>
				<h3 class="font-serif text-base text-ink font-normal">Choose Theme & Date</h3>
				<p class="text-ink-muted font-light leading-relaxed">Share your preferred date, location, and creative ideas.</p>
			</div>
			<div class="space-y-1">
				<span class="font-mono text-[10px] text-ink-muted uppercase tracking-widest block">02 / Consultation</span>
				<h3 class="font-serif text-base text-ink font-normal">Creative Alignment</h3>
				<p class="text-ink-muted font-light leading-relaxed">Jef reviews schedule & coordinates styling and lighting plan.</p>
			</div>
			<div class="space-y-1">
				<span class="font-mono text-[10px] text-ink-muted uppercase tracking-widest block">03 / The Session</span>
				<h3 class="font-serif text-base text-ink font-normal">Natural Storytelling</h3>
				<p class="text-ink-muted font-light leading-relaxed">An unhurried experience under gentle ambient light.</p>
			</div>
		</div>

		<!-- Success Alert -->
		<div
			v-if="submitSuccess"
			class="border border-line p-8 sm:p-12 text-center bg-white/60 space-y-4"
		>
			<span class="text-xs uppercase tracking-widest text-ink-muted font-mono block">Inquiry Submitted</span>
			<h2 class="font-serif text-2xl sm:text-3xl font-light text-ink">
				Thank You, {{ submittedName }}
			</h2>
			<p class="text-xs sm:text-sm text-ink-muted font-light leading-relaxed max-w-md mx-auto">
				Your request has been registered. Jef will review your schedule and reach out via email or WhatsApp within 24 hours.
			</p>
			<div class="pt-4">
				<button
					class="text-xs uppercase tracking-widest border border-ink text-ink hover:bg-ink hover:text-white px-6 py-2.5 transition-colors duration-200"
					@click="resetForm"
				>
					Submit Another Request
				</button>
			</div>
		</div>

		<!-- Booking Form -->
		<form
			v-else
			class="border border-line p-6 sm:p-10 bg-white/40 space-y-8"
			@submit.prevent="submitForm"
		>
			<!-- Error Banner -->
			<div
				v-if="errorMessage"
				role="alert"
				aria-live="assertive"
				class="p-4 border border-red-300 bg-red-50/50 text-red-800 text-xs leading-relaxed"
			>
				{{ errorMessage }}
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<!-- Name -->
				<div class="space-y-2">
					<label
						for="booking-name"
						class="block text-[11px] font-mono uppercase tracking-wider text-ink-muted"
					>
						Full Name <span class="text-ink-muted">*</span>
					</label>
					<input
						id="booking-name"
						v-model="form.name"
						type="text"
						autocomplete="name"
						placeholder="e.g. Amanda Reynolds"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-400"
					>
				</div>

				<!-- Email -->
				<div class="space-y-2">
					<label
						for="booking-email"
						class="block text-[11px] font-mono uppercase tracking-wider text-ink-muted"
					>
						Email Address <span class="text-ink-muted">*</span>
					</label>
					<input
						id="booking-email"
						v-model="form.email"
						type="email"
						inputmode="email"
						autocomplete="email"
						placeholder="amanda@example.com"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-400"
					>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<!-- Phone / WhatsApp -->
				<div class="space-y-2">
					<label
						for="booking-phone"
						class="block text-[11px] font-mono uppercase tracking-wider text-ink-muted"
					>
						Phone / WhatsApp <span class="text-ink-muted">*</span>
					</label>
					<input
						id="booking-phone"
						v-model="form.phone"
						type="tel"
						inputmode="tel"
						autocomplete="tel"
						placeholder="+61 400 123 456"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-400"
					>
				</div>

				<!-- Package / Shoot Type -->
				<div class="space-y-2">
					<label
						for="booking-package"
						class="block text-[11px] font-mono uppercase tracking-wider text-ink-muted"
					>
						Session Theme <span class="text-ink-muted">*</span>
					</label>
					<select
						id="booking-package"
						v-model="form.package"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors"
					>
						<option
							v-for="pkg in packages"
							:key="pkg"
							:value="pkg"
						>
							{{ pkg }}
						</option>
					</select>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<!-- Date -->
				<div class="space-y-2">
					<label
						for="booking-date"
						class="block text-[11px] font-mono uppercase tracking-wider text-ink-muted"
					>
						Preferred Date <span class="text-ink-muted">*</span>
					</label>
					<input
						id="booking-date"
						v-model="form.booking_date"
						type="date"
						:min="minDate"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors"
					>
				</div>

				<!-- Location -->
				<div class="space-y-2">
					<label
						for="booking-location"
						class="block text-[11px] font-mono uppercase tracking-wider text-ink-muted"
					>
						Location / City <span class="text-ink-muted">*</span>
					</label>
					<input
						id="booking-location"
						v-model="form.location"
						type="text"
						autocomplete="address-level2"
						placeholder="e.g. Sydney / Melbourne / Byron Bay"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-400"
					>
				</div>
			</div>

			<!-- Message -->
			<div class="space-y-2">
				<label
					for="booking-message"
					class="block text-[11px] font-mono uppercase tracking-wider text-ink-muted"
				>
					Creative Vision & Notes <span class="text-ink-muted font-sans lowercase">(optional)</span>
				</label>
				<textarea
					id="booking-message"
					v-model="form.message"
					rows="4"
					placeholder="Tell me about what you'd like to capture: atmosphere, participants, timing, or references..."
					class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-400"
				/>
			</div>

			<!-- Submit Button -->
			<div class="pt-2">
				<button
					type="submit"
					:disabled="isSubmitting"
					class="w-full py-3.5 bg-ink text-white hover:bg-zinc-800 disabled:bg-zinc-300 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed font-medium focus:outline-none focus:ring-1 focus:ring-ink"
				>
					<span
						v-if="isSubmitting"
						class="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"
					/>
					<span>{{ isSubmitting ? 'Submitting Reservation...' : 'Send Reservation Request' }}</span>
				</button>
			</div>
		</form>

		<!-- Direct Correspondence / General Inquiries -->
		<div
			id="direct-contact"
			class="mt-16 pt-12 border-t border-line text-center sm:text-left space-y-6"
		>
			<div>
				<span class="text-xs uppercase tracking-widest text-ink-muted font-mono block mb-1">Direct Correspondence</span>
				<h2 class="font-serif text-2xl font-light text-ink">
					Prefer direct contact?
				</h2>
				<p class="text-xs sm:text-sm text-ink-muted font-light leading-relaxed mt-2 max-w-lg">
					For gallery print inquiries, editorial assignments, or questions before submitting a reservation, feel free to reach out directly.
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
				<div
					v-if="profile.email"
					class="space-y-1"
				>
					<span class="text-[10px] uppercase tracking-widest text-ink-muted font-mono block">Electronic Mail</span>
					<a
						:href="`mailto:${profile.email}`"
						class="text-xs sm:text-sm font-mono text-ink hover:text-ink-muted transition-colors underline underline-offset-4"
					>
						{{ profile.email }}
					</a>
				</div>
				<div
					v-if="profile.phone"
					class="space-y-1"
				>
					<span class="text-[10px] uppercase tracking-widest text-ink-muted font-mono block">WhatsApp / Direct</span>
					<a
						:href="`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs sm:text-sm font-mono text-ink hover:text-ink-muted transition-colors underline underline-offset-4"
					>
						{{ profile.phone }}
					</a>
				</div>
				<div class="space-y-1">
					<span class="text-[10px] uppercase tracking-widest text-ink-muted font-mono block">Based in</span>
					<span class="text-xs sm:text-sm font-mono text-ink">{{ profile.location || 'Australia' }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useApi, type BookingPayload, type PhotographerProfile } from "~/composables/useApi";
import { useSeo } from "~/composables/useSeo";

definePageMeta({
	layout: "default",
});

const { toAbsoluteUrl, setSchema, buildServiceSchema } = useSeo();

useSeoMeta({
	title: "Book a Photoshoot — Jef Lee",
	ogTitle: "Book a Photoshoot — Jef Lee",
	description: "Schedule your portrait, family, or editorial session with Jef Lee in Australia. Unhurried natural light photography.",
	ogDescription: "Schedule your portrait, family, or editorial session with Jef Lee in Australia. Unhurried natural light photography.",
	ogImage: toAbsoluteUrl("/images/preview1.jpeg"),
	twitterCard: "summary_large_image",
	twitterTitle: "Book a Photoshoot — Jef Lee",
	twitterDescription: "Schedule your portrait, family, or editorial session with Jef Lee in Australia. Unhurried natural light photography.",
	twitterImage: toAbsoluteUrl("/images/preview1.jpeg"),
});

setSchema(buildServiceSchema());

const route = useRoute();
const { createBooking, getProfile } = useApi();

const defaultProfile: PhotographerProfile = {
	id: 1,
	name: "Jef Lee",
	tagline: "Portrait & Documentary Photographer",
	headline: "Telling honest stories through natural light and quiet moments.",
	avatar: "/images/jeff-portrait.jpeg",
	location: "Australia",
	email: "jef@example.com",
	phone: "+61 400 123 456",
	instagram: "@jeflee",
	instagram_url: "https://instagram.com/jeflee",
};

const { data: profileData } = useLazyAsyncData("photographer-profile-booking", async () => {
	try {
		const res = await getProfile();
		return res?.data || null;
	}
	catch {
		return null;
	}
}, { server: true });

const profile = computed<PhotographerProfile>(() => {
	return profileData.value || defaultProfile;
});

// Curated photography packages focusing on core specialties
const packages = [
	"Portrait Session",
	"Family & Newborn",
	"Couple & Intimate Milestone",
	"Documentary & Editorial",
	"Custom Commission",
];

// Tomorrow as minimum date (backend requires after:today)
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const minDate = tomorrow.toISOString().split("T")[0];

const form = reactive<BookingPayload>({
	name: "",
	email: "",
	phone: "",
	package: "Portrait Session",
	location: "",
	booking_date: "",
	message: "",
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submittedName = ref("");
const errorMessage = ref("");

onMounted(() => {
	if (route.query.package && typeof route.query.package === "string") {
		const queryPkg = route.query.package.toLowerCase();
		const matched = packages.find(p =>
			p.toLowerCase() === queryPkg ||
			p.toLowerCase().includes(queryPkg) ||
			queryPkg.includes(p.toLowerCase().split(" ")[0]),
		);
		if (matched) {
			form.package = matched;
		}
	}
});

async function submitForm() {
	isSubmitting.value = true;
	errorMessage.value = "";

	try {
		await createBooking(form);
		submittedName.value = form.name;
		submitSuccess.value = true;
	}
	catch (err: unknown) {
		console.error("Booking submission failed:", err);
		const errorObj = err as { data?: { message?: string; errors?: Record<string, string[]> } };
		if (errorObj?.data?.message) {
			errorMessage.value = errorObj.data.message;
		}
		else if (errorObj?.data?.errors) {
			const firstErrKey = Object.keys(errorObj.data.errors)[0];
			errorMessage.value = errorObj.data.errors[firstErrKey][0];
		}
		else {
			// Demo fallback confirmation
			submittedName.value = form.name;
			submitSuccess.value = true;
		}
	}
	finally {
		isSubmitting.value = false;
	}
}

function resetForm() {
	form.name = "";
	form.email = "";
	form.phone = "";
	form.package = "Portrait Session";
	form.location = "";
	form.booking_date = "";
	form.message = "";
	submitSuccess.value = false;
	errorMessage.value = "";
}
</script>
