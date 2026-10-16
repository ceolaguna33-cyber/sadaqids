// Data Misi Edukatif SADAQIDS — 6 Level Penuh
// Setiap level memiliki tema, cerita, mekanik, dan refleksi yang unik

export const MISSIONS_DATA = [
  // =========================================================================
  // LEVEL 1: Dusun Pelangi — Sedekah (Kebutuhan Belajar)
  // =========================================================================
  {
    id: 1,
    title: 'Dusun Pelangi',
    theme: 'Pendidikan',
    conceptType: 'Sedekah',
    conceptEmoji: '📚',
    pillarColor: 'purple',
    gradientFrom: '#7C3AED',
    gradientTo: '#A78BFA',
    bgLight: '#F5F3FF',
    tagline: 'Membantu Sahabat Kembali Belajar',
    badgeId: 'badge_pahlawan_belajar',
    badgeTitle: 'Lencana Pahlawan Belajar',
    badgeEmoji: '📖',
    badgeDescription: 'Kamu berhasil memilih kebutuhan utama agar teman-teman bisa segera belajar kembali!',
    summaryLesson:
      'Kamu belajar mendahulukan kebutuhan belajar yang paling mendesak. Tindakan bijakmu membuat Pohon Kebaikan tumbuh menjadi Ranting Ceria!',
    nextLevelHint: 'Kampung Sehat menunggu petualanganmu!',
    story: {
      location: 'Sekolah Desa Dusun Pelangi',
      narrative:
        'Air hujan baru saja merembes ke ruang kelas Dusun Pelangi. Buku pelajaran dan perlengkapan sekolah teman-teman basah kuyup, padahal minggu depan ujian sekolah dimulai!',
      urgencyNote: 'Kebutuhan belajar sangat mendesak agar adik-adik tidak tertinggal pelajaran.',
      reportText:
        '"Alhamdulillah! Paket buku pelajaran dan perlengkapan sekolah telah diterima adik-adik kelas dengan penuh suka cita. Sekarang mereka siap menyambut ujian sekolah dengan riang dan bersemangat!"',
      reportFrom: 'Bu Guru Sari, Wali Kelas Dusun Pelangi',
    },
    introScenes: [
      {
        id: 's1_1',
        title: 'Hujan Reda di Dusun Pelangi',
        speaker: 'Narator Petualangan',
        narrativeText:
          'Air hujan deras baru saja reda di Dusun Pelangi, meninggalkan genangan air di halaman sekolah desa.',
        subtitles:
          'Air hujan deras baru saja reda di Dusun Pelangi, meninggalkan genangan air di halaman sekolah desa.',
        visualTheme: 'rainy_village',
        audioSrc: '/audio/narration/level-1/scene-01.mp3',
      },
      {
        id: 's1_2',
        title: 'Buku & Seragam Basah Kuyup',
        speaker: 'Adik Murid',
        narrativeText:
          'Aduh, buku pelajaran dan pensil kami basah kuyup terkena rembesan air! Padahal minggu depan ujian sekolah dimulai...',
        subtitles:
          'Aduh, buku pelajaran dan pensil kami basah kuyup terkena rembesan air! Padahal minggu depan ujian sekolah dimulai...',
        visualTheme: 'damaged_books',
        audioSrc: '/audio/narration/level-1/scene-02.mp3',
      },
      {
        id: 's1_3',
        title: 'Harapan Bu Guru Sari',
        speaker: 'Bu Guru Sari',
        narrativeText:
          'Anak-anak sangat ingin belajar. Jika ada sahabat baik yang membantu buku dan seragam kering, mereka pasti bisa ujian dengan riang.',
        subtitles:
          'Anak-anak sangat ingin belajar. Jika ada sahabat baik yang membantu buku dan seragam kering, mereka pasti bisa ujian dengan riang.',
        visualTheme: 'teacher_student_worry',
        audioSrc: '/audio/narration/level-1/scene-03.mp3',
      },
      {
        id: 's1_4',
        title: 'Pohon Kebaikan: Sedekah',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Inilah indahnya Sedekah! Ketulusan hati menolong sahabat yang paling membutuhkan agar mereka bisa kembali tersenyum.',
        subtitles:
          'Inilah indahnya Sedekah! Ketulusan hati menolong sahabat yang paling membutuhkan agar mereka bisa kembali tersenyum.',
        visualTheme: 'pohon_sedekah',
        audioSrc: '/audio/narration/level-1/scene-04.mp3',
      },
      {
        id: 's1_5',
        title: 'Ayo Mulai Misi Membantu!',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Kamu memiliki 100 Koin Kebaikan virtual. Mari kita pilih bantuan terbaik untuk adik-adik kelas!',
        subtitles:
          'Kamu memiliki 100 Koin Kebaikan virtual. Mari kita pilih bantuan terbaik untuk adik-adik kelas!',
        visualTheme: 'call_to_aid',
        audioSrc: '/audio/narration/level-1/scene-05.mp3',
      },
    ],
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Kebaikan' },
    collectiveSimulation: {
      targetTotalCoins: 150,
      communityInitialCoins: 50,
      communityDonorNote: '50 Koin telah dikumpulkan bersama oleh warga Dusun Pelangi.',
    },
    aidOptions: [
      {
        id: 'opt_buku',
        title: 'Paket Buku & Alat Tulis',
        category: 'Kebutuhan Pokok',
        urgency: 'Sangat Mendesak',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Paket Buku',
        emoji: '📚',
        description: 'Buku catatan, pensil warna, dan buku pelajaran pengganti yang rusak terkena air.',
        targetCoins: 50,
      },
      {
        id: 'opt_seragam',
        title: 'Seragam & Sepatu Kering',
        category: 'Kebutuhan Penting',
        urgency: 'Penting',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Pasang Seragam',
        emoji: '👕',
        description: 'Pakaian seragam dan sepatu bersih agar murid tidak kedinginan saat datang ke sekolah.',
        targetCoins: 40,
      },
      {
        id: 'opt_hiasan',
        title: 'Pita & Cat Hiasan Kelas',
        category: 'Pelengkap Keindahan',
        urgency: 'Bisa Ditunda',
        isPriority: false,
        costPerUnit: 10,
        unitName: 'Set Hiasan',
        emoji: '🎨',
        description: 'Pita warna-warni dan cat dinding dekoratif agar kelas terlihat semakin meriah.',
        targetCoins: 30,
      },
    ],
    reflection: {
      question:
        'Jika koin kebaikan terbatas, mengapa kita mendahulukan buku pelajaran daripada hiasan dinding kelas?',
      options: [
        {
          id: 'opt_ref_1',
          text: 'Karena tanpa buku, teman-teman tidak bisa membaca dan tertinggal pelajaran penting.',
          isOptimal: true,
          feedbackText:
            'Pikiranmu sangat bijak! Belajar adalah kebutuhan pokok utama untuk masa depan teman-teman.',
        },
        {
          id: 'opt_ref_2',
          text: 'Supaya ruang kelas terlihat paling mewah dan dipuji oleh warga desa lain.',
          isOptimal: false,
          feedbackText:
            'Wah, kelas indah memang menyenangkan. Tapi jika dinding cantik namun teman tidak punya buku untuk belajar, bagaimana nasib ujian mereka? Yuk, renungkan lagi!',
        },
        {
          id: 'opt_ref_3',
          text: 'Agar kita mendapatkan pujian sebagai murid yang pintar menghias sekolah.',
          isOptimal: false,
          feedbackText:
            'Ingat, sedekah dan kebaikan kita tujukan untuk menolong sesama dengan tulus, bukan mencari pujian. Yuk coba pilih alasan yang paling bermanfaat bagi teman!',
        },
      ],
      reasonQuestion: 'Apa alasan mulia yang paling menyentuh hatimu?',
      reasonOptions: [
        {
          id: 'reason_1',
          text: 'Membantu teman menuntut ilmu adalah sedekah yang pahalanya terus mengalir.',
          note: 'Pemahaman yang sangat mulia dan penuh empati.',
        },
        {
          id: 'reason_2',
          text: 'Hiasan kelas bisa kita buat nanti bersama-sama dari kertas lipat bekas.',
          note: 'Ide yang sangat kreatif dan hemat!',
        },
      ],
    },
  },

  // =========================================================================
  // LEVEL 2: Kampung Sehat — Infak (Pangan & Kebersihan Bersama)
  // =========================================================================
  {
    id: 2,
    title: 'Kampung Sehat',
    theme: 'Pangan & Kebersihan',
    conceptType: 'Infak',
    conceptEmoji: '🤲',
    pillarColor: 'sky',
    gradientFrom: '#0284C7',
    gradientTo: '#38BDF8',
    bgLight: '#F0F9FF',
    tagline: 'Menjaga Kesehatan & Kebersihan Warga',
    badgeId: 'badge_penjaga_amanah',
    badgeTitle: 'Lencana Penjaga Amanah',
    badgeEmoji: '🏅',
    badgeDescription:
      'Kamu memahami pentingnya infak untuk kebutuhan bersama dan menjaga amanah hingga bantuan sampai!',
    summaryLesson:
      'Kamu belajar pentingnya infak untuk kebutuhan bersama dan menjaga amanah hingga bantuan sampai. Pohon Kebaikanmu bertumbuh semakin lebat menjadi Pohon Rimbun!',
    nextLevelHint: 'Pesisir Harapan memanggil jiwa penjagamu!',
    story: {
      location: 'Posko Darurat Kampung Sehat',
      narrative:
        'Air banjir sudah mulai surut di Kampung Sehat. Warga di posko darurat membutuhkan makanan pokok bergizi dan sabun air bersih agar tidak terserang wabah diare dan gatal-gatal.',
      urgencyNote: 'Pangan bergizi dan kebersihan sanitasi adalah prioritas kesehatan bersama.',
      reportText:
        '"Masya Allah, paket makanan sehat dan sabun bersih sudah dibagikan merata kepada seluruh warga posko. Sekarang anak-anak bisa makan dengan sehat dan bermain dengan bersih tanpa rasa takut sakit!"',
      reportFrom: 'Pak RT Hasan, Koordinator Posko Kampung Sehat',
    },
    introScenes: [
      {
        id: 's2_1',
        title: 'Banjir Mulai Surut',
        speaker: 'Narator Petualangan',
        narrativeText:
          'Air banjir mulai surut di Kampung Sehat, warga berkumpul di posko darurat balai desa.',
        subtitles:
          'Air banjir mulai surut di Kampung Sehat, warga berkumpul di posko darurat balai desa.',
        visualTheme: 'flood_aftermath',
        audioSrc: '/audio/narration/level-2/scene-01.mp3',
      },
      {
        id: 's2_2',
        title: 'Krisis Pangan & Sanitasi',
        speaker: 'Ibu Relawan Posko',
        narrativeText:
          'Dapur umum kekurangan beras dan telur bergizi, sedangkan air bersih dan sabun habis sehingga anak-anak rawan sakit!',
        subtitles:
          'Dapur umum kekurangan beras dan telur bergizi, sedangkan air bersih dan sabun habis sehingga anak-anak rawan sakit!',
        visualTheme: 'hungry_hygiene_crisis',
        audioSrc: '/audio/narration/level-2/scene-02.mp3',
      },
      {
        id: 's2_3',
        title: 'Ajakan Gotong Royong Pak RT',
        speaker: 'Pak RT Hasan',
        narrativeText:
          'Warga sudah mengumpulkan 60 koin infak. Jika kita bersatu, kebutuhan posko pasti bisa terpenuhi secara adil!',
        subtitles:
          'Warga sudah mengumpulkan 60 koin infak. Jika kita bersatu, kebutuhan posko pasti bisa terpenuhi secara adil!',
        visualTheme: 'community_rally',
        audioSrc: '/audio/narration/level-2/scene-03.mp3',
      },
      {
        id: 's2_4',
        title: 'Pohon Kebaikan: Infak',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Infak adalah menyalurkan harta untuk kemaslahatan dan kepentingan bersama agar seluruh warga terlindungi.',
        subtitles:
          'Infak adalah menyalurkan harta untuk kemaslahatan dan kepentingan bersama agar seluruh warga terlindungi.',
        visualTheme: 'pohon_infak',
        audioSrc: '/audio/narration/level-2/scene-04.mp3',
      },
      {
        id: 's2_5',
        title: 'Salurkan Koin Infakmu',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Ayo gabungkan 100 koin virtualmu untuk melengkapi paket pangan sehat dan sabun bersih posko!',
        subtitles:
          'Ayo gabungkan 100 koin virtualmu untuk melengkapi paket pangan sehat dan sabun bersih posko!',
        visualTheme: 'call_to_aid_infak',
        audioSrc: '/audio/narration/level-2/scene-05.mp3',
      },
    ],
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Kebaikan' },
    collectiveSimulation: {
      targetTotalCoins: 160,
      communityInitialCoins: 60,
      communityDonorNote: '60 Koin telah disalurkan bersama oleh warga Kampung Sehat.',
    },
    aidOptions: [
      {
        id: 'opt_pangan',
        title: 'Paket Pangan Sehat Posko',
        category: 'Kebutuhan Pokok',
        urgency: 'Sangat Mendesak',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Paket Makanan',
        emoji: '🍱',
        description: 'Beras, telur, sayuran, dan susu hangat untuk dapur umum posko darurat.',
        targetCoins: 50,
      },
      {
        id: 'opt_sanitasi',
        title: 'Paket Sanitasi & Air Bersih',
        category: 'Kebutuhan Darurat',
        urgency: 'Sangat Mendesak',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Paket Sanitasi',
        emoji: '🧼',
        description: 'Sabun antiseptik, disinfektan, dan tablet pemurni air agar warga terhindar dari kuman penyakit.',
        targetCoins: 40,
      },
      {
        id: 'opt_camilan',
        title: 'Camilan Manis & Soda',
        category: 'Pelengkap Santai',
        urgency: 'Bisa Ditunda',
        isPriority: false,
        costPerUnit: 10,
        unitName: 'Kotak Camilan',
        emoji: '🍬',
        description: 'Minuman soda dan kembang gula manis untuk selingan saat istirahat.',
        targetCoins: 20,
      },
    ],
    reflection: {
      question:
        'Mengapa laporan pembagian paket makanan dan sabun dari Pak RT sangat penting untuk kita periksa?',
      options: [
        {
          id: 'opt_ref_1',
          text: 'Untuk memastikan amanah tersampaikan dan warga posko benar-benar tertolong.',
          isOptimal: true,
          feedbackText:
            'Hebat sekali! Memeriksa laporan amanah memastikan kebaikan kita sampai kepada yang berhak.',
        },
        {
          id: 'opt_ref_2',
          text: 'Supaya Pak RT memasang foto kita di spanduk posko pengungsian.',
          isOptimal: false,
          feedbackText:
            'Kebaikan infak bukan untuk mencari popularitas atau pajangan foto, melainkan menjaga amanah bagi sesama. Yuk, renungkan kembali tujuan utamanya!',
        },
        {
          id: 'opt_ref_3',
          text: 'Agar warga desa tahu siapa yang menyumbangkan koin paling banyak.',
          isOptimal: false,
          feedbackText:
            'Dalam nilai syariah, sedekah dan infak tidak boleh menjadi ajang pamer nominal. Yang terpenting adalah kejujuran dan tersampaikannya bantuan.',
        },
      ],
      reasonQuestion: 'Apa alasan yang paling mendalam menurutmu?',
      reasonOptions: [
        {
          id: 'reason_1',
          text: 'Menjaga amanah adalah bukti kejujuran dan tanggung jawab kepada Tuhan dan sesama.',
          note: 'Sikap amanah yang sangat terpuji.',
        },
        {
          id: 'reason_2',
          text: 'Bantuan harus tercatat rapi agar semua keluarga di posko mendapat bagian yang adil.',
          note: 'Prinsip keadilan sosial yang sangat tepat.',
        },
      ],
    },
  },

  // =========================================================================
  // LEVEL 3: Pesisir Harapan — Wakaf (Aset Jangka Panjang / Lingkungan)
  // =========================================================================
  {
    id: 3,
    title: 'Pesisir Harapan',
    theme: 'Lingkungan & Gotong Royong',
    conceptType: 'Wakaf',
    conceptEmoji: '🌊',
    pillarColor: 'teal',
    gradientFrom: '#0F766E',
    gradientTo: '#2DD4BF',
    bgLight: '#F0FDFA',
    tagline: 'Merawat Bumi untuk Masa Depan',
    badgeId: 'badge_sahabat_alam',
    badgeTitle: 'Lencana Sahabat Alam',
    badgeEmoji: '🌿',
    badgeDescription: 'Kamu memahami kebaikan wakaf jariyah yang menjaga bumi hingga masa depan!',
    summaryLesson:
      'Kamu belajar tentang wakaf dan kebaikan jariyah yang manfaatnya mengalir terus bagi generasi mendatang. Pohon Kebaikanmu bertumbuh sempurna menjadi Pohon Rimbun Berbuah!',
    nextLevelHint: 'Desa Bangkit membutuhkan kebijaksanaanmu!',
    story: {
      location: 'Pantai Pesisir Harapan',
      narrative:
        'Ombak laut mulai mengikis pantai tempat perahu nelayan bersandar. Warga bergotong royong menanam hutan bakau pelindung pantai agar desa terlindung dari abrasi sepanjang masa.',
      urgencyNote: 'Pohon bakau adalah aset abadi yang menjaga desa nelayan hingga puluhan tahun.',
      reportText:
        '"Subhanallah, ratusan bibit bakau sudah tertanam kokoh di sepanjang garis pantai. Nelayan bisa berlayar dengan tenang, anak-anak bisa bermain di pantai yang aman. Ini kebaikan yang akan dirasakan cucu kita kelak!"',
      reportFrom: 'Pak Nelayan Umar, Ketua Adat Pesisir Harapan',
    },
    introScenes: [
      {
        id: 's3_1',
        title: 'Deburan Ombak Pesisir Harapan',
        speaker: 'Narator Petualangan',
        narrativeText:
          'Ombak laut yang kuat terus menghantam garis pantai Pesisir Harapan dan mengikis daratan desa.',
        subtitles:
          'Ombak laut yang kuat terus menghantam garis pantai Pesisir Harapan dan mengikis daratan desa.',
        visualTheme: 'coastal_erosion',
        audioSrc: '/audio/narration/level-3/scene-01.mp3',
      },
      {
        id: 's3_2',
        title: 'Pantai Terkikis Abrasi',
        speaker: 'Anak Pesisir',
        narrativeText:
          'Pohon kelapa tumbang dan perahu nelayan oleng karena tanah pasir pantai terus tergerus ombak laut!',
        subtitles:
          'Pohon kelapa tumbang dan perahu nelayan oleng karena tanah pasir pantai terus tergerus ombak laut!',
        visualTheme: 'shoreline_danger',
        audioSrc: '/audio/narration/level-3/scene-02.mp3',
      },
      {
        id: 's3_3',
        title: 'Cita-Cita Pak Nelayan Umar',
        speaker: 'Pak Nelayan Umar',
        narrativeText:
          'Jika kita menanam hutan bakau dan memasang pagar penahan ombak, pantai ini akan aman hingga puluhan tahun ke depan.',
        subtitles:
          'Jika kita menanam hutan bakau dan memasang pagar penahan ombak, pantai ini akan aman hingga puluhan tahun ke depan.',
        visualTheme: 'fisherman_mangrove',
        audioSrc: '/audio/narration/level-3/scene-03.mp3',
      },
      {
        id: 's3_4',
        title: 'Pohon Kebaikan: Wakaf Jariyah',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Inilah Wakaf! Kebaikan berkelanjutan berupa aset abadi yang pahalanya terus mengalir menjaga bumi bagi anak cucu kita.',
        subtitles:
          'Inilah Wakaf! Kebaikan berkelanjutan berupa aset abadi yang pahalanya terus mengalir menjaga bumi bagi anak cucu kita.',
        visualTheme: 'pohon_wakaf',
        audioSrc: '/audio/narration/level-3/scene-04.mp3',
      },
      {
        id: 's3_5',
        title: 'Tanam Benteng Hijau!',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Mari gabungkan koin kebaikanmu dengan koin para nelayan untuk menanam bibit bakau tangguh!',
        subtitles:
          'Mari gabungkan koin kebaikanmu dengan koin para nelayan untuk menanam bibit bakau tangguh!',
        visualTheme: 'call_to_aid_wakaf',
        audioSrc: '/audio/narration/level-3/scene-05.mp3',
      },
    ],
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Kebaikan' },
    collectiveSimulation: {
      targetTotalCoins: 300,
      communityInitialCoins: 220,
      communityDonorNote: '220 Koin telah dikumpulkan bersama oleh perkumpulan nelayan Pesisir Harapan.',
    },
    aidOptions: [
      {
        id: 'opt_bakau',
        title: 'Bibit Pohon Bakau Tangguh',
        category: 'Aset Abadi (Wakaf)',
        urgency: 'Sangat Mendesak',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Pohon Bakau',
        emoji: '🌱',
        description:
          'Bibit bakau berkualitas tinggi yang akarnya mencengkeram tanah dan menahan kikisan ombak laut.',
        targetCoins: 50,
      },
      {
        id: 'opt_pagar',
        title: 'Pagar Bambu Pelindung Ombak',
        category: 'Pelindung Bibit',
        urgency: 'Penting',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Meter Pagar',
        emoji: '🎋',
        description:
          'Pagar bambu anyam penahan gelombang awal agar bibit muda tidak hanyut terbawa pasang.',
        targetCoins: 30,
      },
      {
        id: 'opt_lampu',
        title: 'Lampu Hias Dermaga Pantai',
        category: 'Penerangan Wisata',
        urgency: 'Bisa Ditunda',
        isPriority: false,
        costPerUnit: 10,
        unitName: 'Set Lampu',
        emoji: '💡',
        description: 'Lampu warna-warni penghias jembatan dermaga saat malam hari.',
        targetCoins: 20,
      },
    ],
    reflection: {
      question:
        'Mengapa menanam bibit pohon bakau disebut kebaikan yang pahalanya terus mengalir (jariyah)?',
      options: [
        {
          id: 'opt_ref_1',
          text: 'Karena pohonnya terus hidup melindungi desa dan menjadi rumah ikan hingga masa depan.',
          isOptimal: true,
          feedbackText:
            'Masya Allah, tepat sekali! Wakaf pohon memberikan perlindungan alam yang dirasakan anak-cucu kita.',
        },
        {
          id: 'opt_ref_2',
          text: 'Karena pohon bakau bisa kita potong dan jual mahal minggu depan.',
          isOptimal: false,
          feedbackText:
            'Pohon bakau wakaf ditanam untuk menjaga kelestarian bumi dan warga, bukan untuk ditebang cepat. Yuk renungkan manfaat jangka panjangnya!',
        },
        {
          id: 'opt_ref_3',
          text: 'Supaya pantai terlihat ramai oleh turis yang memotret perahu saja.',
          isOptimal: false,
          feedbackText:
            'Tujuan utama penanaman adalah perlindungan lingkungan dan keselamatan warga pesisir. Yuk pilih alasan yang menjaga masa depan desa!',
        },
      ],
      reasonQuestion: 'Apa hikmah wakaf lingkungan yang paling berharga bagimu?',
      reasonOptions: [
        {
          id: 'reason_1',
          text: 'Menjaga bumi adalah amanah manusia agar alam tetap lestari dan bersahabat.',
          note: 'Kesadaran ekologis dan spiritual yang sangat tinggi.',
        },
        {
          id: 'reason_2',
          text: 'Gotong royong menanam bakau membuktikan bahwa bersama kita bisa melindungi desa.',
          note: 'Semangat persatuan dan gotong royong yang mulia.',
        },
      ],
    },
  },

  // =========================================================================
  // LEVEL 4: Desa Bangkit — Prioritas Kebutuhan (Anggaran Virtual Terbatas)
  // =========================================================================
  {
    id: 4,
    title: 'Desa Bangkit',
    theme: 'Prioritas Kebutuhan',
    conceptType: 'Prioritas',
    conceptEmoji: '⚖️',
    pillarColor: 'amber',
    gradientFrom: '#D97706',
    gradientTo: '#FCD34D',
    bgLight: '#FFFBEB',
    tagline: 'Memilih yang Paling Penting Lebih Dahulu',
    badgeId: 'badge_pemikir_bijak',
    badgeTitle: 'Lencana Pemikir Bijak',
    badgeEmoji: '🧠',
    badgeDescription:
      'Kamu berhasil memprioritaskan kebutuhan paling mendesak dengan anggaran yang terbatas. Keputusan bijak!',
    summaryLesson:
      'Kamu belajar cara memilih kebutuhan yang paling mendesak saat anggaran terbatas. Prioritas yang tepat mencerminkan pikiran yang matang dan hati yang penuh tanggung jawab!',
    nextLevelHint: 'Taman Amanah membutuhkan kejujuranmu!',
    story: {
      location: 'Balai Desa Bangkit',
      narrative:
        'Desa Bangkit baru saja bangkit dari musibah kemarau panjang. Anggaran desa sangat terbatas, sedangkan ada empat kebutuhan warga yang sama-sama mendesak: perbaikan sumur, pengobatan warga sakit, alat pertanian, dan renovasi atap balai desa yang bocor.',
      urgencyNote:
        'Anggaran terbatas! Kamu harus memilih mana yang paling mendesak dan bermanfaat bagi warga.',
      reportText:
        '"Terima kasih atas keputusan yang bijaksana! Sumur desa kini mengalirkan air bersih untuk semua warga, dan Pak Damin sudah mendapat obat yang ia butuhkan. Keputusan prioritasmu telah menyelamatkan banyak jiwa!"',
      reportFrom: 'Kepala Desa Bangkit, Pak Budi Santoso',
    },
    introScenes: [
      {
        id: 's4_1',
        title: 'Kemarau di Desa Bangkit',
        speaker: 'Narator Petualangan',
        narrativeText:
          'Matahari bersinar terik di Desa Bangkit setelah kemarau panjang yang menguji kesabaran warga.',
        subtitles:
          'Matahari bersinar terik di Desa Bangkit setelah kemarau panjang yang menguji kesabaran warga.',
        visualTheme: 'drought_village',
        audioSrc: '/audio/narration/level-4/scene-01.mp3',
      },
      {
        id: 's4_2',
        title: 'Empat Kebutuhan Bersaing',
        speaker: 'Warga Desa',
        narrativeText:
          'Sumur desa kering, warga sakit butuh obat, petani butuh cangkul, dan atap balai bocor. Tapi koin yang kita miliki terbatas!',
        subtitles:
          'Sumur desa kering, warga sakit butuh obat, petani butuh cangkul, dan atap balai bocor. Tapi koin yang kita miliki terbatas!',
        visualTheme: 'multiple_needs_dilemma',
        audioSrc: '/audio/narration/level-4/scene-02.mp3',
      },
      {
        id: 's4_3',
        title: 'Musyawarah Pak Kades Budi',
        speaker: 'Pak Kades Budi',
        narrativeText:
          'Kita tidak bisa membeli semuanya sekaligus. Kita harus memilih mana yang paling mendesak untuk menyelamatkan kehidupan warga.',
        subtitles:
          'Kita tidak bisa membeli semuanya sekaligus. Kita harus memilih mana yang paling mendesak untuk menyelamatkan kehidupan warga.',
        visualTheme: 'village_chief_dilemma',
        audioSrc: '/audio/narration/level-4/scene-03.mp3',
      },
      {
        id: 's4_4',
        title: 'Pohon Kebaikan: Skala Prioritas',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Kebijaksanaan sejati adalah mendahulukan kebutuhan pokok yang vital sebelum kebutuhan pelengkap. Air dan obat adalah nyawa!',
        subtitles:
          'Kebijaksanaan sejati adalah mendahulukan kebutuhan pokok yang vital sebelum kebutuhan pelengkap. Air dan obat adalah nyawa!',
        visualTheme: 'pohon_prioritas',
        audioSrc: '/audio/narration/level-4/scene-04.mp3',
      },
      {
        id: 's4_5',
        title: 'Tentukan Pilihanmu!',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Gunakan 100 koin virtualmu secara bijaksana untuk mendanai kebutuhan yang paling darurat.',
        subtitles:
          'Gunakan 100 koin virtualmu secara bijaksana untuk mendanai kebutuhan yang paling darurat.',
        visualTheme: 'call_to_aid_prioritas',
        audioSrc: '/audio/narration/level-4/scene-05.mp3',
      },
    ],
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Kebaikan' },
    collectiveSimulation: {
      targetTotalCoins: 200,
      communityInitialCoins: 100,
      communityDonorNote: '100 Koin telah dikumpulkan bersama oleh warga Desa Bangkit.',
    },
    aidOptions: [
      {
        id: 'opt_sumur',
        title: 'Perbaikan Sumur Desa',
        category: 'Kebutuhan Vital',
        urgency: 'Sangat Mendesak',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Meter Sumur',
        emoji: '💧',
        description: 'Sumur yang rusak membuat warga kesulitan air bersih untuk minum dan memasak setiap hari.',
        targetCoins: 50,
      },
      {
        id: 'opt_obat',
        title: 'Obat-obatan Warga Sakit',
        category: 'Kesehatan Darurat',
        urgency: 'Sangat Mendesak',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Paket Obat',
        emoji: '💊',
        description: 'Lima warga lanjut usia membutuhkan obat-obatan rutin yang sudah habis sejak kemarau.',
        targetCoins: 30,
      },
      {
        id: 'opt_tani',
        title: 'Alat Pertanian Baru',
        category: 'Kebutuhan Produktif',
        urgency: 'Penting',
        isPriority: false,
        costPerUnit: 10,
        unitName: 'Set Alat Tani',
        emoji: '⛏️',
        description: 'Cangkul dan bajak baru untuk para petani agar panen musim depan bisa segera dimulai.',
        targetCoins: 30,
      },
      {
        id: 'opt_balai',
        title: 'Renovasi Atap Balai Desa',
        category: 'Infrastruktur',
        urgency: 'Bisa Ditunda',
        isPriority: false,
        costPerUnit: 10,
        unitName: 'Lembar Atap',
        emoji: '🏚️',
        description: 'Atap balai desa bocor saat hujan, namun masih bisa dipakai sementara dengan terpal.',
        targetCoins: 20,
      },
    ],
    reflection: {
      question:
        'Di Desa Bangkit, mengapa kita harus mendahulukan perbaikan sumur daripada renovasi balai desa yang bocor?',
      options: [
        {
          id: 'opt_ref_1',
          text: 'Karena air bersih dari sumur dibutuhkan setiap hari oleh semua warga untuk hidup.',
          isOptimal: true,
          feedbackText:
            'Luar biasa bijaksana! Air adalah kebutuhan pokok yang tidak bisa ditunda. Keputusanmu menyelamatkan kehidupan seluruh warga desa.',
        },
        {
          id: 'opt_ref_2',
          text: 'Agar balai desa bisa dipakai untuk pesta besar dan mengundang warga desa lain.',
          isOptimal: false,
          feedbackText:
            'Balai desa yang cantik memang menyenangkan, tapi tanpa air bersih, warga tidak bisa hidup sehat. Yuk prioritaskan kebutuhan yang menyelamatkan jiwa!',
        },
        {
          id: 'opt_ref_3',
          text: 'Supaya kepala desa senang dan memuji keputusan kita di depan warga.',
          isOptimal: false,
          feedbackText:
            'Tujuan kita bukan pujian, tapi memberikan manfaat nyata bagi warga. Mari pilih keputusan yang benar-benar menyelesaikan masalah!',
        },
      ],
      reasonQuestion: 'Apa pelajaran penting tentang prioritas yang kamu petik?',
      reasonOptions: [
        {
          id: 'reason_1',
          text: 'Kebutuhan pokok harus selalu didahulukan sebelum kebutuhan yang sifatnya hanya pelengkap.',
          note: 'Pemahaman hierarki kebutuhan yang sangat matang.',
        },
        {
          id: 'reason_2',
          text: 'Ketika anggaran terbatas, kita belajar bahwa setiap koin harus digunakan dengan penuh tanggung jawab.',
          note: 'Kesadaran pengelolaan sumber daya yang bijak.',
        },
      ],
    },
  },

  // =========================================================================
  // LEVEL 5: Taman Amanah — Transparansi Dana (Memahami Laporan Bantuan)
  // =========================================================================
  {
    id: 5,
    title: 'Taman Amanah',
    theme: 'Transparansi & Kepercayaan',
    conceptType: 'Amanah',
    conceptEmoji: '🔍',
    pillarColor: 'rose',
    gradientFrom: '#BE185D',
    gradientTo: '#FB7185',
    bgLight: '#FFF1F2',
    tagline: 'Memastikan Kebaikan Sampai ke Tujuan',
    badgeId: 'badge_penjaga_kepercayaan',
    badgeTitle: 'Lencana Penjaga Kepercayaan',
    badgeEmoji: '🛡️',
    badgeDescription:
      'Kamu memahami pentingnya transparansi dan amanah dalam setiap pengelolaan bantuan kebaikan!',
    summaryLesson:
      'Kamu belajar tentang pentingnya transparansi dan kejujuran dalam menyalurkan bantuan. Amanah adalah pondasi kepercayaan antar sesama manusia!',
    nextLevelHint: 'Negeri Kebaikan adalah misi terakhirmu yang paling menantang!',
    story: {
      location: 'Taman Amanah Desa',
      narrative:
        'Di Taman Amanah, warga berencana membangun perpustakaan mini dan taman bermain untuk anak-anak. Tapi ada beberapa laporan yang mencurigakan: ada yang bilang koin sudah diterima, ada yang bilang belum. Kamu harus membantu memeriksa dan memastikan laporan amanah yang benar!',
      urgencyNote:
        'Kejujuran dalam pelaporan adalah pondasi kepercayaan. Periksa dengan teliti setiap laporan!',
      reportText:
        '"Setelah diperiksa bersama-sama, laporan amanah ternyata sesuai. Perpustakaan mini kini sudah dibangun dan taman bermain anak sudah selesai. Warga bisa mempercayai pengelola karena semuanya dicatat dengan jujur!"',
      reportFrom: 'Ibu Ketua PKK, Taman Amanah Desa',
    },
    introScenes: [
      {
        id: 's5_1',
        title: 'Rencana Taman & Perpustakaan',
        speaker: 'Narator Petualangan',
        narrativeText:
          'Di Taman Amanah, warga merencanakan perpustakaan mini dan arena bermain anak yang sangat dinanti.',
        subtitles:
          'Di Taman Amanah, warga merencanakan perpustakaan mini dan arena bermain anak yang sangat dinanti.',
        visualTheme: 'empty_community_lot',
        audioSrc: '/audio/narration/level-5/scene-01.mp3',
      },
      {
        id: 's5_2',
        title: 'Keraguan dan Tanda Tanya',
        speaker: 'Warga Desa',
        narrativeText:
          'Ada warga yang bertanya-tanya: apakah koin bantuan benar-benar dibelikan rak buku atau terpakai untuk hal lain?',
        subtitles:
          'Ada warga yang bertanya-tanya: apakah koin bantuan benar-benar dibelikan rak buku atau terpakai untuk hal lain?',
        visualTheme: 'trust_whispers',
        audioSrc: '/audio/narration/level-5/scene-02.mp3',
      },
      {
        id: 's5_3',
        title: 'Buku Catatan Terbuka Bu PKK',
        speaker: 'Bu Ketua PKK',
        narrativeText:
          'Jangan khawatir! Semua bantuan dicatat rapi dan diumumkan secara terbuka agar semua warga bisa memeriksa bersama.',
        subtitles:
          'Jangan khawatir! Semua bantuan dicatat rapi dan diumumkan secara terbuka agar semua warga bisa memeriksa bersama.',
        visualTheme: 'transparent_ledger',
        audioSrc: '/audio/narration/level-5/scene-03.mp3',
      },
      {
        id: 's5_4',
        title: 'Pohon Kebaikan: Amanah & Transparansi',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Amanah adalah pondasi kepercayaan. Kejujuran dalam setiap laporan membuat kebaikan tumbuh subur tanpa rasa curiga.',
        subtitles:
          'Amanah adalah pondasi kepercayaan. Kejujuran dalam setiap laporan membuat kebaikan tumbuh subur tanpa rasa curiga.',
        visualTheme: 'pohon_amanah',
        audioSrc: '/audio/narration/level-5/scene-04.mp3',
      },
      {
        id: 's5_5',
        title: 'Jaga Amanah Bersama!',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Alokasikan koinmu dan periksa setiap tahapnya agar perpustakaan mini desa terwujud nyata dalam cerita!',
        subtitles:
          'Alokasikan koinmu dan periksa setiap tahapnya agar perpustakaan mini desa terwujud nyata dalam cerita!',
        visualTheme: 'call_to_aid_amanah',
        audioSrc: '/audio/narration/level-5/scene-05.mp3',
      },
    ],
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Kebaikan' },
    collectiveSimulation: {
      targetTotalCoins: 250,
      communityInitialCoins: 150,
      communityDonorNote: '150 Koin telah dikumpulkan warga dengan penuh amanah di Taman Amanah.',
    },
    aidOptions: [
      {
        id: 'opt_perpus',
        title: 'Perpustakaan Mini Desa',
        category: 'Aset Pendidikan',
        urgency: 'Sangat Mendesak',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Rak Buku',
        emoji: '📖',
        description:
          'Rak buku dan koleksi 50 buku cerita anak untuk perpustakaan mini yang terbuka setiap hari.',
        targetCoins: 50,
      },
      {
        id: 'opt_taman',
        title: 'Taman Bermain Anak',
        category: 'Sarana Sosial',
        urgency: 'Penting',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Wahana Bermain',
        emoji: '🛝',
        description: 'Ayunan, perosotan kecil, dan bangku taman agar anak-anak bisa bermain dengan aman.',
        targetCoins: 30,
      },
      {
        id: 'opt_dekorasi',
        title: 'Lampu Taman Warna-Warni',
        category: 'Dekorasi Hiburan',
        urgency: 'Bisa Ditunda',
        isPriority: false,
        costPerUnit: 10,
        unitName: 'Set Lampu',
        emoji: '🎆',
        description: 'Lampu LED warna-warni untuk menghias taman di malam hari.',
        targetCoins: 20,
      },
    ],
    reflection: {
      question:
        'Mengapa kita harus memeriksa laporan amanah meskipun sudah percaya kepada pengelola bantuan?',
      options: [
        {
          id: 'opt_ref_1',
          text: 'Karena memeriksa laporan bukan berarti tidak percaya, tapi memastikan amanah berjalan benar dan semua warga mendapat haknya.',
          isOptimal: true,
          feedbackText:
            'Sangat cerdas! Transparansi bukan berarti curiga, tapi menjaga kepercayaan bersama agar kebaikan terus bisa dilakukan.',
        },
        {
          id: 'opt_ref_2',
          text: 'Karena kita ingin menangkap pengelola yang salah dan melaporkannya ke polisi segera.',
          isOptimal: false,
          feedbackText:
            'Tujuan transparansi bukan menghukum, tapi memastikan kebaikan sampai dengan benar. Yuk pahami makna kejujuran yang membangun kepercayaan!',
        },
        {
          id: 'opt_ref_3',
          text: 'Supaya kita tahu siapa yang paling banyak berkontribusi dan memberi hadiah kepadanya.',
          isOptimal: false,
          feedbackText:
            'Transparansi bukan tentang kompetisi atau hadiah, melainkan memastikan setiap warga mendapat haknya secara adil. Yuk renungkan kembali!',
        },
      ],
      reasonQuestion: 'Apa nilai amanah yang paling membekas di hatimu?',
      reasonOptions: [
        {
          id: 'reason_1',
          text: 'Kejujuran dalam setiap laporan adalah fondasi kepercayaan yang membuat kebaikan bisa terus berlanjut.',
          note: 'Kesadaran sosial yang sangat mendalam.',
        },
        {
          id: 'reason_2',
          text: 'Ketika semua dicatat dengan jujur, tidak ada pihak yang merasa dizalimi atau dilupakan.',
          note: 'Prinsip keadilan yang sangat mulia.',
        },
      ],
    },
  },

  // =========================================================================
  // LEVEL 6: Negeri Kebaikan — Misi Akhir (Integrasi Semua Nilai)
  // =========================================================================
  {
    id: 6,
    title: 'Negeri Kebaikan',
    theme: 'Misi Akhir Kebaikan',
    conceptType: 'Kebaikan Terpadu',
    conceptEmoji: '🌟',
    pillarColor: 'emerald',
    gradientFrom: '#065F46',
    gradientTo: '#34D399',
    bgLight: '#ECFDF5',
    tagline: 'Menyatukan Semua Kebaikan untuk Negeri',
    badgeId: 'badge_pemimpin_kebaikan',
    badgeTitle: 'Lencana Pemimpin Kebaikan',
    badgeEmoji: '👑',
    badgeDescription:
      'Selamat! Kamu telah menyelesaikan seluruh perjalanan SADAQIDS dengan penuh keberanian dan kebijaksanaan!',
    summaryLesson:
      'Kamu telah menguasai seluruh nilai kebaikan: sedekah, infak, wakaf, prioritas, dan amanah. Pohon Kebaikanmu kini tumbuh sempurna dan bercahaya! Kamu adalah Pemimpin Kebaikan sejati!',
    nextLevelHint: 'Selamat! Kamu telah menyelesaikan semua petualangan SADAQIDS!',
    story: {
      location: 'Alun-Alun Negeri Kebaikan',
      narrative:
        'Di pusat Negeri Kebaikan, seluruh warga berkumpul untuk merayakan satu tahun penuh kebaikan bersama. Tersisa satu tugas paling penting: mengalokasikan dana kebaikan terakhir untuk empat kebutuhan besar yang akan mengubah negeri ini selamanya!',
      urgencyNote:
        'Ini adalah misi terakhir dan paling penting! Gunakan semua yang kamu pelajari untuk membuat keputusan terbaik.',
      reportText:
        '"Alhamdulillah! Seluruh program Negeri Kebaikan telah terlaksana dengan sempurna. Sekolah baru berdiri, klinik kesehatan dibuka, masjid dibangun dengan indah, dan taman kota menjadi ruang bermain anak-anak. Inilah buah dari kebaikan yang dilakukan bersama-sama dengan penuh amanah dan cinta!"',
      reportFrom: 'Sultan Kebaikan, Pemimpin Negeri Kebaikan',
    },
    introScenes: [
      {
        id: 's6_1',
        title: 'Gerbang Negeri Kebaikan',
        speaker: 'Narator Petualangan',
        narrativeText:
          'Gerbang emas Negeri Kebaikan bermandikan cahaya mentari cerah. Seluruh warga berkumpul menyambutmu!',
        subtitles:
          'Gerbang emas Negeri Kebaikan bermandikan cahaya mentari cerah. Seluruh warga berkumpul menyambutmu!',
        visualTheme: 'kingdom_gate',
        audioSrc: '/audio/narration/level-6/scene-01.mp3',
      },
      {
        id: 's6_2',
        title: 'Empat Pilar Masa Depan',
        speaker: 'Sultan Kebaikan',
        narrativeText:
          'Negeri kita siap mewujudkan sekolah, klinik kesehatan, masjid, dan taman kota untuk kesejahteraan abadi.',
        subtitles:
          'Negeri kita siap mewujudkan sekolah, klinik kesehatan, masjid, dan taman kota untuk kesejahteraan abadi.',
        visualTheme: 'four_pillars_vision',
        audioSrc: '/audio/narration/level-6/scene-02.mp3',
      },
      {
        id: 's6_3',
        title: 'Panggilan Sang Pahlawan Cilik',
        speaker: 'Anak-Anak Negeri',
        narrativeText:
          'Kamu telah membuktikan kepedulianmu di lima level sebelumnya! Kini kami menanti keputusan bijakmu.',
        subtitles:
          'Kamu telah membuktikan kepedulianmu di lima level sebelumnya! Kini kami menanti keputusan bijakmu.',
        visualTheme: 'royal_welcome',
        audioSrc: '/audio/narration/level-6/scene-03.mp3',
      },
      {
        id: 's6_4',
        title: 'Pohon Kebaikan: Mahkota Nilai',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Sedekah, Infak, Wakaf, Prioritas, dan Amanah kini bersatu di hatimu. Pohon Kebaikan bertumbuh sempurna dan bercahaya!',
        subtitles:
          'Sedekah, Infak, Wakaf, Prioritas, dan Amanah kini bersatu di hatimu. Pohon Kebaikan bertumbuh sempurna dan bercahaya!',
        visualTheme: 'pohon_paripurna',
        audioSrc: '/audio/narration/level-6/scene-04.mp3',
      },
      {
        id: 's6_5',
        title: 'Misi Akhir Kepahlawanan',
        speaker: 'Pohon Kebaikan',
        narrativeText:
          'Alokasikan koinmu untuk mewujudkan empat pilar kebaikan dan raih Lencana Pemimpin Kebaikan!',
        subtitles:
          'Alokasikan koinmu untuk mewujudkan empat pilar kebaikan dan raih Lencana Pemimpin Kebaikan!',
        visualTheme: 'call_to_aid_final',
        audioSrc: '/audio/narration/level-6/scene-05.mp3',
      },
    ],
    virtualCurrency: { initialCoins: 100, coinLabel: 'Koin Kebaikan' },
    collectiveSimulation: {
      targetTotalCoins: 400,
      communityInitialCoins: 300,
      communityDonorNote: '300 Koin telah dikumpulkan oleh seluruh warga Negeri Kebaikan bersama-sama.',
    },
    aidOptions: [
      {
        id: 'opt_sekolah',
        title: 'Sekolah Negeri Kebaikan',
        category: 'Aset Pendidikan (Wakaf)',
        urgency: 'Sangat Mendesak',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Ruang Kelas',
        emoji: '🏫',
        description:
          'Gedung sekolah baru dengan enam ruang kelas, perpustakaan, dan laboratorium sains untuk anak-anak negeri.',
        targetCoins: 50,
      },
      {
        id: 'opt_klinik',
        title: 'Klinik Kesehatan Gratis',
        category: 'Kesehatan Warga (Infak)',
        urgency: 'Sangat Mendesak',
        isPriority: true,
        costPerUnit: 10,
        unitName: 'Ruang Periksa',
        emoji: '🏥',
        description:
          'Klinik kesehatan gratis dengan dokter dan perawat yang siap melayani warga tanpa biaya.',
        targetCoins: 30,
      },
      {
        id: 'opt_masjid',
        title: 'Masjid & Musala Warga',
        category: 'Ibadah & Rohani (Wakaf)',
        urgency: 'Penting',
        isPriority: false,
        costPerUnit: 10,
        unitName: 'Area Masjid',
        emoji: '🕌',
        description:
          'Masjid yang indah dan nyaman sebagai pusat ibadah dan kegiatan sosial warga Negeri Kebaikan.',
        targetCoins: 20,
      },
      {
        id: 'opt_taman_kota',
        title: 'Taman Kota & Ruang Hijau',
        category: 'Ruang Sosial',
        urgency: 'Bisa Ditunda',
        isPriority: false,
        costPerUnit: 10,
        unitName: 'Area Taman',
        emoji: '🌳',
        description:
          'Taman kota hijau nan rindang sebagai ruang bermain anak dan tempat berkumpul keluarga warga.',
        targetCoins: 20,
      },
    ],
    reflection: {
      question:
        'Setelah menyelesaikan semua petualangan, nilai kebaikan apa yang menurutmu paling penting untuk dibawa dalam kehidupan sehari-hari?',
      options: [
        {
          id: 'opt_ref_1',
          text: 'Amanah dan kejujuran, karena tanpa kepercayaan tidak ada kebaikan yang bisa bertahan lama.',
          isOptimal: true,
          feedbackText:
            'Masya Allah! Kamu benar-benar telah memahami inti sari SADAQIDS. Amanah adalah fondasi dari semua kebaikan. Selamat menjadi Pemimpin Kebaikan!',
        },
        {
          id: 'opt_ref_2',
          text: 'Mengumpulkan koin sebanyak-banyaknya agar bisa membeli semua kebutuhan sekaligus.',
          isOptimal: false,
          feedbackText:
            'Koin virtual memang membantu, tapi nilai utama bukan pada jumlah koin, melainkan pada kebijaksanaan memilih dan ketulusan memberi. Yuk renungkan perjalananmu!',
        },
        {
          id: 'opt_ref_3',
          text: 'Memenangkan semua level agar namaku tercatat sebagai pemenang terbaik.',
          isOptimal: false,
          feedbackText:
            'SADAQIDS bukan tentang menang atau kalah, melainkan tentang pertumbuhan hati dan kebijaksanaan. Yuk renungkan kembali makna perjalananmu!',
        },
      ],
      reasonQuestion: 'Apa satu tekad kebaikan yang akan kamu lakukan setelah menyelesaikan SADAQIDS?',
      reasonOptions: [
        {
          id: 'reason_1',
          text: 'Aku akan selalu jujur dan amanah dalam setiap tindakan nyata di kehidupan sehari-hariku.',
          note: 'Tekad yang sangat mulia dan bermakna.',
        },
        {
          id: 'reason_2',
          text: 'Aku akan mengajak teman dan keluarga untuk berbuat kebaikan bersama-sama setiap hari.',
          note: 'Semangat berbagi yang akan menciptakan dampak berlipat ganda.',
        },
      ],
    },
  },
];
