import { motion, type Variants } from 'framer-motion';

interface LotusProps {
  show: boolean;
  children?: React.ReactNode;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const petalVariants: Variants = {
  hidden: { scale: 0, opacity: 0, rotate: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const glowVariants: Variants = {
  glow: {
    filter: [
      'drop-shadow(0 0 6px rgba(255,100,180,0.5))',
      'drop-shadow(0 0 18px rgba(255,100,180,0.9))',
      'drop-shadow(0 0 6px rgba(255,100,180,0.5))',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const petalAngles = [0, 45, 90, 135, 180, 225, 270, 315];

export default function Lotus({ show, children }: LotusProps) {
  if (!show) return null;

  return (
    <motion.div
      className="relative flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={glowVariants} animate="glow">
        <svg
          viewBox="0 0 120 120"
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
          xmlns="http://www.w3.org/2000/svg"
        >
          {petalAngles.map((angle, i) => (
            <motion.ellipse
              key={i}
              cx="60"
              cy="60"
              rx="12"
              ry="30"
              fill={`rgba(255,${120 + i * 10},${180 + i * 5},${0.5 + i * 0.05})`}
              stroke="rgba(255,200,230,0.4)"
              strokeWidth="0.5"
              transform={`rotate(${angle} 60 60)`}
              variants={petalVariants}
            />
          ))}
          {/* Inner petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.ellipse
              key={`inner-${i}`}
              cx="60"
              cy="60"
              rx="8"
              ry="18"
              fill={`rgba(255,${160 + i * 8},${200 + i * 5},0.7)`}
              transform={`rotate(${angle} 60 60)`}
              variants={petalVariants}
            />
          ))}
          {/* Center glow */}
          <circle cx="60" cy="60" r="14" fill="url(#lotusCenter)" />
          <defs>
            <radialGradient id="lotusCenter">
              <stop offset="0%" stopColor="rgba(255,220,240,0.9)" />
              <stop offset="100%" stopColor="rgba(255,150,200,0.3)" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Child content (lover image) centered */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </motion.div>
  );
}
