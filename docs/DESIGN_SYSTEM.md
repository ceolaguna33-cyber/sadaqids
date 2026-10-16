# Sistem Desain Visual (Design System): JEJAK BAIK

**Nama Produk:** JEJAK BAIK  
**Dokumen Pendamping:** [`PRD.md`](file:///c:/JEJAKTUMBUH/docs/PRD.md), [`DECISIONS.md`](file:///c:/JEJAKTUMBUH/docs/DECISIONS.md), & [`USER_FLOW.md`](file:///c:/JEJAKTUMBUH/docs/USER_FLOW.md)  
**Versi:** 1.0.0  
**Gaya Desain:** *Whimsical Storybook Adventure*  
**Peran:** Senior UI/UX Designer & Game Designer  
**Tanggal:** 14 Oktober 2026  

---

## 1. Filosofi Desain & Arah Visual

Desain JEJAK BAIK dirancang secara khusus untuk anak usia **8–10 tahun** dengan pendekatan **Whimsical Storybook Adventure**:
* **Bukan Dashboard SaaS:** Jauh dari tampilan tabel kaku, kartu metrik abu-abu, atau grafik keuangan korporat yang dingin.
* **Organik & Hangat:** Menggunakan bentuk sudut membulat lebar (*soft pill & squircle*), latar belakang kertas dongeng hangat (*warm parchment paper*), serta tekstur visual yang mengundang sentuhan.
* **Bebas Penggunaan Emoji sebagai Ilustrasi Utama:** Seluruh elemen cerita, maskot, dan objek bantuan menggunakan ilustrasi vektor/SVG terpadu bergaya buku cerita bergambar, bukan kumpulan emoji sistem yang inkonsisten antar peranti.
* **Bahasa Visual Bersahabat & Edukatif:** Menggunakan 4 istilah resmi pada antarmuka:
  1. **Tujuan Kebaikan** (menggantikan *Target Kebutuhan*)
  2. **Koin Pilihanmu** (menggantikan *Alokasi Virtual*)
  3. **Kebaikan Bersama** (menggantikan *Dana Nyata Terkumpul / Gotong Royong*)
  4. **Periksa Hasil Cerita** (menggantikan *Bantuan Terverifikasi / Laporan Amanah*)
* **Penanda [SIMULASI] Transparan:** Setiap angka koin dan status dampak dilengkapi lencana stempel lembut **[SIMULASI]** agar anak memahami batas dunia virtual.

---

## 2. Palet Warna (Color Palette & Tokens)

Palet warna terinspirasi dari alam tropis dan buku cerita dongeng petualangan:

### 2.1 Warna Utama (Primary: Hutan Kebaikan)
Melambangkan kehidupan, keteduhan, sedekah yang subur, dan pertumbuhan pohon.

| Nama Token | Kode HEX | Tailwind Class Padanan | Penggunaan |
| :--- | :--- | :--- | :--- |
| `primary-50` | `#F0FDF4` | `bg-emerald-50` | Latar belakang kartu sorotan lembut |
| `primary-100`| `#DCFCE7` | `bg-emerald-100` | Border halus dan chip pendukung |
| `primary-500`| `#10B981` | `bg-emerald-500` | Aksen keberhasilan, daun muda |
| `primary-700`| `#047857` | `bg-emerald-700` | Tombol aksi utama, teks penegas |
| `primary-900`| `#064E3B` | `text-emerald-950` | Judul gelap dengan keterbacaan tinggi |

### 2.2 Warna Sekunder (Secondary: Cahaya Amanah)
Melambangkan kehangatan empati, koin kebaikan, dan persahabatan.

| Nama Token | Kode HEX | Tailwind Class Padanan | Penggunaan |
| :--- | :--- | :--- | :--- |
| `warm-50` | `#FFFBEB` | `bg-amber-50` | Latar belakang kertas buku cerita (*parchment*) |
| `warm-200`| `#FDE68A` | `bg-amber-200` | Efek pendaran lencana dan koin |
| `warm-500`| `#F59E0B` | `bg-amber-500` | Ikon koin virtual, pita pengikat level |
| `warm-600`| `#D97706` | `bg-amber-600` | Tombol interaktif sekunder, border kartu |
| `warm-800`| `#92400E` | `text-amber-900` | Teks judul sekunder |

### 2.3 Warna Pendukung Pilar & Latar Belakang (Neutrals & Pillars)
* **Kertas Hangat (Background Screen):** `#FAF7F2` (`bg-stone-50` kustom). Lembut untuk retina anak, meminimalkan ketegangan mata dibanding warna putih silau `#FFFFFF`.
* **Permukaan Kartu (Card Surface):** `#FFFFFF` dengan bayangan lembut berwarna tanah (`shadow-warm`).
* **Pilar Pendidikan:** Soft Violet `#7C3AED` / `#EDE9FE` (kebijaksanaan, buku).
* **Pilar Pangan & Kebersihan:** Sky Mint `#0284C7` / `#E0F2FE` (air bersih, kesegaran).
* **Pilar Lingkungan:** Leaf Forest `#15803D` / `#DCFCE7` (pohon, bakau, pantai bersih).
* **Teks Kontras:**
  * Teks Utama: Charcoal Brown `#292524` (rasio kontras 11.2:1 terhadap `#FAF7F2` — melampaui WCAG AAA).
  * Teks Narasi Pendukung: Stone Muted `#57534E` (rasio kontras 5.8:1 — melampaui WCAG AA).

---

## 3. Tipografi & Hirarki Teks

Menggunakan tipografi modern dengan lengkungan huruf bersahabat (*friendly geometric sans*):
* **Font Judul & Maskot:** **Fredoka** atau **Quicksand** (Google Fonts). Berkarakter bulat, tebal, ekspresif, dan tidak kaku.
* **Font Isi & Instruksi:** **Plus Jakarta Sans** atau **Nunito** (Google Fonts). Sangat mudah dibaca oleh siswa sekolah dasar yang sedang memperlancar kemampuan membaca.

### Skala Tipografi untuk Anak (Child Readability Scale)

| Tingkat Hirarki | Ukuran Font (Mobile / Desktop) | Berat (Weight) | Jarak Baris (Line Height) | Penggunaan |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Judul Layar** | `28px` / `36px` | Bold (700) | `1.2` | Judul gerbang utama & perayaan level |
| **Heading 1 / Nama Misi** | `22px` / `26px` | SemiBold (600) | `1.3` | Judul level di peta dan kartu cerita |
| **Heading 2 / Nama Objek** | `18px` / `20px` | SemiBold (600) | `1.35` | Judul objek bantuan dan kartu refleksi |
| **Teks Narasi Cerita** | `16px` / `18px` | Regular (400) | `1.6` | Paragraf cerita masalah warga (maks 3 kalimat) |
| **Teks Tombol Pil** | `16px` / `16px` | Medium (500) | `1.4` | Teks di dalam tombol pilihan refleksi |
| **Label Stempel [SIMULASI]** | `12px` / `13px` | Bold (700) | `1.0` | Penanda data virtual pada status koin |

> **ATURAN KONTEN:** Tidak boleh ada paragraf yang melebihi 3 kalimat atau 35 kata per kartu. Kalimat panjang harus dipecah menjadi kalimat pendek aktif.

---

## 4. Spacing, Grid, & Tata Letak Responsif

### 4.1 Token Spacing
* `space-xs`: `4px`
* `space-sm`: `8px`
* `space-md`: `16px` (jarak default antar kartu kecil)
* `space-lg`: `24px` (jarak antar seksi pada layar HP)
* `space-xl`: `32px` – `48px` (padding tepi layar desktop)

### 4.2 Tata Letak Responsif (Mobile-First)
* **Mobile (360px – 430px):**
  * Tampilan vertikal satu kolom tunggal yang lapang (*single-column stack*).
  * Tombol navigasi dan aksi utama berada di zona jempol bawah (*thumb zone*) agar mudah dijangkau satu tangan.
  * Kartu objek bantuan disajikan secara vertikal dengan tombol tambah/kurang horizontal lebar.
* **Tablet & Desktop (768px – 1280px):**
  * Kontainer terpusat (*max-width: 896px* / `max-w-4xl`) dengan margin otomatis.
  * Mencegah rentang teks menjadi terlalu lebar ke samping (*mencegah eye fatigue* pada anak).
  * Kartu objek dapat disajikan bersebelahan (grid 2 kolom seimbang).

---

## 5. Komponen UI Interaktif

### 5.1 Tombol (Buttons) & Ukuran Target Sentuh
Seluruh elemen interaktif wajib memenuhi aturan **target sentuh minimal 48×48 CSS px**.

1. **Tombol Aksi Utama (Primary CTA):**
   * *Bentuk:* Kapsul / Pill bulat penuh (`rounded-full`), tinggi minimal `52px`.
   * *Warna:* `bg-emerald-700` dengan teks putih tebal, dilengkapi bayangan timbul lembut (`shadow-md shadow-emerald-800/20`).
   * *Efek Tekan:* Membal lembut (*scale down 0.97* saat ditekan).
2. **Tombol Pilihan Refleksi (Reflection Pill Buttons):**
   * *Bentuk:* Persegi membulat lonjong (*rounded-2xl* atau *pill* luas), tinggi adaptif minimal `56px` (memastikan kalimat 2 baris tetap lapang).
   * *State Normal:* Latar putih (`bg-white`), border tebal 2px krem-hangat (`border-stone-200`), bayangan tipis.
   * *State Dipilih:* Latar hijau muda pastel (`bg-emerald-50`), border tebal 2px hijau emerald (`border-emerald-600`), ikon centang lembut di sisi kanan.
3. **Tombol Pengatur Koin (+10 / -10 Stepper):**
   * *Dimensi:* Minimal `48×48 px` berbentuk bulat lingkaran (`rounded-full`).
   * *Warna:* `bg-amber-100` dengan ikon tebal `text-amber-800`.
   * *Disabled State:* `bg-stone-100 text-stone-400 opacity-50 cursor-not-allowed`.

### 5.2 Kartu Objek Bantuan (Aid Option Card)
* Sudut membulat `rounded-3xl` (24px) dengan latar putih bersih.
* Border luar 2px berwarna lembut menyesuaikan tema pilar misi.
* Bagian atas: Ilustrasi ramah anak dari objek bantuan (misal: set buku cerita dan pensil warna).
* Bagian tengah: Judul objek, label urgensi (misal: `Kebutuhan Utama`), dan narasi 1 kalimat.
* Bagian bawah: Kontrol alokasi koin virtual dan indikator koin yang telah disalurkan.

### 5.3 Bilah Kemajuan Gotong Royong (Collaborative Progress Bar)
* Batang kemajuan berbentuk silinder membulat dengan tinggi `24px`.
* Latar belakang batang: Abu-abu hangat lembut (`bg-stone-200`).
* **Segmen 1 (Kebaikan Bersama Warga):** Diisi warna netral hangat (`bg-amber-400`) dengan tekstur garis halus.
* **Segmen 2 (Koin Pilihanmu):** Diisi warna aksen anak (`bg-emerald-500`) yang menyatu di ujung segmen warga.
* Indikator teks di atas batang: *"Tujuan Kebaikan: 100% Tercapai Bersama!"* disertai label stempel **[SIMULASI]**.

### 5.4 Surat Cerita Pak RT (Level 2 Verified Delivery Report)
* Visualisasi menyerupai kertas surat gulung bergambar (*whimsical parchment scroll*) dengan tepian bergerigi lembut.
* Header: Ikon stempel bertinta hijau daun: **[SIMULASI AMANAH TERSAMPAIKAN]**.
* Teks: Kutipan ucapan Pak RT dengan foto/sketsa ilustrasi tumpukan paket sehat yang telah sampai di posko warga.

### 5.5 Dialog Konfirmasi Reset Progres (Child-Friendly Modal)
* Latar belakang peredup (*backdrop overlay*): `bg-stone-900/40` dengan efek blur lembut (`backdrop-blur-sm`).
* Kartu dialog: Di tengah layar, sudut membulat lebar `rounded-3xl`, menampilkan ilustrasi Pohon Kebaikan memegang tunas mungil dengan tatapan tersenyum hangat.
* Judul: *"Mulai Cerita Dari Tunas Mungil?"*
* Isi: *"Pohon Kebaikan dan lencanamu akan mengulang dari awal ya. Apakah kamu yakin?"*
* Tombol Aksi: Dua tombol berdampingan dengan ukuran lapang:
  * `[Batal, Tetap Lanjut]` (Tombol abu-abu lembut / `bg-stone-100`).
  * `[Ya, Mulai Dari Tunas]` (Tombol oranye ramah / `bg-amber-600 text-white`).

---

## 6. Desain Pohon Kebaikan & 4 State Pertumbuhan

Pohon Kebaikan adalah karakter hidup yang menjadi cermin pencapaian kompetensi anak:

```
[ Fase 1: Tunas Mungil ] ---> [ Fase 2: Ranting Ceria ] ---> [ Fase 3: Pohon Rimbun ] ---> [ Fase 4: Pohon Paripurna ]
  (Mulai Petualangan)          (Lulus Level 1)              (Lulus Level 2)              (Lulus Level 3)
```

1. **Fase 1: Tunas Mungil (Seedling):**
   * *Visual:* Batang kecil kecambah hijau cerah yang baru menyembul dari pot tanah liat bundar, dengan dua helai daun mungil yang bergoyang lembut dan sepasang mata bulat ramah.
2. **Fase 2: Ranting Ceria (Sapling):**
   * *Visual:* Batang pohon muda ramping yang mulai memiliki cabang ke kiri dan kanan, dedaunan hijau segar yang lebih lebat, dan kuncup bunga kecil berwarna kuning keemasan.
3. **Fase 3: Pohon Rimbun (Blooming Tree):**
   * *Visual:* Kanopi daun berbentuk awan hijau lebat bertingkat, bunga-bunga kebaikan mekar merekah, dan dedaunan memancarkan kilau lembut saat disentuh.
4. **Fase 4: Pohon Harmoni Paripurna (Guardian Tree):**
   * *Visual:* Pohon besar nan teduh dengan buah-buah emas bercahaya ramah, ranting kokoh, dan dua ekor burung kecil hinggap ceria di atas ranting. Mewakili ekosistem kebaikan yang lengkap.

---

## 7. Desain Lencana Kompetensi (Badges)

Lencana dirancang berbentuk medali daun berukir kayu hangat, bukan piala emas materialistik:
1. **Lencana Pahlawan Belajar (Level 1):** Simbol buku terbuka dengan sulur tunas yang melingkar indah.
2. **Lencana Penjaga Amanah (Level 2):** Simbol surat bertali pita daun dan perisai kejujuran.
3. **Lencana Sahabat Alam (Level 3):** Simbol tetesan embun dan bibit bakau hijau yang dirawat dua telapak tangan ramah.

---

## 8. Aturan Ikonografi (Iconography Rules)

* Menggunakan pustaka ikon **Lucide React**.
* **Ketebalan Garis (Stroke Width):** Selalu konsisten pada `strokeWidth={2}` atau `strokeWidth={2.25}` untuk menjaga keterbacaan pada layar berdensitas tinggi (*retina display*).
* **Ujung Garis (Line Caps):** Sudut membulat (`strokeLinecap="round"` dan `strokeLinejoin="round"`).
* **Ukuran Standar Ikon:**
  * Ikon tombol mikro: `20×20 px`
  * Ikon tombol navigasi / aksi: `24×24 px`
  * Ikon fitur utama kartu: `32×32 px` hingga `40×40 px`
* **Larangan Tegas:** Dilarang mencampurkan emoji WhatsApp/Apple/Google sebagai pengganti ikon fungsional.

---

## 9. Aksesibilitas, Fokus State, & Dukungan Reduced Motion

1. **Status Fokus Papan Ketik (Keyboard Focus States):**
   * Semua elemen interaktif memiliki cincin fokus yang tegas: `focus-visible:ring-4 focus-visible:ring-emerald-400 focus-visible:ring-offset-2`.
   * Cincin fokus tidak boleh disembunyikan (`outline-none` wajib disertai `focus-visible:ring`).
2. **Kontras Warna Teruji:**
   * Seluruh teks utama memiliki rasio kontras di atas 4.5:1 terhadap latarnya (memenuhi kriteria WCAG 2.1 Level AA).
3. **Dukungan Reduced Motion:**
   * Diimplementasikan melalui CSS media query `@media (prefers-reduced-motion: reduce)` serta kelas pembungkus `.reduced-motion`.
   * Pada mode ini, seluruh animasi perpindahan koordinat (*translate*) dan perputaran (*rotate*) dimatikan, digantikan dengan pergantian opacity sederhana.

---

## 10. Asumsi Desain yang Wajib Diuji Bersama Anak dan Guru

1. **[ASUMSI BELUM TERVALIDASI] Ukuran Huruf 16px pada Teks Tombol Pil:**  
   *Perlu diverifikasi apakah teks pilihan refleksi 16px mudah dibaca dalam jarak genggam tangan oleh siswa kelas 3 SD.*
2. **[ASUMSI BELUM TERVALIDASI] Kejelasan Label Stempel [SIMULASI]:**  
   *Perlu diuji apakah anak mengerti arti stempel [SIMULASI] atau justru mengabaikannya karena terbiasa melihat dekorasi visual biasa.*
3. **[ASUMSI BELUM TERVALIDASI] Keterjangkauan Tombol Stepper Koin (+10/-10):**  
   *Perlu diobservasi apakah jari anak lebih nyaman menekan tombol lingkaran stepper dibanding tombol panjang.*
