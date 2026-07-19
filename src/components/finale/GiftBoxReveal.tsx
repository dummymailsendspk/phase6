import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FinaleVideoModal from './FinaleVideoModal';
import photo1 from '../../assets/mid.jpg';
import photo2 from '../../assets/6.jpg';
import photo3 from '../../assets/10.jpg';
import photo4 from '../../assets/15.jpg';
import photo5 from '../../assets/20.jpg';

const FINALE_MESSAGE =
  "Twenty years ago, the world got so much brighter. Every memory we've shared, every laugh, " +
  "every quiet moment — they all live in me, and I wanted this last little corner of the website " +
  "to be just for you. No countdown, no crowd, just this: I'm endlessly proud of who you are, and " +
  "endlessly grateful I get to know you. Happy Birthday. This last surprise is for you.";

const FINALE_PHOTOS = [photo1, photo2, photo3, photo4, photo5];

// Place your finale video at: public/special-video.mp4
const SPECIAL_VIDEO_SRC = '/special-video.mp4';

type Stage = 'closed' | 'opening' | 'message';

const TYPE_SPEED_MS = 35;

const GiftBoxReveal: React.FC = () => {
  const [stage, setStage] = useState<Stage>('closed');
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleOpen = () => {
    if (stage !== 'closed') return;
    setStage('opening');
    window.setTimeout(() => setStage('message'), 1100);
  };

  useEffect(() => {
    if (stage !== 'message') return;

    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setTypedText(FINALE_MESSAGE.slice(0, i));
      if (i >= FINALE_MESSAGE.length) {
        window.clearInterval(interval);
        setTypingDone(true);
        window.setTimeout(() => setShowPhotos(true), 400);
        window.setTimeout(() => setShowButton(true), 400 + FINALE_PHOTOS.length * 250 + 500);
      }
    }, TYPE_SPEED_MS);

    return () => window.clearInterval(interval);
  }, [stage]);

  return (
    <div className="gift-finale">
      {stage === 'closed' && (
        <motion.button
          className="gift-finale-box"
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Open your special gift"
        >
          <div className="gift-finale-box-lid" />
          <div className="gift-finale-box-body" />
          <div className="gift-finale-ribbon-v" />
          <div className="gift-finale-ribbon-h" />
          <span className="gift-finale-hint">A Special Message From Me — tap to open</span>
        </motion.button>
      )}

      <AnimatePresence>
        {stage === 'opening' && (
          <motion.div
            className="gift-finale-box gift-finale-box-opening"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          >
            <motion.div
              className="gift-finale-box-lid"
              animate={{ y: -80, rotate: -25, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <div className="gift-finale-box-body gift-finale-glow" />
            <motion.div
              className="gift-finale-ribbon-v"
              animate={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="gift-finale-ribbon-h"
              animate={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {stage === 'message' && (
        <motion.div
          className="gift-finale-message-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="gift-finale-backdrop-glow" />
          <p className="gift-finale-text">
            {typedText}
            {!typingDone && <span className="gift-finale-cursor">|</span>}
          </p>

          {showPhotos && (
            <div className="gift-finale-photos">
              {FINALE_PHOTOS.map((src, i) => (
                <motion.img
                  key={src}
                  src={src}
                  alt="A cherished memory"
                  className="gift-finale-photo"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.25 }}
                />
              ))}
            </div>
          )}

          {showButton && (
            <motion.button
              className="gift-finale-surprise-btn"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setShowVideo(true)}
            >
              🎬 One Last Surprise
            </motion.button>
          )}
        </motion.div>
      )}

      {showVideo && (
        <FinaleVideoModal videoSrc={SPECIAL_VIDEO_SRC} onClose={() => setShowVideo(false)} />
      )}
    </div>
  );
};

export default GiftBoxReveal;
