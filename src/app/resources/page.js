'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IdeationXData } from '@/lib/data';
import RevealOnScroll from '@/components/RevealOnScroll';
import Icon from '@/components/Icon';

export default function ResourcesPage() {
  const { resources } = IdeationXData;

  const handleDownload = (name) => {
    alert(`Downloading ${name}...`);
  };

  const getBadgeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'xlsx': return 'ft-xlsx';
      case 'pptx': return 'ft-pptx';
      case 'pdf': return 'ft-pdf';
      case 'docx': return 'ft-docx';
      default: return '';
    }
  };

  return (
    <>


      <section style={{ padding: '140px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb--gold" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', opacity: 0.15 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--gold" style={{ marginBottom: 'var(--space-lg)' }}>7 Templates · Free Download</div>
            <h1>Resource <span className="text-gradient-gold">Library</span></h1>
            <p style={{ maxWidth: '600px', marginTop: 'var(--space-md)', fontSize: '1.05rem' }}>
              Everything pre-built so you can focus on thinking, not formatting. From research templates to pitch decks — used by 31,000+ IdeationX participants.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Templates */}
      <section style={{ padding: 'var(--space-xl) 0 var(--space-3xl)' }}>
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <div className="eyebrow">Templates & Tools</div>
              <h2>Start Strong</h2>
              <p>All templates are available for immediate download. No sign-in required for basic templates — advanced templates unlock at 200 XP.</p>
            </div>
          </RevealOnScroll>

          <div className="resources-grid">
            {resources.map((r, idx) => (
              <RevealOnScroll key={r.name} delay={idx * 0.05}>
                <div className="resource-card">
                  <div className="resource-card__icon">
                    <Icon name={r.icon} size={28} color="var(--saffron)" />
                  </div>
                  <div className="resource-card__name">{r.name}</div>
                  <div className="resource-card__meta">
                    <span className={`file-type-badge ${getBadgeClass(r.type)}`}>{r.type}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.size}</span>
                  </div>
                  <div className="resource-card__downloads">⬇ {r.downloads.toLocaleString('en-IN')} downloads</div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleDownload(r.name)}>
                      Download Free →
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Judging Rubric */}
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-deep)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <div className="eyebrow">Evaluation Criteria</div>
              <h2>The Judging Rubric</h2>
              <p>Understand exactly how entries are evaluated. Build your solution and your pitch against these 5 criteria.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="judging-rubric">
              <div className="rubric-header">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Criterion</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Weight</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Max Score</span>
              </div>
              <div className="rubric-row">
                <div><div style={{ fontWeight: 700 }}>Problem Clarity</div><div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Is the problem statement crisp, real, and well-researched?</div></div>
                <span className="tag tag--saffron">25%</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--saffron)' }}>25</span>
              </div>
              <div className="rubric-row">
                <div><div style={{ fontWeight: 700 }}>Originality of Solution</div><div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Is the idea genuinely innovative and differentiated?</div></div>
                <span className="tag tag--saffron">25%</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--saffron)' }}>25</span>
              </div>
              <div className="rubric-row">
                <div><div style={{ fontWeight: 700 }}>Bharat Relevance</div><div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Does the solution fit the real constraints of its target segment?</div></div>
                <span className="tag tag--teal">20%</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--teal)' }}>20</span>
              </div>
              <div className="rubric-row">
                <div><div style={{ fontWeight: 700 }}>Feasibility</div><div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Is there a credible path to implementation? Unit economics considered?</div></div>
                <span className="tag tag--teal">20%</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--teal)' }}>20</span>
              </div>
              <div className="rubric-row">
                <div><div style={{ fontWeight: 700 }}>Presentation Quality</div><div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Is the pitch clear, compelling, and professionally delivered?</div></div>
                <span className="tag tag--gold">10%</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--gold)' }}>10</span>
              </div>
              <div style={{ padding: 'var(--space-md) var(--space-xl)', background: 'var(--bg-elevated)', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--gold)' }}>100 points</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Guidelines */}
      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <div className="eyebrow">Submission Guidelines</div>
              <h2>What to Submit</h2>
            </div>
          </RevealOnScroll>

          <div className="guideline-cards">
            <RevealOnScroll delay={0.05}>
              <div className="guideline-card">
                <div style={{ marginBottom: 'var(--space-md)' }}><Icon name="film" size={36} color="var(--saffron)" /></div>
                <h4 style={{ marginBottom: 'var(--space-md)' }}>Video Pitch</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span> Max 3 minutes (180 seconds)</div>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span> MP4 or MOV format</div>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span> All team members must appear</div>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span> English or Hindi (subtitles required if Hindi)</div>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="guideline-card">
                <div style={{ marginBottom: 'var(--space-md)' }}><Icon name="bar-chart" size={36} color="var(--saffron)" /></div>
                <h4 style={{ marginBottom: 'var(--space-md)' }}>Pitch Deck</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span> 8–10 slides maximum</div>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span> PDF or PPTX format</div>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span> Must include: Problem, Solution, Bharat Fit, Business Model</div>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span> Use the official IdeationX template (recommended)</div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
