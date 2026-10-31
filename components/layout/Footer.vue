<template>
	<footer class="border-t border-line/60 bg-canvas mt-24 py-16 px-6 md:px-12 text-ink">
		<div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
			<!-- Left: Photographer Branding -->
			<div class="space-y-2">
				<NuxtLink
					to="/"
					class="font-serif text-xl tracking-[0.08em] font-medium text-ink hover:opacity-60 transition-opacity"
				>
					JEF LEE
				</NuxtLink>
				<p class="text-xs text-ink-muted tracking-[0.05em] max-w-sm leading-relaxed">
					Portrait & documentary photography grounded in natural light, stillness, and honest moments.
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
					href="https://instagram.com"
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
			<p>© {{ new Date().getFullYear() }} Jef Lee. All rights reserved.</p>
			<div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
				<span>Crafted by <a href="https://awanbeo.my.id" target="_blank" rel="noopener noreferrer" class="text-ink font-medium hover:underline underline-offset-4 transition-colors">awanbeo.my.id</a></span>
				<span class="text-zinc-300">/</span>
				<span class="tracking-widest uppercase text-[10px]">Natural Light & Stories</span>
			</div>
		</div>
	</footer>
</template>
