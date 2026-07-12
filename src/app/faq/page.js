'use client';

import { useState } from 'react';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';

const faqs = [
  {
    category: 'Registration & Eligibility',
    color: 'var(--teal)',
    items: [
      { q: 'Who can participate in IdeationX 2026?', a: 'Any student currently enrolled in a full-time MBA, PGDM, or equivalent management program at one of the 200 partner B Schools across India. You must be in your first or second year of the program.' },
      { q: 'Can I participate as an individual?', a: 'Yes! You can register solo or as a team of up to 3 members. All team members must be from the same B School. Cross-college teams are not permitted in the submission phase.' },
      { q: 'How many themes can I choose?', a: 'You must choose exactly one of the five challenge themes at the time of registration. You cannot change your theme after submission.' },
      { q: 'Is there an entry fee?', a: 'No. IdeationX 2026 is completely free to participate. There are no registration fees, submission charges, or hidden costs.' },
      { q: 'My college is not in the list. Can I still participate?', a: 'Currently, IdeationX 2026 is open only to students from partner B Schools. We are expanding the list — contact us at ideationx@sbilife.co.in to nominate your institution for future editions.' },
    ],
  },
  {
    category: 'Campus Induction',
    color: 'var(--saffron)',
    items: [
      { q: 'What happens at the campus induction session?', a: 'SBI Life officials visit your B School to conduct a 2-hour induction session. They introduce the competition, walk you through the DIVE Framework, explain evaluation criteria, and answer questions. Registrations and submissions are managed through this microsite.' },
      { q: 'Do I need to attend the campus induction to submit?', a: 'While attendance is not mandatory, we strongly recommend it. The induction gives you the DIVE Framework kit, access to problem statements, and clarity on the submission format that will significantly improve your entry quality.' },
      { q: 'When will my campus induction be scheduled?', a: 'Induction dates are being scheduled across 200 colleges from August to September 2026. Your B School will communicate the date via official channels. You can also check the Campus Schedule page for updates.' },
    ],
  },
  {
    category: 'Submission & Evaluation',
    color: '#A78BFA',
    items: [
      { q: 'What do I need to submit?', a: 'Two deliverables: (1) A video pitch of 3–5 minutes in MP4/MOV format, and (2) A solution deck of maximum 10 slides in PDF format. Both must be uploaded before September 30, 2026 at 11:59 PM IST.' },
      { q: 'Can I submit in Hindi?', a: 'Yes. Your video pitch can be in English or Hindi. Your deck can be in English only for the national jury round, but the B School internal round accepts Hindi decks.' },
      { q: 'Who evaluates my submission?', a: 'Phase 1 (B School level): A faculty panel at your college evaluates based on Creativity, Feasibility, Research, Social Impact, and Presentation. They select the Top 3 entries. Phase 2 onwards: A national panel of SBI Life executives and industry experts.' },
      { q: 'What if I miss the September 30 deadline?', a: 'Late submissions will not be accepted under any circumstances. The portal closes automatically at midnight. We recommend submitting at least 48 hours before the deadline to avoid technical issues.' },
      { q: 'Can I update my submission after uploading?', a: 'Yes, you can update your submission as many times as you want before the deadline. Only the most recent upload will be evaluated.' },
    ],
  },
  {
    category: 'Prizes & Recognition',
    color: 'var(--gold)',
    items: [
      { q: 'What are the prizes?', a: 'Grand Finale (CNBC TV18 feature): ₹5,00,000 (1st), ₹2,50,000 (2nd), ₹1,00,000 (3rd). Top 30 Semi-Finalists receive Pre-Placement Interview (PPI) offers from SBI Life. Best Performing College receives a trophy and national recognition.' },
      { q: 'What is a PPI offer?', a: 'A Pre-Placement Interview (PPI) is a direct interview opportunity at SBI Life Insurance without going through the regular campus placement process. Top 30 Semi-Finalists are eligible for PPI offers regardless of whether they win the finale.' },
      { q: 'Will I get a certificate of participation?', a: 'Yes. All registered participants who submit a valid entry receive a digital certificate of participation from SBI Life Insurance. This is shareable on LinkedIn and adds significant value to your profile.' },
      { q: 'Is there prize money at the college level?', a: 'There is no prize money at the B School evaluation stage. Rewards start from the National Qualifier round. However, top performers at the college level are featured on the IdeationX leaderboard.' },
    ],
  },
  {
    category: 'Technical & Support',
    color: 'var(--cerulean)',
    items: [
      { q: 'What browser should I use for the submission portal?', a: 'We recommend Google Chrome (latest version) or Firefox. Safari may have issues with file uploads above 100MB.' },
      { q: 'I have a technical issue with the portal. Who do I contact?', a: 'Email ideationx@sbilife.co.in with your registration reference ID, a screenshot of the issue, and your browser + OS details. We aim to respond within 24 hours on working days.' },
      { q: 'Can I use AI tools to build my solution?', a: 'AI tools are allowed for research, ideation, and deck design assistance. However, your core idea, analysis, and presentation must be your own original work. Submissions that are clearly AI-generated without human insight will be disqualified.' },
    ],
  },
];

function FAQAccordion({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: open ? 'var(--bg-elevated)' : 'var(--bg-card)',
        border: `1px solid ${open ? 'rgba(255,107,26,0.2)' : 'var(--glass-border)'}`,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        marginBottom: '8px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.5 }}>{item.q}</div>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: open ? 'rgba(255,107,26,0.15)' : 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s', transform: open ? 'rotate(45deg)' : 'none' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? 'var(--saffron)' : 'var(--text-muted)'} strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </div>
      </div>
      <div style={{ maxHeight: open ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ margin: 'var(--space-md) 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const visibleFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  return (
    <>
      <section style={{ padding: '140px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb--teal" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', opacity: 0.12 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--teal" style={{ marginBottom: 'var(--space-lg)' }}>Frequently Asked Questions</div>
            <h1>Got <span className="text-gradient-teal">Questions?</span></h1>
            <p style={{ maxWidth: '580px', marginTop: 'var(--space-md)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Everything students, faculty, and B School coordinators ask about IdeationX 2026.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 'var(--space-3xl)' }}>
        {/* Category Filter */}
        <RevealOnScroll>
          <div className="filter-tabs" style={{ flexWrap: 'wrap', marginBottom: 'var(--space-2xl)' }}>
            <button className={`filter-tab ${activeCategory === 'all' ? 'filter-tab--active' : ''}`} onClick={() => setActiveCategory('all')}>All Questions</button>
            {faqs.map(f => (
              <button key={f.category} className={`filter-tab ${activeCategory === f.category ? 'filter-tab--active' : ''}`} onClick={() => setActiveCategory(f.category)}>{f.category}</button>
            ))}
          </div>
        </RevealOnScroll>

        {visibleFaqs.map((section) => (
          <RevealOnScroll key={section.category}>
            <div style={{ marginBottom: 'var(--space-2xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-lg)' }}>
                <div style={{ width: '4px', height: '20px', background: section.color, borderRadius: '2px' }}></div>
                <h4 style={{ margin: 0, color: section.color }}>{section.category}</h4>
              </div>
              {section.items.map(item => (
                <FAQAccordion key={item.q} item={item} />
              ))}
            </div>
          </RevealOnScroll>
        ))}

        {/* Still need help */}
        <RevealOnScroll>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,212,184,0.08), rgba(0,181,239,0.05))', border: '1px solid rgba(0,212,184,0.2)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)', textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <h4 style={{ marginBottom: '8px' }}>Still have a question?</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
              Email us at <strong style={{ color: 'var(--teal)' }}>ideationx@sbilife.co.in</strong> — we respond within 24 hours on working days.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/register" className="btn btn-primary">Register Your Team →</Link>
              <Link href="/submission-guidelines" className="btn btn-secondary">Submission Guidelines</Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
}
