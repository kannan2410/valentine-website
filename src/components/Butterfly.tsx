import { motion, type Variants } from 'framer-motion';

interface ButterflyProps {
  phase: 'hidden' | 'tiny' | 'flying' | 'arrived' | 'wingsOpen';
  children?: React.ReactNode;
}

const leftWingFlap: Variants = {
  flap: {
    rotateY: [0, 55, 0],
    transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
  },
};

const rightWingFlap: Variants = {
  flap: {
    rotateY: [0, -55, 0],
    transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
  },
};

const leftWingSlow: Variants = {
  open: {
    rotateY: [0, 12, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

const rightWingSlow: Variants = {
  open: {
    rotateY: [0, -12, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

const glowPulse: Variants = {
  pulse: {
    filter: [
      'drop-shadow(0 0 10px rgba(255,150,200,0.4)) drop-shadow(0 0 5px rgba(255,200,230,0.2))',
      'drop-shadow(0 0 25px rgba(255,150,200,0.7)) drop-shadow(0 0 12px rgba(255,200,230,0.5))',
      'drop-shadow(0 0 10px rgba(255,150,200,0.4)) drop-shadow(0 0 5px rgba(255,200,230,0.2))',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const bodyFloat: Variants = {
  float: {
    y: [0, -5, 0, 5, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Mini butterfly SVG path for wing decorations
const miniButterfly = "M0,-6 C-2,-6 -5,-3 -7,-1 C-9,1 -8,4 -6,4 C-4,4 -2,2 0,0 C2,2 4,4 6,4 C8,4 9,1 7,-1 C5,-3 2,-6 0,-6Z M0,0 C-1,1 -4,4 -5,7 C-5,9 -3,10 -2,9 C-1,8 0,4 0,0 C0,4 1,8 2,9 C3,10 5,9 5,7 C4,4 1,1 0,0Z";

interface MiniButterfly {
  cx: number;
  cy: number;
  color: string;
  scale: number;
  rotate: number;
}

const leftMiniButterflies: MiniButterfly[] = [
  { cx: 95, cy: 80, color: '#a855f7', scale: 1.2, rotate: -20 },
  { cx: 65, cy: 65, color: '#ec4899', scale: 0.9, rotate: 15 },
  { cx: 120, cy: 110, color: '#f472b6', scale: 1, rotate: -35 },
  { cx: 80, cy: 105, color: '#c084fc', scale: 0.8, rotate: 25 },
  { cx: 140, cy: 200, color: '#e879f9', scale: 1, rotate: -10 },
  { cx: 115, cy: 220, color: '#f9a8d4', scale: 0.85, rotate: 30 },
];

const rightMiniButterflies: MiniButterfly[] = [
  { cx: 305, cy: 80, color: '#8b5cf6', scale: 1.2, rotate: 20 },
  { cx: 335, cy: 65, color: '#f472b6', scale: 0.9, rotate: -15 },
  { cx: 280, cy: 110, color: '#e879f9', scale: 1, rotate: 35 },
  { cx: 320, cy: 105, color: '#fb7185', scale: 0.8, rotate: -25 },
  { cx: 260, cy: 200, color: '#c084fc', scale: 1, rotate: 10 },
  { cx: 285, cy: 220, color: '#ec4899', scale: 0.85, rotate: -30 },
];

export default function Butterfly({ phase, children }: ButterflyProps) {
  if (phase === 'hidden') return null;

  const getContainerAnimation = () => {
    switch (phase) {
      case 'tiny':
        return { scale: 0.12, x: '-40vw', y: '10vh', opacity: 1 };
      case 'flying':
        return { scale: 0.5, x: '-15vw', y: '-5vh', opacity: 1 };
      case 'arrived':
        return { scale: 1, x: 0, y: 0, opacity: 1 };
      case 'wingsOpen':
        return { scale: 1.1, x: 0, y: 0, opacity: 1 };
      default:
        return { scale: 0, x: '-40vw', y: '10vh', opacity: 0 };
    }
  };

  const isWingsOpen = phase === 'wingsOpen';
  const isFlying = phase === 'flying';
  const showChildren = phase === 'wingsOpen';

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0, x: '-40vw', y: '10vh', opacity: 0 }}
      animate={getContainerAnimation()}
      transition={{
        duration: phase === 'flying' ? 2.5 : phase === 'arrived' ? 2 : phase === 'wingsOpen' ? 2 : 1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <motion.div
        variants={bodyFloat}
        animate="float"
        className="relative"
      >
        <motion.div variants={glowPulse} animate="pulse">
          <svg
            viewBox="0 0 400 320"
            className="w-80 h-64 sm:w-105 sm:h-85 md:w-140 md:h-112"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Light pink wing gradients */}
              <radialGradient id="fwTopL" cx="30%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#fce4ec" />
                <stop offset="30%" stopColor="#f8bbd0" />
                <stop offset="60%" stopColor="#f48fb1" />
                <stop offset="100%" stopColor="#ec407a" />
              </radialGradient>
              <radialGradient id="fwTopR" cx="70%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#fce4ec" />
                <stop offset="30%" stopColor="#f8bbd0" />
                <stop offset="60%" stopColor="#f48fb1" />
                <stop offset="100%" stopColor="#ec407a" />
              </radialGradient>
              <radialGradient id="fwBotL" cx="35%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#fce4ec" />
                <stop offset="35%" stopColor="#f8bbd0" />
                <stop offset="70%" stopColor="#f48fb1" />
                <stop offset="100%" stopColor="#e91e63" />
              </radialGradient>
              <radialGradient id="fwBotR" cx="65%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#fce4ec" />
                <stop offset="35%" stopColor="#f8bbd0" />
                <stop offset="70%" stopColor="#f48fb1" />
                <stop offset="100%" stopColor="#e91e63" />
              </radialGradient>
              <linearGradient id="fBodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a1a3a" />
                <stop offset="50%" stopColor="#2d0d25" />
                <stop offset="100%" stopColor="#4a1a3a" />
              </linearGradient>
              <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="miniGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ======= LEFT WINGS ======= */}
            <motion.g
              style={{ transformOrigin: '200px 155px' }}
              variants={isFlying ? leftWingFlap : isWingsOpen ? leftWingSlow : leftWingFlap}
              animate={isFlying ? 'flap' : isWingsOpen ? 'open' : 'flap'}
            >
              {/* Upper left forewing */}
              <motion.path
                d="M197 148
                   C 185 120, 160 75, 120 45
                   C 100 30, 70 22, 50 28
                   C 30 34, 18 52, 22 75
                   C 26 98, 45 118, 70 132
                   C 95 145, 145 155, 197 155Z"
                fill="url(#fwTopL)"
                stroke="#d81b60"
                strokeWidth="1.2"
                filter="url(#softGlow)"
                animate={isWingsOpen ? { scaleX: 1.2 } : { scaleX: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                style={{ transformOrigin: '200px 155px' }}
              />
              {/* Soft pink border glow on edge */}
              <path
                d="M120 45 C 100 30, 70 22, 50 28 C 30 34, 18 52, 22 75 C 24 85, 28 94, 35 102"
                fill="none"
                stroke="#ad1457"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Wing veins - soft rose color */}
              <path d="M197 150 C 170 130, 130 95, 85 55" stroke="#c2185b" strokeWidth="1.2" fill="none" opacity="0.35" />
              <path d="M197 152 C 160 140, 110 115, 55 85" stroke="#c2185b" strokeWidth="1" fill="none" opacity="0.3" />
              <path d="M197 148 C 175 125, 140 88, 100 58" stroke="#c2185b" strokeWidth="0.8" fill="none" opacity="0.25" />
              <path d="M197 154 C 150 148, 100 135, 60 115" stroke="#c2185b" strokeWidth="0.7" fill="none" opacity="0.2" />
              {/* White shimmer spots on edges */}
              <circle cx="38" cy="55" r="2.5" fill="white" opacity="0.7" />
              <circle cx="30" cy="70" r="2" fill="white" opacity="0.6" />
              <circle cx="27" cy="86" r="2.2" fill="white" opacity="0.55" />
              <circle cx="35" cy="100" r="2" fill="white" opacity="0.5" />
              <circle cx="48" cy="112" r="1.8" fill="white" opacity="0.5" />
              {/* Soft pink cell highlights */}
              <ellipse cx="100" cy="85" r="15" ry="10" fill="rgba(252,228,236,0.4)" transform="rotate(-30 100 85)" />
              <ellipse cx="130" cy="105" r="12" ry="8" fill="rgba(248,187,208,0.35)" transform="rotate(-20 130 105)" />

              {/* ---- Mini butterflies on left forewing ---- */}
              {leftMiniButterflies.slice(0, 4).map((mb, i) => (
                <g key={`lmb-${i}`} transform={`translate(${mb.cx},${mb.cy}) scale(${mb.scale}) rotate(${mb.rotate})`} filter="url(#miniGlow)">
                  <path d={miniButterfly} fill={mb.color} opacity="0.75" />
                  <path d={miniButterfly} fill="none" stroke="white" strokeWidth="0.3" opacity="0.4" />
                </g>
              ))}

              {/* Lower left hindwing */}
              <motion.path
                d="M197 158
                   C 175 165, 130 175, 95 195
                   C 75 208, 65 225, 70 240
                   C 78 258, 100 265, 125 258
                   C 150 250, 175 230, 190 205
                   C 195 190, 197 170, 197 162Z"
                fill="url(#fwBotL)"
                stroke="#d81b60"
                strokeWidth="1.2"
                filter="url(#softGlow)"
                animate={isWingsOpen ? { scaleX: 1.2 } : { scaleX: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                style={{ transformOrigin: '200px 155px' }}
              />
              <path
                d="M95 195 C 75 208, 65 225, 70 240 C 78 258, 100 265, 125 258"
                fill="none"
                stroke="#ad1457"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.25"
              />
              {/* Hindwing veins */}
              <path d="M197 160 C 165 175, 125 200, 95 225" stroke="#c2185b" strokeWidth="1" fill="none" opacity="0.3" />
              <path d="M197 162 C 170 180, 140 210, 115 240" stroke="#c2185b" strokeWidth="0.8" fill="none" opacity="0.25" />
              {/* White edge spots */}
              <circle cx="78" cy="248" r="2.2" fill="white" opacity="0.6" />
              <circle cx="93" cy="256" r="2" fill="white" opacity="0.55" />
              <circle cx="110" cy="260" r="1.8" fill="white" opacity="0.5" />

              {/* Mini butterflies on left hindwing */}
              {leftMiniButterflies.slice(4).map((mb, i) => (
                <g key={`lmbh-${i}`} transform={`translate(${mb.cx},${mb.cy}) scale(${mb.scale}) rotate(${mb.rotate})`} filter="url(#miniGlow)">
                  <path d={miniButterfly} fill={mb.color} opacity="0.75" />
                  <path d={miniButterfly} fill="none" stroke="white" strokeWidth="0.3" opacity="0.4" />
                </g>
              ))}
            </motion.g>

            {/* ======= RIGHT WINGS ======= */}
            <motion.g
              style={{ transformOrigin: '200px 155px' }}
              variants={isFlying ? rightWingFlap : isWingsOpen ? rightWingSlow : rightWingFlap}
              animate={isFlying ? 'flap' : isWingsOpen ? 'open' : 'flap'}
            >
              {/* Upper right forewing */}
              <motion.path
                d="M203 148
                   C 215 120, 240 75, 280 45
                   C 300 30, 330 22, 350 28
                   C 370 34, 382 52, 378 75
                   C 374 98, 355 118, 330 132
                   C 305 145, 255 155, 203 155Z"
                fill="url(#fwTopR)"
                stroke="#d81b60"
                strokeWidth="1.2"
                filter="url(#softGlow)"
                animate={isWingsOpen ? { scaleX: 1.2 } : { scaleX: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                style={{ transformOrigin: '200px 155px' }}
              />
              <path
                d="M280 45 C 300 30, 330 22, 350 28 C 370 34, 382 52, 378 75 C 376 85, 372 94, 365 102"
                fill="none"
                stroke="#ad1457"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Forewing veins */}
              <path d="M203 150 C 230 130, 270 95, 315 55" stroke="#c2185b" strokeWidth="1.2" fill="none" opacity="0.35" />
              <path d="M203 152 C 240 140, 290 115, 345 85" stroke="#c2185b" strokeWidth="1" fill="none" opacity="0.3" />
              <path d="M203 148 C 225 125, 260 88, 300 58" stroke="#c2185b" strokeWidth="0.8" fill="none" opacity="0.25" />
              <path d="M203 154 C 250 148, 300 135, 340 115" stroke="#c2185b" strokeWidth="0.7" fill="none" opacity="0.2" />
              {/* White spots */}
              <circle cx="362" cy="55" r="2.5" fill="white" opacity="0.7" />
              <circle cx="370" cy="70" r="2" fill="white" opacity="0.6" />
              <circle cx="373" cy="86" r="2.2" fill="white" opacity="0.55" />
              <circle cx="365" cy="100" r="2" fill="white" opacity="0.5" />
              <circle cx="352" cy="112" r="1.8" fill="white" opacity="0.5" />
              {/* Cell highlights */}
              <ellipse cx="300" cy="85" r="15" ry="10" fill="rgba(252,228,236,0.4)" transform="rotate(30 300 85)" />
              <ellipse cx="270" cy="105" r="12" ry="8" fill="rgba(248,187,208,0.35)" transform="rotate(20 270 105)" />

              {/* Mini butterflies on right forewing */}
              {rightMiniButterflies.slice(0, 4).map((mb, i) => (
                <g key={`rmb-${i}`} transform={`translate(${mb.cx},${mb.cy}) scale(${mb.scale}) rotate(${mb.rotate})`} filter="url(#miniGlow)">
                  <path d={miniButterfly} fill={mb.color} opacity="0.75" />
                  <path d={miniButterfly} fill="none" stroke="white" strokeWidth="0.3" opacity="0.4" />
                </g>
              ))}

              {/* Lower right hindwing */}
              <motion.path
                d="M203 158
                   C 225 165, 270 175, 305 195
                   C 325 208, 335 225, 330 240
                   C 322 258, 300 265, 275 258
                   C 250 250, 225 230, 210 205
                   C 205 190, 203 170, 203 162Z"
                fill="url(#fwBotR)"
                stroke="#d81b60"
                strokeWidth="1.2"
                filter="url(#softGlow)"
                animate={isWingsOpen ? { scaleX: 1.2 } : { scaleX: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                style={{ transformOrigin: '200px 155px' }}
              />
              <path
                d="M305 195 C 325 208, 335 225, 330 240 C 322 258, 300 265, 275 258"
                fill="none"
                stroke="#ad1457"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.25"
              />
              {/* Hindwing veins */}
              <path d="M203 160 C 235 175, 275 200, 305 225" stroke="#c2185b" strokeWidth="1" fill="none" opacity="0.3" />
              <path d="M203 162 C 230 180, 260 210, 285 240" stroke="#c2185b" strokeWidth="0.8" fill="none" opacity="0.25" />
              {/* White spots */}
              <circle cx="322" cy="248" r="2.2" fill="white" opacity="0.6" />
              <circle cx="307" cy="256" r="2" fill="white" opacity="0.55" />
              <circle cx="290" cy="260" r="1.8" fill="white" opacity="0.5" />

              {/* Mini butterflies on right hindwing */}
              {rightMiniButterflies.slice(4).map((mb, i) => (
                <g key={`rmbh-${i}`} transform={`translate(${mb.cx},${mb.cy}) scale(${mb.scale}) rotate(${mb.rotate})`} filter="url(#miniGlow)">
                  <path d={miniButterfly} fill={mb.color} opacity="0.75" />
                  <path d={miniButterfly} fill="none" stroke="white" strokeWidth="0.3" opacity="0.4" />
                </g>
              ))}
            </motion.g>

            {/* ======= BODY ======= */}
            <g>
              {/* Thorax */}
              <ellipse cx="200" cy="145" rx="6" ry="12" fill="url(#fBodyGrad)" />
              <ellipse cx="200" cy="145" rx="5.5" ry="11" fill="#2d0d25" stroke="#5a2045" strokeWidth="0.3" />
              {[0, 1, 2, 3, 4].map(i => (
                <line key={`th-${i}`} x1={196} y1={138 + i * 3} x2={204} y2={138 + i * 3} stroke="#6a3055" strokeWidth="0.4" opacity="0.5" />
              ))}

              {/* Abdomen */}
              <path
                d="M200 157 Q 205 170, 204 185 Q 203 200, 200 210 Q 197 200, 196 185 Q 195 170, 200 157Z"
                fill="#1a0a15"
                stroke="#5a2045"
                strokeWidth="0.5"
              />
              {[165, 172, 179, 186, 193, 200].map((y, i) => (
                <line key={`seg-${i}`} x1={197 + i * 0.1} y1={y} x2={203 - i * 0.1} y2={y} stroke="#6a3055" strokeWidth="0.4" opacity="0.6" />
              ))}
              {[162, 172, 182, 192].map((y, i) => (
                <g key={`abspot-${i}`}>
                  <circle cx="195" cy={y} r="1" fill="white" opacity="0.35" />
                  <circle cx="205" cy={y} r="1" fill="white" opacity="0.35" />
                </g>
              ))}

              {/* Head */}
              <circle cx="200" cy="130" r="7" fill="#1a0a15" stroke="#5a2045" strokeWidth="0.5" />
              {/* Compound eyes */}
              <ellipse cx="195.5" cy="128.5" rx="3" ry="3.5" fill="#2a1540" stroke="#3d1a55" strokeWidth="0.4" />
              <ellipse cx="204.5" cy="128.5" rx="3" ry="3.5" fill="#2a1540" stroke="#3d1a55" strokeWidth="0.4" />
              <circle cx="194.5" cy="127.5" r="1" fill="rgba(255,200,230,0.4)" />
              <circle cx="203.5" cy="127.5" r="1" fill="rgba(255,200,230,0.4)" />
              {/* Proboscis */}
              <path d="M200 136 Q 198 140, 196 142 Q 194 144, 196 145" stroke="#5a2045" strokeWidth="0.8" fill="none" strokeLinecap="round" />

              {/* Antennae */}
              <path d="M196 125 Q 175 90, 158 68 Q 150 58, 148 50" stroke="#2d0d25" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <path d="M204 125 Q 225 90, 242 68 Q 250 58, 252 50" stroke="#2d0d25" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <ellipse cx="148" cy="48" rx="2.5" ry="4" fill="#2d0d25" transform="rotate(-15 148 48)" />
              <ellipse cx="252" cy="48" rx="2.5" ry="4" fill="#2d0d25" transform="rotate(15 252 48)" />

              {/* Legs */}
              <path d="M197 150 Q 190 158, 185 165" stroke="#3d1a30" strokeWidth="0.8" fill="none" />
              <path d="M203 150 Q 210 158, 215 165" stroke="#3d1a30" strokeWidth="0.8" fill="none" />
              <path d="M196 155 Q 186 166, 180 175" stroke="#3d1a30" strokeWidth="0.7" fill="none" />
              <path d="M204 155 Q 214 166, 220 175" stroke="#3d1a30" strokeWidth="0.7" fill="none" />
              <path d="M197 160 Q 188 174, 183 185" stroke="#3d1a30" strokeWidth="0.6" fill="none" />
              <path d="M203 160 Q 212 174, 217 185" stroke="#3d1a30" strokeWidth="0.6" fill="none" />
            </g>
          </svg>
        </motion.div>

        {/* Lover image overlay inside butterfly wings */}
        {showChildren && children && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '-5%' }}>
            {children}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
