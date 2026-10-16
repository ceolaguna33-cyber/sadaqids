// ============================================================================
// SADAQIDS — Data Model 3 Dunia (20 Level Total)
// Dunia 1: Gerbang Kebaikan (6 level) — dari missions.js
// Dunia 2: Perancang Kebaikan (7 level)
// Dunia 3: Penjaga Amanah (7 level)
import { MISSIONS_DATA } from './missions.js';

export const WORLDS_CONFIG = [
  {
    worldId: 1,
    worldKey: 'gerbang',
    title: 'Gerbang Kebaikan',
    subtitle: 'Mengenal Pilar Berbagi',
    description: 'Temukan makna sedekah, infak, wakaf, dan zakat melalui petualangan di enam dusun penuh cerita.',
    emoji: '🌱',
    themeColor: '#16A34A',
    gradientFrom: '#15803D',
    gradientTo: '#86EFAC',
    bgColor: '#F0FDF4',
    levelIds: [1, 2, 3, 4, 5, 6],
    unlockCondition: null,
    completionCondition: 'all_levels',
    worldBadge: 'world_1_complete',
    mapTheme: 'forest_village',
  },
  {
    worldId: 2,
    worldKey: 'perancang',
    title: 'Perancang Kebaikan',
    subtitle: 'Merancang Dampak Nyata',
    description: 'Gunakan pengetahuanmu untuk merancang program bantuan, mengelola anggaran, dan bekerja sama.',
    emoji: '🔨',
    themeColor: '#D97706',
    gradientFrom: '#B45309',
    gradientTo: '#FDE68A',
    bgColor: '#FFFBEB',
    levelIds: [7, 8, 9, 10, 11, 12, 13],
    unlockCondition: { worldId: 1, minLevelsCompleted: 6 },
    completionCondition: 'all_levels',
    worldBadge: 'world_2_complete',
    mapTheme: 'town_workshop',
  },
  {
    worldId: 3,
    worldKey: 'penjaga',
    title: 'Penjaga Amanah',
    subtitle: 'Menjaga & Mempertanggungjawabkan',
    description: 'Jadilah penjaga amanah yang teliti: catat, periksa, evaluasi, dan pertahankan kepercayaan.',
    emoji: '🛡️',
    themeColor: '#7C3AED',
    gradientFrom: '#6D28D9',
    gradientTo: '#C4B5FD',
    bgColor: '#F5F3FF',
    levelIds: [14, 15, 16, 17, 18, 19, 20],
    unlockCondition: { worldId: 2, minLevelsCompleted: 7 },
    completionCondition: 'all_levels',
    worldBadge: 'world_3_complete',
    mapTheme: 'citadel_archive',
  },
];

export const WORLD2_LEVELS = [
  {
    id: 7, worldId: 2, globalLevelIndex: 1,
    title: 'Pasar Kebutuhan',
    theme: 'Mengenali Kebutuhan',
    conceptType: 'Kebutuhan vs Keinginan', conceptEmoji: '🛒',
    pillarColor: 'amber', gradientFrom: '#D97706', gradientTo: '#FDE68A', bgLight: '#FFFBEB',
    tagline: 'Bedakan yang Perlu dan yang Sekadar Mau',
    badgeId: 'badge_pembeda_bijak', badgeTitle: 'Lencana Pembeda Bijak', badgeEmoji: '🛒',
    badgeDescription: 'Kamu mampu membedakan kebutuhan nyata dari sekadar keinginan!',
    summaryLesson: 'Seorang perancang bantuan yang baik harus memahami kebutuhan nyata masyarakat, bukan hanya keinginan sesaat.',
    nextLevelHint: 'Balai Desa Harapan menunggu keputusanmu!',
    mechanic: 'drag_sort',
    learningObjective: 'Anak dapat membedakan kebutuhan pokok dan keinginan tambahan dalam konteks bantuan.',
    story: {
      location: 'Pasar Desa Sejahtera',
      narrative: 'Regu bantuan tiba di pasar desa. Daftar belanja sudah panjang, tapi anggaran terbatas. Mana yang benar-benar dibutuhkan warga, dan mana yang hanya keinginan?',
      urgencyNote: 'Anggaran bantuan hanya cukup untuk kebutuhan pokok.',
      reportText: '"Berkat pilihan yang bijak, seluruh kebutuhan pokok warga terpenuhi tanpa kekurangan."',
      reportFrom: 'Kak Relawan Dana',
    },
    introScenes: [
      { id: 's7_1', title: 'Regu Bantuan Tiba di Pasar', speaker: 'Narator', narrativeText: 'Pagi yang cerah di pasar desa! Regu bantuan baru saja tiba, membawa sebuah daftar panjang berisi barang-barang yang diminta warga. Tapi eh, anggaran yang tersedia sangat terbatas! Siapa yang bisa membantu memilih dengan bijak?', subtitles: 'Pagi yang cerah di pasar desa! Regu bantuan baru saja tiba, membawa sebuah daftar panjang berisi barang-barang yang diminta warga. Tapi eh, anggaran yang tersedia sangat terbatas! Siapa yang bisa membantu memilih dengan bijak?', visualTheme: 'market_morning', audioSrc: '/audio/narration/level-7/scene-01.mp3' },
      { id: 's7_2', title: 'Daftar Terlalu Panjang!', speaker: 'Kak Relawan Dana', narrativeText: 'Hei, Petualang Kebaikan! Ada 15 barang di daftar ini, tapi anggaran kita hanya cukup untuk memilih 8 saja! Kita harus memilih dengan sangat bijak! Mana yang benar-benar dibutuhkan? Mana yang bisa ditunggu dulu?', subtitles: 'Hei, Petualang Kebaikan! Ada 15 barang di daftar ini, tapi anggaran kita hanya cukup untuk memilih 8 saja! Kita harus memilih dengan sangat bijak! Mana yang benar-benar dibutuhkan? Mana yang bisa ditunggu dulu?', visualTheme: 'long_list', audioSrc: '/audio/narration/level-7/scene-02.mp3' },
      { id: 's7_3', title: 'Kebutuhan vs Keinginan', speaker: 'Pohon Kebaikan', narrativeText: 'Hai, teman cilik! Tahukah kamu bedanya kebutuhan dan keinginan? Kebutuhan adalah sesuatu yang harus ada agar orang bisa hidup dengan sehat dan layak. Seperti makanan, obat-obatan, dan air bersih. Sedangkan keinginan adalah sesuatu yang menyenangkan tapi bisa ditunda dulu. Nah, sekarang dapatkah kamu memilih mana yang paling penting?', subtitles: 'Hai, teman cilik! Tahukah kamu bedanya kebutuhan dan keinginan? Kebutuhan adalah sesuatu yang harus ada agar orang bisa hidup dengan sehat dan layak. Seperti makanan, obat-obatan, dan air bersih. Sedangkan keinginan adalah sesuatu yang menyenangkan tapi bisa ditunda dulu. Nah, sekarang dapatkah kamu memilih mana yang paling penting?', visualTheme: 'needs_vs_wants', audioSrc: '/audio/narration/level-7/scene-03.mp3' },
    ],
    gameConfig: {
      type: 'drag_sort',
      instruction: 'Seret setiap item ke keranjang yang tepat: "Kebutuhan" atau "Keinginan"',
      items: [
        { id: 'i1', label: 'Beras & Lauk', emoji: '🍚', category: 'need', reason: 'Makanan pokok untuk bertahan hidup.' },
        { id: 'i2', label: 'Obat-obatan', emoji: '💊', category: 'need', reason: 'Kesehatan adalah kebutuhan utama.' },
        { id: 'i3', label: 'Selimut Tidur', emoji: '🛏️', category: 'need', reason: 'Melindungi tubuh dari dingin.' },
        { id: 'i4', label: 'Air Bersih', emoji: '💧', category: 'need', reason: 'Tanpa air bersih, warga mudah sakit.' },
        { id: 'i5', label: 'Mainan Mewah', emoji: '🎮', category: 'want', reason: 'Menyenangkan, tapi bisa ditunda.' },
        { id: 'i6', label: 'Kue Premium', emoji: '🎂', category: 'want', reason: 'Enak, tapi bukan kebutuhan darurat.' },
        { id: 'i7', label: 'TV Baru', emoji: '📺', category: 'want', reason: 'Hiburan bisa ditunda saat darurat.' },
        { id: 'i8', label: 'Sabun Mandi', emoji: '🧼', category: 'need', reason: 'Kebersihan mencegah penyakit.' },
      ],
      passingScore: 7,
    },
    virtualCurrency: { initialCoins: 80, coinLabel: 'Koin Anggaran' },
    collectiveSimulation: { targetTotalCoins: 80, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'opt_beras', title: 'Beras & Bahan Makanan Pokok', emoji: '🍚', category: 'Kebutuhan Pokok', isPriority: true, isEssential: true, targetCoins: 30, minCost: 20, cost: 0, description: 'Pangan pokok bertahan hidup untuk 15 keluarga warga.' },
      { id: 'opt_obat', title: 'Kotak Obat & P3K Posko Darurat', emoji: '💊', category: 'Kebutuhan Pokok', isPriority: true, isEssential: true, targetCoins: 25, minCost: 15, cost: 0, description: 'Pertolongan pertama demam, luka, dan diare anak-anak.' },
      { id: 'opt_air', title: 'Galon Air Bersih Higienis', emoji: '💧', category: 'Kebutuhan Pokok', isPriority: true, isEssential: true, targetCoins: 25, minCost: 15, cost: 0, description: 'Air minum bersih mencegah penularan wabah penyakit.' },
      { id: 'opt_snack', title: 'Kue Manis & Camilan Hiburan', emoji: '🎂', category: 'Keinginan Tambahan', isPriority: false, isEssential: false, targetCoins: 15, minCost: 0, cost: 0, description: 'Camilan manis pelengkap yang dapat ditunda saat darurat.' },
    ],
    reflection: {
      question: 'Mengapa seorang perancang bantuan harus bisa membedakan kebutuhan dan keinginan?',
      options: [
        { id: 'ref7_1', text: 'Agar bantuan tepat sasaran dan semua penerima mendapat yang benar-benar mereka butuhkan.', isOptimal: true, feedbackText: 'Luar biasa! Tepat sasaran adalah kunci program bantuan yang efektif.' },
        { id: 'ref7_2', text: 'Supaya kita bisa menyimpan anggaran untuk membeli barang mewah nanti.', isOptimal: false, feedbackText: 'Bantuan harus digunakan sepenuhnya untuk kepentingan penerima, bukan disimpan untuk keperluan lain.' },
      ],
    },
  },
  {
    id: 8, worldId: 2, globalLevelIndex: 2,
    title: 'Balai Desa Harapan',
    theme: 'Memilih Bantuan Tepat',
    conceptType: 'Matching Bantuan', conceptEmoji: '🎯',
    pillarColor: 'orange', gradientFrom: '#EA580C', gradientTo: '#FDBA74', bgLight: '#FFF7ED',
    tagline: 'Setiap Keluarga Berbeda, Bantuannya pun Berbeda',
    badgeId: 'badge_pencocok_tepat', badgeTitle: 'Lencana Pencocok Tepat', badgeEmoji: '🎯',
    badgeDescription: 'Kamu berhasil mencocokkan jenis bantuan dengan kebutuhan setiap keluarga!',
    summaryLesson: 'Bantuan yang tepat sasaran mempertimbangkan kondisi dan kebutuhan spesifik setiap penerima.',
    nextLevelHint: 'Bendahara Kecil menunggumu!',
    mechanic: 'matching',
    learningObjective: 'Anak memahami bahwa jenis bantuan harus disesuaikan dengan profil dan kondisi penerima.',
    story: {
      location: 'Balai Desa Harapan',
      narrative: 'Tiga keluarga datang ke balai desa. Masing-masing punya cerita dan kebutuhan yang berbeda. Tugasmu adalah mencocokkan paket bantuan yang paling sesuai.',
      urgencyNote: 'Pilih paket bantuan yang paling cocok untuk setiap keluarga.',
      reportText: '"Setiap keluarga kini mendapat bantuan yang benar-benar sesuai kebutuhan mereka!"',
      reportFrom: 'Kepala Desa Harapan',
    },
    introScenes: [
      { id: 's8_1', title: 'Tiga Keluarga Berbeda', speaker: 'Narator', narrativeText: 'Di Balai Desa Harapan, tiga keluarga datang mengantri dengan penuh harapan. Setiap keluarga punya cerita yang berbeda dan kebutuhan yang berbeda pula. Bisakah kamu mencocokkan bantuan yang paling tepat untuk setiap keluarga?', subtitles: 'Di Balai Desa Harapan, tiga keluarga datang mengantri dengan penuh harapan. Setiap keluarga punya cerita yang berbeda dan kebutuhan yang berbeda pula. Bisakah kamu mencocokkan bantuan yang paling tepat untuk setiap keluarga?', visualTheme: 'village_hall', audioSrc: '/audio/narration/level-8/scene-01.mp3' },
      { id: 's8_2', title: 'Tidak Semua Sama', speaker: 'Pohon Kebaikan', narrativeText: 'Psst, Petualang! Ada rahasia besar soal memberi bantuan. Bantuan yang baik bukan berarti semua orang mendapat hal yang sama. Yang benar-benar baik adalah bantuan yang paling sesuai dengan kondisi masing-masing orang. Bu Aminah butuh makanan. Pak Darmo butuh alat tani. Adik Reza butuh perlengkapan sekolah. Yuk, cocokkan dengan tepat!', subtitles: 'Psst, Petualang! Ada rahasia besar soal memberi bantuan. Bantuan yang baik bukan berarti semua orang mendapat hal yang sama. Yang benar-benar baik adalah bantuan yang paling sesuai dengan kondisi masing-masing orang. Bu Aminah butuh makanan. Pak Darmo butuh alat tani. Adik Reza butuh perlengkapan sekolah. Yuk, cocokkan dengan tepat!', visualTheme: 'diverse_families', audioSrc: '/audio/narration/level-8/scene-02.mp3' },
    ],
    gameConfig: {
      type: 'matching',
      instruction: 'Cocokkan setiap keluarga dengan paket bantuan yang paling sesuai!',
      families: [
        { id: 'f1', name: 'Keluarga Bu Aminah', description: 'Ibu tunggal dengan 3 anak kecil. Suami sakit keras. Kebutuhan pangan sangat mendesak.', emoji: '👩\u200d👧\u200d👦', correctAid: 'aid_pangan' },
        { id: 'f2', name: 'Keluarga Pak Darmo', description: 'Lansia dua orang, alat pertanian rusak kena banjir, ingin kembali bertani.', emoji: '👴👵', correctAid: 'aid_usaha' },
        { id: 'f3', name: 'Adik Reza', description: 'Anak yatim usia 8 tahun, putus sekolah karena tidak mampu bayar keperluan sekolah.', emoji: '👦', correctAid: 'aid_pendidikan' },
      ],
      aidPackages: [
        { id: 'aid_pangan', label: 'Paket Pangan Darurat', emoji: '🍱', description: 'Beras, lauk, dan susu.' },
        { id: 'aid_usaha', label: 'Modal Usaha Tani', emoji: '🌾', description: 'Bibit, pupuk, alat tani.' },
        { id: 'aid_pendidikan', label: 'Paket Sekolah Lengkap', emoji: '🎒', description: 'Buku, seragam, biaya SPP.' },
      ],
    },
    virtualCurrency: { initialCoins: 90, coinLabel: 'Koin Anggaran' },
    collectiveSimulation: { targetTotalCoins: 90, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'aid_pangan', title: 'Paket Pangan Bu Aminah (3 Anak)', emoji: '🍱', category: 'Kebutuhan Pokok', isPriority: true, isEssential: true, targetCoins: 35, minCost: 25, cost: 0, description: 'Beras, lauk pauk, dan susu bergizi bagi ibu tunggal dan anak balita.' },
      { id: 'aid_usaha', title: 'Modal Bibit Tani Pak Darmo', emoji: '🌾', category: 'Kebutuhan Pokok', isPriority: true, isEssential: true, targetCoins: 30, minCost: 20, cost: 0, description: 'Bibit tanaman dan alat tani pengganti pasca sawah diterjang banjir.' },
      { id: 'aid_pendidikan', title: 'Paket Sekolah Lengkap Adik Reza', emoji: '🎒', category: 'Kebutuhan Pokok', isPriority: true, isEssential: true, targetCoins: 25, minCost: 15, cost: 0, description: 'Seragam, sepatu, dan buku pelajaran agar anak yatim kembali sekolah.' },
    ],
    reflection: {
      question: 'Mengapa kita tidak boleh memberikan bantuan yang sama kepada semua orang?',
      options: [
        { id: 'ref8_1', text: 'Karena setiap orang punya kondisi dan kebutuhan yang berbeda-beda.', isOptimal: true, feedbackText: 'Tepat! Bantuan yang efektif selalu mempertimbangkan kondisi spesifik penerimanya.' },
        { id: 'ref8_2', text: 'Karena kita ingin terlihat adil dengan memberi yang berbeda.', isOptimal: false, feedbackText: 'Keadilan bukan berarti memberi hal yang sama, tapi memastikan setiap orang mendapat yang mereka butuhkan.' },
      ],
    },
  },
  {
    id: 9, worldId: 2, globalLevelIndex: 3,
    title: 'Bendahara Kecil',
    theme: 'Manajemen Anggaran',
    conceptType: 'Budgeting', conceptEmoji: '💰',
    pillarColor: 'yellow', gradientFrom: '#CA8A04', gradientTo: '#FEF08A', bgLight: '#FEFCE8',
    tagline: 'Kelola Dana Kebaikan dengan Bijak',
    badgeId: 'badge_bendahara_amanah', badgeTitle: 'Lencana Bendahara Amanah', badgeEmoji: '💰',
    badgeDescription: 'Kamu berhasil mengelola anggaran program bantuan dengan sangat bijak!',
    summaryLesson: 'Anggaran yang baik mencakup kebutuhan utama terlebih dahulu, lalu menambahkan pelengkap jika masih ada sisa dana.',
    nextLevelHint: 'Tim Gotong Royong memerlukanmu!',
    mechanic: 'budget_slider',
    learningObjective: 'Anak dapat membuat keputusan alokasi anggaran yang prioritas dan bijaksana.',
    story: {
      location: 'Kantor Kecil Relawan',
      narrative: 'Program bantuan musim hujan dimulai. Kamu ditunjuk sebagai bendahara kecil. Ada 200 Koin Anggaran yang harus dibagi ke empat pos pengeluaran secara bijak.',
      urgencyNote: 'Total anggaran harus tepat 200 koin. Prioritaskan pos yang paling penting!',
      reportText: '"Laporan keuangan program menyatakan semua pos terpenuhi. Bendahara kecil berhasil mengelola anggaran dengan teliti!"',
      reportFrom: 'Ketua Relawan Desa',
    },
    introScenes: [
      { id: 's9_1', title: 'Tugas Baru: Bendahara Kecil', speaker: 'Ketua Relawan', narrativeText: 'Hei, Petualang Kebaikan! Selamat! Kamu baru saja dipercaya menjadi Bendahara Kecil program bantuan musim hujan. Ini adalah tanggung jawab yang sangat besar! Pastikan setiap koin digunakan dengan sangat bijak dan bertanggung jawab, ya!', subtitles: 'Hei, Petualang Kebaikan! Selamat! Kamu baru saja dipercaya menjadi Bendahara Kecil program bantuan musim hujan. Ini adalah tanggung jawab yang sangat besar! Pastikan setiap koin digunakan dengan sangat bijak dan bertanggung jawab, ya!', visualTheme: 'office_relawan', audioSrc: '/audio/narration/level-9/scene-01.mp3' },
      { id: 's9_2', title: '200 Koin Anggaran', speaker: 'Pohon Kebaikan', narrativeText: 'Dengarkan baik-baik, Bendahara Kecil! Kamu punya 200 Koin Anggaran yang harus dibagi. Ada empat pos yang menunggu: Satu — Pos Pangan untuk makan warga. Dua — Pos Kesehatan untuk obat-obatan. Tiga — Pos Pendidikan untuk buku dan alat tulis. Empat — Pos Logistik untuk biaya angkut bantuan. Bagaimana caramu membaginya dengan adil?', subtitles: 'Dengarkan baik-baik, Bendahara Kecil! Kamu punya 200 Koin Anggaran yang harus dibagi. Ada empat pos yang menunggu: Satu — Pos Pangan untuk makan warga. Dua — Pos Kesehatan untuk obat-obatan. Tiga — Pos Pendidikan untuk buku dan alat tulis. Empat — Pos Logistik untuk biaya angkut bantuan. Bagaimana caramu membaginya dengan adil?', visualTheme: 'budget_intro', audioSrc: '/audio/narration/level-9/scene-02.mp3' },
    ],
    gameConfig: {
      type: 'budget_slider',
      instruction: 'Bagi 200 Koin Anggaran ke empat pos. Total harus tepat 200!',
      totalBudget: 200,
      posts: [
        { id: 'post_pangan', label: 'Pos Pangan', emoji: '🍚', minRequired: 60, recommended: 80, description: 'Makan untuk 50 keluarga selama seminggu.' },
        { id: 'post_kesehatan', label: 'Pos Kesehatan', emoji: '🏥', minRequired: 40, recommended: 60, description: 'Obat-obatan dan pemeriksaan dasar.' },
        { id: 'post_pendidikan', label: 'Pos Pendidikan', emoji: '📚', minRequired: 30, recommended: 40, description: 'Buku dan alat tulis pengganti.' },
        { id: 'post_logistik', label: 'Pos Logistik', emoji: '🚚', minRequired: 20, recommended: 20, description: 'Biaya angkut dan distribusi bantuan.' },
      ],
    },
    virtualCurrency: { initialCoins: 200, coinLabel: 'Koin Anggaran' },
    collectiveSimulation: { targetTotalCoins: 200, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'post_pangan', title: 'Pos Pangan 50 Keluarga Binaan', emoji: '🍚', category: 'Kebutuhan Pokok', isPriority: true, isEssential: true, targetCoins: 80, minCost: 60, cost: 0, description: 'Bahan makanan pokok darurat selama satu minggu penuh.' },
      { id: 'post_kesehatan', title: 'Pos Layanan Kesehatan & Obat', emoji: '🏥', category: 'Kebutuhan Pokok', isPriority: true, isEssential: true, targetCoins: 60, minCost: 40, cost: 0, description: 'Pemeriksaan tensi, vitamin, dan obat-obatan warga sakit.' },
      { id: 'post_pendidikan', title: 'Pos Pendidikan & Buku Tulis', emoji: '📚', category: 'Kebutuhan Pokok', isPriority: true, isEssential: true, targetCoins: 40, minCost: 30, cost: 0, description: 'Perlengkapan belajar siswa agar tidak tertinggal pelajaran.' },
      { id: 'post_logistik', title: 'Pos Angkutan Logistik Pelosok', emoji: '🚚', category: 'Operasional', isPriority: true, isEssential: true, targetCoins: 20, minCost: 20, cost: 0, description: 'Bahan bakar armada pengangkut sembako menembus jalan terjal.' },
    ],
    reflection: {
      question: 'Pos mana yang paling penting untuk didahulukan?',
      options: [
        { id: 'ref9_1', text: 'Pangan dan Kesehatan, karena tanpa makanan dan kesehatan, program lain tidak bisa berjalan.', isOptimal: true, feedbackText: 'Benar! Dasar kelangsungan hidup harus terpenuhi dulu.' },
        { id: 'ref9_2', text: 'Logistik, karena tanpa transportasi, tidak ada yang bisa dikirim ke mana-mana.', isOptimal: false, feedbackText: 'Logistik penting, tapi urutan prioritas tetap pangan dan kesehatan.' },
      ],
    },
  },
  {
    id: 10, worldId: 2, globalLevelIndex: 4,
    title: 'Tim Gotong Royong',
    theme: 'Kolaborasi & Kerjasama',
    conceptType: 'Teamwork', conceptEmoji: '🤝',
    pillarColor: 'lime', gradientFrom: '#65A30D', gradientTo: '#BEF264', bgLight: '#F7FEE7',
    tagline: 'Bersama Lebih Kuat, Sendirian Lebih Susah',
    badgeId: 'badge_pemimpin_gotong', badgeTitle: 'Lencana Pemimpin Gotong Royong', badgeEmoji: '🤝',
    badgeDescription: 'Kamu berhasil memimpin tim gotong royong menyelesaikan misi bersama!',
    summaryLesson: 'Gotong royong memperkuat dampak kebaikan. Ketika setiap orang berkontribusi sesuai kemampuannya, misi besar pun terasa ringan.',
    nextLevelHint: 'Taman Wakaf Abadi menantimu!',
    mechanic: 'role_puzzle',
    learningObjective: 'Anak memahami nilai kerjasama dan pembagian peran dalam program bantuan.',
    story: {
      location: 'Lapangan Gotong Royong Desa',
      narrative: 'Program distribusi bantuan membutuhkan tiga tim: Tim Packing, Tim Angkut, dan Tim Distribusi.',
      urgencyNote: 'Semua tim harus menyelesaikan tugasnya dalam 3 ronde.',
      reportText: '"Distribusi bantuan berjalan lancar berkat gotong royong yang luar biasa!"',
      reportFrom: 'Koordinator Lapangan',
    },
    introScenes: [
      { id: 's10_1', title: 'Tiga Tim, Satu Misi', speaker: 'Narator', narrativeText: 'Ratusan paket bantuan sudah menumpuk di gudang! Tiga tim siap beraksi: Tim Packing yang mengemas, Tim Angkut yang membawa, dan Tim Distribusi yang membagikan. Tapi semuanya butuh koordinasi yang baik. Siap memimpin tim gotong royong ini?', subtitles: 'Ratusan paket bantuan sudah menumpuk di gudang! Tiga tim siap beraksi: Tim Packing yang mengemas, Tim Angkut yang membawa, dan Tim Distribusi yang membagikan. Tapi semuanya butuh koordinasi yang baik. Siap memimpin tim gotong royong ini?', visualTheme: 'warehouse_team', audioSrc: '/audio/narration/level-10/scene-01.mp3' },
      { id: 's10_2', title: 'Gotong Royong itu Indah', speaker: 'Pohon Kebaikan', narrativeText: 'Tahukah kamu, teman? Satu orang bisa memindahkan satu kotak. Tapi sepuluh orang bergotong royong bisa memindahkan seribu kotak! Itulah kekuatan kebersamaan! Ketika setiap orang bekerja sesuai tugasnya dan saling membantu, misi besar pun terasa ringan. Ayo, pimpin tim kita menyelesaikan misi ini!', subtitles: 'Tahukah kamu, teman? Satu orang bisa memindahkan satu kotak. Tapi sepuluh orang bergotong royong bisa memindahkan seribu kotak! Itulah kekuatan kebersamaan! Ketika setiap orang bekerja sesuai tugasnya dan saling membantu, misi besar pun terasa ringan. Ayo, pimpin tim kita menyelesaikan misi ini!', visualTheme: 'teamwork_power', audioSrc: '/audio/narration/level-10/scene-02.mp3' },
    ],
    gameConfig: {
      type: 'role_puzzle',
      instruction: 'Pilih tindakan terbaik untuk setiap tim di setiap ronde. Selesaikan dalam 3 ronde!',
      teams: [
        { id: 'team_packing', name: 'Tim Packing', emoji: '📦', role: 'Mengemas paket bantuan' },
        { id: 'team_angkut', name: 'Tim Angkut', emoji: '🚚', role: 'Mengangkut ke titik distribusi' },
        { id: 'team_distribusi', name: 'Tim Distribusi', emoji: '🏠', role: 'Membagikan ke keluarga' },
      ],
      rounds: [
        { roundId: 1, situation: 'Gudang penuh paket yang belum dikemas. Truk sudah menunggu.', teamActions: { team_packing: ['Kemas semua paket cepat', 'Kemas sebagian, istirahat dulu'], team_angkut: ['Tunggu paket selesai dikemas', 'Langsung berangkat meski belum siap'], team_distribusi: ['Persiapkan daftar penerima', 'Langsung ke lokasi tanpa daftar'] }, optimalActions: { team_packing: 0, team_angkut: 0, team_distribusi: 0 } },
        { roundId: 2, situation: 'Paket sudah dikemas. Ada jalan yang macet di rute utama.', teamActions: { team_packing: ['Bantu muat truk tambahan', 'Istirahat sambil menunggu'], team_angkut: ['Ambil rute alternatif', 'Tunggu macet selesai'], team_distribusi: ['Update lokasi distribusi real-time', 'Tetap tunggu di satu titik'] }, optimalActions: { team_packing: 0, team_angkut: 0, team_distribusi: 0 } },
        { roundId: 3, situation: 'Truk tiba. Ada 2 keluarga yang tidak ada di rumah.', teamActions: { team_packing: ['Siapkan cadangan untuk esok hari', 'Buka kembali paket yang sudah dikemas'], team_angkut: ['Catat alamat, kembali esok', 'Titipkan ke tetangga terpercaya'], team_distribusi: ['Konfirmasi ke RT dan catat', 'Tinggalkan saja di depan pintu'] }, optimalActions: { team_packing: 0, team_angkut: 1, team_distribusi: 0 } },
      ],
    },
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Tim' },
    collectiveSimulation: { targetTotalCoins: 100, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'team_packing', title: 'Dukungan Operasional Tim Packing', emoji: '📦', category: 'Kolaborasi Pokok', isPriority: true, isEssential: true, targetCoins: 40, minCost: 30, cost: 0, description: 'Kardus, lakban, dan label alamat ratusan paket bantuan warga.' },
      { id: 'team_angkut', title: 'Dukungan Operasional Tim Angkut', emoji: '🚚', category: 'Kolaborasi Pokok', isPriority: true, isEssential: true, targetCoins: 35, minCost: 25, cost: 0, description: 'Bahan bakar dan armada truk pengangkut ke titik evakuasi.' },
      { id: 'team_distribusi', title: 'Dukungan Tim Distribusi Door-to-Door', emoji: '🏠', category: 'Kolaborasi Pokok', isPriority: true, isEssential: true, targetCoins: 25, minCost: 15, cost: 0, description: 'Penyaluran langsung sesuai daftar penerima yang telah diverifikasi.' },
    ],
    reflection: {
      question: 'Apa yang membuat gotong royong lebih efektif daripada bekerja sendiri?',
      options: [
        { id: 'ref10_1', text: 'Karena setiap orang bisa fokus pada tugasnya masing-masing sehingga semua berjalan serentak.', isOptimal: true, feedbackText: 'Tepat! Pembagian peran yang jelas adalah kunci gotong royong yang efektif.' },
        { id: 'ref10_2', text: 'Karena banyak orang membuat suasana lebih ramai dan menyenangkan.', isOptimal: false, feedbackText: 'Gotong royong efektif karena ada koordinasi dan pembagian peran, bukan sekadar banyak orang.' },
      ],
    },
  },
  {
    id: 11, worldId: 2, globalLevelIndex: 5,
    title: 'Taman Wakaf Abadi',
    theme: 'Wakaf Produktif',
    conceptType: 'Wakaf', conceptEmoji: '🌳',
    pillarColor: 'emerald', gradientFrom: '#059669', gradientTo: '#6EE7B7', bgLight: '#ECFDF5',
    tagline: 'Kebaikan yang Terus Mengalir Tanpa Batas',
    badgeId: 'badge_penanam_wakaf', badgeTitle: 'Lencana Penanam Wakaf', badgeEmoji: '🌳',
    badgeDescription: 'Kamu memahami kekuatan wakaf produktif yang manfaatnya tidak pernah putus!',
    summaryLesson: 'Wakaf produktif adalah aset yang dikelola untuk menghasilkan manfaat terus-menerus, bahkan setelah pewakaf wafat.',
    nextLevelHint: 'Rapat Prioritas membutuhkan keputusanmu!',
    mechanic: 'chain_reaction',
    learningObjective: 'Anak memahami konsep wakaf produktif dan dampak berantainya.',
    story: {
      location: 'Taman Desa yang Diterlantarkan',
      narrative: 'Sebuah taman desa yang terbengkalai bisa diubah menjadi wakaf produktif. Pilihanmu akan menentukan dampak yang dirasakan masyarakat selama bertahun-tahun.',
      urgencyNote: 'Pilih jenis wakaf yang paling bermanfaat untuk taman ini.',
      reportText: '"Taman wakaf ini kini menjadi kebanggaan desa. Generasi mendatang akan terus merasakan manfaatnya."',
      reportFrom: 'Nadzir Wakaf Desa',
    },
    introScenes: [
      { id: 's11_1', title: 'Taman yang Terbengkalai', speaker: 'Narator', narrativeText: 'Di sudut desa, ada sebuah taman yang sudah lama diterlantarkan. Rumput liar menutupi seluruh penjuru. Padahal tanahnya sangat subur dan lokasinya sangat strategis! Hmm, kira-kira apa yang bisa kita lakukan untuk taman ini?', subtitles: 'Di sudut desa, ada sebuah taman yang sudah lama diterlantarkan. Rumput liar menutupi seluruh penjuru. Padahal tanahnya sangat subur dan lokasinya sangat strategis! Hmm, kira-kira apa yang bisa kita lakukan untuk taman ini?', visualTheme: 'abandoned_park', audioSrc: '/audio/narration/level-11/scene-01.mp3' },
      { id: 's11_2', title: 'Kekuatan Wakaf', speaker: 'Pohon Kebaikan', narrativeText: 'Teman, ada sebuah kebaikan yang sangat istimewa namanya Wakaf. Wakaf adalah sedekah jariyah, artinya pahalanya terus mengalir bahkan setelah orang yang memberi wakaf sudah meninggal dunia! Bayangkan! Sebuah kebun wakaf bisa memberi makan selama puluhan tahun. Sebuah perpustakaan wakaf bisa mencerdaskan ribuan anak. Kebaikan yang tidak pernah berhenti! Kamu mau memilih wakaf apa untuk taman ini?', subtitles: 'Teman, ada sebuah kebaikan yang sangat istimewa namanya Wakaf. Wakaf adalah sedekah jariyah, artinya pahalanya terus mengalir bahkan setelah orang yang memberi wakaf sudah meninggal dunia! Bayangkan! Sebuah kebun wakaf bisa memberi makan selama puluhan tahun. Sebuah perpustakaan wakaf bisa mencerdaskan ribuan anak. Kebaikan yang tidak pernah berhenti! Kamu mau memilih wakaf apa untuk taman ini?', visualTheme: 'waqf_power', audioSrc: '/audio/narration/level-11/scene-02.mp3' },
    ],
    gameConfig: {
      type: 'chain_reaction',
      instruction: 'Pilih jenis wakaf untuk taman ini dan lihat dampak berantainya!',
      options: [
        { id: 'waqf_kebun', label: 'Kebun Produktif', emoji: '🥦', description: 'Taman diubah jadi kebun sayur bersama.', chainEffects: [{ step: 1, effect: 'Hasil kebun dijual ke pasar', emoji: '💚' }, { step: 2, effect: 'Uang untuk biaya sekolah anak yatim', emoji: '📚' }, { step: 3, effect: 'Anak yatim berprestasi memberi ilmu', emoji: '🌟' }], score: 95 },
        { id: 'waqf_perpustakaan', label: 'Perpustakaan Desa', emoji: '📖', description: 'Taman dibangun jadi perpustakaan mini.', chainEffects: [{ step: 1, effect: 'Warga bisa membaca gratis setiap hari', emoji: '📚' }, { step: 2, effect: 'Pengetahuan meningkat, penghasilan bertambah', emoji: '💰' }, { step: 3, effect: 'Desa berkembang dan mandiri', emoji: '🏘️' }], score: 90 },
        { id: 'waqf_taman', label: 'Taman Bermain Anak', emoji: '🎠', description: 'Taman dijadikan area bermain anak-anak.', chainEffects: [{ step: 1, effect: 'Anak-anak bermain aman dan gembira', emoji: '😄' }, { step: 2, effect: 'Orang tua bisa bekerja lebih tenang', emoji: '😌' }, { step: 3, effect: 'Produktivitas keluarga meningkat', emoji: '📈' }], score: 75 },
      ],
    },
    virtualCurrency: { initialCoins: 120, coinLabel: 'Koin Wakaf' },
    collectiveSimulation: { targetTotalCoins: 120, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'waqf_kebun', title: 'Kebun Wakaf Sayur Produktif', emoji: '🥦', category: 'Wakaf Produktif', isPriority: true, isEssential: true, targetCoins: 50, minCost: 35, cost: 0, description: 'Kebun hidroponik bersama yang hasil panennya membiayai anak yatim.' },
      { id: 'waqf_perpustakaan', title: 'Perpustakaan Mini Desa Bersama', emoji: '📖', category: 'Wakaf Produktif', isPriority: true, isEssential: true, targetCoins: 45, minCost: 30, cost: 0, description: 'Pusat baca dan pelatihan cerdas anak-anak desa secara gratis.' },
      { id: 'waqf_taman', title: 'Taman Bermain Ramah Lingkungan', emoji: '🎠', category: 'Fasilitas Sosial', isPriority: true, isEssential: true, targetCoins: 25, minCost: 15, cost: 0, description: 'Area bermain sehat terbuka bagi tumbuh kembang anak warga.' },
    ],
    reflection: {
      question: 'Apa yang membuat wakaf berbeda dari sedekah biasa?',
      options: [
        { id: 'ref11_1', text: 'Wakaf adalah aset yang terus mengalirkan manfaat tanpa habis, bahkan setelah pewakaf meninggal.', isOptimal: true, feedbackText: 'Tepat! Itulah yang disebut sedekah jariyah.' },
        { id: 'ref11_2', text: 'Wakaf lebih besar nilainya karena harus berupa tanah atau bangunan.', isOptimal: false, feedbackText: 'Wakaf kini bisa berupa uang, surat berharga, bahkan manfaat jangka panjang.' },
      ],
    },
  },
  {
    id: 12, worldId: 2, globalLevelIndex: 6,
    title: 'Rapat Prioritas',
    theme: 'Prioritas Program',
    conceptType: 'Prioritization', conceptEmoji: '📋',
    pillarColor: 'blue', gradientFrom: '#1D4ED8', gradientTo: '#93C5FD', bgLight: '#EFF6FF',
    tagline: 'Pilih yang Paling Berdampak untuk Semua',
    badgeId: 'badge_pengambil_keputusan', badgeTitle: 'Lencana Pengambil Keputusan', badgeEmoji: '📋',
    badgeDescription: 'Kamu berhasil menentukan prioritas program bantuan berdasarkan dampak terbesar!',
    summaryLesson: 'Pengambilan keputusan yang baik mempertimbangkan dampak, urgensi, dan jumlah orang yang terbantu.',
    nextLevelHint: 'Proyek Impian siap dirancang!',
    mechanic: 'ranking',
    learningObjective: 'Anak dapat mengurutkan program bantuan berdasarkan kriteria dampak dan urgensi.',
    story: {
      location: 'Ruang Rapat Panitia Sosial',
      narrative: 'Panitia sosial desa memiliki anggaran terbatas. Ada 5 usulan program. Hanya 3 yang bisa dijalankan tahun ini.',
      urgencyNote: 'Hanya 3 program teratas yang bisa mendapat pendanaan.',
      reportText: '"Tiga program terpilih akan mulai berjalan bulan depan. Terima kasih atas keputusan yang bijak!"',
      reportFrom: 'Ketua Panitia Sosial',
    },
    introScenes: [
      { id: 's12_1', title: 'Lima Usulan, Tiga Slot', speaker: 'Ketua Panitia', narrativeText: 'Perhatian semua! Tahun ini kita punya anggaran yang cukup untuk tiga program saja. Tapi ada lima usulan yang masuk dari seluruh warga! Program gizi balita, pembangunan sanitasi, beasiswa siswa, renovasi taman bermain, dan festival seni. Kita harus memilih tiga yang paling penting terlebih dahulu. Ayo bantu kami memutuskan!', subtitles: 'Perhatian semua! Tahun ini kita punya anggaran yang cukup untuk tiga program saja. Tapi ada lima usulan yang masuk dari seluruh warga! Program gizi balita, pembangunan sanitasi, beasiswa siswa, renovasi taman bermain, dan festival seni. Kita harus memilih tiga yang paling penting terlebih dahulu. Ayo bantu kami memutuskan!', visualTheme: 'meeting_room', audioSrc: '/audio/narration/level-12/scene-01.mp3' },
    ],
    gameConfig: {
      type: 'ranking',
      instruction: 'Urutkan 5 program dari yang paling prioritas (1) sampai paling bisa ditunda (5).',
      programs: [
        { id: 'prog_gizi', name: 'Program Gizi Balita', emoji: '👶', beneficiaries: 120, urgency: 'Sangat Tinggi', duration: '3 bulan', description: 'Suplementasi gizi untuk 120 balita stunting.', optimalRank: 1 },
        { id: 'prog_sanitasi', name: 'Pembangunan MCK Umum', emoji: '🚿', beneficiaries: 250, urgency: 'Tinggi', duration: '2 bulan', description: 'Fasilitas sanitasi untuk 250 warga.', optimalRank: 2 },
        { id: 'prog_beasiswa', name: 'Beasiswa Siswa Berprestasi', emoji: '🎓', beneficiaries: 20, urgency: 'Sedang', duration: '12 bulan', description: '20 beasiswa untuk siswa SMP kurang mampu.', optimalRank: 3 },
        { id: 'prog_taman', name: 'Renovasi Taman Bermain', emoji: '🎠', beneficiaries: 80, urgency: 'Rendah', duration: '1 bulan', description: 'Perbaikan fasilitas taman bermain desa.', optimalRank: 4 },
        { id: 'prog_festival', name: 'Festival Seni Desa', emoji: '🎪', beneficiaries: 500, urgency: 'Sangat Rendah', duration: '1 minggu', description: 'Festival budaya tahunan desa.', optimalRank: 5 },
      ],
    },
    virtualCurrency: { initialCoins: 150, coinLabel: 'Koin Program' },
    collectiveSimulation: { targetTotalCoins: 150, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'prog_gizi', title: 'Intervensi Gizi 120 Balita Stunting', emoji: '👶', category: 'Sangat Mendesak', isPriority: true, isEssential: true, targetCoins: 65, minCost: 50, cost: 0, description: 'Suplementasi gizi darurat dan vitamin pencegah stunting balita.' },
      { id: 'prog_sanitasi', title: 'Pembangunan Sanitasi MCK 250 Warga', emoji: '🚿', category: 'Mendesak', isPriority: true, isEssential: true, targetCoins: 50, minCost: 40, cost: 0, description: 'Fasilitas air bersih dan sanitasi umum pencegah wabah menular.' },
      { id: 'prog_beasiswa', title: 'Beasiswa Pendidikan 20 Siswa Miskin', emoji: '🎓', category: 'Pendidikan', isPriority: true, isEssential: true, targetCoins: 35, minCost: 20, cost: 0, description: 'Biaya SPP dan seragam bagi anak kurang mampu berprestasi.' },
    ],
    reflection: {
      question: 'Kriteria apa yang paling menentukan prioritas sebuah program bantuan?',
      options: [
        { id: 'ref12_1', text: 'Urgensi kebutuhan dan jumlah orang yang terbantu secara langsung.', isOptimal: true, feedbackText: 'Sangat tepat! Program dengan urgensi tinggi dan penerima manfaat terbanyak harus didahulukan.' },
        { id: 'ref12_2', text: 'Yang paling populer dan disukai banyak orang.', isOptimal: false, feedbackText: 'Popularitas bukan kriteria prioritas utama.' },
      ],
    },
  },
  {
    id: 13, worldId: 2, globalLevelIndex: 7,
    title: 'Proyek Impian',
    theme: 'Merancang Program',
    conceptType: 'Program Design', conceptEmoji: '🏗️',
    pillarColor: 'violet', gradientFrom: '#7C3AED', gradientTo: '#DDD6FE', bgLight: '#F5F3FF',
    tagline: 'Bangun Program Kebaikan dari Nol',
    badgeId: 'badge_arsitek_kebaikan', badgeTitle: 'Lencana Arsitek Kebaikan', badgeEmoji: '🏗️',
    badgeDescription: 'Kamu berhasil merancang program bantuan yang lengkap dan bermakna!',
    summaryLesson: 'Program bantuan yang baik punya tujuan jelas, sasaran yang teridentifikasi, anggaran yang logis, dan cara mengukur keberhasilannya.',
    nextLevelHint: 'Dunia Penjaga Amanah membuka pintunya!',
    mechanic: 'project_builder',
    learningObjective: 'Anak dapat menyusun komponen dasar sebuah program bantuan yang terstruktur.',
    story: {
      location: 'Studio Perancang Kebaikan',
      narrative: 'Kamu telah menjadi Perancang Kebaikan. Kini saatnya merancang programmu sendiri: tentukan tujuan, sasaran, anggaran, dan cara mengukur keberhasilan.',
      urgencyNote: 'Rancang programmu sebaik mungkin sebelum dipresentasikan!',
      reportText: '"Programmu mendapat tepuk tangan dari seluruh panitia! Kamu telah menunjukkan kemampuan merancang kebaikan yang sesungguhnya."',
      reportFrom: 'Dewan Penilai Program Kebaikan',
    },
    introScenes: [
      { id: 's13_1', title: 'Saatnya Merancang!', speaker: 'Pohon Kebaikan', narrativeText: 'Wah, Petualang Kebaikan! Kamu sudah belajar banyak sekali di Dunia Perancang Kebaikan! Sekarang saatnya kamu merancang programmu sendiri dari nol! Tentukan tujuan yang jelas, pilih sasaran penerima yang tepat, buat alokasi anggaran yang bijak, dan tentukan cara mengukur keberhasilan programmu! Dunia menanti programmu yang luar biasa!', subtitles: 'Wah, Petualang Kebaikan! Kamu sudah belajar banyak sekali di Dunia Perancang Kebaikan! Sekarang saatnya kamu merancang programmu sendiri dari nol! Tentukan tujuan yang jelas, pilih sasaran penerima yang tepat, buat alokasi anggaran yang bijak, dan tentukan cara mengukur keberhasilan programmu! Dunia menanti programmu yang luar biasa!', visualTheme: 'design_studio', audioSrc: '/audio/narration/level-13/scene-01.mp3' },
    ],
    gameConfig: {
      type: 'project_builder',
      instruction: 'Susun komponen programmu dengan memilih opsi terbaik di setiap tahap!',
      steps: [
        { stepId: 'goal', label: 'Tujuan Program', emoji: '🎯', question: 'Apa tujuan utama programmu?', options: [{ id: 'goal_gizi', text: 'Mengurangi stunting balita di desa', score: 95 }, { id: 'goal_literasi', text: 'Meningkatkan literasi baca anak SD', score: 90 }, { id: 'goal_hiburan', text: 'Mengadakan pesta ulang tahun desa', score: 30 }] },
        { stepId: 'target', label: 'Sasaran Penerima', emoji: '👥', question: 'Siapa yang akan mendapat manfaat?', options: [{ id: 'target_specific', text: 'Balita 0-5 tahun dari keluarga kurang mampu', score: 95 }, { id: 'target_all', text: 'Semua warga desa tanpa terkecuali', score: 70 }, { id: 'target_vague', text: 'Orang-orang yang kira-kira membutuhkan', score: 30 }] },
        { stepId: 'budget', label: 'Alokasi Anggaran', emoji: '💰', question: 'Bagaimana kamu mengalokasikan 100 Koin Anggaran?', options: [{ id: 'budget_smart', text: '70 operasional, 20 monitoring, 10 cadangan', score: 95 }, { id: 'budget_all_ops', text: '100 semua untuk operasional langsung', score: 60 }, { id: 'budget_event', text: '80 untuk acara peluncuran, 20 operasional', score: 20 }] },
        { stepId: 'measure', label: 'Ukuran Keberhasilan', emoji: '📊', question: 'Bagaimana cara mengukur programmu berhasil?', options: [{ id: 'measure_data', text: 'Data berat & tinggi badan balita meningkat 10%', score: 95 }, { id: 'measure_feeling', text: 'Warga terasa senang dengan programnya', score: 50 }, { id: 'measure_none', text: 'Tidak perlu diukur, yang penting sudah berbuat', score: 10 }] },
      ],
    },
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Program' },
    collectiveSimulation: { targetTotalCoins: 100, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'opt_program_dasar', title: 'Komponen Penyaluran Gizi Utama', emoji: '🍚', category: 'Rancangan Pokok', isPriority: true, isEssential: true, targetCoins: 50, minCost: 40, cost: 0, description: 'Penyaluran makanan sehat dan susu untuk balita keluarga pra-sejahtera.' },
      { id: 'opt_pendampingan_ibu', title: 'Penyuluhan & Pendampingan Ibu Balita', emoji: '📋', category: 'Rancangan Pokok', isPriority: true, isEssential: true, targetCoins: 30, minCost: 20, cost: 0, description: 'Pelatihan rutin pola asuh dan menu gizi seimbang keluarga.' },
      { id: 'opt_monitoring_dampak', title: 'Monitoring & Evaluasi Berat Badan', emoji: '📊', category: 'Akuntabilitas', isPriority: true, isEssential: true, targetCoins: 20, minCost: 10, cost: 0, description: 'Pencatatan data medis berkala untuk pertanggungjawaban donatur.' },
    ],
    reflection: {
      question: 'Mengapa penting mengukur keberhasilan program bantuan?',
      options: [
        { id: 'ref13_1', text: 'Agar kita tahu apakah program benar-benar berdampak dan bisa diperbaiki jika perlu.', isOptimal: true, feedbackText: 'Benar! Pengukuran adalah dasar akuntabilitas.' },
        { id: 'ref13_2', text: 'Untuk pamer kepada orang lain bahwa programnya berhasil.', isOptimal: false, feedbackText: 'Pengukuran bukan untuk pamer, tapi untuk belajar dan memastikan bantuan berdampak.' },
      ],
    },
  },
];

export const WORLD3_LEVELS = [
  {
    id: 14, worldId: 3, globalLevelIndex: 1,
    title: 'Buku Catatan Amanah',
    theme: 'Pencatatan Keuangan',
    conceptType: 'Akuntansi Dasar', conceptEmoji: '📒',
    pillarColor: 'indigo', gradientFrom: '#4338CA', gradientTo: '#A5B4FC', bgLight: '#EEF2FF',
    tagline: 'Catat Setiap Sen dengan Jujur',
    badgeId: 'badge_pencatat_amanah', badgeTitle: 'Lencana Pencatat Amanah', badgeEmoji: '📒',
    badgeDescription: 'Kamu berhasil mencatat seluruh transaksi dengan jujur dan teliti!',
    summaryLesson: 'Pencatatan yang jujur dan rapi adalah pondasi akuntabilitas.',
    nextLevelHint: 'Detektif Bukti siap memeriksa!',
    mechanic: 'ledger',
    learningObjective: 'Anak memahami pentingnya mencatat pemasukan dan pengeluaran secara jujur.',
    story: { location: 'Pos Keuangan Yayasan Kecil', narrative: 'Yayasan kebaikan menerima 5 transaksi hari ini. Tugas Penjaga Amanah adalah mencatat setiap transaksi dengan benar ke dalam buku kas.', urgencyNote: 'Semua transaksi harus dicatat dengan benar.', reportText: '"Buku kas hari ini sudah terisi dengan rapi dan benar."', reportFrom: 'Pengawas Yayasan' },
    introScenes: [
      { id: 's14_1', title: 'Tugas Penjaga Amanah', speaker: 'Narator', narrativeText: 'Selamat datang di Dunia Penjaga Amanah, Petualang! Di dunia ini kamu akan belajar hal yang sangat penting, yaitu menjaga kepercayaan! Hari ini kamu bertanggung jawab atas catatan keuangan sebuah yayasan kebaikan. Setiap rupiah yang masuk dan keluar harus dicatat dengan teliti dan jujur. Siap menjadi Penjaga Amanah?', subtitles: 'Selamat datang di Dunia Penjaga Amanah, Petualang! Di dunia ini kamu akan belajar hal yang sangat penting, yaitu menjaga kepercayaan! Hari ini kamu bertanggung jawab atas catatan keuangan sebuah yayasan kebaikan. Setiap rupiah yang masuk dan keluar harus dicatat dengan teliti dan jujur. Siap menjadi Penjaga Amanah?', visualTheme: 'finance_office', audioSrc: '/audio/narration/level-14/scene-01.mp3' },
      { id: 's14_2', title: 'Pentingnya Catatan Jujur', speaker: 'Pohon Kebaikan', narrativeText: 'Dengarkan baik-baik, teman! Setiap rupiah yang diterima dan setiap rupiah yang dikeluarkan harus dicatat dengan jujur. Ini bukan sekadar angka di kertas. Ini adalah amanah, kepercayaan dari para donatur yang sudah memberi dengan tulus hatinya. Mencatat dengan jujur berarti kamu menghargai kepercayaan mereka. Ayo, buka buku catatan amanahmu!', subtitles: 'Dengarkan baik-baik, teman! Setiap rupiah yang diterima dan setiap rupiah yang dikeluarkan harus dicatat dengan jujur. Ini bukan sekadar angka di kertas. Ini adalah amanah, kepercayaan dari para donatur yang sudah memberi dengan tulus hatinya. Mencatat dengan jujur berarti kamu menghargai kepercayaan mereka. Ayo, buka buku catatan amanahmu!', visualTheme: 'amanah_book', audioSrc: '/audio/narration/level-14/scene-02.mp3' },
    ],
    gameConfig: {
      type: 'ledger',
      instruction: 'Catat setiap transaksi ke kolom yang tepat: Pemasukan atau Pengeluaran',
      startingBalance: 500,
      transactions: [
        { id: 'tx1', description: 'Donasi dari Pak Ahmad', amount: 100, type: 'income', hint: 'Uang masuk = Pemasukan' },
        { id: 'tx2', description: 'Beli sembako untuk posko', amount: 80, type: 'expense', hint: 'Uang keluar = Pengeluaran' },
        { id: 'tx3', description: 'Donasi online dari anonim', amount: 50, type: 'income', hint: 'Uang masuk lagi = Pemasukan' },
        { id: 'tx4', description: 'Ongkos kirim paket bantuan', amount: 20, type: 'expense', hint: 'Biaya operasional = Pengeluaran' },
        { id: 'tx5', description: 'Infak dari ibu-ibu pengajian', amount: 75, type: 'income', hint: 'Uang masuk = Pemasukan' },
      ],
      expectedFinalBalance: 625,
    },
    virtualCurrency: { initialCoins: 500, coinLabel: 'Koin Kas' },
    collectiveSimulation: { targetTotalCoins: 500, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'opt_catat_masuk', title: 'Pencatatan Donasi Masuk (Kuitansi Sah)', emoji: '📥', category: 'Pencatatan Kas', isPriority: true, isEssential: true, targetCoins: 40, minCost: 30, cost: 0, description: 'Pembukuan donasi Pak Ahmad & pengajian dengan nomor kuitansi resmi.' },
      { id: 'opt_catat_keluar', title: 'Pencatatan Belanja Sembako & Ongkir', emoji: '📤', category: 'Pencatatan Kas', isPriority: true, isEssential: true, targetCoins: 40, minCost: 30, cost: 0, description: 'Rincian nota belanja sembako posko dan ongkir secara transparan.' },
      { id: 'opt_rekonsiliasi', title: 'Rekonsiliasi Saldo Kas (625 Koin)', emoji: '📒', category: 'Akuntabilitas', isPriority: true, isEssential: true, targetCoins: 20, minCost: 10, cost: 0, description: 'Pencocokan saldo fisik dengan buku kas hingga nihil selisih.' },
    ],
    reflection: { question: 'Mengapa mencatat keuangan dengan jujur itu penting?', options: [{ id: 'ref14_1', text: 'Agar semua donatur bisa tahu dananya digunakan dengan benar.', isOptimal: true, feedbackText: 'Benar! Transparansi keuangan membangun kepercayaan.' }, { id: 'ref14_2', text: 'Agar kita punya bukti jika suatu saat ada yang protes.', isOptimal: false, feedbackText: 'Pencatatan untuk membangun kepercayaan, bukan sekadar berjaga-jaga.' }] },
  },
  {
    id: 15, worldId: 3, globalLevelIndex: 2,
    title: 'Detektif Bukti',
    theme: 'Audit Bukti',
    conceptType: 'Verifikasi', conceptEmoji: '🔍',
    pillarColor: 'cyan', gradientFrom: '#0891B2', gradientTo: '#A5F3FC', bgLight: '#ECFEFF',
    tagline: 'Periksa Setiap Bukti dengan Teliti',
    badgeId: 'badge_detektif_amanah', badgeTitle: 'Lencana Detektif Amanah', badgeEmoji: '🔍',
    badgeDescription: 'Matamu yang jeli berhasil menemukan semua bukti yang mencurigakan!',
    summaryLesson: 'Penjaga amanah yang baik juga memverifikasi setiap bukti transaksi.',
    nextLevelHint: 'Jembatan Rencana-Nyata menunggumu!',
    mechanic: 'evidence_check',
    learningObjective: 'Anak dapat mengidentifikasi bukti transaksi yang valid dan yang mencurigakan.',
    story: { location: 'Meja Audit Yayasan', narrative: 'Lima faktur pembelian masuk ke meja audit. Salah satunya terlihat mencurigakan. Periksa setiap faktur dengan teliti!', urgencyNote: 'Temukan faktur yang tidak sesuai sebelum laporan dikirim!', reportText: '"Audit berhasil! Faktur palsu berhasil ditemukan."', reportFrom: 'Kepala Audit Internal' },
    introScenes: [
      { id: 's15_1', title: 'Lima Faktur Masuk', speaker: 'Kepala Audit', narrativeText: 'Hati-hati, Petualang! Hari ini ada lima faktur pembelian yang masuk ke meja audit kita. Tugasmu adalah memeriksa setiap faktur satu per satu. Apakah semuanya benar dan sah? Atau ada yang mencurigakan? Pakailah matamu yang jeli dan jangan sampai ada yang terlewat!', subtitles: 'Hati-hati, Petualang! Hari ini ada lima faktur pembelian yang masuk ke meja audit kita. Tugasmu adalah memeriksa setiap faktur satu per satu. Apakah semuanya benar dan sah? Atau ada yang mencurigakan? Pakailah matamu yang jeli dan jangan sampai ada yang terlewat!', visualTheme: 'audit_desk', audioSrc: '/audio/narration/level-15/scene-01.mp3' },
      { id: 's15_2', title: 'Ciri Faktur Mencurigakan', speaker: 'Pohon Kebaikan', narrativeText: 'Psst! Aku punya tips untukmu, Detektif Cilik! Faktur yang baik dan sah punya empat ciri: Pertama, nama toko yang jelas dan lengkap. Kedua, tanggal yang masuk akal. Ketiga, jumlah harga yang sesuai rencana. Keempat, ada tanda tangan dari penjual. Kalau ada yang tidak beres, itu tanda faktur yang mencurigakan! Ayo selidiki semuanya!', subtitles: 'Psst! Aku punya tips untukmu, Detektif Cilik! Faktur yang baik dan sah punya empat ciri: Pertama, nama toko yang jelas dan lengkap. Kedua, tanggal yang masuk akal. Ketiga, jumlah harga yang sesuai rencana. Keempat, ada tanda tangan dari penjual. Kalau ada yang tidak beres, itu tanda faktur yang mencurigakan! Ayo selidiki semuanya!', visualTheme: 'invoice_check', audioSrc: '/audio/narration/level-15/scene-02.mp3' },
    ],
    gameConfig: {
      type: 'evidence_check',
      instruction: 'Periksa setiap faktur dan tandai: Valid atau Mencurigakan',
      invoices: [
        { id: 'inv1', vendor: 'Toko Sembako Pak Budi', date: '12 Oktober 2024', items: [{ name: 'Beras 50kg', price: 600000 }, { name: 'Minyak goreng 10L', price: 150000 }], total: 750000, signature: true, status: 'valid', notes: 'Semua detail lengkap dan masuk akal.' },
        { id: 'inv2', vendor: 'Toko Alat Tulis Maju', date: '12 Oktober 2024', items: [{ name: 'Buku tulis 100 pcs', price: 500000 }, { name: 'Pensil 50 lusin', price: 300000 }], total: 800000, signature: true, status: 'valid', notes: 'Detail lengkap, harga wajar.' },
        { id: 'inv3', vendor: 'Warung Makan Bahagia', date: '12 Oktober 2024', items: [{ name: 'Makan siang mewah 50 porsi', price: 2500000 }], total: 2500000, signature: false, status: 'suspicious', notes: 'Tidak ada tanda tangan, harga tidak wajar.' },
        { id: 'inv4', vendor: 'Apotek Sehat Bersama', date: '12 Oktober 2024', items: [{ name: 'Obat flu 100 strip', price: 250000 }, { name: 'Vitamin C 50 botol', price: 200000 }], total: 450000, signature: true, status: 'valid', notes: 'Semua valid, sesuai anggaran kesehatan.' },
        { id: 'inv5', vendor: '???', date: '32 Oktober 2024', items: [{ name: 'Barang tidak jelas', price: 999999 }], total: 999999, signature: false, status: 'suspicious', notes: 'Nama tidak jelas, tanggal tidak valid, tidak ada tanda tangan.' },
      ],
    },
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Audit' },
    collectiveSimulation: { targetTotalCoins: 100, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'opt_verif_sembako', title: 'Verifikasi Nota Toko Budi (Lengkap)', emoji: '🧾', category: 'Audit Bukti', isPriority: true, isEssential: true, targetCoins: 40, minCost: 30, cost: 0, description: 'Faktur beras dan minyak Rp750.000 berstempel dan bertanda tangan sah.' },
      { id: 'opt_verif_apotek', title: 'Verifikasi Resep Apotek Sehat Bersama', emoji: '💊', category: 'Audit Bukti', isPriority: true, isEssential: true, targetCoins: 35, minCost: 25, cost: 0, description: 'Kuitansi pembelian obat flu & vitamin berstempel resmi apotek.' },
      { id: 'opt_tolak_fiktif', title: 'Investigasi & Tolak Faktur Fiktif', emoji: '🚫', category: 'Pengawasan', isPriority: true, isEssential: true, targetCoins: 25, minCost: 15, cost: 0, description: 'Menolak klaim makan mewah dan faktur tanpa nama tanggal 32 Oktober.' },
    ],
    reflection: { question: 'Apa tanda faktur pembelian yang mencurigakan?', options: [{ id: 'ref15_1', text: 'Tidak ada tanda tangan, tanggal tidak valid, nama penjual tidak jelas, atau harga tidak wajar.', isOptimal: true, feedbackText: 'Tepat! Empat tanda tersebut adalah sinyal utama faktur bermasalah.' }, { id: 'ref15_2', text: 'Jika jumlahnya sangat besar, pasti mencurigakan.', isOptimal: false, feedbackText: 'Besar kecilnya jumlah bukan satu-satunya indikator.' }] },
  },
  {
    id: 16, worldId: 3, globalLevelIndex: 3,
    title: 'Jembatan Rencana-Nyata',
    theme: 'Evaluasi Anggaran',
    conceptType: 'Budget vs Actual', conceptEmoji: '📊',
    pillarColor: 'teal', gradientFrom: '#0F766E', gradientTo: '#5EEAD4', bgLight: '#F0FDFA',
    tagline: 'Bandingkan Rencana dan Kenyataan',
    badgeId: 'badge_analis_tepat', badgeTitle: 'Lencana Analis Tepat', badgeEmoji: '📊',
    badgeDescription: 'Kamu berhasil menganalisis selisih antara rencana dan realisasi!',
    summaryLesson: 'Evaluasi anggaran membantu kita belajar dari perbedaan antara rencana dan kenyataan.',
    nextLevelHint: 'Pemeriksa Klaim menunggumu!',
    mechanic: 'gap_analysis',
    learningObjective: 'Anak dapat membandingkan anggaran rencana dan realisasi, serta mengidentifikasi penyebab selisih.',
    story: { location: 'Ruang Evaluasi Program', narrative: 'Program bantuan bulan lalu sudah selesai. Saatnya membandingkan apa yang direncanakan dengan apa yang terjadi sesungguhnya.', urgencyNote: 'Temukan semua selisih antara rencana dan realisasi!', reportText: '"Evaluasi anggaran selesai. Selisih berhasil teridentifikasi!"', reportFrom: 'Tim Evaluasi Internal' },
    introScenes: [
      { id: 's16_1', title: 'Saatnya Evaluasi', speaker: 'Narator', narrativeText: 'Program sebulan penuh telah usai! Kini saatnya kita melakukan sesuatu yang sangat penting, yaitu evaluasi! Kita akan membandingkan apa yang sudah direncanakan di awal dengan apa yang benar-benar terjadi di lapangan. Apakah anggarannya sesuai? Apakah ada yang lebih hemat? Atau ada yang malah kelebihan biaya? Ayo kita selidiki bersama!', subtitles: 'Program sebulan penuh telah usai! Kini saatnya kita melakukan sesuatu yang sangat penting, yaitu evaluasi! Kita akan membandingkan apa yang sudah direncanakan di awal dengan apa yang benar-benar terjadi di lapangan. Apakah anggarannya sesuai? Apakah ada yang lebih hemat? Atau ada yang malah kelebihan biaya? Ayo kita selidiki bersama!', visualTheme: 'evaluation_room', audioSrc: '/audio/narration/level-16/scene-01.mp3' },
    ],
    gameConfig: {
      type: 'gap_analysis',
      instruction: 'Bandingkan anggaran dan realisasi. Identifikasi selisih dan pilih penjelasan yang tepat!',
      budgetItems: [
        { id: 'bg1', name: 'Pembelian Beras', planned: 500, actual: 480, difference: -20, explanations: [{ id: 'e1_a', text: 'Harga beras turun, beli lebih hemat', isCorrect: true }, { id: 'e1_b', text: 'Beras tidak jadi dibeli', isCorrect: false }] },
        { id: 'bg2', name: 'Biaya Transportasi', planned: 100, actual: 150, difference: 50, explanations: [{ id: 'e2_a', text: 'Harga BBM naik, biaya angkut lebih mahal', isCorrect: true }, { id: 'e2_b', text: 'Supir mengambil keuntungan lebih', isCorrect: false }] },
        { id: 'bg3', name: 'Obat-obatan', planned: 200, actual: 200, difference: 0, explanations: [{ id: 'e3_a', text: 'Anggaran digunakan tepat sesuai rencana', isCorrect: true }, { id: 'e3_b', text: 'Ada kesalahan pencatatan', isCorrect: false }] },
        { id: 'bg4', name: 'Honorarium Relawan', planned: 0, actual: 75, difference: 75, explanations: [{ id: 'e4_a', text: 'Kebutuhan tak terduga — relawan dari luar desa perlu ongkos transport', isCorrect: true }, { id: 'e4_b', text: 'Ada penyelewengan dana', isCorrect: false }] },
      ],
    },
    virtualCurrency: { initialCoins: 200, coinLabel: 'Koin Evaluasi' },
    collectiveSimulation: { targetTotalCoins: 200, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'opt_eval_sembako', title: 'Analisis Penghematan Pos Sembako', emoji: '📉', category: 'Evaluasi Anggaran', isPriority: true, isEssential: true, targetCoins: 40, minCost: 30, cost: 0, description: 'Efisiensi hemat 20 koin beras dialihkan menutup pos darurat.' },
      { id: 'opt_eval_transport', title: 'Penyesuaian Subsidi Biaya Angkut BBM', emoji: '⛽', category: 'Evaluasi Anggaran', isPriority: true, isEssential: true, targetCoins: 35, minCost: 25, cost: 0, description: 'Kompensasi kenaikan tarif BBM armada truk distribusi pelosok.' },
      { id: 'opt_eval_relawan', title: 'Honorarium Darurat Relawan Banjir', emoji: '🤝', category: 'Kebutuhan Nyata', isPriority: true, isEssential: true, targetCoins: 25, minCost: 15, cost: 0, description: 'Bantuan biaya transport tim relawan yang datang dari luar desa.' },
    ],
    reflection: { question: 'Mengapa penting membandingkan anggaran rencana dengan realisasi?', options: [{ id: 'ref16_1', text: 'Untuk memahami apa yang berjalan sesuai rencana dan apa yang perlu diperbaiki.', isOptimal: true, feedbackText: 'Tepat! Evaluasi adalah siklus belajar yang membuat program semakin baik.' }, { id: 'ref16_2', text: 'Untuk mencari siapa yang harus disalahkan atas selisih anggaran.', isOptimal: false, feedbackText: 'Tujuan evaluasi bukan mencari kambing hitam, tapi mencari pelajaran untuk perbaikan.' }] },
  },
  {
    id: 17, worldId: 3, globalLevelIndex: 4,
    title: 'Pemeriksa Klaim',
    theme: 'Verifikasi Data',
    conceptType: 'Data Verification', conceptEmoji: '✅',
    pillarColor: 'green', gradientFrom: '#15803D', gradientTo: '#86EFAC', bgLight: '#F0FDF4',
    tagline: 'Verifikasi Dulu, Percaya Kemudian',
    badgeId: 'badge_verifikator_jeli', badgeTitle: 'Lencana Verifikator Jeli', badgeEmoji: '✅',
    badgeDescription: 'Kamu berhasil memverifikasi semua klaim penerima bantuan dengan akurat!',
    summaryLesson: 'Verifikasi klaim memastikan bantuan diterima oleh yang benar-benar berhak.',
    nextLevelHint: 'Benteng Aset Wakaf menunggumu!',
    mechanic: 'fact_check',
    learningObjective: 'Anak memahami pentingnya verifikasi data penerima bantuan.',
    story: { location: 'Kantor Verifikasi Penerima', narrative: 'Lima orang mendaftar sebagai penerima bantuan. Setiap orang membawa dokumen pendukung.', urgencyNote: 'Hanya yang memenuhi syarat yang boleh menerima bantuan!', reportText: '"Proses verifikasi selesai. Bantuan berhasil disalurkan kepada yang benar-benar berhak."', reportFrom: 'Koordinator Penyaluran' },
    introScenes: [
      { id: 's17_1', title: 'Lima Pendaftar Bantuan', speaker: 'Koordinator', narrativeText: 'Perhatian, Penjaga Amanah! Hari ini ada lima orang yang mendaftar sebagai penerima bantuan. Setiap orang membawa dokumen pendukung masing-masing. Tugasmu adalah memeriksa dengan teliti dan adil apakah klaim mereka benar sesuai bukti. Hanya yang benar-benar berhak yang boleh menerima bantuan ini. Siap memeriksa?', subtitles: 'Perhatian, Penjaga Amanah! Hari ini ada lima orang yang mendaftar sebagai penerima bantuan. Setiap orang membawa dokumen pendukung masing-masing. Tugasmu adalah memeriksa dengan teliti dan adil apakah klaim mereka benar sesuai bukti. Hanya yang benar-benar berhak yang boleh menerima bantuan ini. Siap memeriksa?', visualTheme: 'verification_office', audioSrc: '/audio/narration/level-17/scene-01.mp3' },
    ],
    gameConfig: {
      type: 'fact_check',
      instruction: 'Periksa klaim setiap pendaftar: Lolos atau Tidak Lolos',
      applicants: [
        { id: 'ap1', name: 'Bu Siti (Janda, 3 anak)', claim: 'Tidak memiliki penghasilan tetap', evidence: ['KTP valid', 'Surat keterangan tidak mampu dari RT', 'Kartu keluarga 3 anak'], verdict: 'approve', explanation: 'Semua dokumen lengkap dan konsisten.' },
        { id: 'ap2', name: 'Pak Joko (Petani)', claim: 'Sawah rusak akibat banjir', evidence: ['Foto sawah yang banjir', 'Surat keterangan dari kepala desa', 'KTP sesuai alamat'], verdict: 'approve', explanation: 'Bukti foto dan surat keterangan mendukung klaim.' },
        { id: 'ap3', name: 'Andi (Mahasiswa)', claim: 'Keluarga sangat miskin', evidence: ['KTM aktif universitas swasta mahal', 'Tidak ada surat keterangan tidak mampu', 'Foto media sosial bergaya hidup mewah'], verdict: 'reject', explanation: 'Bukti bertentangan dengan klaim.' },
        { id: 'ap4', name: 'Nenek Aminah (75 tahun)', claim: 'Lansia sebatang kara', evidence: ['KTP usia 75 tahun valid', 'Surat RT menyatakan tinggal sendirian', 'Tetangga mengonfirmasi klaim'], verdict: 'approve', explanation: 'Tiga sumber bukti konsisten mendukung klaim.' },
        { id: 'ap5', name: 'Pemuda Tanpa Nama', claim: 'Membutuhkan bantuan mendesak', evidence: ['Tidak membawa KTP', 'Tidak bisa menyebutkan alamat jelas', 'Tidak ada surat keterangan apapun'], verdict: 'reject', explanation: 'Tanpa identitas, klaim tidak bisa diverifikasi.' },
      ],
    },
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Verifikasi' },
    collectiveSimulation: { targetTotalCoins: 100, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'opt_lolos_nenek', title: 'Validasi Berkas Nenek Aminah (75 Thn)', emoji: '👵', category: 'Verifikasi Berhak', isPriority: true, isEssential: true, targetCoins: 40, minCost: 30, cost: 0, description: 'Lansia sebatang kara terverifikasi surat RT dan survei lingkungan.' },
      { id: 'opt_lolos_siti', title: 'Validasi Berkas Bu Siti (Janda 3 Anak)', emoji: '👩‍👧‍👦', category: 'Verifikasi Berhak', isPriority: true, isEssential: true, targetCoins: 35, minCost: 25, cost: 0, description: 'Surat keterangan tidak mampu dan KK terbukti sah tanpa penghasilan.' },
      { id: 'opt_lolos_joko', title: 'Validasi Berkas Pak Joko (Petani Banjir)', emoji: '🌾', category: 'Verifikasi Berhak', isPriority: true, isEssential: true, targetCoins: 25, minCost: 15, cost: 0, description: 'Foto sawah terendam dan pengantar Kades mengonfirmasi gagal panen.' },
    ],
    reflection: { question: 'Mengapa verifikasi klaim penting meski bisa membuat beberapa orang kecewa?', options: [{ id: 'ref17_1', text: 'Karena bantuan harus tepat sasaran kepada yang benar-benar membutuhkan.', isOptimal: true, feedbackText: 'Benar! Ketepatan sasaran adalah bentuk keadilan bagi semua pihak.' }, { id: 'ref17_2', text: 'Supaya kita terlihat tegas dan tidak bisa dibohongi.', isOptimal: false, feedbackText: 'Verifikasi bukan soal kesan tegas, tapi soal keadilan dan amanah.' }] },
  },
  {
    id: 18, worldId: 3, globalLevelIndex: 5,
    title: 'Benteng Aset Wakaf',
    theme: 'Penjagaan Aset',
    conceptType: 'Asset Protection', conceptEmoji: '🏰',
    pillarColor: 'rose', gradientFrom: '#BE123C', gradientTo: '#FDA4AF', bgLight: '#FFF1F2',
    tagline: 'Jaga Aset Kebaikan dari Segala Ancaman',
    badgeId: 'badge_penjaga_benteng', badgeTitle: 'Lencana Penjaga Benteng', badgeEmoji: '🏰',
    badgeDescription: 'Kamu berhasil menjaga aset wakaf dari semua ancaman!',
    summaryLesson: 'Menjaga aset wakaf adalah tanggung jawab nadzir agar manfaatnya terus mengalir.',
    nextLevelHint: 'Laporan Dampak sudah siap dievaluasi!',
    mechanic: 'defense_puzzle',
    learningObjective: 'Anak memahami tanggung jawab menjaga dan melindungi aset wakaf.',
    story: { location: 'Komplek Wakaf Desa', narrative: 'Komplek wakaf desa sedang menghadapi tiga ancaman sekaligus. Kamu harus memilih strategi pertahanan yang tepat!', urgencyNote: 'Lindungi semua aset wakaf dari tiga ancaman!', reportText: '"Semua aset wakaf berhasil dilindungi! Generasi mendatang masih akan merasakan manfaatnya."', reportFrom: 'Dewan Nadzir Wakaf' },
    introScenes: [
      { id: 's18_1', title: 'Tiga Ancaman Sekaligus', speaker: 'Kepala Nadzir', narrativeText: 'Waspada, Penjaga Amanah! Komplek wakaf desa kita sedang dalam bahaya! Ada tiga ancaman yang datang bersamaan! Pertama, ada oknum nakal yang ingin menjual tanah wakaf dengan dokumen palsu! Kedua, bangunan perpustakaan wakaf sudah rusak dan bocor sejak dua tahun lalu! Ketiga, tetangga mulai memindahkan patok batas tanah wakaf secara diam-diam! Kamu harus memilih strategi pertahanan yang tepat untuk setiap ancaman ini! Dapatkah kamu melindungi amanah ini?', subtitles: 'Waspada, Penjaga Amanah! Komplek wakaf desa kita sedang dalam bahaya! Ada tiga ancaman yang datang bersamaan! Pertama, ada oknum nakal yang ingin menjual tanah wakaf dengan dokumen palsu! Kedua, bangunan perpustakaan wakaf sudah rusak dan bocor sejak dua tahun lalu! Ketiga, tetangga mulai memindahkan patok batas tanah wakaf secara diam-diam! Kamu harus memilih strategi pertahanan yang tepat untuk setiap ancaman ini! Dapatkah kamu melindungi amanah ini?', visualTheme: 'waqf_threats', audioSrc: '/audio/narration/level-18/scene-01.mp3' },
    ],
    gameConfig: {
      type: 'defense_puzzle',
      instruction: 'Pilih tindakan perlindungan yang tepat untuk setiap ancaman!',
      threats: [
        { id: 'threat1', type: 'legal', name: 'Oknum Ingin Jual Tanah Wakaf', emoji: '⚖️', description: 'Seseorang mengklaim bisa menjual sebagian tanah wakaf dengan dokumen palsu.', actions: [{ id: 'a1_1', text: 'Laporkan ke KUA dan minta verifikasi sertifikat wakaf resmi', isCorrect: true, reason: 'Jalur hukum resmi adalah cara terbaik.' }, { id: 'a1_2', text: 'Negosiasi langsung dan minta uang tutup mulut', isCorrect: false, reason: 'Tidak etis.' }, { id: 'a1_3', text: 'Biarkan saja', isCorrect: false, reason: 'Pembiaran bisa membuat aset hilang.' }] },
        { id: 'threat2', type: 'maintenance', name: 'Bangunan Perpustakaan Rusak', emoji: '🔧', description: 'Atap perpustakaan wakaf bocor dan tidak diperbaiki sejak 2 tahun.', actions: [{ id: 'a2_1', text: 'Gunakan hasil pengelolaan wakaf untuk renovasi sesuai prosedur', isCorrect: true, reason: 'Nadzir berwenang menggunakan hasil wakaf untuk pemeliharaan.' }, { id: 'a2_2', text: 'Tutup perpustakaan selamanya', isCorrect: false, reason: 'Manfaatnya hilang.' }, { id: 'a2_3', text: 'Jual sebagian tanah untuk biaya renovasi', isCorrect: false, reason: 'Tanah wakaf tidak boleh dijual.' }] },
        { id: 'threat3', type: 'boundary', name: 'Sengketa Batas Tanah', emoji: '🗺️', description: 'Tetangga mulai memindahkan patok batas tanah wakaf secara diam-diam.', actions: [{ id: 'a3_1', text: 'Pasang tanda wakaf resmi dan dokumentasikan batas dengan sertifikat', isCorrect: true, reason: 'Dokumentasi resmi adalah bukti hukum terkuat.' }, { id: 'a3_2', text: 'Konfrontasi langsung dan ancam tetangga', isCorrect: false, reason: 'Tidak efektif tanpa bukti hukum.' }, { id: 'a3_3', text: 'Relakan saja', isCorrect: false, reason: 'Merelakan aset yang diambil tanpa hak tidak sesuai tanggung jawab nadzir.' }] },
      ],
    },
    virtualCurrency: { initialCoins: 150, coinLabel: 'Koin Penjagaan' },
    collectiveSimulation: { targetTotalCoins: 150, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'opt_legal_sertifikat', title: 'Advokasi & Sertifikasi Wakaf ke KUA', emoji: '⚖️', category: 'Proteksi Hukum', isPriority: true, isEssential: true, targetCoins: 60, minCost: 45, cost: 0, description: 'Mengamankan akta ikrar wakaf dari ancaman penyerobotan oknum.' },
      { id: 'opt_renovasi_gedung', title: 'Perawatan Bangunan Perpustakaan', emoji: '🏛️', category: 'Pemeliharaan Aset', isPriority: true, isEssential: true, targetCoins: 50, minCost: 35, cost: 0, description: 'Renovasi atap bocor menggunakan hasil kelola wakaf produktif.' },
      { id: 'opt_patok_pagar', title: 'Pemasangan Plang & Patok Batas Wakaf', emoji: '🚧', category: 'Keamanan Fisik', isPriority: true, isEssential: true, targetCoins: 40, minCost: 25, cost: 0, description: 'Menegakkan tanda batas resmi agar patok tidak digeser tetangga.' },
    ],
    reflection: { question: 'Siapa yang bertanggung jawab menjaga aset wakaf?', options: [{ id: 'ref18_1', text: 'Nadzir (pengelola wakaf) yang ditunjuk untuk memastikan aset terjaga.', isOptimal: true, feedbackText: 'Tepat! Nadzir adalah penjaga amanah yang bertanggung jawab.' }, { id: 'ref18_2', text: 'Semua orang di desa secara sukarela tanpa ada yang bertanggung jawab khusus.', isOptimal: false, feedbackText: 'Tanggung jawab tanpa kejelasan sering berakhir tidak ada yang bertanggung jawab.' }] },
  },
  {
    id: 19, worldId: 3, globalLevelIndex: 6,
    title: 'Laporan Dampak',
    theme: 'Evaluasi Dampak',
    conceptType: 'Impact Evaluation', conceptEmoji: '📈',
    pillarColor: 'sky', gradientFrom: '#0369A1', gradientTo: '#7DD3FC', bgLight: '#F0F9FF',
    tagline: 'Ukur dan Laporkan Kebaikan yang Nyata',
    badgeId: 'badge_pelapor_jujur', badgeTitle: 'Lencana Pelapor Jujur', badgeEmoji: '📈',
    badgeDescription: 'Kamu berhasil menyusun laporan dampak yang jujur dan bermakna!',
    summaryLesson: 'Laporan dampak yang jujur adalah bentuk pertanggungjawaban tertinggi kepada donatur.',
    nextLevelHint: 'Misi Akhir Terpadu menunggumu — puncak perjalananmu!',
    mechanic: 'report_builder',
    learningObjective: 'Anak dapat menyusun laporan dampak program yang mencakup capaian, kendala, dan rekomendasi.',
    story: { location: 'Meja Laporan Akhir', narrative: 'Program tiga bulan telah selesai. Saatnya membuat laporan dampak yang jujur dan lengkap untuk dikirim kepada donatur.', urgencyNote: 'Susun laporan yang jujur dan lengkap!', reportText: '"Laporan dampak diterima dengan sangat baik. Donatur terkesan dengan kejujuran laporan ini."', reportFrom: 'Forum Donatur Program' },
    introScenes: [
      { id: 's19_1', title: 'Laporan Bukan Sekadar Angka', speaker: 'Pohon Kebaikan', narrativeText: 'Teman, sebentar! Sebelum kamu membuat laporan, aku ingin berbagi sesuatu yang penting. Laporan yang baik bukan hanya tentang keberhasilan saja. Mencatat kegagalan dan pelajaran yang dipetik sama pentingnya! Kenapa? Karena kejujuran dalam laporan membangun kepercayaan jangka panjang dari para donatur. Dan dari kegagalan kita bisa belajar untuk menjadi lebih baik di masa depan! Ayo susun laporanmu dengan jujur dan lengkap!', subtitles: 'Teman, sebentar! Sebelum kamu membuat laporan, aku ingin berbagi sesuatu yang penting. Laporan yang baik bukan hanya tentang keberhasilan saja. Mencatat kegagalan dan pelajaran yang dipetik sama pentingnya! Kenapa? Karena kejujuran dalam laporan membangun kepercayaan jangka panjang dari para donatur. Dan dari kegagalan kita bisa belajar untuk menjadi lebih baik di masa depan! Ayo susun laporanmu dengan jujur dan lengkap!', visualTheme: 'report_desk', audioSrc: '/audio/narration/level-19/scene-01.mp3' },
    ],
    gameConfig: {
      type: 'report_builder',
      instruction: 'Pilih komponen laporan terbaik untuk setiap bagian!',
      sections: [
        { sectionId: 'achievement', label: 'Capaian Program', emoji: '🏆', question: 'Bagaimana cara terbaik melaporkan capaian?', options: [{ id: 'ach_1', text: 'Data kuantitatif: 150 keluarga terbantu, 95% target tercapai', score: 95 }, { id: 'ach_2', text: 'Cerita saja: program berjalan dengan baik dan lancar', score: 40 }, { id: 'ach_3', text: 'Hanya foto-foto kegiatan tanpa data', score: 30 }] },
        { sectionId: 'challenge', label: 'Kendala & Tantangan', emoji: '⚠️', question: 'Apa yang sebaiknya dilaporkan tentang kendala?', options: [{ id: 'ch_1', text: 'Semua kendala yang terjadi beserta penjelasan dan solusi yang diambil', score: 95 }, { id: 'ch_2', text: 'Tidak perlu melaporkan kendala agar donatur tidak kecewa', score: 10 }, { id: 'ch_3', text: 'Hanya kendala yang sudah berhasil diselesaikan', score: 50 }] },
        { sectionId: 'finance', label: 'Laporan Keuangan', emoji: '💰', question: 'Bagaimana format laporan keuangan yang baik?', options: [{ id: 'fin_1', text: 'Rincian pemasukan, pengeluaran per pos, dan saldo akhir dengan bukti', score: 95 }, { id: 'fin_2', text: 'Total pemasukan dan total pengeluaran saja', score: 50 }, { id: 'fin_3', text: 'Cukup bilang dana sudah habis terpakai semua', score: 5 }] },
        { sectionId: 'recommendation', label: 'Rekomendasi ke Depan', emoji: '🔮', question: 'Apa isi rekomendasi yang baik?', options: [{ id: 'rec_1', text: 'Saran konkret berdasarkan pelajaran yang dipetik', score: 95 }, { id: 'rec_2', text: 'Permintaan anggaran yang lebih besar', score: 30 }, { id: 'rec_3', text: 'Tidak perlu rekomendasi', score: 10 }] },
      ],
    },
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Laporan' },
    collectiveSimulation: { targetTotalCoins: 100, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'opt_lapor_capaian', title: 'Publikasi Data Capaian 150 Keluarga', emoji: '📈', category: 'Laporan Pokok', isPriority: true, isEssential: true, targetCoins: 40, minCost: 30, cost: 0, description: 'Laporan angka terukur: 95% target penerima bantuan tercapai.' },
      { id: 'opt_lapor_keuangan', title: 'Lampiran Rincian Kas & Nota Pembelian', emoji: '📑', category: 'Laporan Pokok', isPriority: true, isEssential: true, targetCoins: 35, minCost: 25, cost: 0, description: 'Laporan keuangan per pos belanja beserta bukti kuitansi terlampir.' },
      { id: 'opt_lapor_kendala', title: 'Dokumentasi Kendala & Rekomendasi Jujur', emoji: '💡', category: 'Evaluasi Pembelajaran', isPriority: true, isEssential: true, targetCoins: 25, minCost: 15, cost: 0, description: 'Pemaparan kendala cuaca dan solusi perbaikan program berikutnya.' },
    ],
    reflection: { question: 'Mengapa laporan dampak yang jujur lebih berharga?', options: [{ id: 'ref19_1', text: 'Karena kejujuran membangun kepercayaan jangka panjang dan memungkinkan perbaikan nyata.', isOptimal: true, feedbackText: 'Benar! Kepercayaan yang dibangun dengan kejujuran jauh lebih kuat.' }, { id: 'ref19_2', text: 'Karena jika terlihat sempurna, donatur akan curiga.', isOptimal: false, feedbackText: 'Bukan soal kecurigaan, tapi soal nilai kejujuran dan pembelajaran.' }] },
  },
  {
    id: 20, worldId: 3, globalLevelIndex: 7,
    title: 'Misi Akhir Terpadu',
    theme: 'Integrasi Semua Kompetensi',
    conceptType: 'Grand Finale', conceptEmoji: '🌟',
    pillarColor: 'gold', gradientFrom: '#92400E', gradientTo: '#FDE68A', bgLight: '#FFFBEB',
    tagline: 'Gabungkan Semua yang Telah Kamu Pelajari',
    badgeId: 'badge_penjaga_amanah_utama', badgeTitle: 'Lencana Penjaga Amanah Utama', badgeEmoji: '🌟',
    badgeDescription: 'Kamu telah menyelesaikan seluruh perjalanan SADAQIDS! Kamu adalah Penjaga Amanah Sejati!',
    summaryLesson: 'Seorang Penjaga Amanah Utama menguasai seluruh siklus: mengenal, merancang, melaksanakan, mencatat, memverifikasi, menjaga, dan melaporkan.',
    nextLevelHint: null,
    mechanic: 'multi_stage',
    learningObjective: 'Anak dapat mengintegrasikan seluruh kompetensi literasi keuangan sosial syariah.',
    story: { location: 'Yayasan Kebaikan Nusantara', narrative: 'Yayasan kebaikan besar menghadapi tantangan terbesar: krisis multi-dimensi yang membutuhkan semua keahlianmu.', urgencyNote: 'Selesaikan tiga tahap misi dengan semua kemampuanmu!', reportText: '"LUAR BIASA! Kamu telah menyelesaikan Misi Akhir Terpadu dengan gemilang!"', reportFrom: 'Pohon Kebaikan' },
    introScenes: [
      { id: 's20_1', title: 'Puncak Perjalanan', speaker: 'Pohon Kebaikan', narrativeText: 'Petualang Kebaikan! Inilah... momen yang paling kamu tunggu-tunggu. Kamu sudah melewati perjalanan yang sangat panjang dan luar biasa! Dari Dusun Pelangi hingga Meja Laporan Akhir. Dari sedekah kecil hingga menjaga amanah yang besar. Dan sekarang semua yang telah kamu pelajari akan diuji dalam satu misi besar terakhir! Kamu... siap?', subtitles: 'Petualang Kebaikan! Inilah... momen yang paling kamu tunggu-tunggu. Kamu sudah melewati perjalanan yang sangat panjang dan luar biasa! Dari Dusun Pelangi hingga Meja Laporan Akhir. Dari sedekah kecil hingga menjaga amanah yang besar. Dan sekarang semua yang telah kamu pelajari akan diuji dalam satu misi besar terakhir! Kamu... siap?', visualTheme: 'grand_finale', audioSrc: '/audio/narration/level-20/scene-01.mp3' },
      { id: 's20_2', title: 'Tiga Tahap Misi', speaker: 'Pohon Kebaikan', narrativeText: 'Misi Akhir Terpadu punya tiga tahap! Tahap Pertama — Identifikasi. Gunakan kemampuanmu untuk mengenali kebutuhan yang paling mendesak. Tahap Kedua — Alokasi. Bagi tiga ratus koin ke empat pos bantuan dengan bijaksana. Tahap Ketiga — Pertanggungjawaban. Susun laporan dampak yang jujur dan lengkap. Ini adalah ujian sesungguhnya bagi seorang Penjaga Amanah Sejati! Ayo buktikan kemampuanmu!', subtitles: 'Misi Akhir Terpadu punya tiga tahap! Tahap Pertama — Identifikasi. Gunakan kemampuanmu untuk mengenali kebutuhan yang paling mendesak. Tahap Kedua — Alokasi. Bagi tiga ratus koin ke empat pos bantuan dengan bijaksana. Tahap Ketiga — Pertanggungjawaban. Susun laporan dampak yang jujur dan lengkap. Ini adalah ujian sesungguhnya bagi seorang Penjaga Amanah Sejati! Ayo buktikan kemampuanmu!', visualTheme: 'three_stages', audioSrc: '/audio/narration/level-20/scene-02.mp3' },
    ],
    gameConfig: {
      type: 'multi_stage',
      stages: [
        { stageId: 'identify', label: 'Tahap 1: Identifikasi', emoji: '🔍', mechanic: 'drag_sort', description: 'Pilah kebutuhan yang harus segera ditangani.' },
        { stageId: 'allocate', label: 'Tahap 2: Alokasi', emoji: '💰', mechanic: 'budget_slider', description: 'Alokasikan 300 Koin ke empat pos bantuan.', totalBudget: 300 },
        { stageId: 'report', label: 'Tahap 3: Pertanggungjawaban', emoji: '📊', mechanic: 'report_builder', description: 'Susun laporan dampak terpadu.' },
      ],
    },
    virtualCurrency: { initialCoins: 300, coinLabel: 'Koin Kebaikan' },
    collectiveSimulation: { targetTotalCoins: 300, communityInitialCoins: 0, communityDonorNote: '' },
    aidOptions: [
      { id: 'opt_pilar_pendidikan', title: 'Pendidikan & Beasiswa Anak Bangsa', emoji: '🎓', category: 'Pilar Utama', isPriority: true, isEssential: true, targetCoins: 90, minCost: 70, cost: 0, description: 'Beasiswa dan fasilitas belajar anak-anak pelosok negeri.' },
      { id: 'opt_pilar_kesehatan', title: 'Gizi Balita & Layanan Sehat Posko', emoji: '🏥', category: 'Pilar Utama', isPriority: true, isEssential: true, targetCoins: 90, minCost: 70, cost: 0, description: 'Intervensi nutrisi stunting dan pengobatan gratis warga miskin.' },
      { id: 'opt_pilar_wakaf', title: 'Pengembangan Wakaf Air & Sarana Umat', emoji: '🌱', category: 'Pilar Utama', isPriority: true, isEssential: true, targetCoins: 70, minCost: 50, cost: 0, description: 'Sumur bor abadi dan instalasi air bersih berkelanjutan.' },
      { id: 'opt_pilar_amanah', title: 'Audit Bukti & Cadangan Tanggap Siaga', emoji: '🛡️', category: 'Pilar Utama', isPriority: true, isEssential: true, targetCoins: 50, minCost: 30, cost: 0, description: 'Sistem pembukuan jujur dan dana siaga bencana darurat.' },
    ],
    reflection: { question: 'Apa makna terdalam dari perjalanan SADAQIDS yang telah kamu selesaikan?', options: [{ id: 'ref20_1', text: 'Kebaikan yang nyata lahir dari pengetahuan, perencanaan, tindakan, dan pertanggungjawaban yang jujur.', isOptimal: true, feedbackText: 'Sempurna! Kamu telah membuktikan bahwa berbuat baik pun perlu ilmu, rencana, dan amanah. Selamat, Penjaga Amanah Sejati! 🌟' }, { id: 'ref20_2', text: 'Yang penting sudah berbuat baik, tidak perlu terlalu dipikirkan prosesnya.', isOptimal: false, feedbackText: 'Perjalanan ini mengajarkan bahwa niat baik saja tidak cukup. Proses yang benar adalah bagian dari kebaikan itu sendiri.' }] },
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
export function getWorldById(worldId) {
  return WORLDS_CONFIG.find((w) => w.worldId === worldId) || null;
}

export function getLevelNumberInWorld(mission) {
  if (!mission) return 1;
  if (typeof mission.levelNumber === 'number') return mission.levelNumber;
  if (typeof mission.globalLevelIndex === 'number') return mission.globalLevelIndex;
  const wId = mission.worldId || (mission.id <= 6 ? 1 : mission.id <= 13 ? 2 : 3);
  if (wId === 2 || (mission.id >= 7 && mission.id <= 13)) return mission.id - 6;
  if (wId === 3 || (mission.id >= 14 && mission.id <= 20)) return mission.id - 13;
  return mission.id || 1;
}

export function getLevelsByWorldId(worldId, world1Levels = MISSIONS_DATA) {
  const sourceWorld1 = (Array.isArray(world1Levels) && world1Levels.length > 0 && world1Levels[0]?.id === 1)
    ? world1Levels
    : MISSIONS_DATA;

  if (worldId === 1) {
    return sourceWorld1.map((l, idx) => ({
      ...l,
      worldId: 1,
      globalLevelIndex: idx + 1,
      levelNumber: idx + 1,
    }));
  }
  if (worldId === 2) {
    return WORLD2_LEVELS.map((l, idx) => ({
      ...l,
      worldId: 2,
      globalLevelIndex: l.globalLevelIndex || idx + 1,
      levelNumber: l.globalLevelIndex || idx + 1,
    }));
  }
  if (worldId === 3) {
    return WORLD3_LEVELS.map((l, idx) => ({
      ...l,
      worldId: 3,
      globalLevelIndex: l.globalLevelIndex || idx + 1,
      levelNumber: l.globalLevelIndex || idx + 1,
    }));
  }
  return [];
}

export function getAllLevels(world1Levels = MISSIONS_DATA) {
  const sourceWorld1 = (Array.isArray(world1Levels) && world1Levels.length > 0 && world1Levels[0]?.id === 1)
    ? world1Levels
    : MISSIONS_DATA;

  const normalizedWorld1 = sourceWorld1.map((l, idx) => ({
    ...l,
    worldId: 1,
    globalLevelIndex: idx + 1,
    levelNumber: idx + 1,
  }));
  const normalizedWorld2 = WORLD2_LEVELS.map((l, idx) => ({
    ...l,
    worldId: 2,
    globalLevelIndex: l.globalLevelIndex || idx + 1,
    levelNumber: l.globalLevelIndex || idx + 1,
  }));
  const normalizedWorld3 = WORLD3_LEVELS.map((l, idx) => ({
    ...l,
    worldId: 3,
    globalLevelIndex: l.globalLevelIndex || idx + 1,
    levelNumber: l.globalLevelIndex || idx + 1,
  }));
  return [...normalizedWorld1, ...normalizedWorld2, ...normalizedWorld3];
}

export function getLevelById(levelId, world1Levels = MISSIONS_DATA) {
  return getAllLevels(world1Levels).find((l) => l.id === levelId) || null;
}

export function isWorldUnlocked(worldId, completedLevels = []) {
  const safeCompleted = Array.isArray(completedLevels) ? completedLevels : [];
  const world = WORLDS_CONFIG.find((w) => w.worldId === worldId);
  if (!world) return false;
  if (!world.unlockCondition) return true;

  const { worldId: reqWorldId, minLevelsCompleted } = world.unlockCondition;
  const reqWorld = WORLDS_CONFIG.find((w) => w.worldId === reqWorldId);
  if (!reqWorld) return false;

  const completedInReqWorld = reqWorld.levelIds.filter((id) => safeCompleted.includes(id));
  return completedInReqWorld.length >= minLevelsCompleted;
}

export function isLevelUnlocked(levelId, completedLevels = [], world1Levels = MISSIONS_DATA) {
  const safeCompleted = Array.isArray(completedLevels) ? completedLevels : [];

  // Jika level sudah pernah diselesaikan, selalu terbuka untuk dimainkan ulang
  if (safeCompleted.includes(levelId)) return true;

  // Level 1 di Dunia 1 selalu terbuka untuk siapa saja
  if (levelId === 1) return true;

  const allLevels = getAllLevels(world1Levels);
  const level = allLevels.find((l) => l.id === levelId);

  // Fallback jika tidak ditemukan di list: cek ID berurutan
  if (!level) {
    return levelId === 1 || safeCompleted.includes(levelId - 1);
  }

  const worldId = level.worldId || (levelId <= 6 ? 1 : levelId <= 13 ? 2 : 3);
  if (!isWorldUnlocked(worldId, safeCompleted)) return false;

  const levelIndex =
    level.levelNumber ||
    level.globalLevelIndex ||
    (worldId === 1 ? levelId : worldId === 2 ? levelId - 6 : levelId - 13);

  // Level pertama di setiap dunia yang terbuka selalu dapat dimainkan
  if (levelIndex === 1) return true;

  // Level sebelumnya dalam dunia yang sama harus sudah selesai
  const prevLevel = allLevels.find(
    (l) =>
      (l.worldId || (l.id <= 6 ? 1 : l.id <= 13 ? 2 : 3)) === worldId &&
      (l.levelNumber || l.globalLevelIndex || (worldId === 1 ? l.id : worldId === 2 ? l.id - 6 : l.id - 13)) ===
        levelIndex - 1
  );

  if (!prevLevel) return true;
  return safeCompleted.includes(prevLevel.id);
}


// ============================================================================
// HELPER NORMALISASI OPSI BANTUAN (KONSISTEN UNTUK SEMUA LEVEL)
// ============================================================================
export function normalizeAidOptions(mission) {
  if (!mission) return [];
  const rawOptions = (mission.aidOptions && mission.aidOptions.length > 0)
    ? mission.aidOptions
    : [];

  const initialCoins = mission.virtualCurrency?.initialCoins || 100;

  if (rawOptions.length > 0) {
    return rawOptions.map((opt, idx) => {
      const isEssential = Boolean(
        opt.isEssential ??
        opt.isPriority ??
        (opt.category === 'Kebutuhan Pokok' || opt.category === 'need')
      );
      const title = opt.title || opt.label || `Opsi ${idx + 1}`;
      const targetCoins = opt.targetCoins || opt.cost || (isEssential ? 40 : 20);
      const minCost = opt.minCost !== undefined
        ? opt.minCost
        : (isEssential ? Math.max(10, Math.floor(targetCoins * 0.5)) : 0);

      return {
        id: opt.id || `opt_${idx}`,
        title,
        label: title,
        emoji: opt.emoji || '📦',
        description: opt.description || opt.reason || '',
        category: opt.category || (isEssential ? 'Kebutuhan Pokok' : 'Opsi Tambahan'),
        isEssential,
        isPriority: isEssential,
        minCost,
        targetCoins,
        cost: opt.cost !== undefined ? opt.cost : 0,
        unitName: opt.unitName || 'Paket',
      };
    });
  }

  // Fallback pengaman jika ada data level yang belum memiliki aidOptions
  const thirds = Math.floor(initialCoins / 3);
  return [
    {
      id: 'opt_pokok',
      title: 'Kebutuhan Pokok Misi',
      label: 'Kebutuhan Pokok Misi',
      emoji: '📦',
      description: 'Penyaluran kebutuhan pokok dan mendesak untuk warga.',
      category: 'Kebutuhan Pokok',
      isEssential: true,
      isPriority: true,
      minCost: Math.floor(thirds * 0.7),
      targetCoins: thirds * 2,
      cost: 0,
    },
    {
      id: 'opt_pendukung',
      title: 'Dukungan Operasional Lapangan',
      label: 'Dukungan Operasional Lapangan',
      emoji: '💼',
      description: 'Transportasi dan perlengkapan relawan di lapangan.',
      category: 'Operasional',
      isEssential: false,
      isPriority: false,
      minCost: 0,
      targetCoins: thirds,
      cost: 0,
    },
  ];
}
