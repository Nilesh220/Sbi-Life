'use client';

import { useRef } from 'react';
import { useAnimateCounter } from '@/hooks/useGSAP';

export default function CounterCard({ target, suffix = '', label, gradient = 'text-gradient-saffron' }) {
  const ref = useRef(null);
  useAnimateCounter(ref, target, 2.2, suffix);

  return (
    <div className="stat-card">
      <div className={`stat-card__number ${gradient}`} ref={ref}>0</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}
