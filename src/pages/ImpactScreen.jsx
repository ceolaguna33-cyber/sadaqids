import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Award,
  Heart,
  Eye,
  Info,
  Layers,
  Sun,
  CloudRain,
  Smile,
  Star,
  Check,
} from 'lucide-react';
import { ProgressBarGotongRoyong } from '../components/ProgressBarGotongRoyong';
import { normalizeAidOptions, getLevelNumberInWorld } from '../data/worldsData';
import { MascotPohon } from '../components/MascotPohon';
import {
  IconSuratAmanahPakRT,
  IconKoinKebaikan,
  IconBukuDanPena,
  IconSeragamDanSepatu,
  IconHiasanKelas,
  IconPanganSehat,
  IconSanitasiAir,
  IconBakauPesisir,
  IconPagarBambu,
  IconSumurDesa,
  IconObatDarurat,
  IconAlatTani,
  IconBalaiWarga,
  IconPerpustakaanMini,
  IconTamanBermain,
  IconLampuTaman,
  IconGedungSekolah,
  IconKlinikSehat,
  IconMasjidWarga,
  IconTamanKota,
} from '../components/CustomIllustrations';
import { SimulationStamp } from '../components/SimulationStamp';

// Pemetaan ID Opsi Bantuan ke Komponen SVG Ilustrasi
const AID_ILLUSTRATIONS = {
  opt_buku: IconBukuDanPena,
  opt_buku_tulis: IconBukuDanPena,
  opt_seragam: IconSeragamDanSepatu,
  opt_buku_seragam: IconSeragamDanSepatu,
  opt_hiasan: IconHiasanKelas,
  opt_cat_pita: IconHiasanKelas,
  opt_pangan: IconPanganSehat,
  opt_sanitasi: IconSanitasiAir,
  opt_camilan: IconHiasanKelas,
  opt_bakau: IconBakauPesisir,
  opt_pagar: IconPagarBambu,
  opt_lampu: IconLampuTaman,
  opt_sumur: IconSumurDesa,
  opt_obat: IconObatDarurat,
  opt_tani: IconAlatTani,
  opt_balai: IconBalaiWarga,
  opt_perpus: IconPerpustakaanMini,
  opt_taman: IconTamanBermain,
  opt_dekorasi: IconLampuTaman,
  opt_sekolah: IconGedungSekolah,
  opt_klinik: IconKlinikSehat,
  opt_masjid: IconMasjidWarga,
  opt_taman_kota: IconTamanKota,
};

// ============================================================================
// KOMPONEN ILUSTRASI REALISTIS SEBELUM VS SESUDAH BANTUAN (STORYBOOK DIORAMA)
// ============================================================================

function StorybookVisualScenery({ levelId, viewMode, isReducedMotion }) {
  const isBefore = viewMode === 'before';
  const numericId = Number(levelId || 1);

  const getSceneryData = (id, before) => {
    switch (id) {
      case 1:
        return {
          image: before ? '/images/impact_level1_before.jpg' : '/images/impact_level1_after.jpg',
          alt: before ? 'Sekolah bocor terkena hujan' : 'Sekolah baru dengan buku pelajaran dan pelangi',
          statusBadge: before ? '🌧️ Keadaan Sebelum: Buku Basah & Atap Bocor' : '✨ Keajaiban Nyata: Sekolah Baru & Siap Ujian!',
          badgeClass: before ? 'bg-red-600/90 text-white border-red-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '🌧️ "Buku pelajaran basah dan atap bocor, kami cemas tak bisa ujian sekolah..."'
            : '🥳 "Alhamdulillah! Atap kami kokoh dan buku baru siap menyambut ujian dengan riang!"',
          mascot: before ? '/images/maskot_laki_cutout.png' : '/images/maskot_perempuan_cutout.png',
        };
      case 2:
        return {
          image: before ? '/images/impact_level2_before.jpg' : '/images/level2_kampung_sehat.jpg',
          alt: before ? 'Posko banjir kehabisan makanan' : 'Posko sehat dengan makanan bergizi dan sabun cuci tangan',
          statusBadge: before ? '⚠️ Keadaan Sebelum: Dapur Posko Kosong' : '🍲 Keajaiban Nyata: Posko Sehat & Makanan Melimpah!',
          badgeClass: before ? 'bg-amber-600/90 text-white border-amber-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '🌧️ "Dapur posko kehabisan beras dan air bersih, anak-anak lapar dan rawan sakit..."'
            : '🥳 "Alhamdulillah! Makanan sehat melimpah dan sabun bersih menjaga kesehatan warga!"',
          mascot: before ? '/images/maskot_perempuan_cutout.png' : '/images/maskot_laki_cutout.png',
        };
      case 3:
        return {
          image: before ? '/images/impact_level3_before.jpg' : '/images/level3_pesisir_harapan.jpg',
          alt: before ? 'Pantai terkikis ombak ganas' : 'Hutan bakau lestari melindungi pesisir',
          statusBadge: before ? '🌊 Keadaan Sebelum: Abrasi Pantai & Ombak Ganas' : '🌿 Keajaiban Nyata: Hutan Bakau Pelindung Pesisir!',
          badgeClass: before ? 'bg-blue-700/90 text-white border-blue-300' : 'bg-teal-600/90 text-white border-teal-300',
          quote: before
            ? '⚠️ "Ombak ganas terus mengikis pantai desa, perahu nelayan terancam hancur..."'
            : '🌿 "Alhamdulillah! Rumpun bakau lestari kokoh menahan ombak laut sepanjang masa!"',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 4:
        return {
          image: before ? '/images/impact_level4_before.jpg' : '/images/level4_desa_bangkit.jpg',
          alt: before ? 'Sumur kering dan kemarau' : 'Sumur mengalirkan air jernih dan klinik desa aktif',
          statusBadge: before ? '☀️ Keadaan Sebelum: Kemarau & Sumur Kering' : '💧 Keajaiban Nyata: Air Mengalir & Klinik Desa Bangkit!',
          badgeClass: before ? 'bg-amber-700/90 text-white border-amber-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '⚠️ "Sumur tua mengering di musim kemarau, warga kesulitan air minum dan pos obat rusak..."'
            : '💧 "Alhamdulillah! Air bersih segar mengalir deras dan klinik desa siap melayani warga!"',
          mascot: before ? '/images/maskot_laki_cutout.png' : '/images/maskot_perempuan_cutout.png',
        };
      case 5:
        return {
          image: before ? '/images/impact_level5_before.jpg' : '/images/level5_taman_amanah.jpg',
          alt: before ? 'Lahan kosong dan warga bingung' : 'Taman bermain ceria dan papan laporan transparan',
          statusBadge: before ? '❓ Keadaan Sebelum: Lahan Kosong & Warga Bingung' : '⭐ Keajaiban Nyata: Laporan Transparan & Taman Ceria!',
          badgeClass: before ? 'bg-rose-600/90 text-white border-rose-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '❓ "Warga bingung belum ada kejelasan laporan, anak-anak tidak punya tempat bermain..."'
            : '⭐ "Alhamdulillah! Laporan amanah diverifikasi terbuka dan taman bermain penuh tawa anak!"',
          mascot: '/images/maskot_perempuan_cutout.png',
        };
      case 6:
        return {
          image: before ? '/images/impact_level6_before.jpg' : '/images/level_map_gerbang_kebaikan.jpg',
          alt: before ? 'Pondasi gerbang kebaikan menunggu pilar' : 'Gerbang emas empat pilar berdiri megah',
          statusBadge: before ? '📜 Keadaan Sebelum: Pondasi Cetak Biru Menanti Bantuan' : '👑 Keajaiban Nyata: Empat Pilar Kebaikan Berdiri Megah!',
          badgeClass: before ? 'bg-amber-700/90 text-white border-amber-300' : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 border-yellow-200',
          quote: before
            ? '📜 "Pondasi empat pilar masa depan menanti keputusan bijakmu untuk membangun negeri..."'
            : '👑 "Alhamdulillah! Sekolah, klinik, masjid, dan taman kota terwujud! Kamu adalah Pahlawan Kebaikan sejati!"',
          mascot: before ? '/images/maskot_laki_cutout.png' : '/images/pohon_kebaikan_cutout.png',
        };
      case 7:
        return {
          image: '/images/level7_pasar_kebutuhan.jpg',
          alt: 'Pasar kebutuhan desa dengan bahan pokok melimpah',
          statusBadge: before ? '⚠️ Keadaan Sebelum: Anggaran Terbatas & Daftar Panjang' : '🛒 Keajaiban Nyata: Kebutuhan Pokok Pasar Terpenuhi!',
          badgeClass: before ? 'bg-orange-600/90 text-white border-orange-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '⚠️ "Daftar belanja terlalu panjang dan anggaran terbatas, warga cemas makanan pokok tidak terbeli..."'
            : '🛒 "Alhamdulillah! Beras, air bersih, dan obat posko terpenuhi tepat sasaran tanpa pemborosan!"',
          mascot: before ? '/images/maskot_laki_cutout.png' : '/images/maskot_laki_cutout.png',
        };
      case 8:
        return {
          image: '/images/level8_balai_desa.jpg',
          alt: 'Balai desa harapan dengan tiga keluarga menerima bantuan',
          statusBadge: before ? '❓ Keadaan Sebelum: 3 Keluarga Butuh Bantuan Berbeda' : '🎯 Keajaiban Nyata: Bantuan Tepat Sasaran untuk 3 Keluarga!',
          badgeClass: before ? 'bg-amber-600/90 text-white border-amber-300' : 'bg-teal-600/90 text-white border-teal-300',
          quote: before
            ? '❓ "Nenek butuh obat, Pak Tani butuh cangkul, dan adik sekolah butuh tas, belum ada bantuan cocok..."'
            : '🎯 "Alhamdulillah! Nenek dapat obat, Pak Tani dapat cangkul, dan adik sekolah dapat seragam baru!"',
          mascot: before ? '/images/maskot_perempuan_cutout.png' : '/images/maskot_perempuan_cutout.png',
        };
      case 9:
        return {
          image: '/images/level9_bendahara_kecil.jpg',
          alt: 'Meja bendahara kecil dengan alokasi 4 pos berimbang',
          statusBadge: before ? '💰 Keadaan Sebelum: 200 Koin Anggaran Belum Terbagi' : '⚖️ Keajaiban Nyata: 4 Pos Bantuan Terbagi Seimbang & Adil!',
          badgeClass: before ? 'bg-yellow-600/90 text-white border-yellow-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '💰 "Banyak pos bantuan membutuhkan dana darurat, bagaimana membaginya agar adil dan cukup?"'
            : '⚖️ "Alhamdulillah! Pos pangan, kesehatan, pendidikan, dan logistik terbagi seimbang sempurna!"',
          mascot: '/images/maskot_perempuan_cutout.png',
        };
      case 10:
        return {
          image: '/images/level10_gotong_royong.jpg',
          alt: 'Warga gotong royong mendistribusikan bantuan logistik',
          statusBadge: before ? '📦 Keadaan Sebelum: Ratusan Paket Menumpuk di Gudang' : '🤝 Keajaiban Nyata: Gotong Royong Warga Membagikan Paket!',
          badgeClass: before ? 'bg-sky-600/90 text-white border-sky-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '📦 "Paket bantuan menumpuk di gudang, relawan butuh koordinasi agar bantuan cepat sampai..."'
            : '🤝 "Alhamdulillah! Tim packing, angkut, dan distribusi bekerja sama dengan tangkas dan ceria!"',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 11:
        return {
          image: '/images/level11_taman_wakaf.jpg',
          alt: 'Taman wakaf produktif yang subur dan pustaka wakaf',
          statusBadge: before ? '🌱 Keadaan Sebelum: Lahan Tidur Terbengkalai di Sudut Desa' : '🌿 Keajaiban Nyata: Kebun Buah & Pustaka Wakaf Jariyah Lestari!',
          badgeClass: before ? 'bg-amber-600/90 text-white border-amber-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '🌱 "Lahan subur ini lama terbengkalai, andai ada kebaikan jariyah yang bisa menghidupkannya..."'
            : '🌿 "Alhamdulillah! Kebun wakaf berbuah lebat dan pustaka wakaf mencerdaskan anak-anak desa sepanjang masa!"',
          mascot: '/images/maskot_perempuan_cutout.png',
        };
      case 12:
        return {
          image: '/images/level12_rapat_prioritas.jpg',
          alt: 'Rapat darurat balai desa menentukan prioritas penyelamatan',
          statusBadge: before ? '⚡ Keadaan Sebelum: 5 Usulan Masuk, Anggaran Cuma 3 Slot' : '🚨 Keajaiban Nyata: Mufakat Mendahulukan Penyelamatan Warga!',
          badgeClass: before ? 'bg-red-600/90 text-white border-red-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '⚡ "Banjir melanda dan dana terbatas, kita harus memilih usulan yang paling genting menyelamatkan jiwa..."'
            : '🚨 "Alhamdulillah! Keputusan mufakat berhasil mendahulukan gizi balita, evakuasi, dan obat darurat!"',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 13:
        return {
          image: '/images/level13_proyek_impian.jpg',
          alt: 'Peresmian Pusat Komunitas & Kesehatan Impian Warga',
          statusBadge: before ? '🏗️ Keadaan Sebelum: Desain Maket Pusat Komunitas & Klinik' : '🎉 Keajaiban Nyata: Pusat Kebaikan Bersama Diresmikan Warga!',
          badgeClass: before ? 'bg-purple-600/90 text-white border-purple-300' : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 border-yellow-200',
          quote: before
            ? '🏗️ "Warga mendambakan pusat kegiatan, klinik kesehatan, dan perpustakaan terpadu di desa kita..."'
            : '🎉 "Alhamdulillah! Pita merah tergunting, Pusat Komunitas & Kesehatan resmi melayani seluruh warga desa!"',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 14:
        return {
          image: '/images/level14_buku_catatan.jpg',
          alt: 'Buku catatan kas amanah terisi rapi di meja audit',
          statusBadge: before ? '📒 Keadaan Sebelum: Aliran Donasi Masuk & Keluar Belum Tercatat' : '✅ Keajaiban Nyata: Buku Catatan Amanah Terisi Rapi & Jujur!',
          badgeClass: before ? 'bg-blue-700/90 text-white border-blue-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '📒 "Setiap rupiah adalah titipan kepercayaan donatur, jangan sampai ada sepeserpun yang luput dari catatan..."'
            : '✅ "Alhamdulillah! Setiap koin masuk dan keluar tercatat dengan jujur dan rapi di Buku Amanah!"',
          mascot: '/images/maskot_perempuan_cutout.png',
        };
      case 15:
        return {
          image: '/images/level15_detektif_bukti.jpg',
          alt: 'Detektif bukti memeriksa nota dan faktur dengan kaca pembesar',
          statusBadge: before ? '🔍 Keadaan Sebelum: 5 Faktur Belanja Masuk Meja Audit' : '🔎 Keajaiban Nyata: Seluruh Nota Diverifikasi Sah & Jujur!',
          badgeClass: before ? 'bg-indigo-600/90 text-white border-indigo-300' : 'bg-teal-600/90 text-white border-teal-300',
          quote: before
            ? '🔍 "Ada faktur belanja yang mencurigakan tanpa stempel toko, detektif cilik harus memeriksa dengan jeli..."'
            : '🔎 "Alhamdulillah! Berkat ketelitian detektif cilik, seluruh nota belanja diverifikasi sah dengan cap toko resmi!"',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 16:
        return {
          image: '/images/level16_jembatan_rencana.jpg',
          alt: 'Jembatan evaluasi membandingkan rencana dan kenyataan anggaran',
          statusBadge: before ? '📊 Keadaan Sebelum: Evaluasi Akhir Bulan, Apakah Anggaran Sesuai?' : '🌉 Keajaiban Nyata: Jembatan Rencana & Realisasi Seimbang!',
          badgeClass: before ? 'bg-violet-600/90 text-white border-violet-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '📊 "Mari bandingkan rencana awal dan kenyataan lapangan, apakah ada pemborosan dana bantuan?"'
            : '🌉 "Alhamdulillah! Evaluasi membuktikan anggaran digunakan sangat efisien dan ada sisa hemat untuk program berikutnya!"',
          mascot: '/images/maskot_perempuan_cutout.png',
        };
      case 17:
        return {
          image: '/images/level17_pemeriksa_klaim.jpg',
          alt: 'Meja verifikasi klaim dan berkas penerima bantuan berhak',
          statusBadge: before ? '🛡️ Keadaan Sebelum: Dokumen Pengajuan Bantuan Menanti Verifikasi' : '📜 Keajaiban Nyata: Bantuan Diterima Hanya oleh yang Berhak!',
          badgeClass: before ? 'bg-slate-600/90 text-white border-slate-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '🛡️ "Pemeriksa harus teliti dan adil, jangan sampai bantuan disalahgunakan oleh pihak yang tidak berhak..."'
            : '📜 "Alhamdulillah! Dokumen keluarga prasejahtera diverifikasi sah dan santunan diserahkan tepat sasaran!"',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 18:
        return {
          image: '/images/level18_benteng_aset.jpg',
          alt: 'Benteng aset wakaf melindungi patok batas dan sertifikat legal',
          statusBadge: before ? '🏰 Keadaan Sebelum: 3 Ancaman Mengintai Komplek Tanah Wakaf' : '🛡️ Keajaiban Nyata: Patok Batas & Sertifikat Wakaf Aman Terlindungi!',
          badgeClass: before ? 'bg-amber-700/90 text-white border-amber-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '🏰 "Patok batas tanah wakaf digeser oknum dan dokumen terancam, benteng perlindungan harus ditegakkan..."'
            : '🛡️ "Alhamdulillah! Sertifikat resmi terpasang dan patok batas tanah wakaf kini berdiri kokoh dan aman!"',
          mascot: '/images/maskot_perempuan_cutout.png',
        };
      case 19:
        return {
          image: '/images/level19_laporan_dampak.jpg',
          alt: 'Papan pengumuman transparansi laporan dampak publik 100%',
          statusBadge: before ? '📋 Keadaan Sebelum: Penyusunan Laporan Transparansi Donatur' : '📢 Keajaiban Nyata: Papan Transparansi 100% Terbuka untuk Warga!',
          badgeClass: before ? 'bg-teal-700/90 text-white border-teal-300' : 'bg-emerald-600/90 text-white border-emerald-300',
          quote: before
            ? '📋 "Laporan yang baik bukan hanya mencatat keberhasilan, tapi juga jujur mencatat pelajaran dari lapangan..."'
            : '📢 "Alhamdulillah! Infografis penggunaan dana donasi 100% dipublikasikan terbuka di hadapan seluruh warga!"',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 20:
      default:
        return {
          image: '/images/level20_misi_akhir.jpg',
          alt: 'Puncak perayaan agung Penjaga Amanah Nusantara di istana kubah emas',
          statusBadge: before ? '👑 Keadaan Sebelum: Ujian Pamungkas 3 Pilar Penjaga Amanah' : '🌟 Keajaiban Nyata: Gelar Pahlawan Penjaga Amanah Nusantara!',
          badgeClass: before ? 'bg-amber-700/90 text-white border-amber-300' : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 border-yellow-200',
          quote: before
            ? '👑 "Ujian akhir memadukan identifikasi, alokasi, dan laporan pertanggungjawaban di hadapan Pohon Kebaikan..."'
            : '🌟 "Maa Syaa Allah! Kamu telah menuntaskan seluruh 20 Level Petualangan dan menyandang gelar Penjaga Amanah Nusantara Sejati! 🌟👑"',
          mascot: '/images/pohon_kebaikan_cutout.png',
        };
    }
  };

  const scenery = getSceneryData(numericId, isBefore);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden select-none bg-stone-900 shadow-inner">
      {/* Gambar Ilustrasi Resolusi Tinggi dengan Animasi Ken-Burns */}
      <motion.img
        src={scenery.image}
        alt={scenery.alt}
        className={`w-full h-full object-cover object-center transition-filter duration-700 ${
          isBefore ? 'saturate-90 brightness-95' : 'saturate-110 brightness-105'
        }`}
        initial={{ scale: 1 }}
        animate={isReducedMotion ? {} : { scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Efek Pencahayaan Khusus: Sebelum (Mendung/Hujan) vs Sesudah (Cahaya Emas & Pelangi) */}
      {isBefore ? (
        <div className="absolute inset-0 bg-stone-950/25 pointer-events-none mix-blend-multiply" />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-transparent to-yellow-300/20 pointer-events-none" />
          {/* Efek kilau partikel emas mengambang */}
          {!isReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{ y: [0, -40], opacity: [0, 0.8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                className="absolute bottom-10 left-1/4 text-yellow-300 text-lg"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{ y: [0, -50], opacity: [0, 0.9, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.2 }}
                className="absolute bottom-16 right-1/3 text-amber-200 text-base"
              >
                🌟
              </motion.div>
              <motion.div
                animate={{ y: [0, -35], opacity: [0, 0.7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
                className="absolute bottom-8 left-1/2 text-yellow-100 text-sm"
              >
                ✨
              </motion.div>
            </div>
          )}
        </>
      )}

      {/* Lapisan Vignette Halus */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

      {/* Badge Status Transformasi (Kiri Atas) */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full font-display font-black text-xs sm:text-sm shadow-xl border backdrop-blur-md ${scenery.badgeClass}`}
      >
        <span>{scenery.statusBadge}</span>
      </motion.div>

      {/* Karakter Maskot Reaktif di Sudut Kanan Bawah */}
      <motion.div
        animate={isReducedMotion ? {} : isBefore ? { y: [0, 4, 0] } : { y: [0, -8, 0], rotate: [-1, 2, -1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-2 right-2 sm:right-6 z-20 w-20 sm:w-28 md:w-32 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
      >
        <img
          src={scenery.mascot}
          alt="Maskot Sahabat Kebaikan"
          className="w-full h-auto object-contain max-h-36 sm:max-h-40"
        />
      </motion.div>

      {/* Balon Kutipan Cerita di Bagian Bawah Gambar */}
      <div className="absolute bottom-3 left-3 right-24 sm:right-36 z-20">
        <div className="bg-white/95 backdrop-blur-md border-2 border-amber-300 rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-xl">
          <p className="font-display font-extrabold text-stone-900 text-xs sm:text-sm leading-snug">
            {scenery.quote}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PANGGUNG TRANSFORMASI CERITA (SEBELUM VS SESUDAH BANTUAN)
// ============================================================================

function StorybookTransformationStage({ mission, playerAllocations, isReducedMotion, onPlaySound }) {
  const [viewMode, setViewMode] = useState('after'); // 'before' | 'after'
  const levelId = mission?.id || 1;

  const handleToggleMode = (mode) => {
    setViewMode(mode);
    if (onPlaySound) {
      if (mode === 'after') {
        onPlaySound('goalReached');
      } else {
        onPlaySound('tap');
      }
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-4 sm:p-6 border-[3px] border-amber-300 shadow-[0_15px_40px_rgba(245,158,11,0.14)] mb-8 text-left relative overflow-hidden">
      {/* Header Tab Toggle Sebelum vs Sesudah */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-amber-100">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 block mb-0.5">
            🌱 Keajaiban Cerita • Level {getLevelNumberInWorld(mission)}: {mission.title}
          </span>
          <h3 className="font-display font-black text-xl sm:text-3xl text-stone-900 leading-tight">
            Lihat Perubahan Berkat Kebaikanmu!
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Sentuh tab di bawah untuk membandingkan keadaan desa sebelum dan sesudah kamu menyalurkan bantuan:
          </p>
        </div>

        {/* Tombol Tab Beralih Sebelum vs Sesudah (Chunky & Tactile 3D Buttons) */}
        <div className="inline-flex rounded-2xl p-1.5 bg-amber-50 border-2 border-amber-200 shadow-sm gap-1.5">
          <button
            onClick={() => handleToggleMode('before')}
            className={`px-4 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 active:translate-y-0.5 ${
              viewMode === 'before'
                ? 'bg-gradient-to-b from-rose-500 to-rose-600 text-white border-b-4 border-rose-800 shadow-md scale-102'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <span>🌧️</span>
            <span>Sebelum Dibantu</span>
          </button>
          <button
            onClick={() => handleToggleMode('after')}
            className={`px-4 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 active:translate-y-0.5 ${
              viewMode === 'after'
                ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-b-4 border-emerald-800 shadow-lg ring-2 ring-emerald-300 scale-105'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <span>🌈</span>
            <span>Setelah Dibantu ✨</span>
          </button>
        </div>
      </div>

      {/* Panggung Animasi Ilustrasi Sebelum vs Sesudah */}
      <div className="w-full h-72 sm:h-96 md:h-[430px] rounded-2xl border-4 border-amber-300 ring-4 ring-amber-100 overflow-hidden relative shadow-[0_12px_36px_rgba(217,119,6,0.18)] mb-5 bg-stone-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <StorybookVisualScenery
              levelId={levelId}
              viewMode={viewMode}
              isReducedMotion={isReducedMotion}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Narasi Pembelajaran Ramah Anak Usia 8-10 Tahun */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-emerald-950 font-sans leading-relaxed flex items-start gap-3.5 shadow-sm">
        <span className="text-3xl shrink-0">🌟</span>
        <div>
          <strong className="text-emerald-900 block font-display text-base sm:text-lg mb-0.5">
            Hebat Sekali, Sahabat Kebaikan!
          </strong>
          <p className="text-emerald-950 text-xs sm:text-sm leading-relaxed">
            Koin petualangan yang kamu salurkan berhasil mewujudkan kebutuhan paling mendesak di{' '}
            <strong>{mission.story?.location || mission.title}</strong>. Teman-teman dan warga sekarang bisa tersenyum riang dan hidup lebih sejahtera berkat ketulusanmu!
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: IMPACT SCREEN (STORYBOOK OUTCOME & LAPORAN AMANAH)
// ============================================================================

export function ImpactScreen({
  mission,
  playerAllocations = {},
  onProceedToReflection,
  onBackToAllocation,
  onPlaySound,
  isReducedMotion = false,
}) {
  const normalizedOptions = useMemo(() => normalizeAidOptions(mission), [mission]);
  const playerTotalCoins = Object.values(playerAllocations || {}).reduce((a, b) => a + b, 0);
  const initialCoins = mission.virtualCurrency?.initialCoins || 100;
  const communityCoins = mission.collectiveSimulation?.communityInitialCoins || 0;
  const targetCoins = mission.collectiveSimulation?.targetTotalCoins || initialCoins;
  const totalCombinedCoins = playerTotalCoins + communityCoins;
  const remainingCoins = Math.max(0, initialCoins - playerTotalCoins);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (onPlaySound) setTimeout(() => onPlaySound('goalReached'), 300);
  }, [onPlaySound]);

  // Evaluasi pemenuhan opsi pokok (isEssential / isPriority)
  const priorityOptions = normalizedOptions.filter((o) => o.isEssential || o.isPriority);
  const wellFundedPriorities = priorityOptions.filter(
    (o) => (playerAllocations[o.id] || 0) >= (o.minCost || Math.floor(o.targetCoins * 0.5))
  );
  const madeGoodChoice =
    priorityOptions.length > 0
      ? wellFundedPriorities.length >= priorityOptions.length
      : playerTotalCoins > 0;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 pb-28 text-stone-800">
      {/* ====== HEADER NAVIGASI HUD ====== */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <button
          onClick={onBackToAllocation}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-warm-50 text-stone-700 font-display font-bold text-xs sm:text-sm border-2 border-stone-200 shadow-[0_4px_0_0_#e5e7eb] active:translate-y-1 active:shadow-none transition-all cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 text-forest-700 stroke-[2.5]" />
          <span>Ubah Pilihan Koin</span>
        </button>

        <SimulationStamp variant="badge" isReducedMotion={isReducedMotion} />
      </div>

      {/* ====== HERO TITLE ====== */}
      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-100 text-forest-900 text-xs sm:text-sm font-black mb-2.5 border border-forest-300 shadow-xs">
          <Sparkles className="w-4 h-4 text-forest-600" />
          <span>🎈 Pesta Kebaikan Bersama • {mission.conceptType}</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-forest-900 leading-tight">
          {madeGoodChoice
            ? 'Kebaikanmu Membawa Senyuman! 🌟'
            : 'Misi Bantuan Selesai Disalurkan! 🎉'}
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto mt-1.5 font-sans leading-relaxed">
          Lihat bagaimana pilihan koin kebaikanmu bersatu dengan gotong royong warga{' '}
          <strong className="text-stone-900">{mission.title}</strong> dalam cerita ini:
        </p>
      </div>

      {/* ====== PANGGUNG SEBELUM VS SESUDAH ====== */}
      <StorybookTransformationStage
        mission={mission}
        playerAllocations={playerAllocations}
        isReducedMotion={isReducedMotion}
        onPlaySound={onPlaySound}
      />

      {/* ====== PROGRESS BAR GOTONG ROYONG VIRTUAL ====== */}
      <div className="mb-8">
        <ProgressBarGotongRoyong
          targetTotalCoins={targetCoins}
          communityCoins={communityCoins}
          playerCoins={playerTotalCoins}
          isReducedMotion={isReducedMotion}
        />
      </div>

      {/* ====== DOKUMEN LAPORAN AMANAH CERITA (SURAT TERIMA KASIH) ====== */}
      <motion.div
        className="rounded-3xl p-5 sm:p-8 border-3 border-amber-300 bg-gradient-to-b from-amber-50/95 via-warm-50 to-parchment-100 shadow-[0_12px_32px_rgba(217,119,6,0.1),0_4px_0_0_#fcd34d] mb-8 relative text-left"
        initial={isReducedMotion ? { opacity: 0 } : { y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Stempel Segel Amanah */}
        <div className="absolute top-5 right-5 hidden sm:block">
          <SimulationStamp variant="seal" isReducedMotion={isReducedMotion} />
        </div>

        {/* Header Dokumen Laporan Tokoh */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-5 pb-5 border-b-2 border-amber-200">
          <div className="shrink-0 mt-1">
            <IconSuratAmanahPakRT className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-sm" />
          </div>
          <div className="min-w-0 pr-0 sm:pr-24">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 border border-forest-300 text-xs font-black uppercase tracking-wider mb-2 text-forest-800">
              <CheckCircle className="w-3.5 h-3.5 text-forest-700" />
              <span>💌 Surat Terima Kasih Penuh Kasih</span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-stone-900 leading-snug mb-2">
              Surat Hangat dari {mission.title}
            </h3>
            {/* Teks Pesan Laporan Tokoh Cerita */}
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans italic bg-white/90 p-4 rounded-2xl border-2 border-amber-200 shadow-xs">
              {mission.story.reportText}
            </p>
            <p className="text-xs text-forest-800 font-extrabold mt-2 not-italic flex items-center gap-1">
              <span>— Dengan penuh syukur,</span>
              <span>{mission.story.reportFrom} ❤️</span>
            </p>
          </div>
        </div>

        {/* Rincian Koin Kebaikan & Alokasi */}
        <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border-2 border-stone-200 mb-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-200">
            <span className="text-xs sm:text-sm font-black text-stone-800 flex items-center gap-1.5">
              <span>🪙</span>
              <span>Catatan Koin Kebaikan Pilihanmu:</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-forest-800 bg-forest-100 px-3 py-1 rounded-full border border-forest-300">
                Koin Dipakai: {playerTotalCoins} 🪙
              </span>
              {remainingCoins > 0 && (
                <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  Sisa di Kantong: {remainingCoins} 🎒
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {normalizedOptions.map((opt) => {
              const allocated = playerAllocations[opt.id] || 0;
              const target = opt.targetCoins || 30;
              const pct = target > 0 ? Math.round((allocated / target) * 100) : 0;
              const SvgIcon = AID_ILLUSTRATIONS[opt.id];
              const isFunded = allocated >= (opt.minCost || 10);
              const isTargetMet = allocated >= target;

              return (
                <div
                  key={opt.id}
                  className="flex items-center gap-3 text-stone-700 bg-white hover:bg-amber-50/50 p-3.5 rounded-2xl border-2 border-stone-200 transition-colors shadow-xs"
                >
                  <div className="w-12 h-12 rounded-2xl bg-warm-50 border-2 border-amber-200 flex items-center justify-center shrink-0 p-1 text-2xl shadow-xs">
                    {SvgIcon ? <SvgIcon className="w-8 h-8" /> : <span>{opt.emoji || '📦'}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-extrabold text-xs sm:text-sm truncate text-stone-900">
                          {opt.title || opt.label}
                        </span>
                        {opt.isEssential ? (
                          <span className="text-[10px] font-black uppercase tracking-wide bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300 shrink-0">
                            ⭐ Kebutuhan Utama
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200 shrink-0">
                            🎨 Pelengkap Ceria
                          </span>
                        )}
                      </div>
                      <span className="font-display font-black text-forest-800 text-xs sm:text-sm shrink-0">
                        {allocated} Koin Virtual
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-600 mb-1 font-semibold">
                      <span>Perlu: {target} Koin</span>
                      <span
                        className={
                          isTargetMet
                            ? 'text-forest-700 font-black'
                            : isFunded
                            ? 'text-amber-700 font-bold'
                            : 'text-stone-400 font-medium'
                        }
                      >
                        {isTargetMet
                          ? '🎉 Terpenuhi Sempurna!'
                          : isFunded
                          ? `✅ Sudah Cukup Membantu (${pct}%)`
                          : `💧 Terbantu Sebagian (${pct}%)`}
                      </span>
                    </div>
                    <div className="h-2.5 bg-stone-200 rounded-full overflow-hidden p-0.5 border border-stone-300">
                      <motion.div
                        className={`h-full rounded-full ${
                          isTargetMet ? 'bg-forest-500' : isFunded ? 'bg-amber-400' : 'bg-stone-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </div>
                  </div>
                  {isFunded ? (
                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-stone-300 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pemberitahuan Ramah Anak Usia 8-10 Tahun */}
        <div className="p-3.5 bg-amber-100/90 rounded-2xl border-2 border-amber-300 text-xs text-amber-950 font-medium flex items-center gap-2.5">
          <span className="text-xl shrink-0">💡</span>
          <span>
            <strong>Pesan Sahabat SADAQIDS:</strong> Hebat! Pilihan koinmu mengutamakan yang paling penting dulu. Itu artinya kamu sudah belajar menjadi anak yang bijak dan amanah!
          </span>
        </div>

        {/* Stempel mobile */}
        <div className="block sm:hidden mt-4 text-center">
          <SimulationStamp variant="compact" isReducedMotion={isReducedMotion} />
        </div>
      </motion.div>

      {/* ====== REAKSI POHON KEBAIKAN & LENCANA TERBUKA ====== */}
      <motion.div
        className="bg-gradient-to-r from-emerald-100/90 via-forest-50/90 to-amber-100/90 rounded-3xl p-5 sm:p-6 border-3 border-emerald-300 mb-8 flex flex-col sm:flex-row items-center gap-5 text-left shadow-[0_8px_24px_rgba(16,185,129,0.12),0_4px_0_0_#6ee7b7]"
        initial={isReducedMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        {/* Maskot Pohon Kebaikan Merayakan Keberhasilan */}
        <div className="shrink-0 relative flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/90 border-2 border-emerald-300 flex items-center justify-center shadow-md">
            <MascotPohon
              stage={mission.id <= 2 ? 2 : 3}
              size={85}
              isCelebration={true}
              isReducedMotion={isReducedMotion}
            />
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-400 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-500 shadow-xs">
            {mission.badgeEmoji || '🏅'} Lencana Baru!
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200/90 text-forest-900 text-xs font-black mb-1.5 border border-emerald-400">
            <Award className="w-3.5 h-3.5 text-forest-800" />
            <span>🏆 Hadiah Lencana Baru Terbuka!</span>
          </div>
          <h4 className="font-display font-black text-lg sm:text-xl text-forest-900">
            {mission.badgeTitle}
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed mt-1">
            "{mission.badgeDescription || mission.summaryLesson}"
          </p>
          <span className="text-[11px] font-bold text-forest-700 block mt-1.5">
            Pohon Kebaikanmu bertumbuh semakin lebat dan bahagia! 🌳✨
          </span>
        </div>
      </motion.div>

      {/* ====== TOMBOL 3D LANJUT KE REFLEKSI KEBAIKAN ====== */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            if (onPlaySound) onPlaySound('tap');
            onProceedToReflection();
          }}
          className="w-full sm:w-auto px-10 py-5 bg-forest-700 hover:bg-forest-600 text-white font-display font-black text-lg sm:text-xl rounded-2xl border-2 border-forest-600 flex items-center justify-center gap-3 mx-auto transition-all cursor-pointer shadow-[0_6px_0_0_#064E3B,0_12px_28px_rgba(4,120,87,0.3)] active:translate-y-1 active:shadow-[0_2px_0_0_#064E3B] active:scale-99"
        >
          <span>Lanjut ke Ruang Refleksi! 🌳✨</span>
          <ArrowRight className="w-6 h-6 text-emerald-200 animate-pulse stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
