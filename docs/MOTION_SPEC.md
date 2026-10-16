# Spesifikasi Animasi & Gerakan (Motion Specification): JEJAK BAIK

**Nama Produk:** JEJAK BAIK  
**Dokumen Pendamping:** [`PRD.md`](file:///c:/JEJAKTUMBUH/docs/PRD.md), [`USER_FLOW.md`](file:///c:/JEJAKTUMBUH/docs/USER_FLOW.md), & [`DESIGN_SYSTEM.md`](file:///c:/JEJAKTUMBUH/docs/DESIGN_SYSTEM.md)  
**Teknologi:** Motion for React (`motion` via `motion/react`)  
**Versi:** 1.0.0  
**Peran:** Senior Motion Designer & Game Designer  
**Tanggal:** 14 Oktober 2026  

---

## 1. Prinsip Desain Gerakan (Motion Principles)

Animasi di dalam JEJAK BAIK dirancang dengan filosofi **"Kenyal, Hangat, & Bertujuan"**:
1. **Bermakna & Mendidik (*Purposeful Motion*):** Setiap gerakan menjelaskan hubungan sebab-akibat (misal: koin berpindah ke kotak bantuan, pohon bertambah daun saat kompetensi dipahami). Tidak ada animasi semata-mata hiasan berlebihan.
2. **Non-Blocking & Responsif:** Tidak ada animasi yang mengunci tombol interaksi lebih dari 200ms. Ketukan anak selalu direspon seketika.
3. **Performa Tinggi (GPU-Accelerated):** Murni memanfaatkan properti `transform` (`translate`, `scale`, `rotate`) dan `opacity` untuk menjamin rendering 60 FPS di ponsel anak tanpa lag baterai.
4. **Dukungan Penuh Mode Gerak Tenang (*Reduced Motion*):** Setiap animasi memiliki fallback instan/fade ketika preferensi `prefers-reduced-motion` aktif atau pengguna menekan tombol sakelar.

---

## 2. Parameter Standar Easing & Spring

* **Spring Lembut Anak (`gentleSpring`):**  
  `{ type: "spring", stiffness: 260, damping: 20 }` (Karakter empuk, ramah, dan bersahabat).
* **Spring Pantul Ringan (`bouncySpring`):**  
  `{ type: "spring", stiffness: 400, damping: 15 }` (Digunakan saat koin bertambah atau lencana terbuka).
* **Transisi Halus (`smoothEase`):**  
  `{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }` (Kurva ease-out modern untuk pergeseran kartu).
* **Transisi Layar Penuh (`sceneTransition`):**  
  `{ duration: 0.3, ease: "easeInOut" }`.

---

## 3. Spesifikasi Detail 12 Animasi Utama

---

### 3.1 Entrance Welcome Screen (Gerbang Hutan Kebaikan)
* **Pemicu:** Pengguna pertama kali memuat URL atau kembali ke beranda.
* **Elemen:**
  1. Kontainer latar belakang ilustrasi hutan.
  2. Maskot Pohon Kebaikan.
  3. Teks judul dan kartu sambutan.
  4. Tombol aksi utama `[Mulai Petualangan]`.
* **Urutan Animasi (Orchestration):**
  * Detik 0.0: Kontainer luar muncul dengan fade (`opacity: 0 -> 1`, durasi 250ms).
  * Detik 0.1: Maskot pohon membal naik dari bawah (`y: 30 -> 0`, `scale: 0.9 -> 1`, `gentleSpring`).
  * Detik 0.25: Judul dan tombol aksi muncul berturut-turut (*staggerChildren: 0.08s*).
* **Feedback untuk Anak:** Memberikan rasa hangat bahwa dunia petualangan menyambut kehadiran mereka dengan gembira.
* **Perilaku Reduced Motion:** Seluruh elemen muncul serentak via `opacity: 0 -> 1` (durasi 150ms) tanpa translasi koordinat `y` atau efek skala.

---

### 3.2 Idle Animation Maskot Pohon Kebaikan
* **Pemicu:** Saat pemain berada di layar beranda atau peta level tanpa melakukan interaksi.
* **Elemen:** Karakter ilustrasi Pohon Kebaikan (badan pohon, dedaunan, dan mata).
* **Urutan & Gerakan:**
  * Badan pohon bernapas lembut: `scaleY: [1, 1.025, 1]`, durasi 3.2 detik, loop tak terbatas (*repeat: Infinity, ease: "easeInOut"*).
  * Ranting/daun atas bergoyang santai: `rotate: [-1.5, 1.5, -1.5]`, durasi 4.0 detik.
* **Feedback untuk Anak:** Pohon terasa hidup dan menemani anak belajar seperti sahabat kecil yang tenang.
* **Perilaku Reduced Motion:** Dinonaktifkan total (`scale: 1, rotate: 0`). Pohon tetap berwujud statis yang bersahabat.

---

### 3.3 Navigasi Level Map (Perpindahan Antar Peta)
* **Pemicu:** Masuk ke layar Peta Petualangan dari beranda atau kembali dari misi.
* **Elemen:** Jalur setapak petualangan, 3 kartu lingkaran level, dan panel ringkasan pohon.
* **Urutan Animasi:**
  * Jalur setapak mengembang lembut (`opacity: 0 -> 1`, durasi 200ms).
  * Tiga kartu level membal bertahap dari kiri ke kanan (*staggerChildren: 0.1s*).
  * Level aktif saat ini memiliki pendaran cincin lembut (*pulsing ring: opacity 0.4 -> 0.8 -> 0.4* durasi 2 detik).
* **Feedback untuk Anak:** Memandu fokus pandangan mata anak secara alami ke level yang siap dimainkan.
* **Perilaku Reduced Motion:** Kartu tampil instan dengan fade tanpa stagger dan tanpa cincin berdenyut.

---

### 3.4 Hover, Focus, & Pressed State pada Kartu & Tombol
* **Pemicu:** Arah kursor mouse, tombol keyboard `Tab`, atau ketukan jari pada layar sentuh.
* **Elemen:** Tombol Aksi, Kartu Objek Bantuan, dan Tombol Pilihan Refleksi.
* **State & Durasi:**
  * *Hover (Desktop):* `y: -3px`, `scale: 1.015`, bayangan membesar lembut (durasi 150ms).
  * *Focus (Keyboard):* Cincin fokus muncul seketika (`ring-4 ring-emerald-400`), `scale: 1.01`.
  * *Pressed / Tap (Layar Sentuh):* Membal mengempis `scale: 0.96` (durasi 100ms, `type: "spring"`).
* **Feedback untuk Anak:** Memberi kepastian taktil visual bahwa tombol berhasil tertekan sebelum logika sistem berpindah.
* **Perilaku Reduced Motion:** `scale` dan `y` dinonaktifkan; pergantian hanya berupa perubahan warna border dan kemunculan cincin fokus.

---

### 3.5 Animasi Koin Virtual (Penambahan & Pengurangan Alokasi)
* **Pemicu:** Anak menekan tombol stepper `+10` atau `-10`.
* **Elemen:** Angka saldo kantong koin dan angka koin pada kartu objek bantuan.
* **Urutan Animasi:**
  * Angka yang berubah memantul lembut: `scale: [1, 1.25, 1]`, durasi 200ms (`bouncySpring`).
  * Partikel titik cahaya koin keemasan meluncur pendek dari kantong koin menuju kartu objek (jarak `y: -15px -> 0px`, `opacity: 1 -> 0`, durasi 250ms).
* **Feedback untuk Anak:** Memperjelas bahwa koin virtual berpindah dari kantong pribadi anak ke wadah bantuan warga.
* **Perilaku Reduced Motion:** Angka berganti seketika tanpa efek lompatan skala dan tanpa partikel meluncur.

---

### 3.6 Progress Bar Kebaikan Bersama (Gotong Royong)
* **Pemicu:** Alokasi koin bertambah atau transisi masuk ke layar simulasi dampak.
* **Elemen:** Batang pengisi warna hijau (Koin Pilihanmu) dan warna kuning (Kebaikan Bersama Warga).
* **Urutan Animasi:**
  * Batang warga mengisi terlebih dahulu hingga batas awal (`width: 0% -> 60%`, durasi 400ms, `smoothEase`).
  * Batang koin anak menyambung di ujungnya (`width: 60% -> 100%`, durasi 350ms).
  * Saat menyentuh 100%, lencana stempel **[SIMULASI 100% TERCAPAI]** membal kecil (`scale: 0.8 -> 1.05 -> 1`).
* **Feedback untuk Anak:** Menunjukkan secara visual bahwa bantuan mereka melengkapi gotong royong warga hingga tuntas.
* **Perilaku Reduced Motion:** Batang progress terisi langsung pada posisi akhir tanpa animasi geser lebar bertahap.

---

### 3.7 Reveal Panel Simulasi Dampak & Surat Pak RT
* **Pemicu:** Pengguna menekan tombol `[Periksa Hasil Cerita]` di Level 2.
* **Elemen:** Surat gulung cerita Pak RT dengan stempel **[SIMULASI AMANAH TERSAMPAIKAN]**.
* **Urutan Animasi:**
  * Latar peredup muncul (`opacity: 0 -> 1`, durasi 150ms).
  * Lembaran surat meluncur turun dengan rotasi miring sedikit yang kembali tegak (`y: -40 -> 0`, `rotate: -2 -> 0 deg`, `scale: 0.95 -> 1`, durasi 300ms, `gentleSpring`).
  * Stempel amanah menempel dengan sentakan tegas di akhir (`scale: 1.4 -> 1`, `opacity: 0 -> 1`, durasi 200ms).
* **Feedback untuk Anak:** Terasa seperti membuka surat penghargaan nyata dari seorang tokoh tetua desa yang bijak.
* **Perilaku Reduced Motion:** Surat dan stempel muncul bersamaan melalui fade transparan tanpa perputaran rotasi.

---

### 3.8 Umpan Balik Refleksi Cerita (Evaluasi Tanpa Hukuman)
* **Pemicu:** Anak memilih opsi refleksi dan menekan konfirmasi.
* **Elemen:** Kotak dialog panduan Pohon Kebaikan dan tombol pil yang dipilih.
* **Urutan Animasi:**
  * *Jika Tepat:* Kartu tombol berpendar hijau lembut (`backgroundColor: #DCFCE7`), muncul ikon senyum Pohon Kebaikan membal ceria (`scale: [0.9, 1.1, 1]`, durasi 250ms).
  * *Jika Perlu Pendalaman:* Kartu tombol berkedip kuning lembut 1 kali (bukan merah menyala), lalu balon dialog Pohon Kebaikan menggeser lembut ke depan (`y: 10 -> 0`, durasi 200ms) mengajak berpikir kembali.
* **Feedback untuk Anak:** Tidak ada rasa malu atau takut salah; anak merasa diajak mengobrol dan berpikir kritis.
* **Perilaku Reduced Motion:** Warna kartu berganti tanpa kedipan, balon dialog muncul langsung.

---

### 3.9 Upacara Pertumbuhan Pohon Kebaikan (Tree Growth Ceremony)
* **Pemicu:** Menuntaskan refleksi dan lulus kompetensi level.
* **Elemen:** Batang pohon, cabang ranting baru, dan dedaunan segar.
* **Urutan Animasi:**
  * Fase pohon lama meredup lembut (`opacity: 0.6`, durasi 150ms).
  * Fase pohon baru muncul membal dari akar (`scale: 0.85 -> 1.08 -> 1`, durasi 600ms, `gentleSpring`).
  * Dedaunan dan bunga baru bermekaran berurutan (*stagger: 0.05s*, `scale: 0 -> 1`).
  * Kilau partikel daun kebaikan melayang keluar (`opacity: 1 -> 0`, durasi 500ms).
* **Feedback untuk Anak:** Memberi kepuasan batin yang mendalam bahwa pemahaman mereka membuat lingkungan tumbuh subur.
* **Perilaku Reduced Motion:** Wujud pohon baru langsung menggantikan wujud lama dengan transisi *cross-fade* 200ms.

---

### 3.10 Pembukaan Lencana Kompetensi (Badge Achievement Reveal)
* **Pemicu:** Tepat setelah pohon selesai bertumbuh.
* **Elemen:** Kartu medali kayu lencana, pita pengikat, dan teks nama kompetensi.
* **Urutan Animasi:**
  * Medali lencana muncul dari skala kecil membesar ke tengah (`scale: 0.5 -> 1.1 -> 1`, durasi 400ms, `bouncySpring`).
  * Lingkaran pendaran cahaya keemasan lembut berpendar di belakang lencana (`opacity: 0 -> 0.7 -> 0.3`, durasi 500ms).
  * Teks narasi kompetensi ("Kamu mengutamakan kebutuhan belajar teman!") muncul di bawah lencana (`y: 10 -> 0`, `opacity: 0 -> 1`).
* **Feedback untuk Anak:** Merasa bangga atas sikap bijak yang baru saja mereka pelajari.
* **Perilaku Reduced Motion:** Lencana dan teks tampil langsung melalui fade tanpa efek lonjakan skala.

---

### 3.11 Pembukaan Level Baru pada Peta (Level Unlock)
* **Pemicu:** Pemain kembali ke peta level setelah lulus dari level sebelumnya.
* **Elemen:** Kartu lingkaran level berikutnya dan ikon gembok ramah.
* **Urutan Animasi:**
  * Ikon gembok bergetar kecil lalu memudar hilang (`scale: 1 -> 1.2 -> 0`, `opacity: 1 -> 0`, durasi 300ms).
  * Kartu level yang tadinya berwarna pudar (*greyscale/dimmed*) berubah menjadi cerah bersinar penuh warna (`filter: grayscale(1) -> grayscale(0)`, durasi 350ms).
  * Kartu level baru membal ramah mengundang untuk diklik (`scale: 1 -> 1.08 -> 1`, durasi 300ms).
* **Feedback untuk Anak:** Memberikan kejelasan visual bahwa gerbang petualangan berikutnya telah siap dimasuki.
* **Perilaku Reduced Motion:** Ikon gembok langsung hilang dan warna kartu berganti instan.

---

### 3.12 Transisi Antar Layar (Scene Transition)
* **Pemicu:** Menekan tombol navigasi antar halaman utama (misal: Beranda $\rightarrow$ Peta $\rightarrow$ Misi).
* **Elemen:** Seluruh kontainer halaman (`<motion.main>`).
* **Parameter Motion:**
  * State Keluar (`exit`): `opacity: 0`, `y: -8px`, durasi 150ms.
  * State Masuk (`initial` $\rightarrow$ `animate`): `opacity: 0 -> 1`, `y: 8px -> 0px`, durasi 200ms, `ease: "easeOut"`.
* **Feedback untuk Anak:** Perpindahan halaman terasa mulus seperti membalik halaman buku cerita fisik.
* **Perilaku Reduced Motion:** `y` dinonaktifkan murni menjadi `opacity: 0 -> 1` dengan durasi 100ms.

---

## 4. Matriks Ringkasan Parameter Animasi

| Nama Animasi | Pemicu | Elemen Sasaran | Durasi | Easing / Spring | Fallback Reduced Motion |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Entrance Beranda** | Muat halaman | Judul, Maskot, CTA | 400ms | `gentleSpring` + Stagger | Fade instan 150ms |
| **2. Idle Maskot** | Loop waktu | Pohon Kebaikan | 3.2s | Sinusoidal loop | Statis (Disabled) |
| **3. Peta Level** | Buka peta | 3 Kartu Level | 300ms | Stagger 100ms | Fade instan |
| **4. Button Press** | Tap / Click | Semua tombol & pil | 100ms | Scale 0.96 | Border highlight |
| **5. Koin Meluncur** | Stepper +10/-10 | Angka koin & partikel | 200ms | `bouncySpring` | Nilai berganti instan |
| **6. Progress Gotong Royong** | Alokasi koin | Batang progress | 400ms | `smoothEase` | Langsung terisi penuh |
| **7. Surat Pak RT** | Buka laporan L2 | Scroll kertas & stempel | 350ms | `gentleSpring` | Fade in tanpa rotasi |
| **8. Feedback Refleksi** | Jawab refleksi | Dialog Pohon | 250ms | Ease-out lembut | Teks muncul langsung |
| **9. Pohon Tumbuh** | Lulus level | Siluet kanopi & daun | 600ms | `gentleSpring` | Cross-fade 200ms |
| **10. Badge Reveal** | Pasca-tumbuh | Medali & teks | 400ms | `bouncySpring` | Fade in terpusat |
| **11. Level Unlock** | Kembali ke peta | Kartu & gembok | 350ms | Scale & color fade | Pergantian warna instan |
| **12. Scene Transition** | Ganti layar | Kontainer halaman | 200ms | Ease-in-out | Opacity fade 100ms |

---

## 5. Asumsi Animasi yang Wajib Diuji Bersama Anak dan Guru

1. **[ASUMSI BELUM TERVALIDASI] Sensitivitas Efek Pantul (Spring) pada Layar Sentuh:**  
   *Perlu diuji pada tablet dan ponsel Android kelas pemula (*entry-level*) untuk memastikan efek `gentleSpring` berjalan pada 60 FPS tanpa jeda input (*input stutter).*
2. **[ASUMSI BELUM TERVALIDASI] Respon Anak Terhadap Animasi Tumbuh Pohon:**  
   *Perlu diobservasi apakah durasi pertumbuhan pohon selama 600ms memicu rasa gembira anak, ataukah ada kecenderungan anak ingin mengetuk layar berulang kali untuk mempercepat transisi.*
3. **[ASUMSI BELUM TERVALIDASI] Efektivitas Tombol Sakelar Gerak Tenang:**  
   *Perlu diverifikasi apakah anak atau guru pendamping di sekolah memahami fungsi ikon dan teks sakelar "Gerak Tenang / Reduced Motion".*
