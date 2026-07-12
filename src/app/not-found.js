'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '140px var(--space-lg)' }}>
      <div className="orb orb--saffron" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px', opacity: 0.1 }}></div>
      <div className="orb orb--teal" style={{ width: '300px', height: '300px', bottom: '-80px', right: '-80px', opacity: 0.1 }}></div>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '560px' }}>
        <div style={{ fontSize: 'clamp(5rem, 18vw, 9rem)', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1, color: 'rgba(255,107,26,0.12)', letterSpacing: '-0.05em', marginBottom: 'var(--space-lg)' }}>
          404
        </div>

        <div className="tag tag--saffron" style={{ margin: '0 auto var(--space-lg)', width: 'fit-content' }}>Page Not Found</div>

        <h2 style={{ marginBottom: 'var(--space-md)' }}>
          This Page Is Still<br /><span className="text-gradient-saffron">Being Built.</span>
        </h2>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-2xl)' }}>
          Bharat begins with an idea — and yours starts at registration.
          The page you are looking for does not exist or may have moved.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-2xl)' }}>
          <Link href="/register" className="btn btn-primary btn-lg">Register Your Team</Link>
          <Link href="/" className="btn btn-secondary btn-lg">Go Home</Link>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/themes" className="tag">Themes</Link>
          <Link href="/ideationx" className="tag">IdeationX</Link>
          <Link href="/leaderboard" className="tag">Leaderboard</Link>
          <Link href="/faq" className="tag">FAQ</Link>
        </div>
      </div>
    </section>
  );
}
