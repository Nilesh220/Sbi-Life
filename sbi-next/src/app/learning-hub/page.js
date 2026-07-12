'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IdeationXData } from '@/lib/data';
import RevealOnScroll from '@/components/RevealOnScroll';
import XpIcon from '@/components/XpIcon';

export default function LearningHubPage() {
  const { modules, badges } = IdeationXData;
  const [xp, setXp] = useState(450);
  const maxXP = 1030;

  return (
    <>


      <section style={{ padding: '140px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb--saffron" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', opacity: 0.2 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--saffron" style={{ marginBottom: 'var(--space-lg)' }}>8 Modules · Free Access</div>
            <h1>Learning <span className="text-gradient-saffron">Hub</span></h1>
            <p style={{ maxWidth: '600px', marginTop: 'var(--space-md)', fontSize: '1.05rem' }}>
              Master the skills that win. From the DIVE Framework to pitch mastery — 8 expert-designed modules built specifically for IdeationX. Earn XP and badges as you learn.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="container">
        {/* DIVE Banner */}
        <RevealOnScroll>
          <div className="dive-banner">
            <div>
              <div className="tag tag--saffron" style={{ marginBottom: 'var(--space-md)' }}>IdeationX Framework</div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>The <span className="text-gradient-saffron">DIVE</span> Framework</h2>
              <p style={{ marginBottom: 'var(--space-lg)' }}>Developed specifically for IdeationX, DIVE is the structured thinking model used at every campus induction event. Master it to build a stronger, more credible idea.</p>
              <button className="btn btn-primary" onClick={() => alert('DIVE module opening...')}>Start DIVE Module — +200 XP</button>
            </div>
            <div className="dive-steps">
              <div className="dive-step">
                <div className="dive-letter" style={{ background: 'rgba(255,107,26,0.15)', color: 'var(--saffron)' }}>D</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>Discover</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Immerse in Bharat&apos;s real problems. Go beyond data — talk to people, experience the challenge firsthand.</div>
                </div>
              </div>
              <div className="dive-step">
                <div className="dive-letter" style={{ background: 'rgba(200,85,255,0.15)', color: '#C855FF' }}>I</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>Ideate</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Generate bold, unconventional solutions. No idea is too wild. Volume before refinement.</div>
                </div>
              </div>
              <div className="dive-step">
                <div className="dive-letter" style={{ background: 'rgba(0,212,184,0.15)', color: 'var(--teal)' }}>V</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>Validate</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Test your assumptions. Speak to real users. Build prototypes, not just decks.</div>
                </div>
              </div>
              <div className="dive-step">
                <div className="dive-letter" style={{ background: 'rgba(245,200,66,0.15)', color: 'var(--gold)' }}>E</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>Elevate</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sharpen your pitch, build your business case, and present at the level of a startup founder.</div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="learning-layout">
          {/* Left: Modules */}
          <div>
            <RevealOnScroll>
              <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="eyebrow">Your Learning Path</div>
                <h2>8 Modules to Win</h2>
              </div>
            </RevealOnScroll>

            <div className="modules-grid">
              {modules.map((m, idx) => {
                const statusLabel = m.status === 'complete' ? '✅ Complete' : m.status === 'active' ? '▶ In Progress' : '🔒 Locked';
                const statusColor = m.status === 'complete' ? 'var(--teal)' : m.status === 'active' ? 'var(--saffron)' : 'var(--text-muted)';
                const isLocked = m.status === 'locked';

                return (
                  <RevealOnScroll key={m.id} delay={idx * 0.05}>
                    <div 
                      className="module-card" 
                      onClick={() => {
                        if (!isLocked) {
                          alert(`Opening: ${m.title}`);
                        } else {
                          alert('Complete previous modules to unlock this one.');
                        }
                      }}
                      style={{ opacity: isLocked ? 0.55 : 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}
                    >
                      <div className="module-card__header">
                        <div className="module-card__icon" style={{ background: m.bg }}>{m.icon}</div>
                        <div className="module-card__status" style={{ color: statusColor }}>{statusLabel}</div>
                      </div>
                      <div className="module-card__title">{m.title}</div>
                      <div className="module-card__desc">{m.desc}</div>
                      <div className="module-card__footer">
                        <div className="module-card__duration">⏱ {m.duration}</div>
                        <span className="tag" style={{ background: m.bg, color: m.color, borderColor: `${m.color}33` }}>+{m.xp} XP</span>
                      </div>
                      {m.status === 'active' && (
                        <div className="progress-bar" style={{ marginTop: 'var(--space-sm)' }}>
                          <div className="progress-bar__fill" style={{ width: '45%', background: m.color }}></div>
                        </div>
                      )}
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="progress-sidebar">
            <RevealOnScroll>
              <div className="profile-card">
                <div className="profile-avatar">AK</div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>Aisha Khan</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>FMS Delhi</div>
                <div className="score-circle-wrapper">
                  <div className="score-circle">
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--saffron)' }}>{xp}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP / {maxXP}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--glass-border)' }}>
                  <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--teal)' }}>5</div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Badges</div></div>
                  <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--gold)' }}>2</div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Modules Done</div></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      7
                      <XpIcon name="fire" size={16} color="var(--saffron)" />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Streak</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Overall Progress */}
            <RevealOnScroll delay={0.1}>
              <div className="badges-panel">
                <h5 style={{ marginBottom: 'var(--space-md)' }}>Overall Progress</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <span>Modules Completed</span>
                    <span style={{ fontWeight: 700, color: 'var(--teal)' }}>2 / 8</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar__fill progress-bar__fill--teal" style={{ width: '25%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginTop: 'var(--space-sm)' }}>
                    <span>XP Earned</span>
                    <span style={{ fontWeight: 700, color: 'var(--saffron)' }}>{xp} / {maxXP} XP</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar__fill" style={{ width: `${(xp/maxXP)*100}%` }}></div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Badges */}
            <RevealOnScroll delay={0.2}>
              <div className="badges-panel">
                <h5 style={{ marginBottom: 'var(--space-sm)' }}>Your Badges</h5>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>5 of 10 earned</p>
                <div className="badges-grid">
                  {badges.slice(0, 10).map((b, bi) => (
                    <div 
                      key={b.id} 
                      className={`badge ${b.earned ? 'badge--earned' : 'badge--locked'}`} 
                      title={b.name} 
                      style={{ background: 'var(--bg-elevated)', opacity: b.earned ? 1 : 0.25, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <XpIcon name={b.icon} size={20} color={b.earned ? 'var(--saffron)' : 'var(--text-muted)'} />
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="badges-panel" style={{ background: 'linear-gradient(135deg,rgba(0,212,184,0.08),rgba(0,181,239,0.04))', borderColor: 'rgba(0,212,184,0.2)' }}>
                <h5 style={{ marginBottom: 'var(--space-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XpIcon name="target" size={18} color="var(--teal)" />
                  Next Unlock
                </h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Complete <strong>Design Thinking</strong> module to unlock <strong>Mentor Office Hours</strong> access and the Research Fundamentals module.</p>
                <button className="btn btn-teal" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-md)' }} onClick={() => alert('Opening Design Thinking module!')}>
                  Continue Learning →
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </>
  );
}
