import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import PastelEnvelope from './PastelEnvelope';
import EnvelopeOverlay from './EnvelopeOverlay';
import type { Wish } from '../../types/wish';

interface EnvelopeRoomProps {
  wishes: Wish[];
  onOpenWish: (index: number) => void;
}

const EnvelopeRoom: React.FC<EnvelopeRoomProps> = ({ wishes, onOpenWish }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (wishes.length === 0) {
    return (
      <div className="envelope-room-empty">
        <p>No letters yet — check back soon! 💌</p>
      </div>
    );
  }

  const selectedIndex = wishes.findIndex((w) => w.id === selectedId);

  return (
    <LayoutGroup>
      <div className="envelope-room">
        {wishes.map((wish, index) =>
          selectedId === wish.id ? (
            <div key={wish.id} className="pastel-envelope-placeholder" />
          ) : (
            <PastelEnvelope
              key={wish.id}
              wish={wish}
              colorIndex={index}
              onSelect={() => setSelectedId(wish.id)}
            />
          )
        )}
      </div>

      <AnimatePresence>
        {selectedIndex !== -1 && (
          <EnvelopeOverlay
            key={selectedId}
            wish={wishes[selectedIndex]}
            colorIndex={selectedIndex}
            onCancel={() => setSelectedId(null)}
            onOpenFully={() => {
              onOpenWish(selectedIndex);
              setSelectedId(null);
            }}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default EnvelopeRoom;
