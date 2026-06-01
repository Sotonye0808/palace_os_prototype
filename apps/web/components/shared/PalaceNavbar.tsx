'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PalaceNavbarProps {
  active?: 'home' | 'events' | 'reserve' | 'account';
}

export function PalaceNavbar({ active }: PalaceNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', 'secrets-palace');
  }, []);
  const navItems: { label: string; href: string; id: 'home' | 'events' | 'reserve' | 'account' }[] = [
    { label: 'Home', href: '/palace', id: 'home' },
    { label: 'Events', href: '/palace/events', id: 'events' },
    { label: 'Reserve', href: '/palace/reserve', id: 'reserve' },
    { label: 'Account', href: '/account-hub', id: 'account' },
  ];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 40px',
      background: 'rgba(20,20,42,0.7)', backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--color-border)'
    }}>
      <Link href="/palace" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, border: '1px solid var(--color-primary)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)',
          fontSize: 16
        }}>♛</div>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
          SECRETS PALACE
        </span>
      </Link>
      <div className="pnav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {navItems.map(item => (
          <Link key={item.id} href={item.href} style={{
            color: active === item.id ? 'var(--color-text)' : 'var(--color-text-muted)',
            textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
            letterSpacing: '0.05em', textTransform: 'uppercase',
            transition: 'color 0.2s', position: 'relative'
          }}>
            {item.label}
            {active === item.id && (
              <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 1, background: 'var(--color-primary)', borderRadius: 1 }} />
            )}
          </Link>
        ))}
      </div>
      <div className="pnav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/palace/reserve" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 24px', border: '1px solid var(--color-primary)', borderRadius: 6,
          color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600,
          background: 'transparent', cursor: 'pointer', textDecoration: 'none',
          textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.3s'
        }}>
          Book Now
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="pnav-hamburger" style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-text)', fontSize: 24, padding: 4,
        }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99,
          background: 'oklch(14% 0.008 260)', borderBottom: '1px solid var(--color-border)',
          padding: 16, display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {navItems.map(item => (
            <Link key={item.id} href={item.href} style={{
              padding: '10px 16px', borderRadius: 8,
              color: active === item.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
              textDecoration: 'none', fontSize: '1rem', fontWeight: 500,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              background: active === item.id ? 'rgba(212,160,23,0.08)' : 'transparent',
            }} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .pnav-links, .pnav-actions a { display: none !important; }
          .pnav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
