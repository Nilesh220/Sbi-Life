'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IdeationXData } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import RevealOnScroll from '@/components/RevealOnScroll';
import Countdown from '@/components/Countdown';

export default function WeeklyChallengePage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      alert('Video selected! Click Submit to earn XP.');
    }
  };

  const handleSubmitChallenge = async () => {
    if (!uploadedFile && !submissionUrl) {
      alert('Please upload a video file or paste a YouTube/Loom link.');
      return;
    }

    setSubmitting(true);
    const submissionData = {
      week: 8,
      file_name: uploadedFile ? uploadedFile.name : '',
      url: submissionUrl,
      team_id: 'mock-team-123',
      created_at: new Date().toISOString()
    };

    let success = false;

    if (supabase) {
      try {
        const { error } = await supabase
          .from('challenge_submissions')
          .insert([submissionData]);
        if (error) throw error;
        success = true;
      } catch (err) {
        console.error("Supabase submission error:", err);
        alert('Database error: ' + err.message);
        setSubmitting(false);
        return;
      }
    } else {
      try {
        const list = JSON.parse(localStorage.getItem('challenge_submissions') || '[]');
        list.push(submissionData);
        localStorage.setItem('challenge_submissions', JSON.stringify(list));
        success = true;
      } catch (err) {
        console.error("Local storage error:", err);
      }
    }

    if (success) {
      alert('🎉 Response submitted! +50 XP earned');
      setUploadedFile(null);
      setSubmissionUrl('');
      window.location.reload();
    }
    setSubmitting(false);
  };

  const archiveWeeks = [
    { wk: 1, title: 'The Farmer Interview', status: 'Done ✅', active: false },
    { wk: 2, title: 'The 2AM Insight', status: 'Done ✅', active: false },
    { wk: 3, title: 'The Kirana Walk', status: 'Done ✅', active: false },
    { wk: 4, title: 'The Gig Worker Day', status: 'Done ✅', active: false },
    { wk: 5, title: 'The Persona Challenge', status: 'Done ✅', active: false },
    { wk: 6, title: 'The Business Model', status: 'Done ✅', active: false },
    { wk: 7, title: 'The 1-Page Deck', status: 'Done ✅', active: false },
    { wk: 8, title: '60-Second Pitch', status: 'Live ⚡', active: true },
  ];

  return (
    <>


      <section className="challenge-hero">
        <div className="orb orb--saffron" style={{ width: '500px', height: '500px', top: '-150px', left: '50%', transform: 'translateX(-50%)', opacity: 0.1 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="live-badge" style={{ margin: '0 auto var(--space-lg)', width: 'fit-content' }}>
              <div className="ping-dot"></div>Week 8 — Active Now
            </div>
            <h1 style={{ textAlign: 'center' }}>Bharat Weekly<br /><span className="text-gradient-saffron">Challenge</span></h1>
            <p style={{ maxWidth: '580px', margin: 'var(--space-md) auto 0', fontSize: '1.05rem', textAlign: 'center' }}>
              A new challenge every Monday. Earn 50 XP per submission. Build a 7-day streak for bonus badges. The best responses get featured on the platform.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="container">
        {/* Week Selector */}
        <div className="week-selector">
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i} className={`week-btn ${i === 7 ? 'active' : ''}`}>
              Wk {i + 1} {i === 7 ? '⚡' : ''}
            </button>
          ))}
        </div>

        <div className="challenge-layout">
          <div>
            <RevealOnScroll>
              <div className="current-challenge-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: 'var(--space-xl)' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--saffron)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>⚡ Week 8 · Oct 14–20, 2026</div>
                    <h2 style={{ fontSize: '1.8rem' }}>The 60-Second Pitch</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span className="tag tag--saffron">+50 XP</span>
                    <Countdown targetDate="2026-10-20T23:59:59" id="challenge-countdown" />
                  </div>
                </div>

                <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', borderLeft: '3px solid var(--saffron)', padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
                  <div style={{ fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.75, color: 'var(--text-primary)' }}>
                    &quot;Record a 60-second video pitch of your IdeationX idea to a sceptical jury member. No slides. No props. Just you, your conviction, and your idea. What&apos;s the single most important thing you&apos;d say?&quot;
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--space-xl)' }}>
                  <h5 style={{ marginBottom: 'var(--space-md)' }}>📖 Challenge Guide</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', fontSize: '0.88rem' }}><span style={{ color: 'var(--saffron)', fontWeight: 700, shrink: 0 }}>01.</span><span>Start with the problem, not your solution. Hook them in the first 10 seconds.</span></div>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', fontSize: '0.88rem' }}><span style={{ color: 'var(--saffron)', fontWeight: 700, shrink: 0 }}>02.</span><span>Be specific. Name the Bharat segment you&apos;re solving for.</span></div>
                  </div>
                </div>

                {/* Upload Area */}
                <div className="submit-area" onClick={() => document.getElementById('upload-input').click()}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>📹</div>
                  <div style={{ fontWeight: 700, marginBottom: '8px' }}>
                    {uploadedFile ? `Selected: ${uploadedFile.name}` : 'Upload Your Video Pitch'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>MP4 / MOV · Max 60 seconds · Max 50MB</div>
                  <input type="file" id="upload-input" style={{ display: 'none' }} accept="video/*" onChange={handleFileChange} />
                </div>

                <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-md)' }}>
                  <input 
                    className="form-input" 
                    type="url" 
                    placeholder="Or paste YouTube / Loom link..." 
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-primary" onClick={handleSubmitChallenge} disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit +50 XP'}
                  </button>
                </div>
              </div>
            </RevealOnScroll>

            {/* Featured Responses */}
            <div style={{ marginTop: 'var(--space-2xl)' }}>
              <RevealOnScroll>
                <div className="section-header">
                  <div className="eyebrow">This Week&apos;s Highlights</div>
                  <h3>Featured Responses</h3>
                </div>
              </RevealOnScroll>
              <div style={{ marginTop: 'var(--space-xl)' }}>
                <RevealOnScroll delay={0.05}>
                  <div className="featured-submission">
                    <div className="featured-quote">&quot;Our farmers don&apos;t need more government schemes. They need the confidence that their family will eat even if they don&apos;t come home.&quot;</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--grad-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>PN</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Priya Nair</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>XLRI Jamshedpur · Climate & Farmer</div>
                      </div>
                      <span className="tag tag--teal" style={{ marginLeft: 'auto' }}>⭐ Featured</span>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="challenge-sidebar">
            <RevealOnScroll>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)', marginBottom: 'var(--space-lg)' }}>
                <h5 style={{ marginBottom: 'var(--space-md)' }}>🔥 Your Streak</h5>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                  <div style={{ flex: 1, textAlign: 'center', background: 'var(--teal-dim)', border: '1px solid var(--teal)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--teal)' }}>7</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Week Streak</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--saffron)' }}>350</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>XP Earned</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)', marginBottom: 'var(--space-lg)' }}>
                <h5 style={{ marginBottom: 'var(--space-md)' }}>📚 Challenge Archive</h5>
                <div className="archive-table">
                  {archiveWeeks.map(w => (
                    <div key={w.wk} className="archive-row" style={{ borderColor: w.active ? 'var(--saffron)' : 'var(--glass-border)' }}>
                      <span className={`tag ${w.active ? 'tag--saffron' : 'tag--teal'}`} style={{ justifyContent: 'center' }}>Wk {w.wk}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: w.active ? 700 : 400 }}>{w.title}</span>
                      <span className={`tag ${w.active ? 'tag--saffron' : 'tag--muted'}`}>{w.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </>
  );
}
