'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IdeationXData } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import RevealOnScroll from '@/components/RevealOnScroll';
import Countdown from '@/components/Countdown';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // Form State
  const [leadInfo, setLeadInfo] = useState({
    firstName: '',
    lastName: '',
    collegeName: '',
    course: '',
    year: '',
    email: '',
    phone: ''
  });
  
  const [teamName, setTeamName] = useState('');
  const [member2, setMember2] = useState({ name: '', email: '', course: '', phone: '' });
  const [member3, setMember3] = useState({ name: '', email: '', course: '', phone: '' });
  const [selectedThemeId, setSelectedThemeId] = useState(null);

  // College Validation Search State
  const [collegeSearch, setCollegeSearch] = useState('');
  const [collegeValidation, setCollegeValidation] = useState({ show: false, valid: false, matchName: '' });

  const handleCheckCollege = (val) => {
    setCollegeSearch(val);
    if (!val || val.length < 3) {
      setCollegeValidation({ show: false, valid: false, matchName: '' });
      return;
    }
    const colleges = IdeationXData?.campusCalendar?.map(c => c.college) || [];
    const match = colleges.find(c => c.toLowerCase().includes(val.toLowerCase()));
    if (match) {
      setCollegeValidation({ show: true, valid: true, matchName: match });
      setLeadInfo(prev => ({ ...prev, collegeName: match }));
    } else {
      setCollegeValidation({ show: true, valid: false, matchName: '' });
    }
  };

  const handleSelectTheme = (id) => {
    setSelectedThemeId(id);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!leadInfo.firstName || !leadInfo.lastName || !leadInfo.collegeName || !leadInfo.course || !leadInfo.year || !leadInfo.email || !leadInfo.phone) {
        alert('Please fill out all required fields marked with *');
        return;
      }
    } else if (step === 2) {
      if (!teamName || !member2.name || !member2.email || !member3.name || !member3.email) {
        alert('Please fill out all required team fields');
        return;
      }
    } else if (step === 3) {
      if (!selectedThemeId) {
        alert('Please select a challenge theme');
        return;
      }
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    const registrationData = {
      team_name: teamName,
      lead_first_name: leadInfo.firstName,
      lead_last_name: leadInfo.lastName,
      college: leadInfo.collegeName,
      course: leadInfo.course,
      year: leadInfo.year,
      email: leadInfo.email,
      phone: leadInfo.phone,
      member_2_name: member2.name,
      member_2_email: member2.email,
      member_2_course: member2.course,
      member_2_phone: member2.phone,
      member_3_name: member3.name,
      member_3_email: member3.email,
      member_3_course: member3.course,
      member_3_phone: member3.phone,
      theme_id: selectedThemeId,
      created_at: new Date().toISOString()
    };

    let success = false;

    if (supabase) {
      try {
        const { error } = await supabase
          .from('registrations')
          .insert([registrationData]);
        if (error) throw error;
        success = true;
      } catch (err) {
        console.error("Supabase insert error:", err);
        alert('Database error: ' + err.message);
        return;
      }
    } else {
      try {
        const list = JSON.parse(localStorage.getItem('registrations') || '[]');
        list.push(registrationData);
        localStorage.setItem('registrations', JSON.stringify(list));
        success = true;
      } catch (err) {
        console.error("Local storage error:", err);
      }
    }

    if (success) {
      alert('🎉 Registration submitted successfully! Check your B School email.');
      router.push('/');
    }
  };

  const selectedThemeObj = IdeationXData.themes.find(t => t.id === selectedThemeId);

  return (
    <>


      <section style={{ padding: '140px 0 40px', position: 'relative' }}>
        <div className="orb orb--teal" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', opacity: 0.2 }}></div>
        <div className="container">
          <RevealOnScroll>
            <div className="tag tag--teal" style={{ marginBottom: 'var(--space-lg)' }}>Registration Open</div>
            <h1>Register Your<br /><span className="text-gradient-teal">Team</span></h1>
            <p style={{ marginTop: 'var(--space-md)', fontSize: '1.05rem' }}>3 steps. 5 minutes. Your shot at ₹10 Lakh + CNBC coverage + PPI offers from SBI Life.</p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="container">
        <div className="register-layout">
          <div>
            {/* Step Indicators */}
            <div className="step-indicator anim-fade-up" style={{ marginBottom: '60px' }}>
              <div className={`step-dot ${step === 1 ? 'step-dot--active' : step > 1 ? 'step-dot--done' : ''}`}>
                1
                <span className="step-label" style={{ color: step === 1 ? 'var(--saffron)' : step > 1 ? 'var(--teal)' : 'var(--text-muted)' }}>Your Details</span>
              </div>
              <div className={`step-line ${step > 1 ? 'step-line--done' : ''}`}></div>
              <div className={`step-dot ${step === 2 ? 'step-dot--active' : step > 2 ? 'step-dot--done' : ''}`}>
                2
                <span className="step-label" style={{ color: step === 2 ? 'var(--saffron)' : step > 2 ? 'var(--teal)' : 'var(--text-muted)' }}>Your Team</span>
              </div>
              <div className={`step-line ${step > 2 ? 'step-line--done' : ''}`}></div>
              <div className={`step-dot ${step === 3 ? 'step-dot--active' : step > 3 ? 'step-dot--done' : ''}`}>
                3
                <span className="step-label" style={{ color: step === 3 ? 'var(--saffron)' : step > 3 ? 'var(--teal)' : 'var(--text-muted)' }}>Your Theme</span>
              </div>
              <div className={`step-line ${step > 3 ? 'step-line--done' : ''}`}></div>
              <div className={`step-dot ${step === 4 ? 'step-dot--active' : ''}`}>
                ✓
                <span className="step-label" style={{ color: step === 4 ? 'var(--teal)' : 'var(--text-muted)' }}>Confirm</span>
              </div>
            </div>

            <div className="register-form-card anim-fade-up">
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <h3 style={{ marginBottom: 'var(--space-xs)' }}>Your Details</h3>
                  <p style={{ fontSize: '0.88rem', marginBottom: 'var(--space-xl)' }}>You&apos;ll be registered as the team lead.</p>

                  <div className="eligibility-checker">
                    <label className="form-label" htmlFor="college-search">🔍 Check Your B School Eligibility</label>
                    <input 
                      className="form-input" 
                      id="college-search" 
                      type="text" 
                      placeholder="Start typing your B School name..." 
                      value={collegeSearch}
                      onChange={(e) => handleCheckCollege(e.target.value)}
                      style={{ marginTop: 'var(--space-sm)' }}
                    />
                    {collegeValidation.show && (
                      <div className={`college-result ${collegeValidation.valid ? 'college-result--valid' : 'college-result--invalid'}`}>
                        {collegeValidation.valid 
                          ? `✅ ${collegeValidation.matchName} is a partner B School. You can register!`
                          : `⚠️ We couldn't find your B School in our partner list. Contact support.`
                        }
                      </div>
                    )}
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="first-name">First Name *</label>
                      <input 
                        className="form-input" 
                        id="first-name" 
                        type="text" 
                        placeholder="Aryan"
                        value={leadInfo.firstName}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="last-name">Last Name *</label>
                      <input 
                        className="form-input" 
                        id="last-name" 
                        type="text" 
                        placeholder="Mehta"
                        value={leadInfo.lastName}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
                    <label className="form-label" htmlFor="college-name">B School Name *</label>
                    <input 
                      className="form-input" 
                      id="college-name" 
                      type="text" 
                      placeholder="IIM Ahmedabad"
                      value={leadInfo.collegeName}
                      onChange={(e) => setLeadInfo(prev => ({ ...prev, collegeName: e.target.value }))}
                    />
                  </div>

                  <div className="form-grid" style={{ marginTop: 'var(--space-md)' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="course">Course / Programme *</label>
                      <select 
                        className="form-input form-select" 
                        id="course"
                        value={leadInfo.course}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, course: e.target.value }))}
                      >
                        <option value="">Select Course</option>
                        <option>MBA / PGDM</option>
                        <option>BBA / BMS</option>
                        <option>B.Tech / B.E.</option>
                        <option>B.Com</option>
                        <option>LLB / LLM</option>
                        <option>BA / BSc</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="year">Year of Study *</label>
                      <select 
                        className="form-input form-select" 
                        id="year"
                        value={leadInfo.year}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, year: e.target.value }))}
                      >
                        <option value="">Select Year</option>
                        <option>Year 1</option>
                        <option>Year 2</option>
                        <option>Year 3</option>
                        <option>Year 4</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid" style={{ marginTop: 'var(--space-md)' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">B School Email *</label>
                      <input 
                        className="form-input" 
                        id="email" 
                        type="email" 
                        placeholder="aryan@iima.ac.in"
                        value={leadInfo.email}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone Number *</label>
                      <input 
                        className="form-input" 
                        id="phone" 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        value={leadInfo.phone}
                        onChange={(e) => setLeadInfo(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-xl)' }} onClick={handleNextStep}>
                    Continue — Add Team Members →
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h3 style={{ marginBottom: 'var(--space-xs)' }}>Your Team</h3>
                  <p style={{ fontSize: '0.88rem', marginBottom: 'var(--space-xl)' }}>IdeationX requires teams of exactly 3 members. Add your 2 teammates below.</p>

                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <label className="form-label">Team Name *</label>
                    <input 
                      className="form-input" 
                      type="text" 
                      placeholder="e.g., The Bharat Builders" 
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      style={{ marginTop: 'var(--space-sm)' }}
                    />
                  </div>

                  <div className="form-label" style={{ marginBottom: 'var(--space-md)' }}>Team Member 2</div>
                  <div className="team-member-row">
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input className="form-input" type="text" placeholder="Priya Nair" value={member2.name} onChange={(e) => setMember2(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" placeholder="priya@bschool.ac.in" value={member2.email} onChange={(e) => setMember2(prev => ({ ...prev, email: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Course</label>
                      <input className="form-input" type="text" placeholder="MBA Year 2" value={member2.course} onChange={(e) => setMember2(prev => ({ ...prev, course: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input" type="tel" placeholder="+91 ..." value={member2.phone} onChange={(e) => setMember2(prev => ({ ...prev, phone: e.target.value }))} />
                    </div>
                  </div>

                  <div className="form-label" style={{ marginBottom: 'var(--space-md)' }}>Team Member 3</div>
                  <div className="team-member-row">
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input className="form-input" type="text" placeholder="Rohit Verma" value={member3.name} onChange={(e) => setMember3(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" placeholder="rohit@bschool.ac.in" value={member3.email} onChange={(e) => setMember3(prev => ({ ...prev, email: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Course</label>
                      <input className="form-input" type="text" placeholder="B.Tech Year 3" value={member3.course} onChange={(e) => setMember3(prev => ({ ...prev, course: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input" type="tel" placeholder="+91 ..." value={member3.phone} onChange={(e) => setMember3(prev => ({ ...prev, phone: e.target.value }))} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                    <button className="btn btn-ghost btn-lg" style={{ flex: 1, justifyContent: 'center' }} onClick={handlePrevStep}>← Back</button>
                    <button className="btn btn-primary btn-lg" style={{ flex: 2, justifyContent: 'center' }} onClick={handleNextStep}>Continue — Choose Theme →</button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h3 style={{ marginBottom: 'var(--space-xs)' }}>Choose Your Theme</h3>
                  <p style={{ fontSize: '0.88rem', marginBottom: 'var(--space-xl)' }}>Select exactly one of the 5 challenge themes. You can only change your selection before the submission deadline.</p>

                  <div className="theme-select-grid">
                    {IdeationXData.themes.map(t => (
                      <label 
                        key={t.id} 
                        className={`theme-radio ${selectedThemeId === t.id ? 'selected' : ''}`} 
                        onClick={() => handleSelectTheme(t.id)} 
                        style={{ '--tc': t.color }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>{t.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.entries.toLocaleString()} entries across editions</div>
                        </div>
                        <div className="theme-radio__check" style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--glass-border)', shrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', transition: 'all 0.2s', background: selectedThemeId === t.id ? t.color : 'transparent', borderColor: selectedThemeId === t.id ? t.color : 'var(--glass-border)' }}>
                          {selectedThemeId === t.id && '✓'}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                    <button className="btn btn-ghost btn-lg" style={{ flex: 1, justifyContent: 'center' }} onClick={handlePrevStep}>← Back</button>
                    <button className="btn btn-primary btn-lg" style={{ flex: 2, justifyContent: 'center' }} onClick={handleNextStep}>Review & Submit →</button>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>🎉</div>
                  <h3 style={{ marginBottom: 'var(--space-md)' }}>Almost There!</h3>
                  <p style={{ marginBottom: 'var(--space-xl)' }}>Review your registration details, then submit. You&apos;ll get a confirmation email immediately with your team ID.</p>
                  <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', textAlign: 'left', marginBottom: 'var(--space-xl)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                      <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Team Lead</div><div style={{ fontWeight: 600 }}>{leadInfo.firstName} {leadInfo.lastName}</div></div>
                      <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>B School</div><div style={{ fontWeight: 600 }}>{leadInfo.collegeName}</div></div>
                      <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Team Size</div><div style={{ fontWeight: 600 }}>3 Members</div></div>
                      <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Theme</div><div style={{ fontWeight: 600, color: selectedThemeObj?.color }}>{selectedThemeObj?.name} {selectedThemeObj?.icon}</div></div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                    <button className="btn btn-ghost btn-lg" onClick={handlePrevStep}>← Edit</button>
                    <button className="btn btn-primary btn-lg" onClick={handleSubmit}>🚀 Submit Registration</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="register-sidebar">
            <div className="sidebar-info reveal">
              <h5 style={{ marginBottom: 'var(--space-md)' }}>⏰ Time Left to Register</h5>
              <Countdown targetDate="2026-09-30T23:59:59" id="register-countdown" />
            </div>

            <div className="sidebar-info reveal reveal--delay-1">
              <h5 style={{ marginBottom: 'var(--space-md)' }}>✅ Eligibility Checklist</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)' }}>✓</span> Student at a partner B School</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)' }}>✓</span> Team of exactly 3 students</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)' }}>✓</span> All members same B School</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '0.88rem' }}><span style={{ color: 'var(--teal)' }}>✓</span> No team member in 2 teams</div>
              </div>
            </div>

            <div className="sidebar-info reveal reveal--delay-2">
              <h5 style={{ marginBottom: 'var(--space-md)' }}>📋 What Happens Next</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--saffron-dim)', border: '1px solid var(--saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color: 'var(--saffron)', shrink: 0 }}>1</div>
                  <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Confirmation Email</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>With your Team ID and submission portal link</div></div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--teal-dim)', border: '1px solid var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color: 'var(--teal)', shrink: 0 }}>2</div>
                  <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Upload Your Entry</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Video pitch + 8-10 slide deck by Sep 30</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 'var(--space-3xl)' }}></div>
    </>
  );
}
