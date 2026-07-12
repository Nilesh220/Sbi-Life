'use client';

import Link from 'next/link';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--glass-border)', background: 'var(--bg-deep)', padding: 'var(--space-3xl) 0 var(--space-xl)' }}>
      <div className="container">
        <div className="footer__grid" style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: 'var(--space-2xl)', marginBottom: 'var(--space-3xl)' }}>
          <div className="footer__brand" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Image src="/assets/SBI life logo.webp" alt="SBI Life" width={110} height={30} />
              <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }}></div>
              <Image src="/assets/Ideation x logo.webp" alt="IdeationX" width={95} height={26} style={{ opacity: 0.8 }} />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '320px', margin: 0 }}>
              Bharat Begins With An Idea. A national platform by SBI Life to foster social innovation among B-School minds.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: 'var(--space-sm)' }}>
              {/* Social Icons */}
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--saffron)';
                    e.currentTarget.style.borderColor = 'var(--saffron)';
                    e.currentTarget.style.background = 'rgba(255,107,26,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{platform[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer__col" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h6 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Competition</h6>
            <div className="footer__links" style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <Link href="/ideationx" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Overview & Prizes</Link>
              <Link href="/themes" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>5 Challenge Themes</Link>
              <Link href="/campus-calendar" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Campus Calendar</Link>
              <Link href="/register" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Team Registration</Link>
            </div>
          </div>

          <div className="footer__col" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h6 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Resources</h6>
            <div className="footer__links" style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <Link href="/learning-hub" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>DIVE Learning Hub</Link>
              <Link href="/submission-guidelines" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Submission Guide</Link>
              <Link href="/resources" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Deck Template</Link>
              <Link href="/faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>FAQs</Link>
            </div>
          </div>

          <div className="footer__col" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h6 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Support</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div>Have queries or issues?</div>
              <a href="mailto:ideationx@sbilife.co.in" style={{ color: 'var(--teal)', fontWeight: 600, textDecoration: 'none' }}>ideationx@sbilife.co.in</a>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Response time: &lt; 24 Hours</div>
            </div>
          </div>
        </div>

        <div className="footer__bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)', paddingTop: 'var(--space-xl)', borderTop: '1px solid var(--glass-border)' }}>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            © 2026 SBI Life Insurance Co. Ltd. All rights reserved. Trade logo displayed above belongs to State Bank of India and is used by SBI Life under license.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Powered by</span>
            <Image src="/assets/SBI life logo.webp" alt="SBI Life" width={80} height={20} style={{ opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

