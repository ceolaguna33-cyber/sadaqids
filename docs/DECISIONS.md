# Log Keputusan Produk: JEJAK BAIK (Product Decisions Log)

**Nama Produk:** JEJAK BAIK  
**Dokumen Pendamping:** [`PRD.md`](file:///c:/JEJAKTUMBUH/docs/PRD.md)  
**Versi:** 1.1.0-MVP (Diperbarui Berdasarkan Keputusan Final Produk)  
**Tanggal:** 14 Oktober 2026  

---

## 1. Rangkuman Keputusan Produk yang Telah Final

Semua keputusan di bawah ini telah disahkan sebagai spesifikasi baku dan menjadi acuan utama perancangan sistem dan antarmuka:

| ID Keputusan | Area | Keputusan Final | Rasional & Dampak Teknis |
| :--- | :--- | :--- | :--- |
| **DEC-01** | **Mekanisme Refleksi Akhir Level** | Menggunakan **tiga (3) pilihan jawaban cerita** ditambah **satu (1) pertanyaan alasan sederhana**. Interaksi *drag-and-drop* **secara resmi ditunda ke Fase 2**. | Mengurangi kesulitan motorik di layar ponsel kecil anak usia 8 tahun, sembari tetap menguji kedalaman penalaran moral-rasional mereka. |
| **DEC-02** | **Fitur Printable Journal** | Fitur cetak jurnal (*Print to PDF*) **secara resmi ditunda ke Fase 2**. | Menjaga ruang lingkup MVP tetap ramping, menghindari masalah inkonsistensi rendering printer di berbagai peramban seluler. |
| **DEC-03** | **Skenario Misi Level 2** | Level 2 mengusung **satu skenario terpadu "Kampung Sehat"** yang menggabungkan kebutuhan pangan dan kebersihan. | Mengganti alokasi anggaran angka rumit dengan **pemilihan prioritas berbasis cerita** (anak belajar memilih paket bantuan yang paling krusial untuk mencegah krisis kesehatan warga). |
| **DEC-04** | **Fitur Reset Progres** | Fitur reset progres **masuk ke dalam cakupan MVP** melalui tombol menu peta level dengan dialog konfirmasi ramah anak. | Memudahkan pengujian berulang dan memberi kebebasan anak/guru untuk memulai kembali petualangan tanpa harus mengutak-atik pengaturan browser. |
| **DEC-05** | **Status Transparansi & Sifat Virtual** | Empat status dana tetap dipertahankan pada arsitektur data internal, tetapi **istilah antarmuka disederhanakan ke bahasa cerita anak**. Seluruh data ditegaskan sebagai **simulasi virtual** (tanpa klaim bantuan nyata tersalurkan). | Menanamkan konsep pertanggungjawaban dana sedekah sejak dini tanpa membebani anak dengan jargon perbankan/akuntansi, dan mencegah kesalahpahaman klaim donasi nyata. |
| **DEC-06** | **Basis Kenaikan Level & Pohon** | Pertumbuhan Pohon Kebaikan dan lencana **murni didasarkan pada kompetensi penalaran dan kelulusan refleksi**, bukan besarnya nominal sedekah. | Menjaga prinsip kemurnian niat dan nilai syariah: sedekah bukan arena perlombaan menumpuk koin. |
| **DEC-07** | **Toleransi Penyimpanan (Storage Fallback)** | Penyimpanan utama menggunakan `localStorage`. Jika tidak tersedia, sistem beralih otomatis ke **penyimpanan memori sesi (*in-memory*)** disertai pemberitahuan ramah. | Memastikan aplikasi tidak pernah mogok (*resilient & crash-free*) meski dimainkan dalam mode penyamaran (*incognito*) di laboratorium sekolah. |
| **DEC-08** | **Privasi Anak & Regulasi Indonesia** | Menghapus klaim kepatuhan hukum yang belum diverifikasi (misal COPPA). Mengadopsi **prinsip privasi anak selaras konteks Indonesia (UU PDP No. 27/2022)** dengan **Nol Pengumpulan Data Pribadi (Zero PII)**. | Menjamin kepatuhan etika tanpa membuat pernyataan hukum yang belum melalui uji legal formal. |
| **DEC-09** | **Ruang Lingkup MVP (Strict Scope)** | Mempertahankan batas ketat: **3 level fungsional**, tanpa backend server, tanpa database, tanpa login/akun, tanpa sistem pembayaran, dan tanpa pemanggilan API AI. | Memastikan produk dapat diluncurkan cepat, berkinerja tinggi, berbiaya infrastruktur nol, dan deterministik dalam konten edukatif. |
| **DEC-10** | **Kenyamanan Sesi & Aksesibilitas** | Target waktu bermain **10–15 menit untuk 3 level**, target sentuh tombol minimal **48×48 px**, teks instruksi ringkas, dan **dukungan penuh sakelar Reduced Motion**. | Menyesuaikan kapasitas perhatian anak usia sekolah dasar serta ramah bagi anak dengan sensitivitas gerak/vestibular. |

---

## 2. Rambu-Rambu Mutlak yang Tidak Boleh Diubah (Guardrails)

Aturan-aturan berikut tidak dapat diubah tanpa persetujuan Product Manager:

1. **DILARANG MENGGUNAKAN LEADERBOARD / SKOR NOMINAL:**  
   Tidak boleh ada perbandingan nominal sedekah antar pemain atau papan peringkat.
2. **DILARANG MEMBERIKAN HUKUMAN MORAL:**  
   Pilihan refleksi yang belum tepat dibimbing dengan dialog ramah tanpa penalti koin, tanpa bunyi kesalahan memalukan, dan tanpa kata-kata menghakimi.
3. **DILARANG MEMBUAT KLAIM DONASI NYATA PADA UI:**  
   Seluruh antarmuka harus menegaskan sifat simulasi edukasi petualangan koin virtual.
4. **DILARANG MENGUMPULKAN DATA IDENTITAS ANAK:**  
   Tidak ada kolom input nama lengkap, email, foto, kontak, atau pelacak pihak ketiga.
5. **ANIMASI WAJIB NON-BLOCKING:**  
   Gerakan visual tidak boleh mengunci respon tombol sentuh/klik pengguna.

---

## 3. Fitur yang Ditunda ke Fase 2 (Post-MVP Roadmap)

| Fitur | Deskripsi | Alasan Penundaan ke Fase 2 |
| :--- | :--- | :--- |
| **Drag-and-Drop Stiker Amanah** | Interaksi menyeret stempel bukti penyaluran ke lembar laporan. | Menghindari frustrasi navigasi motorik halus pada layar ponsel kecil saat MVP. |
| **Printable Journal (PDF)** | Fungsi mencetak rapor capaian kebaikan anak ke printer/PDF. | Mengurangi kompleksitas lintas peramban (*cross-browser rendering*) pada rilis awal. |
| **Level 4 & Level 5** | Misi Desa Berdaya (Sedekah Produktif) dan Kota Tanggap (Keadilan Bencana). | Validasi efektivitas loop pembelajaran 3 level pertama terlebih dahulu. |
| **Efek Audio & Suara Narasi** | BGM bertema buku cerita dan fitur suara pembaca (*read-aloud*). | Menjaga ukuran *bundle* web tetap ringan dan menghindari gangguan suara di kelas. |

---

## 4. Asumsi yang Belum Divalidasi Melalui Pengujian Bersama Anak dan Guru

Daftar asumsi kunci berikut wajib diverifikasi melalui observasi langsung pada sesi uji coba:

1. **[ASUMSI BELUM TERVALIDASI] Keterbacaan Pertanyaan Refleksi:**  
   *Anak usia 8 tahun dapat membaca dan memahami konteks 3 opsi cerita serta 1 pertanyaan alasan tanpa harus didampingi intensif oleh orang dewasa.*
2. **[ASUMSI BELUM TERVALIDASI] Kepuasan Visual Pohon Kebaikan:**  
   *Animasi bertumbuhnya daun dan lencana naratif memiliki daya tarik penghargaan (*intrinsic reward*) yang cukup kuat menggantikan skor angka.*
3. **[ASUMSI BELUM TERVALIDASI] Pemahaman Istilah Sederhana Transparansi:**  
   *Anak memahami alur "Kebutuhan Teman $\rightarrow$ Kebaikan Bantuanmu $\rightarrow$ Bersama Warga $\rightarrow$ Simulasi Sampai!" sebagai rantai tanggung jawab amanah.*
4. **[ASUMSI BELUM TERVALIDASI] Rentang Konsentrasi 10–15 Menit:**  
   *Anak dapat menyelesaikan seluruh rangkaian 3 level dalam satu rentang sesi pembelajaran tanpa merasa lelah atau tergesa-gesa.*

---

## 5. Keputusan Terbuka yang Masih Memerlukan Uji Coba Lapangan

Isu-isu berikut tidak menghalangi arsitektur dasar, tetapi akan disesuaikan saat penataan purwarupa visual:

1. **Format Input Pertanyaan Alasan (Refleksi Tahap 2):**  
   * *Opsi A:* Menggunakan tombol pilihan pil (*chip buttons*) ukuran 48px yang langsung bisa diklik (Rekomendasi teknis karena mudah diakses jari anak).  
   * *Opsi B:* Menggunakan menu tarik-turun (*dropdown*) ringkas (Kurang direkomendasikan untuk anak usia 8 tahun).
2. **Format Tampilan Laporan Cerita Level 2:**  
   * *Opsi A:* Bentuk surat bergambar berpita (*whimsical scroll*) dari tokoh Pak RT.  
   * *Opsi B:* Bentuk kartu buletin berita desa.

---

*Log ini merupakan rekaman keputusan resmi untuk memastikan keselarasan penuh antara produk, pedagogi, dan implementasi teknik.*
