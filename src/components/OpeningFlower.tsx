import { motion, type Variants } from 'framer-motion';

interface OpeningFlowerProps {
  phase: 'glowing' | 'opening' | 'opened' | 'fading' | 'gone';
}

const containerVariants: Variants = {
  glowing: {
    scale: 1,
    opacity: 1,
  },
  opening: {
    scale: 1.3,
    opacity: 1,
    transition: { duration: 2, ease: 'easeInOut' },
  },
  opened: {
    scale: 1.5,
    opacity: 1,
    transition: { duration: 1, ease: 'easeOut' },
  },
  fading: {
    scale: 2,
    opacity: 0,
    transition: { duration: 1.5, ease: 'easeIn' },
  },
};

const glowPulse: Variants = {
  glow: {
    filter: [
      'drop-shadow(0 0 8px rgba(255,150,220,0.4)) drop-shadow(0 0 20px rgba(255,100,180,0.2))',
      'drop-shadow(0 0 20px rgba(255,150,220,0.8)) drop-shadow(0 0 40px rgba(255,100,180,0.5))',
      'drop-shadow(0 0 8px rgba(255,150,220,0.4)) drop-shadow(0 0 20px rgba(255,100,180,0.2))',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

const outerPetalAngles = [0, 45, 90, 135, 180, 225, 270, 315];
const innerPetalAngles = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

export default function OpeningFlower({ phase }: OpeningFlowerProps) {
  const isOpening = phase === 'opening' || phase === 'opened' || phase === 'fading';

  return (
    <motion.div
      className="flex items-center justify-center"
      variants={containerVariants}
      initial="glowing"
      animate={phase}
    >
      <motion.div variants={glowPulse} animate="glow">
        <svg
          viewBox="0 0 140 140"
          className="w-24 h-24 sm:w-32 sm:h-32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="flowerCenter">
              <stop offset="0%" stopColor="rgba(255,240,250,1)" />
              <stop offset="50%" stopColor="rgba(255,180,220,0.8)" />
              <stop offset="100%" stopColor="rgba(255,120,180,0.4)" />
            </radialGradient>
            <radialGradient id="petalGrad">
              <stop offset="0%" stopColor="rgba(255,200,230,0.9)" />
              <stop offset="100%" stopColor="rgba(220,80,160,0.6)" />
            </radialGradient>
            <radialGradient id="innerPetalGrad">
              <stop offset="0%" stopColor="rgba(255,220,240,0.95)" />
              <stop offset="100%" stopColor="rgba(255,140,200,0.7)" />
            </radialGradient>
          </defs>

          {/* Outer petals */}
          {outerPetalAngles.map((angle, i) => (
            <motion.ellipse
              key={`outer-${i}`}
              cx="70"
              cy="70"
              rx="10"
              ry="28"
              fill="url(#petalGrad)"
              stroke="rgba(255,180,220,0.3)"
              strokeWidth="0.5"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: isOpening ? 1 : 0.3,
                opacity: isOpening ? 1 : 0.5,
                rotate: isOpening ? angle + 10 : angle,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                transformOrigin: '70px 70px',
                transform: `rotate(${angle}deg)`,
              }}
              transform={`rotate(${angle} 70 70)`}
            />
          ))}

          {/* Inner petals */}
          {innerPetalAngles.map((angle, i) => (
            <motion.ellipse
              key={`inner-${i}`}
              cx="70"
              cy="70"
              rx="7"
              ry="18"
              fill="url(#innerPetalGrad)"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{
                scale: isOpening ? 1 : 0.2,
                opacity: isOpening ? 1 : 0.3,
              }}
              transition={{
                duration: 1.2,
                delay: 0.5 + i * 0.08,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              transform={`rotate(${angle} 70 70)`}
            />
          ))}

          {/* Glowing center */}
          <circle cx="70" cy="70" r="12" fill="url(#flowerCenter)">
            <animate attributeName="r" values="10;13;10" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="70" r="6" fill="rgba(255,255,240,0.9)">
            <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </motion.div>
    </motion.div>
  );
}
