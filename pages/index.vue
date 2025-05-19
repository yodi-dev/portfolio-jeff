<template>
    <section class="hero container">
        <div class="hero-content">
            <h1 class="hero-title">Jeff Photography</h1>
            <p class="hero-tagline">Capturing Meaningful Moments</p>
            <a href="/portfolio" class="btn primary">View Portfolio</a>
        </div>
    </section>

    <section class="preview-portfolio container">
        <h2 class="section-title">Selected Works</h2>
        <div class="preview-grid">
            <img src="/images/preview1.jpeg" alt="Preview 1" />
            <img src="/images/preview2.jpeg" alt="Preview 2" />
            <img src="/images/preview3.jpeg" alt="Preview 3" />
        </div>
        <a href="/portfolio" class="btn">See More</a>
    </section>

    <section class="preview-writing container">
        <h2 class="section-title">Thoughts & Stories</h2>
        <blockquote class="writing-quote">
            "Photography is more than capturing light—it's capturing life itself."
        </blockquote>
        <a href="/writing" class="btn">Read More</a>
    </section>

    <section class="about-jeff container">
        <h2 class="section-title">About Jeff</h2>
        <div class="about-grid">
            <img src="/images/jeff-portrait.jpeg" alt="Jeff Portrait" class="about-photo" />
            <div class="about-text">
                <p>Jeff is a photographer who finds meaning in moments—family smiles, newborn hands, quiet glances
                    between loved ones. Through the lens, he documents emotions and stories that words often fail to
                    describe.</p>
                <p>With years of experience in portraiture, family shoots, and event documentation, Jeff brings both
                    professionalism and heart to every session.</p>
            </div>
        </div>
    </section>

    <section class="testimonial container">
        <h2 class="section-title">What Clients Say</h2>
        <div class="testimonial-grid">
            <blockquote>
                "Jeff made our family photo session feel so natural. The photos brought tears to my eyes."
                <footer>— Amanda R.</footer>
            </blockquote>
            <blockquote>
                "His ability to capture fleeting, genuine emotions is unmatched. Highly recommended!"
                <footer>— David & Lina</footer>
            </blockquote>
            <blockquote>
                "Jeff's professionalism and kindness made our wedding shoot unforgettable."
                <footer>— Clara & Sam</footer>
            </blockquote>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    text-align: center;
    padding: var(--spacing);
    background-color: var(--pico-background);
}

.hero-content {
    max-width: 720px;
    margin: 0 auto;
}

.hero-title {
    font-size: 2.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.hero-tagline {
    font-size: 1.25rem;
    color: var(--pico-muted-color);
    margin-bottom: 1.5rem;
}

.preview-portfolio {
    padding: var(--spacing);
    text-align: center;
}

.section-title {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

.preview-grid img {
    width: 100%;
    border-radius: var(--pico-border-radius);
    object-fit: cover;
}

.preview-writing {
    padding: var(--spacing);
    text-align: center;
}

.writing-quote {
    font-style: italic;
    font-size: 1.25rem;
    color: var(--pico-muted-color);
    margin: 1rem auto 2rem;
    max-width: 600px;
}

.about-jeff {
    padding: var(--spacing);
    text-align: center;
}

.about-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    text-align: left;
}

.about-photo {
    width: 200px;
    border-radius: var(--pico-border-radius);
}

.about-text {
    max-width: 600px;
}

.testimonial {
    padding: var(--spacing);
    text-align: center;
}

.testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.testimonial blockquote {
    background: var(--pico-muted-color-bg);
    padding: 1.25rem;
    border-radius: var(--pico-border-radius);
    font-style: italic;
}

.testimonial footer {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: var(--pico-muted-color);
}
</style>
