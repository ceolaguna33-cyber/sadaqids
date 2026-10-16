import React from 'react';
import { motion } from 'motion/react';

// Maskot Pohon Kebaikan dengan 4 Fase Pertumbuhan
// Didukung Motion for React: idle breathing, sway, & responsive SVG rendering

export function MascotPohon({
  stage = 1,
  size = 180,
  isCelebration = false,
  isReducedMotion = false,
  className = "",
}) {
  // Variasi animasi idle pernapasan dan goyangan ranting lembut
  const idleBreathing = isReducedMotion
    ? {}
    : {
        scaleY: [1, 1.02, 1],
        transition: {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  const idleLeavesSway = isReducedMotion
    ? {}
    : {
        rotate: [-1.5, 1.5, -1.5],
        transition: {
          duration: 4.0,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  const celebrationBounce = isReducedMotion
    ? {}
    : {
        scale: [1, 1.12, 1],
        y: [0, -10, 0],
        transition: {
          duration: 0.8,
          repeat: 2,
          ease: "easeOut",
        },
      };

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      animate={isCelebration ? celebrationBounce : idleBreathing}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Bayangan Tanah Lembut */}
        <ellipse cx="100" cy="180" rx="60" ry="12" fill="#E8DCBF" opacity="0.8" />

        {/* ========================================================
            FASE 1: Tunas Mungil (Seedling) - Pot tanah liat ceria
           ======================================================== */}
        {stage === 1 && (
          <g>
            {/* Pot Tanah Liat Bulat Hangat */}
            <path
              d="M65 138L72 176C73 180 77 183 81 183H119C123 183 127 180 128 176L135 138H65Z"
              fill="#D97706"
              stroke="#92400E"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M60 132H140C142 132 144 134 144 136V140C144 142 142 144 140 144H60C58 144 56 142 56 140V136C56 134 58 132 60 132Z"
              fill="#F59E0B"
              stroke="#92400E"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Tanah Subur */}
            <ellipse cx="100" cy="138" rx="36" ry="6" fill="#78350F" />

            {/* Batang Tunas Mungil Hijau Segar */}
            <motion.path
              d="M100 138C98 115 102 95 100 80"
              stroke="#059669"
              strokeWidth="6"
              strokeLinecap="round"
              animate={idleLeavesSway}
              style={{ transformOrigin: "100px 138px" }}
            />

            {/* Daun Tunas Kiri */}
            <motion.path
              d="M100 95C85 92 72 80 78 68C90 68 98 84 100 95Z"
              fill="#10B981"
              stroke="#047857"
              strokeWidth="3"
              strokeLinejoin="round"
              animate={idleLeavesSway}
              style={{ transformOrigin: "100px 95px" }}
            />

            {/* Daun Tunas Kanan */}
            <motion.path
              d="M100 86C115 82 128 72 122 60C110 60 102 76 100 86Z"
              fill="#34D399"
              stroke="#047857"
              strokeWidth="3"
              strokeLinejoin="round"
              animate={idleLeavesSway}
              style={{ transformOrigin: "100px 86px" }}
            />

            {/* Wajah Ramah Tunas Mungil */}
            <circle cx="94" cy="115" r="3" fill="#064E3B" />
            <circle cx="106" cy="115" r="3" fill="#064E3B" />
            {/* Senyum Kecil Ceria */}
            <path d="M96 122Q100 126 104 122" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" />
            {/* Pipi Merona Lembut */}
            <ellipse cx="90" cy="120" rx="3" ry="1.8" fill="#F472B6" opacity="0.6" />
            <ellipse cx="110" cy="120" rx="3" ry="1.8" fill="#F472B6" opacity="0.6" />
          </g>
        )}

        {/* ========================================================
            FASE 2: Ranting Ceria (Sapling) - Batang bertumbuh & bunga
           ======================================================== */}
        {stage === 2 && (
          <g>
            {/* Bukit Tanah Rumput Hijau */}
            <path
              d="M50 178C65 168 135 168 150 178C154 181 146 186 100 186C54 186 46 181 50 178Z"
              fill="#10B981"
              stroke="#047857"
              strokeWidth="3"
            />
            {/* Batang Pohon Muda Cokelat Hangat */}
            <path
              d="M93 174C93 145 92 110 88 95C85 85 75 75 72 68C76 68 85 76 90 85L98 105C99 85 101 65 101 55C103 68 104 88 106 102C112 90 124 78 132 72C130 80 118 92 112 105C110 125 109 148 107 174H93Z"
              fill="#B45309"
              stroke="#78350F"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Dedaunan Ranting Hijau Segar */}
            <motion.g animate={idleLeavesSway} style={{ transformOrigin: "100px 100px" }}>
              {/* Kanopi Daun Kiri */}
              <circle cx="68" cy="62" r="18" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
              <circle cx="78" cy="52" r="14" fill="#34D399" stroke="#047857" strokeWidth="2.5" />
              {/* Kanopi Daun Tengah */}
              <circle cx="102" cy="46" r="22" fill="#059669" stroke="#047857" strokeWidth="2.5" />
              <circle cx="98" cy="36" r="15" fill="#34D399" />
              {/* Kanopi Daun Kanan */}
              <circle cx="132" cy="66" r="18" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
              <circle cx="124" cy="56" r="14" fill="#34D399" stroke="#047857" strokeWidth="2.5" />
            </motion.g>

            {/* Kuncup Bunga Emas Kebaikan */}
            <circle cx="72" cy="50" r="5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="128" cy="54" r="5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />

            {/* Wajah Ramah Ranting Ceria di Batang */}
            <circle cx="96" cy="128" r="3" fill="#451A03" />
            <circle cx="104" cy="128" r="3" fill="#451A03" />
            <path d="M96 135Q100 139 104 135" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="92" cy="133" rx="3" ry="1.5" fill="#F472B6" opacity="0.7" />
            <ellipse cx="108" cy="133" rx="3" ry="1.5" fill="#F472B6" opacity="0.7" />
          </g>
        )}

        {/* ========================================================
            FASE 3: Pohon Rimbun (Blooming Tree) - Kanopi tebal bertingkat
           ======================================================== */}
        {stage === 3 && (
          <g>
            {/* Bukit Rumput Hijau */}
            <ellipse cx="100" cy="178" rx="60" ry="12" fill="#10B981" stroke="#047857" strokeWidth="3" />
            {/* Batang Pohon Kokoh */}
            <path
              d="M90 178C88 145 85 115 76 96C84 100 92 108 96 118C99 102 102 90 102 82C106 94 108 106 110 120C116 108 126 98 134 94C128 106 118 118 114 130C112 148 111 162 110 178H90Z"
              fill="#92400E"
              stroke="#78350F"
              strokeWidth="3.5"
            />
            {/* Kanopi Rimbun Bertingkat */}
            <motion.g animate={idleLeavesSway} style={{ transformOrigin: "100px 80px" }}>
              <circle cx="60" cy="80" r="24" fill="#059669" stroke="#047857" strokeWidth="3" />
              <circle cx="140" cy="80" r="24" fill="#059669" stroke="#047857" strokeWidth="3" />
              <circle cx="76" cy="56" r="28" fill="#10B981" stroke="#047857" strokeWidth="3" />
              <circle cx="124" cy="56" r="28" fill="#10B981" stroke="#047857" strokeWidth="3" />
              <circle cx="100" cy="40" r="32" fill="#34D399" stroke="#047857" strokeWidth="3" />
              {/* Bunga-bunga Merekah */}
              <circle cx="80" cy="44" r="6" fill="#FBBF24" />
              <circle cx="120" cy="44" r="6" fill="#FBBF24" />
              <circle cx="100" cy="24" r="6" fill="#F472B6" />
            </motion.g>

            {/* Wajah Pohon Rimbun */}
            <circle cx="96" cy="138" r="3.5" fill="#451A03" />
            <circle cx="104" cy="138" r="3.5" fill="#451A03" />
            <path d="M95 146Q100 152 105 146" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="91" cy="143" rx="3.5" ry="2" fill="#F472B6" opacity="0.8" />
            <ellipse cx="109" cy="143" rx="3.5" ry="2" fill="#F472B6" opacity="0.8" />
          </g>
        )}

        {/* ========================================================
            FASE 4 & 5: Pohon Berbuah & Bersinar — Buah emas & burung
           ======================================================== */}
        {(stage === 4 || stage === 5) && (
          <g>
            <ellipse cx="100" cy="180" rx="66" ry="14" fill="#047857" stroke="#064E3B" strokeWidth="3.5" />
            <path
              d="M86 180C86 142 82 108 72 88C82 92 90 102 95 114C98 96 102 82 103 72C106 86 109 100 112 116C120 104 132 94 140 88C132 102 120 115 116 128C114 150 114 165 114 180H86Z"
              fill="#78350F"
              stroke="#451A03"
              strokeWidth="4"
            />
            {/* Kanopi Mega Rimbun */}
            <motion.g animate={idleLeavesSway} style={{ transformOrigin: "100px 75px" }}>
              <circle cx="54" cy="80" r="28" fill="#047857" stroke="#064E3B" strokeWidth="3" />
              <circle cx="146" cy="80" r="28" fill="#047857" stroke="#064E3B" strokeWidth="3" />
              <circle cx="70" cy="50" r="32" fill="#059669" stroke="#064E3B" strokeWidth="3" />
              <circle cx="130" cy="50" r="32" fill="#059669" stroke="#064E3B" strokeWidth="3" />
              <circle cx="100" cy="34" r="36" fill="#10B981" stroke="#064E3B" strokeWidth="3" />
              {/* Buah Emas */}
              <circle cx="68" cy="74" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="132" cy="74" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="100" cy="60" r="8" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="84" cy="34" r="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="116" cy="34" r="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              {/* Burung Ceria */}
              <path d="M142 60C148 56 156 58 158 64C154 66 148 64 142 60Z" fill="#38BDF8" />
              <circle cx="152" cy="62" r="4" fill="#0284C7" />
              <polygon points="156,62 160,63 156,64" fill="#F59E0B" />
            </motion.g>

            {/* Wajah Pohon */}
            <circle cx="95" cy="140" r="3.5" fill="#451A03" />
            <circle cx="105" cy="140" r="3.5" fill="#451A03" />
            <path d="M94 148Q100 156 106 148" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="89" cy="145" rx="4" ry="2.2" fill="#F472B6" opacity="0.8" />
            <ellipse cx="111" cy="145" rx="4" ry="2.2" fill="#F472B6" opacity="0.8" />
          </g>
        )}

        {/* ========================================================
            FASE 6: Pohon Bersinar — Cahaya bintang & aurora
           ======================================================== */}
        {stage === 6 && (
          <g>
            <ellipse cx="100" cy="180" rx="68" ry="14" fill="#047857" stroke="#064E3B" strokeWidth="3.5" />
            <path
              d="M86 180C86 142 82 108 72 88C82 92 90 102 95 114C98 96 102 82 103 72C106 86 109 100 112 116C120 104 132 94 140 88C132 102 120 115 116 128C114 150 114 165 114 180H86Z"
              fill="#78350F" stroke="#451A03" strokeWidth="4"
            />
            {/* Kanopi Bersinar */}
            <motion.g animate={idleLeavesSway} style={{ transformOrigin: "100px 70px" }}>
              <circle cx="52" cy="78" r="30" fill="#065F46" stroke="#064E3B" strokeWidth="3" />
              <circle cx="148" cy="78" r="30" fill="#065F46" stroke="#064E3B" strokeWidth="3" />
              <circle cx="68" cy="46" r="34" fill="#047857" stroke="#064E3B" strokeWidth="3" />
              <circle cx="132" cy="46" r="34" fill="#047857" stroke="#064E3B" strokeWidth="3" />
              <circle cx="100" cy="28" r="38" fill="#10B981" stroke="#064E3B" strokeWidth="3" />
              {/* Bintang-bintang cahaya */}
              <motion.text x="62" y="68" fontSize="14" textAnchor="middle"
                animate={isReducedMotion ? {} : { opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>✨</motion.text>
              <motion.text x="138" y="68" fontSize="14" textAnchor="middle"
                animate={isReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>✨</motion.text>
              <motion.text x="100" y="22" fontSize="16" textAnchor="middle"
                animate={isReducedMotion ? {} : { opacity: [0.6, 1, 0.6], y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>⭐</motion.text>
              {/* Buah dan burung */}
              <circle cx="68" cy="74" r="7" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="132" cy="74" r="7" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="100" cy="56" r="9" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            </motion.g>

            {/* Wajah Bersinar */}
            <circle cx="95" cy="140" r="3.5" fill="#451A03" />
            <circle cx="105" cy="140" r="3.5" fill="#451A03" />
            <path d="M93 148Q100 157 107 148" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="89" cy="145" rx="4" ry="2.2" fill="#F472B6" opacity="0.9" />
            <ellipse cx="111" cy="145" rx="4" ry="2.2" fill="#F472B6" opacity="0.9" />
          </g>
        )}

        {/* ========================================================
            FASE 7: Pohon Paripurna — Mahkota Emas & Cahaya Penuh
           ======================================================== */}
        {stage >= 7 && (
          <g>
            <ellipse cx="100" cy="180" rx="70" ry="15" fill="#065F46" stroke="#064E3B" strokeWidth="4" />
            <path
              d="M85 180C84 140 80 106 70 86C82 90 90 100 95 112C98 94 102 80 104 70C107 84 110 98 113 114C122 102 134 92 142 86C134 100 122 113 118 126C116 148 115 165 115 180H85Z"
              fill="#92400E" stroke="#451A03" strokeWidth="4"
            />
            {/* Kanopi Paripurna */}
            <motion.g animate={idleLeavesSway} style={{ transformOrigin: "100px 65px" }}>
              <circle cx="50" cy="76" r="32" fill="#064E3B" stroke="#022C22" strokeWidth="3" />
              <circle cx="150" cy="76" r="32" fill="#064E3B" stroke="#022C22" strokeWidth="3" />
              <circle cx="66" cy="44" r="36" fill="#065F46" stroke="#022C22" strokeWidth="3" />
              <circle cx="134" cy="44" r="36" fill="#065F46" stroke="#022C22" strokeWidth="3" />
              <circle cx="100" cy="24" r="40" fill="#047857" stroke="#022C22" strokeWidth="3" />
              {/* Buah Emas Berlimpah */}
              <circle cx="66" cy="70" r="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
              <circle cx="134" cy="70" r="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
              <circle cx="100" cy="52" r="10" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
              <circle cx="80" cy="30" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="120" cy="30" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="100" cy="10" r="8" fill="#FCD34D" stroke="#B45309" strokeWidth="2" />
            </motion.g>

            {/* Mahkota Emas di Puncak */}
            <motion.g
              animate={isReducedMotion ? {} : { y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M82 10L88 24L100 16L112 24L118 10L122 28H78L82 10Z"
                fill="#F59E0B" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="100" cy="10" r="4" fill="#FBBF24" />
              <circle cx="82" cy="10" r="3" fill="#FCD34D" />
              <circle cx="118" cy="10" r="3" fill="#FCD34D" />
            </motion.g>

            {/* Wajah Paripurna Penuh Kebahagiaan */}
            <circle cx="95" cy="138" r="4" fill="#451A03" />
            <circle cx="105" cy="138" r="4" fill="#451A03" />
            <path d="M92 148Q100 158 108 148" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="88" cy="144" rx="4.5" ry="2.5" fill="#F472B6" opacity="0.9" />
            <ellipse cx="112" cy="144" rx="4.5" ry="2.5" fill="#F472B6" opacity="0.9" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
