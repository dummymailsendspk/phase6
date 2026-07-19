import React from 'react';
import { motion } from 'framer-motion';
import type { Wish } from '../../types/wish';
import { PASTEL_COLORS } from './pastelColors';

interface PastelEnvelopeProps {
  wish: Wish;
  colorIndex: number;
  onSelect: () => void;
}

const PastelEnvelope: React.FC<PastelEnvelopeProps> = ({ wish, colorIndex, onSelect }) => {
  const palette = PASTEL_COLORS[colorIndex % PASTEL_COLORS.length];
  const rotation = (colorIndex % 2 === 0 ? -1 : 1) * (1.5 + (colorIndex % 3));

  return (
    <motion.button
      layoutId={`envelope-${wish.id}`}
      className={`pastel-envelope pastel-envelope-idle pastel-envelope-${palette.name}`}
      style={{ background: palette.bg, borderColor: palette.accent, ['--envelope-rot' as string]: `${rotation}deg` }}
      onClick={onSelect}
      whileHover={{ y: -10, scale: 1.04, rotate: 0 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
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
    </motion.button>
  );
};

export default PastelEnvelope;
