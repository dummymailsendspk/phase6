import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Wish } from '../../types/wish';
import { PASTEL_COLORS } from './pastelColors';

interface EnvelopeOverlayProps {
  wish: Wish;
  colorIndex: number;
  onOpenFully: () => void;
  onCancel: () => void;
}

type Stage = 'centered' | 'back' | 'opening';

const EnvelopeOverlay: React.FC<EnvelopeOverlayProps> = ({
  wish,
  colorIndex,
  onOpenFully,
  onCancel,
}) => {
  const [stage, setStage] = useState<Stage>('centered');
  const palette = PASTEL_COLORS[colorIndex % PASTEL_COLORS.length];

  const handleClick = () => {
    if (stage === 'centered') {
      setStage('back');
    } else if (stage === 'back') {
      setStage('opening');
      window.setTimeout(() => onOpenFully(), 1000);
    }
  };

  return (
    <motion.div
      className="envelope-overlay-backdrop"
      onClick={onCancel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        layoutId={`envelope-${wish.id}`}
        className={`pastel-envelope pastel-envelope-large pastel-envelope-${palette.name}`}
        style={{ background: palette.bg, borderColor: palette.accent }}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        animate={
          stage === 'centered'
            ? { rotateY: 0, scale: 1.1 }
            : { rotateY: 180, scale: stage === 'opening' ? 1.16 : 1.1 }
        }
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {stage === 'centered' ? (
          <>
            <div className="pastel-envelope-stamp" style={{ borderColor: palette.accent }}>
              🎀
            </div>
            <div className="pastel-envelope-seal" style={{ background: palette.accent }}>
              💌
            </div>
            <div className="pastel-envelope-front-text">
              <p className="pastel-envelope-from">From: {wish.name}</p>
              <p className="pastel-envelope-relationship">{wish.relationship}</p>
            </div>
            <p className="pastel-envelope-tap-hint">Tap to flip</p>
          </>
        ) : (
          <div className="pastel-envelope-back" style={{ transform: 'rotateY(180deg)' }}>
            <div
              className={`pastel-envelope-wax-seal ${
                stage === 'opening' ? 'pastel-envelope-wax-cracked' : ''
              }`}
              style={{ background: palette.accent }}
            >
              ✦
            </div>
            {stage === 'back' && <p className="pastel-envelope-tap-hint">Tap again to open</p>}
            <motion.div
              className="pastel-envelope-flap"
              style={{ borderBottomColor: palette.accent }}
              animate={
                stage === 'opening'
                  ? { rotateX: 165, opacity: 0.3 }
                  : { rotateX: 0, opacity: 1 }
              }
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
            {stage === 'opening' && (
              <motion.div
                className="pastel-envelope-letter-peek"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -40, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EnvelopeOverlay;
