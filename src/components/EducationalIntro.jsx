import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Info,
  Heart,
  ShieldCheck,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';
import { SimulationStamp } from './SimulationStamp';
import { playSoundEffect } from '../utils/useGameSound';
import { getLevelNumberInWorld } from '../data/worldsData';

// ============================================================================
// STORYBOOK SCENE STAGE (Deluxe Visuals & Mascot Overlay per Theme)
// ============================================================================

function StoryStageIllustration({ theme, isReducedMotion, speaker }) {
  // Animasi mengambang lembut untuk karakter & elemen dinamis
  const gentleFloat = isReducedMotion
    ? {}
    : {
        animate: { y: [0, -6, 0] },
        transition: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
      };

  const getSceneConfig = () => {
    switch (theme) {
      // ----------------------------------------------------------------------
      // LEVEL 1: DUSUN PELANGI (SEDEKAH PENDIDIKAN)
      // ----------------------------------------------------------------------
      case 'rainy_village':
        return {
          image: '/images/level1_school_bg.jpg',
          alt: 'SD Dusun Pelangi Setelah Hujan',
          badge: '🌧️ Hujan Reda di Sekolah Dusun',
          badgeColor: 'bg-blue-600/90 text-white border-blue-300',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 'damaged_books':
        return {
          image: '/images/level1_scene2_books.jpg',
          alt: 'Buku Pelajaran Basah Kuyup',
          badge: '💧 Buku & Perlengkapan Basah',
          badgeColor: 'bg-red-600/90 text-white border-red-300',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 'teacher_student_worry':
        return {
          image: '/images/level1_scene3_teacher.jpg',
          alt: 'Bu Guru Sari Merangkul Murid',
          badge: '👩‍🏫 Harapan Bu Guru Sari',
          badgeColor: 'bg-emerald-600/90 text-white border-emerald-300',
          mascot: '/images/maskot_perempuan_cutout.png',
        };
      case 'pohon_sedekah':
        return {
          image: '/images/level1_scene4_tree.jpg',
          alt: 'Pohon Kebaikan Ramah Bercahaya',
          badge: '🌳 Berkah Tulus Sedekah',
          badgeColor: 'bg-emerald-700/90 text-amber-200 border-amber-300',
          mascot: '/images/pohon_kebaikan_cutout.png',
        };
      case 'call_to_aid':
        return {
          image: '/images/level1_scene5_mission.jpg',
          alt: 'Peti Koin Kebaikan Siap Disalurkan',
          badge: '🪙 100 Koin Kebaikan Siap Disalurkan!',
          badgeColor: 'bg-amber-500 text-stone-950 border-yellow-200',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // LEVEL 2: KAMPUNG SEHAT (INFAK PANGAN & SANITASI)
      // ----------------------------------------------------------------------
      case 'flood_aftermath':
      case 'community_post':
      case 'hungry_hygiene_crisis':
      case 'food_sanitation':
      case 'community_rally':
      case 'pohon_infak':
      case 'call_to_aid_infak':
      case 'trust_report':
        return {
          image: '/images/level2_kampung_sehat.jpg',
          alt: 'Posko Kampung Sehat Penuh Gotong Royong',
          badge: '🍲 Posko Pangan & Sanitasi Sehat',
          badgeColor: 'bg-sky-600/90 text-white border-sky-300',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // LEVEL 3: PESISIR HARAPAN (WAKAF JARIYAH BAKAU)
      // ----------------------------------------------------------------------
      case 'coastal_erosion':
      case 'shoreline_danger':
      case 'mangrove_seed':
      case 'ocean_waves':
      case 'fisherman_mangrove':
      case 'pohon_wakaf':
      case 'call_to_aid_wakaf':
      case 'future_harmony':
        return {
          image: '/images/level3_pesisir_harapan.jpg',
          alt: 'Hutan Bakau Pelindung Pesisir Harapan',
          badge: '🌱 Wakaf Jariyah Bakau Lestari',
          badgeColor: 'bg-teal-600/90 text-white border-teal-300',
          mascot: '/images/maskot_perempuan_cutout.png',
        };

      // ----------------------------------------------------------------------
      // LEVEL 4: DESA BANGKIT (PRIORITAS KEBUTUHAN)
      // ----------------------------------------------------------------------
      case 'drought_village':
      case 'multiple_needs_dilemma':
      case 'village_budget':
      case 'needs_priority':
      case 'village_chief_dilemma':
      case 'pohon_prioritas':
      case 'call_to_aid_prioritas':
      case 'wise_choice':
        return {
          image: '/images/level4_desa_bangkit.jpg',
          alt: 'Sumur Segar & Fasilitas Pokok Desa Bangkit',
          badge: '💧 Dahulukan Air & Kebutuhan Vital',
          badgeColor: 'bg-amber-600/90 text-amber-50 border-amber-300',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // LEVEL 5: TAMAN AMANAH (TRANSPARANSI LAPORAN)
      // ----------------------------------------------------------------------
      case 'empty_community_lot':
      case 'trust_whispers':
      case 'trust_garden':
      case 'transparent_ledger':
      case 'pohon_amanah':
      case 'call_to_aid_amanah':
      case 'transparency_stages':
      case 'community_trust':
        return {
          image: '/images/level5_taman_amanah.jpg',
          alt: 'Papan Transparansi & Taman Anak Desa Amanah',
          badge: '⭐ Laporan Jujur & Transparan',
          badgeColor: 'bg-rose-600/90 text-white border-rose-300',
          mascot: '/images/maskot_perempuan_cutout.png',
        };

      // ----------------------------------------------------------------------
      // LEVEL 6: NEGERI KEBAIKAN (INTEGRASI 4 PILAR PARIPURNA)
      // ----------------------------------------------------------------------
      case 'four_pillars_vision':
      case 'legacy_kingdom':
        return {
          image: '/images/world_map_adventure.jpg',
          alt: 'Peta Empat Pilar Masa Depan',
          badge: '🗺️ Petualangan 4 Pilar Paripurna',
          badgeColor: 'bg-purple-600/90 text-white border-purple-300',
          mascot: '/images/maskot_laki_cutout.png',
        };
      case 'pohon_paripurna':
      case 'royal_welcome':
      case 'kingdom_celebration':
        return {
          image: '/images/Meshy_AI_pohon_kebaikan_refined.png',
          alt: 'Pohon Kebaikan Paripurna Bercahaya Emas',
          badge: '👑 Pohon Kebaikan Paripurna Emas',
          badgeColor: 'bg-amber-500 text-stone-950 border-yellow-200',
          mascot: '/images/pohon_kebaikan_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 2 — LEVEL 7: PASAR KEBUTUHAN (Kebutuhan vs Keinginan)
      // ----------------------------------------------------------------------
      case 'market_morning':
      case 'long_list':
      case 'needs_vs_wants':
        return {
          image: '/images/level7_pasar_kebutuhan.jpg',
          alt: 'Pasar Desa Pagi Penuh Kebutuhan',
          badge: '🛒 Pasar Kebutuhan — Pilih yang Tepat!',
          badgeColor: 'bg-orange-600/90 text-white border-orange-300',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 2 — LEVEL 8: BALAI DESA HARAPAN (Matching Bantuan)
      // ----------------------------------------------------------------------
      case 'village_hall':
      case 'diverse_families':
        return {
          image: '/images/level8_balai_desa.jpg',
          alt: 'Balai Desa Harapan Tempat Musyawarah',
          badge: '🎯 Balai Desa — Cocokkan Bantuan!',
          badgeColor: 'bg-amber-600/90 text-white border-amber-300',
          mascot: '/images/maskot_perempuan_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 2 — LEVEL 9: BENDAHARA KECIL (Alokasi Berimbang)
      // ----------------------------------------------------------------------
      case 'office_relawan':
      case 'budget_intro':
        return {
          image: '/images/level9_bendahara_kecil.jpg',
          alt: 'Meja Bendahara Kecil dengan Buku Catatan',
          badge: '💰 Bendahara Kecil — Bagi Anggaran!',
          badgeColor: 'bg-lime-600/90 text-white border-lime-300',
          mascot: '/images/maskot_perempuan_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 2 — LEVEL 10: TIM GOTONG ROYONG (Kolaborasi)
      // ----------------------------------------------------------------------
      case 'warehouse_team':
      case 'teamwork_power':
        return {
          image: '/images/level10_gotong_royong.jpg',
          alt: 'Warga Gotong Royong Bersama-sama',
          badge: '🤝 Tim Gotong Royong — Bersama Lebih Kuat!',
          badgeColor: 'bg-teal-600/90 text-white border-teal-300',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 2 — LEVEL 11: TAMAN WAKAF ABADI (Wakaf Produktif)
      // ----------------------------------------------------------------------
      case 'abandoned_park':
      case 'waqf_power':
        return {
          image: '/images/level11_taman_wakaf.jpg',
          alt: 'Taman Wakaf Produktif yang Subur',
          badge: '🌿 Taman Wakaf Abadi — Sedekah Jariyah!',
          badgeColor: 'bg-emerald-600/90 text-white border-emerald-300',
          mascot: '/images/maskot_perempuan_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 2 — LEVEL 12: RAPAT PRIORITAS (Prioritas Darurat)
      // ----------------------------------------------------------------------
      case 'meeting_room':
        return {
          image: '/images/level12_rapat_prioritas.jpg',
          alt: 'Rapat Darurat Menentukan Prioritas',
          badge: '⚡ Rapat Prioritas — Tentukan yang Paling Mendesak!',
          badgeColor: 'bg-red-600/90 text-white border-red-300',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 2 — LEVEL 13: PROYEK IMPIAN (Perancang Kebaikan)
      // ----------------------------------------------------------------------
      case 'design_studio':
        return {
          image: '/images/level13_proyek_impian.jpg',
          alt: 'Peresmian Proyek Impian Masyarakat',
          badge: '🏗️ Proyek Impian — Wujudkan Kebaikan Besar!',
          badgeColor: 'bg-purple-600/90 text-white border-purple-300',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 3 — LEVEL 14: BUKU CATATAN AMANAH (Akuntansi Dasar)
      // ----------------------------------------------------------------------
      case 'finance_office':
      case 'amanah_book':
        return {
          image: '/images/level14_buku_catatan.jpg',
          alt: 'Buku Catatan Amanah dan Laporan Keuangan',
          badge: '📒 Buku Amanah — Catat dengan Teliti!',
          badgeColor: 'bg-blue-700/90 text-white border-blue-300',
          mascot: '/images/maskot_perempuan_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 3 — LEVEL 15: DETEKTIF BUKTI (Verifikasi Nota)
      // ----------------------------------------------------------------------
      case 'audit_desk':
      case 'invoice_check':
        return {
          image: '/images/level15_detektif_bukti.jpg',
          alt: 'Detektif Kecil Memeriksa Nota Bukti',
          badge: '🔍 Detektif Bukti — Periksa Nota!',
          badgeColor: 'bg-indigo-600/90 text-white border-indigo-300',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 3 — LEVEL 16: JEMBATAN RENCANA-NYATA (Kesenjangan Rencana)
      // ----------------------------------------------------------------------
      case 'evaluation_room':
        return {
          image: '/images/level16_jembatan_rencana.jpg',
          alt: 'Menganalisis Kesenjangan Rencana dan Kenyataan',
          badge: '📊 Jembatan Rencana — Temukan Celah!',
          badgeColor: 'bg-violet-600/90 text-white border-violet-300',
          mascot: '/images/maskot_perempuan_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 3 — LEVEL 17: PEMERIKSA KLAIM (Integritas Kas)
      // ----------------------------------------------------------------------
      case 'verification_office':
        return {
          image: '/images/level17_pemeriksa_klaim.jpg',
          alt: 'Memeriksa Klaim Dana dengan Seksama',
          badge: '🛡️ Pemeriksa Klaim — Jaga Integritas!',
          badgeColor: 'bg-slate-600/90 text-white border-slate-300',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 3 — LEVEL 18: BENTENG ASET WAKAF (Perlindungan Aset)
      // ----------------------------------------------------------------------
      case 'waqf_threats':
        return {
          image: '/images/level18_benteng_aset.jpg',
          alt: 'Menjaga Aset Wakaf dari Ancaman',
          badge: '🏰 Benteng Wakaf — Lindungi Amanah!',
          badgeColor: 'bg-amber-700/90 text-white border-amber-300',
          mascot: '/images/maskot_perempuan_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 3 — LEVEL 19: LAPORAN DAMPAK (Audit Komprehensif)
      // ----------------------------------------------------------------------
      case 'report_desk':
        return {
          image: '/images/level19_laporan_dampak.jpg',
          alt: 'Menyusun Laporan Dampak yang Transparan',
          badge: '📋 Laporan Dampak — Laporkan Kebenaran!',
          badgeColor: 'bg-teal-700/90 text-white border-teal-300',
          mascot: '/images/maskot_laki_cutout.png',
        };

      // ----------------------------------------------------------------------
      // DUNIA 3 — LEVEL 20: MISI AKHIR TERPADU (Grand Finale)
      // ----------------------------------------------------------------------
      case 'grand_finale':
      case 'three_stages':
        return {
          image: '/images/level20_misi_akhir.jpg',
          alt: 'Misi Akhir Paripurna Penjaga Amanah',
          badge: '👑 Misi Akhir Terpadu — Penjaga Amanah Sejati!',
          badgeColor: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 border-yellow-200',
          mascot: '/images/pohon_kebaikan_cutout.png',
        };

      case 'kingdom_gate':
      case 'heroic_mission':
      case 'call_to_aid_final':
      default:
        return {
          image: '/images/level_map_gerbang_kebaikan.jpg',
          alt: 'Gerbang Emas Negeri Kebaikan',
          badge: '✨ Gerbang Megah Negeri Kebaikan',
          badgeColor: 'bg-amber-500 text-stone-950 border-yellow-200',
          mascot: speaker === 'Pohon Kebaikan' ? '/images/pohon_kebaikan_cutout.png' : '/images/maskot_laki_cutout.png',
        };
    }
  };

  const config = getSceneConfig();

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden select-none bg-amber-50">
      {/* Gambar Latar Adegan dengan Animasi Ken-Burns Lembut */}
      <motion.img
        src={config.image}
        alt={config.alt}
        className="w-full h-full object-cover object-center"
        initial={{ scale: 1 }}
        animate={isReducedMotion ? {} : { scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Lapisan Vignette Lembut & Gradien Kedalaman */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/35 via-transparent to-transparent pointer-events-none" />

      {/* Cahaya Berpendar Halus */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(254, 240, 138, 0.45), transparent 75%)',
        }}
      />

      {/* Badge Topik Adegan (Kiri Bawah Gambar) */}
      <motion.div
        {...gentleFloat}
        className={`absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-extrabold text-xs sm:text-sm shadow-xl border ${config.badgeColor} backdrop-blur-md`}
      >
        <span>{config.badge}</span>
      </motion.div>

      {/* Karakter Maskot Ceria Muncul di Pojok Kanan Bawah */}
      <motion.div
        animate={isReducedMotion ? {} : { y: [0, -8, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-2 right-2 sm:right-6 z-20 w-20 sm:w-28 md:w-36 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
      >
        <img
          src={config.mascot}
          alt="Maskot Sahabat Kebaikan"
          className="w-full h-auto object-contain max-h-36 sm:max-h-44"
        />
      </motion.div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: EDUCATIONAL INTRO (INTERACTIVE STORYBOOK)
// ============================================================================

export function EducationalIntro({
  mission,
  onStartMission,
  onBackToMap,
  onDuckBgm,
  isSoundEnabled = true,
  isReducedMotion = false,
}) {
  const safeMission = mission || {
    id: 1,
    title: 'Dusun Pelangi',
    conceptType: 'Sedekah',
    story: {
      location: 'SD Dusun Pelangi',
      narrative: 'Mari bantu adik-adik dusun agar dapat belajar kembali!',
      urgencyNote: 'Utamakan kebutuhan belajar yang paling mendesak.',
    },
  };

  const fallbackScene = {
    id: `scene_fallback_${safeMission.id || 1}`,
    title: safeMission.title || 'Misi Kebaikan',
    speaker: 'Pohon Kebaikan',
    narrativeText: safeMission.story?.narrative || 'Mari bantu sesama dengan bijak!',
    subtitles: safeMission.story?.narrative || 'Mari bantu sesama dengan bijak!',
    visualTheme: 'rainy_village',
    clueText: safeMission.story?.urgencyNote || 'Dahulukan kebutuhan yang paling mendesak!',
  };

  const scenes = (safeMission.introScenes && safeMission.introScenes.length > 0)
    ? safeMission.introScenes
    : [fallbackScene];

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sceneProgress, setSceneProgress] = useState(0); // 0 - 100%
  const [audioSourceType, setAudioSourceType] = useState('visual_only');
  const [revealedClues, setRevealedClues] = useState({});

  const currentAudioRef = useRef(null);
  const visualTimerRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const currentScene = scenes[currentSceneIndex] || scenes[0] || fallbackScene;
  const VISUAL_FALLBACK_DURATION_MS = 8500; // 8.5 detik durasi membaca tenang

  // Background per world
  const stageBackground = safeMission.id === 1
    ? '/images/level1_school_bg.jpg'
    : (safeMission.worldId === 2 ? '/images/world_map_adventure.jpg' : '/images/level_map_gerbang_kebaikan.jpg');

  // Hentikan semua audio dan transisi yang sedang berjalan
  const stopAllNarrationAudio = () => {
    try {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
      if (visualTimerRef.current) {
        clearInterval(visualTimerRef.current);
        visualTimerRef.current = null;
      }
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.onended = null;
        currentAudioRef.current.onerror = null;
        currentAudioRef.current.ontimeupdate = null;
        currentAudioRef.current.onplay = null;
        currentAudioRef.current.src = '';
        currentAudioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {
      // ignore
    }
    if (onDuckBgm) onDuckBgm(false);
  };

  // Periksa apakah sistem memiliki voice asli Bahasa Indonesia (id-ID)
  const getIndonesianVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(
      (v) =>
        v.lang === 'id-ID' ||
        v.lang === 'id_ID' ||
        v.lang === 'id' ||
        v.name.toLowerCase().includes('indonesian') ||
        v.name.toLowerCase().includes('bahasa indonesia')
    );
  };

  // Jalankan narasi per adegan
  useEffect(() => {
    if (!currentScene) return;

    stopAllNarrationAudio();
    setSceneProgress(0);

    if (!isPlaying) return;

    if (!isSoundEnabled) {
      setAudioSourceType('visual_only');
      startVisualTimer();
      return;
    }

    // OPSI 1: Putar file audio narasi resmi dari folder suara
    const audioPath = currentScene.audioSrc;
    if (audioPath) {
      const audio = new Audio(audioPath);
      currentAudioRef.current = audio;

      audio.onplay = () => {
        setAudioSourceType('file');
        if (onDuckBgm) onDuckBgm(true);
      };

      audio.ontimeupdate = () => {
        if (audio.duration && audio.duration > 0) {
          const progress = (audio.currentTime / audio.duration) * 100;
          setSceneProgress(Math.min(100, progress));
        }
      };

      // KETIKA SUARA SELESAI, SCENE BERGANTI SECARA OTOMATIS
      audio.onended = () => {
        if (onDuckBgm) onDuckBgm(false);
        // Jeda santai 500ms agar kalimat terakhir terserap sempurna
        transitionTimeoutRef.current = setTimeout(() => {
          goToNextScene(true);
        }, 500);
      };

      audio.onerror = () => {
        stopAllNarrationAudio();

        const idVoice = getIndonesianVoice();

        if (idVoice) {
          // OPSI 2: Web Speech API jika voice asli id-ID tersedia
          setAudioSourceType('synth_id');

          const utterance = new SpeechSynthesisUtterance(currentScene.narrativeText);
          utterance.voice = idVoice;
          utterance.lang = 'id-ID';
          utterance.rate = 0.9;
          utterance.pitch = 1.05;

          utterance.onstart = () => {
            if (onDuckBgm) onDuckBgm(true);
            startVisualTimer(7000);
          };

          utterance.onend = () => {
            if (onDuckBgm) onDuckBgm(false);
            transitionTimeoutRef.current = setTimeout(() => {
              goToNextScene(true);
            }, 500);
          };

          utterance.onerror = () => {
            if (onDuckBgm) onDuckBgm(false);
            startVisualTimer();
          };

          window.speechSynthesis.speak(utterance);
        } else {
          // OPSI 3: Mode Visual Bersih
          setAudioSourceType('visual_only');
          startVisualTimer();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio berjalan normal
          })
          .catch((err) => {
            console.warn('Autoplay audio dijeda browser:', err);
            // Siapkan resume otomatis pada interaksi pengguna pertama
            const handleFirstInteraction = () => {
              if (currentAudioRef.current) {
                currentAudioRef.current.play().catch(() => {});
              }
              window.removeEventListener('click', handleFirstInteraction);
              window.removeEventListener('touchstart', handleFirstInteraction);
            };
            window.addEventListener('click', handleFirstInteraction, { once: true });
            window.addEventListener('touchstart', handleFirstInteraction, { once: true });
            startVisualTimer();
          });
      }
    } else {
      startVisualTimer();
    }

    return () => {
      stopAllNarrationAudio();
    };
  }, [currentSceneIndex, isPlaying, isSoundEnabled]);

  const startVisualTimer = (durationMs = VISUAL_FALLBACK_DURATION_MS) => {
    if (visualTimerRef.current) clearInterval(visualTimerRef.current);

    const intervalStep = 100;
    let elapsed = 0;

    visualTimerRef.current = setInterval(() => {
      if (!isPlaying) return;

      elapsed += intervalStep;
      const progress = Math.min(100, (elapsed / durationMs) * 100);
      setSceneProgress(progress);

      if (elapsed >= durationMs) {
        clearInterval(visualTimerRef.current);
        goToNextScene(true);
      }
    }, intervalStep);
  };

  const goToNextScene = (isAuto = false) => {
    stopAllNarrationAudio();
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
      setSceneProgress(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setSceneProgress(100);
      if (isAuto === true) {
        // Pada adegan terakhir, beri jeda 1.5 detik lalu lanjut otomatis ke misi
        transitionTimeoutRef.current = setTimeout(() => {
          handleSkipOrStart();
        }, 1500);
      }
    }
  };

  const goToPrevScene = () => {
    if (currentSceneIndex > 0) {
      stopAllNarrationAudio();
      setCurrentSceneIndex((prev) => prev - 1);
      setSceneProgress(0);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (currentAudioRef.current) currentAudioRef.current.pause();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.pause();
      if (visualTimerRef.current) clearInterval(visualTimerRef.current);
      if (onDuckBgm) onDuckBgm(false);
    } else {
      setIsPlaying(true);
      if (currentAudioRef.current && currentAudioRef.current.src) {
        currentAudioRef.current.play().catch(() => {});
        if (onDuckBgm) onDuckBgm(true);
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        if (onDuckBgm) onDuckBgm(true);
      }
    }
  };

  const handleReplay = () => {
    stopAllNarrationAudio();
    setCurrentSceneIndex(0);
    setSceneProgress(0);
    setIsPlaying(true);
  };

  const handleSkipOrStart = () => {
    stopAllNarrationAudio();
    if (visualTimerRef.current) clearInterval(visualTimerRef.current);
    onStartMission();
  };

  // Avatar Tokoh Berbicara yang Ramah & Menarik
  const getSpeakerBadge = (speaker) => {
    switch (speaker) {
      case 'Bu Guru Sari':
        return { label: 'Bu Guru Sari', emoji: '👩‍🏫', color: 'bg-blue-500 text-white border-blue-300' };
      case 'Adik Murid':
      case 'Anak Pesisir':
      case 'Anak-Anak Negeri':
        return { label: speaker, emoji: '🎒', color: 'bg-emerald-500 text-white border-emerald-300' };
      case 'Pohon Kebaikan':
        return { label: 'Pohon Kebaikan', emoji: '🌳', color: 'bg-emerald-600 text-amber-200 border-amber-300' };
      case 'Pak RT Hasan':
      case 'Pak Nelayan Umar':
      case 'Pak Kades Budi':
      case 'Sultan Kebaikan':
      case 'Ketua Relawan':
        return { label: speaker, emoji: '🏅', color: 'bg-amber-500 text-stone-950 border-yellow-200' };
      case 'Bu Ketua PKK':
      case 'Ibu Relawan Posko':
        return { label: speaker, emoji: '📋', color: 'bg-rose-500 text-white border-rose-200' };
      case 'Kak Relawan Dana':
        return { label: 'Kak Relawan Dana', emoji: '🤝', color: 'bg-orange-500 text-white border-orange-300' };
      case 'Kepala Audit':
        return { label: 'Kepala Audit', emoji: '🔍', color: 'bg-indigo-600 text-white border-indigo-300' };
      case 'Koordinator':
        return { label: 'Koordinator', emoji: '📋', color: 'bg-teal-600 text-white border-teal-300' };
      case 'Ketua Panitia':
        return { label: 'Ketua Panitia', emoji: '🏛️', color: 'bg-blue-600 text-white border-blue-300' };
      case 'Kepala Nadzir':
        return { label: 'Kepala Nadzir', emoji: '🛡️', color: 'bg-emerald-700 text-white border-emerald-400' };
      case 'Warga Desa':
        return { label: 'Warga Desa', emoji: '👥', color: 'bg-slate-600 text-white border-slate-300' };
      case 'Narator':
      case 'Narator Petualangan':
        return { label: 'Narator Petualangan', emoji: '📖', color: 'bg-purple-600 text-white border-purple-300' };
      default:
        return { label: speaker || 'Kisah Petualangan', emoji: '📖', color: 'bg-purple-600 text-white border-purple-300' };
    }
  };

  const speakerBadge = getSpeakerBadge(currentScene?.speaker);

  return (
    <div className="relative min-h-[calc(100vh-68px)] w-full flex flex-col justify-between overflow-hidden bg-[#FDFBF7] font-sans select-none">
      
      {/* ── BACKGROUND LIGHTING & AMBIENT GLOW (Cahaya Hangat & Lembut) ── */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('${stageBackground}')`,
          filter: 'blur(32px) brightness(1.1) saturate(1.2) opacity(0.22)',
          transform: 'scale(1.1)',
        }}
      />
      {/* Radiant Sunbeams & Magical Light Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-60"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.35), transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.22), transparent 65%)',
          }}
        />
        <div
          className="absolute top-1/3 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-45"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2), transparent 65%)',
          }}
        />
      </div>

      {/* Partikel Cahaya Bintang Emas Melayang Lembut */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <motion.div
            animate={{ y: [0, -25, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-12 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]"
          />
          <motion.div
            animate={{ y: [0, -35, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_14px_#eab308]"
          />
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]"
          />
        </div>
      )}

      {/* ── TOP HUD NAVIGATION & STAGE HEADER ── */}
      <header className="relative z-30 w-full max-w-5xl mx-auto px-4 pt-3 sm:pt-4">
        <div className="bg-white/90 backdrop-blur-md border-2 border-amber-300/80 rounded-3xl p-2.5 sm:p-3 shadow-[0_4px_20px_rgba(245,158,11,0.12)] flex flex-wrap items-center justify-between gap-3">
          
          {/* Tombol Kembali ke Peta (Game 3D Style Button) */}
          <button
            onClick={onBackToMap}
            className="px-4 py-2 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 text-amber-950 font-display font-extrabold text-xs sm:text-sm flex items-center gap-2 border-b-4 border-amber-300 active:translate-y-1 active:border-b-0 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>Kembali ke Peta</span>
          </button>

          {/* Level & Concept Badge */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-emerald-900 font-display font-black text-xs sm:text-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Level {getLevelNumberInWorld(safeMission)}: {safeMission.conceptType} ({safeMission.title})</span>
            </div>
          </div>

          <SimulationStamp variant="compact" isReducedMotion={isReducedMotion} />
        </div>
      </header>

      {/* ── MAIN THEATRE VIEWPORT (PANGGUNG KISAH BERGAMBAR) ── */}
      <main className="relative z-20 flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex flex-col justify-center">
        
        {/* Theatrical Storybook Frame dengan Latar Putih Hangat & Border Emas */}
        <div className="relative rounded-[28px] sm:rounded-[36px] border-[3px] sm:border-4 border-amber-300/90 bg-white/95 shadow-[0_20px_50px_rgba(245,158,11,0.15),0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden p-3 sm:p-5">
          
          {/* Top Bar Dalam Panggung: Lokasi & Tracker Bintang Adegan */}
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 px-1">
            {/* Lokasi */}
            <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-display font-black shadow-sm flex items-center gap-2">
              <span className="text-base">📍</span>
              <span>{safeMission.story?.location || safeMission.title}</span>
            </div>

            {/* Stepper Bab Cerita Interaktif */}
            <div className="flex items-center gap-1.5 bg-amber-50/80 px-3 py-1.5 rounded-2xl border border-amber-200 shadow-sm">
              <span className="text-[11px] font-black text-amber-800 hidden sm:inline mr-1">Adegan:</span>
              {scenes.map((sc, idx) => {
                const isActive = idx === currentSceneIndex;
                const isPast = idx < currentSceneIndex;
                return (
                  <button
                    key={sc.id || idx}
                    onClick={() => {
                      stopAllNarrationAudio();
                      setCurrentSceneIndex(idx);
                      setSceneProgress(0);
                      setIsPlaying(true);
                    }}
                    title={`Lompat ke adegan ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full font-black text-[11px] flex items-center justify-center cursor-pointer ${
                      isActive
                        ? 'w-7 h-7 bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 shadow-[0_0_12px_rgba(250,204,21,0.8)] scale-110'
                        : isPast
                        ? 'w-6 h-6 bg-emerald-500 text-white shadow-sm'
                        : 'w-6 h-6 bg-stone-100 text-stone-500 hover:bg-stone-200'
                    }`}
                  >
                    {isPast ? '✓' : idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Jendela Ilustrasi Utama (Vibrant & Panoramic) */}
          <div className="relative w-full h-56 sm:h-72 md:h-84 rounded-2xl border-2 border-amber-200 overflow-hidden shadow-md flex items-center justify-center bg-amber-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full h-full relative"
              >
                <StoryStageIllustration
                  theme={currentScene.visualTheme}
                  isReducedMotion={isReducedMotion}
                  speaker={currentScene.speaker}
                />
              </motion.div>
            </AnimatePresence>

            {/* Bilah Progres Durasi Adegan yang Mengalir Halus di Bawah Gambar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-stone-200/80 z-30">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all duration-100 ease-linear shadow-[0_0_8px_#fde047]"
                style={{ width: `${sceneProgress}%` }}
              />
            </div>
          </div>

          {/* ── KARTU DIALOG BUKU CERITA (WARM STORYBOOK DIALOGUE PARCHMENT) ── */}
          <div className="mt-3 sm:mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-yellow-50/90 border-2 border-amber-200 shadow-sm relative">
            
            {/* Header Dialog: Avatar Pembicara & Tombol Petunjuk */}
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-display font-black border shadow-sm ${speakerBadge.color}`}>
                  <span className="text-base">{speakerBadge.emoji}</span>
                  <span>{speakerBadge.label}</span>
                </span>

                {/* Indikator Animasi Suara saat Narasi Berjalan */}
                {isPlaying && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Bercerita...</span>
                  </div>
                )}
              </div>

              {/* Tombol Singkap Petunjuk Rahasia */}
              <button
                onClick={() => {
                  playSoundEffect('chime', isSoundEnabled);
                  setRevealedClues((prev) => ({
                    ...prev,
                    [currentScene.id]: !prev[currentScene.id],
                  }));
                }}
                className="inline-flex items-center gap-1.5 text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1 rounded-full transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                <span>{revealedClues[currentScene.id] ? 'Tutup Petunjuk' : 'Petunjuk Rahasia Misi'}</span>
              </button>
            </div>

            {/* Teks Dialog Cerita — Sangat Jelas, Nyaman Dibaca & Hangat */}
            <p className="font-display font-extrabold text-stone-900 text-base sm:text-xl md:text-2xl leading-relaxed min-h-[52px]">
              "{currentScene.subtitles || currentScene.narrativeText}"
            </p>

            {/* Petunjuk Tambahan Berupa Banner Hijau Ramah */}
            <AnimatePresence>
              {revealedClues[currentScene.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-3"
                >
                  <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-xs sm:text-sm font-semibold flex items-start gap-2.5 shadow-inner">
                    <span className="text-xl">💡</span>
                    <div>
                      <strong className="text-emerald-900 block mb-0.5 font-bold">Kiat Sahabat Kebaikan:</strong>
                      <span className="leading-relaxed">
                        {currentScene.clueText ||
                          `Perhatikan apa yang paling mendesak dibutuhkan oleh warga. Dalam simulasi nanti, dahulukan hal pokok terlebih dahulu!`}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* ── STAGE PLAYBACK CONTROLS & GIANT GOLD CTA ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-amber-200/80">
            
            {/* Navigasi Kiri: Putar Ulang, Mundur, Jeda */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReplay}
                className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 border-b-4 border-stone-300 active:translate-y-1 active:border-b-0 transition-all cursor-pointer shadow-sm"
                title="Putar Ulang dari Adegan 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={goToPrevScene}
                disabled={currentSceneIndex === 0}
                className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 border-b-4 border-stone-300 disabled:opacity-30 disabled:cursor-not-allowed active:translate-y-1 active:border-b-0 transition-all cursor-pointer shadow-sm"
                title="Adegan Sebelumnya"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="px-3.5 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 border-b-4 border-amber-300 font-display font-extrabold text-xs flex items-center gap-1.5 active:translate-y-1 active:border-b-0 transition-all cursor-pointer shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Jeda' : 'Lanjut'}</span>
              </button>
            </div>

            {/* Navigasi Kanan: Lanjut Adegan & Tombol Emas Mulai Misi */}
            <div className="flex items-center gap-2.5">
              {currentSceneIndex < scenes.length - 1 && (
                <button
                  onClick={() => goToNextScene(false)}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white border-b-4 border-emerald-700 font-display font-black text-xs sm:text-sm flex items-center gap-2 active:translate-y-1 active:border-b-0 shadow-md transition-all cursor-pointer"
                >
                  <span>Lanjut Adegan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {/* Giant Glowing Golden 3D CTA to Start Mission */}
              <button
                id="btn-mulai-gameplay"
                onClick={handleSkipOrStart}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-stone-950 font-display font-black text-sm sm:text-base flex items-center gap-2 shadow-[0_10px_25px_rgba(245,158,11,0.35)] border-b-4 border-amber-600 transition-all active:translate-y-1 active:border-b-0 cursor-pointer animate-pulse"
              >
                <span>{currentSceneIndex === scenes.length - 1 ? 'Mulai Simulasi Misi! 🚀' : 'Langsung Mulai Misi! ⭐'}</span>
                <FastForward className="w-5 h-5 fill-stone-950" />
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* ── FOOTER HINT ── */}
      <footer className="relative z-30 w-full max-w-5xl mx-auto px-4 pb-2.5 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/70 border border-amber-200 text-xs font-bold text-amber-950 shadow-sm">
          <span>💡</span>
          <span>Simak kisah di atas untuk memahami kebutuhan pokok warga sebelum mengalokasikan Koin Kebaikan virtual!</span>
        </div>
      </footer>

    </div>
  );
}
