'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IdeationXData } from '@/lib/data';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function CampusCalendarPage() {
  const { campusCalendar } = IdeationXData;
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeState, setActiveState] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRSVP = (college) => {
    alert(`RSVP confirmed for ${college}! Details sent to your email.`);
  };

  const filteredCalendar = campusCalendar.filter(e => {
    const matchesStatus = activeStatus === 'all' || e.status === activeStatus;
    const matchesState = activeState === 'all' || e.state === activeState;
    const matchesSearch = searchQuery === '' || 
      e.college.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesState && matchesSearch;
  });

  const states = ['Maharashtra', 'Delhi', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'];

  return (
    <>


      <section style={{ padding: '140px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb--teal" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', opacity: 0.2 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--teal" style={{ marginBottom: 'var(--space-lg)' }}>200 B Schools · India-Wide</div>
            <h1>Campus Drive <span className="text-gradient-teal">Calendar</span></h1>
            <p style={{ maxWidth: '600px', marginTop: 'var(--space-md)', fontSize: '1.05rem' }}>
              SBI Life visited 200 B Schools across India for the IdeationX 2026 campus induction. Find your B School, your induction date, and RSVP for upcoming sessions.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="container">
        {/* Stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }} className="reveal">
          <div style={{ textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
            <div className="home-stat-num text-gradient-teal">24</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>Completed Sessions</div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
            <div className="home-stat-num text-gradient-saffron">6</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>Upcoming Sessions</div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
            <div className="home-stat-num text-gradient-gold">15</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>States Covered</div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
            <div className="home-stat-num" style={{ background: 'linear-gradient(135deg,#C855FF,#00B5EF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>300K+</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>Student Reach</div>
          </div>
        </div>

        {/* Map placeholder */}
        <RevealOnScroll delay={0.1}>
          <div className="map-placeholder">
            <div className="orb orb--saffron" style={{ width: '300px', height: '300px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.12 }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🗺️</div>
              <h4>India Campus Map</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'var(--space-sm)' }}>Interactive India map coming soon.<br />200 B School pins across 15 states.</p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="calendar-layout">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: 'var(--space-xl)' }} className="reveal">
              <div className="filter-tabs">
                <button className={`filter-tab ${activeStatus === 'all' ? 'filter-tab--active' : ''}`} onClick={() => setActiveStatus('all')}>All ({campusCalendar.length})</button>
                <button className={`filter-tab ${activeStatus === 'done' ? 'filter-tab--active' : ''}`} onClick={() => setActiveStatus('done')}>✅ Completed (24)</button>
                <button className={`filter-tab ${activeStatus === 'upcoming' ? 'filter-tab--active' : ''}`} onClick={() => setActiveStatus('upcoming')}>⏳ Upcoming (6)</button>
              </div>
              <input 
                className="form-input" 
                type="text" 
                placeholder="🔍 Search college or city..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ maxWidth: '280px' }}
              />
            </div>

            <div className="calendar-events">
              {filteredCalendar.length === 0 ? (
                <div style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--text-muted)' }}>No events found.</div>
              ) : (
                filteredCalendar.map((e, idx) => (
                  <RevealOnScroll key={e.college} delay={idx * 0.03}>
                    <div className={`cal-event ${e.status === 'done' ? 'status-done' : 'status-upcoming'}`}>
                      <div className="cal-event__date">
                        <div className="cal-event__day">{e.day}</div>
                        <div className="cal-event__month">{e.month}</div>
                      </div>
                      <div className="cal-event__info">
                        <div className="cal-event__college">{e.college}</div>
                        <div className="cal-event__city">📍 {e.city}, {e.state}</div>
                      </div>
                      {e.status === 'done' ? (
                        <span className="tag tag--teal" style={{ shrink: 0 }}>✅ Completed</span>
                      ) : (
                        <button className="btn btn-primary btn-sm cal-event__rsvp" onClick={() => handleRSVP(e.college)}>RSVP →</button>
                      )}
                    </div>
                  </RevealOnScroll>
                ))
              )}
            </div>
          </div>

          <div className="cal-sidebar">
            <RevealOnScroll>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)', marginBottom: 'var(--space-lg)' }}>
                <h5 style={{ marginBottom: 'var(--space-md)' }}>Filter by State</h5>
                <div className="state-filter">
                  <button className={`state-btn ${activeState === 'all' ? 'active' : ''}`} onClick={() => setActiveState('all')}>All States</button>
                  {states.map(s => (
                    <button key={s} className={`state-btn ${activeState === s ? 'active' : ''}`} onClick={() => setActiveState(s)}>{s}</button>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div style={{ background: 'linear-gradient(135deg,rgba(255,107,26,0.1),rgba(0,212,184,0.05))', border: '1px solid rgba(255,107,26,0.2)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)' }}>
                <h5 style={{ marginBottom: 'var(--space-sm)' }}>📌 Your B School Not Listed?</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>We&apos;re continuously adding B Schools to IdeationX 2026. Contact us to nominate your institution.</p>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('Nomination form coming soon!')}>Nominate My B School</button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </>
  );
}
