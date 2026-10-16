import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';

/* ════════════════════════════════════════════════════════════════
   STAGE CONFIG — 7 tahapan visual yang kaya & berbeda
   ════════════════════════════════════════════════════════════════ */
const STAGE_CONFIG = {
  1: {
    title: 'Tunas Mungil',
    desc: 'Benih kebaikanmu menembus tanah subur dan bertunas — akar pertama merangkul bumi!',
    emoji: '🌱',
    skyFrom: '#87CEEB',
    skyTo: '#E0F4FF',
    groundColor: '#4CAF50',
    soilColor: '#6D4C41',
  },
  2: {
    title: 'Ranting Ceria',
    desc: 'Akar menancap kokoh, batang muda menjulang dan ranting bertunas daun segar!',
    emoji: '🌿',
    skyFrom: '#81C784',
    skyTo: '#C8E6C9',
    groundColor: '#43A047',
    soilColor: '#5D4037',
  },
  3: {
    title: 'Pohon Rimbun',
    desc: 'Batang semakin kokoh, cabang melebar dan kanopi daun bertingkat meneduhkan bumi!',
    emoji: '🌳',
    skyFrom: '#4CAF50',
    skyTo: '#A5D6A7',
    groundColor: '#388E3C',
    soilColor: '#4E342E',
  },
  4: {
    title: 'Pohon Lebat Berbunga',
    desc: 'Dedaunan lebat menyejukkan bumi, dihiasi kuncup bunga kebaikan yang mekar!',
    emoji: '🌸',
    skyFrom: '#F48FB1',
    skyTo: '#FCE4EC',
    groundColor: '#2E7D32',
    soilColor: '#3E2723',
  },
  5: {
    title: 'Pohon Berbuah Emas',
    desc: 'Buah-buah emas sedekah ranum bercahaya di sela dedaunan rimbun yang lebat!',
    emoji: '🍎',
    skyFrom: '#FFB74D',
    skyTo: '#FFF8E1',
    groundColor: '#1B5E20',
    soilColor: '#3E2723',
  },
  6: {
    title: 'Pohon Bersinar Berkah',
    desc: 'Pohon memancarkan cahaya berkah bintang dan gotong royong yang menerangi sesama!',
    emoji: '⭐',
    skyFrom: '#7C4DFF',
    skyTo: '#EDE7F6',
    groundColor: '#1B5E20',
    soilColor: '#3E2723',
  },
  7: {
    title: 'Pohon Paripurna ✨',
    desc: 'Pohon raksasa megah bermahkota emas abadi — mengalirkan pahala jariyah tanpa henti!',
    emoji: '👑',
    skyFrom: '#F9A825',
    skyTo: '#FFFDE7',
    groundColor: '#1B5E20',
    soilColor: '#3E2723',
  },
};

const SPRING_LIVELY = { type: 'spring', stiffness: 280, damping: 18, mass: 0.8 };
const SPRING_BOUNCE = { type: 'spring', stiffness: 360, damping: 14, mass: 0.6 };
const EASE_ORGANIC = [0.34, 1.28, 0.42, 1];

/* ════════════════════════════════════════════════════════════════
   FLOATING PARTICLE
   ════════════════════════════════════════════════════════════════ */
function FloatingParticle({ x, y, color, size, delay, duration, emoji }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.9, 0.7, 0],
        y: [0, -28, -52],
        scale: [0.5, 1, 0.7],
      }}
      transition={{
        duration: duration || 2.8,
        delay: delay || 0,
        repeat: Infinity,
        ease: 'easeOut',
        repeatDelay: 1.2,
      }}
    >
      {emoji ? (
        <text x={x} y={y} fontSize={size || 10} textAnchor="middle">{emoji}</text>
      ) : (
        <circle cx={x} cy={y} r={size || 3} fill={color || '#FDE68A'} />
      )}
    </motion.g>
  );
}

/* ════════════════════════════════════════════════════════════════
   LEAF CLUSTER
   ════════════════════════════════════════════════════════════════ */
function LeafCluster({ cx, cy, r, fill, delay = 0, visible = true }) {
  if (!visible) return null;
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        scale: { ...SPRING_BOUNCE, delay },
        opacity: { duration: 0.4, delay },
      }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

/* ════════════════════════════════════════════════════════════════
   ROOT PATH
   ════════════════════════════════════════════════════════════════ */
function RootPath({ d, stroke, width = 3.5, delay = 0, visible = true }) {
  if (!visible) return null;
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0.6 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.1, delay, ease: EASE_ORGANIC }}
    />
  );
}

/* ════════════════════════════════════════════════════════════════
   FLOWER
   ════════════════════════════════════════════════════════════════ */
function Flower({ cx, cy, color, coreColor, size = 5, delay = 0 }) {
  const petals = 5;
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.3, 1], opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: EASE_ORGANIC }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * 360;
        const rad = (angle * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(rad) * size * 1.1}
            cy={cy + Math.sin(rad) * size * 1.1}
            rx={size * 0.7}
            ry={size * 0.4}
            fill={color}
            opacity={0.9}
            transform={`rotate(${angle}, ${cx + Math.cos(rad) * size * 1.1}, ${cy + Math.sin(rad) * size * 1.1})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={size * 0.55} fill={coreColor || '#FBBF24'} />
    </motion.g>
  );
}

/* ════════════════════════════════════════════════════════════════
   GOLDEN FRUIT
   ════════════════════════════════════════════════════════════════ */
function GoldenFruit({ cx, cy, r = 7, delay = 0 }) {
  const gradId = `fruit-${cx}-${cy}`;
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.25, 1], opacity: 1 }}
      transition={{ ...SPRING_BOUNCE, delay }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${gradId})`} />
      <motion.circle
        cx={cx - r * 0.28}
        cy={cy - r * 0.3}
        r={r * 0.22}
        fill="white"
        opacity={0.7}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <path
        d={`M${cx} ${cy - r} Q${cx + 3} ${cy - r - 5} ${cx + 1} ${cy - r - 8}`}
        stroke="#65A30D"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
    </motion.g>
  );
}

/* ════════════════════════════════════════════════════════════════
   TREE TRUNK
   ════════════════════════════════════════════════════════════════ */
function TreeTrunk({ stage, animStep }) {
  const trunkVisible = animStep >= 3;
  const trunkTopY = stage === 1 ? 148 : stage === 2 ? 130 : 95;

  if (!trunkVisible) return null;

  return (
    <motion.g
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_ORGANIC, delay: 0.1 }}
      style={{ transformOrigin: '120px 184px' }}
    >
      <defs>
        <linearGradient id="trunk-grad-v2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="30%" stopColor="#A16207" />
          <stop offset="65%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#713F12" />
        </linearGradient>
      </defs>

      <ellipse cx={124} cy={184} rx={stage >= 3 ? 14 : 8} ry={4} fill="#3B1C00" opacity={0.2} />

      <path
        d={
          stage === 1
            ? `M117 184 Q116 165 117 ${trunkTopY} Q120 ${trunkTopY - 4} 123 ${trunkTopY} Q124 165 123 184 Z`
            : stage === 2
            ? `M113 184 C112 155 110 135 112 ${trunkTopY} C115 ${trunkTopY - 6} 125 ${trunkTopY - 6} 128 ${trunkTopY} C130 135 128 155 127 184 Z`
            : `M107 184 C105 148 101 122 104 ${trunkTopY} C109 ${trunkTopY - 8} 131 ${trunkTopY - 8} 136 ${trunkTopY} C139 122 135 148 133 184 Z`
        }
        fill="url(#trunk-grad-v2)"
        stroke="#3B1C00"
        strokeWidth={1.5}
      />

      {stage >= 2 && (
        <>
          <path d="M116 165 Q120 163 124 165" stroke="#5D2E00" strokeWidth={0.8} fill="none" opacity={0.4} />
          <path d="M115 150 Q120 148 125 150" stroke="#5D2E00" strokeWidth={0.8} fill="none" opacity={0.35} />
        </>
      )}
      {stage >= 3 && (
        <>
          <path d="M112 135 Q120 132 128 135" stroke="#5D2E00" strokeWidth={0.8} fill="none" opacity={0.3} />
          <path d="M111 118 Q120 115 129 118" stroke="#5D2E00" strokeWidth={0.8} fill="none" opacity={0.25} />
        </>
      )}

      {stage <= 3 && (
        <g>
          <circle cx={117} cy={stage === 1 ? 158 : 162} r={2.5} fill="#451A03" />
          <circle cx={123} cy={stage === 1 ? 158 : 162} r={2.5} fill="#451A03" />
          <path
            d={stage === 1 ? 'M116 162 Q120 166 124 162' : 'M116 167 Q120 171 124 167'}
            stroke="#451A03"
            strokeWidth={1.8}
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx={114} cy={stage === 1 ? 161 : 165} rx={2} ry={1.2} fill="#F472B6" opacity={0.75} />
          <ellipse cx={126} cy={stage === 1 ? 161 : 165} rx={2} ry={1.2} fill="#F472B6" opacity={0.75} />
        </g>
      )}
    </motion.g>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════ */
export function AnimatedTreeGrowth({
  fromStage = 1,
  toStage = 2,
  onComplete,
  onPlaySound,
  isReducedMotion = false,
  className = '',
  size = 300,
}) {
  const [animStep, setAnimStep] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const timersRef = useRef([]);

  const clearAll = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const startSequence = useCallback(() => {
    clearAll();
    setAnimStep(0);

    const schedule = (ms, step, sound) => {
      const id = setTimeout(() => {
        setAnimStep(step);
        if (sound && onPlaySound) onPlaySound(sound);
      }, ms);
      timersRef.current.push(id);
    };

    if (!isReducedMotion) {
      schedule(150,  1, 'coin');
      schedule(950,  2, 'tap');
      schedule(1950, 3, 'whoosh');
      schedule(2950, 4, 'goalReached');
      schedule(4300, 5, 'badgeFanfare');
      schedule(5100, 6, null);
    } else {
      schedule(50, 6, null);
    }

    const doneId = setTimeout(() => {
      if (onComplete) onComplete();
    }, isReducedMotion ? 200 : 5200);
    timersRef.current.push(doneId);
  }, [fromStage, toStage, isReducedMotion, onPlaySound, onComplete]);

  useEffect(() => {
    startSequence();
    return clearAll;
  }, [startSequence, replayKey]);

  const cfg = STAGE_CONFIG[toStage] || STAGE_CONFIG[2];
  const isStage = (n) => toStage >= n;

  const statusLabels = [
    null,
    { text: '💧 Koin kebaikanmu menyirami tanah subur...', cls: 'bg-sky-100 text-sky-900 border-sky-300' },
    { text: '🌱 Masya Allah! Akar merambat kokoh ke bumi!', cls: 'bg-amber-100 text-amber-950 border-amber-300' },
    { text: '🌿 Batang kebaikan menjulang ke langit!', cls: 'bg-emerald-100 text-emerald-950 border-emerald-300' },
    { text: '🍃 Daun-daun mekar berseri rimbun!', cls: 'bg-green-100 text-green-950 border-green-300' },
    { text: `✨ Pohon Kebaikan Tumbuh: ${cfg.title}!`, cls: 'bg-gradient-to-r from-amber-400 to-emerald-500 text-white border-amber-500' },
  ];
  const activeLabel = animStep >= 5 ? statusLabels[5] : statusLabels[animStep] || null;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>

      {/* STATUS BADGE */}
      <div className="mb-2 h-9 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeLabel && (
            <motion.div
              key={animStep}
              initial={{ opacity: 0, y: -8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4 }}
              transition={SPRING_LIVELY}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black border shadow-sm ${activeLabel.cls}`}
            >
              {activeLabel.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG CANVAS */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size * 1.05 }}
      >
        {/* Aura latar */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.18) 0%, transparent 70%)' }}
          animate={{
            scale: animStep >= 4 ? [1, 1.15, 1] : 0.9,
            opacity: animStep >= 3 ? [0.5, 0.9, 0.5] : 0.3,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <svg
          key={replayKey}
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-xl"
        >
          <defs>
            <linearGradient id="sky-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={cfg.skyFrom} stopOpacity="0.35" />
              <stop offset="100%" stopColor={cfg.skyTo} stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="sun-ray" cx="75%" cy="15%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="soil-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={cfg.soilColor} />
              <stop offset="100%" stopColor="#1A0A00" />
            </linearGradient>
            <radialGradient id="leaf-glow" cx="30%" cy="20%">
              <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
            <filter id="glow-gold">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-star">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="crown-g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Langit */}
          <rect x="0" y="0" width="240" height="240" rx="20" fill="url(#sky-bg)" />

          {/* Sinar matahari */}
          {animStep >= 4 && (
            <motion.ellipse
              cx={185} cy={30} rx={35} ry={35}
              fill="url(#sun-ray)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}

          {/* Awan */}
          {animStep >= 1 && isStage(2) && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65, x: [0, 6, 0] }}
              transition={{ opacity: { duration: 1 }, x: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <ellipse cx={45} cy={38} rx={16} ry={9} fill="white" opacity={0.7} />
              <ellipse cx={58} cy={33} rx={13} ry={8} fill="white" opacity={0.75} />
              <ellipse cx={33} cy={42} rx={10} ry={6} fill="white" opacity={0.65} />
            </motion.g>
          )}

          {/* TANAH */}
          <ellipse cx={120} cy={194} rx={88} ry={10} fill="#1A0A00" opacity={0.3} />
          <path
            d="M28 186 Q80 176 120 178 Q160 176 212 186 Q220 210 208 228 Q120 238 32 228 Q20 210 28 186 Z"
            fill="url(#soil-bg)"
          />
          <motion.ellipse
            cx={120} cy={183} rx={88} ry={13}
            fill={cfg.groundColor}
            initial={{ scaleX: 0.6 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE_ORGANIC }}
            style={{ transformOrigin: '120px 183px' }}
          />
          <ellipse cx={120} cy={180} rx={75} ry={9} fill="#4ADE80" opacity={0.45} />

          {/* Rumput kecil */}
          {[60, 80, 100, 140, 160, 180].map((x, i) => (
            <motion.path
              key={i}
              d={`M${x} 181 Q${x - 2} 173 ${x + 1} 168`}
              stroke="#16A34A"
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: EASE_ORGANIC }}
              style={{ transformOrigin: `${x}px 181px` }}
            />
          ))}

          {/* Nutrisi tanah */}
          {animStep >= 1 && [
            { cx: 75, cy: 198, color: '#FDE68A', dur: 1.2 },
            { cx: 165, cy: 202, color: '#A7F3D0', dur: 1.6 },
            { cx: 120, cy: 215, color: '#FDE68A', dur: 2.0 },
            { cx: 95,  cy: 210, color: '#6EE7B7', dur: 2.4 },
            { cx: 148, cy: 208, color: '#FCD34D', dur: 1.1 },
          ].map((p, i) => (
            <motion.circle
              key={i}
              cx={p.cx} cy={p.cy} r={2.2}
              fill={p.color}
              animate={{ opacity: [0.2, 0.85, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}

          {/* TETESAN AIR (step 1) */}
          <AnimatePresence>
            {animStep === 1 && !isReducedMotion && (
              <motion.g key="water" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {[115, 126, 104, 133].map((cx, i) => (
                  <motion.ellipse
                    key={i}
                    cx={cx} cy={25} rx={2.5} ry={4}
                    fill="#60A5FA"
                    animate={{ y: [0, 155], opacity: [0.85, 0] }}
                    transition={{ duration: 0.65, delay: i * 0.15, repeat: 3 }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* AKAR */}
          <RootPath d="M120 183 Q119 198 118 218" stroke="#92400E" width={5} delay={0} visible={animStep >= 2} />
          <RootPath d="M114 185 Q96 196 78 212 Q66 220 52 222" stroke="#A16207" width={4} delay={0.1} visible={animStep >= 2} />
          <RootPath d="M126 185 Q144 196 162 212 Q174 220 188 222" stroke="#A16207" width={4} delay={0.15} visible={animStep >= 2} />
          <RootPath d="M88 200 Q78 212 66 225" stroke="#78350F" width={2.8} delay={0.35} visible={animStep >= 2 && isStage(2)} />
          <RootPath d="M152 200 Q162 212 174 225" stroke="#78350F" width={2.8} delay={0.4} visible={animStep >= 2 && isStage(2)} />
          {isStage(3) && (
            <>
              <RootPath d="M105 187 Q88 205 68 220 Q55 228 44 232" stroke="#8B5E3C" width={2.5} delay={0.5} visible={animStep >= 2} />
              <RootPath d="M135 187 Q152 205 172 220 Q185 228 196 232" stroke="#8B5E3C" width={2.5} delay={0.55} visible={animStep >= 2} />
            </>
          )}

          {/* BATANG */}
          <TreeTrunk stage={toStage} animStep={animStep} />

          {/* RANTING */}
          {isStage(2) && animStep >= 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <motion.path
                d="M115 140 Q100 130 84 122 Q73 116 62 118"
                stroke="#92400E" strokeWidth={isStage(4) ? 5 : 4} strokeLinecap="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: EASE_ORGANIC, delay: 0.1 }}
              />
              <motion.path
                d="M125 140 Q140 130 156 122 Q167 116 178 118"
                stroke="#92400E" strokeWidth={isStage(4) ? 5 : 4} strokeLinecap="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: EASE_ORGANIC, delay: 0.18 }}
              />
              {isStage(3) && (
                <motion.path
                  d="M120 118 Q118 100 120 88"
                  stroke="#92400E" strokeWidth={isStage(4) ? 4.5 : 3.5} strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: EASE_ORGANIC, delay: 0.28 }}
                />
              )}
              {isStage(4) && (
                <>
                  <motion.path d="M78 122 Q68 108 64 96" stroke="#78350F" strokeWidth={3} strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: EASE_ORGANIC, delay: 0.38 }}
                  />
                  <motion.path d="M162 122 Q172 108 176 96" stroke="#78350F" strokeWidth={3} strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: EASE_ORGANIC, delay: 0.42 }}
                  />
                </>
              )}
            </motion.g>
          )}

          {/* DAUN KANOPI */}
          <motion.g
            animate={
              !isReducedMotion && animStep >= 4
                ? { rotate: [-1, 1.5, -1.5, 1, -1] }
                : {}
            }
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '120px 150px' }}
          >
            {toStage === 1 && (
              <>
                <LeafCluster cx={116} cy={130} r={9}  fill="#10B981" delay={0}    visible={animStep >= 4} />
                <LeafCluster cx={124} cy={120} r={10} fill="#34D399" delay={0.12} visible={animStep >= 4} />
                <LeafCluster cx={112} cy={115} r={7}  fill="#6EE7B7" delay={0.22} visible={animStep >= 4} />
              </>
            )}

            {toStage === 2 && (
              <>
                <LeafCluster cx={68}  cy={110} r={18} fill="#059669" delay={0}    visible={animStep >= 4} />
                <LeafCluster cx={84}  cy={98}  r={16} fill="#10B981" delay={0.08} visible={animStep >= 4} />
                <LeafCluster cx={120} cy={88}  r={22} fill="#059669" delay={0.15} visible={animStep >= 4} />
                <LeafCluster cx={100} cy={82}  r={16} fill="#34D399" delay={0.22} visible={animStep >= 4} />
                <LeafCluster cx={156} cy={110} r={18} fill="#059669" delay={0.28} visible={animStep >= 4} />
                <LeafCluster cx={140} cy={98}  r={16} fill="#10B981" delay={0.35} visible={animStep >= 4} />
              </>
            )}

            {isStage(3) && (
              <>
                <LeafCluster cx={62}  cy={108} r={26} fill="#047857" delay={0}    visible={animStep >= 4} />
                <LeafCluster cx={178} cy={108} r={26} fill="#047857" delay={0.06} visible={animStep >= 4} />
                <LeafCluster cx={82}  cy={82}  r={30} fill="#059669" delay={0.12} visible={animStep >= 4} />
                <LeafCluster cx={158} cy={82}  r={30} fill="#059669" delay={0.18} visible={animStep >= 4} />
                <LeafCluster cx={100} cy={58}  r={34} fill="#10B981" delay={0.24} visible={animStep >= 4} />
                <LeafCluster cx={140} cy={58}  r={34} fill="#10B981" delay={0.3}  visible={animStep >= 4} />
                <LeafCluster cx={120} cy={42}  r={36} fill="#34D399" delay={0.36} visible={animStep >= 4} />
                {animStep >= 4 && (
                  <motion.circle
                    cx={108} cy={50} r={16}
                    fill="url(#leaf-glow)"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
              </>
            )}

            {/* BUNGA */}
            {isStage(4) && animStep >= 5 && (
              <>
                <Flower cx={78}  cy={76}  color="#F9A8D4" coreColor="#FBBF24" size={6} delay={0} />
                <Flower cx={162} cy={76}  color="#FDA4AF" coreColor="#FBBF24" size={6} delay={0.15} />
                <Flower cx={98}  cy={54}  color="#FBCFE8" coreColor="#F59E0B" size={7} delay={0.28} />
                <Flower cx={142} cy={54}  color="#F9A8D4" coreColor="#FDE68A" size={7} delay={0.38} />
                <Flower cx={120} cy={38}  color="#FEF08A" coreColor="#F59E0B" size={8} delay={0.5} />
                {isStage(5) && (
                  <>
                    <Flower cx={66}  cy={98}  color="#FDE68A" coreColor="#D97706" size={5} delay={0.1} />
                    <Flower cx={174} cy={98}  color="#FDE68A" coreColor="#D97706" size={5} delay={0.2} />
                  </>
                )}
                {!isReducedMotion && (
                  <>
                    <FloatingParticle x={90}  y={70}  emoji="🌸" size={9}  delay={0}   duration={3.2} />
                    <FloatingParticle x={150} y={65}  emoji="🌸" size={8}  delay={0.8} duration={2.8} />
                    <FloatingParticle x={120} y={55}  emoji="✿"  size={10} delay={1.5} duration={3.5} />
                  </>
                )}
              </>
            )}

            {/* BUAH EMAS */}
            {isStage(5) && animStep >= 5 && (
              <>
                <GoldenFruit cx={86}  cy={76}  r={7.5} delay={0} />
                <GoldenFruit cx={154} cy={76}  r={7.5} delay={0.18} />
                <GoldenFruit cx={104} cy={55}  r={9}   delay={0.32} />
                <GoldenFruit cx={136} cy={55}  r={9}   delay={0.45} />
                <GoldenFruit cx={120} cy={62}  r={9.5} delay={0.58} />
                {isStage(6) && (
                  <>
                    <GoldenFruit cx={70}  cy={94}  r={6} delay={0.12} />
                    <GoldenFruit cx={170} cy={94}  r={6} delay={0.25} />
                    <GoldenFruit cx={92}  cy={42}  r={7} delay={0.7} />
                    <GoldenFruit cx={148} cy={42}  r={7} delay={0.82} />
                  </>
                )}
              </>
            )}
          </motion.g>

          {/* PARTIKEL EMAS NAIK */}
          {isStage(5) && animStep >= 5 && !isReducedMotion && (
            <>
              <FloatingParticle x={80}  y={100} color="#FDE68A" size={3}   delay={0}   duration={3} />
              <FloatingParticle x={120} y={90}  color="#FCD34D" size={3.5} delay={0.6} duration={3.4} />
              <FloatingParticle x={160} y={105} color="#FDE68A" size={2.5} delay={1.2} duration={2.8} />
              <FloatingParticle x={100} y={80}  color="#FCD34D" size={2.8} delay={1.8} duration={3.2} />
              <FloatingParticle x={140} y={85}  color="#FDE68A" size={3}   delay={0.3} duration={3.6} />
            </>
          )}

          {/* AURA + BINTANG (stage 6+) */}
          {isStage(6) && animStep >= 5 && (
            <>
              <motion.circle
                cx={120} cy={40} r={28}
                fill="#FDE68A" opacity={0}
                animate={{ opacity: [0, 0.35, 0.15, 0.3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                filter="url(#glow-star)"
              />
              {[{ x: 80, y: 28, s: 14 }, { x: 160, y: 32, s: 12 }, { x: 120, y: 16, s: 16 }].map((star, i) => (
                <motion.text
                  key={i}
                  x={star.x} y={star.y}
                  fontSize={star.s}
                  textAnchor="middle"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    y: [star.y, star.y - 5, star.y],
                  }}
                  transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                >
                  ⭐
                </motion.text>
              ))}
            </>
          )}

          {/* MAHKOTA EMAS (stage 7) */}
          {isStage(7) && animStep >= 5 && (
            <motion.g
              initial={{ y: -15, opacity: 0, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 360, damping: 14, mass: 0.6 }}
              filter="url(#glow-gold)"
            >
              <path
                d="M100 14 L108 28 L120 20 L132 28 L140 14 L144 34 H96 L100 14 Z"
                fill="url(#crown-g)"
                stroke="#B45309"
                strokeWidth={2}
              />
              <circle cx={100} cy={14} r={3.5} fill="#FEF08A" />
              <circle cx={120} cy={20} r={4}   fill="#FEF08A" />
              <circle cx={140} cy={14} r={3.5} fill="#FEF08A" />
              <motion.path
                d="M102 22 L118 28"
                stroke="#FEF08A" strokeWidth={1.5} strokeLinecap="round"
                opacity={0}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
              />
            </motion.g>
          )}

          {/* SPARKLES SELESAI */}
          {animStep >= 6 && !isReducedMotion && (
            <>
              <FloatingParticle x={60}  y={60} emoji="✨" size={12} delay={0}   duration={2.5} />
              <FloatingParticle x={180} y={55} emoji="✨" size={11} delay={0.5} duration={2.8} />
              <FloatingParticle x={120} y={30} emoji="🌟" size={14} delay={0.9} duration={3} />
            </>
          )}
        </svg>
      </div>

      {/* DESKRIPSI + REPLAY */}
      <div className="mt-3 text-center max-w-xs mx-auto px-1">
        <AnimatePresence mode="wait">
          <motion.p
            key={toStage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-emerald-200/80 shadow-sm"
          >
            <span className="font-black text-emerald-800 mr-1">{cfg.emoji}</span>
            {cfg.desc}
          </motion.p>
        </AnimatePresence>

        <motion.button
          onClick={() => setReplayKey((k) => k + 1)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition-colors cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
          <span>Putar Ulang 🌳</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </motion.button>
      </div>
    </div>
  );
}
