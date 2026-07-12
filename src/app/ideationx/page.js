'use client';

import { useState } from 'react';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-item--active' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-question">
        {question}
        <div className="faq-icon" style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s' }}>+</div>
      </div>
      <div className="faq-answer" style={{ maxHeight: open ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-out' }}>
        <div className="faq-answer__inner" style={{ padding: 'var(--space-md) 0' }}>
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function IdeationXPage() {
  const keyDates = [
    { label: 'Registration Deadline', date: 'Sep 30', type: 'saffron' },
    { label: 'B School Eval Starts', date: 'Oct 15', type: 'muted' },
    { label: 'Top-3 Per B School', date: 'Nov 1', type: 'muted' },
    { label: 'Qualifier Results', date: 'Nov 15', type: 'muted' },
    { label: 'Semi-Finals (Virtual)', date: 'Dec 10', type: 'muted' },
    { label: 'Grand Finale', date: 'Jan 2027', type: 'gold' },
  ];

  const quickStats = [
    { num: '200', label: 'B Schools', color: 'var(--saffron)' },
    { num: '3', label: 'Per Team', color: 'var(--teal)' },
    { num: '600', label: 'Qualifiers', color: 'var(--gold)' },
    { num: '10', label: 'Finalists', color: 'var(--sbi-cerulean)' },
  ];

  const eligibility = [
    { icon: '🏫', title: 'Partner B Schools Only', desc: 'Open to students enrolled in any postgraduate course at the 200 official IdeationX 2026 partner B Schools across India.' },
    { icon: '👥', title: 'Teams of 3 Members', desc: 'All entries must be submitted as teams of exactly 3 students. Cross-specialisation and cross-year teams are permitted. Cross-B School teams are not eligible.' },
    { icon: '🎯', title: '250 Entries Per B School', desc: 'Each partner B School can submit a maximum of 250 team entries. Once the B School cap is reached, the submission portal locks for that B School.' },
    { icon: '📋', title: 'One Theme Per Entry', desc: 'Each team must select exactly one of the 5 challenge themes. A student cannot be part of more than one team. Original ideas only.' },
  ];

  return (
    <>


      <section className="page-hero">
        <div className="orb orb--saffron" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', opacity: 0.3 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--saffron" style={{ marginBottom: 'var(--space-lg)' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--saffron)', borderRadius: '50%' }}></span> Edition 3 — 2026
            </div>
            <h1>The <span class="text-gradient-saffron">Competition</span></h1>
            <p style={{ maxWidth: '600px', fontSize: '1.1rem', marginTop: 'var(--space-md)' }}>
              Everything you need to know — timeline, phases, eligibility, prizes, jury, and FAQs. Your complete guide to IdeationX 2026.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)', flexWrap: 'wrap' }}>
              <Link href="/register" className="btn btn-primary btn-lg">Register Your Team</Link>
              <a href="#timeline" className="btn btn-secondary btn-lg">See Timeline</a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Timeline + Sidebar */}
      <section className="timeline-section" id="timeline">
        <div className="container">
          <div className="ideationx-grid">
            <div>
              <RevealOnScroll>
                <div className="section-header">
                  <div className="eyebrow">Phase Roadmap</div>
                  <h2>How IdeationX <br />Works</h2>
                </div>
              </RevealOnScroll>

              <div className="timeline reveal reveal--delay-1">
                <div className="timeline-item timeline-item--done">
                  <div className="timeline-item__date">August 2026 · Phase 1</div>
                  <h4 className="timeline-item__title">Campus Induction</h4>
                  <p className="timeline-item__desc">SBI Life Insurance officials visit 200 partner B Schools to conduct Induction Sessions introducing the competition, themes, evaluation criteria, and guidelines.</p>
                </div>
                <div className="timeline-item timeline-item--active">
                  <div className="timeline-item__date">September 2026 · Phase 2 — ACTIVE NOW</div>
                  <h4 className="timeline-item__title">Campus Participation & Registration</h4>
                  <p className="timeline-item__desc">Participants choose one of the five challenge themes and register as teams of 3. Target scale: 300K Student Reach across 200 B Schools, yielding 50,000+ entries.</p>
                  <span className="tag tag--saffron" style={{ marginTop: 'var(--space-sm)' }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--saffron)', borderRadius: '50%' }}></span> You are here
                  </span>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item__date">October 2026 · Phase 3</div>
                  <h4 className="timeline-item__title">B School Level Evaluation</h4>
                  <p className="timeline-item__desc">Faculty panels at each B School evaluate submissions based on Creativity, Feasibility, Research, Social Impact, and Presentation. Top 3 teams per B School advance (600 Qualifiers).</p>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item__date">November 2026 · Phase 4</div>
                  <h4 className="timeline-item__title">National Qualifier Round</h4>
                  <p className="timeline-item__desc">The 600 B School Winners&apos; submissions are evaluated by the central SBI Life Jury Panel. Top 30 entries advance to the Semi-Finals.</p>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item__date">December 2026 · Phase 5</div>
                  <h4 className="timeline-item__title">Semi-Finals (Virtual)</h4>
                  <p className="timeline-item__desc">The Top 30 teams present before the Jury, focusing on depth of research, implementation, innovation, scalability, and Q&A. Top 10 qualify for the Grand Finale.</p>
                </div>
                <div className="timeline-item" style={{ opacity: 0.5 }}>
                  <div className="timeline-item__date">January 2027 · Phase 6</div>
                  <h4 className="timeline-item__title">Grand Finale 🔒 Coming Soon</h4>
                  <p className="timeline-item__desc">The Top 10 finalists present before the SBI Life Leadership. Winners receive cash prizes, PPI offers, internships, and mentorship.</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="sticky-sidebar">
              <RevealOnScroll>
                <div className="key-date-card">
                  <h5 style={{ marginBottom: 'var(--space-md)' }}>⏱ Key Dates</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {keyDates.map(kd => (
                      <div key={kd.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--glass-border)' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{kd.label}</span>
                        <span className={`tag tag--${kd.type}`}>{kd.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <div className="key-date-card">
                  <h5 style={{ marginBottom: 'var(--space-md)' }}>📏 Quick Stats</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                    {quickStats.map(qs => (
                      <div key={qs.label} style={{ textAlign: 'center', padding: 'var(--space-md)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: qs.color }}>{qs.num}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{qs.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div className="key-date-card" style={{ background: 'linear-gradient(135deg,rgba(255,107,26,0.1),rgba(0,212,184,0.05))', borderColor: 'rgba(255,107,26,0.2)' }}>
                  <h5 style={{ marginBottom: 'var(--space-sm)' }}>📥 Download</h5>
                  <p style={{ fontSize: '0.85rem', marginBottom: 'var(--space-md)' }}>Get the complete competition structure as a one-pager PDF.</p>
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('PDF download will be available soon!')}>
                    Download One-Pager PDF
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-deep)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <RevealOnScroll>
            <div className="section-header text-center">
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Who Can Apply</div>
              <h2>Eligibility & Rules</h2>
            </div>
          </RevealOnScroll>
          <div className="eligibility-grid">
            {eligibility.map((elig, idx) => (
              <RevealOnScroll key={elig.title} delay={idx * 0.05}>
                <div className="elig-card">
                  <div className="elig-card__icon">{elig.icon}</div>
                  <h4>{elig.title}</h4>
                  <p style={{ fontSize: '0.88rem', marginTop: 'var(--space-sm)' }}>{elig.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <RevealOnScroll>
            <div className="section-header text-center">
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Rewards</div>
              <h2>Win More Than Just <br /><span className="text-gradient-gold">a Trophy</span></h2>
            </div>
          </RevealOnScroll>
          <div className="prize-grid">
            <RevealOnScroll delay={0.05}>
              <div className="prize-card">
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>🏆</div>
                <div className="prize-card__amount text-gradient-gold">₹10L</div>
                <div className="prize-card__label">Cash Prize Pool<br />National Winner</div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="prize-card">
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>💼</div>
                <div className="prize-card__amount text-gradient-teal">PPI</div>
                <div className="prize-card__label">Pre-Placement Interview<br />Offers for Finalists</div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <div className="prize-card">
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>📺</div>
                <div className="prize-card__amount text-gradient-saffron">CNBC</div>
                <div className="prize-card__label">Dedicated Episode<br />Finale Coverage</div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Jury */}
      <section id="jury" style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-deep)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <RevealOnScroll>
            <div className="section-header text-center">
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Who&apos;s Judging</div>
              <h2>The Jury Panel</h2>
              <p>Industry leaders, SBI Life leadership, and innovation experts who will evaluate your ideas.</p>
            </div>
          </RevealOnScroll>
          <div className="jury-grid">
            <RevealOnScroll delay={0.05}>
              <div className="jury-card">
                <div className="jury-avatar" style={{ background: 'var(--grad-saffron)' }}>RK</div>
                <div className="jury-name">Ravi Krishnamurthy</div>
                <div className="jury-role">Chief Innovation Officer</div>
                <div className="jury-company">SBI Life Insurance</div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="jury-card">
                <div className="jury-avatar" style={{ background: 'var(--grad-teal)' }}>PS</div>
                <div className="jury-name">Priya Shankar</div>
                <div className="jury-role">Partner</div>
                <div className="jury-company">McKinsey & Co.</div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <div className="jury-card">
                <div className="jury-avatar" style={{ background: 'linear-gradient(135deg,#C855FF,#7800C8)' }}>AM</div>
                <div className="jury-name">Arjun Mehta</div>
                <div className="jury-role">Co-Founder</div>
                <div className="jury-company">PolicyBazaar</div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="jury-card">
                <div className="jury-avatar" style={{ background: 'var(--grad-gold)' }}>SR</div>
                <div className="jury-name">Sunitha Rao</div>
                <div className="jury-role">VP Digital Products</div>
                <div className="jury-company">SBI Life Insurance</div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header text-center">
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Got Questions?</div>
              <h2>Frequently Asked</h2>
            </div>
          </RevealOnScroll>
          <div className="faq-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <FAQItem question="Can a student from a non-MBA course participate?" answer="Yes! IdeationX 2026 is open to students of all postgraduate courses at the 200 partner B Schools. Cross-specialisation teams are encouraged." />
              <FAQItem question="What is the submission format?" answer="Teams submit a 3-minute video pitch + an 8-10 slide business plan deck. Both must be uploaded before the B School's submission deadline." />
              <FAQItem question="Can I change my team members after registration?" answer="Team changes are allowed up to 7 days after registration closes. Contact support@ideationx.sbilife.co.in for change requests." />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <FAQItem question="How is B School-level evaluation scored?" answer="Faculty panels use a standardised rubric: Problem Clarity (25%), Originality of Solution (25%), Bharat Relevance (20%), Feasibility (20%), and Presentation Quality (10%)." />
              <FAQItem question="Is there a registration fee?" answer="No. IdeationX 2026 is completely free for all participating students. SBI Life bears all competition costs." />
              <FAQItem question="How will the Semi-Finals be conducted?" answer="Semi-Finals will be conducted virtually. Presentation schedules and instructions will be communicated directly to the 30 shortlisted teams in November 2026." />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
