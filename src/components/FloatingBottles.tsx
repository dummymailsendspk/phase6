import React, { useState } from 'react';

const funFacts = [
  "Fun fact: you once talked me into a 2 AM snack run and I'd do it again.",
  "Inside joke reminder: 'the incident' — you know exactly which one.",
  "You've somehow never been on time once, and it's still endearing.",
  "That one voice note you sent still lives in my head rent-free.",
  "You give the best advice you never take yourself. Never change.",
  "Officially the loudest laugh in any group chat. Proudly.",
];

interface Bottle {
  id: number;
  left: number;
  duration: number;
  delay: number;
}

const bottles: Bottle[] = [
  { id: 0, left: 12, duration: 14, delay: 0 },
  { id: 1, left: 32, duration: 18, delay: 3 },
  { id: 2, left: 58, duration: 16, delay: 1.5 },
  { id: 3, left: 78, duration: 20, delay: 4.5 },
];

const FloatingBottles: React.FC = () => {
  const [activeFact, setActiveFact] = useState<string | null>(null);

  const handleClick = () => {
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setActiveFact(fact);
  };

  const closeFact = () => setActiveFact(null);

  return (
    <>
      <div className="floating-bottles-container" aria-hidden={false}>
        {bottles.map((bottle) => (
          <button
            key={bottle.id}
            className="floating-bottle"
            style={{
              left: `${bottle.left}%`,
              animationDuration: `${bottle.duration}s`,
              animationDelay: `${bottle.delay}s`,
            }}
            onClick={handleClick}
            aria-label="Pop a message bottle"
          >
            💌
          </button>
        ))}
      </div>

      {activeFact && (
        <div className="letter-overlay" onClick={closeFact}>
          <div className="bottle-fact-container" onClick={(e) => e.stopPropagation()}>
            <button className="letter-close" onClick={closeFact}>×</button>
            <div className="bottle-fact-emoji">💌</div>
            <p className="bottle-fact-text">{activeFact}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingBottles;
