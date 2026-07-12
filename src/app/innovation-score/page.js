'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IdeationXData } from '@/lib/data';
import RevealOnScroll from '@/components/RevealOnScroll';
import XpIcon from '@/components/XpIcon';
import LockedBanner from '@/components/LockedBanner';

export default function InnovationScorePage() {
  const { badges } = IdeationXData;
  const [xp, setXp] = useState(450);
  const targetXp = 500;

  const activities = [
    { type: 'done', icon: 'check', title: 'Completed: DIVE Framework Module', date: 'Today · 9:42 AM', xp: '+200 XP' },
    { type: 'comment', icon: 'chat', title: 'Posted in Community', date: 'Yesterday · 3:15 PM', xp: '+10 XP' },
    { type: 'challenge', icon: 'bolt', title: 'Weekly Challenge Submission — Week 7', date: 'Oct 12 · 11:00 PM', xp: '+50 XP' },
    { type: 'done', icon: 'check', title: 'Completed: Problem Identification Module', date: 'Oct 10 · 2:30 PM', xp: '+100 XP' },
    { type: 'profile', icon: 'profile', title: 'Profile Setup Complete', date: 'Sep 5 · Registration', xp: '+50 XP' },
  ];

  const waysToEarn = [
    { icon: 'book', range: '100–200 XP', title: 'Complete Learning Modules', desc: 'Each module awards XP on completion. Bonus XP for quiz scores.' },
    { icon: 'bolt', range: '50 XP / week', title: 'Weekly Bharat Challenge', desc: 'Submit every week to earn XP and maintain your streak.' },
    { icon: 'chat', range: '10–25 XP', title: 'Community Engagement', desc: 'Post, reply, and get upvotes in the community discussion board.' },
    { icon: 'mic', range: '75 XP', title: 'Attend Mentor Sessions', desc: 'RSVP and attend live sessions. Bonus for submitting questions.' },
    { icon: 'document', range: '200 XP', title: 'Submit Your Competition Entry', desc: 'Upload your video pitch and deck before the deadline.' },
    { icon: 'trophy', range: '500+ XP', title: 'Competition Milestones', desc: 'Bonus XP for advancing to National Qualifiers, Semi-Finals, and Finale.' },
  ];

  const unlocks = [
    { status: 'done', lock: 'check', icon: 'graduation', threshold: '100 XP', name: 'Learner Certificate', desc: 'Digital certificate of participation — shareable on LinkedIn', style: { borderColor: 'rgba(0,212,184,0.3)' } },
    { status: 'upcoming', lock: 'clock', icon: 'mic', threshold: '500 XP', name: 'Mentor Office Hours', desc: 'Book 1:1 slots with IdeationX mentors', style: {} },
    { status: 'locked', lock: 'lock', icon: 'bolt', threshold: '750 XP', name: 'Early Submission Slot', desc: 'Priority review queue for your B School evaluation', style: { opacity: 0.5 } },
    { status: 'locked', lock: 'lock', icon: 'medal', threshold: '1000 XP', name: 'Top Innovator Badge', desc: 'Exclusive badge + SBI Life innovation alumni network access', style: { opacity: 0.5 } },
  ];

  return (
    <>


      <section style={{ padding: '140px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb--gold" style={{ width: '400px', height: '400px', top: '-100px', right: '-50px', opacity: 0.15 }}></div>
        <div className="container">
          <LockedBanner
            title="Innovation Score — Launching Post Submission"
            message="Your XP dashboard, badges, and leaderboard ranking activate after the submission deadline. Right now, focus on building the strongest possible entry."
            unlockLabel="Activates Oct 2026"
            unlockColor="var(--gold)"
            ctaText="Register First →"
            ctaHref="/register"
          />
          <RevealOnScroll>
            <div className="tag tag--gold" style={{ marginBottom: 'var(--space-lg)' }}>Gamification · XP System</div>
            <h1>Innovation <span className="text-gradient-gold">Score</span></h1>
            <p style={{ maxWidth: '600px', marginTop: 'var(--space-md)', fontSize: '1.05rem' }}>
              Every action you take on IdeationX earns XP. Learn, compete, engage, and climb the leaderboard. Your score unlocks exclusive access to mentors, early rounds, and certificates.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="container">
        <div className="score-layout">
          {/* Left: Profile Card */}
          <div className="score-profile">
            <RevealOnScroll>
              <div className="score-main-card">
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--grad-saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem', color: '#fff', margin: '0 auto var(--space-md)', border: '3px solid var(--saffron)', boxShadow: '0 0 20px var(--saffron-glow)' }}>
                  AK
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', marginBottom: '2px' }}>Aisha Khan</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 'var(--space-xl)' }}>FMS Delhi</div>

                <div className="score-ring-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--saffron)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--saffron)' }}>{xp}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP Score</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)', padding: 'var(--space-lg)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--teal)' }}>5</div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Badges</div></div>
                  <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--saffron)' }}>7</div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Streak</div></div>
                  <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--gold)' }}>#142</div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Rank</div></div>
                </div>

                <div style={{ marginTop: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Next unlock at 500 XP</span>
                    <span style={{ color: 'var(--saffron)', fontWeight: 700 }}>{xp} / {targetXp}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar__fill" style={{ width: `${(xp/targetXp)*100}%` }}></div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>50 XP to unlock Mentor Office Hours</div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Badge Wall */}
            <RevealOnScroll delay={0.1}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)', marginTop: 'var(--space-lg)' }}>
                <h5 style={{ marginBottom: 'var(--space-md)' }}>Your Badges</h5>
                <div className="badges-grid">
                  {badges.map(b => (
                    <div 
                      key={b.id} 
                      className={`badge ${b.earned ? 'badge--earned' : 'badge--locked'}`} 
                      title={`${b.name}: ${b.desc}`}
                      style={{ background: 'var(--bg-elevated)', opacity: b.earned ? 1 : 0.25, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <XpIcon name={b.icon} size={20} color={b.earned ? 'var(--saffron)' : 'var(--text-muted)'} />
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Main Content */}
          <div>
            <RevealOnScroll>
              <div className="section-header">
                <div className="eyebrow">Your Activity</div>
                <h2>Recent XP Earned</h2>
              </div>
            </RevealOnScroll>

            <div className="activities-list" style={{ marginTop: 'var(--space-xl)' }}>
              {activities.map((a, idx) => (
                <RevealOnScroll key={a.title} delay={idx * 0.05}>
                  <div className="activity-item">
                    <div className="activity-icon" style={{ background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <XpIcon name={a.icon} size={18} color="var(--teal)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{a.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{a.date}</div>
                    </div>
                    <div className="activity-xp">{a.xp}</div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* How to Earn */}
            <div className="section-header" style={{ marginTop: 'var(--space-3xl)' }}>
              <RevealOnScroll>
                <div className="eyebrow">Earn More XP</div>
                <h2>How to Boost Your Score</h2>
              </RevealOnScroll>
            </div>

            <div className="how-to-earn-grid">
              {waysToEarn.map((w, idx) => (
                <RevealOnScroll key={w.title} delay={idx * 0.05}>
                  <div className="earn-card">
                    <div className="earn-card__icon" style={{ marginBottom: 'var(--space-sm)' }}>
                      <XpIcon name={w.icon} size={28} color="var(--saffron)" />
                    </div>
                    <div className="earn-card__xp">{w.range}</div>
                    <h5 style={{ marginTop: '4px' }}>{w.title}</h5>
                    <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>{w.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Unlocks */}
            <div className="section-header" style={{ marginTop: 'var(--space-3xl)' }}>
              <RevealOnScroll>
                <div className="eyebrow">XP Unlocks</div>
                <h2>What Your Score Unlocks</h2>
              </RevealOnScroll>
            </div>

            <div className="unlocks-grid">
              {unlocks.map((u, idx) => (
                <RevealOnScroll key={u.name} delay={idx * 0.05}>
                  <div className="unlock-card" style={u.style}>
                    <div className="unlock-card__lock" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <XpIcon name={u.lock} size={16} color={u.status === 'done' ? 'var(--teal)' : u.status === 'upcoming' ? 'var(--gold)' : 'var(--text-muted)'} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-sm)' }}>
                      <XpIcon name={u.icon} size={36} color="var(--gold)" />
                    </div>
                    <div className="unlock-card__threshold">{u.threshold}</div>
                    <div className="unlock-card__name">{u.name}</div>
                    <div className="unlock-card__desc">{u.desc}</div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
