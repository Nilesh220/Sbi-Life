import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-md)' }}>
              <Image src="/assets/SBI life logo.webp" alt="SBI Life" width={100} height={28} />
              <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }}></div>
              <Image src="/assets/Ideation x logo.webp" alt="IdeationX" width={90} height={24} style={{ opacity: 0.8 }} />
            </div>
            <p>Bharat Begins With An Idea. © 2026 SBI Life Insurance Co. Ltd.</p>
          </div>

          <div className="footer__col">
            <h6>Competition</h6>
            <div className="footer__links">
              <Link href="/ideationx">Overview</Link>
              <Link href="/themes">Themes</Link>
              <Link href="/register">Register</Link>
            </div>
          </div>

          <div className="footer__col">
            <h6>Learn</h6>
            <div className="footer__links">
              <Link href="/learning-hub">Learning Hub</Link>
              <Link href="/resources">Templates</Link>
            </div>
          </div>

          <div className="footer__col">
            <h6>Community</h6>
            <div className="footer__links">
              <Link href="/community">Discussion Board</Link>
              <Link href="/innovation-score">Innovation Score</Link>
              <Link href="/campus-calendar">Campus Calendar</Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 SBI Life Insurance Co. Ltd. All rights reserved. IdeationX is a registered initiative.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Powered by</span>
            <Image src="/assets/SBI life logo.webp" alt="SBI Life" width={80} height={20} style={{ opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
