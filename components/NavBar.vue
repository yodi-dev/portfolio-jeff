<template>
    <header class="container">
        <div class="header-wrapper">
            <div class="brand-section">
                <NuxtLink to="/"><strong class="brand-name">Jeff Photography</strong></NuxtLink>
                <nav>
                    <ul class="nav-links">
                        <li>
                            <NuxtLink to="/about">About</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/works">Works</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/writing">Writing</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/booking">Booking</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contact">Contact</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
}

.brand-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.brand-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.nav-links {
    list-style: none;
    padding-left: 0;
    margin: 0;
}

.nav-links li {
    margin: 0.25rem 0;
}

.nav-links a {
    text-decoration: none;
    color: var(--primary);
}

.nav-links a:hover {
    text-decoration: underline;
}
</style>
