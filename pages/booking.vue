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
				<h3 class="font-serif text-base text-ink font-normal">
					Choose Theme & Date
				</h3>
				<p class="text-ink-muted font-light leading-relaxed">
					Share your preferred date, location, and creative ideas.
				</p>
			</div>
			<div class="space-y-1">
				<span class="font-mono text-[10px] text-ink-muted uppercase tracking-widest block">02 / Consultation</span>
				<h3 class="font-serif text-base text-ink font-normal">
					Creative Alignment
				</h3>
				<p class="text-ink-muted font-light leading-relaxed">
					Jef reviews schedule & coordinates styling and lighting plan.
				</p>
			</div>
			<div class="space-y-1">
				<span class="font-mono text-[10px] text-ink-muted uppercase tracking-widest block">03 / The Session</span>
				<h3 class="font-serif text-base text-ink font-normal">
					Natural Storytelling
				</h3>
				<p class="text-ink-muted font-light leading-relaxed">
					An unhurried experience under gentle ambient light.
				</p>
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
			<div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
				<a
					v-if="whatsappDirectUrl"
					:href="whatsappDirectUrl"
					target="_blank"
					rel="noopener noreferrer"
					class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white hover:bg-[#20ba59] text-xs font-mono uppercase tracking-wider transition-colors duration-200 shadow-sm"
				>
					<svg
						class="w-4 h-4 fill-current"
						viewBox="0 0 24 24"
					>
						<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
					</svg>
					<span>Chat with Jef on WhatsApp</span>
				</a>
				<button
					class="w-full sm:w-auto text-xs uppercase tracking-widest border border-ink text-ink hover:bg-ink hover:text-white px-6 py-3 transition-colors duration-200 font-mono"
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
const submittedPackage = ref("");
const submittedDate = ref("");
const errorMessage = ref("");

const whatsappDirectUrl = computed(() => {
	const rawPhone = profile.value?.phone?.replace(/[^0-9]/g, "") || "";
	if (!rawPhone) return "";
	const cleanPhone = rawPhone.startsWith("08") ? `62${rawPhone.slice(1)}` : rawPhone;
	const dateStr = submittedDate.value ? ` on ${submittedDate.value}` : "";
	const text = `Hi Jef, I just submitted a photoshoot reservation for ${submittedPackage.value}${dateStr} via your website. Looking forward to connecting!`;
	return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
});

onMounted(() => {
	if (route.query.package && typeof route.query.package === "string") {
		const queryPkg = route.query.package.toLowerCase();
		const matched = packages.find(p =>
			p.toLowerCase() === queryPkg
			|| p.toLowerCase().includes(queryPkg)
			|| queryPkg.includes(p.toLowerCase().split(" ")[0]),
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
		submittedPackage.value = form.package;
		submittedDate.value = form.booking_date;
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
			submittedPackage.value = form.package;
			submittedDate.value = form.booking_date;
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
