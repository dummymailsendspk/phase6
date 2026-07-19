import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Wish } from '../../types/wish';

interface LetterViewProps {
  wish: Wish;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 60;
const TYPE_SPEED_MS = 22;

const LetterView: React.FC<LetterViewProps> = ({ wish, index, total, onNext, onPrev, onClose }) => {
  const touchStartX = useRef<number | null>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    setTypedMessage('');
    setTypingDone(false);
    setPhotoFailed(false);
    setAvatarFailed(false);

    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setTypedMessage(wish.message.slice(0, i));
      if (i >= wish.message.length) {
        window.clearInterval(interval);
        setTypingDone(true);
      }
    }, TYPE_SPEED_MS);

    return () => window.clearInterval(interval);
  }, [wish.id, wish.message]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD) onPrev();
    else if (deltaX < -SWIPE_THRESHOLD) onNext();
    touchStartX.current = null;
  };

  const hasPhoto = Boolean(wish.photo_url) && !photoFailed;
  const hasVideo = Boolean(wish.video_url);
  const hasAudio = Boolean(wish.audio_url);
  const hasAnyMedia = hasPhoto || hasVideo || hasAudio;

  return (
    <div className="letter-view-backdrop" onClick={onClose}>
      <AnimatePresence mode="wait">
        <motion.div
          key={wish.id}
          className="letter-view-card letter-paper-texture"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          initial={{ opacity: 0, y: 50, scale: 0.88, rotateX: -12 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="letter-view-fold-top" />

          <button className="letter-close" onClick={onClose} aria-label="Back to envelopes">
            ×
          </button>

          <div className="letter-view-header">
            {wish.profile_pic_url && !avatarFailed ? (
              <img
                src={wish.profile_pic_url}
                alt={wish.name}
                className="letter-view-avatar"
                onError={() => setAvatarFailed(true)}
              />
            ) : (
              <div className="letter-view-avatar letter-view-avatar-fallback">
                {wish.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="letter-view-name">{wish.name}</h3>
              <p className="letter-view-relationship">{wish.relationship}</p>
            </div>
          </div>

          <p className="letter-view-message letter-view-message-typed">
            {typedMessage}
            {!typingDone && <span className="letter-typing-cursor">|</span>}
          </p>

          {typingDone && hasAnyMedia && (
            <motion.div
              className="letter-view-media"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {hasPhoto && (
                <img
                  src={wish.photo_url as string}
                  alt="Attached memory"
                  className="letter-view-photo"
                  onError={() => setPhotoFailed(true)}
                />
              )}

              {hasVideo && (
                <div className="letter-view-video-wrap">
                  <video src={wish.video_url as string} controls className="letter-view-video" />
                </div>
              )}

              {hasAudio && (
                <div className="letter-audio-player">
                  <span className="letter-audio-icon">🎵</span>
                  <audio src={wish.audio_url as string} controls className="letter-view-audio" />
                </div>
              )}
            </motion.div>
          )}

          <div className="letter-view-nav">
            <button onClick={onPrev} disabled={total <= 1}>
              ← Previous
            </button>
            <span className="letter-view-counter">
              {index + 1} / {total}
            </span>
            <button onClick={onNext} disabled={total <= 1}>
              Next →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LetterView;
