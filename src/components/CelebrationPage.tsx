import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LetterModal from './LetterModal';
import FloatingBottles from './FloatingBottles';
import GiftBoxReveal from './finale/GiftBoxReveal';
import SecretDashboard from './dashboard/SecretDashboard';
import SpecialMemoriesPage from './memories/SpecialMemoriesPage';
import { onDuckMusic } from '../lib/musicBus';
import blueSong from './song.mp3';

interface CelebrationPageProps {
  currentTime: Date;
  birthdayDate: Date;
  onReplaySurprise: () => void;
}

interface FloatingHeart {
  id: number;
  left: number;
}

const SECRET_MESSAGE =
  "You found the secret balloon! 🎈 Here's an extra one just for you: no matter how far apart we are, you're one of the best people I know. Never change. 🐐💛";

const NORMAL_VOLUME = 1;
const DUCKED_VOLUME = 0.12;

const CelebrationPage: React.FC<CelebrationPageProps> = ({ currentTime, birthdayDate, onReplaySurprise }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showMemories, setShowMemories] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const heartIdRef = useRef(0);

  const timeDiff = currentTime.getTime() - birthdayDate.getTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const h = Math.floor(hours % 24);
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const openLetter = () => setShowLetter(true);
  const closeLetter = () => setShowLetter(false);

  const openSecret = () => setShowSecret(true);
  const closeSecret = () => setShowSecret(false);

  const makeAWish = () => {
    setWishCount((c) => c + 1);
    const id = heartIdRef.current++;
    const left = 10 + Math.random() * 80;
    setHearts((prev) => [...prev, { id, left }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== id));
    }, 2200);
  };

  useEffect(() => {
    // Auto-play music when celebration starts (browsers may still block this)
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  useEffect(() => {
    // Let the magical unlock transition (Special Access) duck the music
    // volume temporarily without needing direct access to this <audio> ref.
    const unsubscribe = onDuckMusic((duck) => {
      if (audioRef.current) {
        audioRef.current.volume = duck ? DUCKED_VOLUME : NORMAL_VOLUME;
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="celebration-page">
      <audio ref={audioRef} loop>
        <source src={blueSong} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <AnimatePresence mode="wait">
        {showMemories ? (
          <SpecialMemoriesPage key="memories" onClose={() => setShowMemories(false)} />
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Confetti Animation */}
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div key={i} className={`confetti confetti-${i % 6}`}></div>
              ))}
            </div>

            {/* Balloons */}
            <div className="balloons-container">
              <div className="balloon balloon-red"></div>
              <div className="balloon balloon-blue"></div>
              <div className="balloon balloon-yellow"></div>
              <div className="balloon balloon-pink"></div>
              <button
                className="balloon balloon-green balloon-secret"
                onClick={openSecret}
                aria-label="A mysterious balloon"
              ></button>
            </div>

            <FloatingBottles />

            {/* Floating wish hearts */}
            <div className="wish-hearts-container">
              {hearts.map((heart) => (
                <div
                  key={heart.id}
                  className="wish-heart"
                  style={{ left: `${heart.left}%` }}
                >
                  💖
                </div>
              ))}
            </div>

            <div className="celebration-content">
              <h1 className="birthday-title">
                Happy Birthday Jayapriya! 🎉
              </h1>

              <div className="birthday-message">
                <p className="age-text">
                  The world has been blessed for 20 years , {days} days , {h} hours , {minutes} minutes and {seconds} seconds.
                </p>
              </div>

              <div className="controls">
                <button className="music-btn" onClick={toggleMusic}>
                  {isPlaying ? '⏸️ Pause Music' : '▶️ Play Music'}
                </button>

                <button className="message-btn" onClick={openLetter}>
                  💌 Read Message
                </button>

                <button className="gallery-btn" onClick={() => setShowMemories(true)}>
                  21 Beautiful Memories ✨
                </button>

                <button className="special-access-btn" onClick={() => setShowDashboard(true)}>
                  ✨ Special Access
                </button>

                <button className="replay-surprise-btn" onClick={onReplaySurprise}>
                  Replay Surprise ✨
                </button>
              </div>

              <button className="wish-btn" onClick={makeAWish}>
                ✨ Make a Wish {wishCount > 0 && <span className="wish-count">({wishCount})</span>}
              </button>

              <div className="celebration-emoji">
                🎈✨🎁🌟🎊🐐 🏅
              </div>
            </div>

            {showLetter && <LetterModal onClose={closeLetter} />}

            
          </motion.div>
        )}
      </AnimatePresence>

      {showDashboard && <SecretDashboard onClose={() => setShowDashboard(false)} />}
    </div>
  );
};

export default CelebrationPage;
