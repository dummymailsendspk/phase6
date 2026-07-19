import React, { useRef, useState, useCallback } from 'react';
import thenImg from '../assets/1.jpg';
import nowImg from '../assets/20.jpg';

const ThenNowSlider: React.FC = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div className="then-now-wrapper">
      <h3 className="then-now-title">Then &amp; Now ✨</h3>
      <p className="then-now-subtitle">Drag the line to travel through the years</p>
      <div
        className="then-now-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <img src={nowImg} alt="Now" className="then-now-image then-now-base" draggable={false} />
        <div className="then-now-overlay" style={{ width: `${position}%` }}>
          <img src={thenImg} alt="Then" className="then-now-image" draggable={false} />
        </div>
        <div className="then-now-handle" style={{ left: `${position}%` }}>
          <div className="then-now-handle-line" />
          <div className="then-now-handle-grip">↔</div>
        </div>
        <span className="then-now-label then-now-label-left">Then</span>
        <span className="then-now-label then-now-label-right">Now</span>
      </div>
    </div>
  );
};

export default ThenNowSlider;
