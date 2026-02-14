import { motion } from 'framer-motion';

interface RomanticMessageProps {
  show: boolean;
  message: string;
}

export default function RomanticMessage({ show, message }: RomanticMessageProps) {
  if (!show) return null;

  const words = message.split(' ');

  return (
    <motion.div
      className="text-center px-6 max-w-xl mx-auto mt-8 sm:mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-serif italic">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.12,
              duration: 0.5,
              ease: 'easeOut',
            }}
            style={{
              color: '#ffffff',
              textShadow: '0 0 10px rgba(255,100,180,0.6), 0 0 20px rgba(255,150,200,0.3)',
            }}
          >
            {word}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}
