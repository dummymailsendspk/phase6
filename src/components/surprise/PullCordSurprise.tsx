import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PullCord from './PullCord';
import { playPowerOnChime } from '../../lib/sounds';
import { duckMusic } from '../../lib/musicBus';

interface PullCordSurpriseProps {
  name: string;
  onComplete: () => void;
}

type Stage = 'blackout' | 'cord' | 'flash' | 'celebrating' | 'fadeOut';

const CELEBRATION_HOLD_MS = 70000;

const PullCordSurprise: React.FC<PullCordSurpriseProps> = ({ name, onComplete }) => {
  const [stage, setStage] = useState<Stage>('blackout');

  const balloons = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: 6 + i * 12 + Math.random() * 6,
        delay: Math.random() * 1.2,
        duration: 4 + Math.random() * 2,
        emoji: ['🎈', '🎈', '🎈', '🎈'][i % 4],
      })),
    []
  );

  const fireworks = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: 15 + i * 14 + Math.random() * 8,
        top: 15 + Math.random() * 35,
        delay: i * 0.5,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
      })),
    []
  );

  const goldParticles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 1.5,
      })),
    []
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 3 + Math.random() * 2,
      })),
    []
  );

  useEffect(() => {
    duckMusic(true);
    const t = window.setTimeout(() => setStage('cord'), 1000);
    return () => window.clearTimeout(t);
  }, []);

  const handlePulled = () => {
    setStage('flash');
    playPowerOnChime();
    window.setTimeout(() => setStage('celebrating'), 450);
    window.setTimeout(() => setStage('fadeOut'), 450 + CELEBRATION_HOLD_MS);
    window.setTimeout(() => {
      duckMusic(false);
      onComplete();
    }, 450 + CELEBRATION_HOLD_MS + 700);
  };

  return (
   <div
  className={`surprise-overlay surprise-stage-${stage}`}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 999999,
  }}
>
      {stage === 'blackout' && <div className="surprise-blackout" />}

      <AnimatePresence mode="wait">
  {stage === 'cord' && (
    <motion.div
      key="cord"
      className="surprise-cord-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PullCord onPulled={handlePulled} />

      <motion.div
        className="surprise-cord-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="surprise-cord-line-1">
          One more surprise awaits...
        </p>
        <p className="surprise-cord-line-2">
          Pull to unlock your surprise ✨
        </p>
      </motion.div>
    </motion.div>
  )}

  {stage === 'flash' && (
    <motion.div
      key="flash"
      className="surprise-flash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}

  {(stage === 'celebrating' || stage === 'fadeOut') && (
    <motion.div
      key="celebration"
      className={`surprise-celebration ${
        stage === 'fadeOut'
          ? 'surprise-celebration-fadeout'
          : ''
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* celebration content */}
    </motion.div>
  )}
</AnimatePresence>

      {stage === 'flash' && <div className="surprise-flash" />}

      {(stage === 'celebrating' || stage === 'fadeOut') && (
        <div className={`surprise-celebration ${stage === 'fadeOut' ? 'surprise-celebration-fadeout' : ''}`}>
          <div className="reveal-glow-bg" />

         <motion.div
  className="surprise-birthday-title"
  initial={{
    opacity: 0,
    scale: 0.2,
  }}
  animate={{
    opacity: 1,
    scale: [0.2, 1.15, 1],
    y: [0, -10, 0, -10, 0],
  }}
  transition={{
    duration: 0.5,
    times: [0, 0.3, 1],
  }}
>
  🎉 Happy Birthday {name}! 🎉
</motion.div>
          <div className="reveal-confetti-burst">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`reveal-confetti-piece reveal-confetti-${i % 6}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>

          <div className="reveal-balloons">
            {balloons.map((b) => (
              <span
                key={b.id}
                className="reveal-balloon"
                style={{
                  left: `${b.left}%`,
                  animationDelay: `${b.delay}s`,
                  animationDuration: `${b.duration}s`,
                }}
              >
                {b.emoji}
              </span>
            ))}
          </div>

          <div className="surprise-hearts">
            {hearts.map((h) => (
              <span
                key={h.id}
                className="surprise-heart"
                style={{
                  left: `${h.left}%`,
                  animationDelay: `${h.delay}s`,
                  animationDuration: `${h.duration}s`,
                }}
              >
                💖
              </span>
            ))}
          </div>

          <div className="reveal-fireworks">
            {fireworks.map((f) => (
              <div
                key={f.id}
                className="reveal-firework"
                style={{
                  left: `${f.left}%`,
                  top: `${f.top}%`,
                  animationDelay: `${f.delay}s`,
                }}
              >
                {[...Array(12)].map((_, j) => (
                  <span
                    key={j}
                    className="reveal-firework-spark"
                    style={{ transform: `rotate(${j * 30}deg)` }}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="reveal-sparkles">
            {sparkles.map((s) => (
              <span
                key={s.id}
                className="reveal-sparkle"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  animationDelay: `${s.delay}s`,
                }}
              >
                ✦
              </span>
            ))}
          </div>

          <div className="reveal-gold-particles">
            {goldParticles.map((p) => (
              <span
                key={p.id}
                className="reveal-gold-particle"
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
        </div>
      )}
    </div>
  );
};

export default PullCordSurprise;
