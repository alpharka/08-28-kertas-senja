/* Kertas Senja: editorial paper-craft, warm ivory canvas, terracotta signature, asymmetric composition. */
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, CalendarDays, Check, Clipboard, Copy, Heart, MapPin, Music2, Pause, Play, X } from "lucide-react";

const CONFIG = {
  couple: "Nara & Aruna",
  shortNames: "Nara & Aruna",
  parents: "Keluarga besar Nara & Aruna",
  dateLabel: "Sabtu, 14 November 2026",
  eventDate: "2026-11-14T10:00:00+07:00",
  akadTime: "10.00 — 11.30 WIB",
  receptionTime: "19.00 — 21.00 WIB",
  akadVenue: "Pendopo Arunika",
  receptionVenue: "Taman Sore, Yogyakarta",
  address: "Jl. Senja No. 14, Bantul, Daerah Istimewa Yogyakarta",
  mapsUrl: "https://maps.google.com/?q=Taman+Sore+Yogyakarta",
  calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+%5BNAMA+MEMPELAI+1%5D+%26+%5BNAMA+MEMPELAI+2%5D&dates=20261114T030000Z/20261114T140000Z&details=Kami+menantikan+kehadiran+Anda+di+hari+yang+kami+rayakan.&location=Taman+Sore%2C+Yogyakarta&ctz=Asia%2FJakarta",
  ewalletProvider: "DANA",
  ewalletNumber: "0812 3456 7890",
  bank: "Bank BCA",
  accountNumber: "1234 567 890",
  recipient: "Aruna Prameswari",
  musicUrl: "/manus-storage/kertas-senja-music_cdf3fc08.wav",
};

const ASSETS = {
  hero: "/manus-storage/kertas-senja-hero_1fdd3917.jpg",
  gallery: [
    ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85", "Tangan dan ranting zaitun di atas kertas buatan tangan"],
    ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85", "Dua cangkir kopi di meja batu saat senja"],
    ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85&sat=-20", "Pasangan di ambang pintu lengkung berwarna terracotta"],
    ["https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85", "Langkah kecil menuju sore yang panjang"],
    ["https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85", "Cahaya sore jatuh di meja pertemuan"],
    ["https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?auto=format&fit=crop&w=900&q=85", "Detail pita dan daun yang kami pilih"],
  ] as [string, string][],
  emblem: "/manus-storage/kertas-senja-emblem_12b50621.png",
};

function getGuestName() {
  const raw = new URLSearchParams(window.location.search).get("to")?.replace(/\s+/g, " ").trim();
  return (raw ? raw.slice(0, 64) : "Tamu undangan");
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const items = ref.current?.querySelectorAll("[data-reveal]");
    if (!items?.length) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Countdown() {
  const [left, setLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => { const diff = Math.max(0, new Date(CONFIG.eventDate).getTime() - Date.now()); const total = Math.floor(diff / 1000); setLeft({ days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 }); };
    tick(); const timer = window.setInterval(tick, 1000); return () => window.clearInterval(timer);
  }, []);
  return <div className="countdown" aria-label="Hitung mundur menuju acara"><div><b>{String(left.days).padStart(2, "0")}</b><span>hari</span></div><i>:</i><div><b>{String(left.hours).padStart(2, "0")}</b><span>jam</span></div><i>:</i><div><b>{String(left.minutes).padStart(2, "0")}</b><span>menit</span></div><i>:</i><div><b>{String(left.seconds).padStart(2, "0")}</b><span>detik</span></div></div>;
}

export default function Home() {
  const guest = useMemo(getGuestName, []);
  const revealRef = useReveal();
  const [opened, setOpened] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [rsvp, setRsvp] = useState({ name: "", status: "Hadir", message: "" });
  const [entries, setEntries] = useState<{ name: string; status: string; message: string }[]>(() => JSON.parse(localStorage.getItem("kertas-senja-rsvp") || "[]"));
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => { document.body.classList.toggle("invitation-open", opened); if (audioRef.current) audioRef.current.volume = 0.25; }, [opened]);
  useEffect(() => { document.body.style.overflow = lightbox !== null ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [lightbox]);
  useEffect(() => { const key = (e: KeyboardEvent) => { if (lightbox === null) return; if (e.key === "Escape") setLightbox(null); if (e.key === "ArrowRight") setLightbox((lightbox + 1) % ASSETS.gallery.length); if (e.key === "ArrowLeft") setLightbox((lightbox - 1 + ASSETS.gallery.length) % ASSETS.gallery.length); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [lightbox]);

  const openInvitation = async () => { setOpened(true); if (audioRef.current && CONFIG.musicUrl) { try { await audioRef.current.play(); setMusicOn(true); } catch { setMusicOn(false); } } };
  const toggleMusic = async () => { if (!audioRef.current || !CONFIG.musicUrl) return; if (musicOn) { audioRef.current.pause(); setMusicOn(false); } else { await audioRef.current.play(); setMusicOn(true); } };
  const copy = async (value: string, label: string) => { try { await navigator.clipboard.writeText(value); } catch { const area = document.createElement("textarea"); area.value = value; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); } setCopied(label); setTimeout(() => setCopied(""), 2000); };
  const submitRsvp = (e: React.FormEvent) => { e.preventDefault(); if (!rsvp.name.trim() || !rsvp.message.trim()) return; const next = [...entries, rsvp]; setEntries(next); localStorage.setItem("kertas-senja-rsvp", JSON.stringify(next)); setSent(true); setRsvp({ name: "", status: "Hadir", message: "" }); };

  return <div ref={revealRef} className="site-shell">
    <audio ref={audioRef} src={CONFIG.musicUrl || undefined} loop />
    <div className={`cover ${opened ? "cover--opened" : ""}`} aria-hidden={opened}>
      <div className="cover__image" style={{ backgroundImage: `url(${ASSETS.hero})` }} />
      <div className="cover__veil" />
      <div className="cover__content"><img src={ASSETS.emblem} className="emblem" alt="Emblem pasangan" /><p className="eyebrow">Sebuah hari untuk dirayakan</p><h1>{CONFIG.couple}</h1><p className="cover__date">{CONFIG.dateLabel}</p><p className="guest-label">Kepada Yth.<br /><strong>{guest}</strong></p><button className="button button--light" onClick={openInvitation}>Buka undangan <ArrowDownRight size={16} /></button></div>
    </div>

    <header className={`site-header ${opened ? "site-header--show" : ""}`}><a className="brand" href="#top"><img src={ASSETS.emblem} alt="Emblem" /> <span>{CONFIG.shortNames}</span></a><nav><a href="#cerita">Cerita</a><a href="#acara">Detail acara</a><a href="#galeri">Galeri</a><a href="#rsvp">RSVP</a><a href="#kasih">Tanda kasih</a></nav><span className="header-date">14.11.26</span></header>
    <main id="top">
      <section className="hero section-dark"><div className="hero__texture" /><div className="hero__copy" data-reveal><p className="eyebrow">Catatan dari hari yang kami pilih</p><h2>Satu sore,<br /><em>dua langkah,</em><br />sepanjang hidup.</h2><p className="hero__lead">Dengan hati yang penuh syukur, kami mengundang Anda untuk hadir dalam hari ketika dua cerita memilih berjalan dalam satu arah.</p><a className="text-link" href="#cerita">Masuk ke cerita kami <ArrowDownRight size={17} /></a></div><div className="hero__stamp"><span>14</span><small>NOV<br />2026</small></div></section>
      <section id="cerita" className="story section-light"><div className="section-rail"><span>01</span><span>Cerita</span></div><div className="story__content" data-reveal><img src={ASSETS.emblem} className="story-seal" alt="Segel terracotta Nara dan Aruna" /><p className="eyebrow accent">Dari sore yang sederhana</p><h2>Barangkali, rumah<br /><em>adalah seseorang.</em></h2><div className="story__text"><p>Kami pertama kali bertemu di sebuah sore yang tidak direncanakan. Tidak ada kembang api, hanya percakapan yang ternyata ingin tinggal lebih lama.</p><p>Dari sana, hari-hari tumbuh menjadi perjalanan: pelan, penuh tawa, sesekali berbelok, namun selalu menemukan jalan pulang yang sama. Kini kami ingin merayakan langkah berikutnya bersama orang-orang yang kami cintai.</p></div><div className="signature-line"><span>Dengan kasih,</span><strong>{CONFIG.shortNames}</strong></div></div><div className="story__image frame-arch" data-reveal><img src={ASSETS.gallery[0][0]} alt={ASSETS.gallery[0][1]} /></div></section>
      <section id="acara" className="events section-cream"><div className="section-rail"><span>02</span><span>Detail acara</span></div><div className="events__content"><div className="events__heading" data-reveal><p className="eyebrow accent">Catat tanggalnya</p><h2>Satu hari,<br /><em>dua perayaan.</em></h2><p>{CONFIG.dateLabel} · Yogyakarta</p></div><div className="event-list" data-reveal><article><span className="event-index">01</span><div><p className="eyebrow">Akad nikah</p><h3>{CONFIG.akadVenue}</h3><p>{CONFIG.akadTime}<br />{CONFIG.address}</p></div></article><article><span className="event-index">02</span><div><p className="eyebrow">Resepsi</p><h3>{CONFIG.receptionVenue}</h3><p>{CONFIG.receptionTime}<br />{CONFIG.address}</p></div></article></div><div className="event-actions"><a className="button button--dark" href={CONFIG.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Lihat lokasi</a><a className="button button--outline" href={CONFIG.calendarUrl} target="_blank" rel="noreferrer"><CalendarDays size={16} /> Simpan ke Google Calendar</a></div><div className="countdown-wrap" data-reveal><p className="eyebrow">Menuju hari yang kami tunggu</p><Countdown /></div></div></section>
      <section id="galeri" className="gallery-section section-dark"><div className="section-rail"><span>03</span><span>Galeri</span></div><div className="gallery__heading" data-reveal><p className="eyebrow">Potongan-potongan kecil</p><h2>Yang ingin<br /><em>kami ingat.</em></h2></div><div className="gallery-grid">{ASSETS.gallery.map(([src, alt], i) => <button key={src + i} className={`gallery-item gallery-item--${i + 1}`} onClick={() => setLightbox(i)} aria-label={`Lihat foto ${i + 1}: ${alt}`} data-reveal><img src={src} alt={alt} /><span>Lihat foto · 0{i + 1}</span></button>)}</div></section>
      <section id="rsvp" className="rsvp section-light"><div className="section-rail"><span>04</span><span>RSVP</span></div><div className="rsvp__content"><div data-reveal><span className="paper-label">Catatan kehadiran · 04</span><p className="eyebrow accent">Kehadiranmu berarti</p><h2>Akankah<br /><em>kau hadir?</em></h2><p className="rsvp__intro">Bantu kami menyiapkan hari ini dengan mengabarkan kehadiranmu. Pesanmu akan tersimpan di perangkat ini.</p></div><form onSubmit={submitRsvp} data-reveal><label>Nama lengkap<input value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} placeholder="Tulis namamu" required /></label><fieldset><legend>Konfirmasi kehadiran</legend><label className="choice"><input type="radio" name="status" checked={rsvp.status === "Hadir"} onChange={() => setRsvp({ ...rsvp, status: "Hadir" })} /> Saya akan hadir</label><label className="choice"><input type="radio" name="status" checked={rsvp.status === "Belum pasti"} onChange={() => setRsvp({ ...rsvp, status: "Belum pasti" })} /> Belum bisa memastikan</label><label className="choice"><input type="radio" name="status" checked={rsvp.status === "Tidak hadir"} onChange={() => setRsvp({ ...rsvp, status: "Tidak hadir" })} /> Tidak dapat hadir</label></fieldset><label>Pesan ucapan<textarea value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} placeholder="Tulis doa baikmu untuk kami" required rows={4} /></label><button className="button button--dark" type="submit">Kirim konfirmasi <ArrowDownRight size={16} /></button>{sent && <p className="success"><Check size={15} /> Terima kasih, konfirmasimu sudah tersimpan di perangkat ini.</p>}</form><div className="guestbook" data-reveal><p className="eyebrow accent">Buku tamu</p>{entries.length === 0 ? <p className="empty-state">Pesan ucapanmu akan muncul di sini setelah dikirim.</p> : entries.map((entry, i) => <div className="guest-entry" key={i}><div><strong>{entry.name}</strong><span>{entry.status}</span></div><p>{entry.message}</p></div>)}</div></div></section>
      <section id="kasih" className="gift section-terracotta"><div className="section-rail"><span>05</span><span>Tanda kasih</span></div><div className="gift__content" data-reveal><span className="paper-label paper-label--light">Tanda kasih · 05</span><div><p className="eyebrow">Jika berkenan</p><h2>Sebuah doa<br /><em>sudah cukup.</em></h2><p>Namun bila Anda ingin meninggalkan tanda kasih, berikut detail yang dapat digunakan.</p></div><div className="gift-card"><div className="gift-card__qr"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`${CONFIG.ewalletProvider}:${CONFIG.ewalletNumber}`)}`} alt="QR code tanda kasih" /></div><p className="eyebrow">E-wallet</p><h3>{CONFIG.ewalletProvider}</h3><p>{CONFIG.ewalletNumber}<br />a.n. {CONFIG.recipient}</p><button onClick={() => copy(CONFIG.ewalletNumber, "ewallet")} className="copy-button">{copied === "ewallet" ? <Check size={15} /> : <Copy size={15} />} {copied === "ewallet" ? "Tersalin" : "Salin nomor e-wallet"}</button><hr /><p className="eyebrow">Rekening bank</p><h3>{CONFIG.bank}</h3><p>{CONFIG.accountNumber}<br />a.n. {CONFIG.recipient}</p><button onClick={() => copy(CONFIG.accountNumber, "account")} className="copy-button">{copied === "account" ? <Check size={15} /> : <Copy size={15} />} {copied === "account" ? "Tersalin" : "Salin nomor rekening"}</button></div></div></section>
    </main>
    <footer><img src={ASSETS.emblem} alt="Emblem" /><p>Terima kasih telah menjadi bagian dari cerita kami.</p><strong>{CONFIG.shortNames}</strong><small>14 · 11 · 2026</small></footer>
    {opened && CONFIG.musicUrl && <button className="music-toggle" onClick={toggleMusic} aria-label={musicOn ? "Jeda musik" : "Putar musik"}>{musicOn ? <Pause size={16} /> : <Play size={16} />}<span>{musicOn ? "Jeda musik" : "Putar musik"}</span></button>}
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => setLightbox(null)}><button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Tutup"><X /></button><button className="lightbox__prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + ASSETS.gallery.length) % ASSETS.gallery.length); }} aria-label="Foto sebelumnya"><ArrowLeft /></button><figure onClick={(e) => e.stopPropagation()}><img src={ASSETS.gallery[lightbox][0]} alt={ASSETS.gallery[lightbox][1]} /><figcaption>0{lightbox + 1} / 06 · {ASSETS.gallery[lightbox][1]}</figcaption></figure><button className="lightbox__next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % ASSETS.gallery.length); }} aria-label="Foto berikutnya"><ArrowRight /></button></div>}
  </div>;
}
