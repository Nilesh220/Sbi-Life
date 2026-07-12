'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileRegisterCTA() {
  const pathname = usePathname();
  if (pathname === '/register') return null;

  return (
    <div className="mobile-cta-bar">
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Registration Open</div>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          ₹10L Pool • PPI • CNBC
        </div>
      </div>
      <Link href="/register" className="btn btn-primary btn-sm" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
        Register Now →
      </Link>
    </div>
  );
}

