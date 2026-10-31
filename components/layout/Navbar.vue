<template>
	<header class="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-line/50 transition-colors">
		<nav class="max-w-6xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
			<!-- Logo / Photographer Name -->
			<NuxtLink
				to="/"
				class="group flex flex-col"
			>
				<span class="font-serif text-xl md:text-2xl tracking-[0.08em] font-medium text-ink group-hover:opacity-60 transition-opacity">
					JEF LEE
				</span>
				<span class="text-[9px] uppercase tracking-[0.25em] text-ink-muted">
					Photography
				</span>
			</NuxtLink>

			<!-- Desktop Navigation Links -->
			<ul class="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.18em]">
				<li>
					<NuxtLink
						to="/works"
						class="text-ink-muted hover:text-ink transition-colors pb-1"
						active-class="!text-ink font-semibold border-b border-ink"
					>
						Works
					</NuxtLink>
				</li>
				<li>
					<NuxtLink
						to="/writing"
						class="text-ink-muted hover:text-ink transition-colors pb-1"
						active-class="!text-ink font-semibold border-b border-ink"
					>
						Writing
					</NuxtLink>
				</li>
				<li>
					<NuxtLink
						to="/about"
						class="text-ink-muted hover:text-ink transition-colors pb-1"
						active-class="!text-ink font-semibold border-b border-ink"
					>
						About
					</NuxtLink>
				</li>
				<li>
					<NuxtLink
						to="/contact"
						class="text-ink-muted hover:text-ink transition-colors pb-1"
						active-class="!text-ink font-semibold border-b border-ink"
					>
						Contact
					</NuxtLink>
				</li>
				<li>
					<NuxtLink
						to="/booking"
						class="px-4 py-1.5 border border-ink/80 text-ink hover:bg-ink hover:text-canvas transition-all duration-300 font-medium"
						active-class="bg-ink !text-canvas"
					>
						Book a Session
					</NuxtLink>
				</li>
			</ul>

			<!-- Mobile Menu Button -->
			<button
				type="button"
				class="md:hidden p-2 text-ink hover:opacity-60 transition-opacity focus:outline-none focus:ring-1 focus:ring-ink"
				aria-label="Toggle mobile menu"
				:aria-expanded="mobileMenuOpen.toString()"
				@click="mobileMenuOpen = !mobileMenuOpen"
			>
				<svg
					v-if="!mobileMenuOpen"
					class="w-6 h-6 stroke-[1.5]"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 9h16.5m-16.5 6.75h16.5"
					/>
				</svg>
				<svg
					v-else
					class="w-6 h-6 stroke-[1.5]"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</nav>

		<!-- Mobile Dropdown -->
		<div
			v-if="mobileMenuOpen"
			class="md:hidden border-t border-line/60 bg-canvas/95 px-6 py-8 space-y-5 text-sm uppercase tracking-[0.2em]"
		>
			<div>
				<NuxtLink
					to="/works"
					class="block text-ink-muted hover:text-ink transition-colors py-1.5"
					active-class="!text-ink font-semibold"
					@click="mobileMenuOpen = false"
				>
					Works
				</NuxtLink>
			</div>
			<div>
				<NuxtLink
					to="/writing"
					class="block text-ink-muted hover:text-ink transition-colors py-1.5"
					active-class="!text-ink font-semibold"
					@click="mobileMenuOpen = false"
				>
					Writing
				</NuxtLink>
			</div>
			<div>
				<NuxtLink
					to="/about"
					class="block text-ink-muted hover:text-ink transition-colors py-1.5"
					active-class="!text-ink font-semibold"
					@click="mobileMenuOpen = false"
				>
					About
				</NuxtLink>
			</div>
			<div>
				<NuxtLink
					to="/contact"
					class="block text-ink-muted hover:text-ink transition-colors py-1.5"
					active-class="!text-ink font-semibold"
					@click="mobileMenuOpen = false"
				>
					Contact
				</NuxtLink>
			</div>
			<div class="pt-2">
				<NuxtLink
					to="/booking"
					class="inline-block px-5 py-2.5 border border-ink text-ink text-xs uppercase tracking-[0.2em] font-medium hover:bg-ink hover:text-canvas transition-colors"
					@click="mobileMenuOpen = false"
				>
					Book a Session
				</NuxtLink>
			</div>
		</div>
	</header>
</template>

<script setup>
import { ref } from "vue";

const mobileMenuOpen = ref(false);
</script>
