import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

/**
 * Komponen Jembatan React <-> Phaser
 * Mengelola lifecycle engine game dengan aman menggunakan
 * Phaser native preload pipeline untuk memuat aset SVG.
 */
export function PhaserGame({
  sceneClass,
  mission,
  isReducedMotion = false,
  onStateUpdate,
  playSound,
  onNotify,
  className = '',
}) {
  const containerRef = useRef(null);
  const gameRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const callbacksRef = useRef({ onStateUpdate, playSound, onNotify });
  useEffect(() => {
    callbacksRef.current = { onStateUpdate, playSound, onNotify };
  }, [onStateUpdate, playSound, onNotify]);

  useEffect(() => {
    let isCancelled = false;

    if (!containerRef.current) return;

    // Jembatan event ke React
    const bridge = {
      onStateUpdate: (state) => {
        if (callbacksRef.current.onStateUpdate) {
          callbacksRef.current.onStateUpdate(state);
        }
      },
      playSound: (soundKey) => {
        if (callbacksRef.current.playSound) {
          callbacksRef.current.playSound(soundKey);
        }
      },
      notify: (message, type) => {
        if (callbacksRef.current.onNotify) {
          callbacksRef.current.onNotify(message, type);
        }
      },
    };

    // Konfigurasi Phaser — aset dimuat via preload() scene secara native
    const config = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: 800,
      height: 480,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      backgroundColor: '#1E293B',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      input: {
        activePointers: 2,
        touch: {
          capture: true,
        },
      },
      callbacks: {
        preBoot: (game) => {
          if (isCancelled) return;
          // Suntikkan data misi sebelum scene pertama berjalan
          game.registry.set('mission', mission);
          game.registry.set('bridge', bridge);
          game.registry.set('isReducedMotion', isReducedMotion);
        },
      },
      scene: [sceneClass],
    };

    let game;
    try {
      game = new Phaser.Game(config);
      gameRef.current = game;

      // Tampilkan game setelah Phaser siap (boot selesai)
      game.events.once('ready', () => {
        if (!isCancelled) setIsReady(true);
      });

      // Fallback: jika 'ready' event tidak terpicu, paksa tampilkan dalam 1500ms
      const fallbackTimer = setTimeout(() => {
        if (!isCancelled) setIsReady(true);
      }, 1500);

      game.events.once('ready', () => clearTimeout(fallbackTimer));

    } catch (err) {
      console.error('Phaser init error:', err);
      if (!isCancelled) setIsReady(true);
    }

    return () => {
      isCancelled = true;
      if (gameRef.current) {
        try {
          gameRef.current.destroy(true);
        } catch (err) {
          console.warn('Phaser cleanup notice:', err);
        }
        gameRef.current = null;
      }
      setIsReady(false);
    };
  }, [sceneClass, mission.id, isReducedMotion]);

  return (
    <div className={`relative w-full aspect-[8/5] overflow-hidden rounded-2xl select-none ${className}`}>
      {/* Kontainer Canvas Phaser */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ touchAction: 'none' }}
      />

      {/* Indikator Memuat */}
      {!isReady && (
        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-amber-300 font-bold text-sm z-10 gap-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Mempersiapkan Panggung Petualangan...</span>
        </div>
      )}
    </div>
  );
}
