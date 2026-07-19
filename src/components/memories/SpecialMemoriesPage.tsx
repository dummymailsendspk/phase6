import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories, type Memory } from '../../data/memories';
import MemoryPhotoModal from './MemoryPhotoModal';

interface SpecialMemoriesPageProps {
  onClose: () => void;
}

// Deterministic pseudo-random rotation/sway per photo so it's stable across renders
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

const SpecialMemoriesPage: React.FC<SpecialMemoriesPageProps> = ({ onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    // Convert vertical wheel/trackpad scroll into horizontal movement
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || !scrollRef.current) return; // let native touch scroll handle itself
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const delta = e.clientX - dragStartX.current;
    scrollRef.current.scrollLeft = dragStartScroll.current - delta;
  };

  const stopDragging = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const sparkles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: seededRandom(i + 1) * 100,
    top: seededRandom(i + 50) * 100,
    delay: seededRandom(i + 100) * 3,
  }));

  const fairyLights = Array.from({ length: 28 }, (_, i) => i);

  return (
    <motion.div
      className="memories-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <button className="memories-back-btn" onClick={onClose} aria-label="Back to celebration">
        ← Back
      </button>

      <div className="memories-glow-bg" />

      <div className="memories-sparkles">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="memories-sparkle"
            style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="memories-fairy-lights">
        {fairyLights.map((i) => (
          <span
            key={i}
            className={`memories-bulb memories-bulb-${i % 4}`}
            style={{ animationDelay: `${(i % 6) * 0.3}s` }}
          />
        ))}
      </div>

      <h1 className="memories-title">A Collection of Special Moments</h1>
      <p className="memories-subtitle">Scroll, drag, or swipe through 21 years of memories</p>

      <div
        className="memories-scroll-track"
        ref={scrollRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerLeave={stopDragging}
      >
        <div className="memories-rope" />

        <div className="memories-rope-content">
          {memories.map((memory, index) => {
            const rotation = (seededRandom(memory.id) - 0.5) * 14;
            const swayDuration = 4 + seededRandom(memory.id + 200) * 3;
            const swayDelay = seededRandom(memory.id + 300) * 2;

            return (
              <motion.div
                key={memory.id}
                className="memory-polaroid-wrapper"
                style={{
                  ['--polaroid-rot' as string]: `${rotation}deg`,
                  ['--sway-duration' as string]: `${swayDuration}s`,
                  ['--sway-delay' as string]: `${swayDelay}s`,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.08, ease: 'easeOut' }}
              >
                <div className="memory-clip" />
                <button
                  className="memory-polaroid"
                  onClick={() => setSelectedMemory(memory)}
                  aria-label={`View memory: ${memory.caption}`}
                >
                  <div className="memory-polaroid-photo">
                    <img src={memory.image} alt={memory.caption} loading="lazy" />
                  </div>
                  <p className="memory-polaroid-caption">{memory.caption}</p>
                  <p className="memory-polaroid-date">{memory.date}</p>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <MemoryPhotoModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpecialMemoriesPage;
