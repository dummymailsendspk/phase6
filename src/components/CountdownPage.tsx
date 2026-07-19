import React, { useState } from 'react';
import WishPortal from './WishPortal';

interface CountdownPageProps {
  currentTime: Date;
  birthdayDate: Date;
}

const CountdownPage: React.FC<CountdownPageProps> = ({ currentTime, birthdayDate }) => {
  const [showWishPortal, setShowWishPortal] = useState(false);

  const rawDiff = birthdayDate.getTime() - currentTime.getTime();
  const timeDiff = Math.max(0, rawDiff);

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  // Gift box gets more excited the closer we get to zero
  const totalSecondsLeft = Math.max(0, Math.floor(timeDiff / 1000));
  const isVeryClose = totalSecondsLeft <= 60;
  const isClose = totalSecondsLeft <= 3600;

  return (
    <div className="countdown-page">
      <div className="floating-elements">
        <div className="floating-star"></div>
        <div className="floating-star"></div>
        <div className="floating-star"></div>
        <div className="floating-star"></div>
        <div className="floating-star"></div>
      </div>

      <div
        className={`gift-box ${isClose ? 'gift-box-shake' : 'gift-box-idle'} ${
          isVeryClose ? 'gift-box-glow' : ''
        }`}
        aria-hidden="true"
      >
        <div className="gift-box-lid"></div>
        <div className="gift-box-body"></div>
        <div className="gift-box-ribbon-v"></div>
        <div className="gift-box-ribbon-h"></div>
        <div className="gift-box-bow">🎀</div>
      </div>

      <div className="countdown-container">
        <h1 className="countdown-title">
          Jayapriya's Birthday Countdown
        </h1>
        
        <div className="countdown-display">
          <div className="time-block">
            <span className="time-number">{formatTime(days)}</span>
            <span className="time-label">Days</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-number">{formatTime(hours)}</span>
            <span className="time-label">Hours</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-number">{formatTime(minutes)}</span>
            <span className="time-label">Minutes</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-number">{formatTime(seconds)}</span>
            <span className="time-label">Seconds</span>
          </div>
        </div>

        <p className="countdown-text">
          {days > 0 && `${days} days, `}
          {hours} hours, {minutes} minutes and {seconds} seconds to go for your special day!
        </p>

        <div className="excitement-text">
          <p>Get ready for something amazing! 🎈</p>
        </div>

        <button className="leave-wish-btn" onClick={() => setShowWishPortal(true)}>
          💌 Leave Your Birthday Wish
        </button>
      </div>

      {showWishPortal && <WishPortal onClose={() => setShowWishPortal(false)} />}
    </div>
  );
};

export default CountdownPage;