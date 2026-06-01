'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BukkaNavbarProps {
  active?: 'home' | 'menu' | 'cart' | 'account';
}

export function BukkaNavbar({ active }: BukkaNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', 'folixx-bukka');
  }, []);
  const navItems: { label: string; href: string; id: 'home' | 'menu' | 'cart' | 'account' }[] = [
    { label: 'Home', href: '/bukka', id: 'home' },
    { label: 'Menu', href: '/bukka/menu', id: 'menu' },
    { label: 'Cart', href: '/bukka/cart', id: 'cart' },
    { label: 'Account', href: '/account-hub', id: 'account' },
  ];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 40px', background: 'var(--color-card)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
    }}>
      <Link href="/bukka" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, background: 'var(--color-primary)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 16, fontFamily: "'Playfair Display', Georgia, serif"
        }}>B</div>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary)' }}>
          FoliXx Bukka
        </span>
      </Link>
      <div className="bnav-links" style={{ display: 'flex', gap: 24 }}>
        {navItems.map(item => (
          <Link key={item.id} href={item.href} style={{
            color: active === item.id ? 'var(--color-text)' : 'var(--color-text-muted)',
            textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
            transition: 'color 0.2s', position: 'relative'
          }}>
            {item.label}
            {active === item.id && (
              <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: 'var(--color-primary)', borderRadius: 1 }} />
            )}
          </Link>
        ))}
      </div>
      <div className="bnav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/bukka/cart" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 16px', background: 'var(--color-card)',
          border: '1px solid var(--color-border)', borderRadius: 9999,
          color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600,
          cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s'
        }}>
          Cart
        </Link>
        <Link href="/account-hub" style={{
          padding: '8px 20px', border: '1px solid var(--color-border)', borderRadius: 9999,
          background: 'transparent', color: 'var(--color-text)', fontSize: '0.875rem', fontWeight: 500,
          cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s'
        }}>
          Sign In
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="bnav-hamburger" style={{
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
          background: 'var(--color-card)', borderBottom: '1px solid var(--color-border)',
          padding: 16, display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {navItems.map(item => (
            <Link key={item.id} href={item.href} style={{
              padding: '10px 16px', borderRadius: 8,
              color: active === item.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
              textDecoration: 'none', fontSize: '1rem', fontWeight: 500,
              background: active === item.id ? 'rgba(232,93,26,0.06)' : 'transparent',
            }} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .bnav-links, .bnav-actions a { display: none !important; }
          .bnav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
