import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Memory } from '../../data/memories';

interface MemoryPhotoModalProps {
  memory: Memory;
  onClose: () => void;
}

const MemoryPhotoModal: React.FC<MemoryPhotoModalProps> = ({ memory, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="memory-modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="memory-modal-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <button className="letter-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <img src={memory.image} alt={memory.caption} className="memory-modal-image" />
        <p className="memory-modal-caption">{memory.caption}</p>
        <p className="memory-modal-date">{memory.date}</p>
      </motion.div>
    </motion.div>
  );
};

export default MemoryPhotoModal;
