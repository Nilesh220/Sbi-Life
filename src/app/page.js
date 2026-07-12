'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IdeationXData } from '@/lib/data';
import RevealOnScroll from '@/components/RevealOnScroll';
import PhaseTracker from '@/components/PhaseTracker';
import Countdown from '@/components/Countdown';
import { useAnimateCounter } from '@/hooks/useGSAP';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function HeroCounter({ target, suffix = '+', label, gradient }) {
  const ref = useRef(null);
  useAnimateCounter(ref, target, 2.2, suffix, true);
  return (
    <div className="hero-stat">
      <span className={`hero-stat__num ${gradient}`} ref={ref}>0{suffix}</span>
      <span className="hero-stat__label">{label}</span>
    </div>
  );
}

function StatCounter({ target, suffix = '', label, gradient, showLive = false }) {
  const ref = useRef(null);
  useAnimateCounter(ref, target, 2.2, suffix);
  return (
    <div className="home-stat-item">
      {showLive ? (
        <div className="live-badge" style={{ marginBottom: '8px' }}>
          <div className="ping-dot"></div>Live
        </div>
      ) : (
        <div style={{ height: '32px', marginBottom: '8px' }}></div>
      )}
      <div className={`home-stat-num ${gradient}`} ref={ref}>0{suffix}</div>
      <div className="home-stat-label">{label}</div>
    </div>
  );
}

const marqueeSchools = [
  "IIM Ahmedabad", "SPJIMR Mumbai", "XLRI Jamshedpur", "FMS Delhi",
  "IIM Bangalore", "TISS Mumbai", "MDI Gurgaon", "Great Lakes Chennai",
  "MICA Ahmedabad", "NMIMS Mumbai", "IIFT Delhi", "SIBM Pune",
  "IMT Ghaziabad", "IIM Kozhikode", "XIME Bangalore"
];

const themeCards = [
  { id: 1, num: '01', icon: '🏪', tag: 'Distribution', tagCls: 'tag tag--saffron', title: 'Kirana to Coverage', hook: '"What if your neighbourhood Kirana became India\'s most trusted Insurance Mitra?"', style: { '--theme-gradient': 'linear-gradient(135deg,rgba(255,107,26,0.2),rgba(255,62,0,0.08))', '--theme-color': '#FF6B1A', '--theme-glow': 'rgba(255,107,26,0.3)' } },
  { id: 2, num: '02', icon: '👩‍💼', tag: 'Women', tagStyle: { background: 'rgba(200,85,255,0.12)', color: '#D480FF', border: '1px solid rgba(200,85,255,0.3)' }, title: 'Women as Wealth Architects', hook: '"Every ASHA worker deserves a financial future as strong as the communities she builds."', style: { '--theme-gradient': 'linear-gradient(135deg,rgba(200,85,255,0.18),rgba(120,0,200,0.06))', '--theme-color': '#C855FF', '--theme-glow': 'rgba(200,85,255,0.3)' } },
  { id: 3, num: '03', icon: '📱', tag: 'GenZ', tagCls: 'tag tag--teal', title: 'GenZ & the Protection Gap', hook: '"Gen Z buys sneakers with EMI. Why not life insurance with a swipe?"', style: { '--theme-gradient': 'linear-gradient(135deg,rgba(0,212,184,0.18),rgba(0,168,232,0.06))', '--theme-color': '#00D4B8', '--theme-glow': 'rgba(0,212,184,0.3)' } },
  { id: 4, num: '04', icon: '🌾', tag: 'Agriculture', tagCls: 'tag tag--gold', title: 'Climate & the Uninsured Farmer', hook: '"When climate destroys a harvest, it also destroys a family\'s future."', style: { '--theme-gradient': 'linear-gradient(135deg,rgba(245,200,66,0.18),rgba(255,138,0,0.06))', '--theme-color': '#F5C842', '--theme-glow': 'rgba(245,200,66,0.3)' } },
  { id: 5, num: '05', icon: '🚗', tag: 'Gig Economy', tagStyle: { background: 'rgba(0,181,239,0.12)', color: '#4DCDFF', border: '1px solid rgba(0,181,239,0.3)' }, title: 'The Invisible Workforce', hook: '"Zomato delivers your dinner. Ola drops you home. Who insures their tomorrow?"', style: { '--theme-gradient': 'linear-gradient(135deg,rgba(0,181,239,0.18),rgba(41,32,117,0.08))', '--theme-color': '#00B5EF', '--theme-glow': 'rgba(0,181,239,0.3)' } },
];

export default function HomePage() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.innerHTML += marqueeRef.current.innerHTML;
    }
  }, []);

  return (
    <>


      <div className="noise-overlay"></div>

      {/* ════ HERO ════ */}
      <section className="hero-home">
        <div className="orb orb--saffron" style={{ width: '500px', height: '500px', top: '-100px', left: '-100px', opacity: 0.4 }}></div>
        <div className="orb orb--teal" style={{ width: '400px', height: '400px', bottom: '-100px', right: '-80px', opacity: 0.35 }}></div>
        <div className="orb orb--cerulean" style={{ width: '300px', height: '300px', top: '40%', right: '30%', opacity: 0.15 }}></div>
        <div className="hero-home__bg-grid"></div>

        <div className="container">
          <div className="hero-home__split">
            <div className="hero-home__content">
              <div className="edition-badge anim-fade-up">
                <div className="ping-dot"></div>
                <span className="edition-badge__year">IDEATIONX 3.0 — 2026</span>
                <span className="edition-badge__sep">|</span>
                <span className="edition-badge__tag">Registration Open</span>
              </div>

              <h1 className="hero__title anim-fade-up delay-100">
                <span className="hero__title-line1">Bharat</span>
                <span className="hero__title-line2">Begins With</span>
                <span className="hero__title-line3">An Idea.</span>
              </h1>

              <p className="hero__subtitle anim-fade-up delay-200">
                Every great nation is built on great ideas. Bharat&apos;s next great idea could come from a student. Life Insurance becomes one of the ways to strengthen Bharat&apos;s future — bringing together 300,000+ student reach from 200 Elite B Schools.
              </p>

              <div className="hero__ctas anim-fade-up delay-300">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Register Your Team
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/themes" className="btn btn-secondary btn-lg">Explore Challenges</Link>
              </div>

              <div className="hero-stats anim-fade-up delay-400">
                <HeroCounter target={200} suffix="+" label="Elite B Schools" gradient="text-gradient-saffron" />
                <div className="hero-stat-divider"></div>
                <HeroCounter target={300000} suffix="+" label="Student Reach" gradient="text-gradient-teal" />
                <div className="hero-stat-divider"></div>
                <HeroCounter target={50000} suffix="+" label="Student Entries" gradient="text-gradient-gold" />
              </div>
            </div>

            <div className="hero-home__visual anim-scale-in delay-300">
              <div className="hero-home__ring-outer">
                <div className="orbit-dot orbit-dot--1"></div>
                <div className="hero-home__ring-inner">
                  <div className="orbit-dot orbit-dot--2"></div>
                  <div className="orbit-dot orbit-dot--3"></div>
                </div>
              </div>
              <div className="hero-home__logo-center">
                <Image src="/assets/Ideation x logo.webp" alt="IdeationX" width={130} height={40} style={{ opacity: 0.9 }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--saffron)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>2026</div>
              </div>
              <div style={{ position: 'absolute', top: '30px', right: '20px' }} className="anim-float">
                <div className="glass-card" style={{ padding: '10px 14px', fontSize: '0.78rem', fontWeight: 700 }}>
                  <span style={{ color: 'var(--gold)' }}>🏆</span> ₹10 Lakh Prize Pool
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '60px', left: '10px' }} className="anim-float delay-300">
                <div className="glass-card" style={{ padding: '10px 14px', fontSize: '0.78rem', fontWeight: 700 }}>
                  <span style={{ color: 'var(--teal)' }}>🎓</span> PPI Offers
                </div>
              </div>
              <div style={{ position: 'absolute', top: '45%', right: '-10px' }} className="anim-float delay-500">
                <div className="glass-card" style={{ padding: '10px 14px', fontSize: '0.78rem', fontWeight: 700 }}>
                  <span style={{ color: 'var(--saffron)' }}>📺</span> CNBC Feature
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ MARQUEE ════ */}
      <div className="marquee-strip">
        <div className="marquee-wrapper">
          <div className="marquee-inner" ref={marqueeRef}>
            {marqueeSchools.map(s => (
              <span key={s} className="marquee-item"><span>{s}</span> <span className="marquee-dot"></span></span>
            ))}
          </div>
        </div>
      </div>

      {/* ════ LIVE STATS ════ */}
      <RevealOnScroll>
        <div className="home-stats">
          <div className="container">
            <div className="home-stats__inner">
              <StatCounter target={200} suffix="+" label="B Schools Onboarded" gradient="text-gradient-saffron" showLive />
              <StatCounter target={300000} suffix="+" label="Student Reach" gradient="text-gradient-teal" />
              <StatCounter target={50000} suffix="+" label="Student Entries" gradient="text-gradient-gold" />
              <StatCounter target={600} label="B School Qualifiers" gradient="" />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* ════ PHASE TRACKER ════ */}
      <section className="phase-section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <div className="eyebrow">Competition Progress</div>
              <h2>Where Are We Now?</h2>
              <p>IdeationX 2026 is live and in progress. Track each phase of the competition.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="phase-tracker-home">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Phase 2 — Campus Registration</h4>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>Registrations and submissions are managed through the microsite. Choose from one of the five challenge themes.</p>
                </div>
                <span className="tag tag--saffron" style={{ flexShrink: 0 }}>
                  <span className="ping-dot" style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--saffron)', borderRadius: '50%' }}></span>
                  Active Now
                </span>
              </div>
              <div className="phase-steps">
                <PhaseTracker />
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'var(--space-2xl)' }}>
              <Countdown targetDate="2026-09-30T23:59:59" id="home-countdown" />
              <p style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-secondary)',
                marginTop: '12px'
              }}>
                Registration Deadline
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ════ CAMPAIGN INSIGHT ════ */}
      <section className="section" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="grid grid--2" style={{ alignItems: 'center', gap: 'var(--space-2xl)' }}>
            <RevealOnScroll>
              <div className="eyebrow">Communication Territory</div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>Bharat Begins<br /><span className="text-gradient-saffron">With An Idea.</span></h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
                Life Insurance isn&apos;t just about protecting lives. It&apos;s about protecting Bharat&apos;s future. Who protects Bharat&apos;s future? Not only soldiers, doctors, or governments... sometimes, it is a student with a powerful idea.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="card" style={{ background: 'var(--bg-elevated)', borderColor: 'rgba(255,107,26,0.2)', boxShadow: '0 0 40px rgba(255,107,26,0.05)' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>🎬 Campaign Film Screenplay Preview</div>
                <h4 style={{ marginBottom: '12px', fontFamily: 'var(--font-display)' }}>&quot;The Faces of Bharat&quot;</h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '16px', fontStyle: 'italic' }}>
                  &quot;A quiet village mandi. A bustling metro station platform. An elderly couple sharing tea. A student reading under a hostel lamp.&quot;
                </p>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid var(--saffron)', borderRadius: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>VOICEOVER:</span>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>
                    &quot;Every change begins with an idea. Every idea begins with someone who chooses to think differently. Because Bharat begins with an idea.&quot;
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ════ CHALLENGE THEMES ════ */}
      <section className="themes-section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header text-center">
              <div className="eyebrow" style={{ justifyContent: 'center' }}>The 5 Challenge Themes</div>
              <h2>Pick Your Bharat Problem.<br />Build Your Solution.</h2>
              <p>Each theme is anchored to a real, unsolved challenge at the intersection of life insurance and Bharat&apos;s social fabric.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="themes-grid">
              {themeCards.map(t => (
                <Link key={t.id} href={`/themes#theme-${t.id}`} className="theme-card tilt-card" style={t.style}>
                  <div className="theme-card__number">{t.num}</div>
                  <div className="theme-card__icon">{t.icon}</div>
                  <div className="theme-card__tag">
                    <span className={t.tagCls || 'tag'} style={t.tagStyle}>{t.tag}</span>
                  </div>
                  <h4 className="theme-card__title">{t.title}</h4>
                  <p className="theme-card__hook">{t.hook}</p>
                  <div className="theme-card__arrow">→</div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
              <Link href="/themes" className="btn btn-secondary btn-lg">Deep Dive Into All 5 Themes →</Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ════ WINNERS QUOTES ════ */}
      <section className="winners-section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <div className="eyebrow">From the Champions</div>
              <h2>What Winners Say</h2>
              <p>Hear from the teams who&apos;ve walked the IdeationX journey before you.</p>
            </div>
          </RevealOnScroll>

          <div className="quotes-grid">
            <RevealOnScroll delay={0.1}>
              <div className="quote-card">
                <p className="quote-card__text">&quot;IdeationX didn&apos;t just give us a platform — it gave us the confidence that a 22-year-old from Bangalore could actually solve a 700-year-old distribution problem in Indian insurance.&quot;</p>
                <div className="quote-card__author">
                  <div className="quote-card__avatar" style={{ background: 'var(--grad-saffron)' }}>AK</div>
                  <div className="quote-card__meta">
                    <span className="quote-card__name">Aryan Kumar</span>
                    <span className="quote-card__college">XIME Bangalore — Team Lead</span>
                  </div>
                  <div className="quote-card__edition">Ed. 1 Winner 🏆</div>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="quote-card">
                <p className="quote-card__text">&quot;The moment our idea was called up at the CNBC finale, we realised — this isn&apos;t a B School competition. This is where you start your career.&quot;</p>
                <div className="quote-card__author">
                  <div className="quote-card__avatar" style={{ background: 'var(--grad-teal)' }}>SP</div>
                  <div className="quote-card__meta">
                    <span className="quote-card__name">Shreya Pillai</span>
                    <span className="quote-card__college">SPJIMR Mumbai — Team Lead</span>
                  </div>
                  <div className="quote-card__edition">Ed. 2 Winner 🏆</div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ════ CTA BANNER ════ */}
      <section className="cta-banner">
        <div className="orb orb--saffron" style={{ width: '400px', height: '400px', top: '-100px', left: '50%', transform: 'translateX(-50%)', opacity: 0.15 }}></div>
        <div className="cta-banner__inner">
          <RevealOnScroll>
            <h2 className="cta-banner__title">Your Idea Could<br /><span className="text-gradient-saffron">Change Bharat.</span></h2>
            <p className="cta-banner__sub">Join 300,000+ students from 200 B Schools building the future of life insurance in India.</p>
            <div className="cta-banner__actions">
              <Link href="/register" className="btn btn-primary btn-lg">Register Now →</Link>
              <Link href="/ideationx" className="btn btn-secondary btn-lg">Learn More</Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
