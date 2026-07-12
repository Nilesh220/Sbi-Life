'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IdeationXData } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import RevealOnScroll from '@/components/RevealOnScroll';

function getThemeIcon(themeStr) {
  if (themeStr.includes('Kirana')) return '🏪';
  if (themeStr.includes('Women')) return '👩‍💼';
  if (themeStr.includes('GenZ')) return '📱';
  if (themeStr.includes('Climate')) return '🌾';
  if (themeStr.includes('Invisible')) return '🚗';
  return '💡';
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [activePhase, setActivePhase] = useState('all');
  const [activeTheme, setActiveTheme] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      let data = [];
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase
            .from('leaderboard')
            .select('*')
            .order('rank', { ascending: true });
          if (error) throw error;
          data = dbData;
        } catch (err) {
          console.error("Supabase leaderboard query error, falling back:", err);
          data = [...IdeationXData.leaderboard];
        }
      } else {
        data = [...IdeationXData.leaderboard];
      }
      setLeaderboardData(data);
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  // Filter logic
  const filteredData = leaderboardData.filter(e => {
    const matchesPhase = activePhase === 'all' || e.phase.toLowerCase().includes(activePhase.toLowerCase());
    const matchesTheme = activeTheme === 'all' || e.theme.includes(activeTheme);
    const matchesSearch = searchQuery === '' || 
      e.college.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.entry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPhase && matchesTheme && matchesSearch;
  });

  return (
    <>


      <section className="lb-hero">
        <div className="orb orb--gold" style={{ width: '400px', height: '400px', top: '-100px', left: '50%', transform: 'translateX(-50%)', opacity: 0.12 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="live-badge" style={{ margin: '0 auto var(--space-lg)', width: 'fit-content' }}>
              <div className="ping-dot"></div> Live Standings
            </div>
            <h1>National <span className="text-gradient-gold">Leaderboard</span></h1>
            <p style={{ maxWidth: '560px', margin: 'var(--space-md) auto 0', fontSize: '1.05rem' }}>
              Phase 2 — Campus Registration is active. 600 B School Qualifiers will be selected during the internal evaluation. Top 30 Semi-Finalists will be revealed in November.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 'var(--space-3xl)' }}>
        {/* Phase 2 Locked Alert Card */}
        <RevealOnScroll>
          <div className="card" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--saffron)', boxShadow: '0 0 35px rgba(255,107,26,0.08)', marginBottom: 'var(--space-2xl)', padding: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '3rem', shrink: 0 }}>🔒</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '4px', color: 'var(--saffron)' }}>IdeationX 2026 Standings Not Yet Active</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  We are currently in **Phase 2: Campus Registration**. Live B School standings and qualifiers will go live starting **October 15, 2026**, after the internal evaluations begin across 200+ partner B Schools.
                </p>
              </div>
              <Link href="/register" className="btn btn-primary" style={{ shrink: 0 }}>Register Your Team Now →</Link>
            </div>
          </div>
        </RevealOnScroll>

        {/* Toggle to view Previous Edition Hall of Fame */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }} className="reveal">
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)' }}>Hall of Fame Archive</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>Browse winning ideas and profiles from previous editions to examine winning criteria.</p>
          </div>
          <div className="filter-tabs">
            <button className="filter-tab filter-tab--active" style={{ cursor: 'default' }}>🏆 Edition 2.0 & 1.0 (Archive)</button>
            <button className="filter-tab" style={{ opacity: 0.5, cursor: 'not-allowed' }} onClick={() => alert('2026 Standings will unlock on Oct 15!')}>📅 Edition 3.0 (Locked)</button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="filter-bar reveal">
          <input 
            className="form-input lb-search" 
            type="text" 
            placeholder="🔍 Search B School or entry name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="filter-tabs">
            <button className={`filter-tab ${activePhase === 'all' ? 'filter-tab--active' : ''}`} onClick={() => setActivePhase('all')}>All Archive</button>
            <button className={`filter-tab ${activePhase === 'Winner' ? 'filter-tab--active' : ''}`} onClick={() => setActivePhase('Winner')}>Podium Winners</button>
            <button className={`filter-tab ${activePhase === 'Finalist' ? 'filter-tab--active' : ''}`} onClick={() => setActivePhase('Finalist')}>National Finalists</button>
            <button className={`filter-tab ${activePhase === 'Qualifier' ? 'filter-tab--active' : ''}`} onClick={() => setActivePhase('Qualifier')}>Qualifiers</button>
          </div>
          <div className="filter-tabs">
            <button className={`filter-tab ${activeTheme === 'all' ? 'filter-tab--active' : ''}`} onClick={() => setActiveTheme('all')}>All Themes</button>
            <button className={`filter-tab ${activeTheme === 'Kirana' ? 'filter-tab--active' : ''}`} onClick={() => setActiveTheme('Kirana')}>🏪</button>
            <button className={`filter-tab ${activeTheme === 'Women' ? 'filter-tab--active' : ''}`} onClick={() => setActiveTheme('Women')}>👩‍💼</button>
            <button className={`filter-tab ${activeTheme === 'GenZ' ? 'filter-tab--active' : ''}`} onClick={() => setActiveTheme('GenZ')}>📱</button>
            <button className={`filter-tab ${activeTheme === 'Climate' ? 'filter-tab--active' : ''}`} onClick={() => setActiveTheme('Climate')}>🌾</button>
            <button className={`filter-tab ${activeTheme === 'Invisible' ? 'filter-tab--active' : ''}`} onClick={() => setActiveTheme('Invisible')}>🚗</button>
          </div>
        </div>

        {/* Table */}
        <div className="lb-table reveal reveal--delay-1">
          <div className="lb-header">
            <span style={{ textAlign: 'center' }}>Rank</span>
            <span>B School / Entry</span>
            <span>Theme</span>
            <span>Status</span>
            <span>City</span>
          </div>
          <div className="lb-body">
            {loading ? (
              <div style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--text-muted)' }}>Loading standings...</div>
            ) : filteredData.length === 0 ? (
              <div style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--text-muted)' }}>No entries match your filter.</div>
            ) : (
              filteredData.map((e) => {
                const rankCls = e.rank <= 3 ? `rank-${e.rank}` : '';
                const rowCls = e.rank <= 10 ? 'lb-entry lb-entry--top' : 'lb-entry';
                
                const isWinner = e.phase.toLowerCase().includes('winner') || e.phase.toLowerCase().includes('runner-up');
                const isFinalist = e.phase.toLowerCase().includes('finalist');
                const statusCls = isWinner ? 'lb-status-badge--sf' : isFinalist ? 'lb-status-badge--sf' : 'lb-status-badge--q';
                const statusDot = isWinner ? 'var(--gold)' : isFinalist ? 'var(--saffron)' : 'var(--teal)';
                const medal = e.rank === 1 ? '🥇' : e.rank === 2 ? '🥈' : e.rank === 3 ? '🥉' : '';
                
                return (
                  <div className={rowCls} key={e.rank}>
                    <div className={`lb-rank-num ${rankCls}`}>{medal || '#' + e.rank}</div>
                    <div>
                      <div className="lb-college-name">{e.college}</div>
                      <div className="lb-college-entry">💡 {e.entry}</div>
                    </div>
                    <div><span className="tag lb-theme-tag">{getThemeIcon(e.theme)} {e.theme}</span></div>
                    <div className={`lb-status-badge ${statusCls}`}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusDot, display: 'inline-block', shrink: 0 }}></span>
                      {e.phase}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>📍 {e.city}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }} className="reveal">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Showing authenticated records from IdeationX previous editions. 2026 evaluations open October 15.</p>
        </div>
      </div>
    </>
  );
}
