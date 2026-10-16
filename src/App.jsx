import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationBar } from './components/NavigationBar';
import { ModalConfirmReset } from './components/ModalConfirmReset';
import { ModalPohonKebaikan } from './components/ModalPohonKebaikan';
import { FeedbackToast } from './components/FeedbackToast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { EducationalIntro } from './components/EducationalIntro';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { WorldMap } from './pages/WorldMap';
import { LevelMap } from './pages/LevelMap';
import { MissionGameplay } from './pages/MissionGameplay';
import { ImpactScreen } from './pages/ImpactScreen';
import { ReflectionScreen } from './pages/ReflectionScreen';
import { LevelCompletion } from './pages/LevelCompletion';
import { MISSIONS_DATA } from './data/missions';
import { getLevelById, getLevelsByWorldId, WORLDS_CONFIG, isWorldUnlocked } from './data/worldsData';
import { loadProgress, saveProgress, resetProgress } from './utils/progressStorage';
import { playSoundEffect, startBgm, stopBgm, duckBgm } from './utils/useGameSound';

export function App() {
  const [progressState, setProgressState] = useState(() => {
    const { data } = loadProgress();
    return {
      ...data,
      completedLevels: Array.isArray(data?.completedLevels) ? data.completedLevels : [],
      earnedBadges: Array.isArray(data?.earnedBadges) ? data.earnedBadges : [],
      worldBadges: Array.isArray(data?.worldBadges) ? data.worldBadges : [],
    };
  });

  const [isPersistentStorage, setIsPersistentStorage] = useState(() => {
    const { isPersistent } = loadProgress();
    return isPersistent;
  });

  // Screen state: welcome | world_map | map | intro | gameplay | impact | reflection | completion
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedWorldId, setSelectedWorldId] = useState(() => progressState?.activeWorldId || 1);
  const [selectedMissionId, setSelectedMissionId] = useState(1);
  const [playerAllocations, setPlayerAllocations] = useState({});
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  // Pengaturan preferensi Gerak Tenang, Suara Efek (SFX), dan Musik Latar (BGM)
  const isReducedMotion = Boolean(progressState?.settings?.reducedMotion);
  const isSoundEnabled = progressState?.settings?.soundEnabled ?? true;
  const isMusicEnabled = progressState?.settings?.musicEnabled ?? true;

  useEffect(() => {
    if (isReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [isReducedMotion]);

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleReducedMotion = () => {
    const nextState = {
      ...progressState,
      settings: {
        ...progressState.settings,
        reducedMotion: !isReducedMotion,
      },
    };
    setProgressState(nextState);
    saveProgress(nextState);
    playSoundEffect('tap', isSoundEnabled);
  };

  const handleToggleSound = () => {
    const nextSound = !isSoundEnabled;
    const nextState = {
      ...progressState,
      settings: {
        ...progressState.settings,
        soundEnabled: nextSound,
      },
    };
    setProgressState(nextState);
    saveProgress(nextState);
    if (nextSound) {
      playSoundEffect('coin', true);
    }
  };

  const handleToggleMusic = () => {
    const nextMusic = !isMusicEnabled;
    const nextState = {
      ...progressState,
      settings: {
        ...progressState.settings,
        musicEnabled: nextMusic,
      },
    };
    setProgressState(nextState);
    saveProgress(nextState);

    if (nextMusic) {
      startBgm(true);
      showToast('Musik petualangan menyala!', 'success');
    } else {
      stopBgm();
      showToast('Musik latar dinonaktifkan', 'info');
    }
  };

  const handleStartAdventure = () => {
    playSoundEffect('chime', isSoundEnabled);
    if (isMusicEnabled) {
      startBgm(true);
    }
    setCurrentScreen('world_map');
  };

  const handleSelectWorld = (worldId) => {
    playSoundEffect('tap', isSoundEnabled);
    setSelectedWorldId(worldId);
    setCurrentScreen('map');
  };

  // Dari Peta -> Masuk ke Intro Animasi Edukasi Terlebih Dahulu
  const handleSelectMission = (missionId) => {
    playSoundEffect('tap', isSoundEnabled);
    setSelectedMissionId(missionId);
    setPlayerAllocations({});
    setCurrentScreen('intro');
  };

  // Dari Intro -> Masuk ke Gameplay Simulasi Koin
  const handleStartMissionFromIntro = () => {
    playSoundEffect('tap', isSoundEnabled);
    duckBgm(false);
    setCurrentScreen('gameplay');
  };

  const handleSubmitAllocation = (allocations) => {
    setPlayerAllocations(allocations);
    setCurrentScreen('impact');
  };

  const handleProceedToReflection = () => {
    playSoundEffect('tap', isSoundEnabled);
    setCurrentScreen('reflection');
  };

  const handleCompleteReflection = () => {
    const mission = getLevelById(selectedMissionId, MISSIONS_DATA) || MISSIONS_DATA[0];
    const currentCompleted = Array.isArray(progressState?.completedLevels) ? progressState.completedLevels : [];
    const updatedCompleted = Array.from(new Set([...currentCompleted, selectedMissionId]));
    const nextUnlockedLevel = Math.max(progressState?.unlockedLevel || 1, selectedMissionId + 1);

    // Kenaikan fase pohon bertahap dan nyata sepanjang 20 level (3 Dunia):
    // 0 selesai: Fase 1 (Tunas Mungil)
    // 1-2 level selesai: Fase 2 (Ranting Ceria Bertunas)
    // 3-5 level selesai: Fase 3 (Pohon Rimbun Meneduhkan)
    // 6-9 level selesai: Fase 4 (Pohon Lebat Berbunga) - Tuntas Dunia 1
    // 10-13 level selesai: Fase 5 (Pohon Berbuah Emas Sedekah) - Tuntas Dunia 2
    // 14-19 level selesai: Fase 6 (Pohon Bersinar Penuh Berkah)
    // 20 level selesai: Fase 7 (Pohon Paripurna Bermahkota Emas) - Tuntas Seluruh Dunia
    const count = updatedCompleted.length;
    let targetTreeStage = 1;
    if (count >= 20) targetTreeStage = 7;
    else if (count >= 14) targetTreeStage = 6;
    else if (count >= 10) targetTreeStage = 5;
    else if (count >= 6) targetTreeStage = 4;
    else if (count >= 3) targetTreeStage = 3;
    else if (count >= 1) targetTreeStage = 2;

    const prevTreeStage = progressState.treeStage || 1;
    const newTreeStage = Math.max(prevTreeStage, targetTreeStage);
    const newBadges = Array.from(new Set([...progressState.earnedBadges, mission.badgeId]));

    let newWorldBadges = progressState.worldBadges || [];
    if (updatedCompleted.filter((id) => id <= 6).length === 6 && !newWorldBadges.includes('world_1_complete')) {
      newWorldBadges = [...newWorldBadges, 'world_1_complete'];
      showToast('🎉 Selamat! Dunia 2: Perancang Kebaikan Terbuka!', 'success');
    }
    if (updatedCompleted.filter((id) => id >= 7 && id <= 13).length === 7 && !newWorldBadges.includes('world_2_complete')) {
      newWorldBadges = [...newWorldBadges, 'world_2_complete'];
      showToast('🛡️ Hebat! Dunia 3: Penjaga Amanah Terbuka!', 'success');
    }
    if (updatedCompleted.length === 20 && !newWorldBadges.includes('world_3_complete')) {
      newWorldBadges = [...newWorldBadges, 'world_3_complete'];
      showToast('👑 PARIPURNA! Seluruh 20 Level SADAQIDS Tuntas!', 'success');
    }

    const updatedState = {
      ...progressState,
      completedLevels: updatedCompleted,
      unlockedLevel: nextUnlockedLevel,
      activeWorldId: selectedWorldId,
      prevTreeStage: prevTreeStage,
      treeStage: newTreeStage,
      earnedBadges: newBadges,
      worldBadges: newWorldBadges,
      lastCompletedMissionSummary: mission.summaryLesson,
    };

    setProgressState(updatedState);
    saveProgress(updatedState);
    setCurrentScreen('completion');
  };

  const handleConfirmReset = () => {
    playSoundEffect('tap', isSoundEnabled);
    duckBgm(false);
    const cleanState = resetProgress();
    setProgressState(cleanState);
    setIsResetModalOpen(false);
    setCurrentScreen('world_map');
    showToast('Cerita berhasil diulang dari tunas mungil!', 'info');
  };

  const currentMission = getLevelById(selectedMissionId, MISSIONS_DATA) || MISSIONS_DATA[0];

  // Parameter transisi antarlayar
  const sceneVariants = {
    initial: isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
    exit: isReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, transition: { duration: 0.2 } },
  };

  const completedLevelsList = Array.isArray(progressState?.completedLevels) ? progressState.completedLevels : [];
  const isDarkScreen = ['welcome', 'world_map', 'map', 'intro', 'gameplay'].includes(currentScreen);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${
        isDarkScreen
          ? 'bg-slate-950 text-stone-100 selection:bg-forest-100 selection:text-forest-900'
          : 'bg-gradient-to-b from-sky-50/70 via-amber-50/40 to-emerald-50/80 text-stone-800 selection:bg-forest-200 selection:text-forest-900'
      }`}
    >
      <NavigationBar
        currentScreen={currentScreen}
        onNavigateHome={() => {
          playSoundEffect('tap', isSoundEnabled);
          duckBgm(false);
          setCurrentScreen('welcome');
        }}
        onOpenResetModal={() => {
          playSoundEffect('tap', isSoundEnabled);
          setIsResetModalOpen(true);
        }}
        isReducedMotion={isReducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
        isMusicEnabled={isMusicEnabled}
        onToggleMusic={handleToggleMusic}
        isPersistentStorage={isPersistentStorage}
        treeStage={progressState?.treeStage || 1}
        onOpenTreeModal={() => setIsTreeModalOpen(true)}
      />

      <ErrorBoundary onReset={() => setCurrentScreen('welcome')}>
        <main className="flex-1 flex flex-col relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && (
            <motion.div key="welcome" {...sceneVariants} className="flex-1 flex flex-col">
              <WelcomeScreen
                onStartAdventure={handleStartAdventure}
                onSelectWorld={handleSelectWorld}
                completedLevels={completedLevelsList}
                isReducedMotion={isReducedMotion}
                treeStage={progressState?.treeStage || 1}
              />
            </motion.div>
          )}

          {currentScreen === 'world_map' && (
            <motion.div key="world_map" {...sceneVariants} className="flex-1 flex flex-col">
              <WorldMap
                completedLevels={completedLevelsList}
                onSelectWorld={handleSelectWorld}
                treeStage={progressState?.treeStage || 1}
                isReducedMotion={isReducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 'map' && (
            <motion.div key="map" {...sceneVariants} className="flex-1 flex flex-col">
              <LevelMap
                worldId={selectedWorldId}
                levelsData={getLevelsByWorldId(selectedWorldId, MISSIONS_DATA)}
                unlockedLevel={progressState?.unlockedLevel || 1}
                completedLevels={completedLevelsList}
                treeStage={progressState?.treeStage || 1}
                earnedBadges={Array.isArray(progressState?.earnedBadges) ? progressState.earnedBadges : []}
                onSelectMission={handleSelectMission}
                onBackToWorlds={() => {
                  playSoundEffect('tap', isSoundEnabled);
                  setCurrentScreen('world_map');
                }}
                onOpenResetModal={() => setIsResetModalOpen(true)}
                onOpenTreeModal={() => setIsTreeModalOpen(true)}
                isReducedMotion={isReducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 'intro' && (
            <motion.div key="intro" {...sceneVariants} className="flex-1 flex flex-col">
              <EducationalIntro
                mission={currentMission}
                onStartMission={handleStartMissionFromIntro}
                onBackToMap={() => {
                  playSoundEffect('tap', isSoundEnabled);
                  duckBgm(false);
                  setCurrentScreen('map');
                }}
                onDuckBgm={duckBgm}
                isSoundEnabled={isSoundEnabled}
                isReducedMotion={isReducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 'gameplay' && (
            <motion.div key="gameplay" {...sceneVariants} className="flex-1 flex flex-col">
              <MissionGameplay
                mission={currentMission}
                onBackToMap={() => {
                  playSoundEffect('tap', isSoundEnabled);
                  setCurrentScreen('map');
                }}
                onSubmitAllocation={handleSubmitAllocation}
                onPlaySound={(type) => playSoundEffect(type, isSoundEnabled)}
                onShowToast={showToast}
                isReducedMotion={isReducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 'impact' && (
            <motion.div key="impact" {...sceneVariants} className="flex-1 flex flex-col">
              <ImpactScreen
                mission={currentMission}
                playerAllocations={playerAllocations}
                onProceedToReflection={handleProceedToReflection}
                onBackToAllocation={() => {
                  playSoundEffect('tap', isSoundEnabled);
                  setCurrentScreen('gameplay');
                }}
                onPlaySound={(type) => playSoundEffect(type, isSoundEnabled)}
                isReducedMotion={isReducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 'reflection' && (
            <motion.div key="reflection" {...sceneVariants} className="flex-1 flex flex-col">
              <ReflectionScreen
                mission={currentMission}
                onCompleteReflection={handleCompleteReflection}
                onPlaySound={(type) => playSoundEffect(type, isSoundEnabled)}
                onShowToast={showToast}
                isReducedMotion={isReducedMotion}
                treeStage={progressState.treeStage}
              />
            </motion.div>
          )}

          {currentScreen === 'completion' && (
            <motion.div key="completion" {...sceneVariants} className="flex-1 flex flex-col">
              <LevelCompletion
                mission={currentMission}
                onReturnToMap={() => {
                  playSoundEffect('tap', isSoundEnabled);
                  // Jika baru saja menyelesaikan level terakhir dari suatu dunia:
                  // Level 6 (Akhir Dunia 1) -> buka Peta Dunia & sorot Dunia 2
                  // Level 13 (Akhir Dunia 2) -> buka Peta Dunia & sorot Dunia 3
                  // Level 20 (Akhir Dunia 3) -> kembali ke Peta Dunia Paripurna
                  if (currentMission.id === 6) {
                    setSelectedWorldId(2);
                    setCurrentScreen('world_map');
                  } else if (currentMission.id === 13) {
                    setSelectedWorldId(3);
                    setCurrentScreen('world_map');
                  } else if (currentMission.id === 20) {
                    setCurrentScreen('world_map');
                  } else {
                    setCurrentScreen('map');
                  }
                }}
                onPlaySound={(type) => playSoundEffect(type, isSoundEnabled)}
                isReducedMotion={isReducedMotion}
                prevTreeStage={progressState.prevTreeStage || Math.max(1, (progressState.treeStage || 2) - 1)}
                newTreeStage={progressState.treeStage}
                onOpenTreeModal={() => setIsTreeModalOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        </main>
      </ErrorBoundary>

      {/* Modal Dialog Taman Pohon Kebaikan */}
      <ModalPohonKebaikan
        isOpen={isTreeModalOpen}
        onClose={() => setIsTreeModalOpen(false)}
        treeStage={progressState?.treeStage || 1}
        completedLevelsCount={completedLevelsList.length}
        onPlaySound={(type) => playSoundEffect(type, isSoundEnabled)}
        isReducedMotion={isReducedMotion}
      />

      {/* Modal Dialog Konfirmasi Reset */}
      <ModalConfirmReset
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
        isReducedMotion={isReducedMotion}
      />

      {/* Feedback Toast Mikro */}
      <FeedbackToast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
        isReducedMotion={isReducedMotion}
      />
    </div>
  );
}

export default App;
