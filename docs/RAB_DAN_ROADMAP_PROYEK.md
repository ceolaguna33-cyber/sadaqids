# RENCANA ANGGARAN BIAYA (RAB) & RENCANA KERJA REALISTIS
## PROYEK SOSIAL: SADAQIDS (JEJAK TUMBUH)
### Sasaran: Siswa Usia 8–14 Tahun (SD/MI Kelas Atas & SMP/MTs)
**Keperluan:** Kompetisi Social Project Sharia Young Leader Summit (SYLS) 2026 — BSI & BSI Maslahat  
**Sifat Dokumen:** Draf Realistis & Aplikatif (Tanpa Over-Budget / Over-Promising)  

---

## 1. PENYESUAIAN KARAKTERISTIK SASARAN (USIA 8–14 TAHUN)

Rentang usia **8 hingga 14 tahun** mencakup fase peralihan penting dari sekolah dasar (SD/MI) hingga sekolah menengah pertama (SMP/MTs):
* **Usia 8–11 Tahun (SD/MI):** Belajar melalui simulasi konkret — mengenali empati, membedakan kebutuhan pokok vs pelengkap, dan kebiasaan berbagi sejak dini.
* **Usia 12–14 Tahun (SMP/MTs):** Mulai memahami konsep tanggung jawab sosial yang lebih luas — kejujuran/amanah penyaluran dana, transparansi, serta dampak gotong royong bagi lingkungan dan sesama.

Pendekatan proyek tetap dibuat bersahabat, interaktif, dan mudah dimainkan melalui web browser gawai apa pun (ponsel cerdas maupun komputer sekolah) tanpa perlu instalasi rumit.

---

## 2. RENCANA ANGGARAN BIAYA (RAB) REALISTIS & SEDERHANA

RAB ini disusun berdasarkan kebutuhan riil skala uji coba (*pilot project*) di **2 sekolah mitra** (1 SD/MI dan 1 SMP/MTs) dengan estimasi total **60–80 siswa**. Anggaran berfokus pada kebutuhan langsung di lapangan tanpa pos-pos yang berlebihan.

### 2.1 RAB Khusus Website & Pemeliharaan (Maintenance)

Berikut rincian anggaran yang difokuskan khusus pada **kebutuhan website dan pemeliharaannya** selama periode aktif proyek:

| No | Komponen Website & Maintenance | Spesifikasi / Rincian Teknis | Periode / Satuan | Biaya Satuan (Rp) | Total (Rp) | Justifikasi / Fungsi Teknis |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- |
| **A** | **Infrastruktur & Domain Awal** | | | | | |
| 1 | Domain Web Resmi | Ekstensi `.id` / `.my.id` / `.com` | 1 Tahun | Rp 150.000 | Rp 150.000 | Alamat web resmi dan tepercaya, mudah diketik siswa di lab sekolah. |
| 2 | Cloud Hosting & CDN Fast Delivery | Cloud Server PWA (Vercel Pro / VPS / Cloudflare Edge) | 6 Bulan | Rp 75.000 / bln | Rp 450.000 | Menjaga loading web < 2 detik saat diakses puluhan siswa serentak. |
| 3 | Sertifikat Keamanan SSL & HTTPS | Auto-renew Cloudflare / Let's Encrypt | 1 Tahun | Gratis (Rp 0) | Rp 0 | Keamanan enkripsi browser siswa tanpa biaya tambahan. |
| 4 | Lisensi Aset Audio & Ikon Storybook | Lisensi suara ramah anak & ikon interaktif | 1 Kali | Rp 250.000 | Rp 250.000 | Menunjang audio naratif anak usia 8–14 tahun agar tidak jenuh. |
| **Subtotal A (Infrastruktur & Setup)** | | | | | **Rp 850.000** | |
| **B** | **Pemeliharaan Berkala (Maintenance Routine)** | | | | | |
| 1 | Pembaruan Keamanan & Dependensi Library | Update rutin React, Vite, Tailwind & audit kerentanan | 6 Bulan | Rp 100.000 / bln | Rp 600.000 | Mencegah bug keamanan atau eror kompatibilitas browser baru. |
| 2 | Penanganan Bug & Responsivitas Layar | Perbaikan layout pada berbagai tipe layar HP & PC sekolah | 6 Bulan | Rp 100.000 / bln | Rp 600.000 | Memastikan tombol tetap min 48px dan pas di layar kecil 360px s.d. PC lab. |
| 3 | Optimasi Kecepatan & Kompresi Aset | Pengecekan berkala aset gambar WebP & cache memori | 6 Bulan | Rp 75.000 / bln | Rp 450.000 | Menjamin game tetap enteng dibuka di jaringan Wi-Fi sekolah yang terbatas. |
| 4 | Pembaruan Narasi Konten & Soal Refleksi | Penyesuaian teks cerita & pertanyaan sesuai masukan guru | 6 Bulan | Rp 50.000 / bln | Rp 300.000 | Menjaga materi sedekah & amanah tetap relevan bagi usia 8–14 tahun. |
| **Subtotal B (Maintenance Rutin 6 Bulan)** | | | | | **Rp 1.950.000** | |
| **TOTAL RAB WEBSITE & MAINTENANCE (6 BULAN)** | | | | | **Rp 2.800.000** | |

> **Opsi Durasi:**
> * **Opsi 6 Bulan (Fase Lomba s.d. Evaluasi Pilot):** **Rp 2.800.000** *(Sangat direkomendasikan untuk proposal lomba)*.
> * **Opsi 1 Tahun Penuh (Full Operational Year):** **Rp 4.750.000** (Menambah hosting 6 bln berikutnya + maintenance semester 2).


---

## 3. SKEMA PENDANAAN (REALISTIS & TRANSPARAN)

1. **Sumber Pendanaan Utama:**
   * Pendanaan / Hibah Kompetisi Social Project SYLS 2026 (BSI & BSI Maslahat): **Rp 3.670.000**
2. **Dukungan Mandiri & Non-Finansial (In-Kind):**
   * Laboratorium komputer / proyektor: Menggunakan fasilitas kelas dari sekolah mitra (tanpa biaya sewa).
   * Desain & pengembangan kode aplikasi: Dikerjakan langsung oleh tim mahasiswa (*zero external developer cost*).

---

## 4. RENCANA KERJA KEDEPANNYA (ROADMAP YANG MEMBUMI)

Rencana kerja dirancang bertahap, tidak muluk-muluk, dan dapat diselesaikan oleh tim beranggotakan 3 mahasiswa sesuai durasi kalender akademik:

```
[Tahap 1: Okt - Des 2026] ────> [Tahap 2: Jan - Feb 2027] ────> [Tahap 3: Mar - Mei 2027]
   Finalisasi Web MVP               Pilot di 2 Sekolah Mitra         Evaluasi & Berbagi Modul
 & Seleksi SYLS Jakarta             (1 SD/MI & 1 SMP/MTs)            ke Komunitas Guru Sekitar
```

### Rincian Tahapan Rencana Kerja:

### Tahap 1: Persiapan & Validasi Teknis (Oktober – Desember 2026)
* **Penyempurnaan Web Game:**
  * Memastikan alur cerita 3 level (Dusun Pelangi, Kampung Sehat, Pesisir Harapan) berjalan lancar di ponsel maupun laptop tanpa lag.
  * Menyesuaikan bahasa refleksi agar luwes bagi anak SD (kelas 4–6) dan tetap menarik bagi siswa SMP kelas 7–8.
* **Uji Coba Terbatas (*Small Circle Test*):**
  * Dicobakan ke 5–10 adik/kerabat usia 8–14 tahun untuk melihat apakah instruksi mudah dipahami dalam waktu 10–15 menit.
* **Partisipasi Lomba SYLS:**
  * Mengumpulkan berkas deck, mengikuti tahapan semifinal/pembekalan, dan presentasi di Grand Final.

### Tahap 2: Pelaksanaan Pilot Project Lapangan (Januari – Februari 2027)
* **Pelaksanaan di 2 Sekolah Mitra:**
  * Mitra 1: 1 SD/MI lokal (Fokus: pengenalan empati & membedakan kebutuhan pokok vs jajan/keinginan).
  * Mitra 2: 1 SMP/MTs lokal (Fokus: prinsip amanah kejujuran, gotong royong, dan transparansi laporan kebaikan).
* **Format Sesi (Durasi 60–75 Menit per Sesi):**
  1. *Pengantar (10 menit):* Pemantik diskusi santai tentang arti berbagi dan sedekah.
  2. *Simulasi Web (20–25 menit):* Siswa memainkan petualangan Jejak Tumbuh di gawai/komputer.
  3. *Refleksi & Diskusi Kelompok (20 menit):* Membahas keputusan yang mereka ambil di dalam game.
  4. *Evaluasi Singkat (10 menit):* Pengisian lembar refleksi (*post-test*) sederhana.

### Tahap 3: Evaluasi Dampak & Dokumentasi Sederhana (Maret – Mei 2027)
* **Pengukuran Hasil Riil:**
  * Merekap hasil lembar refleksi: Mengetahui seberapa banyak siswa yang memahami pentingnya mendahulukan kebutuhan primer sebelum hal pelengkap dan nilai amanah.
* **Penyusunan Laporan Pertanggungjawaban:**
  * Menyerahkan laporan kegiatan dan dokumentasi foto/video sederhana kepada pihak BSI Maslahat dan sekolah mitra.
* **Berbagi Materi Terbuka (Open Resource):**
  * Web game tetap aktif dan bisa diakses gratis oleh guru-guru agama (PAI) lain yang ingin menggunakannya sebagai media ajar interaktif di kelas.

---

## 5. INDIKATOR KEBERHASILAN YANG MASUK AKAL

Bukan angka muluk-muluk jutaan pengguna, melainkan capaian nyata yang bisa dibuktikan:
1. **Partisipasi Siswa:** Minimal **60–80 siswa** (dari 2 sekolah mitra) tuntas menyelesaikan 3 level petualangan.
2. **Keterlibatan Guru:** Minimal **4–6 guru** (guru PAI / wali kelas) ikut mendampingi dan memberikan testimoni kegunaan media ajar.
3. **Peningkatan Pemahaman Konsep:** Minimal **75% siswa** dapat menjelaskan kembali mengapa kebutuhan darurat (buku/pangan) lebih diprioritaskan dibanding hiasan/pelengkap pada lembar evaluasi akhir.
4. **Kelancaran Akses:** Web dapat diakses tanpa hambatan teknis (*zero crash*) di perangkat gawai yang digunakan sekolah.

---
*Dokumen ini dirancang sederhana, jujur, dan terukur agar dewan juri SYLS 2026 melihat bahwa proyek ini benar-benar siap dijalankan dan bukan sekadar konsep di atas kertas.*
