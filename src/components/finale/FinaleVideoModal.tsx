import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface FinaleVideoModalProps {
  videoSrc: string;
  onClose: () => void;
}

const FinaleVideoModal: React.FC<FinaleVideoModalProps> = ({ videoSrc, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="finale-video-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="finale-video-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <button className="letter-close" onClick={onClose} aria-label="Close video">
          ×
        </button>
        <video src={videoSrc} controls autoPlay className="finale-video-player" />
      </motion.div>
    </motion.div>
  );
};

export default FinaleVideoModal;
