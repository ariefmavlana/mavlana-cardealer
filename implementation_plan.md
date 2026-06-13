# Implementasi UI: Mavlana Premium (Luxury & Elegant)

Berdasarkan riset tren desain otomotif mewah 2025 (Rolls-Royce, Lamborghini, Awwwards), berikut adalah rencana perombakan UI.

## Filosofi Desain: "The Art of Motion"
Fokus pada **Visual Immersive**, **Minimalis**, dan **Eksklusif**.

## 1. Color Palette (Dark Luxury)
Kita akan meninggalkan warna standar dan beralih ke palet premium:
*   **Primary Background**: `Rich Black` (#050505) - Lebih pekat dari hitam biasa.
*   **Surface/Cards**: `Glass Charcoal` (#1A1A1A with backdrop-blur) - Efek kaca gelap.
*   **Accent Color**: `Mavlana Gold` (#D4AF37) - Emas metalik yang elegan, bukan kuning norak.
*   **Text**: `Off-White` (#F5F5F5) - Putih lembut agar tidak sakit mata di background gelap.

## 2. Typography
*   **Headlines**: Gunakan font Serif modern (seperti *Cinzel* atau *Playfair Display*) untuk kesan mewah.
*   **Body Text**: Font Sans-Serif bersih (seperti *Inter* atau *Outfit*) untuk keterbacaan tinggi.

## 3. Komponen Utama

### A. Navbar (Glassmorphism)
*   Transparan dengan efek blur (frosted glass).
*   Logo emas di kiri, menu minimalis di kanan.
*   Sticky saat scroll, tapi mengecil agar tidak mengganggu.

### B. Hero Section (Immersive)
*   **Video Background** (jika ada) atau Gambar Mobil Besar Full-Screen.
*   Teks headline besar dan tipis di tengah.
*   Tombol "Explore Inventory" dengan border tipis (Outline Button) dan hover effect emas.

### C. Classified Cards (Inventory)
*   Card tanpa border (borderless).
*   Gambar mobil mendominasi (aspect ratio lebar).
*   Informasi (Nama, Harga) muncul di bawah dengan font elegan.
*   **Hover Effect**: Gambar sedikit zoom-in, bayangan emas tipis muncul.

### D. Footer
*   Sangat minimalis.
*   Hanya logo, link penting, dan copyright.
*   Warna background sedikit lebih terang dari body (#0A0A0A).

## 4. Rencana Teknis
1.  **Update `tailwind.config.ts`**: Menambahkan color token `mavlana-gold`, `rich-black`, dll.
2.  **Update `globals.css`**: Set default background ke `Rich Black` dan text ke `Off-White`.
3.  **Refactor Components**: Mulai dari Navbar -> Hero -> ClassifiedCard -> Footer.

---
**Apakah konsep "Dark Luxury" dengan aksen Emas ini sesuai dengan bayangan Anda?**
Jika setuju, saya akan mulai coding dari setting warna dasar.
