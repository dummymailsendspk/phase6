import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { duckMusic } from '../../lib/musicBus';

interface MagicalTransitionProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

const PARTICLE_COUNT = 28;

const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 3 + Math.random() * 5,
  delay: Math.random() * 1.2,
  duration: 1.8 + Math.random() * 1.4,
}));

const MagicalTransition: React.FC<MagicalTransitionProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'darken' | 'glow' | 'done'>('darken');

  useEffect(() => {
    duckMusic(true);

    const t1 = window.setTimeout(() => setStage('glow'), 500);
    const t2 = window.setTimeout(() => setStage('done'), 2400);
    const t3 = window.setTimeout(() => {
      duckMusic(false);
      onComplete();
    }, 2700);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      duckMusic(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="magic-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="magic-transition-glow"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: stage === 'glow' || stage === 'done' ? 1 : 0,
          scale: stage === 'glow' || stage === 'done' ? 1 : 0.6,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <div className="magic-transition-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="magic-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <motion.p
        className="magic-transition-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: stage !== 'darken' ? 1 : 0, y: stage !== 'darken' ? 0 : 10 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to your hidden birthday world ✨
      </motion.p>
    </motion.div>
  );
};

export default MagicalTransition;
