// Utilitas penyimpanan progres dengan LocalStorage & In-Memory Fallback yang aman
// Versi 2.0: Support 3 Dunia (20 Level) dengan migrasi aman dari v1.0 (6 Level)

const STORAGE_KEY = 'jejak_baik_progress_v2'; // Key baru untuk versi 3 dunia
const LEGACY_KEY = 'jejak_baik_progress_v1';   // Key lama untuk migrasi

const DEFAULT_STATE = {
  version: '2.0',
  completedLevels: [],
  unlockedWorlds: [1],
  activeWorldId: 1,
  unlockedLevel: 1,
  treeStage: 1,
  earnedBadges: [],
  worldBadges: [],
  settings: {
    reducedMotion: false,
    soundEnabled: true,
    musicEnabled: true,
  },
  lastCompletedMissionSummary: null,
};

let inMemoryStore = null;
let storageWorks = null;

export function checkStorageAvailability() {
  if (storageWorks !== null) return storageWorks;
  try {
    const testKey = '__test_storage__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    storageWorks = true;
  } catch (e) {
    storageWorks = false;
  }
  return storageWorks;
}

function migrateFromV1(legacyData) {
  console.info('[SADAQIDS] Migrating progress from v1.0 to v2.0...');
  const legacyCompleted = legacyData.completedLevels || [];
  const legacyUnlocked = legacyData.unlockedLevel || 1;
  const legacyBadges = legacyData.earnedBadges || [];
  const legacyTreeStage = legacyData.treeStage || 1;
  const migratedCompletedLevels = legacyCompleted.filter((id) => id >= 1 && id <= 6);
  const newUnlockedLevel = Math.min(
    Math.max(legacyUnlocked, migratedCompletedLevels.length > 0 ? Math.max(...migratedCompletedLevels) + 1 : 1),
    7
  );
  return {
    ...DEFAULT_STATE,
    version: '2.0',
    completedLevels: migratedCompletedLevels,
    unlockedWorlds: [1],
    activeWorldId: 1,
    unlockedLevel: newUnlockedLevel,
    treeStage: legacyTreeStage,
    earnedBadges: legacyBadges,
    worldBadges: [],
    settings: { ...DEFAULT_STATE.settings, ...(legacyData.settings || {}) },
    lastCompletedMissionSummary: legacyData.lastCompletedMissionSummary || null,
    migratedFromV1: true,
    migrationDate: new Date().toISOString(),
  };
}

export function loadProgress() {
  const isAvailable = checkStorageAvailability();
  if (!isAvailable) {
    if (!inMemoryStore) inMemoryStore = { ...DEFAULT_STATE };
    return { data: inMemoryStore, isPersistent: false };
  }
  try {
    const rawV2 = window.localStorage.getItem(STORAGE_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      const safeCompleted = Array.isArray(parsed?.completedLevels)
        ? parsed.completedLevels
        : (typeof parsed?.completedLevels === 'object' && parsed?.completedLevels !== null)
        ? Object.keys(parsed.completedLevels).map(Number).filter(n => !isNaN(n) && n > 0)
        : [];
      const safeEarnedBadges = Array.isArray(parsed?.earnedBadges) ? parsed.earnedBadges : [];
      const safeWorldBadges = Array.isArray(parsed?.worldBadges) ? parsed.worldBadges : [];
      const safeUnlockedWorlds = Array.isArray(parsed?.unlockedWorlds) ? parsed.unlockedWorlds : [1];

      return {
        data: {
          ...DEFAULT_STATE,
          ...parsed,
          completedLevels: safeCompleted,
          earnedBadges: safeEarnedBadges,
          worldBadges: safeWorldBadges,
          unlockedWorlds: safeUnlockedWorlds,
          settings: { ...DEFAULT_STATE.settings, ...(parsed?.settings || {}) },
        },
        isPersistent: true,
      };
    }
    const rawV1 = window.localStorage.getItem(LEGACY_KEY);
    if (rawV1) {
      const legacyParsed = JSON.parse(rawV1);
      const migratedState = migrateFromV1(legacyParsed);
      saveProgress(migratedState);
      return { data: migratedState, isPersistent: true };
    }
    const freshState = { ...DEFAULT_STATE };
    saveProgress(freshState);
    return { data: freshState, isPersistent: true };
  } catch (err) {
    console.warn('Gagal membaca localStorage, beralih ke state memori', err);
    if (!inMemoryStore) inMemoryStore = { ...DEFAULT_STATE };
    return { data: { ...inMemoryStore }, isPersistent: false };
  }
}

export function saveProgress(newState) {
  const isAvailable = checkStorageAvailability();
  const payload = { ...DEFAULT_STATE, ...newState, lastPlayed: new Date().toISOString() };
  if (!isAvailable) { inMemoryStore = payload; return false; }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.warn('Gagal menyimpan ke localStorage, menggunakan memori sesi', err);
    inMemoryStore = payload;
    return false;
  }
}

export function resetProgress() {
  const isAvailable = checkStorageAvailability();
  const cleanState = { ...DEFAULT_STATE };
  inMemoryStore = { ...cleanState };
  if (isAvailable) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_KEY);
    } catch (e) {}
  }
  return cleanState;
}

export function computeTreeStage(completedLevels = []) {
  const world1Completed = completedLevels.filter((id) => id >= 1 && id <= 6).length;
  const stageMap = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7 };
  return stageMap[world1Completed] || 1;
}
