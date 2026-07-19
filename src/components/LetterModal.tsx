import React, { useState } from 'react';

interface LetterModalProps {
  onClose: () => void;
}

const pages = [
  {
    mood: 'sentimental',
    title: 'Hey Jayapriya,',
    body: `On this very special day, I wanted to take a moment to celebrate not just your birthday, but the incredible person you are. Your presence in this world brings so much joy, laughter, and warmth to everyone around you.`,
    doodle: '💫',
  },
  {
    mood: 'funny',
    title: "Also... let's be real,",
    body: `You're officially old enough that I can start saying "back in our day" and mean it. Kidding — mostly. But seriously, thanks for tolerating my terrible jokes for this long. That's real friendship right there.`,
    doodle: '😂',
  },
  {
    mood: 'sentimental',
    title: 'Your kindness,',
    body: `Your spirit and your amazing personality make you truly one of a kind. Thank you for being such a wonderful friend and for bringing so much positivity into the lives of everyone who knows you.`,
    doodle: '💗',
  },
  {
    mood: 'future',
    title: 'Looking ahead,',
    body: `May this birthday be the beginning of your best year yet, filled with love, success, and countless reasons to smile. Here's to celebrating you today and always!`,
    doodle: '✨',
  },
  {
    mood: 'closing',
    title: 'One more thing...',
    body: `Wishing you the happiest of birthdays and a year ahead that's as amazing as you are! 🎉 Once again HAPPPPYY B'DAY GOATEHHHH...🐐`,
    doodle: '🎂',
  },
];

const LetterModal: React.FC<LetterModalProps> = ({ onClose }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const isLastPage = pageIndex === pages.length - 1;
  const isFirstPage = pageIndex === 0;
  const current = pages[pageIndex];

  const goNext = () => {
    if (!isLastPage) setPageIndex((p) => p + 1);
  };

  const goPrev = () => {
    if (!isFirstPage) setPageIndex((p) => p - 1);
  };

  return (
    <div className="letter-overlay" onClick={onClose}>
      <div className="letter-container" onClick={(e) => e.stopPropagation()}>
        <div className="letter-header">
          <div className="letter-decoration">✉️</div>
          <button className="letter-close" onClick={onClose}>×</button>
          <h2 className="letter-title">A Special Message for You</h2>
        </div>

        <div className="letter-page-doodle">{current.doodle}</div>

        <div className="letter-content" key={pageIndex}>
          <h3>{current.title}</h3>
          <p>{current.body}</p>

          {isLastPage && (
            <div className="letter-signature">
              With best wishes,<br />
              Your Friend ❤️
            </div>
          )}
        </div>

        <div className="letter-nav">
          <button
            className="letter-nav-btn"
            onClick={goPrev}
            disabled={isFirstPage}
          >
            ← Back
          </button>

          <div className="letter-page-dots">
            {pages.map((_, i) => (
              <span
                key={i}
                className={`letter-dot ${i === pageIndex ? 'letter-dot-active' : ''}`}
              />
            ))}
          </div>

          {isLastPage ? (
            <button className="letter-nav-btn letter-nav-btn-primary" onClick={onClose}>
              Close ❤️
            </button>
          ) : (
            <button className="letter-nav-btn letter-nav-btn-primary" onClick={goNext}>
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LetterModal;
