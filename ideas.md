# Arah Desain Undangan Digital

## Tiga Pendekatan Awal

### Theme Name: Sagara Nocturne
**Very Brief Intro:** Romansa malam pesisir dengan biru tinta, pasir hangat, dan aksen tembaga; terasa intim, sinematik, dan dewasa.
**Probability:** 0.07

### Theme Name: Kertas Senja
**Very Brief Intro:** Editorial paper-craft yang hangat dengan terracotta, gading, dan hijau zaitun; terasa personal seperti surat yang disimpan lama.
**Probability:** 0.03

### Theme Name: Aster Geometry
**Very Brief Intro:** Art deco kontemporer dengan bidang geometris, hitam arang, krem, dan emas kusam; terasa terstruktur, glamor, dan tak lekang waktu.
**Probability:** 0.09

## Arah Terpilih: Kertas Senja

### Design Movement
Contemporary editorialism yang berpadu dengan paper craft dan nuansa Mediterranean twilight. Komposisi terasa seperti spread majalah dan stationery premium, bukan susunan kartu template.

### Core Principles
1. **Ruang sebagai kemewahan:** whitespace lebar, ritme vertikal lambat, dan satu focal point kuat per section.
2. **Material yang terasa:** latar kertas hangat, grain halus, garis cetak, dan aksen cap/stempel sebagai detail taktil.
3. **Editorial yang personal:** layout asimetris, angka besar, pull quote, dan caption kecil yang membuat cerita pasangan terasa dikurasi.
4. **Interaksi tenang:** transisi lembut, hover minimal, dan kontrol yang selalu jelas tanpa efek berlebihan.

### Color Philosophy
Gading hangat menjadi kanvas seperti kertas undangan yang belum disentuh. Terracotta menjadi signature brand color: hangat, manusiawi, dan mengikat tema senja. Hijau zaitun memberi jeda organik, sementara arang menjaga kontras dan kedewasaan. Tidak ada gradient ungu; kedalaman datang dari tekstur, bayangan, dan layering warna solid.

### Layout Paradigm
Satu kolom editorial dengan rail angka dan label kecil di desktop, lalu berubah menjadi alur vertikal yang lapang di mobile. Hero memakai split composition antara headline dan foto; detail acara menggunakan dua jalur waktu; galeri memakai masonry dengan crop yang sengaja tidak seragam.

### Signature Elements
- Cap lingkaran terracotta dengan inisial pasangan sebagai emblem.
- Garis editorial tipis dengan nomor section besar.
- Tekstur kertas dan bentuk arch/tear sebagai framing foto.

### Interaction Philosophy
Setiap interaksi terasa seperti membuka lembar undangan: cover meluncur naik, section muncul perlahan saat dibaca, dan tombol memberi feedback tactile yang singkat. Tidak ada animasi yang mengganggu konten atau membuat pengguna menunggu.

### Animation
Cover memakai slide-up 720ms dengan easing cubic-bezier(0.23, 1, 0.32, 1). Header dan navigasi muncul bertahap setelah cover selesai. Section reveal menggunakan opacity + translateY 22px; gambar memakai opacity + translateY 18px + scale(1.02). Hover galeri hanya scale 1.025. Lightbox fade-in 180ms. Semua motion non-esensial dimatikan pada prefers-reduced-motion: reduce.

### Typography System
Display memakai **Cormorant Garamond** untuk nama pasangan, angka, dan pull quote; serif ini memberi nuansa editorial romantis tanpa terasa dekoratif berlebihan. Body memakai **DM Sans** untuk keterbacaan, label, tombol, dan metadata. Hierarki: eyebrow uppercase 11px dengan tracking 0.18em, display clamp 3.4rem–7.5rem dengan weight 500, body 16–18px dengan line-height 1.75, caption 11–12px.

### Brand Essence
Undangan digital editorial untuk pasangan yang ingin merayakan kisahnya dengan hangat, terkurasi, dan tidak seperti template massal.
**Personality:** intimate, tactile, composed.

### Brand Voice
Headline berbicara seperti potongan surat: hangat, spesifik, dan tenang. CTA singkat tetapi mengundang, bukan menjual.

Contoh: “Satu sore, dua langkah, lalu sepanjang hidup.”
Contoh CTA: “Masuk ke cerita kami”

### Wordmark & Logo
Emblem grafis tanpa teks berupa dua bentuk setengah lingkaran yang saling mengunci, seperti dua cap lilin yang bertemu; diletakkan di dalam lingkaran terracotta dengan satu garis kecil sebagai aksen matahari senja. Wordmark pasangan memakai Cormorant Garamond italic, tetapi emblem tetap menjadi identitas utama.

### Signature Brand Color
**Terracotta Senja — #B85C43**, warna tanah yang disinari matahari sore; hangat, mudah dikenali, dan cukup kuat untuk CTA, emblem, serta detail editorial.

## Style Decisions
- Semua section menggunakan latar gading, arang, atau terracotta solid; depth berasal dari grain dan offset composition, bukan glassmorphism.
- Foto utama harus terasa low-key dengan cahaya senja; teks di atasnya menggunakan ivory dan overlay arang transparan untuk menjamin kontras.
- Data pasangan disimpan dalam satu objek konfigurasi terpusat dan seluruh placeholder dibuat mudah dicari.
