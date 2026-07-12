'use client';

import Link from 'next/link';

/**
 * LockedBanner — Phase-aware feature lock notice
 * Props:
 *   title        — short lock label  e.g. "Coming Soon"
 *   message      — main description
 *   unlockLabel  — condition chip text  e.g. "Unlocks Sep 30, 2026"
 *   unlockColor  — optional CSS color for the chip (default saffron)
 *   ctaText      — optional CTA button label
 *   ctaHref      — optional CTA link
 */
export default function LockedBanner({
  title = 'Coming Soon',
  message,
  unlockLabel,
  unlockColor = 'var(--saffron)',
  ctaText,
  ctaHref,
}) {
  return (
    <div style={{
      position: 'relative',
      margin: '0 0 var(--space-2xl)',
      padding: 'var(--space-xl) var(--space-2xl)',
      background: 'linear-gradient(135deg, rgba(255,107,26,0.08) 0%, rgba(0,212,184,0.05) 100%)',
      border: '1px solid rgba(255,107,26,0.2)',
      borderRadius: 'var(--radius-lg)',
      backdropFilter: 'blur(12px)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-lg)',
      flexWrap: 'wrap',
    }}>
      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '-60px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255,107,26,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Lock icon */}
      <div style={{
        flexShrink: 0,
        width: '56px',
        height: '56px',
        background: 'rgba(255,107,26,0.1)',
        border: '1px solid rgba(255,107,26,0.25)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '6px',
          flexWrap: 'wrap',
        }}>
          <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{title}</h4>
          {unlockLabel && (
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: unlockColor,
              background: `color-mix(in srgb, ${unlockColor} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${unlockColor} 30%, transparent)`,
              borderRadius: '6px',
              padding: '2px 10px',
            }}>{unlockLabel}</span>
          )}
        </div>
        {message && (
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {message}
          </p>
        )}
      </div>

      {/* CTA */}
      {ctaText && ctaHref && (
        <Link href={ctaHref} className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
          {ctaText}
        </Link>
      )}
    </div>
  );
}
