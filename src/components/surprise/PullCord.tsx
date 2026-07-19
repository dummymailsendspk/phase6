import React, { useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { playSwitchClick } from '../../lib/sounds';

interface PullCordProps {
  onPulled: () => void;
}

const PULL_THRESHOLD = 110;

const PullCord: React.FC<PullCordProps> = ({ onPulled }) => {
  const [pulled, setPulled] = useState(false);
  const y = useMotionValue(0);
  const controls = useAnimation();

  const handleDragEnd = async (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number } }
  ) => {
    if (pulled) return;

    if (info.offset.y >= PULL_THRESHOLD) {
      setPulled(true);
      playSwitchClick();
      // Snap down with a little overshoot/bounce, like a real cord release
      await controls.start({
        y: [info.offset.y, PULL_THRESHOLD + 30, PULL_THRESHOLD + 10],
        transition: { duration: 0.4, ease: 'easeOut' },
      });
      onPulled();
    } else {
      // Not pulled far enough — spring back up with resistance
      controls.start({
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 12 },
      });
    }
  };

  return (
    <div className="pull-cord-scene">
      <div className="pull-cord-fixture" />
      <div className="pull-cord-string" />

      <motion.div
        className="pull-cord-handle-wrap"
        style={{ y }}
        animate={controls}
        drag={pulled ? false : 'y'}
        dragConstraints={{ top: 0, bottom: PULL_THRESHOLD + 40 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.05 }}
      >
        <div className="pull-cord-handle-string" />
        <div className="pull-cord-bulb">
          <span className="pull-cord-bulb-glow" />
          <span className="pull-cord-bulb-shape">💡</span>
        </div>
      </motion.div>
    </div>
  );
};

export default PullCord;
