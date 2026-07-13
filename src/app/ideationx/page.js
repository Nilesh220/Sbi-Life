'use client';

import { useState } from 'react';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';
import Icon from '@/components/Icon';

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
    { icon: 'school', title: 'Partner B Schools Only', desc: 'Open to students enrolled in any postgraduate course at the 200 official IdeationX 2026 partner B Schools across India.' },
    { icon: 'users', title: 'Teams of 3 Members', desc: 'All entries must be submitted as teams of exactly 3 students. Cross-specialisation and cross-year teams are permitted. Cross-B School teams are not eligible.' },
    { icon: 'target', title: '250 Entries Per B School', desc: 'Each partner B School can submit a maximum of 250 team entries. Once the B School cap is reached, the submission portal locks for that B School.' },
    { icon: 'clipboard', title: 'One Theme Per Entry', desc: 'Each team must select exactly one of the 5 challenge themes. A student cannot be part of more than one team. Original ideas only.' },
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
            <h1>The <span className="text-gradient-saffron">Competition</span></h1>
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
                  <div className="elig-card__icon"><Icon name={elig.icon} size={28} color="var(--saffron)" /></div>
                  <h4>{elig.title}</h4>
                  <p style={{ fontSize: '0.88rem', marginTop: 'var(--space-sm)' }}>{elig.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes - Detailed Breakdown */}
      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <RevealOnScroll>
            <div className="section-header text-center">
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Rewards</div>
              <h2>Win More Than Just <br /><span className="text-gradient-gold">a Trophy</span></h2>
              <p style={{ maxWidth: '560px', margin: '0 auto' }}>Every stage of IdeationX has rewards. The further you go, the bigger the prize.</p>
            </div>
          </RevealOnScroll>

          {/* Prize Tiers */}
          <RevealOnScroll delay={0.1}>
            <div className="responsive-grid-3" style={{ marginTop: 'var(--space-2xl)' }}>
              {[
                { rank: 'award-gold', label: 'Grand Finale Winner', amount: '₹5,00,000', color: 'var(--gold)', bg: 'rgba(245,200,66,0.08)', border: 'rgba(245,200,66,0.25)', perks: ['National winner trophy', 'CNBC TV18 feature', 'PPI offer from SBI Life', 'Mentorship from C-Suite'] },
                { rank: 'award-silver', label: 'Runner Up', amount: '₹2,50,000', color: 'rgba(180,190,210,1)', bg: 'rgba(180,190,210,0.05)', border: 'rgba(180,190,210,0.2)', perks: ['Runner-up trophy', 'CNBC TV18 feature', 'PPI offer from SBI Life', 'LinkedIn recognition'] },
                { rank: 'award-bronze', label: 'Second Runner Up', amount: '₹1,00,000', color: 'rgba(205,127,50,0.9)', bg: 'rgba(205,127,50,0.06)', border: 'rgba(205,127,50,0.2)', perks: ['Bronze trophy', 'CNBC TV18 feature', 'PPI offer from SBI Life', 'Certificate of excellence'] },
              ].map((prize) => (
                <div key={prize.label} style={{ background: prize.bg, border: `1px solid ${prize.border}`, borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', alignItems: 'center' }}>
                  <div style={{ marginBottom: '8px' }}><Icon name={prize.rank} size={48} color={prize.color} /></div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: prize.color }}>{prize.amount}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>{prize.label}</div>
                  </div>
                  <div style={{ borderTop: `1px solid ${prize.border}`, paddingTop: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {prize.perks.map(perk => (
                      <div key={perk} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={prize.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Other Rewards */}
          <RevealOnScroll delay={0.15}>
            <div className="responsive-grid-3" style={{ marginTop: 'var(--space-xl)' }}>
              {[
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, color: 'var(--teal)', title: 'PPI Offers', desc: 'All Top 30 Semi-Finalists receive Pre-Placement Interview offers from SBI Life — regardless of the finale outcome.' },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>, color: 'var(--saffron)', title: 'CNBC TV18 Coverage', desc: 'All Top 10 Grand Finale participants appear in a dedicated CNBC TV18 episode broadcast to millions.' },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, color: '#A78BFA', title: 'Participation Certificate', desc: 'Every team that submits a valid entry receives a verified digital certificate of participation from SBI Life.' },
              ].map((r) => (
                <div key={r.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', background: `color-mix(in srgb, ${r.color} 12%, transparent)`, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: '6px' }}>{r.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Total prize pool callout */}
          <RevealOnScroll delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)', padding: 'var(--space-xl)', background: 'linear-gradient(135deg, rgba(245,200,66,0.06), rgba(255,107,26,0.04))', border: '1px solid rgba(245,200,66,0.15)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Prize Pool</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, background: 'linear-gradient(135deg, var(--gold), var(--saffron))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹10 Lakh+</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Plus PPI offers, CNBC coverage, mentorship & national recognition</div>
            </div>
          </RevealOnScroll>
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
