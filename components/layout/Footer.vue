<template>
    <footer class="bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-10">
        <div class="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <!-- Copyright -->
            <p class="text-sm text-center text-text-light dark:text-text-dark md:text-left">
                © {{ new Date().getFullYear() }} Jef Photography. All rights reserved.
            </p>

            <!-- Developer Credit -->
            <p class="text-sm text-center text-text-light dark:text-text-dark md:text-right">
                Developed by
                <a href="https://awan-dev.site" target="_blank" class="text-brand hover:underline">
                    awan-dev.site
                </a>
            </p>
        </div>
    </footer>
</template>
