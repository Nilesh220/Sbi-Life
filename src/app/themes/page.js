'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { IdeationXData } from '@/lib/data';
import RevealOnScroll from '@/components/RevealOnScroll';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default function ThemesPage() {
  const { themes } = IdeationXData;

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, []);

  return (
    <>


      <section className="themes-hero">
        <div className="orb orb--saffron" style={{ width: '500px', height: '500px', top: '-200px', left: '50%', transform: 'translateX(-50%)', opacity: 0.15 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--saffron" style={{ margin: '0 auto var(--space-lg)', display: 'inline-flex' }}>5 Challenges · Choose 1</div>
            <h1>Pick Your Bharat<br /><span className="text-gradient-saffron">Problem.</span></h1>
            <p style={{ maxWidth: '640px', margin: 'var(--space-lg) auto 0', fontSize: '1.1rem' }}>
              Each theme is grounded in a real, unsolved challenge at the intersection of life insurance and Bharat&apos;s social fabric. 120 million farming families. 80 million gig workers. 500 million uninsured youth. The problems are real. Your job is to solve one.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section style={{ padding: '0 0 var(--space-3xl)' }}>
        <div className="container">
          <div className="full-theme-grid">
            {themes.map((t, idx) => {
              const rgb = hexToRgb(t.color);
              const cardGradient = t.gradient.replace('linear-gradient(135deg,', 'linear-gradient(90deg,');

              return (
                <RevealOnScroll key={t.id} delay={idx * 0.05}>
                  <div 
                    id={`theme-${t.id}`} 
                    className="full-theme-card" 
                    style={{ 
                      '--card-color': t.color, 
                      '--card-glow': t.glow, 
                      '--card-gradient': cardGradient 
                    }}
                  >
                    <div className="full-theme-card__accent" style={{ background: cardGradient }}></div>
                    <div className="full-theme-card__number">0{t.id}</div>
                    <div>
                      <div className="full-theme-card__icon">{t.icon}</div>
                      <div style={{ marginBottom: 'var(--space-md)' }}>
                        <span className="tag" style={{ background: `rgba(${rgb},0.12)`, color: t.color, border: `1px solid rgba(${rgb},0.3)` }}>
                          Theme {t.id} of 5
                        </span>
                      </div>
                      <h2 className="full-theme-card__title">{t.name}</h2>
                      <div className="full-theme-card__hook" style={{ borderLeftColor: t.color }}>&quot;{t.hook}&quot;</div>
                      <p className="full-theme-card__brief">{t.brief}</p>
                      <div className="entries-badge">
                        <span style={{ fontSize: '1.2rem' }}>💡</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: t.color }}>
                          {t.entries.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>entries across editions</span>
                        <Link href="/register" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto', background: t.color, boxShadow: `0 4px 16px ${t.glow}` }}>
                          Pick This Theme
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div className="full-theme-card__prompts">
                        <h5>💡 Bharat Blueprint Prompts</h5>
                        {t.prompts.map((p, pi) => (
                          <div className="prompt-item" key={pi}>
                            <span className="prompt-num" style={{ color: t.color }}>0{pi + 1}</span>
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-lg)', background: `rgba(${rgb},0.06)`, border: `1px solid rgba(${rgb},0.15)`, borderRadius: 'var(--radius-md)' }}>
                        <h5 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: t.color, marginBottom: 'var(--space-sm)' }}>Why This Matters</h5>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          This challenge addresses one of the most critical gaps in India&apos;s insurance ecosystem. The winning idea in this theme will have the potential to impact millions of lives.
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-deep)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <RevealOnScroll>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <h2>Ready to Pick Your Theme?</h2>
              <p style={{ marginTop: 'var(--space-md)' }}>Register your team, choose your challenge theme, and start building your solution for Bharat.</p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', marginTop: 'var(--space-xl)', flexWrap: 'wrap' }}>
                <Link href="/register" className="btn btn-primary btn-lg">Register Your Team →</Link>
                <Link href="/resources" className="btn btn-secondary btn-lg">Get Templates</Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
