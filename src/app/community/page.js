'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IdeationXData } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import RevealOnScroll from '@/components/RevealOnScroll';

function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + "y ago";
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + "mo ago";
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + "d ago";
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + "h ago";
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + "m ago";
  return "Just now";
}

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [composeCategory, setComposeCategory] = useState('Insight');
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    let dbPosts = [];

    if (supabase) {
      try {
        let query = supabase.from('posts').select('*').order('created_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw error;
        dbPosts = data.map(p => ({
          id: p.id,
          name: p.author_name,
          college: p.author_college,
          avatar: p.author_name.split(' ').map(n => n[0]).join(''),
          color: p.avatar_color || '#FF6B1A',
          theme: p.category,
          time: formatTimeAgo(p.created_at),
          text: p.content,
          likes: p.likes || 0,
          replies: p.replies || 0
        }));
      } catch (err) {
        console.error("Supabase load error, falling back:", err);
        dbPosts = getFallbackPosts();
      }
    } else {
      dbPosts = getFallbackPosts();
    }
    setPosts(dbPosts);
    setLoading(false);
  };

  const getFallbackPosts = () => {
    const local = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('community_posts') || '[]') : [];
    const base = IdeationXData?.communityPosts || [];
    return [...local, ...base];
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (id, currentLikes, idx) => {
    // Update locally
    const updated = [...posts];
    updated[idx].likes = currentLikes + 1;
    setPosts(updated);

    if (supabase && id) {
      try {
        await supabase.rpc('increment_likes', { post_id: id });
      } catch (err) {
        console.error("Supabase update error:", err);
      }
    }
  };

  const handleSubmitPost = async () => {
    if (!postText.trim()) {
      alert('Please write something first.');
      return;
    }

    const postData = {
      author_name: 'Aisha Khan',
      author_college: 'FMS Delhi',
      avatar_color: '#FF6B1A',
      category: composeCategory,
      content: postText,
      likes: 0,
      replies: 0,
      created_at: new Date().toISOString()
    };

    let success = false;

    if (supabase) {
      try {
        const { error } = await supabase.from('posts').insert([postData]);
        if (error) throw error;
        success = true;
      } catch (err) {
        console.error("Supabase insert post error:", err);
        alert('Database error: ' + err.message);
        return;
      }
    } else {
      try {
        const list = JSON.parse(localStorage.getItem('community_posts') || '[]');
        list.unshift({
          name: postData.author_name,
          college: postData.author_college,
          avatar: 'AK',
          color: postData.avatar_color,
          theme: postData.category,
          time: 'Just now',
          text: postData.content,
          likes: 0,
          replies: 0
        });
        localStorage.setItem('community_posts', JSON.stringify(list));
        success = true;
      } catch (e) {
        console.error(e);
      }
    }

    if (success) {
      alert('🎉 Post shared! +10 XP earned');
      setPostText('');
      fetchPosts();
    }
  };

  const filteredPosts = posts.filter(p => {
    if (activeFilter === 'all') return true;
    return p.theme?.toLowerCase().includes(activeFilter.toLowerCase()) || p.category?.toLowerCase() === activeFilter.toLowerCase();
  });

  const topContributors = [
    { name: 'Vikram Singh', college: 'IIM Lucknow', avatar: 'VS', color: '#F5C842', score: '1,240 XP' },
    { name: 'Priya Nair', college: 'XLRI Jamshedpur', avatar: 'PN', color: '#00D4B8', score: '1,180 XP' },
    { name: 'Aisha Khan', college: 'FMS Delhi', avatar: 'AK', color: '#FF6B1A', score: '450 XP' },
    { name: 'Sneha Reddy', college: 'NMIMS Mumbai', avatar: 'SR', color: '#00B5EF', score: '380 XP' },
    { name: 'Rohan Mehta', college: 'MICA Ahmedabad', avatar: 'RM', color: '#C855FF', score: '310 XP' },
  ];

  return (
    <>


      <section style={{ padding: '140px 0 40px', position: 'relative' }}>
        <div className="orb orb--teal" style={{ width: '300px', height: '300px', top: '-100px', right: 0, opacity: 0.2 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--teal" style={{ marginBottom: 'var(--space-lg)' }}>300K Student Reach · 200 B Schools</div>
            <h1>The <span className="text-gradient-teal">Community</span></h1>
            <p style={{ maxWidth: '600px', marginTop: 'var(--space-md)', fontSize: '1.05rem' }}>
              Connect with fellow innovators, find team members, share insights, and get peer feedback on your ideas. IdeationX is better together.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="container">
        <div className="community-layout">
          <div>
            {/* Filter Tabs */}
            <div className="filter-tabs reveal" style={{ marginBottom: 'var(--space-xl)' }}>
              <button className={`filter-tab ${activeFilter === 'all' ? 'filter-tab--active' : ''}`} onClick={() => setActiveFilter('all')}>All Posts</button>
              <button className={`filter-tab ${activeFilter === 'team' ? 'filter-tab--active' : ''}`} onClick={() => setActiveFilter('team')}>🤝 Team Finder</button>
              <button className={`filter-tab ${activeFilter === 'insight' ? 'filter-tab--active' : ''}`} onClick={() => setActiveFilter('insight')}>💡 Insights</button>
              <button className={`filter-tab ${activeFilter === 'question' ? 'filter-tab--active' : ''}`} onClick={() => setActiveFilter('question')}>❓ Questions</button>
            </div>

            {/* Compose Box */}
            <RevealOnScroll>
              <div className="compose-box">
                <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--grad-saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', shrink: 0 }}>AK</div>
                  <textarea 
                    placeholder="Share an insight, ask a question, or find a team member..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                </div>
                <div className="compose-footer">
                  <div className="filter-tabs">
                    <button className={`filter-tab ${composeCategory === 'Insight' ? 'filter-tab--active' : ''}`} onClick={() => setComposeCategory('Insight')} style={{ fontSize: '0.78rem' }}>Insight</button>
                    <button className={`filter-tab ${composeCategory === 'Team Finder' ? 'filter-tab--active' : ''}`} onClick={() => setComposeCategory('Team Finder')} style={{ fontSize: '0.78rem' }}>Team Finder</button>
                    <button className={`filter-tab ${composeCategory === 'Question' ? 'filter-tab--active' : ''}`} onClick={() => setComposeCategory('Question')} style={{ fontSize: '0.78rem' }}>Question</button>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={handleSubmitPost}>Post → +10 XP</button>
                </div>
              </div>
            </RevealOnScroll>

            {/* Posts Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {loading ? (
                <div style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--text-muted)' }}>Loading posts...</div>
              ) : filteredPosts.length === 0 ? (
                <div style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--text-muted)' }}>No posts found.</div>
              ) : (
                filteredPosts.map((p, idx) => (
                  <RevealOnScroll key={p.id || idx}>
                    <div className="community-post">
                      <div className="community-post__header">
                        <div className="community-post__avatar" style={{ background: p.color }}>{p.avatar}</div>
                        <div className="community-post__meta">
                          <div className="community-post__name">{p.name}</div>
                          <div className="community-post__college">{p.college}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                          <span className="tag tag--muted">{p.theme}</span>
                          <span className="community-post__time">{p.time}</span>
                        </div>
                      </div>
                      <div className="community-post__body">{p.text}</div>
                      <div className="community-post__footer">
                        <button className="community-post__action" onClick={() => handleLike(p.id, p.likes, idx)}>
                          ❤️ {p.likes}
                        </button>
                        <button className="community-post__action">💬 {p.replies} replies</button>
                        <button className="community-post__action" onClick={() => alert('Post link copied!')}>🔗 Share</button>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="community-sidebar">
            <RevealOnScroll>
              <div className="sidebar-card">
                <h5 style={{ marginBottom: 'var(--space-md)' }}>🔥 Top Contributors</h5>
                {topContributors.map(m => (
                  <div className="top-member" key={m.name}>
                    <div className="top-member__avatar" style={{ background: m.color }}>{m.avatar}</div>
                    <div>
                      <div className="top-member__name">{m.name}</div>
                      <div className="top-member__college">{m.college}</div>
                    </div>
                    <div className="top-member__score">{m.score}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="sidebar-card">
                <h5 style={{ marginBottom: 'var(--space-md)' }}>🏷️ Trending Topics</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                  <span className="tag tag--saffron">#IdeationX2026</span>
                  <span className="tag tag--teal">#DIVEFramework</span>
                  <span className="tag tag--gold">#KiranaToInsurance</span>
                  <span className="tag tag--muted">#GigWorkers</span>
                  <span className="tag tag--muted">#GenZInsurance</span>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="sidebar-card">
                <h5 style={{ marginBottom: 'var(--space-md)' }}>🤝 Team Finder Spotlight</h5>
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(0,212,184,0.2)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>Rohan M. · MICA Ahmedabad</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>Theme: Kirana to Coverage 🏪</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Looking for a product designer or UX person. Have strong distribution model. DM!</p>
                  <button className="btn btn-teal btn-sm" style={{ marginTop: 'var(--space-sm)', width: '100%', justifyContent: 'center' }} onClick={() => alert('Connection request sent!')}>
                    Connect →
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </>
  );
}
