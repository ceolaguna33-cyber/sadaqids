import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Award, Lock, CheckCircle2, ChevronRight, Heart, Star } from 'lucide-react';
import { MascotPohon } from './MascotPohon';
import { AnimatedTreeGrowth } from './AnimatedTreeGrowth';

const TREE_STAGES_TIMELINE = [
  {
    stage: 1,
    title: 'Tunas Mungil Berakar',
    levelHint: 'Level 1: Dusun Pelangi (Sedekah)',
    badgeName: 'Lencana Pahlawan Belajar',
    desc: 'Benih sedekahmu menembus tanah gembur, menumbuhkan akar pertama dan dua helai daun mungil yang ramah.',
    icon: '🌱',
    theme: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  {
    stage: 2,
    title: 'Ranting Ceria Bertunas',
    levelHint: 'Level 2: Kampung Sehat (Infak)',
    badgeName: 'Lencana Penjaga Amanah',
    desc: 'Akar menancap semakin kuat ke bumi, batang pohon muda menjulang dan menumbuhkan cabang ranting ceria berdaun segar.',
    icon: '🌿',
    theme: 'bg-sky-100 text-sky-900 border-sky-300',
  },
  {
    stage: 3,
    title: 'Pohon Rimbun Meneduhkan',
    levelHint: 'Level 3: Pesisir Harapan (Wakaf)',
    badgeName: 'Lencana Sahabat Alam',
    desc: 'Cabang melebar rimbun, kanopi daun bertingkat sejuk menaungi siapapun yang berteduh di bawahnya.',
    icon: '🌳',
    theme: 'bg-teal-100 text-teal-900 border-teal-300',
  },
  {
    stage: 4,
    title: 'Pohon Lebat Berbunga',
    levelHint: 'Level 4: Desa Bangkit (Prioritas Pangan)',
    badgeName: 'Lencana Pahlawan Pangan',
    desc: 'Dedaunan lebat dihiasi kuncup bunga kebaikan mekar warna-warni yang memancarkan aroma wangi gotong royong.',
    icon: '🌸',
    theme: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    stage: 5,
    title: 'Pohon Berbuah Emas Sedekah',
    levelHint: 'Level 5: Taman Amanah (Wakaf Fasilitas)',
    badgeName: 'Lencana Pembina Umat',
    desc: 'Buah-buah emas ranum bercahaya di setiap dahan, bukti nyata kebaikan yang berbuah manis bagi sesama.',
    icon: '🍎',
    theme: 'bg-rose-100 text-rose-900 border-rose-300',
  },
  {
    stage: 6,
    title: 'Pohon Bersinar Penuh Berkah',
    levelHint: 'Level 6: Negeri Kebaikan (Puncak Dunia 1)',
    badgeName: 'Lencana Bintang Nusantara',
    desc: 'Cahaya bintang kebaikan bersinar terang dari pucuk dedaunan, mengalirkan inspirasi bagi seluruh dusun nusantara.',
    icon: '⭐',
    theme: 'bg-indigo-100 text-indigo-900 border-indigo-300',
  },
  {
    stage: 7,
    title: 'Pohon Paripurna Bermahkota Emas ✨',
    levelHint: 'Dunia 2 & 3: Tuntas Sempurna',
    badgeName: 'Mahkota Sultan Kebaikan',
    desc: 'Pohon agung bermahkota emas abadi, lambang sedekah jariyah paripurna yang pahalanya terus mengalir tiada henti.',
    icon: '👑',
    theme: 'bg-amber-200 text-amber-950 border-amber-400',
  },
];

export function ModalPohonKebaikan({
  isOpen,
  onClose,
  treeStage = 1,
  completedLevelsCount = 0,
  onPlaySound,
  isReducedMotion = false,
}) {
  const [selectedStageView, setSelectedStageView] = useState(() => Math.min(Math.max(treeStage, 1), 7));

  if (!isOpen) return null;

  const currentStageInfo = TREE_STAGES_TIMELINE.find((s) => s.stage === selectedStageView) || TREE_STAGES_TIMELINE[0];
  const isUnlocked = selectedStageView <= treeStage;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop gelap blur lembut */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={isReducedMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-emerald-50 via-warm-50 to-parchment-100 rounded-3xl border-3 border-amber-300 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_6px_0_0_#fcd34d] overflow-hidden p-5 sm:p-7 z-10 text-left my-auto"
        >
          {/* Tombol Tutup */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-rose-50 text-stone-600 hover:text-rose-600 border-2 border-stone-200 flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer z-20"
            title="Tutup Taman Pohon"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Header Dialog */}
          <div className="flex items-center gap-2.5 mb-4 pr-10">
            <div className="w-10 h-10 rounded-2xl bg-forest-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-forest-800 block">
                Galeri Perkembangan Kebaikan
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-stone-900 leading-tight">
                Taman Pohon Kebaikanmu 🌳
              </h2>
            </div>
          </div>

          {/* Area Panggung Pohon Kebaikan */}
          <div className="relative rounded-2xl bg-white/95 border-2 border-amber-200 p-4 mb-4 shadow-inner flex flex-col items-center justify-center min-h-[220px]">
            {isUnlocked ? (
              <div className="relative flex flex-col items-center">
                <MascotPohon
                  stage={selectedStageView}
                  size={190}
                  isCelebration={selectedStageView === treeStage}
                  isReducedMotion={isReducedMotion}
                />
                <span className="mt-1 px-3 py-0.5 rounded-full bg-forest-100 text-forest-800 text-xs font-black border border-forest-300">
                  {currentStageInfo.title}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-3xl bg-stone-100 border-2 border-stone-300 flex items-center justify-center text-stone-400 mb-3 shadow-inner">
                  <Lock className="w-8 h-8 stroke-[2]" />
                </div>
                <h4 className="font-display font-black text-base text-stone-700">
                  Fase Pohon Masih Terkunci
                </h4>
                <p className="text-xs text-stone-500 font-sans max-w-xs mt-1">
                  Selesaikan <strong>{currentStageInfo.levelHint}</strong> untuk melihat pohonmu bertumbuh ke fase ini! 🌟
                </p>
              </div>
            )}
          </div>

          {/* Deskripsi Fase yang Dipilih */}
          <div className="bg-amber-100/70 border-2 border-amber-300 rounded-2xl p-3.5 mb-4 text-xs text-stone-800 font-sans leading-relaxed">
            <strong className="text-amber-950 block font-display text-xs sm:text-sm mb-0.5">
              🌱 Hikmah Pertumbuhan: {currentStageInfo.title}
            </strong>
            <p className="text-stone-700">{currentStageInfo.desc}</p>
          </div>

          {/* Timeline 6 Fase Bertahap (Sentuh untuk melihat pratinjau) */}
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-stone-500 block mb-2">
              Jejak Pertumbuhan Pohon Kebaikan (Sentuh fase):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {TREE_STAGES_TIMELINE.map((item) => {
                const itemUnlocked = item.stage <= treeStage;
                const isSelected = selectedStageView === item.stage;

                return (
                  <button
                    key={item.stage}
                    onClick={() => {
                      setSelectedStageView(item.stage);
                      if (onPlaySound) onPlaySound('tap');
                    }}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-2 active:scale-97 ${
                      isSelected
                        ? 'bg-amber-400 border-amber-500 text-amber-950 font-black shadow-xs ring-2 ring-amber-300'
                        : itemUnlocked
                        ? 'bg-white hover:bg-emerald-50 border-emerald-300 text-stone-800'
                        : 'bg-stone-100 border-stone-200 text-stone-400 opacity-70'
                    }`}
                  >
                    <span className="text-lg shrink-0">
                      {itemUnlocked ? item.icon : '🔒'}
                    </span>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-xs block truncate leading-tight">
                        Fase {item.stage}: {item.title.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-stone-500 block truncate">
                        {itemUnlocked ? 'Terbuka ✓' : `Level ${item.stage}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Motivasi */}
          <div className="mt-5 pt-3.5 border-t-2 border-stone-200/80 flex items-center justify-between text-xs">
            <span className="font-bold text-forest-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-forest-600" />
              <span>Pohon Saat Ini: Fase {treeStage} ({TREE_STAGES_TIMELINE[treeStage - 1]?.title || 'Pohon Kebaikan'})</span>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-display font-bold text-xs cursor-pointer shadow-xs active:scale-95 transition-transform"
            >
              Tutup Galeri
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
