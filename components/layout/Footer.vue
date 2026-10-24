<template>
    <footer class="bg-gray-100 dark:bg-gray-900 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
        <div class="container py-12 px-6 md:px-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
                <!-- Brand Info -->
                <div>
                    <h3 class="text-lg font-bold text-brand mb-2">Jeff Lee Photography</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                        Capturing authentic moments and storytelling visuals under natural light across Australia.
                    </p>
                </div>

                <!-- Navigation -->
                <div>
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-text-light dark:text-text-dark mb-3">Explore</h4>
                    <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li><NuxtLink to="/works" class="hover:text-brand transition-colors">Portfolio & Themes</NuxtLink></li>
                        <li><NuxtLink to="/writing" class="hover:text-brand transition-colors">Stories & Reflections</NuxtLink></li>
                        <li><NuxtLink to="/about" class="hover:text-brand transition-colors">About Jeff</NuxtLink></li>
                        <li><NuxtLink to="/booking" class="hover:text-brand transition-colors">Book a Photoshoot</NuxtLink></li>
                        <li><NuxtLink to="/contact" class="hover:text-brand transition-colors">Contact Directly</NuxtLink></li>
                    </ul>
                </div>

                <!-- Connect & Socials (Brief Item 6) -->
                <div>
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-text-light dark:text-text-dark mb-3">Connect</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Email: <a href="mailto:jeff@example.com" class="text-brand hover:underline">jeff@example.com</a>
                    </p>
                    <div class="flex justify-center md:justify-start gap-4 text-sm font-medium">
                        <a
                            href="https://instagram.com/jeff"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:text-brand transition-colors flex items-center gap-1"
                        >
                            <span>📷</span> Instagram
                        </a>
                        <a
                            href="https://facebook.com/jeff"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:text-brand transition-colors flex items-center gap-1"
                        >
                            <span>👥</span> Facebook
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom Copyright & Developer Credit -->
            <div class="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>© {{ new Date().getFullYear() }} Jeff Lee Photography. All rights reserved.</p>
                <p>
                    Developed by
                    <a href="https://awanbeo.my.id" target="_blank" rel="noopener noreferrer" class="text-brand hover:underline">
                        awanbeo
                    </a>
                    & yodi-dev
                </p>
            </div>
        </div>
    </footer>
</template>
