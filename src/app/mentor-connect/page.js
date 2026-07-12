'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IdeationXData } from '@/lib/data';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function MentorConnectPage() {
  const { mentors } = IdeationXData;
  const [xp, setXp] = useState(450);
  const targetXp = 500;

  const handleRSVP = (name) => {
    alert(`RSVP confirmed for ${name}! +75 XP on attendance 🎉`);
  };

  const handleWatchRecording = (title) => {
    alert(`Opening recording: ${title}`);
  };

  const colors = [
    'var(--grad-saffron)', 
    'var(--grad-teal)', 
    'linear-gradient(135deg,#C855FF,#7800C8)', 
    'var(--grad-gold)', 
    'linear-gradient(135deg,#00B5EF,#292075)'
  ];

  return (
    <>


      <section style={{ padding: '140px 0 40px', position: 'relative' }}>
        <div className="orb orb--teal" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', opacity: 0.2 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--teal" style={{ marginBottom: 'var(--space-lg)' }}>Live Sessions · AMA Archive · Office Hours</div>
            <h1>Mentor <span className="text-gradient-teal">Connect</span></h1>
            <p style={{ maxWidth: '600px', marginTop: 'var(--space-md)', fontSize: '1.05rem' }}>
              Industry leaders from SBI Life, McKinsey, InsurTech, and beyond. Monthly live sessions, AMA threads, and 1:1 office hours (unlocked at 500 XP).
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--space-xl) 0 var(--space-3xl)' }}>
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <div className="eyebrow">Upcoming Sessions</div>
              <h2>Live with the Best</h2>
              <p>RSVP to reserve your spot. Earn +75 XP for attending.</p>
            </div>
          </RevealOnScroll>

          <div className="mentors-grid">
            {mentors.map((m, i) => (
              <RevealOnScroll key={m.name} delay={i * 0.05}>
                <div className="mentor-full-card">
                  <div className="mentor-avatar-lg" style={{ background: colors[i % colors.length] }}>{m.avatar}</div>
                  <div className="mentor-info">
                    <div className="name">{m.name}</div>
                    <div className="role">{m.role}</div>
                    <div className="company">{m.company}</div>
                    <div className="mentor-session">
                      <div className="mentor-session__topic">&quot;{m.topic}&quot;</div>
                      <div className="mentor-session__date">📅 {m.session}</div>
                    </div>
                    <button className="btn btn-teal btn-sm" style={{ marginTop: 'var(--space-md)' }} onClick={() => handleRSVP(m.name)}>
                      RSVP — +75 XP
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-deep)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <div className="eyebrow">AMA Archive</div>
              <h2>Past Sessions</h2>
              <p>Missed a session? Catch up with the full recording and Q&A thread.</p>
            </div>
          </RevealOnScroll>

          <div className="ama-grid">
            <RevealOnScroll delay={0.05}>
              <div className="ama-card">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-sm)' }}>Sep 15, 2026</div>
                <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-sm)' }}>Building for Bharat: Why Insurance is the Next Frontier</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>Ravi Krishnamurthy · SBI Life Insurance</p>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleWatchRecording('Building for Bharat')}>▶ Watch Recording</button>
                  <span className="tag tag--muted">847 attendees</span>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="ama-card">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-sm)' }}>Sep 2, 2026</div>
                <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-sm)' }}>Cracking the Last-Mile Distribution Problem</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>Priya Shankar · McKinsey & Co.</p>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleWatchRecording('Last-Mile Distribution')}>▶ Watch Recording</button>
                  <span className="tag tag--muted">1,234 attendees</span>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <div className="ama-card">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-sm)' }}>Aug 18, 2026</div>
                <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-sm)' }}>InsurTech: What Students Get Wrong (And Right)</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>Arjun Mehta · PolicyBazaar</p>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleWatchRecording('InsurTech')}>▶ Watch Recording</button>
                  <span className="tag tag--muted">2,341 attendees</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <RevealOnScroll>
            <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
              <div className="tag tag--gold" style={{ margin: '0 auto var(--space-lg)', display: 'inline-flex' }}>🔒 Unlocks at 500 XP</div>
              <h2>1:1 Mentor Office Hours</h2>
              <p style={{ marginTop: 'var(--space-md)' }}>Reach 500 XP on your Innovation Score to unlock direct 30-minute office hours with IdeationX mentors. Get personalised feedback on your idea, pitch, and business model.</p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', marginTop: 'var(--space-xl)', flexWrap: 'wrap' }}>
                <Link href="/innovation-score" className="btn btn-primary btn-lg">Check My XP Score →</Link>
                <Link href="/learning-hub" className="btn btn-secondary btn-lg">Earn More XP</Link>
              </div>
              <div style={{ marginTop: 'var(--space-xl)', padding: 'var(--space-lg)', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', justifycontent: 'space-between', marginBottom: 'var(--space-sm)', fontSize: '0.82rem' }}>
                  <span>Your XP</span>
                  <span style={{ fontWeight: 700, color: 'var(--saffron)' }}>{xp} / {targetXp}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar__fill" style={{ width: `${(xp/targetXp)*100}%` }}></div>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>Complete the Design Thinking module (+150 XP) to unlock Office Hours</div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
