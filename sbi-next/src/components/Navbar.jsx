'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <div className="scroll-progress-bar" id="scroll-progress"></div>
      <nav className="nav" id="main-nav">
        <div className="container">
          <div className="nav__inner">
            <Link href="/" className="nav__logo">
              <div className="nav__logo-capsule">
                <Image src="/assets/SBI life logo.webp" alt="SBI Life" width={100} height={28} priority />
              </div>
              <div className="nav__divider"></div>
              <Image src="/assets/Ideation x logo.webp" alt="IdeationX" width={90} height={24} style={{ opacity: 0.85 }} />
            </Link>

            <div className="nav__links">
              <Link href="/" className={`nav__link ${isActive('/') && pathname === '/' ? 'nav__link--active' : ''}`}>Home</Link>
              <Link href="/ideationx" className={`nav__link ${isActive('/ideationx') ? 'nav__link--active' : ''}`}>IdeationX</Link>
              <Link href="/themes" className={`nav__link ${isActive('/themes') ? 'nav__link--active' : ''}`}>Themes</Link>
              <Link href="/register" className={`nav__link ${isActive('/register') ? 'nav__link--active' : ''}`}>Register</Link>

              <div className="nav__dropdown">
                <div className={`nav__dropdown-toggle nav__link ${isActive('/learning-hub') || isActive('/resources') || isActive('/mentor-connect') ? 'nav__link--active' : ''}`}>
                  Learn <span style={{ fontSize: '0.7rem', marginLeft: '2px' }}>▼</span>
                </div>
                <div className="nav__dropdown-menu">
                  <Link href="/learning-hub" className="nav__dropdown-item">Learning Hub</Link>
                  <Link href="/resources" className="nav__dropdown-item">Resources</Link>
                  <Link href="/mentor-connect" className="nav__dropdown-item">Mentor Connect</Link>
                </div>
              </div>

              <div className="nav__dropdown">
                <div className={`nav__dropdown-toggle nav__link ${isActive('/community') || isActive('/idea-hub') || isActive('/weekly-challenge') || isActive('/campus-calendar') || isActive('/innovation-score') ? 'nav__link--active' : ''}`}>
                  Engage <span style={{ fontSize: '0.7rem', marginLeft: '2px' }}>▼</span>
                </div>
                <div className="nav__dropdown-menu">
                  <Link href="/community" className="nav__dropdown-item">Community</Link>
                  <Link href="/idea-hub" className="nav__dropdown-item">Idea Hub</Link>
                  <Link href="/weekly-challenge" className="nav__dropdown-item">Weekly Challenge</Link>
                  <Link href="/campus-calendar" className="nav__dropdown-item">Campus Calendar</Link>
                  <Link href="/innovation-score" className="nav__dropdown-item">Innovation Score</Link>
                </div>
              </div>
            </div>

            <div className="nav__actions">
              <Link href="/leaderboard" className="btn btn-primary btn-sm">Leaderboard</Link>
              <button className="nav__hamburger" onClick={() => setMobileOpen(true)}>
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
        <button className="mobile-menu__close" onClick={() => setMobileOpen(false)}>✕</button>
        <div className="mobile-menu__links">
          <Link href="/" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>🏠 Home</Link>
          <Link href="/ideationx" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>📋 IdeationX</Link>
          <Link href="/themes" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>🎯 Themes</Link>
          <Link href="/register" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>📝 Register</Link>
          <Link href="/leaderboard" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>🏆 Leaderboard</Link>
          <Link href="/learning-hub" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>📚 Learning Hub</Link>
          <Link href="/community" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>💬 Community</Link>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Link href="/register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
            Register Now →
          </Link>
        </div>
      </div>
    </>
  );
}
