# Jeff Lee — Photography Portfolio (Frontend)

Website portofolio resmi untuk fotografer **Jeff Lee** yang beroperasi di Australia. Dibangun menggunakan **Nuxt 3**, **Vue 3**, **TypeScript**, dan **Tailwind CSS** dengan pendekatan desain minimalis editorial Jepang (*Japanese Washi paper aesthetics*), tipografi *Cormorant Garamond*, dan performa tinggi pada jaringan global **Cloudflare Pages**.

Website ini bekerja secara *decoupled* (headless) dengan mengonsumsi data langsung dari backend **Laravel Headless API** ([dashboard-jef](https://github.com/yodi-dev/dashboard-jef)).

---

## 📸 Fitur Utama

1. **Main Page / Home (`/`)**:
   * **Dynamic 21:9 Hero Banner:** Tampilan sinematik ultra-wide dengan sinkronisasi posisi fokus vertikal (*Rule-of-Thirds focal point*) yang dapat diatur dari dashboard admin.
   * **Smart Hero Navigation:** Mengarahkan ke karya album spesifik (`/works/[slug]`) atau galeri kurasi (`/works`).
   * **Curated Selected Works & Stories:** Cuplikan karya portofolio unggulan dan esai cerita terbaru.
   * **About & Testimonials:** Pengantar singkat sosok Jeff Lee dan kutipan testimoni klien.
2. **Works / Exhibition Hub (`/works`)**:
   * **11 Tema Fotografi:** *Family, Portrait, Couple, Newborn, Work Documentary, Animal, Plant, Sports, Event, Celebration, Travel*.
   * **Multiples of 3 Exhibition Grid:** Algoritma penyusunan grid foto yang otomatis seimbang dalam kelipatan 3 untuk menjaga estetika tata letak galeri.
   * Filter kategori instan tanpa reload halaman dan counter karya aktif.
3. **Dedicated Album Exhibition (`/works/[slug]`)**:
   * Halaman pameran mandiri untuk setiap sesi pemotretan.
   * Narasi mendalam, metadata pemotretan, dan seri galeri foto tambahan (*multi-image gallery*).
   * **Interactive Lightbox Modal:** Pembesar foto resolusi penuh dengan navigasi keyboard (`Esc`, `ArrowLeft`, `ArrowRight`).
   * Schema.org `VisualArtwork` & OpenGraph dynamic meta tags untuk SEO optimal.
4. **Writing & Stories (`/writing` & `/writing/[slug]`)**:
   * Esai visual dan cerita personal di balik karya foto dengan pemformatan teks editorial dan sanitasi konten.
5. **Booking Form (`/booking`) & 1-Click WhatsApp**:
   * Formulir pemesanan sesi terpadu dengan validasi tanggal minimal besok, paket 11 tema, nomor WhatsApp internasional, dan lokasi.
   * **1-Click Direct WhatsApp:** Layar konfirmasi menyediakan tombol hijau instan untuk langsung menyapa Jeff di WhatsApp dengan rincian booking yang sudah terisi otomatis.
   * Toleransi waktu henti (*timeout*) 15 detik untuk mengakomodasi cold-start server gratis.
6. **Editorial Error Recovery (`error.vue`)**:
   * Tampilan error 404 (*Out of Frame*) dan 500 (*Exposure Paused*) berkonsep editorial dengan tombol pemulihan satu-klik menuju galeri atau beranda.
7. **Dark Mode & Aksesibilitas**:
   * Dukungan mode gelap/terang, *skip to main content link*, serta kontras warna teks standar WCAG AAA.

---

## 🛠️ Tech Stack & Ekosistem

* **Framework:** [Nuxt 3.17](https://nuxt.com/) (Vue 3.5, Nitro 2.11, Tailwind CSS 3.4, TypeScript, pnpm).
* **Font Typography:** Cormorant Garamond (Serif Editorial) & Plus Jakarta Sans.
* **Backend API:** [dashboard-jef](https://github.com/yodi-dev/dashboard-jef) (Laravel 12, Breeze, TiDB Cloud Serverless, FrankenPHP).
* **Hosting Frontend:** [Cloudflare Pages](https://pages.cloudflare.com/) (Edge CDN, auto-deploy via GitHub).
* **Dokumentasi Lengkap:** Lihat [PRD.md](./PRD.md) untuk spesifikasi sistem dan data contract API.

---

## 🚀 Memulai (Local Development)

### 1. Prasyarat
* Node.js v18.x atau v20.x
* Package Manager: `pnpm` (disarankan) atau `npm`

### 2. Instalasi Dependensi
```bash
pnpm install
```

### 3. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan endpoint backend Laravel Anda:
```ini
# Local Backend
NUXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
NUXT_PUBLIC_STORAGE_BASE=http://127.0.0.1:8000/storage

# Atau Production Backend (Render)
# NUXT_PUBLIC_API_BASE=https://dashboard-jef.onrender.com/api
# NUXT_PUBLIC_STORAGE_BASE=https://dashboard-jef.onrender.com/storage
```

### 4. Menjalankan Server Development
```bash
pnpm dev
```
Buka browser pada [http://localhost:3000](http://localhost:3000).

### 5. Linting & Type Checking
```bash
npm run lint
```

---

## 📦 Build & Deployment

### Build untuk Produksi (Node Server):
```bash
npm run build
```

### Static Generation (SSG untuk Cloudflare Pages / Vercel):
```bash
npm run generate
```
Output static HTML akan dihasilkan di direktori `.output/public`.

### Pengaturan di Cloudflare Pages:
* **Build command:** `npm run generate` (atau `pnpm generate`)
* **Build output directory:** `.output/public`
* **Environment variables:**
  * `NUXT_PUBLIC_API_BASE`: `https://dashboard-jef.onrender.com/api`
  * `NUXT_PUBLIC_STORAGE_BASE`: `https://dashboard-jef.onrender.com/storage`

---

## 📁 Struktur Direktori
```text
portfolio-jeff/
├── assets/             # CSS global, fonts, & konfigurasi Tailwind
├── components/         # Komponen reusable (Navbar, Footer, DarkModeToggle, Lightbox)
├── composables/        # Composable helper (useApi.ts, useSeo.ts)
├── layouts/            # Layout utama (default.vue)
├── pages/              # Routing berbasis file
│   ├── index.vue       # Beranda (Hero 21:9, Selected Works, Stories)
│   ├── about.vue       # Profil & narasi fotografer
│   ├── works/
│   │   ├── index.vue   # Hub galeri 11 tema & filter
│   │   └── [slug].vue  # Detail pameran album & lightbox
│   ├── writing/
│   │   ├── index.vue   # Daftar artikel cerita
│   │   └── [slug].vue  # Detail artikel lengkap
│   ├── booking.vue     # Formulir reservasi & 1-Click WhatsApp
│   └── contact.vue     # Kontak terintegrasi profil
├── public/             # Asset statis (favicon, robots.txt, placeholder)
├── error.vue           # Halaman pemulihan 404/500 editorial
├── nuxt.config.ts      # Konfigurasi Nuxt 3 & runtime config
├── tailwind.config.js  # Konfigurasi warna canvas/ink & font serif
├── PRD.md              # Product Requirements Document v2.0
└── README.md           # Dokumentasi proyek
```

---

## 📄 Lisensi
Hak Cipta © 2026 Jeff Lee Photography. Dikembangkan oleh [awanbeo](https://awanbeo.my.id) & yodi-dev.
