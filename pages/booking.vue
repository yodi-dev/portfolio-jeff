<template>
    <main class="container">
        <h2>Book a Photoshoot</h2>
        <form>
            <label>
                Name
                <input type="text" placeholder="Your name" />
            </label>

            <label>
                Email
                <input type="email" placeholder="Your email" />
            </label>

            <label>
                Shoot Type
                <select>
                    <option>Family</option>
                    <option>Portrait</option>
                    <option>Event</option>
                    <option>Other</option>
                </select>
            </label>

            <label>
                Date
                <input type="date" />
            </label>

            <label>
                Location
                <input type="text" placeholder="Preferred location" />
            </label>

            <label>
                Additional Notes
                <textarea rows="4"></textarea>
            </label>

            <button type="submit">Submit</button>
        </form>
    </main>
</template>
