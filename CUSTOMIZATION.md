# Panduan Kustomisasi Website Undangan Digital

Dokumen ini menjelaskan cara mengganti identitas pasangan, detail acara, galeri, musik, warna tema, dan fitur interaktif pada website undangan digital **Kertas Senja**. Website menggunakan React + TypeScript dengan struktur frontend statis, sehingga sebagian besar kustomisasi cukup dilakukan pada satu file konfigurasi.

> **Lokasi utama:** `client/src/pages/Home.tsx`
>
> **Lokasi styling global:** `client/src/index.css`
>
> **Lokasi metadata halaman:** `client/index.html`

## 1. Menyiapkan proyek

Pastikan Node.js dan pnpm tersedia. Dari folder repository, jalankan perintah berikut untuk memasang dependency, memeriksa tipe, dan menjalankan server pengembangan.

```bash
pnpm install
pnpm check
pnpm dev
```

Setelah server aktif, buka URL lokal yang ditampilkan terminal. Untuk membuat build production, gunakan:

```bash
pnpm build
```

Perintah `pnpm check` menjalankan pemeriksaan TypeScript, sedangkan `pnpm build` membuat hasil build frontend dan server produksi.

## 2. Mengganti data pasangan dan acara

Semua data utama berada di objek `CONFIG` pada bagian atas `client/src/pages/Home.tsx`. Ganti nilai di bawah ini dengan data acara yang sebenarnya. Struktur objek sebaiknya dipertahankan agar komponen lain tetap dapat membaca konfigurasi yang sama.

| Properti | Fungsi | Contoh nilai |
|---|---|---|
| `couple` | Nama pasangan di cover | `Alya & Bima` |
| `shortNames` | Nama singkat di header dan footer | `Alya & Bima` |
| `parents` | Nama keluarga atau orang tua | `Keluarga besar Alya & Bima` |
| `dateLabel` | Tanggal yang tampil kepada tamu | `Sabtu, 14 November 2026` |
| `eventDate` | Waktu countdown dalam format ISO | `2026-11-14T10:00:00+07:00` |
| `akadTime` | Jam akad | `10.00 — 11.30 WIB` |
| `receptionTime` | Jam resepsi | `19.00 — 21.00 WIB` |
| `akadVenue` | Nama tempat akad | `Pendopo Arunika` |
| `receptionVenue` | Nama tempat resepsi | `Taman Sore, Yogyakarta` |
| `address` | Alamat acara | `Jl. Senja No. 14, Bantul, Yogyakarta` |
| `mapsUrl` | Link Google Maps | `https://maps.google.com/?q=...` |

Gunakan zona waktu yang konsisten pada `eventDate`. Countdown menghitung waktu menuju properti tersebut dan otomatis berhenti pada nol ketika waktu acara sudah tercapai.

## 3. Mengatur nama tamu dari URL

Nama tamu dibaca dari query parameter `to`. Contoh link undangan:

```text
https://undanganteam-ceayvugw.manus.space/?to=Keluarga%20Budi%20Santoso
```

Website merapikan spasi, membatasi panjang nama, dan menampilkannya sebagai teks biasa. Jika parameter `to` tidak tersedia, cover menampilkan `Tamu undangan`. Untuk membagikan link kepada banyak tamu, encode spasi sebagai `%20` atau gunakan URL encoder.

## 4. Mengganti foto hero dan galeri

Daftar foto berada pada objek `ASSETS.gallery`, sedangkan foto utama berada pada `ASSETS.hero`. Setiap item galeri memiliki pasangan `[url, altText]`.

```tsx
const ASSETS = {
  hero: "URL_FOTO_HERO",
  gallery: [
    ["URL_FOTO_1", "Deskripsi foto pertama"],
    ["URL_FOTO_2", "Deskripsi foto kedua"],
  ],
  emblem: "URL_EMBLEM",
};
```

Gunakan minimal enam foto yang berbeda agar masonry grid terasa utuh. Tulis `altText` yang mendeskripsikan isi foto, bukan nama file. Foto hero sebaiknya memiliki area yang cukup gelap atau tenang di sisi kiri agar teks tetap mudah dibaca.

Untuk aset lokal berukuran besar pada proyek WebDev, simpan file asli di luar folder proyek, lalu upload melalui mekanisme asset storage WebDev. Jangan menaruh foto, audio, atau video besar di `client/public` karena dapat memperlambat deployment.

## 5. Mengganti emblem atau logo

Emblem digunakan pada cover, header, cerita, footer, dan sebagai identitas visual utama. Ganti URL pada `ASSETS.emblem` dengan file PNG transparan atau SVG yang sudah diunggah. Pertahankan rasio persegi agar tidak terdistorsi.

Konsep visual saat ini adalah dua bentuk yang saling mengunci di dalam lingkaran terracotta. Jika mengganti emblem, pilih simbol tanpa teks supaya tetap terbaca pada ukuran kecil dan tidak bergantung pada bahasa tertentu.

## 6. Mengganti musik latar

Properti `CONFIG.musicUrl` berisi URL asset audio. Musik mulai setelah tamu menekan tombol **Buka undangan**, sehingga tidak bergantung pada autoplay browser.

```tsx
musicUrl: "/manus-storage/nama-file-musik.wav",
```

Pemutaran dibuat loop dengan volume awal rendah. Jika browser menolak playback, tombol musik tetap dapat digunakan setelah interaksi berikutnya. Gunakan musik instrumental dan pastikan Anda memiliki hak penggunaan atas file tersebut.

## 7. Mengatur tanda kasih dan QR code

Properti pembayaran berada di `CONFIG` berikut:

```tsx
ewalletProvider: "DANA",
ewalletNumber: "0812 3456 7890",
bank: "Bank BCA",
accountNumber: "1234 567 890",
recipient: "Aruna Prameswari",
```

QR code dibuat dari gabungan provider dan nomor e-wallet melalui layanan QR eksternal. Pastikan nomor dan nama penerima sudah benar sebelum membagikan website. Tombol salin menggunakan Clipboard API dan memiliki fallback untuk browser yang tidak mendukung API tersebut.

## 8. Mengatur RSVP dan buku tamu

Form RSVP sekaligus menjadi kolom ucapan. Tamu dapat mengisi nama, memilih status kehadiran, dan menulis pesan. Pesan yang lolos validasi akan langsung muncul pada bagian **Buku tamu** tanpa reload halaman.

Karena versi ini adalah frontend-only, pesan disimpan pada `localStorage` dengan key `kertas-senja-rsvp`. Artinya, pesan hanya tersedia pada browser/perangkat tempat pesan dikirim dan belum terkumpul di server. Empty state akan tampil selama belum ada pesan pada perangkat tersebut.

Fitur ini sengaja tidak memiliki seed data, testimonial, rating, atau review buatan. Untuk mengumpulkan ucapan dari seluruh tamu, pindahkan penyimpanan ke backend/database dan tambahkan moderasi sebelum pesan dipublikasikan.

Validasi saat ini mencakup nama minimal dua karakter, ucapan minimal empat karakter, batas nama 80 karakter, batas pesan 400 karakter, perapian whitespace, feedback sukses, dan feedback error yang terlihat.

## 9. Mengubah warna dan tipografi

Token warna dan font berada di bagian awal `client/src/index.css`. Warna utama tema Kertas Senja adalah:

| Token | Nilai | Penggunaan |
|---|---|---|
| `--terracotta` | `#B85C43` | Aksen, CTA, emblem, status |
| `--terracotta-deep` | `#8E3F31` | Hover dan aksen gelap |
| `--ivory` | `#F6F1E8` | Kanvas utama |
| `--paper` | `#EAE0D1` | Section detail acara |
| `--olive` | `#69715A` | Feedback sukses |
| `--ink` | `#252524` | Teks dan section gelap |

Font menggunakan **Cormorant Garamond** untuk headline editorial dan **DM Sans** untuk body, label, serta tombol. Jika mengganti font, perbarui import Google Fonts dan variabel `--serif` atau `--sans` secara bersamaan.

## 10. Mengubah copy dan section

Konten headline serta paragraf berada langsung di JSX pada `Home.tsx`. Anda dapat mengganti copy cerita, label section, pesan empty state, dan teks footer tanpa mengubah struktur komponen. Pertahankan copy tetap ringkas agar komposisi editorial tidak berubah pada layar mobile.

Anchor navigasi menggunakan ID berikut:

| ID | Section |
|---|---|
| `#cerita` | Cerita pasangan |
| `#acara` | Detail acara dan countdown |
| `#galeri` | Galeri foto |
| `#rsvp` | RSVP dan buku tamu |
| `#kasih` | Tanda kasih |

Jika menambah section baru, berikan ID unik dan tambahkan link anchor pada header desktop atau navigasi mobile yang relevan.

## 11. Aksesibilitas dan motion

Semua gambar perlu memiliki `alt`, semua input perlu memiliki label, dan tombol lightbox memiliki label aksesibel. Animasi reveal menggunakan `IntersectionObserver` dan class `is-visible`. Efek fade-in cerita serta galeri memiliki jeda bertahap agar tidak muncul serentak.

Jangan menghapus blok `@media (prefers-reduced-motion: reduce)`. Blok tersebut menonaktifkan animasi non-esensial dan menampilkan konten secara langsung bagi pengguna yang meminta pengurangan gerak.

## 12. Checklist sebelum membagikan link

1. Ganti seluruh data pada `CONFIG`, termasuk rekening dan URL Google Maps.
2. Pastikan nama pasangan, tanggal, venue, dan nama tamu terlihat benar.
3. Uji link dengan dan tanpa parameter `?to=`.
4. Tekan **Buka undangan** dan pastikan musik dapat diputar atau dikontrol.
5. Uji countdown, Google Maps, Google Calendar, galeri, lightbox, dan navigasi anchor.
6. Kirim satu RSVP uji untuk memeriksa validasi, feedback, dan buku tamu.
7. Periksa tampilan pada lebar mobile sekitar 320–390 px dan desktop.
8. Jalankan `pnpm check` dan `pnpm build` sebelum membuat checkpoint.

## 13. File penting

| File | Peran |
|---|---|
| `client/src/pages/Home.tsx` | Konfigurasi, section, interaksi, RSVP, buku tamu, dan lightbox |
| `client/src/index.css` | Warna, font, layout responsive, motion, dan komponen visual |
| `client/index.html` | Bahasa dokumen, title, viewport, dan font import awal |
| `ideas.md` | Keputusan desain dan prinsip visual Kertas Senja |
| `todo.md` | Catatan pekerjaan terakhir |

Dokumentasi ini mengikuti perilaku website saat ini. Jika RSVP dipindahkan ke backend, perbarui bagian batasan `localStorage` dan tambahkan instruksi environment variable, endpoint, loading state, error state, serta kebijakan moderasi.
