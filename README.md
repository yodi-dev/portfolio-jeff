# Jeff Lee — Photography Portfolio (Frontend)

Website portofolio resmi untuk fotografer **Jeff Lee**, dibangun dengan **Nuxt 3**, **Vue 3**, dan **Tailwind CSS**. Website ini berfungsi sebagai antarmuka publik yang menampilkan karya fotografi bertema, refleksi cerita di balik foto, dan sistem reservasi (*booking photoshoot*) yang terhubung langsung dengan backend **Laravel Headless API**.

---

## 📸 Fitur Utama

1. **Main Page / Home (`/`)**: Hero banner *fullscreen*, branding fotografer, cuplikan karya pilihan, cuplikan kisah, testimoni klien, dan CTA booking.
2. **About Jeff (`/about`)**: Profil fotografer, narasi perjalanan fotografi, foto portrait, serta kontak langsung.
3. **Works / Portfolio (`/works`)**: Galeri foto yang dikelompokkan ke dalam **11 tema**:
   * *Family, Portrait, Couple, Newborn, Work Documentary, Animal, Plant, Sports, Event, Celebration, Travel*.
   * Dilengkapi filter kategori interaktif dan modal preview foto.
4. **Writing / Stories (`/writing` & `/writing/[slug]`)**: Blog untuk membagikan pemikiran dan kisah emosional di balik foto.
5. **Booking Form (`/booking`)**: Formulir reservasi pemotretan terintegrasi dengan validasi nama, email, nomor telepon/WhatsApp, jenis paket, tanggal pemotretan, lokasi, dan catatan khusus.
6. **Dark Mode Support**: Mode gelap dan terang yang dapat diubah secara instan.

---

## 🛠️ Tech Stack & Arsitektur

* **Frontend:** [Nuxt 3.17](https://nuxt.com/) (Vue 3.5, Nitro 2.11, Tailwind CSS 3.4, TypeScript, pnpm).
* **Backend API & Admin CMS:** [dashboard-jef](https://github.com/yodi-dev/dashboard-jef) (Laravel 12, Breeze, Sanctum, PostgreSQL/MySQL).
* **Arsitektur:** *Decoupled / Headless System* (Frontend mengonsumsi data via REST API).
* **Dokumentasi Lengkap:** Lihat [PRD.md](./PRD.md) untuk spesifikasi produk dan kontrak API lengkap.

---

## 🚀 Memulai (Local Development)

### 1. Prasyarat
* Node.js versi 18+ atau 20+
* Package manager: `pnpm` (disarankan) atau `npm`

### 2. Instalasi Dependensi
```bash
pnpm install
```

### 3. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan URL API backend Laravel kamu:
```ini
NUXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
NUXT_PUBLIC_STORAGE_BASE=http://127.0.0.1:8000/storage
```

### 4. Menjalankan Server Development
```bash
pnpm dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser kamu.

---

## 📦 Build & Deployment

### Build untuk Produksi (Node.js Server):
```bash
pnpm build
```

### Static Site Generation (SSG untuk Vercel / Netlify / Cloudflare Pages):
```bash
pnpm generate
```
Output static HTML akan tersedia di folder `.output/public`.

---

## 📁 Struktur Direktori
```text
portfolio-jeff/
├── assets/             # Global CSS & Tailwind styles
├── components/         # Reusable Vue components (Navbar, Footer, DarkModeToggle, UI)
├── composables/        # Auto-imported composables (useApi.ts)
├── layouts/            # Layout utama (default.vue)
├── pages/              # File-based routing (index, about, works, writing, booking)
├── public/             # Static assets (images, favicon, robots.txt)
├── nuxt.config.ts      # Konfigurasi Nuxt 3 & API runtime config
├── tailwind.config.js  # Konfigurasi tema Tailwind CSS
├── PRD.md              # Product Requirements Document
└── README.md           # Dokumentasi proyek
```

---

## 📄 Lisensi
Hak Cipta © 2026 Jeff Photography. Dikembangkan oleh [awanbeo](https://awanbeo.my.id) & yodi-dev.
