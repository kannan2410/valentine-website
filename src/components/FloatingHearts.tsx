import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface HeartConfig {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface FloatingHeartsProps {
  show: boolean;
}

const colors = [
  'rgba(255,100,150,0.7)',
  'rgba(255,150,180,0.6)',
  'rgba(220,80,130,0.7)',
  'rgba(255,120,170,0.5)',
  'rgba(200,100,200,0.6)',
];

export default function FloatingHearts({ show }: FloatingHeartsProps) {
  const hearts = useMemo<HeartConfig[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 10,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.x}%`, bottom: -30 }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 1, 1, 0],
            x: [0, Math.sin(h.id) * 60],
            rotate: [0, Math.random() * 40 - 20],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            style={{
              filter: `drop-shadow(0 0 4px ${h.color})`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Sparkles */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-yellow-200/60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: Math.random() * 12 + 8,
            filter: 'drop-shadow(0 0 4px rgba(255,255,200,0.6))',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.3, 0.5],
            rotate: [0, 180],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          &#10022;
        </motion.div>
      ))}
    </div>
  );
}
