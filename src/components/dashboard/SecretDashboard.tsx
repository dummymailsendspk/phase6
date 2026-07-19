import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PasswordDialog from './PasswordDialog';
import MagicalTransition from './MagicalTransition';
import EnvelopeRoom from './EnvelopeRoom';
import LetterView from './LetterView';
import type { Wish } from '../../types/wish';

interface SecretDashboardProps {
  onClose: () => void;
}

type Phase = 'password' | 'transitioning' | 'room';

const SecretDashboard: React.FC<SecretDashboardProps> = ({ onClose }) => {
  const [phase, setPhase] = useState<Phase>('password');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handlePasswordSuccess = (fetchedWishes: Wish[]) => {
    setWishes(fetchedWishes);
    setPhase('transitioning');
  };

  const handleNext = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % wishes.length);
  };

  const handlePrev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + wishes.length) % wishes.length);
  };

  return (
    <div className="secret-dashboard-overlay">
      <button className="secret-dashboard-close" onClick={onClose} aria-label="Close dashboard">
        ×
      </button>

      <AnimatePresence mode="wait">
        {phase === 'password' && (
          <PasswordDialog key="password" onSuccess={handlePasswordSuccess} onCancel={onClose} />
        )}

        {phase === 'transitioning' && (
          <MagicalTransition key="transition" onComplete={() => setPhase('room')} />
        )}

        {phase === 'room' && (
          <div key="room" className="secret-dashboard-content">
            <h2 className="secret-dashboard-title">Your Birthday Mail Room 💌</h2>
            <p className="secret-dashboard-subtitle">
              {wishes.length} {wishes.length === 1 ? 'letter is' : 'letters are'} waiting for you
            </p>
            <EnvelopeRoom wishes={wishes} onOpenWish={setOpenIndex} />
          </div>
        )}
      </AnimatePresence>

      {phase === 'room' && openIndex !== null && (
        <LetterView
          wish={wishes[openIndex]}
          index={openIndex}
          total={wishes.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
};

export default SecretDashboard;
