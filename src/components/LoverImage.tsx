import { motion, type Variants } from 'framer-motion';

interface LoverImageProps {
  show: boolean;
  src: string;
  alt?: string;
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const glowRing: Variants = {
  glow: {
    boxShadow: [
      '0 0 15px rgba(255,150,200,0.4), 0 0 30px rgba(255,100,180,0.2), 0 0 60px rgba(200,80,160,0.1)',
      '0 0 25px rgba(255,150,200,0.7), 0 0 50px rgba(255,100,180,0.4), 0 0 80px rgba(200,80,160,0.2)',
      '0 0 15px rgba(255,150,200,0.4), 0 0 30px rgba(255,100,180,0.2), 0 0 60px rgba(200,80,160,0.1)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function LoverImage({ show, src, alt = 'My Love' }: LoverImageProps) {
  if (!show) return null;

  return (
    <motion.div
      className="rounded-full overflow-hidden border-3 border-pink-200/60"
      style={{ width: 160, height: 160 }}
      variants={imageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="w-full h-full rounded-full overflow-hidden"
        variants={glowRing}
        animate="glow"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
