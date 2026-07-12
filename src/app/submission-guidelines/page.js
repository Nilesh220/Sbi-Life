import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';

export const metadata = {
  title: 'Submission Guidelines',
  description: 'How to submit your IdeationX 2026 entry — video pitch format, deck requirements, deadlines, and judging criteria.',
};

const rubric = [
  { label: 'Creativity & Originality', weight: '25%', pct: 25 },
  { label: 'Feasibility & Practicality', weight: '20%', pct: 20, desc: 'Can this actually be implemented? Realistic for the Indian market?' },
  { label: 'Research & Data Depth', weight: '20%', pct: 20, desc: 'Problem backed by data? Insights from real research or field observation?' },
  { label: 'Social Impact', weight: '20%', pct: 20, desc: 'Significant positive impact on Bharat? Does it serve underserved communities?' },
  { label: 'Presentation Quality', weight: '15%', pct: 15, desc: 'Clarity, structure, visual design, and storytelling of video + deck.' },
];

const timeline = [
  { date: 'Aug–Sep 2026', label: 'Preparation Window', desc: 'Attend campus induction, learn the DIVE Framework, research your chosen theme.', status: 'active' },
  { date: 'Sep 30, 2026', label: 'Submission Deadline', desc: 'Upload your video pitch and solution deck before 11:59 PM IST.', status: 'upcoming' },
  { date: 'Oct 1–Nov 1', label: 'B School Internal Evaluation', desc: 'Faculty panel evaluates submissions. Top 3 per college are selected.', status: 'locked' },
  { date: 'Nov 15, 2026', label: 'National Qualifier Results', desc: '600 B School qualifiers revealed. Top 30 Semi-Finalists announced.', status: 'locked' },
  { date: 'Dec 10, 2026', label: 'Virtual Semi-Finals', desc: 'Top 30 teams pitch live to the national jury.', status: 'locked' },
  { date: 'Jan 2027', label: 'Grand Finale — CNBC TV18', desc: 'Top 10 teams pitch on national television. ₹10 Lakh prize pool awarded.', status: 'locked' },
];

export default function SubmissionGuidelinesPage() {
  return (
    <>
      <section style={{ padding: '140px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb--saffron" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', opacity: 0.12 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--saffron" style={{ marginBottom: 'var(--space-lg)' }}>How to Submit · Judging Criteria</div>
            <h1>Submission <span className="text-gradient-saffron">Guidelines</span></h1>
            <p style={{ maxWidth: '620px', marginTop: 'var(--space-md)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Everything you need to submit a winning IdeationX 2026 entry. Read this before your campus induction session.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap', marginTop: 'var(--space-2xl)' }}>
              {[
                { val: 'Sep 30', label: 'Submission Deadline', color: 'var(--saffron)' },
                { val: '5 min', label: 'Max Video Length', color: 'var(--teal)' },
                { val: '10', label: 'Max Slides', color: '#A78BFA' },
                { val: '100 MB', label: 'Max Deck Size', color: 'var(--gold)' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg) var(--space-xl)', textAlign: 'center', minWidth: '140px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 'var(--space-3xl)' }}>

        {/* What to Submit */}
        <RevealOnScroll>
          <div style={{ marginBottom: 'var(--space-3xl)' }}>
            <div className="eyebrow">What to Submit</div>
            <h2 style={{ marginBottom: 'var(--space-xl)' }}>Two Deliverables Required</h2>
            <div className="responsive-grid-2">

              <div className="card" style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(0,212,184,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-lg)' }}>
                  <div style={{ width: '44px', height: '44px', background: 'rgba(0,212,184,0.1)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                  </div>
                  <h4 style={{ margin: 0 }}>Video Pitch</h4>
                </div>
                {[
                  'Duration: 3–5 minutes maximum',
                  'Format: MP4 or MOV (H.264 codec)',
                  'Resolution: Minimum 720p',
                  'Language: English or Hindi',
                  'Team must appear on screen',
                  'Cover: Problem → Solution → Impact → Ask',
                  'Max file size: 500 MB',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>

              <div className="card" style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,107,26,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-lg)' }}>
                  <div style={{ width: '44px', height: '44px', background: 'rgba(255,107,26,0.1)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <h4 style={{ margin: 0 }}>Solution Deck</h4>
                </div>
                {[
                  'Format: PDF only',
                  'Maximum 10 slides',
                  'Max file size: 100 MB',
                  'Must include: Cover, Problem, Solution, Feasibility, Impact, Team',
                  'No embedded audio or video',
                  'Use the official IdeationX template',
                  'Minimum 16pt font for readability',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Judging Rubric */}
        <RevealOnScroll>
          <div style={{ marginBottom: 'var(--space-3xl)' }}>
            <div className="eyebrow">How You Will Be Evaluated</div>
            <h2 style={{ marginBottom: 'var(--space-xl)' }}>Judging Criteria (Faculty Panel)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {rubric.map((r, i) => {
                const colors = ['var(--saffron)', 'var(--teal)', '#A78BFA', 'var(--gold)', 'rgba(0,181,239,1)'];
                return (
                  <div key={r.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg) var(--space-xl)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontWeight: 700 }}>{r.label}</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: colors[i] }}>{r.weight}</div>
                    </div>
                    <div style={{ height: '6px', background: 'var(--glass-border)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: r.weight, background: colors[i], borderRadius: '3px', transition: 'width 1s ease' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        {/* Timeline */}
        <RevealOnScroll>
          <div style={{ marginBottom: 'var(--space-3xl)' }}>
            <div className="eyebrow">Key Dates</div>
            <h2 style={{ marginBottom: 'var(--space-xl)' }}>Submission Timeline</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {timeline.map((t, i) => (
                <div key={t.date} style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-start', opacity: t.status === 'locked' ? 0.45 : 1 }}>
                  <div style={{ minWidth: '100px', textAlign: 'right', flexShrink: 0, paddingTop: '2px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: t.status === 'active' ? 'var(--saffron)' : 'var(--text-muted)' }}>{t.date}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.status === 'active' ? 'var(--saffron)' : t.status === 'upcoming' ? 'var(--teal)' : 'var(--glass-border)', border: '2px solid var(--bg-base)', flexShrink: 0 }}></div>
                    {i < timeline.length - 1 && <div style={{ width: '2px', flex: 1, minHeight: '40px', background: 'var(--glass-border)', margin: '4px 0' }}></div>}
                  </div>
                  <div style={{ paddingBottom: 'var(--space-xl)' }}>
                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>{t.label}</div>
                    <div style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* CTA */}
        <RevealOnScroll>
          <div style={{ background: 'linear-gradient(135deg, rgba(255,107,26,0.08), rgba(0,212,184,0.05))', border: '1px solid rgba(255,107,26,0.2)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>Ready to Start Building?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', maxWidth: '480px', margin: '0 auto var(--space-xl)' }}>Download the deck template, explore your theme, and register your team before Sep 30.</p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/resources" className="btn btn-primary btn-lg">Download Templates →</Link>
              <Link href="/register" className="btn btn-secondary btn-lg">Register Your Team</Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
}
