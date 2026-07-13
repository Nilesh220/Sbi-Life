'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Icon from '@/components/Icon';

export default function ThemeCard({ theme }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const card = ref.current;

    const onEnter = () => {
      gsap.to(card, {
        y: -5,
        scale: 1.012,
        borderColor: `${theme.glow}`,
        boxShadow: `0 12px 30px -10px ${theme.glow}`,
        duration: 0.35,
        ease: 'power2.out'
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        boxShadow: 'none',
        duration: 0.35,
        ease: 'power2.out',
        clearProps: 'borderColor,boxShadow'
      });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [theme.glow]);

  return (
    <div ref={ref} className="theme-card" style={{ background: theme.gradient, borderColor: `${theme.color}22` }}>
      <div className="theme-card__icon" style={{ background: `${theme.color}18` }}><Icon name={theme.icon} size={28} color={theme.color} /></div>
      <h4 className="theme-card__title" style={{ color: theme.color }}>{theme.name}</h4>
      <p className="theme-card__hook">{theme.hook}</p>
      <div className="theme-card__entries" style={{ color: theme.color }}>
        {theme.entries.toLocaleString()} entries
      </div>
    </div>
  );
}

