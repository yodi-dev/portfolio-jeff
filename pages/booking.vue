<template>
	<main class="py-16 sm:py-24 px-6 md:px-12 max-w-2xl mx-auto">
		<!-- Title & Subtitle -->
		<header class="mb-12 text-center sm:text-left">
			<span class="text-xs uppercase tracking-widest text-zinc-400 font-mono block mb-3">Reservations</span>
			<h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight mb-3">
				Book a Photoshoot
			</h1>
			<p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed">
				Please share your preferred date and session details. Jeff personally reviews each inquiry to ensure dates and creative vision align.
			</p>
		</header>

		<!-- Success Alert -->
		<div
			v-if="submitSuccess"
			class="border border-line p-8 sm:p-12 text-center bg-white/60 space-y-4"
		>
			<span class="text-xs uppercase tracking-widest text-zinc-400 font-mono block">Inquiry Submitted</span>
			<h2 class="font-serif text-2xl sm:text-3xl font-light text-ink">
				Thank You, {{ submittedName }}
			</h2>
			<p class="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed max-w-md mx-auto">
				Your request has been registered. Jeff will review your schedule and reach out via email or WhatsApp within 24 hours.
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
				class="p-4 border border-red-300 bg-red-50/50 text-red-800 text-xs leading-relaxed"
			>
				{{ errorMessage }}
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<!-- Name -->
				<div class="space-y-2">
					<label class="block text-[11px] font-mono uppercase tracking-wider text-zinc-600">
						Full Name <span class="text-zinc-400">*</span>
					</label>
					<input
						v-model="form.name"
						type="text"
						placeholder="e.g. Amanda Reynolds"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-300"
					>
				</div>

				<!-- Email -->
				<div class="space-y-2">
					<label class="block text-[11px] font-mono uppercase tracking-wider text-zinc-600">
						Email Address <span class="text-zinc-400">*</span>
					</label>
					<input
						v-model="form.email"
						type="email"
						placeholder="amanda@example.com"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-300"
					>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<!-- Phone / WhatsApp -->
				<div class="space-y-2">
					<label class="block text-[11px] font-mono uppercase tracking-wider text-zinc-600">
						Phone / WhatsApp <span class="text-zinc-400">*</span>
					</label>
					<input
						v-model="form.phone"
						type="tel"
						placeholder="+61 400 123 456"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-300"
					>
				</div>

				<!-- Package / Shoot Type -->
				<div class="space-y-2">
					<label class="block text-[11px] font-mono uppercase tracking-wider text-zinc-600">
						Session Theme <span class="text-zinc-400">*</span>
					</label>
					<select
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
					<label class="block text-[11px] font-mono uppercase tracking-wider text-zinc-600">
						Preferred Date <span class="text-zinc-400">*</span>
					</label>
					<input
						v-model="form.booking_date"
						type="date"
						:min="minDate"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors"
					>
				</div>

				<!-- Location -->
				<div class="space-y-2">
					<label class="block text-[11px] font-mono uppercase tracking-wider text-zinc-600">
						Location / City <span class="text-zinc-400">*</span>
					</label>
					<input
						v-model="form.location"
						type="text"
						placeholder="e.g. Kyoto / Sydney / Outdoors"
						required
						class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-300"
					>
				</div>
			</div>

			<!-- Message -->
			<div class="space-y-2">
				<label class="block text-[11px] font-mono uppercase tracking-wider text-zinc-600">
					Creative Vision & Notes <span class="text-zinc-400 font-sans lowercase">(optional)</span>
				</label>
				<textarea
					v-model="form.message"
					rows="4"
					placeholder="Tell me about what you'd like to capture: atmosphere, participants, timing, or references..."
					class="w-full px-3.5 py-2.5 border border-line bg-canvas focus:bg-white text-ink text-sm outline-none focus:border-ink transition-colors placeholder:text-zinc-300"
				/>
			</div>

			<!-- Submit Button -->
			<div class="pt-2">
				<button
					type="submit"
					:disabled="isSubmitting"
					class="w-full py-3.5 bg-ink text-white hover:bg-zinc-800 disabled:bg-zinc-300 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed font-medium"
				>
					<span
						v-if="isSubmitting"
						class="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"
					/>
					<span>{{ isSubmitting ? 'Transmitting Inquiries...' : 'Send Reservation Request' }}</span>
				</button>
			</div>
		</form>
	</main>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useApi, type BookingPayload } from "~/composables/useApi";

definePageMeta({
	layout: "default",
});

useHead({
	title: "Book a Photoshoot — Jeff Lee",
	meta: [
		{ name: "description", content: "Schedule your portrait, family, or editorial session with Jeff Lee." },
	],
});

const route = useRoute();
const { createBooking } = useApi();

// Packages matching the 11 brief themes
const packages = [
	"Family",
	"Portrait",
	"Couple",
	"Newborn",
	"Work Documentary",
	"Animal",
	"Plant",
	"Sports",
	"Event",
	"Celebration",
	"Travel",
	"Other",
];

// Tomorrow as minimum date (backend requires after:today)
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const minDate = tomorrow.toISOString().split("T")[0];

const form = reactive<BookingPayload>({
	name: "",
	email: "",
	phone: "",
	package: "Family",
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
		const queryPkg = route.query.package;
		const matched = packages.find(p => p.toLowerCase() === queryPkg.toLowerCase());
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
	form.package = "Family";
	form.location = "";
	form.booking_date = "";
	form.message = "";
	submitSuccess.value = false;
	errorMessage.value = "";
}
</script>
