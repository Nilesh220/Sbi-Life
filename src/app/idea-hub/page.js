'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IdeationXData } from '@/lib/data';
import RevealOnScroll from '@/components/RevealOnScroll';
import LockedBanner from '@/components/LockedBanner';

export default function IdeaHubPage() {
  const { pastWinners } = IdeationXData;
  const [editionFilter, setEditionFilter] = useState('all');
  const [winnerFilter, setWinnerFilter] = useState('all');

  const filteredIdeas = pastWinners.filter(e => {
    const matchesEdition = editionFilter === 'all' || e.edition.toString() === editionFilter;
    const matchesWinner = winnerFilter === 'all' || (winnerFilter === 'true' && e.isWinner);
    return matchesEdition && matchesWinner;
  });

  const colors = [
    'rgba(255,107,26,0.15)', 
    'rgba(0,212,184,0.15)', 
    'rgba(245,200,66,0.15)', 
    'rgba(200,85,255,0.15)', 
    'rgba(0,181,239,0.15)'
  ];

  const problemLibrary = [
    { theme: '🏪 Kirana to Coverage', title: 'The Trust Gap in Rural Insurance Distribution', desc: 'Only 3.5% of rural Indians have life insurance. An agent-to-population ratio of 1:1,200 means most families have never had a meaningful insurance conversation. Who do they trust more than any bank or company?', tag: 'Research Problem', tagCls: 'tag tag--saffron' },
    { theme: '📱 GenZ Protection', title: 'The First Salary Moment', desc: 'India\'s 22-year-olds are receiving their first salary credits via UPI. 94% spend on consumption in the first 30 days. 0.4% purchase any form of insurance.', tag: 'Product Problem', tagCls: 'tag tag--teal' },
    { theme: '🌾 Climate & Farmer', title: 'The Debt-Death Spiral', desc: 'Average Indian farmer debt: ₹74,121. 42% of farmer suicides are linked to debt. Life insurance penetration in farming communities: under 2%.', tag: 'Social Problem', tagCls: 'tag tag--gold' },
    { theme: '🚗 Invisible Workforce', title: 'Platform as Insurer', desc: 'Zomato has 400,000 delivery partners. None are employees. All are contractors. Platforms know their income patterns. Could platforms become the distribution backbone?', tag: 'Tech Problem', tagCls: 'tag', tagStyle: { background: 'rgba(0,181,239,0.12)', color: '#4DCDFF', border: '1px solid rgba(0,181,239,0.3)' } },
    { theme: '👩‍💼 Women Architects', title: 'Invisible Contribution, Invisible Protection', desc: 'India\'s 200 million homemakers contribute an estimated ₹23 lakh crore in unpaid economic value annually. Only 8% have any form of life insurance.', tag: 'Social Problem', tagCls: 'tag', tagStyle: { background: 'rgba(200,85,255,0.12)', color: '#D480FF', border: '1px solid rgba(200,85,255,0.3)' } },
    { theme: '📊 Cross-Theme', title: 'The Claim Experience Crisis', desc: '43% of life insurance claims in India are delayed by more than 30 days. The experience of claiming during grief determines whether the next generation buys life insurance.', tag: 'Process Problem', tagCls: 'tag tag--muted' },
  ];

  return (
    <>


      <section style={{ padding: '140px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb--cerulean" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px', opacity: 0.2 }}></div>
        <div className="container">
          <LockedBanner
            title="Idea Hub — Unlocks After Submission Deadline"
            message="The Idea Hub showcases community submissions and past winning ideas. It opens once the September 30, 2026 submission window closes so all ideas go live at the same time."
            unlockLabel="Opens Oct 2026"
            ctaText="Submit Your Idea →"
            ctaHref="/register"
          />
          <RevealOnScroll>
            <div className="tag tag--teal" style={{ marginBottom: 'var(--space-lg)' }}>Idea Library · 2 Editions</div>
            <h1>Idea <span className="text-gradient-teal">Hub</span></h1>
            <p style={{ maxWidth: '600px', marginTop: 'var(--space-md)', fontSize: '1.05rem' }}>
              Browse the ideas that have shaped IdeationX — from national champions to brilliant finalists. Find inspiration, understand what works, and build on the best.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--space-xl) 0 var(--space-3xl)' }}>
        <div className="container">
          <div className="filter-bar reveal">
            <div className="filter-tabs">
              <button className={`filter-tab ${editionFilter === 'all' ? 'filter-tab--active' : ''}`} onClick={() => setEditionFilter('all')}>All Editions</button>
              <button className={`filter-tab ${editionFilter === '1' ? 'filter-tab--active' : ''}`} onClick={() => setEditionFilter('1')}>Edition 1 (2024)</button>
              <button className={`filter-tab ${editionFilter === '2' ? 'filter-tab--active' : ''}`} onClick={() => setEditionFilter('2')}>Edition 2 (2025)</button>
            </div>
            <div className="filter-tabs">
              <button className={`filter-tab ${winnerFilter === 'all' ? 'filter-tab--active' : ''}`} onClick={() => setWinnerFilter('all')}>All Entries</button>
              <button className={`filter-tab ${winnerFilter === 'true' ? 'filter-tab--active' : ''}`} onClick={() => setWinnerFilter('true')}>🏆 Winners Only</button>
            </div>
          </div>

          <div className="idea-hub-grid">
            {filteredIdeas.length === 0 ? (
              <div style={{ padding: 'var(--space-xl)', color: 'var(--text-muted)' }}>No winning ideas match your criteria.</div>
            ) : (
              filteredIdeas.map((e, idx) => (
                <RevealOnScroll key={e.id} delay={idx * 0.05}>
                  <div className="entry-card">
                    <div className="entry-card__thumb" style={{ background: `linear-gradient(135deg, ${colors[idx % colors.length]}, rgba(0,0,0,0))` }}>
                      {e.icon}
                    </div>
                    <div className="entry-card__body">
                      <div className="entry-card__edition">{e.isWinner ? '🏆 ' : ''}Edition {e.edition} · {e.year}</div>
                      <h4 className="entry-card__title">{e.title}</h4>
                      <p className="entry-card__desc">{e.summary}</p>
                      <div className="entry-card__footer">
                        <span className="entry-card__college">📍 {e.college}</span>
                        <span className="entry-card__winner" style={{ color: e.isWinner ? 'var(--gold)' : 'var(--text-muted)' }}>
                          {e.isWinner ? '🥇 ' : ''}{e.rankText || 'Finalist'}
                        </span>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Bharat Challenges Library */}
      <section className="problem-library">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <div className="eyebrow">Bharat Challenges</div>
              <h2>Problem Statement Library</h2>
              <p>An ever-growing library of real problems. Use these as research starting points, not copy-paste statements.</p>
            </div>
          </RevealOnScroll>

          <div className="problems-grid">
            {problemLibrary.map((p, idx) => (
              <RevealOnScroll key={p.title} delay={idx * 0.05}>
                <div className="problem-card">
                  <div className="problem-card__week">{p.theme}</div>
                  <h4 className="problem-card__title">{p.title}</h4>
                  <p className="problem-card__desc">{p.desc}</p>
                  <div style={{ marginTop: 'var(--space-md)' }}>
                    <span className={p.tagCls} style={p.tagStyle}>{p.tag}</span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
