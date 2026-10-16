import React from 'react';

// Koleksi Ilustrasi Vektor SVG Kustom Bertema Whimsical Storybook Adventure
// Didesain khusus untuk anak usia 8-10 tahun tanpa emoji sistem generik

export function IconKoinKebaikan({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="30" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
      <circle cx="32" cy="32" r="23" fill="#FDE68A" stroke="#D97706" strokeWidth="3" strokeDasharray="3 3" />
      {/* Daun Tunas Kebaikan di dalam Koin */}
      <path
        d="M32 44C32 35 24 28 24 22C31 22 36 27 36 34"
        fill="#10B981"
        stroke="#047857"
        strokeWidth="2.5"
      />
      <path
        d="M32 44C32 36 39 30 40 24C34 23 29 28 30 36"
        fill="#34D399"
        stroke="#047857"
        strokeWidth="2.5"
      />
      <path d="M32 44V22" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pendaran Kilau Koin */}
      <circle cx="23" cy="21" r="3" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

// LEVEL 1: DUSUN PELANGI
export function IconBukuDanPena({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="#E8DCBF" />
      <path
        d="M50 72C40 70 24 71 16 75C16 45 22 40 50 43V72Z"
        fill="#60A5FA"
        stroke="#1D4ED8"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M50 72C60 70 76 71 84 75C84 45 78 40 50 43V72Z"
        fill="#93C5FD"
        stroke="#1D4ED8"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M47 47C35 45 26 47 22 49" stroke="#DBEAFE" strokeWidth="2" strokeLinecap="round" />
      <path d="M47 54C35 52 26 54 22 56" stroke="#DBEAFE" strokeWidth="2" strokeLinecap="round" />
      <path d="M47 61C35 59 26 61 22 63" stroke="#DBEAFE" strokeWidth="2" strokeLinecap="round" />
      <path d="M53 47C65 45 74 47 78 49" stroke="#DBEAFE" strokeWidth="2" strokeLinecap="round" />
      <path d="M53 54C65 52 74 54 78 56" stroke="#DBEAFE" strokeWidth="2" strokeLinecap="round" />
      <path d="M53 61C65 59 74 61 78 63" stroke="#DBEAFE" strokeWidth="2" strokeLinecap="round" />
      <g transform="rotate(25 50 50)">
        <rect x="52" y="22" width="10" height="42" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
        <path d="M52 22L57 12L62 22H52Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="55,16 57,12 59,16" fill="#B45309" />
        <rect x="52" y="58" width="10" height="6" fill="#F472B6" stroke="#B45309" strokeWidth="2" />
      </g>
      <path d="M22 28L24 23L29 22L24 20L22 15L20 20L15 22L20 23L22 28Z" fill="#FBBF24" />
    </svg>
  );
}

export function IconSeragamDanSepatu({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="#E8DCBF" />
      <path
        d="M32 28L42 34L50 30L58 34L68 28L72 44L63 46L63 70H37L37 46L28 44L32 28Z"
        fill="#FFFFFF"
        stroke="#475569"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M42 34L50 44L58 34L50 30L42 34Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <circle cx="50" cy="50" r="2" fill="#94A3B8" />
      <circle cx="50" cy="58" r="2" fill="#94A3B8" />
      <circle cx="50" cy="66" r="2" fill="#94A3B8" />
      <path
        d="M24 74C24 70 30 68 36 71L40 76C44 78 44 83 38 83H26C23 83 24 78 24 74Z"
        fill="#047857"
        stroke="#064E3B"
        strokeWidth="2.5"
      />
      <path
        d="M62 76L66 71C72 68 78 70 78 74C78 78 79 83 76 83H64C58 83 58 78 62 76Z"
        fill="#047857"
        stroke="#064E3B"
        strokeWidth="2.5"
      />
      <path d="M33 72L36 75" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 72L71 75" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconHiasanKelas({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="#E8DCBF" />
      <path d="M15 28Q50 44 85 28" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <polygon points="26,32 38,34 32,50" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
      <polygon points="44,35 56,35 50,53" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <polygon points="62,34 74,32 68,50" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <rect x="36" y="56" width="28" height="24" rx="4" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" />
      <ellipse cx="50" cy="56" rx="14" ry="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <ellipse cx="50" cy="56" rx="10" ry="2.5" fill="#EC4899" />
      <path d="M42 58C42 63 45 66 45 66C45 66 48 63 48 58" fill="#EC4899" />
    </svg>
  );
}

// LEVEL 2: KAMPUNG SEHAT
export function IconPanganSehat({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="#E8DCBF" />
      <path
        d="M28 50C28 40 38 34 50 34C62 34 72 40 72 50L70 82C70 85 64 87 50 87C36 87 30 85 30 82L28 50Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="50" cy="48" rx="20" ry="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <path d="M46 62Q50 56 54 62Q50 68 46 62Z" fill="#10B981" />
      <path d="M46 72Q50 66 54 72Q50 78 46 72Z" fill="#10B981" />
      <rect x="62" y="52" width="16" height="28" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <rect x="65" y="47" width="10" height="5" rx="2" fill="#0284C7" />
    </svg>
  );
}

export function IconSanitasiAir({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="#E8DCBF" />
      <rect x="25" y="42" width="30" height="40" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
      <rect x="30" y="34" width="12" height="8" rx="2" fill="#0284C7" />
      <path d="M46 44V34H52V44" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
      <rect x="60" y="52" width="22" height="30" rx="5" fill="#34D399" stroke="#059669" strokeWidth="2.5" />
      <path d="M71 52V42M66 42H76" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="78" cy="38" r="4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
      <circle cx="85" cy="46" r="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
    </svg>
  );
}

// LEVEL 3: PESISIR HARAPAN
export function IconBakauPesisir({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="#E8DCBF" />
      <path d="M15 82Q30 78 45 82Q60 86 75 82Q90 78 95 82" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 62L34 84M50 62L66 84M50 62L44 85M50 62L56 85" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M50 62V35" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="28" r="16" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
      <circle cx="42" cy="34" r="10" fill="#34D399" />
      <circle cx="58" cy="34" r="10" fill="#34D399" />
    </svg>
  );
}

export function IconPagarBambu({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="#E8DCBF" />
      <rect x="22" y="38" width="8" height="46" rx="2" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
      <rect x="36" y="35" width="8" height="49" rx="2" fill="#FCD34D" stroke="#B45309" strokeWidth="2" />
      <rect x="50" y="38" width="8" height="46" rx="2" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
      <rect x="64" y="35" width="8" height="49" rx="2" fill="#FCD34D" stroke="#B45309" strokeWidth="2" />
      <rect x="18" y="48" width="60" height="6" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
      <rect x="18" y="66" width="60" height="6" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
    </svg>
  );
}

// LEVEL 4: DESA BANGKIT
export function IconSumurDesa({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="86" rx="38" ry="8" fill="#E8DCBF" />
      {/* Dasar sumur batu */}
      <rect x="26" y="55" width="48" height="28" rx="5" fill="#94A3B8" stroke="#475569" strokeWidth="3" />
      <path d="M26 64H74M26 73H74" stroke="#64748B" strokeWidth="2" />
      {/* Air sumur biru jernih */}
      <ellipse cx="50" cy="55" rx="22" ry="7" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
      {/* Tiang & Atap Sumur */}
      <path d="M32 55V32M68 55V32" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M22 34L50 16L78 34H22Z" fill="#D97706" stroke="#92400E" strokeWidth="3" strokeLinejoin="round" />
      {/* Kerekan & Ember Air */}
      <path d="M50 25V42" stroke="#78350F" strokeWidth="2" />
      <rect x="44" y="42" width="12" height="12" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <circle cx="58" cy="46" r="3" fill="#BAE6FD" />
    </svg>
  );
}

export function IconObatDarurat({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="#E8DCBF" />
      {/* Kotak P3K Medis */}
      <rect x="22" y="38" width="56" height="42" rx="7" fill="#FFFFFF" stroke="#EF4444" strokeWidth="3.5" />
      <path d="M40 38V30C40 28 42 26 44 26H56C58 26 60 28 60 30V38" stroke="#EF4444" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Lambang Palang Merah Peduli */}
      <rect x="44" y="47" width="12" height="24" rx="2" fill="#EF4444" />
      <rect x="38" y="53" width="24" height="12" rx="2" fill="#EF4444" />
      {/* Botol Vitamin Sehat */}
      <rect x="68" y="52" width="16" height="28" rx="4" fill="#34D399" stroke="#059669" strokeWidth="2" />
      <rect x="71" y="48" width="10" height="4" rx="1.5" fill="#059669" />
    </svg>
  );
}

export function IconAlatTani({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="#E8DCBF" />
      {/* Cangkul Tani */}
      <path d="M30 78L68 24" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M68 24L78 20L84 32L72 34Z" fill="#64748B" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Kantong Benih Subur */}
      <path d="M22 62C22 55 30 52 40 52C50 52 56 55 56 62L54 82H24L22 62Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2.5" />
      <ellipse cx="38" cy="60" rx="14" ry="3.5" fill="#F59E0B" />
      {/* Tunas Hijau Harapan */}
      <path d="M38 48C38 42 42 38 46 38C46 44 42 48 38 48Z" fill="#10B981" />
    </svg>
  );
}

export function IconBalaiWarga({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="86" rx="38" ry="8" fill="#E8DCBF" />
      {/* Lantai & Tiang Balai */}
      <rect x="20" y="74" width="60" height="8" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="2" />
      <path d="M28 74V48M42 74V48M58 74V48M72 74V48" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      {/* Atap Joglo Balai Pertemuan */}
      <path d="M14 50L50 22L86 50H14Z" fill="#B45309" stroke="#78350F" strokeWidth="3" strokeLinejoin="round" />
      <path d="M32 36L50 20L68 36" stroke="#FDE68A" strokeWidth="2" fill="none" />
      {/* Bendera Gotong Royong */}
      <path d="M50 20V12M50 12L58 15L50 18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// LEVEL 5: TAMAN AMANAH
export function IconPerpustakaanMini({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="86" rx="38" ry="8" fill="#E8DCBF" />
      {/* Lemari Buku Kayu Ramah */}
      <rect x="24" y="24" width="52" height="60" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="3" />
      {/* Rak Atas */}
      <rect x="28" y="42" width="44" height="4" fill="#78350F" />
      {/* Rak Bawah */}
      <rect x="28" y="62" width="44" height="4" fill="#78350F" />
      {/* Buku-buku di Rak 1 */}
      <rect x="30" y="28" width="7" height="14" rx="1" fill="#EF4444" />
      <rect x="38" y="26" width="8" height="16" rx="1" fill="#3B82F6" />
      <rect x="47" y="29" width="7" height="13" rx="1" fill="#10B981" />
      <rect x="55" y="27" width="8" height="15" rx="1" fill="#F59E0B" />
      {/* Buku-buku di Rak 2 */}
      <rect x="32" y="48" width="9" height="14" rx="1" fill="#8B5CF6" />
      <rect x="42" y="46" width="7" height="16" rx="1" fill="#EC4899" />
      <rect x="50" y="48" width="10" height="14" rx="1" fill="#06B6D4" />
    </svg>
  );
}

export function IconTamanBermain({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="86" rx="38" ry="8" fill="#E8DCBF" />
      {/* Tiang Ayunan Ceria */}
      <path d="M22 84L36 32L50 84" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M36 32H76" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
      <path d="M62 84L76 32L90 84" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
      {/* Tali & Dudukan Ayunan */}
      <path d="M50 32V64M62 32V64" stroke="#64748B" strokeWidth="2" />
      <rect x="46" y="64" width="20" height="5" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      {/* Bunga & Rumput di Bawah */}
      <circle cx="28" cy="80" r="4" fill="#F43F5E" />
      <circle cx="82" cy="80" r="4" fill="#FBBF24" />
    </svg>
  );
}

export function IconLampuTaman({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="86" rx="36" ry="7" fill="#E8DCBF" />
      {/* Tiang Lampu Besi Klasik */}
      <path d="M50 84V28" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <rect x="44" y="80" width="12" height="6" rx="1" fill="#1E293B" />
      {/* Lentera Lampu Surya Bercahaya */}
      <polygon points="40,28 60,28 56,44 44,44" fill="#FEF08A" stroke="#334155" strokeWidth="2.5" />
      <polygon points="36,28 64,28 50,18" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      {/* Pendaran Cahaya Lentera */}
      <circle cx="50" cy="36" r="14" fill="#FDE047" opacity="0.35" />
      <circle cx="50" cy="36" r="6" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

// LEVEL 6: NEGERI KEBAIKAN
export function IconGedungSekolah({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="86" rx="40" ry="8" fill="#E8DCBF" />
      {/* Bangunan Utama Sekolah */}
      <rect x="22" y="44" width="56" height="40" rx="4" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
      {/* Atap Sekolah Segitiga Megah */}
      <polygon points="16,44 50,20 84,44" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
      {/* Menara Lonceng di Puncak */}
      <rect x="44" y="14" width="12" height="12" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <circle cx="50" cy="20" r="3" fill="#FDE68A" />
      {/* Pintu & Jendela-jendela Belajar */}
      <rect x="44" y="62" width="12" height="22" rx="3" fill="#78350F" />
      <rect x="28" y="52" width="10" height="12" rx="2" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <rect x="62" y="52" width="10" height="12" rx="2" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <circle cx="50" cy="34" r="5" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    </svg>
  );
}

export function IconKlinikSehat({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="86" rx="40" ry="8" fill="#E8DCBF" />
      {/* Gedung Klinik Bersih */}
      <rect x="24" y="42" width="52" height="42" rx="5" fill="#F0FDFA" stroke="#0D9488" strokeWidth="3" />
      <path d="M18,44 L50,24 L82,44 Z" fill="#0D9488" stroke="#115E59" strokeWidth="3" />
      {/* Lambang Bulan Sabit / Palang Kebaikan Medis */}
      <circle cx="50" cy="56" r="10" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
      <rect x="48" y="49" width="4" height="14" rx="1" fill="#EF4444" />
      <rect x="43" y="54" width="14" height="4" rx="1" fill="#EF4444" />
      {/* Pintu Kaca Masuk */}
      <rect x="42" y="68" width="16" height="16" rx="2" fill="#99F6E4" stroke="#0D9488" strokeWidth="2" />
    </svg>
  );
}

export function IconMasjidWarga({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="86" rx="40" ry="8" fill="#E8DCBF" />
      {/* Bangunan Utama */}
      <rect x="28" y="46" width="44" height="38" rx="4" fill="#FEFCE8" stroke="#CA8A04" strokeWidth="3" />
      {/* Kubah Emas Megah */}
      <path d="M30 46C30 30 50 18 50 18C50 18 70 30 70 46H30Z" fill="#FACC15" stroke="#A16207" strokeWidth="3" />
      {/* Bulan Bintang di Puncak Kubah */}
      <circle cx="50" cy="12" r="3.5" fill="#EAB308" />
      <path d="M50 15V18" stroke="#A16207" strokeWidth="2" />
      {/* Menara Samping */}
      <rect x="18" y="32" width="8" height="52" rx="2" fill="#FEFCE8" stroke="#CA8A04" strokeWidth="2" />
      <path d="M16 32L22 24L28 32H16Z" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
      <rect x="74" y="32" width="8" height="52" rx="2" fill="#FEFCE8" stroke="#CA8A04" strokeWidth="2" />
      <path d="M72 32L78 24L84 32H72Z" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
      {/* Pintu Lengkung Khas */}
      <path d="M42 84V64C42 58 58 58 58 64V84H42Z" fill="#047857" stroke="#064E3B" strokeWidth="2" />
    </svg>
  );
}

export function IconTamanKota({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="86" rx="40" ry="8" fill="#E8DCBF" />
      {/* Pohon Rindang Taman Kota */}
      <path d="M46 84V60C46 54 44 48 50 48C56 48 54 54 54 60V84" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="50" cy="38" r="22" fill="#10B981" stroke="#047857" strokeWidth="3" />
      <circle cx="38" cy="44" r="14" fill="#34D399" />
      <circle cx="62" cy="44" r="14" fill="#34D399" />
      {/* Bangku Taman Kayu */}
      <rect x="22" y="72" width="24" height="4" rx="1" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
      <path d="M24 76V82M44 76V82" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      {/* Kolam Air Mancur Mini */}
      <ellipse cx="72" cy="78" rx="14" ry="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
    </svg>
  );
}

export function IconSuratAmanahPakRT({ className = "w-24 h-24" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="25" y="20" width="70" height="80" rx="8" fill="#FFFBEB" stroke="#D97706" strokeWidth="3" />
      <path d="M25 35H95" stroke="#10B981" strokeWidth="4" />
      <rect x="35" y="46" width="50" height="4" rx="2" fill="#FDE68A" />
      <rect x="35" y="55" width="45" height="4" rx="2" fill="#FDE68A" />
      <rect x="35" y="64" width="38" height="4" rx="2" fill="#FDE68A" />
      <circle cx="68" cy="80" r="15" fill="#DCFCE7" stroke="#059669" strokeWidth="2.5" strokeDasharray="3 2" />
      <path d="M62 80L66 84L74 76" stroke="#047857" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="68" y="93" fontSize="5" fontWeight="bold" fill="#065F46" textAnchor="middle">AMANAH</text>
    </svg>
  );
}

// =========================================================================
// BIOME LANDMARK ICONS UNTUK PETA PETUALANGAN (ADVENTURE WORLD MAP)
// Setiap dusun memiliki visual landmark istimewa yang mencerminkan konsepnya
// =========================================================================

export function BiomeLandmarkDusunPelangi({ size = 72, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bukit Rumput Dusun */}
      <circle cx="50" cy="50" r="46" fill="#EDE9FE" />
      <ellipse cx="50" cy="74" rx="40" ry="18" fill="#8B5CF6" />
      {/* Lengkung Pelangi */}
      <path d="M20 62C20 34 80 34 80 62" stroke="#F43F5E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M24 62C24 38 76 38 76 62" stroke="#FBBF24" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M28 62C28 42 72 42 72 62" stroke="#10B981" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M32 62C32 46 68 46 68 62" stroke="#3B82F6" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Rumah Sekolah Dusun */}
      <rect x="40" y="56" width="20" height="18" rx="2" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="2" />
      <polygon points="36,56 50,44 64,56" fill="#F43F5E" stroke="#9F1239" strokeWidth="2" />
      <rect x="46" y="64" width="8" height="10" rx="1" fill="#78350F" />
      {/* Buku Sedekah Mengambang */}
      <circle cx="70" cy="32" r="10" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
      <path d="M66 32H74M70 28V36" stroke="#92400E" strokeWidth="1.5" />
    </svg>
  );
}

export function BiomeLandmarkKampungSehat({ size = 72, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="46" fill="#E0F2FE" />
      <ellipse cx="50" cy="74" rx="40" ry="18" fill="#0284C7" />
      {/* Tenda Posko Sehat */}
      <polygon points="50,26 24,68 76,68" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
      <polygon points="50,26 42,68 58,68" fill="#BAE6FD" />
      {/* Palang Infak Kesehatan */}
      <circle cx="50" cy="46" r="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
      <rect x="48.5" y="41" width="3" height="10" rx="1" fill="#EF4444" />
      <rect x="45" y="44.5" width="10" height="3" rx="1" fill="#EF4444" />
      {/* Jerigen Air Bersih & Sayuran */}
      <rect x="64" y="60" width="12" height="14" rx="2" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
    </svg>
  );
}

export function BiomeLandmarkPesisirHarapan({ size = 72, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="46" fill="#CCFBF1" />
      <ellipse cx="50" cy="74" rx="40" ry="18" fill="#0D9488" />
      {/* Ombak Biru */}
      <path d="M12 70Q32 64 50 70Q68 76 88 70" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Mercusuar Wakaf Produktif */}
      <polygon points="46,26 54,26 58,66 42,66" fill="#FFFFFF" stroke="#115E59" strokeWidth="2" />
      <path d="M44 40H56M43 52H57" stroke="#EF4444" strokeWidth="3" />
      {/* Lampu Mercusuar */}
      <polygon points="44,26 56,26 50,18" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      {/* Bakau Pelindung Pantai */}
      <circle cx="32" cy="58" r="9" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
      <circle cx="68" cy="62" r="7" fill="#34D399" stroke="#047857" strokeWidth="1.5" />
    </svg>
  );
}

export function BiomeLandmarkDesaBangkit({ size = 72, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
      <ellipse cx="50" cy="74" rx="40" ry="18" fill="#D97706" />
      {/* Pegunungan di Latar Belakang */}
      <polygon points="20,68 40,36 60,68" fill="#78350F" opacity="0.6" />
      <polygon points="45,68 65,30 85,68" fill="#92400E" opacity="0.7" />
      {/* Sumur Kehidupan Desa Bangkit */}
      <rect x="36" y="54" width="28" height="18" rx="3" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
      <path d="M34 54L50 40L66 54" stroke="#78350F" strokeWidth="2.5" fill="none" />
      <ellipse cx="50" cy="54" rx="10" ry="3" fill="#38BDF8" />
      {/* Timbangan Prioritas Mengambang */}
      <circle cx="50" cy="22" r="11" fill="#FBBF24" stroke="#92400E" strokeWidth="1.5" />
      <path d="M44 24H56M50 16V28" stroke="#78350F" strokeWidth="1.5" />
    </svg>
  );
}

export function BiomeLandmarkTamanAmanah({ size = 72, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="46" fill="#FFE4E6" />
      <ellipse cx="50" cy="74" rx="40" ry="18" fill="#E11D48" />
      {/* Paviliun Gazebo Transparan */}
      <path d="M30 68V48M50 68V48M70 68V48" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="24,48 50,28 76,48" fill="#FB7185" stroke="#9F1239" strokeWidth="2" />
      <rect x="34" y="56" width="32" height="12" rx="2" fill="#FFFFFF" opacity="0.9" stroke="#E11D48" strokeWidth="1.5" />
      {/* Kaca Pembesar Transparansi Amanah */}
      <circle cx="50" cy="24" r="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
      <path d="M57 31L65 39" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
      {/* Bunga & Pohon Hias */}
      <circle cx="26" cy="66" r="6" fill="#F43F5E" />
      <circle cx="74" cy="66" r="6" fill="#F43F5E" />
    </svg>
  );
}

export function BiomeLandmarkNegeriKebaikan({ size = 72, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="46" fill="#D1FAE5" />
      <ellipse cx="50" cy="74" rx="40" ry="18" fill="#059669" />
      {/* Istana Cahaya Negeri Kebaikan */}
      <rect x="32" y="44" width="36" height="28" rx="3" fill="#FDF6B2" stroke="#854D0E" strokeWidth="2" />
      {/* Kubah Emas Utama */}
      <path d="M34 44C34 30 50 20 50 20C50 20 66 30 66 44H34Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      {/* Mahkota Emas Kejayaan Kebaikan */}
      <circle cx="50" cy="14" r="6" fill="#FBBF24" stroke="#92400E" strokeWidth="1.5" />
      {/* Menara Berbendera */}
      <rect x="22" y="34" width="8" height="38" rx="2" fill="#FFFFFF" stroke="#047857" strokeWidth="1.5" />
      <polygon points="22,34 26,26 30,34" fill="#10B981" />
      <rect x="70" y="34" width="8" height="38" rx="2" fill="#FFFFFF" stroke="#047857" strokeWidth="1.5" />
      <polygon points="70,34 74,26 78,34" fill="#10B981" />
      {/* Bintang-Bintang Kejayaan */}
      <path d="M50 48L51.5 52L56 52.5L52.5 55L53.5 59L50 56.5L46.5 59L47.5 55L44 52.5L48.5 52Z" fill="#F59E0B" />
    </svg>
  );
}
