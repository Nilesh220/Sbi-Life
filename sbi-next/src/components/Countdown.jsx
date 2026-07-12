'use client';

import { useState, useEffect } from 'react';

export default function Countdown({ targetDate, id }) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown" id={id}>
      <div className="countdown__item">
        <span className="countdown__number">{String(time.days).padStart(2, '0')}</span>
        <span className="countdown__label">Days</span>
      </div>
      <div className="countdown__sep">:</div>
      <div className="countdown__item">
        <span className="countdown__number">{String(time.hours).padStart(2, '0')}</span>
        <span className="countdown__label">Hours</span>
      </div>
      <div className="countdown__sep">:</div>
      <div className="countdown__item">
        <span className="countdown__number">{String(time.mins).padStart(2, '0')}</span>
        <span className="countdown__label">Mins</span>
      </div>
      <div className="countdown__sep">:</div>
      <div className="countdown__item">
        <span className="countdown__number">{String(time.secs).padStart(2, '0')}</span>
        <span className="countdown__label">Secs</span>
      </div>
    </div>
  );
}
