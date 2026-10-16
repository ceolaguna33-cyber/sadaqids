// ============================================================================
// SADAQIDS Audio Manager
//
// BGM  : HTML5 Audio — /audio/backsound.mp3 — singleton, loop=true, vol 0.30
// SFX  : Web Audio API synthesizer — clean procedural tones, zero latency
//
// Arsitektur singleton: tidak ada instance ganda.
// Autoplay policy: audio tidak dimulai sebelum interaksi pengguna pertama.
// ============================================================================

// ── BGM (Background Music) ──────────────────────────────────────────────────

let bgmAudio = null;         // satu-satunya instance HTMLAudioElement
let bgmReady = false;        // true setelah element dibuat
let isBgmUserEnabled = true; // preferensi pengguna (ON / OFF)
const BGM_VOLUME = 0.30;
const BGM_DUCK_VOLUME = 0.07;

function getBgmAudio() {
  if (typeof window === 'undefined') return null;
  if (!bgmAudio) {
    bgmAudio = new Audio();
    bgmAudio.src = '/audio/backsound.mp3';
    bgmAudio.loop = true;
    bgmAudio.volume = BGM_VOLUME;
    bgmAudio.preload = 'auto';
    bgmAudio.crossOrigin = 'anonymous';

    bgmAudio.addEventListener('canplaythrough', () => {
      bgmReady = true;
    });

    bgmAudio.addEventListener('error', (e) => {
      // Fallback ke .mp4 (file yang sama, hanya salin)
      if (!bgmAudio.src.endsWith('.mp4')) {
        console.debug('[BGM] .mp3 gagal, mencoba .mp4 fallback…');
        bgmAudio.src = '/audio/backsound.mp4';
        bgmAudio.load();
      } else {
        console.debug('[BGM] Audio tidak dapat dimuat:', e);
      }
    });

    // Lanjutkan setelah browser suspend (tab background / kebijakan autoplay)
    bgmAudio.addEventListener('suspend', () => {});
  }
  return bgmAudio;
}

/**
 * Mulai BGM setelah interaksi pengguna.
 * Aman dipanggil berulang kali — tidak akan membuat instance baru.
 */
export async function startBgm(isMusicEnabled = true) {
  isBgmUserEnabled = isMusicEnabled;
  if (!isMusicEnabled) return;

  const audio = getBgmAudio();
  if (!audio) return;

  // Jika sudah diputar, tidak perlu apa-apa
  if (!audio.paused) return;

  audio.volume = BGM_VOLUME;

  try {
    await audio.play();
    console.debug('[BGM] Diputar —', audio.src);
  } catch (err) {
    // Autoplay diblokir browser — tidak ada status palsu
    console.debug('[BGM] play() diblokir:', err.message);
  }
}

/**
 * Hentikan (pause) BGM.
 */
export function stopBgm() {
  isBgmUserEnabled = false;
  const audio = getBgmAudio();
  if (!audio) return;
  if (!audio.paused) {
    audio.pause();
  }
}

/**
 * Turunkan volume BGM (ducking) saat narasi/dialog berlangsung.
 * @param {boolean} shouldDuck
 */
export function duckBgm(shouldDuck = true) {
  const audio = getBgmAudio();
  if (!audio) return;
  const targetVol = shouldDuck ? BGM_DUCK_VOLUME : BGM_VOLUME;
  // Smooth via setInterval ramp agar tidak jump
  _rampVolume(audio, targetVol, 600);
}

function _rampVolume(audioEl, target, durationMs) {
  const steps = 20;
  const interval = durationMs / steps;
  const start = audioEl.volume;
  const delta = (target - start) / steps;
  let step = 0;
  const id = setInterval(() => {
    step++;
    audioEl.volume = Math.max(0, Math.min(1, start + delta * step));
    if (step >= steps) clearInterval(id);
  }, interval);
}

/**
 * Kembalikan status apakah BGM sedang aktif diputar.
 */
export function getIsBgmPlaying() {
  const audio = getBgmAudio();
  return audio ? !audio.paused : false;
}

// Tangani visibilitychange agar tidak buang resource saat tab tersembunyi
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    const audio = getBgmAudio();
    if (!audio) return;
    if (document.hidden) {
      // Tab tersembunyi: hentikan sementara (hemat CPU)
      if (!audio.paused) audio.pause();
    } else {
      // Tab aktif kembali: lanjutkan jika pengguna tidak matikan musik
      if (audio.paused && isBgmUserEnabled) {
        audio.play().catch(() => {});
      }
    }
  });
}

// ── SFX (Sound Effects) via Web Audio API ──────────────────────────────────

let sfxCtx = null;

function getSfxContext() {
  if (typeof window === 'undefined') return null;
  if (!sfxCtx) {
    const Cls = window.AudioContext || window.webkitAudioContext;
    if (Cls) sfxCtx = new Cls();
  }
  // Resume jika suspended (penting setelah interaksi pertama)
  if (sfxCtx && sfxCtx.state === 'suspended') {
    sfxCtx.resume().catch(() => {});
  }
  return sfxCtx;
}

/**
 * Putar sound effect UI.
 * @param {'tap'|'coin'|'chime'|'stamp'|'goalReached'|'badgeFanfare'|'whoosh'|'success'} type
 * @param {boolean} isSoundEnabled
 */
export function playSoundEffect(type, isSoundEnabled = true) {
  if (!isSoundEnabled) return;
  const ctx = getSfxContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    switch (type) {
      // ── Ketukan tombol ringan ──────────────────────────────────────────────
      case 'tap': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.06);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.10);
        break;
      }

      // ── Koin berdentang ceria ──────────────────────────────────────────────
      case 'coin': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.08);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.32);
        break;
      }

      // ── Chime masuk petualangan ────────────────────────────────────────────
      case 'chime': {
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.10);
          g.gain.setValueAtTime(0.18, now + i * 0.10);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.10 + 0.45);
          o.connect(g); g.connect(ctx.destination);
          o.start(now + i * 0.10); o.stop(now + i * 0.10 + 0.48);
        });
        break;
      }

      // ── Stempel kayu (klik konfirmasi) ────────────────────────────────────
      case 'stamp': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(65, now + 0.14);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.20);
        break;
      }

      // ── Target tercapai / kebutuhan pokok terpenuhi ────────────────────────
      case 'goalReached': {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.09);
          g.gain.setValueAtTime(0.18, now + i * 0.09);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35);
          o.connect(g); g.connect(ctx.destination);
          o.start(now + i * 0.09); o.stop(now + i * 0.09 + 0.38);
        });
        break;
      }

      // ── Fanfare lencana / reward ──────────────────────────────────────────
      case 'badgeFanfare': {
        const fanfareNotes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
        fanfareNotes.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, now + i * 0.10);
          g.gain.setValueAtTime(0.22, now + i * 0.10);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.10 + 0.50);
          o.connect(g); g.connect(ctx.destination);
          o.start(now + i * 0.10); o.stop(now + i * 0.10 + 0.52);
        });
        break;
      }

      // ── Whoosh (aksi ditolak / peringatan) ───────────────────────────────
      case 'whoosh': {
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        }
        const src = ctx.createBufferSource();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(200, now + 0.18);
        filter.Q.value = 1.2;
        src.buffer = buf;
        gain.gain.setValueAtTime(0.20, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
        src.start(now);
        break;
      }

      // ── Success (misi selesai / submit berhasil) ──────────────────────────
      case 'success': {
        // Arpeggio naik + satu nada panjang di akhir
        const successNotes = [523.25, 659.25, 783.99, 1046.5];
        successNotes.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = i === successNotes.length - 1 ? 'sine' : 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.10);
          const peakTime = now + i * 0.10;
          const releaseTime = i === successNotes.length - 1 ? 0.70 : 0.30;
          g.gain.setValueAtTime(0.001, peakTime);
          g.gain.linearRampToValueAtTime(0.25, peakTime + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, peakTime + releaseTime);
          o.connect(g); g.connect(ctx.destination);
          o.start(peakTime); o.stop(peakTime + releaseTime + 0.05);
        });
        break;
      }

      default:
        // Jenis tidak dikenali — diam saja, tidak error
        break;
    }
  } catch (err) {
    console.debug('[SFX] Dilewati:', err.message);
  }
}
