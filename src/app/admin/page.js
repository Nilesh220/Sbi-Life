'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { IdeationXData } from '@/lib/data';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Database Data States
  const [registrations, setRegistrations] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [posts, setPosts] = useState([]);

  // Search & Filter States
  const [regSearch, setRegSearch] = useState('');
  const [themeFilter, setThemeFilter] = useState('all');

  // Editing/Adding Leaderboard State
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadEditItem, setLeadEditItem] = useState(null);
  const [leadForm, setLeadForm] = useState({
    rank: '',
    college: '',
    entry: '',
    theme: '',
    phase: 'National Qualifier',
    city: '',
    score: ''
  });

  // Load state
  const [loading, setLoading] = useState(false);

  // Simple passkey validation
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Admin@IDX26' || password === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('idx_admin_session', 'true');
    } else {
      setAuthError('❌ Invalid admin credential key.');
    }
  };

  useEffect(() => {
    const session = localStorage.getItem('idx_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch all databases tables
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Registrations
      if (supabase) {
        const { data: regData } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
        setRegistrations(regData || []);

        const { data: subData } = await supabase.from('challenge_submissions').select('*').order('created_at', { ascending: false });
        setSubmissions(subData || []);

        const { data: leadData } = await supabase.from('leaderboard').select('*').order('rank', { ascending: true });
        setLeaderboard(leadData || []);

        const { data: postData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        setPosts(postData || []);
      } else {
        // Fallback to local storage mock values
        const localReg = JSON.parse(localStorage.getItem('registrations') || '[]');
        setRegistrations(localReg);

        const localSubs = JSON.parse(localStorage.getItem('challenge_submissions') || '[]');
        setSubmissions(localSubs);

        setLeaderboard([
          { id: '1', rank: 1, college: 'IIM Lucknow', entry: 'DigiShield Parampara', theme: 'Kirana to Coverage 🏪', phase: 'Semi-Finalist', city: 'Lucknow', score: 1240 },
          { id: '2', rank: 2, college: 'XLRI Jamshedpur', entry: 'Sanjeevani Vriksh', theme: 'Climate & Farmer 🌾', phase: 'Semi-Finalist', city: 'Jamshedpur', score: 1180 },
          { id: '3', rank: 3, college: 'FMS Delhi', entry: 'Nari Raksha Kavach', theme: 'Women Co-operatives 👩‍💼', phase: 'National Qualifier', city: 'Delhi', score: 1040 }
        ]);

        setPosts([
          { id: '1', author_name: 'Aryan Mehta', author_college: 'IIM A', category: 'General', content: 'What are the main parameters for social impact under the DIVE Framework?', likes: 12, replies: 2, created_at: new Date().toISOString() }
        ]);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete handlers
  const handleDeleteRegistration = async (id) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    try {
      if (supabase) {
        await supabase.from('registrations').delete().eq('id', id);
      } else {
        const localReg = registrations.filter(r => r.id !== id);
        localStorage.setItem('registrations', JSON.stringify(localReg));
      }
      setRegistrations(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleDeletePost = async (id) => {
    if (!confirm('Delete this community post?')) return;
    try {
      if (supabase) {
        await supabase.from('posts').delete().eq('id', id);
      } else {
        setPosts(prev => prev.filter(p => p.id !== id));
      }
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Leaderboard CRUD actions
  const handleSaveLeaderboard = async (e) => {
    e.preventDefault();
    const data = {
      rank: parseInt(leadForm.rank),
      college: leadForm.college,
      entry: leadForm.entry,
      theme: leadForm.theme,
      phase: leadForm.phase,
      city: leadForm.city,
      score: parseInt(leadForm.score)
    };

    try {
      if (supabase) {
        if (leadEditItem) {
          await supabase.from('leaderboard').update(data).eq('id', leadEditItem.id);
        } else {
          await supabase.from('leaderboard').insert([data]);
        }
      } else {
        alert('Supabase client offline. Change applied locally only.');
      }
      fetchData();
      setShowLeadModal(false);
      setLeadEditItem(null);
    } catch (err) {
      alert('Failed to save leaderboard: ' + err.message);
    }
  };

  const handleDeleteLeaderboard = async (id) => {
    if (!confirm('Remove this team entry from the leaderboard standings?')) return;
    try {
      if (supabase) {
        await supabase.from('leaderboard').delete().eq('id', id);
      }
      setLeaderboard(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Submission Status Review
  const handleUpdateSubmissionStatus = async (id, status, scoreReward = 0) => {
    try {
      if (supabase) {
        await supabase.from('challenge_submissions').update({ status, score: scoreReward }).eq('id', id);
      } else {
        const local = submissions.map(s => s.id === id ? { ...s, status, score: scoreReward } : s);
        localStorage.setItem('challenge_submissions', JSON.stringify(local));
      }
      setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status, score: scoreReward } : s));
    } catch (err) {
      alert('Status update failed: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('idx_admin_session');
    setIsAuthenticated(false);
  };

  // Filtered registrations
  const filteredRegs = registrations.filter(r => {
    const matchesSearch =
      r.team_name?.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.lead_first_name?.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.college?.toLowerCase().includes(regSearch.toLowerCase());

    const matchesTheme = themeFilter === 'all' || r.theme_id?.toString() === themeFilter;

    return matchesSearch && matchesTheme;
  });

  if (!isAuthenticated) {
    return (
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden', padding: 'var(--space-xl)' }}>
        <div className="orb orb--saffron" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px', opacity: 0.2 }}></div>
        <div className="orb orb--teal" style={{ width: '350px', height: '350px', bottom: '-100px', right: '-100px', opacity: 0.15 }}></div>
        <div className="noise-overlay"></div>

        <div className="card anim-fade-up" style={{ width: '100%', maxWidth: '420px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', textAlign: 'center', zIndex: 10 }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,107,26,0.15), rgba(255,179,0,0.05))', border: '1px solid rgba(255,107,26,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-xl)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <h3 style={{ marginBottom: 'var(--space-xs)' }}>IdeationX Admin</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Enter the secure admin credential key to proceed.</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '0.12em' }}
            />
            {authError && <div style={{ fontSize: '0.8rem', color: 'var(--saffron)', fontWeight: 600 }}>{authError}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-xs)' }}>Unlock Dashboard →</button>
          </form>

          <Link href="/" style={{ display: 'inline-block', marginTop: 'var(--space-lg)', fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to Microsite</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="noise-overlay"></div>
      <section style={{ minHeight: '100vh', background: 'var(--bg-deep)', padding: '100px 0 80px', position: 'relative' }}>
        <div className="container">
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
            <div>
              <div className="tag tag--saffron" style={{ marginBottom: '8px' }}>Security Level: Authorized</div>
              <h2 style={{ margin: 0 }}>IdeationX 2026 <span className="text-gradient-saffron">Admin Panel</span></h2>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary btn-sm" onClick={fetchData}>🔄 Sync Database</button>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>🚪 Logout</button>
            </div>
          </div>

          {/* Tab Selection */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '1px solid var(--glass-border)', marginBottom: 'var(--space-xl)' }}>
            {[
              { id: 'overview', label: '📊 Dashboard Overview' },
              { id: 'registrations', label: `📝 Team Registrations (${registrations.length})` },
              { id: 'leaderboard', label: `🏆 Leaderboard Standing (${leaderboard.length})` },
              { id: 'submissions', label: `📂 Weekly Challenges (${submissions.length})` },
              { id: 'community', label: `💬 Community Moderation (${posts.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: activeTab === tab.id ? 'var(--saffron)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid',
                  borderColor: activeTab === tab.id ? 'var(--saffron)' : 'var(--glass-border)',
                  color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ════ TAB 1: OVERVIEW ════ */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
              {/* Quick stats strip */}
              <div className="responsive-grid-4">
                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--teal)' }}>{registrations.length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Total Registered Teams</div>
                </div>
                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--saffron)' }}>{submissions.filter(s => s.status === 'Pending').length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Pending Reviews</div>
                </div>
                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--gold)' }}>{posts.length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Discussion Posts</div>
                </div>
                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#A78BFA' }}>{new Set(registrations.map(r => r.college)).size}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Active B Schools</div>
                </div>
              </div>

              {/* Detail Panels split */}
              <div className="responsive-grid-2">
                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)' }}>
                  <h4 style={{ marginBottom: 'var(--space-md)' }}>📊 Theme Distribution</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {IdeationXData.themes.map(t => {
                      const count = registrations.filter(r => r.theme_id === t.id).length;
                      const percentage = registrations.length ? Math.round((count / registrations.length) * 100) : 0;
                      return (
                        <div key={t.id}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                            <span>{t.icon} {t.name}</span>
                            <span style={{ fontWeight: 700 }}>{count} Teams ({percentage}%)</span>
                          </div>
                          <div className="progress-bar" style={{ height: '6px' }}>
                            <div className="progress-bar__fill" style={{ width: `${percentage}%`, background: t.color }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)' }}>
                  <h4 style={{ marginBottom: 'var(--space-md)' }}>📢 Top Enrolled Colleges</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Object.entries(
                      registrations.reduce((acc, r) => {
                        acc[r.college] = (acc[r.college] || 0) + 1;
                        return acc;
                      }, {})
                    )
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([college, count], idx) => (
                        <div key={college} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <span style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--saffron)' }}>#{idx + 1}</strong> {college}</span>
                          <span className="tag tag--teal" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>{count} Teams</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ TAB 2: REGISTRATIONS ════ */}
          {activeTab === 'registrations' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)' }}>
              
              {/* Search strip */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: 'var(--space-lg)', alignItems: 'center' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="🔍 Search team lead, team name, or B School..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  style={{ flex: 1, minWidth: '240px' }}
                />
                <select
                  className="form-input"
                  value={themeFilter}
                  onChange={(e) => setThemeFilter(e.target.value)}
                  style={{ width: '220px' }}
                >
                  <option value="all">All Challenge Themes</option>
                  {IdeationXData.themes.map(t => (
                    <option key={t.id} value={t.id.toString()}>{t.icon} {t.name}</option>
                  ))}
                </select>
              </div>

              {/* Table wrapper */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px 8px' }}>Date</th>
                      <th style={{ padding: '12px 8px' }}>Team Name</th>
                      <th style={{ padding: '12px 8px' }}>College / B-School</th>
                      <th style={{ padding: '12px 8px' }}>Members Info</th>
                      <th style={{ padding: '12px 8px' }}>Theme</th>
                      <th style={{ padding: '12px 8px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegs.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '32px 8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No registration entries match current query filters.
                        </td>
                      </tr>
                    ) : (
                      filteredRegs.map(reg => {
                        const theme = IdeationXData.themes.find(t => t.id === reg.theme_id);
                        return (
                          <tr key={reg.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                            <td style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>{new Date(reg.created_at).toLocaleDateString('en-IN')}</td>
                            <td style={{ padding: '12px 8px' }}><strong>{reg.team_name}</strong></td>
                            <td style={{ padding: '12px 8px' }}>{reg.college}</td>
                            <td style={{ padding: '12px 8px' }}>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>1. {reg.lead_first_name} {reg.lead_last_name} ({reg.email})</div>
                              {reg.member_2_name && <div>2. {reg.member_2_name} ({reg.member_2_email})</div>}
                              {reg.member_3_name && <div>3. {reg.member_3_name} ({reg.member_3_email})</div>}
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                              {theme ? (
                                <span className="tag" style={{ background: `color-mix(in srgb, ${theme.color} 10%, transparent)`, color: theme.color, border: `1px solid color-mix(in srgb, ${theme.color} 30%, transparent)` }}>
                                  {theme.icon} {theme.name}
                                </span>
                              ) : (
                                <span style={{ color: 'var(--text-muted)' }}>None</span>
                              )}
                            </td>
                            <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                              <button
                                className="btn btn-ghost btn-sm"
                                style={{ color: 'var(--saffron)', borderColor: 'transparent', padding: '4px 8px' }}
                                onClick={() => handleDeleteRegistration(reg.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ TAB 3: LEADERBOARD ════ */}
          {activeTab === 'leaderboard' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                <h4 style={{ margin: 0 }}>🏆 Standing Table Manager</h4>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setLeadEditItem(null);
                    setLeadForm({ rank: '', college: '', entry: '', theme: 'Kirana to Coverage 🏪', phase: 'National Qualifier', city: '', score: '' });
                    setShowLeadModal(true);
                  }}
                >
                  ➕ Add Standings Entry
                </button>
              </div>

              {/* Leaderboard Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                      <th style={{ padding: '12px 8px' }}>Rank</th>
                      <th style={{ padding: '12px 8px' }}>College / B-School</th>
                      <th style={{ padding: '12px 8px' }}>Entry Project Name</th>
                      <th style={{ padding: '12px 8px' }}>Theme</th>
                      <th style={{ padding: '12px 8px' }}>Phase</th>
                      <th style={{ padding: '12px 8px' }}>City</th>
                      <th style={{ padding: '12px 8px' }}>Score</th>
                      <th style={{ padding: '12px 8px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                        <td style={{ padding: '12px 8px' }}><strong>#{item.rank}</strong></td>
                        <td style={{ padding: '12px 8px' }}>{item.college}</td>
                        <td style={{ padding: '12px 8px' }}><strong>{item.entry}</strong></td>
                        <td style={{ padding: '12px 8px' }}>{item.theme}</td>
                        <td style={{ padding: '12px 8px' }}>
                          <span className={`tag ${item.phase === 'Semi-Finalist' ? 'tag--saffron' : 'tag--teal'}`} style={{ fontSize: '0.75rem' }}>
                            {item.phase}
                          </span>
                        </td>
                        <td style={{ padding: '12px 8px' }}>{item.city}</td>
                        <td style={{ padding: '12px 8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.score} XP</td>
                        <td style={{ padding: '12px 8px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button
                            className="btn btn-ghost btn-sm"
                            style={{ marginRight: '8px', padding: '4px 8px' }}
                            onClick={() => {
                              setLeadEditItem(item);
                              setLeadForm(item);
                              setShowLeadModal(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-ghost btn-sm"
                            style={{ color: 'var(--saffron)', borderColor: 'transparent', padding: '4px 8px' }}
                            onClick={() => handleDeleteLeaderboard(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ TAB 4: SUBMISSIONS ════ */}
          {activeTab === 'submissions' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)' }}>
              
              <h4 style={{ marginBottom: 'var(--space-lg)' }}>📂 Weekly Submissions Evaluator</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-md)' }}>
                {submissions.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No challenge submissions received yet.
                  </div>
                ) : (
                  submissions.map(sub => (
                    <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)', background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                          <span className="tag tag--saffron" style={{ fontSize: '0.72rem' }}>Week {sub.week} Challenge</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Team Ref: {sub.team_id}</span>
                        </div>
                        <h5 style={{ margin: '0 0 6px' }}>Submission: <a href={sub.url} target="_blank" rel="noreferrer" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>{sub.file_name || 'Attached URL Link'}</a></h5>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Submitted: {new Date(sub.created_at).toLocaleString('en-IN')}</div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {sub.status === 'Pending' ? (
                          <>
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ borderColor: 'var(--teal)', color: 'var(--teal)', background: 'rgba(0,212,184,0.05)' }}
                              onClick={() => handleUpdateSubmissionStatus(sub.id, 'Approved', 150)}
                            >
                              ✅ Approve (+150 XP)
                            </button>
                            <button
                              className="btn btn-ghost btn-sm"
                              style={{ color: 'var(--saffron)', borderColor: 'rgba(255,107,26,0.2)' }}
                              onClick={() => handleUpdateSubmissionStatus(sub.id, 'Rejected', 0)}
                            >
                              ❌ Reject
                            </button>
                          </>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              color: sub.status === 'Approved' ? 'var(--teal)' : 'var(--saffron)',
                              textTransform: 'uppercase'
                            }}>
                              Status: {sub.status}
                            </span>
                            {sub.status === 'Approved' && <span className="tag tag--teal">+{sub.score || 150} XP Awarded</span>}
                            <button
                              className="btn btn-ghost btn-sm"
                              style={{ fontSize: '0.72rem', padding: '2px 8px' }}
                              onClick={() => handleUpdateSubmissionStatus(sub.id, 'Pending', 0)}
                            >
                              Reset
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ════ TAB 5: COMMUNITY ════ */}
          {activeTab === 'community' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)' }}>
              
              <h4 style={{ marginBottom: 'var(--space-lg)' }}>💬 Discussion Board Moderation</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {posts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No community posts written.
                  </div>
                ) : (
                  posts.map(post => (
                    <div key={post.id} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{post.author_name}</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({post.author_college})</span>
                          <span className="tag" style={{ fontSize: '0.72rem', padding: '2px 6px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{post.category}</span>
                        </div>
                        <p style={{ margin: '0 0 8px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{post.content}</p>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <span>❤️ {post.likes} Likes</span>
                          <span>💬 {post.replies} Replies</span>
                          <span>🕒 {new Date(post.created_at).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--saffron)', borderColor: 'transparent', alignSelf: 'flex-start' }}
                        onClick={() => handleDeletePost(post.id)}
                      >
                        🗑️ Delete Post
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ════ MODAL: LEADERBOARD ADD/EDIT ════ */}
      {showLeadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-md)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '480px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>{leadEditItem ? '📝 Edit Standing Entry' : '🏆 Add Standings Entry'}</h3>
            
            <form onSubmit={handleSaveLeaderboard} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Rank *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={leadForm.rank}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, rank: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Score (XP) *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={leadForm.score}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, score: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.75rem' }}>College / B-School *</label>
                <input
                  type="text"
                  className="form-input"
                  value={leadForm.college}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, college: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Entry / Project Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={leadForm.entry}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, entry: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Theme *</label>
                <select
                  className="form-input"
                  value={leadForm.theme}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, theme: e.target.value }))}
                  required
                >
                  <option value="Kirana to Coverage 🏪">Kirana to Coverage 🏪</option>
                  <option value="Climate & Farmer 🌾">Climate & Farmer 🌾</option>
                  <option value="Women Co-operatives 👩‍💼">Women Co-operatives 👩‍💼</option>
                  <option value="Invisible Insurance 🚗">Invisible Insurance 🚗</option>
                  <option value="GenZ Insurance 📱">GenZ Insurance 📱</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Phase *</label>
                  <select
                    className="form-input"
                    value={leadForm.phase}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, phase: e.target.value }))}
                    required
                  >
                    <option value="Semi-Finalist">Semi-Finalist</option>
                    <option value="National Qualifier">National Qualifier</option>
                    <option value="Grand Finalist">Grand Finalist</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>City *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={leadForm.city}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowLeadModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Standings</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
