import { useState, useEffect, useRef } from 'react';
import CountdownPage from './components/CountdownPage';
import CelebrationPage from './components/CelebrationPage';
import PullCordSurprise from './components/surprise/PullCordSurprise';
import './App.css';

const CELEBRANT_NAME = 'Jayapriya';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const birthdayDate = new Date('2026-07-21T00:00:00');

  const [showCelebration, setShowCelebration] = useState(
    new Date() >= birthdayDate
  );
  const [showSurprise, setShowSurprise] = useState(false);
  const hasTriggeredReveal = useRef(showCelebration); // don't re-trigger on reload after the date

  useEffect(() => {
    const checkAndTick = () => {
      const now = new Date();
      setCurrentTime(now);

      if (!hasTriggeredReveal.current && now >= birthdayDate) {
        hasTriggeredReveal.current = true;
        setShowSurprise(true);
      }
    };

    const timer = setInterval(checkAndTick, 1000);

    // Browsers throttle or fully pause setInterval in background tabs
    // (especially on mobile), which is why the countdown used to get
    // "stuck" at 0 until a manual refresh. Force a fresh check whenever
    // the tab regains focus or visibility so the transition always fires.
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        checkAndTick();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);

    // Also check immediately on mount in case the page was opened
    // exactly at/after the birthday moment.
    checkAndTick();

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSurpriseComplete = () => {
    setShowSurprise(false);
    setShowCelebration(true);
  };

  const handleReplaySurprise = () => {
    setShowSurprise(true);
  };

  return (
    <div className="app">
      {showCelebration && (
        <CelebrationPage
          currentTime={currentTime}
          birthdayDate={birthdayDate}
          onReplaySurprise={handleReplaySurprise}
        />
      )}

      {!showCelebration && (
        <CountdownPage currentTime={currentTime} birthdayDate={birthdayDate} />
      )}

      {showSurprise && (
        <PullCordSurprise name={CELEBRANT_NAME} onComplete={handleSurpriseComplete} />
      )}
    </div>
  );
}

export default App;
