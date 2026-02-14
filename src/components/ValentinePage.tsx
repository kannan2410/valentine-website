import { useState, useRef, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import OpeningFlower from './OpeningFlower';
import Butterfly from './Butterfly';
import LoverImage from './LoverImage';
import FloatingHearts from './FloatingHearts';
import RomanticMessage from './RomanticMessage';
import Particles from './Particles';
import MusicToggle from './MusicToggle';

const LOVER_IMAGE = '/patta.jpg';
const ROMANTIC_MESSAGE = 'From the moment I saw you, my heart began to fly like this butterfly.';
const BG_IMAGE = '/nature.jpg';

type FlowerPhase = 'glowing' | 'opening' | 'opened' | 'fading' | 'gone';
type ButterflyPhase = 'hidden' | 'tiny' | 'flying' | 'arrived' | 'wingsOpen';

export default function ValentinePage() {
  const [flowerPhase, setFlowerPhase] = useState<FlowerPhase>('glowing');
  const [butterflyPhase, setButterflyPhase] = useState<ButterflyPhase>('hidden');
  const [showImage, setShowImage] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Orchestrate the full animation sequence
  useEffect(() => {
    // Step 1: Flower glows for 2s, then starts opening
    const t1 = setTimeout(() => {
      setFlowerPhase('opening');
    }, 2000);

    // Step 2: Flower finishes opening, tiny butterfly emerges
    const t2 = setTimeout(() => {
      setFlowerPhase('opened');
      setButterflyPhase('tiny');
    }, 4500);

    // Step 3: Flower fades away, butterfly starts flying up and growing
    const t3 = setTimeout(() => {
      setFlowerPhase('fading');
      setButterflyPhase('flying');
    }, 6000);

    // Step 4: Flower gone, butterfly arrives at center full size
    const t4 = setTimeout(() => {
      setFlowerPhase('gone');
      setButterflyPhase('arrived');
    }, 8000);

    // Step 5: Butterfly opens wings fully
    const t5 = setTimeout(() => {
      setButterflyPhase('wingsOpen');
    }, 10000);

    // Step 6: Lover image fades in inside wings
    const t6 = setTimeout(() => {
      setShowImage(true);
    }, 12000);

    // Step 7: Hearts and sparkles appear
    const t7 = setTimeout(() => {
      setShowHearts(true);
    }, 13500);

    // Step 8: Romantic message fades in
    const t8 = setTimeout(() => {
      setShowMessage(true);
    }, 14500);

    return () => {
      [t1, t2, t3, t4, t5, t6, t7, t8].forEach(clearTimeout);
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsMusicPlaying(!isMusicPlaying);
  }, [isMusicPlaying]);

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Nature background - full HD cover */}
      <img
        src={BG_IMAGE}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: 'auto' }}
      />

      {/* Soft light overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,240,245,0.1) 0%, transparent 70%)',
        }}
      />

      <Particles />
      <MusicToggle isPlaying={isMusicPlaying} onToggle={toggleMusic} />

      <AnimatePresence>
        <div className="relative z-20 flex flex-col items-center justify-center">

          {/* Opening flower (visible until it fades) */}
          {flowerPhase !== 'gone' && (
            <OpeningFlower phase={flowerPhase} />
          )}

          {/* Butterfly (emerges from flower, grows, opens wings) */}
          <Butterfly phase={butterflyPhase}>
            <LoverImage show={showImage} src={LOVER_IMAGE} />
          </Butterfly>

          {/* Romantic message */}
          <RomanticMessage show={showMessage} message={ROMANTIC_MESSAGE} />
        </div>
      </AnimatePresence>

      <FloatingHearts show={showHearts} />

      {/* Music prompt */}
      {!isMusicPlaying && butterflyPhase !== 'hidden' && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-pink-300/60 text-sm animate-pulse cursor-pointer bg-transparent border-none"
        >
          Tap to play music
        </button>
      )}
    </div>
  );
}
