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
  const [studentStats, setStudentStats] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [weeklyChallenges, setWeeklyChallenges] = useState([]);

  // Search & Filter States
  const [regSearch, setRegSearch] = useState('');
  const [themeFilter, setThemeFilter] = useState('all');
  const [studentSearch, setStudentSearch] = useState('');

  // Editing/Adding Leaderboard State
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadEditItem, setLeadEditItem] = useState(null);
  const [leadForm, setLeadForm] = useState({
    rank: '',
    college: '',
    entry: '',
    theme: 'Kirana to Coverage 🏪',
    phase: 'National Qualifier',
    city: '',
    score: ''
  });

  // Editing Registrations State
  const [showRegModal, setShowRegModal] = useState(false);
  const [regEditItem, setRegEditItem] = useState(null);
  const [regForm, setRegForm] = useState({
    team_name: '',
    lead_first_name: '',
    lead_last_name: '',
    college: '',
    course: '',
    year: '1st Year',
    email: '',
    phone: '',
    member_2_name: '',
    member_2_email: '',
    member_2_course: '',
    member_2_phone: '',
    member_3_name: '',
    member_3_email: '',
    member_3_course: '',
    member_3_phone: '',
    theme_id: '1'
  });

  // Editing/Adding Student Stats State
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [statsEditItem, setStatsEditItem] = useState(null);
  const [statsForm, setStatsForm] = useState({
    email: '',
    xp: '',
    level: '',
    streak: ''
  });

  // Editing/Adding Idea Hub State
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [ideaEditItem, setIdeaEditItem] = useState(null);
  const [ideaForm, setIdeaForm] = useState({
    title: '',
    category: 'Rural Protection',
    author: '',
    college: '',
    summary: '',
    likes: '0'
  });

  // Editing/Adding Webinars State
  const [showWebinarModal, setShowWebinarModal] = useState(false);
  const [webinarEditItem, setWebinarEditItem] = useState(null);
  const [webinarForm, setWebinarForm] = useState({
    title: '',
    mentor: '',
    mentor_role: '',
    date_str: '',
    time_str: '',
    link: ''
  });

  // Editing/Adding Weekly Challenge Config State
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [challengeEditItem, setChallengeEditItem] = useState(null);
  const [challengeForm, setChallengeForm] = useState({
    week: '',
    title: '',
    description: '',
    xp_reward: '50',
    deadline_str: ''
  });

  // Custom Submission Grading State
  const [gradingScores, setGradingScores] = useState({});

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
      if (supabase) {
        const { data: regData } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
        setRegistrations(regData || []);

        const { data: subData } = await supabase.from('challenge_submissions').select('*').order('created_at', { ascending: false });
        setSubmissions(subData || []);

        const { data: leadData } = await supabase.from('leaderboard').select('*').order('rank', { ascending: true });
        setLeaderboard(leadData || []);

        const { data: postData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        setPosts(postData || []);

        const { data: statsData } = await supabase.from('student_stats').select('*').order('xp', { ascending: false });
        setStudentStats(statsData || []);

        const { data: ideaData } = await supabase.from('idea_hub').select('*').order('created_at', { ascending: false });
        setIdeas(ideaData || []);

        const { data: webData } = await supabase.from('webinars').select('*').order('created_at', { ascending: false });
        setWebinars(webData || []);

        const { data: chData } = await supabase.from('weekly_challenges').select('*').order('week', { ascending: true });
        setWeeklyChallenges(chData || []);
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

        const localStats = JSON.parse(localStorage.getItem('student_stats') || '[]');
        if (localStats.length === 0) {
          const defaults = [{ id: '1', email: 'student@college.edu', xp: 450, level: 4, streak: 7, created_at: new Date().toISOString() }];
          localStorage.setItem('student_stats', JSON.stringify(defaults));
          setStudentStats(defaults);
        } else {
          setStudentStats(localStats);
        }

        const localIdeas = JSON.parse(localStorage.getItem('idea_hub') || '[]');
        if (localIdeas.length === 0) {
          const defaults = [
            { id: '1', title: 'Kirana Insurance Mitra 🏪', category: 'Rural Protection', author: 'Aryan & Shruti', college: 'IIM Lucknow', summary: 'Converting local mom-and-pop Kirana shops into micro-insurance access points for rural families.', likes: 42, created_at: new Date().toISOString() }
          ];
          localStorage.setItem('idea_hub', JSON.stringify(defaults));
          setIdeas(defaults);
        } else {
          setIdeas(localIdeas);
        }

        const localWebinars = JSON.parse(localStorage.getItem('webinars') || '[]');
        if (localWebinars.length === 0) {
          const defaults = [
            { id: '1', title: 'Ask Me Anything: Designing Scalable Social Business Cases', mentor: 'Dr. Radhakrishnan', mentor_role: 'Professor of Social Entrepreneurship', date_str: '2026-10-18', time_str: '05:00 PM', link: 'https://zoom.us/j/mocksession', created_at: new Date().toISOString() }
          ];
          localStorage.setItem('webinars', JSON.stringify(defaults));
          setWebinars(defaults);
        } else {
          setWebinars(localWebinars);
        }

        const localChallenges = JSON.parse(localStorage.getItem('weekly_challenges') || '[]');
        if (localChallenges.length === 0) {
          const defaults = [
            { id: '1', week: 8, title: 'The 60-Second Pitch', description: 'Record a 60-second video pitch of your IdeationX idea. No slides. No props. Just you.', xp_reward: 50, deadline_str: '2026-10-20T23:59:59', created_at: new Date().toISOString() }
          ];
          localStorage.setItem('weekly_challenges', JSON.stringify(defaults));
          setWeeklyChallenges(defaults);
        } else {
          setWeeklyChallenges(localChallenges);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // CSV Exporter Utility
  const downloadCSV = (headers, rows, filename) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.map(val => `"${String(val ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportRegistrations = () => {
    const headers = ['Team Name', 'Lead Name', 'Lead Email', 'Lead Phone', 'College', 'Course', 'Year', 'Member 2', 'Member 2 Email', 'Member 3', 'Member 3 Email', 'Theme ID', 'Created At'];
    const rows = registrations.map(r => [r.team_name, `${r.lead_first_name} ${r.lead_last_name}`, r.email, r.phone, r.college, r.course, r.year, r.member_2_name, r.member_2_email, r.member_3_name, r.member_3_email, r.theme_id, r.created_at]);
    downloadCSV(headers, rows, 'IdeationX_Registrations.csv');
  };

  // CRUD Save & Delete Handlers
  const handleDeleteRegistration = async (id) => {
    if (!confirm('Delete this registration?')) return;
    try {
      if (supabase) await supabase.from('registrations').delete().eq('id', id);
      else {
        const local = registrations.filter(r => r.id !== id);
        localStorage.setItem('registrations', JSON.stringify(local));
      }
      setRegistrations(prev => prev.filter(r => r.id !== id));
    } catch (err) { alert(err.message); }
  };

  const handleSaveRegistration = async (e) => {
    e.preventDefault();
    const data = {
      team_name: regForm.team_name,
      lead_first_name: regForm.lead_first_name,
      lead_last_name: regForm.lead_last_name,
      college: regForm.college,
      course: regForm.course,
      year: regForm.year,
      email: regForm.email,
      phone: regForm.phone,
      member_2_name: regForm.member_2_name,
      member_2_email: regForm.member_2_email,
      member_2_course: regForm.member_2_course,
      member_2_phone: regForm.member_2_phone,
      member_3_name: regForm.member_3_name,
      member_3_email: regForm.member_3_email,
      member_3_course: regForm.member_3_course,
      member_3_phone: regForm.member_3_phone,
      theme_id: parseInt(regForm.theme_id)
    };

    try {
      if (supabase) {
        if (regEditItem) await supabase.from('registrations').update(data).eq('id', regEditItem.id);
        else await supabase.from('registrations').insert([data]);
      } else {
        const list = JSON.parse(localStorage.getItem('registrations') || '[]');
        if (regEditItem) {
          const updated = list.map(i => i.id === regEditItem.id ? { ...i, ...data } : i);
          localStorage.setItem('registrations', JSON.stringify(updated));
        } else {
          list.push({ id: Math.random().toString(36).substring(2), created_at: new Date().toISOString(), ...data });
          localStorage.setItem('registrations', JSON.stringify(list));
        }
      }
      fetchData();
      setShowRegModal(false);
      setRegEditItem(null);
    } catch (err) { alert(err.message); }
  };

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
        if (leadEditItem) await supabase.from('leaderboard').update(data).eq('id', leadEditItem.id);
        else await supabase.from('leaderboard').insert([data]);
      } else {
        const list = leaderboard.map(l => l.id === leadEditItem?.id ? { ...l, ...data } : l);
        setLeaderboard(list);
      }
      fetchData();
      setShowLeadModal(false);
      setLeadEditItem(null);
    } catch (err) { alert(err.message); }
  };

  const handleDeleteLeaderboard = async (id) => {
    if (!confirm('Delete this standing entry?')) return;
    try {
      if (supabase) await supabase.from('leaderboard').delete().eq('id', id);
      setLeaderboard(prev => prev.filter(l => l.id !== id));
    } catch (err) { alert(err.message); }
  };

  const handleSaveStats = async (e) => {
    e.preventDefault();
    const data = { email: statsForm.email, xp: parseInt(statsForm.xp), level: parseInt(statsForm.level), streak: parseInt(statsForm.streak) };
    try {
      if (supabase) {
        if (statsEditItem) await supabase.from('student_stats').update(data).eq('id', statsEditItem.id);
        else await supabase.from('student_stats').insert([data]);
      } else {
        const list = JSON.parse(localStorage.getItem('student_stats') || '[]');
        if (statsEditItem) {
          const updated = list.map(i => i.id === statsEditItem.id ? { ...i, ...data } : i);
          localStorage.setItem('student_stats', JSON.stringify(updated));
        } else {
          list.push({ id: Math.random().toString(36).substring(2), created_at: new Date().toISOString(), ...data });
          localStorage.setItem('student_stats', JSON.stringify(list));
        }
      }
      fetchData();
      setShowStatsModal(false);
      setStatsEditItem(null);
    } catch (err) { alert(err.message); }
  };

  const handleDeleteStats = async (id) => {
    if (!confirm('Delete student record?')) return;
    try {
      if (supabase) await supabase.from('student_stats').delete().eq('id', id);
      else {
        const local = studentStats.filter(s => s.id !== id);
        localStorage.setItem('student_stats', JSON.stringify(local));
      }
      setStudentStats(prev => prev.filter(s => s.id !== id));
    } catch (err) { alert(err.message); }
  };

  // Idea Hub CRUD
  const handleSaveIdea = async (e) => {
    e.preventDefault();
    const data = {
      title: ideaForm.title,
      category: ideaForm.category,
      author: ideaForm.author,
      college: ideaForm.college,
      summary: ideaForm.summary,
      likes: parseInt(ideaForm.likes)
    };

    try {
      if (supabase) {
        if (ideaEditItem) await supabase.from('idea_hub').update(data).eq('id', ideaEditItem.id);
        else await supabase.from('idea_hub').insert([data]);
      } else {
        const list = JSON.parse(localStorage.getItem('idea_hub') || '[]');
        if (ideaEditItem) {
          const updated = list.map(i => i.id === ideaEditItem.id ? { ...i, ...data } : i);
          localStorage.setItem('idea_hub', JSON.stringify(updated));
        } else {
          list.push({ id: Math.random().toString(36).substring(2), created_at: new Date().toISOString(), ...data });
          localStorage.setItem('idea_hub', JSON.stringify(list));
        }
      }
      fetchData();
      setShowIdeaModal(false);
      setIdeaEditItem(null);
    } catch (err) { alert(err.message); }
  };

  const handleDeleteIdea = async (id) => {
    if (!confirm('Delete this idea hub entry?')) return;
    try {
      if (supabase) await supabase.from('idea_hub').delete().eq('id', id);
      else {
        const local = ideas.filter(i => i.id !== id);
        localStorage.setItem('idea_hub', JSON.stringify(local));
      }
      setIdeas(prev => prev.filter(i => i.id !== id));
    } catch (err) { alert(err.message); }
  };

  // Webinars CRUD
  const handleSaveWebinar = async (e) => {
    e.preventDefault();
    const data = {
      title: webinarForm.title,
      mentor: webinarForm.mentor,
      mentor_role: webinarForm.mentor_role,
      date_str: webinarForm.date_str,
      time_str: webinarForm.time_str,
      link: webinarForm.link
    };

    try {
      if (supabase) {
        if (webinarEditItem) await supabase.from('webinars').update(data).eq('id', webinarEditItem.id);
        else await supabase.from('webinars').insert([data]);
      } else {
        const list = JSON.parse(localStorage.getItem('webinars') || '[]');
        if (webinarEditItem) {
          const updated = list.map(i => i.id === webinarEditItem.id ? { ...i, ...data } : i);
          localStorage.setItem('webinars', JSON.stringify(updated));
        } else {
          list.push({ id: Math.random().toString(36).substring(2), created_at: new Date().toISOString(), ...data });
          localStorage.setItem('webinars', JSON.stringify(list));
        }
      }
      fetchData();
      setShowWebinarModal(false);
      setWebinarEditItem(null);
    } catch (err) { alert(err.message); }
  };

  const handleDeleteWebinar = async (id) => {
    if (!confirm('Delete this live session record?')) return;
    try {
      if (supabase) await supabase.from('webinars').delete().eq('id', id);
      else {
        const local = webinars.filter(w => w.id !== id);
        localStorage.setItem('webinars', JSON.stringify(local));
      }
      setWebinars(prev => prev.filter(w => w.id !== id));
    } catch (err) { alert(err.message); }
  };

  // Weekly Challenge CRUD
  const handleSaveChallenge = async (e) => {
    e.preventDefault();
    const data = {
      week: parseInt(challengeForm.week),
      title: challengeForm.title,
      description: challengeForm.description,
      xp_reward: parseInt(challengeForm.xp_reward),
      deadline_str: challengeForm.deadline_str
    };

    try {
      if (supabase) {
        if (challengeEditItem) await supabase.from('weekly_challenges').update(data).eq('id', challengeEditItem.id);
        else await supabase.from('weekly_challenges').insert([data]);
      } else {
        const list = JSON.parse(localStorage.getItem('weekly_challenges') || '[]');
        if (challengeEditItem) {
          const updated = list.map(i => i.id === challengeEditItem.id ? { ...i, ...data } : i);
          localStorage.setItem('weekly_challenges', JSON.stringify(updated));
        } else {
          list.push({ id: Math.random().toString(36).substring(2), created_at: new Date().toISOString(), ...data });
          localStorage.setItem('weekly_challenges', JSON.stringify(list));
        }
      }
      fetchData();
      setShowChallengeModal(false);
      setChallengeEditItem(null);
    } catch (err) { alert(err.message); }
  };

  const handleDeleteChallenge = async (id) => {
    if (!confirm('Remove this challenge configuration?')) return;
    try {
      if (supabase) await supabase.from('weekly_challenges').delete().eq('id', id);
      else {
        const local = weeklyChallenges.filter(w => w.id !== id);
        localStorage.setItem('weekly_challenges', JSON.stringify(local));
      }
      setWeeklyChallenges(prev => prev.filter(w => w.id !== id));
    } catch (err) { alert(err.message); }
  };

  const handleUpdateSubmissionStatus = async (id, status, defaultScore) => {
    const scoreReward = gradingScores[id] !== undefined ? parseInt(gradingScores[id]) : defaultScore;
    try {
      if (supabase) await supabase.from('challenge_submissions').update({ status, score: scoreReward }).eq('id', id);
      else {
        const local = submissions.map(s => s.id === id ? { ...s, status, score: scoreReward } : s);
        localStorage.setItem('challenge_submissions', JSON.stringify(local));
      }
      setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status, score: scoreReward } : s));
    } catch (err) { alert(err.message); }
  };

  const handleDeletePost = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      if (supabase) await supabase.from('posts').delete().eq('id', id);
      else {
        const local = posts.filter(p => p.id !== id);
        localStorage.setItem('posts', JSON.stringify(local));
      }
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) { alert(err.message); }
  };

  const handleLogout = () => {
    localStorage.removeItem('idx_admin_session');
    setIsAuthenticated(false);
  };

  // Filtered lists
  const filteredRegs = registrations.filter(r => {
    const matchesSearch = r.team_name?.toLowerCase().includes(regSearch.toLowerCase()) || r.lead_first_name?.toLowerCase().includes(regSearch.toLowerCase()) || r.college?.toLowerCase().includes(regSearch.toLowerCase());
    const matchesTheme = themeFilter === 'all' || r.theme_id?.toString() === themeFilter;
    return matchesSearch && matchesTheme;
  });

  const filteredStats = studentStats.filter(s => s.email?.toLowerCase().includes(studentSearch.toLowerCase()));

  if (!isAuthenticated) {
    return (
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)', padding: 'var(--space-xl)' }}>
        <div className="card" style={{ width: '100%', maxWidth: '420px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 style={{ marginBottom: 'var(--space-xs)' }}>IdeationX Admin</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Enter the secure admin credential key to proceed.</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <input type="password" className="form-input" placeholder="••••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ textAlign: 'center', fontSize: '1.1rem' }} />
            {authError && <div style={{ fontSize: '0.8rem', color: 'var(--saffron)', fontWeight: 600 }}>{authError}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Unlock Dashboard →</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="noise-overlay"></div>
      <section style={{ minHeight: '100vh', background: 'var(--bg-deep)', padding: '100px 0 80px' }}>
        <div className="container">
          
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

          {/* Navigation tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '1px solid var(--glass-border)', marginBottom: 'var(--space-xl)' }}>
            {[
              { id: 'overview', label: '📊 Dashboard Overview' },
              { id: 'registrations', label: `📝 Registrations (${registrations.length})` },
              { id: 'leaderboard', label: `🏆 Leaderboard (${leaderboard.length})` },
              { id: 'students', label: `🎓 Student XP (${studentStats.length})` },
              { id: 'submissions', label: `📂 Weekly Responses (${submissions.length})` },
              { id: 'ideahub', label: `💡 Idea Hub (${ideas.length})` },
              { id: 'webinars', label: `🎙️ Mentor Sessions (${webinars.length})` },
              { id: 'challenges', label: `⚡ Challenge Setup (${weeklyChallenges.length})` },
              { id: 'community', label: `💬 Discussions (${posts.length})` }
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
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ════ OVERVIEW ════ */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
              <div className="responsive-grid-4">
                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 950, color: 'var(--teal)' }}>{registrations.length}</div>
                  <div>Registered Teams</div>
                </div>
                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 950, color: 'var(--saffron)' }}>{submissions.filter(s => s.status === 'Pending').length}</div>
                  <div>Pending Tasks</div>
                </div>
                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 950, color: 'var(--gold)' }}>{ideas.length}</div>
                  <div>Idea Hub Items</div>
                </div>
                <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 950, color: '#A78BFA' }}>{webinars.length}</div>
                  <div>Mentor Webinars</div>
                </div>
              </div>
            </div>
          )}

          {/* ════ REGISTRATIONS ════ */}
          {activeTab === 'registrations' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                <h4 style={{ margin: 0 }}>Registered Student Entries</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={exportRegistrations}>Export CSV</button>
                  <button className="btn btn-primary btn-sm" onClick={() => { setRegEditItem(null); setRegForm({ team_name: '', lead_first_name: '', lead_last_name: '', college: '', course: '', year: '1st Year', email: '', phone: '', member_2_name: '', member_2_email: '', member_2_course: '', member_2_phone: '', member_3_name: '', member_3_email: '', member_3_course: '', member_3_phone: '', theme_id: '1' }); setShowRegModal(true); }}>Add Entry</button>
                </div>
              </div>
              <input type="text" className="form-input" placeholder="🔍 Search entries..." value={regSearch} onChange={(e) => setRegSearch(e.target.value)} style={{ width: '100%', marginBottom: '12px' }} />
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                      <th>Team</th>
                      <th>B-School</th>
                      <th>Members</th>
                      <th>Theme</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegs.map(reg => (
                      <tr key={reg.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 6px' }}><strong>{reg.team_name}</strong></td>
                        <td>{reg.college}</td>
                        <td>
                          <div>1. {reg.lead_first_name} {reg.lead_last_name} ({reg.email})</div>
                          {reg.member_2_name && <div>2. {reg.member_2_name}</div>}
                          {reg.member_3_name && <div>3. {reg.member_3_name}</div>}
                        </td>
                        <td>Theme #{reg.theme_id}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-ghost btn-sm" style={{ marginRight: '8px' }} onClick={() => { setRegEditItem(reg); setRegForm(reg); setShowRegModal(true); }}>Edit</button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--saffron)' }} onClick={() => handleDeleteRegistration(reg.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ LEADERBOARD ════ */}
          {activeTab === 'leaderboard' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0 }}>Leaderboard standings</h4>
                <button className="btn btn-primary btn-sm" onClick={() => { setLeadEditItem(null); setLeadForm({ rank: '', college: '', entry: '', theme: 'Kirana to Coverage 🏪', phase: 'National Qualifier', city: '', score: '' }); setShowLeadModal(true); }}>Add Entry</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <th>Rank</th>
                      <th>B-School</th>
                      <th>Project</th>
                      <th>Theme</th>
                      <th>Score</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map(l => (
                      <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 6px' }}>#{l.rank}</td>
                        <td>{l.college}</td>
                        <td>{l.entry}</td>
                        <td>{l.theme}</td>
                        <td>{l.score} XP</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-ghost btn-sm" style={{ marginRight: '8px' }} onClick={() => { setLeadEditItem(l); setLeadForm(l); setShowLeadModal(true); }}>Edit</button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--saffron)' }} onClick={() => handleDeleteLeaderboard(l.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ STUDENT XP ════ */}
          {activeTab === 'students' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0 }}>Student Level & XP Accounts</h4>
                <button className="btn btn-primary btn-sm" onClick={() => { setStatsEditItem(null); setStatsForm({ email: '', xp: '', level: '1', streak: '1' }); setShowStatsModal(true); }}>Add Student</button>
              </div>
              <input type="text" className="form-input" placeholder="🔍 Search email..." value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} style={{ width: '100%', marginBottom: '12px' }} />
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <th>Email</th>
                      <th>XP</th>
                      <th>Level</th>
                      <th>Streak</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStats.map(s => (
                      <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 6px' }}>{s.email}</td>
                        <td style={{ color: 'var(--teal)' }}>{s.xp} XP</td>
                        <td>Level {s.level}</td>
                        <td>🔥 {s.streak} Days</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-ghost btn-sm" style={{ marginRight: '8px' }} onClick={() => { setStatsEditItem(s); setStatsForm({ email: s.email, xp: s.xp.toString(), level: s.level.toString(), streak: s.streak.toString() }); setShowStatsModal(true); }}>Edit</button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--saffron)' }} onClick={() => handleDeleteStats(s.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ SUBMISSIONS ════ */}
          {activeTab === 'submissions' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <h4 style={{ marginBottom: '12px' }}>Student Challenge Submissions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {submissions.map(sub => (
                  <div key={sub.id} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div><strong>Week {sub.week}</strong> · Ref: {sub.team_id}</div>
                      <div>File: <a href={sub.url} target="_blank" rel="noreferrer" style={{ color: 'var(--teal)' }}>{sub.file_name || 'Link'}</a></div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {sub.status === 'Pending' ? (
                        <>
                          <input type="number" className="form-input" placeholder="150" value={gradingScores[sub.id] || ''} onChange={(e) => setGradingScores(prev => ({ ...prev, [sub.id]: e.target.value }))} style={{ width: '80px', padding: '6px' }} />
                          <button className="btn btn-secondary btn-sm" onClick={() => handleUpdateSubmissionStatus(sub.id, 'Approved', 150)}>Approve</button>
                        </>
                      ) : (
                        <span>Approved ({sub.score} XP)</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ IDEA HUB ════ */}
          {activeTab === 'ideahub' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0 }}>💡 Idea Hub (Inspiration Library)</h4>
                <button className="btn btn-primary btn-sm" onClick={() => { setIdeaEditItem(null); setIdeaForm({ title: '', category: 'Rural Protection', author: '', college: '', summary: '', likes: '0' }); setShowIdeaModal(true); }}>Add Idea</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <th>Idea Title</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>B-School</th>
                      <th>Likes</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ideas.map(i => (
                      <tr key={i.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 6px' }}><strong>{i.title}</strong></td>
                        <td>{i.category}</td>
                        <td>{i.author}</td>
                        <td>{i.college}</td>
                        <td>❤️ {i.likes}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-ghost btn-sm" style={{ marginRight: '8px' }} onClick={() => { setIdeaEditItem(i); setIdeaForm({ title: i.title, category: i.category, author: i.author, college: i.college, summary: i.summary, likes: i.likes.toString() }); setShowIdeaModal(true); }}>Edit</button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--saffron)' }} onClick={() => handleDeleteIdea(i.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ WEBINARS ════ */}
          {activeTab === 'webinars' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0 }}>🎙️ Mentor Sessions / Webinars</h4>
                <button className="btn btn-primary btn-sm" onClick={() => { setWebinarEditItem(null); setWebinarForm({ title: '', mentor: '', mentor_role: '', date_str: '', time_str: '', link: '' }); setShowWebinarModal(true); }}>Add Webinar</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <th>Session Title</th>
                      <th>Mentor</th>
                      <th>Role</th>
                      <th>Schedule</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {webinars.map(w => (
                      <tr key={w.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 6px' }}><strong>{w.title}</strong></td>
                        <td>{w.mentor}</td>
                        <td>{w.mentor_role}</td>
                        <td>{w.date_str} @ {w.time_str}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-ghost btn-sm" style={{ marginRight: '8px' }} onClick={() => { setWebinarEditItem(w); setWebinarForm(w); setShowWebinarModal(true); }}>Edit</button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--saffron)' }} onClick={() => handleDeleteWebinar(w.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ CHALLENGES ════ */}
          {activeTab === 'challenges' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0 }}>⚡ Weekly Challenges Config</h4>
                <button className="btn btn-primary btn-sm" onClick={() => { setChallengeEditItem(null); setChallengeForm({ week: '', title: '', description: '', xp_reward: '50', deadline_str: '' }); setShowChallengeModal(true); }}>Add Challenge</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <th>Week</th>
                      <th>Challenge Title</th>
                      <th>Reward</th>
                      <th>Deadline</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyChallenges.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 6px' }}>Week {c.week}</td>
                        <td><strong>{c.title}</strong></td>
                        <td>+{c.xp_reward} XP</td>
                        <td>{c.deadline_str}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-ghost btn-sm" style={{ marginRight: '8px' }} onClick={() => { setChallengeEditItem(c); setChallengeForm({ week: c.week.toString(), title: c.title, description: c.description, xp_reward: c.xp_reward.toString(), deadline_str: c.deadline_str }); setShowChallengeModal(true); }}>Edit</button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--saffron)' }} onClick={() => handleDeleteChallenge(c.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ DISCUSSIONS ════ */}
          {activeTab === 'community' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <h4 style={{ marginBottom: '12px' }}>💬 Community Moderation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {posts.map(post => (
                  <div key={post.id} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <div><strong>{post.author_name}</strong> ({post.author_college}) · <span className="tag">{post.category}</span></div>
                      <p style={{ margin: '6px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{post.content}</p>
                    </div>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--saffron)', alignSelf: 'flex-start' }} onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ════ MODAL: REGISTER ADD/EDIT ════ */}
      {showRegModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-md)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '560px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: '24px', borderRadius: 'var(--radius-xl)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3>{regEditItem ? 'Edit Registration' : 'Add Registration'}</h3>
            <form onSubmit={handleSaveRegistration} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" className="form-input" placeholder="Team Name" value={regForm.team_name} onChange={(e) => setRegForm(prev => ({ ...prev, team_name: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Lead First Name" value={regForm.lead_first_name} onChange={(e) => setRegForm(prev => ({ ...prev, lead_first_name: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Lead Last Name" value={regForm.lead_last_name} onChange={(e) => setRegForm(prev => ({ ...prev, lead_last_name: e.target.value }))} required />
              <input type="email" className="form-input" placeholder="Lead Email" value={regForm.email} onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Lead Phone" value={regForm.phone} onChange={(e) => setRegForm(prev => ({ ...prev, phone: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="College" value={regForm.college} onChange={(e) => setRegForm(prev => ({ ...prev, college: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Course" value={regForm.course} onChange={(e) => setRegForm(prev => ({ ...prev, course: e.target.value }))} required />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowRegModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════ MODAL: LEADERBOARD ADD/EDIT ════ */}
      {showLeadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-md)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '440px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: '24px', borderRadius: 'var(--radius-xl)' }}>
            <h3>{leadEditItem ? 'Edit Standings' : 'Add Standings'}</h3>
            <form onSubmit={handleSaveLeaderboard} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="number" className="form-input" placeholder="Rank" value={leadForm.rank} onChange={(e) => setLeadForm(prev => ({ ...prev, rank: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="College" value={leadForm.college} onChange={(e) => setLeadForm(prev => ({ ...prev, college: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Project Name" value={leadForm.entry} onChange={(e) => setLeadForm(prev => ({ ...prev, entry: e.target.value }))} required />
              <input type="number" className="form-input" placeholder="Score (XP)" value={leadForm.score} onChange={(e) => setLeadForm(prev => ({ ...prev, score: e.target.value }))} required />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowLeadModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Standings</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════ MODAL: STUDENT STATS ADD/EDIT ════ */}
      {showStatsModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-md)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '440px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: '24px', borderRadius: 'var(--radius-xl)' }}>
            <h3>{statsEditItem ? 'Edit Student Stats' : 'Add Student stats'}</h3>
            <form onSubmit={handleSaveStats} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="email" className="form-input" placeholder="Student Email" value={statsForm.email} onChange={(e) => setStatsForm(prev => ({ ...prev, email: e.target.value }))} required disabled={!!statsEditItem} />
              <input type="number" className="form-input" placeholder="XP Score" value={statsForm.xp} onChange={(e) => setStatsForm(prev => ({ ...prev, xp: e.target.value }))} required />
              <input type="number" className="form-input" placeholder="Level" value={statsForm.level} onChange={(e) => setStatsForm(prev => ({ ...prev, level: e.target.value }))} required />
              <input type="number" className="form-input" placeholder="Streak" value={statsForm.streak} onChange={(e) => setStatsForm(prev => ({ ...prev, streak: e.target.value }))} required />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowStatsModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Stats</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════ MODAL: IDEA HUB ADD/EDIT ════ */}
      {showIdeaModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-md)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '460px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: '24px', borderRadius: 'var(--radius-xl)' }}>
            <h3>{ideaEditItem ? 'Edit Idea Entry' : 'Add Idea Entry'}</h3>
            <form onSubmit={handleSaveIdea} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" className="form-input" placeholder="Idea Title" value={ideaForm.title} onChange={(e) => setIdeaForm(prev => ({ ...prev, title: e.target.value }))} required />
              <select className="form-input" value={ideaForm.category} onChange={(e) => setIdeaForm(prev => ({ ...prev, category: e.target.value }))}>
                <option value="Rural Protection">Rural Protection</option>
                <option value="Climate Change">Climate Change</option>
                <option value="Gen Z Inclusive">Gen Z Inclusive</option>
                <option value="Healthcare Security">Healthcare Security</option>
              </select>
              <input type="text" className="form-input" placeholder="Authors (Aryan & Shruti)" value={ideaForm.author} onChange={(e) => setIdeaForm(prev => ({ ...prev, author: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="B-School" value={ideaForm.college} onChange={(e) => setIdeaForm(prev => ({ ...prev, college: e.target.value }))} required />
              <textarea className="form-input" placeholder="Summary of Innovation Case study" value={ideaForm.summary} onChange={(e) => setIdeaForm(prev => ({ ...prev, summary: e.target.value }))} style={{ minHeight: '80px' }} required />
              <input type="number" className="form-input" placeholder="Likes Count" value={ideaForm.likes} onChange={(e) => setIdeaForm(prev => ({ ...prev, likes: e.target.value }))} required />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowIdeaModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Idea</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════ MODAL: WEBINAR ADD/EDIT ════ */}
      {showWebinarModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-md)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '460px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: '24px', borderRadius: 'var(--radius-xl)' }}>
            <h3>{webinarEditItem ? 'Edit Session' : 'Add Session'}</h3>
            <form onSubmit={handleSaveWebinar} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" className="form-input" placeholder="Session Title" value={webinarForm.title} onChange={(e) => setWebinarForm(prev => ({ ...prev, title: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Mentor Name" value={webinarForm.mentor} onChange={(e) => setWebinarForm(prev => ({ ...prev, mentor: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Mentor Role" value={webinarForm.mentor_role} onChange={(e) => setWebinarForm(prev => ({ ...prev, mentor_role: e.target.value }))} required />
              <input type="date" className="form-input" value={webinarForm.date_str} onChange={(e) => setWebinarForm(prev => ({ ...prev, date_str: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Time (e.g. 05:00 PM)" value={webinarForm.time_str} onChange={(e) => setWebinarForm(prev => ({ ...prev, time_str: e.target.value }))} required />
              <input type="url" className="form-input" placeholder="Zoom / Webinar Link" value={webinarForm.link} onChange={(e) => setWebinarForm(prev => ({ ...prev, link: e.target.value }))} required />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowWebinarModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Session</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════ MODAL: WEEKLY CHALLENGE ADD/EDIT ════ */}
      {showChallengeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-md)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '480px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: '24px', borderRadius: 'var(--radius-xl)' }}>
            <h3>{challengeEditItem ? 'Edit Challenge' : 'Add Challenge'}</h3>
            <form onSubmit={handleSaveChallenge} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="number" className="form-input" placeholder="Week Number" value={challengeForm.week} onChange={(e) => setChallengeForm(prev => ({ ...prev, week: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Challenge Title" value={challengeForm.title} onChange={(e) => setChallengeForm(prev => ({ ...prev, title: e.target.value }))} required />
              <textarea className="form-input" placeholder="Description Instructions..." value={challengeForm.description} onChange={(e) => setChallengeForm(prev => ({ ...prev, description: e.target.value }))} style={{ minHeight: '80px' }} required />
              <input type="number" className="form-input" placeholder="XP Reward" value={challengeForm.xp_reward} onChange={(e) => setChallengeForm(prev => ({ ...prev, xp_reward: e.target.value }))} required />
              <input type="text" className="form-input" placeholder="Deadline (ISO or string)" value={challengeForm.deadline_str} onChange={(e) => setChallengeForm(prev => ({ ...prev, deadline_str: e.target.value }))} required />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowChallengeModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Challenge</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
