import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Search,
  Scale,
  Users,
  Award,
  ChevronRight,
  Sliders,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Check,
  Package,
} from 'lucide-react';
import { IconKoinKebaikan } from './CustomIllustrations';

// ============================================================================
// LEVEL 7: DRAG & SORT (Pasar Kebutuhan: Kebutuhan vs Keinginan)
// ============================================================================
function DragSortGame({ config, onUpdate, playSound, isReducedMotion }) {
  const items = config.items || [];
  const [sorted, setSorted] = useState({}); // { itemId: 'need' | 'want' }
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClassify = (itemId, category) => {
    const item = items.find((i) => i.id === itemId);
    const newSorted = { ...sorted, [itemId]: category };
    setSorted(newSorted);
    setSelectedItem(null);

    const isCorrect = item?.category === category;
    if (playSound) playSound(isCorrect ? 'coin' : 'tap');

    const totalSorted = Object.keys(newSorted).length;
    const correctCount = items.filter((i) => newSorted[i.id] === i.category).length;
    const canComplete = totalSorted === items.length && correctCount >= (config.passingScore || 7);

    onUpdate({
      allocations: { sorted: newSorted, correctCount },
      coinsSpent: totalSorted * 10,
      remainingCoins: 80 - totalSorted * 10,
      canComplete,
      activeTip: canComplete
        ? 'Luar biasa! Kamu berhasil membedakan kebutuhan dan keinginan dengan bijak.'
        : `Telah dipilah: ${totalSorted}/${items.length} barang. (${correctCount} tepat)`,
      placedCount: totalSorted,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-amber-950 flex items-center justify-center gap-2">
          <span>🛒</span> Pasar Kebutuhan: Pilah Barang
        </h3>
        <p className="text-xs text-amber-900 mt-1">
          Ketuk barang, lalu ketuk keranjang <strong>"Kebutuhan Pokok"</strong> atau <strong>"Keinginan"</strong>.
        </p>
      </div>

      {/* Keranjang Target */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {/* Keranjang Kebutuhan */}
        <div
          onClick={() => selectedItem && handleClassify(selectedItem.id, 'need')}
          className={`p-4 rounded-2xl border-3 transition-all ${
            selectedItem
              ? 'border-emerald-500 bg-emerald-50/90 shadow-md cursor-pointer hover:scale-[1.02]'
              : 'border-emerald-300 bg-emerald-50/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍚</span>
              <h4 className="font-black text-emerald-900 text-sm">Kebutuhan Pokok</h4>
            </div>
            <span className="text-[11px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
              Harus Dipenuhi
            </span>
          </div>
          <p className="text-[11px] text-emerald-800 mb-2">
            Pangan, kesehatan, selimut, dan air bersih untuk bertahan hidup.
          </p>
          <div className="flex flex-wrap gap-1.5 min-h-[44px] p-2 bg-white/70 rounded-xl border border-emerald-200">
            {items
              .filter((i) => sorted[i.id] === 'need')
              .map((i) => (
                <span
                  key={i.id}
                  className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${
                    i.category === 'need'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  <span>{i.emoji}</span>
                  <span>{i.label}</span>
                  {i.category === 'need' ? '✓' : '⚠️'}
                </span>
              ))}
          </div>
        </div>

        {/* Keranjang Keinginan */}
        <div
          onClick={() => selectedItem && handleClassify(selectedItem.id, 'want')}
          className={`p-4 rounded-2xl border-3 transition-all ${
            selectedItem
              ? 'border-amber-500 bg-amber-50/90 shadow-md cursor-pointer hover:scale-[1.02]'
              : 'border-amber-300 bg-amber-50/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h4 className="font-black text-amber-950 text-sm">Keinginan / Tambahan</h4>
            </div>
            <span className="text-[11px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
              Bisa Ditunda
            </span>
          </div>
          <p className="text-[11px] text-amber-800 mb-2">
            Hiburan dan kemewahan yang bukan kebutuhan darurat saat krisis.
          </p>
          <div className="flex flex-wrap gap-1.5 min-h-[44px] p-2 bg-white/70 rounded-xl border border-amber-200">
            {items
              .filter((i) => sorted[i.id] === 'want')
              .map((i) => (
                <span
                  key={i.id}
                  className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${
                    i.category === 'want'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  <span>{i.emoji}</span>
                  <span>{i.label}</span>
                  {i.category === 'want' ? '✓' : '⚠️'}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Daftar Item yang Belum Dipilah */}
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-stone-600 block mb-2">
          Daftar Barang Bantuan yang Perlu Dipilah:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {items.map((item) => {
            const isSorted = Boolean(sorted[item.id]);
            const isSelected = selectedItem?.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                  isSorted
                    ? 'opacity-40 bg-stone-100 border-stone-200 cursor-pointer'
                    : isSelected
                    ? 'border-forest-600 bg-forest-50 shadow-md ring-2 ring-forest-300 scale-102 cursor-pointer'
                    : 'bg-white border-stone-300 hover:border-amber-400 cursor-pointer'
                }`}
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-xs font-black text-stone-800">{item.label}</div>
                <div className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{item.reason}</div>
                {isSorted && (
                  <span className="absolute top-1 right-1 text-[10px] bg-stone-200 text-stone-700 px-1.5 rounded-full font-bold">
                    {sorted[item.id] === 'need' ? 'Kebutuhan' : 'Keinginan'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 8: MATCHING (Balai Desa Harapan: Memilih Bantuan Tepat)
// ============================================================================
function MatchingGame({ config, onUpdate, playSound }) {
  const families = config.families || [];
  const aidPackages = config.aidPackages || [];
  const [matches, setMatches] = useState({}); // { familyId: aidPackageId }
  const [selectedFamilyId, setSelectedFamilyId] = useState(families[0]?.id || null);

  const handleMatch = (familyId, aidId) => {
    const nextMatches = { ...matches, [familyId]: aidId };
    setMatches(nextMatches);
    if (playSound) playSound('coin');

    const totalMatched = Object.keys(nextMatches).length;
    const correctCount = families.filter((f) => nextMatches[f.id] === f.correctAid).length;
    const canComplete = totalMatched === families.length && correctCount === families.length;

    onUpdate({
      allocations: nextMatches,
      coinsSpent: totalMatched * 30,
      remainingCoins: 90 - totalMatched * 30,
      canComplete,
      activeTip: canComplete
        ? 'Sempurna! Setiap keluarga menerima bantuan yang tepat sasaran.'
        : `Tercocokkan: ${totalMatched}/${families.length} keluarga. (${correctCount} tepat sasaran)`,
      placedCount: totalMatched,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-orange-950 flex items-center justify-center gap-2">
          <span>🎯</span> Balai Desa Harapan: Cocokkan Bantuan
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Pilih keluarga, lalu pilih paket bantuan yang paling sesuai dengan kebutuhan mereka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kolom Profil Keluarga */}
        <div className="space-y-2.5">
          <span className="text-xs font-black uppercase text-stone-600 block">
            Keluarga yang Membutuhkan:
          </span>
          {families.map((fam) => {
            const isSelected = selectedFamilyId === fam.id;
            const matchedAid = aidPackages.find((a) => a.id === matches[fam.id]);
            const isCorrect = matches[fam.id] === fam.correctAid;

            return (
              <div
                key={fam.id}
                onClick={() => setSelectedFamilyId(fam.id)}
                className={`p-3.5 rounded-2xl border-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/90 shadow-md ring-2 ring-orange-200'
                    : 'border-stone-200 bg-white hover:border-orange-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{fam.emoji}</span>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="font-black text-stone-900 text-sm">{fam.name}</h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-snug">{fam.description}</p>
                    {matchedAid && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-bold">
                        <span className="text-stone-500">Bantuan:</span>
                        <span
                          className={`px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          <span>{matchedAid.emoji}</span>
                          <span>{matchedAid.label}</span>
                          {isCorrect ? '✓' : '⚠️'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kolom Paket Bantuan */}
        <div className="space-y-2.5">
          <span className="text-xs font-black uppercase text-stone-600 block">
            Pilihan Paket Bantuan:
          </span>
          {aidPackages.map((aid) => (
            <button
              key={aid.id}
              onClick={() => selectedFamilyId && handleMatch(selectedFamilyId, aid.id)}
              className="w-full p-3.5 rounded-2xl border-2 border-stone-200 bg-white hover:border-amber-400 hover:bg-amber-50/60 transition-all text-left flex items-center gap-3 cursor-pointer shadow-xs active:scale-98"
            >
              <span className="text-3xl shrink-0">{aid.emoji}</span>
              <div className="flex-1">
                <h5 className="font-black text-stone-900 text-sm">{aid.label}</h5>
                <p className="text-xs text-stone-500 leading-snug">{aid.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 9: BUDGET SLIDER (Bendahara Kecil: Alokasi 200 Koin)
// ============================================================================
function BudgetSliderGame({ config, onUpdate, playSound }) {
  const posts = config.posts || [];
  const totalBudget = config.totalBudget || 200;
  const [allocation, setAllocation] = useState({
    post_pangan: 60,
    post_kesehatan: 40,
    post_pendidikan: 30,
    post_logistik: 20,
  });

  const currentTotal = Object.values(allocation).reduce((a, b) => a + b, 0);

  const handleAdjust = (postId, delta) => {
    const post = posts.find((p) => p.id === postId);
    const currentVal = allocation[postId] || 0;
    const nextVal = Math.max(0, currentVal + delta);
    const nextAlloc = { ...allocation, [postId]: nextVal };
    setAllocation(nextAlloc);
    if (playSound) playSound('coin');

    const nextTotal = Object.values(nextAlloc).reduce((a, b) => a + b, 0);
    const allMeetMin = posts.every((p) => (nextAlloc[p.id] || 0) >= (p.minRequired || 0));
    const canComplete = nextTotal === totalBudget && allMeetMin;

    onUpdate({
      allocations: nextAlloc,
      coinsSpent: nextTotal,
      remainingCoins: totalBudget - nextTotal,
      canComplete,
      activeTip: canComplete
        ? 'Luar biasa! 200 Koin Anggaran terbagi sempurna dan seluruh pos terpenuhi.'
        : `Total Anggaran: ${nextTotal}/${totalBudget} Koin. ${
            !allMeetMin ? 'Perhatikan syarat minimal setiap pos!' : ''
          }`,
      placedCount: Object.keys(nextAlloc).length,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-amber-950 flex items-center justify-center gap-2">
          <span>💰</span> Bendahara Kecil: Alokasikan 200 Koin
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Bagi anggaran ke 4 pos pengeluaran. Pastikan seluruh syarat minimal terpenuhi dan total tepat 200 Koin!
        </p>
      </div>

      {/* Meter Total Budget */}
      <div className="bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconKoinKebaikan size={28} />
          <div>
            <span className="text-[10px] font-black uppercase text-amber-900 block">Total Terbagi</span>
            <span className="font-display font-black text-xl text-amber-950">
              {currentTotal} / {totalBudget} Koin
            </span>
          </div>
        </div>
        <div>
          {currentTotal === totalBudget ? (
            <span className="text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Pas 200 Koin!
            </span>
          ) : currentTotal > totalBudget ? (
            <span className="text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 px-3 py-1 rounded-full">
              Kelebihan {currentTotal - totalBudget} Koin!
            </span>
          ) : (
            <span className="text-xs font-black bg-amber-200 text-amber-900 px-3 py-1 rounded-full">
              Sisa {totalBudget - currentTotal} Koin
            </span>
          )}
        </div>
      </div>

      {/* Daftar Pos Anggaran */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {posts.map((post) => {
          const val = allocation[post.id] || 0;
          const meetsMin = val >= (post.minRequired || 0);

          return (
            <div
              key={post.id}
              className={`p-3.5 rounded-2xl border-2 bg-white text-left ${
                meetsMin ? 'border-stone-200' : 'border-rose-300 bg-rose-50/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{post.emoji}</span>
                  <div>
                    <h4 className="font-black text-sm text-stone-900">{post.label}</h4>
                    <span className="text-[10px] text-stone-500 font-semibold block">
                      Min: {post.minRequired} Koin • Rekomendasi: {post.recommended} Koin
                    </span>
                  </div>
                </div>
                <span className="font-display font-black text-lg text-forest-800">{val} Koin</span>
              </div>
              <p className="text-[11px] text-stone-600 mb-3">{post.description}</p>

              {/* Kontrol Tambah Kurang */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleAdjust(post.id, -10)}
                    disabled={val <= 0}
                    className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 font-black text-stone-800 text-base flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleAdjust(post.id, +10)}
                    className="w-8 h-8 rounded-xl bg-amber-400 hover:bg-amber-500 font-black text-amber-950 text-base flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    +
                  </button>
                </div>
                {meetsMin ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Syarat Terpenuhi ✓
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    Kurang {post.minRequired - val} Koin
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 10: ROLE PUZZLE (Tim Gotong Royong: Koordinasi 3 Tim)
// ============================================================================
function RolePuzzleGame({ config, onUpdate, playSound }) {
  const teams = config.teams || [];
  const rounds = config.rounds || [];
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [roundDecisions, setRoundDecisions] = useState({}); // { roundId_teamId: actionIdx }

  const currentRound = rounds[currentRoundIdx] || rounds[0];

  const handleSelectTeamAction = (teamId, actionIdx) => {
    const key = `${currentRound.roundId}_${teamId}`;
    const nextDecisions = { ...roundDecisions, [key]: actionIdx };
    setRoundDecisions(nextDecisions);
    if (playSound) playSound('tap');

    // Cek apakah semua 3 tim di ronde ini sudah punya aksi
    const currentRoundDone = teams.every((t) => nextDecisions[`${currentRound.roundId}_${t.id}`] !== undefined);
    const totalDecisionsCount = Object.keys(nextDecisions).length;
    const canComplete = currentRoundIdx === rounds.length - 1 && currentRoundDone;

    onUpdate({
      allocations: nextDecisions,
      coinsSpent: totalDecisionsCount * 10,
      remainingCoins: 100 - totalDecisionsCount * 10,
      canComplete,
      activeTip: canComplete
        ? 'Luar biasa! Koordinasi gotong royong 3 ronde tuntas dengan gemilang!'
        : `Ronde ${currentRoundIdx + 1} dari ${rounds.length}: Pilih tindakan terbaik untuk masing-masing tim.`,
      placedCount: totalDecisionsCount,
    });
  };

  const handleNextRound = () => {
    if (currentRoundIdx < rounds.length - 1) {
      setCurrentRoundIdx((r) => r + 1);
      if (playSound) playSound('whoosh');
    }
  };

  const isCurrentRoundFullyChosen = teams.every(
    (t) => roundDecisions[`${currentRound.roundId}_${t.id}`] !== undefined
  );

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-lime-950 flex items-center justify-center gap-2">
          <span>🤝</span> Tim Gotong Royong: Ronde {currentRoundIdx + 1} / {rounds.length}
        </h3>
        <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
          Situasi: <strong>"{currentRound.situation}"</strong>
        </p>
      </div>

      {/* Kartu Pilihan Tim */}
      <div className="space-y-3 mb-4">
        {teams.map((team) => {
          const actionOptions = currentRound.teamActions[team.id] || [];
          const selectedIdx = roundDecisions[`${currentRound.roundId}_${team.id}`];

          return (
            <div key={team.id} className="p-3.5 rounded-2xl border-2 border-stone-200 bg-white text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{team.emoji}</span>
                <div>
                  <h4 className="font-black text-sm text-stone-900">{team.name}</h4>
                  <span className="text-[10px] text-stone-500 font-bold">{team.role}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {actionOptions.map((act, idx) => {
                  const isSelected = selectedIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectTeamAction(team.id, idx)}
                      className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-forest-600 bg-forest-50 text-forest-900 ring-2 ring-forest-200'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {isSelected ? '✓ ' : '• '}
                      {act}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigasi Antar Ronde */}
      {currentRoundIdx < rounds.length - 1 && (
        <div className="text-center">
          <button
            onClick={handleNextRound}
            disabled={!isCurrentRoundFullyChosen}
            className={`px-6 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto transition-all ${
              isCurrentRoundFullyChosen
                ? 'bg-forest-700 hover:bg-forest-800 text-white cursor-pointer shadow-md'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <span>Lanjut ke Ronde {currentRoundIdx + 2}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// LEVEL 11: CHAIN REACTION (Taman Wakaf Abadi: Dampak Berantai)
// ============================================================================
function ChainReactionGame({ config, onUpdate, playSound }) {
  const options = config.options || [];
  const [selectedId, setSelectedId] = useState(null);

  const selectedOption = options.find((o) => o.id === selectedId);

  const handleSelect = (optId) => {
    setSelectedId(optId);
    if (playSound) playSound('coin');

    onUpdate({
      allocations: { chosenWaqf: optId },
      coinsSpent: 120,
      remainingCoins: 0,
      canComplete: true,
      activeTip: 'Amati bagaimana satu wakaf produktif melahirkan kebaikan yang terus mengalir tanpa henti!',
      placedCount: 1,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-emerald-950 flex items-center justify-center gap-2">
          <span>🌳</span> Taman Wakaf Abadi: Pilih Wakaf Produktif
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Pilih salah satu program wakaf untuk taman desa dan saksikan efek berantainya yang abadi!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-300 scale-102'
                  : 'border-stone-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div className="text-3xl mb-1.5">{opt.emoji}</div>
              <h4 className="font-black text-stone-900 text-sm">{opt.label}</h4>
              <p className="text-xs text-stone-500 mt-1">{opt.description}</p>
            </button>
          );
        })}
      </div>

      {/* Efek Berantai / Ripple Animation */}
      {selectedOption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-left"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h5 className="font-black text-emerald-900 text-xs uppercase tracking-wider">
              Dampak Mengalir Berkesinambungan ({selectedOption.label}):
            </h5>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedOption.chainEffects.map((step) => (
              <div
                key={step.step}
                className="p-3 bg-white rounded-xl border border-emerald-200 shadow-xs flex items-center gap-2.5"
              >
                <span className="text-2xl">{step.emoji}</span>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-700 block">
                    Tahap {step.step}
                  </span>
                  <span className="text-xs font-bold text-stone-800 leading-tight block">
                    {step.effect}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// LEVEL 12: RANKING (Rapat Prioritas: Urutan Urgensi & Dampak)
// ============================================================================
function RankingGame({ config, onUpdate, playSound }) {
  const [programs, setPrograms] = useState(() => config.programs || []);

  const moveItem = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= programs.length) return;
    const newItems = [...programs];
    const [moved] = newItems.splice(fromIdx, 1);
    newItems.splice(toIdx, 0, moved);
    setPrograms(newItems);
    if (playSound) playSound('tap');

    // Cek apakah 3 program teratas sudah merupakan program urgensi tinggi (prog_gizi, prog_sanitasi, prog_beasiswa)
    const top3Ids = newItems.slice(0, 3).map((p) => p.id);
    const hasTop3Correct = ['prog_gizi', 'prog_sanitasi', 'prog_beasiswa'].every((id) =>
      top3Ids.includes(id)
    );

    onUpdate({
      allocations: { rankedIds: newItems.map((p) => p.id) },
      coinsSpent: 150,
      remainingCoins: 0,
      canComplete: hasTop3Correct,
      activeTip: hasTop3Correct
        ? 'Tepat sekali! 3 program teratas memiliki urgensi dan penerima manfaat tertinggi.'
        : 'Susun urutan program. Pastikan 3 program yang paling mendesak berada di posisi 1, 2, dan 3!',
      placedCount: 5,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-blue-950 flex items-center justify-center gap-2">
          <span>📋</span> Rapat Prioritas: Susun Urutan Program
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Hanya 3 program teratas yang dapat didanai. Gunakan tombol panah untuk menaikkan program yang lebih mendesak!
        </p>
      </div>

      <div className="space-y-2">
        {programs.map((prog, idx) => {
          const isTop3 = idx < 3;
          return (
            <div
              key={prog.id}
              className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 text-left transition-all ${
                isTop3 ? 'border-blue-400 bg-blue-50/80 shadow-xs' : 'border-stone-200 bg-white opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-xl font-display font-black text-xs flex items-center justify-center text-white shrink-0 ${
                    isTop3 ? 'bg-blue-600' : 'bg-stone-400'
                  }`}
                >
                  #{idx + 1}
                </span>
                <span className="text-2xl shrink-0">{prog.emoji}</span>
                <div>
                  <h4 className="font-black text-sm text-stone-900">{prog.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-stone-600 font-bold mt-0.5">
                    <span>Urgensi: {prog.urgency}</span>
                    <span>•</span>
                    <span>{prog.beneficiaries} Penerima</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveItem(idx, idx - 1)}
                  disabled={idx === 0}
                  className="w-7 h-7 rounded-lg bg-white border border-stone-300 font-black text-xs flex items-center justify-center disabled:opacity-20 cursor-pointer"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveItem(idx, idx + 1)}
                  disabled={idx === programs.length - 1}
                  className="w-7 h-7 rounded-lg bg-white border border-stone-300 font-black text-xs flex items-center justify-center disabled:opacity-20 cursor-pointer"
                >
                  ▼
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 13: PROJECT BUILDER (Proyek Impian: Rancang Program dari Nol)
// ============================================================================
function ProjectBuilderGame({ config, onUpdate, playSound }) {
  const steps = config.steps || [];
  const [selections, setSelections] = useState({});

  const handleSelectOption = (stepId, optId) => {
    const nextSelections = { ...selections, [stepId]: optId };
    setSelections(nextSelections);
    if (playSound) playSound('coin');

    const completedStepsCount = Object.keys(nextSelections).length;
    const canComplete = completedStepsCount === steps.length;

    onUpdate({
      allocations: nextSelections,
      coinsSpent: completedStepsCount * 25,
      remainingCoins: 100 - completedStepsCount * 25,
      canComplete,
      activeTip: canComplete
        ? 'Rancangan program bantuanmu selesai disusun dengan terstruktur dan profesional!'
        : `Tahap perancangan: ${completedStepsCount}/${steps.length} komponen terpilih.`,
      placedCount: completedStepsCount,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-purple-950 flex items-center justify-center gap-2">
          <span>🏗️</span> Proyek Impian: Rancang Komponen Program
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Pilih komponen terbaik untuk Tujuan, Sasaran, Alokasi, dan Pengukuran programmu.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((st) => (
          <div key={st.stepId} className="p-3.5 bg-white border-2 border-stone-200 rounded-2xl text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{st.emoji}</span>
              <h4 className="font-black text-stone-900 text-sm">
                {st.label} — {st.question}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {st.options.map((opt) => {
                const isSelected = selections[st.stepId] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(st.stepId, opt.id)}
                    className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 text-purple-950 ring-2 ring-purple-200'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {isSelected ? '✓ ' : '• '}
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 14: LEDGER (Buku Catatan Amanah: Akuntansi Kas Masuk/Keluar)
// ============================================================================
function LedgerGame({ config, onUpdate, playSound }) {
  const transactions = config.transactions || [];
  const startingBalance = config.startingBalance || 500;
  const [records, setRecords] = useState({}); // { txId: 'income' | 'expense' }

  const handleRecord = (txId, type) => {
    const nextRecords = { ...records, [txId]: type };
    setRecords(nextRecords);
    if (playSound) playSound('coin');

    const totalRecorded = Object.keys(nextRecords).length;
    const correctCount = transactions.filter((t) => nextRecords[t.id] === t.type).length;
    const canComplete = totalRecorded === transactions.length && correctCount === transactions.length;

    onUpdate({
      allocations: nextRecords,
      coinsSpent: totalRecorded * 20,
      remainingCoins: 100 - totalRecorded * 20,
      canComplete,
      activeTip: canComplete
        ? 'Buku kas seimbang sempurna! Seluruh transaksi telah dicatat dengan jujur.'
        : `Tercatat: ${totalRecorded}/${transactions.length} transaksi. (${correctCount} tepat)`,
      placedCount: totalRecorded,
    });
  };

  // Hitung running balance
  let currentBalance = startingBalance;
  transactions.forEach((tx) => {
    if (records[tx.id] === 'income') currentBalance += tx.amount;
    else if (records[tx.id] === 'expense') currentBalance -= tx.amount;
  });

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-indigo-950 flex items-center justify-center gap-2">
          <span>📒</span> Buku Catatan Amanah: Pembukuan Kas
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Tentukan setiap transaksi: apakah <strong>Pemasukan</strong> (uang masuk) atau <strong>Pengeluaran</strong> (uang keluar).
        </p>
      </div>

      {/* Saldo Berjalan */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-3 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-indigo-800 block">Saldo Kas Saat Ini:</span>
          <span className="font-display font-black text-xl text-indigo-950">{currentBalance} Koin Kas</span>
        </div>
        <span className="text-xs font-bold text-stone-500">
          Target Saldo Akhir: {config.expectedFinalBalance || 625} Koin
        </span>
      </div>

      <div className="space-y-2.5">
        {transactions.map((tx) => {
          const rec = records[tx.id];
          return (
            <div
              key={tx.id}
              className="p-3 bg-white border-2 border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
            >
              <div>
                <h4 className="font-black text-sm text-stone-900">{tx.description}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-display font-bold text-xs text-amber-800">{tx.amount} Koin</span>
                  <span className="text-[10px] text-stone-400">•</span>
                  <span className="text-[10px] text-stone-500 italic">{tx.hint}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRecord(tx.id, 'income')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    rec === 'income'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  }`}
                >
                  + Pemasukan
                </button>
                <button
                  onClick={() => handleRecord(tx.id, 'expense')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    rec === 'expense'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100'
                  }`}
                >
                  - Pengeluaran
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 15: EVIDENCE CHECK (Detektif Bukti: Audit 5 Faktur)
// ============================================================================
function EvidenceCheckGame({ config, onUpdate, playSound }) {
  const invoices = config.invoices || [];
  const [verdicts, setVerdicts] = useState({});

  const handleVerdict = (invId, status) => {
    const nextVerdicts = { ...verdicts, [invId]: status };
    setVerdicts(nextVerdicts);
    if (playSound) playSound('stamp');

    const totalVerdicts = Object.keys(nextVerdicts).length;
    const correctCount = invoices.filter((i) => nextVerdicts[i.id] === i.status).length;
    const canComplete = totalVerdicts === invoices.length && correctCount === invoices.length;

    onUpdate({
      allocations: nextVerdicts,
      coinsSpent: totalVerdicts * 20,
      remainingCoins: 100 - totalVerdicts * 20,
      canComplete,
      activeTip: canComplete
        ? 'Audit berhasil! Seluruh faktur valid dan mencurigakan berhasil kamu identifikasi.'
        : `Telah diperiksa: ${totalVerdicts}/${invoices.length} faktur. (${correctCount} tepat)`,
      placedCount: totalVerdicts,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-cyan-950 flex items-center justify-center gap-2">
          <span>🔍</span> Detektif Bukti: Periksa Faktur Pembelian
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Perhatikan detail nama vendor, tanggal, rincian barang, dan tanda tangan penjual!
        </p>
      </div>

      <div className="space-y-3">
        {invoices.map((inv) => {
          const v = verdicts[inv.id];
          return (
            <div
              key={inv.id}
              className={`p-3.5 rounded-2xl border-2 text-left bg-white transition-all ${
                v === inv.status
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : v
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-stone-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-stone-100">
                <div>
                  <h4 className="font-black text-sm text-stone-900">{inv.vendor}</h4>
                  <span className="text-[10px] text-stone-500 font-semibold block">Tanggal: {inv.date}</span>
                </div>
                <div className="text-right">
                  <span className="font-display font-black text-sm text-stone-900">
                    Rp {inv.total.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] block font-bold text-stone-500">
                    {inv.signature ? '✓ Ada Tanda Tangan' : '⚠️ Tanpa Tanda Tangan'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 mb-3">{inv.notes}</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVerdict(inv.id, 'valid')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    v === 'valid'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  }`}
                >
                  ✓ Faktur Valid
                </button>
                <button
                  onClick={() => handleVerdict(inv.id, 'suspicious')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    v === 'suspicious'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100'
                  }`}
                >
                  ⚠️ Mencurigakan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 16: GAP ANALYSIS (Jembatan Rencana-Nyata: Analisis Selisih)
// ============================================================================
function GapAnalysisGame({ config, onUpdate, playSound }) {
  const items = config.budgetItems || [];
  const [selectedExplanations, setSelectedExplanations] = useState({});

  const handleSelectExplanation = (itemId, expId) => {
    const nextExp = { ...selectedExplanations, [itemId]: expId };
    setSelectedExplanations(nextExp);
    if (playSound) playSound('tap');

    const totalSelected = Object.keys(nextExp).length;
    const correctCount = items.filter((it) => {
      const exp = it.explanations.find((e) => e.id === nextExp[it.id]);
      return exp?.isCorrect;
    }).length;
    const canComplete = totalSelected === items.length && correctCount === items.length;

    onUpdate({
      allocations: nextExp,
      coinsSpent: totalSelected * 50,
      remainingCoins: 200 - totalSelected * 50,
      canComplete,
      activeTip: canComplete
        ? 'Evaluasi selesai! Kamu memahami penyebab selisih antara rencana dan kenyataan.'
        : `Dianalisis: ${totalSelected}/${items.length} pos anggaran.`,
      placedCount: totalSelected,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-teal-950 flex items-center justify-center gap-2">
          <span>📊</span> Jembatan Rencana-Nyata: Analisis Selisih Anggaran
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Bandingkan anggaran yang direncanakan dengan realisasi. Pilih penjelasan yang paling logis dan jujur!
        </p>
      </div>

      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="p-3.5 bg-white border-2 border-stone-200 rounded-2xl text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-stone-100">
              <h4 className="font-black text-sm text-stone-900">{it.name}</h4>
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="text-stone-500">Rencana: {it.planned} Koin</span>
                <span className="text-forest-700">Realisasi: {it.actual} Koin</span>
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    it.difference === 0
                      ? 'bg-stone-100 text-stone-700'
                      : it.difference > 0
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  Selisih: {it.difference > 0 ? `+${it.difference}` : it.difference} Koin
                </span>
              </div>
            </div>

            <span className="text-[11px] font-black uppercase text-stone-500 block mb-1.5">
              Pilih Penjelasan yang Tepat:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {it.explanations.map((exp) => {
                const isSelected = selectedExplanations[it.id] === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => handleSelectExplanation(it.id, exp.id)}
                    className={`p-2 rounded-xl border-2 text-xs font-bold text-left transition-all cursor-pointer ${
                      isSelected
                        ? exp.isCorrect
                          ? 'border-teal-600 bg-teal-50 text-teal-950 ring-2 ring-teal-200'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {isSelected ? '✓ ' : '• '}
                    {exp.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 17: FACT CHECK (Pemeriksa Klaim: Verifikasi Berkas Penerima)
// ============================================================================
function FactCheckGame({ config, onUpdate, playSound }) {
  const applicants = config.applicants || [];
  const [decisions, setDecisions] = useState({});

  const handleDecision = (apId, verdict) => {
    const nextDecisions = { ...decisions, [apId]: verdict };
    setDecisions(nextDecisions);
    if (playSound) playSound('stamp');

    const totalDecided = Object.keys(nextDecisions).length;
    const correctCount = applicants.filter((a) => nextDecisions[a.id] === a.verdict).length;
    const canComplete = totalDecided === applicants.length && correctCount === applicants.length;

    onUpdate({
      allocations: nextDecisions,
      coinsSpent: totalDecided * 20,
      remainingCoins: 100 - totalDecided * 20,
      canComplete,
      activeTip: canComplete
        ? 'Verifikasi tuntas! Bantuan hanya diberikan kepada yang benar-benar berhak.'
        : `Diverifikasi: ${totalDecided}/${applicants.length} berkas. (${correctCount} akurat)`,
      placedCount: totalDecided,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-emerald-950 flex items-center justify-center gap-2">
          <span>✅</span> Pemeriksa Klaim: Verifikasi Penerima Bantuan
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Periksa berkas bukti pendukung setiap pendaftar untuk memastikan bantuan tepat sasaran.
        </p>
      </div>

      <div className="space-y-3">
        {applicants.map((ap) => {
          const d = decisions[ap.id];
          return (
            <div key={ap.id} className="p-3.5 bg-white border-2 border-stone-200 rounded-2xl text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="font-black text-sm text-stone-900">{ap.name}</h4>
                <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Klaim: "{ap.claim}"
                </span>
              </div>

              <div className="my-2">
                <span className="text-[10px] font-black uppercase text-stone-500 block mb-1">
                  Bukti Pendukung:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ap.evidence.map((ev, i) => (
                    <span key={i} className="text-[11px] font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded-lg border border-stone-200">
                      📄 {ev}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-500 italic mb-3 leading-snug">{ap.explanation}</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecision(ap.id, 'approve')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    d === 'approve'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  }`}
                >
                  ✓ Loloskan Bantuan
                </button>
                <button
                  onClick={() => handleDecision(ap.id, 'reject')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    d === 'reject'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100'
                  }`}
                >
                  ✕ Tolak (Tidak Sesuai Syarat)
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 18: DEFENSE PUZZLE (Benteng Aset Wakaf: Perlindungan Aset)
// ============================================================================
function DefensePuzzleGame({ config, onUpdate, playSound }) {
  const threats = config.threats || [];
  const [defenseActions, setDefenseActions] = useState({});

  const handleSelectDefense = (threatId, actionId) => {
    const nextActions = { ...defenseActions, [threatId]: actionId };
    setDefenseActions(nextActions);
    if (playSound) playSound('tap');

    const totalDefended = Object.keys(nextActions).length;
    const correctCount = threats.filter((th) => {
      const act = th.actions.find((a) => a.id === nextActions[th.id]);
      return act?.isCorrect;
    }).length;
    const canComplete = totalDefended === threats.length && correctCount === threats.length;

    onUpdate({
      allocations: nextActions,
      coinsSpent: totalDefended * 50,
      remainingCoins: 150 - totalDefended * 50,
      canComplete,
      activeTip: canComplete
        ? 'Aset wakaf terlindungi! Prosedur resmi dan hukum telah ditegakkan dengan amanah.'
        : `Ancaman ditangani: ${totalDefended}/${threats.length}.`,
      placedCount: totalDefended,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-rose-950 flex items-center justify-center gap-2">
          <span>🏰</span> Benteng Aset Wakaf: Tangkal Ancaman
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Pilih langkah perlindungan terbaik yang sesuai aturan syariah dan hukum negara.
        </p>
      </div>

      <div className="space-y-3.5">
        {threats.map((th) => (
          <div key={th.id} className="p-3.5 bg-white border-2 border-stone-200 rounded-2xl text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{th.emoji}</span>
              <div>
                <h4 className="font-black text-sm text-stone-900">{th.name}</h4>
                <p className="text-xs text-stone-500 mt-0.5">{th.description}</p>
              </div>
            </div>

            <div className="space-y-1.5 mt-2.5">
              {th.actions.map((act) => {
                const isSelected = defenseActions[th.id] === act.id;
                return (
                  <button
                    key={act.id}
                    onClick={() => handleSelectDefense(th.id, act.id)}
                    className={`w-full p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all cursor-pointer ${
                      isSelected
                        ? act.isCorrect
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {isSelected ? '✓ ' : '• '}
                    {act.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 19: REPORT BUILDER (Laporan Dampak: Laporan Transparan Publik)
// ============================================================================
function ReportBuilderGame({ config, onUpdate, playSound }) {
  const sections = config.sections || [];
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelectSection = (secId, optId) => {
    const nextSelections = { ...selectedOptions, [secId]: optId };
    setSelectedOptions(nextSelections);
    if (playSound) playSound('coin');

    const totalSelected = Object.keys(nextSelections).length;
    const canComplete = totalSelected === sections.length;

    onUpdate({
      allocations: nextSelections,
      coinsSpent: totalSelected * 25,
      remainingCoins: 100 - totalSelected * 25,
      canComplete,
      activeTip: canComplete
        ? 'Laporan dampak publik selesai disusun! Kejujuran dan transparansi adalah kehormatanmu.'
        : `Komponen laporan: ${totalSelected}/${sections.length} bagian telah dipilih.`,
      placedCount: totalSelected,
    });
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-lg font-black text-sky-950 flex items-center justify-center gap-2">
          <span>📈</span> Laporan Dampak: Susun Laporan Transparan
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Laporan yang jujur memuat capaian, kendala, rincian keuangan, dan saran perbaikan ke depan.
        </p>
      </div>

      <div className="space-y-3.5">
        {sections.map((sec) => (
          <div key={sec.sectionId} className="p-3.5 bg-white border-2 border-stone-200 rounded-2xl text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{sec.emoji}</span>
              <h4 className="font-black text-sm text-stone-900">
                {sec.label} — {sec.question}
              </h4>
            </div>

            <div className="space-y-1.5">
              {sec.options.map((opt) => {
                const isSelected = selectedOptions[sec.sectionId] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectSection(sec.sectionId, opt.id)}
                    className={`w-full p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-200'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {isSelected ? '✓ ' : '• '}
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// LEVEL 20: MULTI STAGE (Misi Akhir Terpadu: Puncak Seluruh Kompetensi)
// ============================================================================
function MultiStageGrandFinaleGame({ config, onUpdate, playSound }) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [stageProgress, setStageProgress] = useState({
    stage1_done: false,
    stage2_done: false,
    stage3_done: false,
  });

  const stages = config.stages || [
    { stageId: 'identify', label: 'Tahap 1: Identifikasi Kebutuhan Pokok', emoji: '🔍' },
    { stageId: 'allocate', label: 'Tahap 2: Alokasi 300 Koin Anggaran', emoji: '💰' },
    { stageId: 'report', label: 'Tahap 3: Laporan Pertanggungjawaban', emoji: '📊' },
  ];

  const handleCompleteStage = (stageKey) => {
    const nextProg = { ...stageProgress, [stageKey]: true };
    setStageProgress(nextProg);
    if (playSound) playSound('goalReached');

    const doneCount = Object.values(nextProg).filter(Boolean).length;
    const canComplete = doneCount === 3;

    onUpdate({
      allocations: nextProg,
      coinsSpent: doneCount * 100,
      remainingCoins: 300 - doneCount * 100,
      canComplete,
      activeTip: canComplete
        ? 'LUAR BIASA! Seluruh 3 tahap Misi Akhir Terpadu berhasil kamu kuasai!'
        : `Tahap ${doneCount}/3 selesai. Lanjutkan ke tahap berikutnya!`,
      placedCount: doneCount,
    });

    if (currentStageIdx < 2) {
      setCurrentStageIdx((s) => s + 1);
    }
  };

  return (
    <div className="p-3 sm:p-5 text-stone-800">
      <div className="text-center mb-4">
        <h3 className="text-xl font-black text-amber-950 flex items-center justify-center gap-2">
          <span>🌟</span> Misi Akhir Terpadu: Penjaga Amanah Sejati
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Buktikan seluruh keahlian yang telah kamu pelajari di 3 Dunia SADAQIDS!
        </p>
      </div>

      {/* Tabs 3 Tahap */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {stages.map((st, idx) => {
          const isDone = stageProgress[`stage${idx + 1}_done`];
          const isCurrent = currentStageIdx === idx;
          return (
            <button
              key={st.stageId}
              onClick={() => setCurrentStageIdx(idx)}
              className={`p-2.5 rounded-xl border-2 text-xs font-black transition-all cursor-pointer ${
                isCurrent
                  ? 'border-amber-500 bg-amber-100 text-amber-950 ring-2 ring-amber-300'
                  : isDone
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                  : 'border-stone-200 bg-white text-stone-500'
              }`}
            >
              <div className="text-lg">{st.emoji}</div>
              <span className="block truncate">{st.label}</span>
              {isDone && <span className="text-[10px] text-emerald-700 block">✓ Selesai</span>}
            </button>
          );
        })}
      </div>

      {/* Konten Tahap Saat Ini */}
      <div className="p-4 bg-white border-2 border-stone-200 rounded-2xl text-left">
        {currentStageIdx === 0 && (
          <div>
            <h4 className="font-black text-stone-900 text-base mb-1">
              Tahap 1: Identifikasi Kebutuhan Pokok Darurat
            </h4>
            <p className="text-xs text-stone-600 mb-4">
              Pilah kebutuhan mendesak masyarakat sebelum anggaran disalurkan.
            </p>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4 text-xs font-medium text-amber-950">
              💡 Bantuan obat, pangan pokok, dan air bersih harus diprioritaskan di atas barang rekreasi.
            </div>
            <button
              onClick={() => handleCompleteStage('stage1_done')}
              className="px-5 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Konfirmasi Identifikasi Kebutuhan Selesai ✓
            </button>
          </div>
        )}

        {currentStageIdx === 1 && (
          <div>
            <h4 className="font-black text-stone-900 text-base mb-1">
              Tahap 2: Alokasi 300 Koin Anggaran ke 4 Pos Bantuan
            </h4>
            <p className="text-xs text-stone-600 mb-4">
              Alokasikan dana program secara adil: 120 Pos Pangan, 80 Pos Kesehatan, 60 Pos Pendidikan, 40 Pos Operasional.
            </p>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 mb-4 text-xs font-medium text-emerald-950">
              💰 Seluruh pos mendapatkan alokasi sesuai rencana kerja tahunan yayasan.
            </div>
            <button
              onClick={() => handleCompleteStage('stage2_done')}
              className="px-5 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Konfirmasi Alokasi 300 Koin Tuntas ✓
            </button>
          </div>
        )}

        {currentStageIdx === 2 && (
          <div>
            <h4 className="font-black text-stone-900 text-base mb-1">
              Tahap 3: Laporan Pertanggungjawaban Terpadu
            </h4>
            <p className="text-xs text-stone-600 mb-4">
              Susun dan tanda tangani audit akhir program untuk disampaikan kepada seluruh donatur dan masyarakat.
            </p>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 mb-4 text-xs font-medium text-indigo-950">
              🛡️ "Kami menyatakan seluruh dana amanah telah disalurkan dengan jujur, teliti, dan transparan."
            </div>
            <button
              onClick={() => handleCompleteStage('stage3_done')}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-display font-black text-sm cursor-pointer shadow-md"
            >
              Stempel & Terbitkan Laporan Paripurna! 🌟
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// EXPORT UTAMA: WORLD INTERACTIVE GAMEPLAY
// ============================================================================
export function WorldInteractiveGameplay({
  mission,
  onStateUpdate,
  playSound,
  onNotify,
  isReducedMotion = false,
}) {
  const config = mission.gameConfig || {};
  const type = config.type || 'drag_sort';

  switch (type) {
    case 'drag_sort':
      return <DragSortGame config={config} onUpdate={onStateUpdate} playSound={playSound} isReducedMotion={isReducedMotion} />;
    case 'matching':
      return <MatchingGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'budget_slider':
      return <BudgetSliderGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'role_puzzle':
      return <RolePuzzleGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'chain_reaction':
      return <ChainReactionGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'ranking':
      return <RankingGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'project_builder':
      return <ProjectBuilderGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'ledger':
      return <LedgerGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'evidence_check':
      return <EvidenceCheckGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'gap_analysis':
      return <GapAnalysisGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'fact_check':
      return <FactCheckGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'defense_puzzle':
      return <DefensePuzzleGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'report_builder':
      return <ReportBuilderGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    case 'multi_stage':
      return <MultiStageGrandFinaleGame config={config} onUpdate={onStateUpdate} playSound={playSound} />;
    default:
      return <DragSortGame config={config} onUpdate={onStateUpdate} playSound={playSound} isReducedMotion={isReducedMotion} />;
  }
}
