'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileRegisterCTA() {
  const pathname = usePathname();
  if (pathname === '/register') return null;

  return (
    <div className="mobile-cta-bar" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      padding: '12px 16px',
      background: 'rgba(2,4,8,0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255,107,26,0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Registration Open</div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>\u20b910L Prize \u00b7 CNBC Coverage \u00b7 PPI</div>
      </div>
      <Link href="/register" className="btn btn-primary btn-sm" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
        Register Now \u2192
      </Link>
    </div>
  );
}
