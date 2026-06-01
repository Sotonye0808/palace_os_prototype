'use client';

import { useState } from 'react';
import Link from 'next/link';

type Brand = 'bukka' | 'palace';

export default function AccountHubPage() {
  const [brand, setBrand] = useState<Brand>('bukka');
  const [activityTab, setActivityTab] = useState('all');
  const isPalace = brand === 'palace';

  const primary = isPalace ? '#D4A017' : '#E85D1A';
  const primaryHover = isPalace ? '#B7880F' : '#C44510';
  const bg = isPalace ? 'oklch(12% 0.005 260)' : '#FAFAF8';
  const surface = isPalace ? 'oklch(14% 0.008 260)' : '#FFFFFF';
  const text = isPalace ? 'oklch(95% 0.003 260)' : '#1A1614';
  const muted = isPalace ? '#5F5F88' : '#7A706A';
  const border = isPalace ? 'rgba(173,173,200,0.12)' : '#E8E4DD';
  const activeBg = isPalace ? 'rgba(212,160,23,0.08)' : 'rgba(232,93,26,0.08)';
  const displayFont = isPalace ? "'Cormorant Garamond', Georgia, serif" : "'Playfair Display', Georgia, serif";

  const activityItems = [
    { type: 'orders', emoji: '🍛', title: 'Jollof Rice & Chicken delivered', time: 'Today, 2:30 PM · FoliXx Bukka', action: 'Reorder', href: '#' },
    { type: 'orders', emoji: '🥟', title: 'Suya Skewers & Zobo ordered', time: 'Yesterday, 8:15 PM · FoliXx Bukka', action: 'Track', href: '/bukka/order-tracking' },
    { type: 'bookings', emoji: '♛', title: 'Table booked at Secrets Palace', time: 'Fri, 30 May · 11PM · VIP Package', action: 'View', href: '/palace/reserve' },
    { type: 'orders', emoji: '🥘', title: 'Egusi Soup & Pounded Yam', time: '3 days ago · FoliXx Bukka', action: 'Reorder', href: '#' },
  ];

  const filteredActivities = activityTab === 'all' ? activityItems : activityItems.filter(a => a.type === activityTab);

  return (
    <div style={{
      background: bg, minHeight: '100vh', color: text,
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Brand toggle */}
      <div style={{
        position: 'fixed', top: 12, right: 16, zIndex: 101,
        display: 'flex', gap: 4, background: surface, padding: 3,
        borderRadius: 9999, border: `1px solid ${border}`,
      }}>
        {(['bukka', 'palace'] as const).map(b => (
          <button key={b} onClick={() => setBrand(b)} style={{
            padding: '6px 14px', border: 'none', borderRadius: 9999,
            fontSize: 10, fontWeight: 600, cursor: 'pointer',
            background: brand === b ? primary : 'transparent',
            color: brand === b ? '#fff' : muted,
            fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
          }}>{b === 'bukka' ? 'Bukka' : 'Palace'}</button>
        ))}
      </div>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside className="sidebar-nav" style={{
          width: 240, flexShrink: 0,
          padding: '80px 16px 24px',
          borderRight: `1px solid ${border}`,
          position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
          background: surface,
        }}>
          <div style={{ textAlign: 'center', padding: '16px 0', marginBottom: 16, borderBottom: `1px solid ${border}` }}>
            <div style={{
              width: 64, height: 64, margin: '0 auto 8px',
              background: primary, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 28, fontWeight: 700,
              fontFamily: displayFont,
            }}>C</div>
            <div style={{ fontWeight: 600 }}>Chioma Okafor</div>
            <div style={{ fontSize: '0.75rem', color: muted }}>chioma@example.com</div>
          </div>

          {[
            { icon: '📊', label: 'Overview', href: '/account-hub', active: true },
            { icon: '📋', label: 'My Orders', href: '#', alert: true },
            { icon: '📅', label: 'My Bookings', href: '#', alert: true },
            { icon: '⭐', label: 'Loyalty & Rewards', href: '/account-loyalty' },
            { icon: '👤', label: 'Profile Settings', href: '/account-profile' },
            { icon: '💳', label: 'Address Book', href: '/address-book' },
            { icon: '🔔', label: 'Notifications', href: '#', alert: true },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10,
              color: item.active ? primary : muted,
              background: item.active ? activeBg : 'transparent',
              textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
              transition: 'all 0.2s', marginBottom: 2,
            }}
              onClick={e => { if (item.alert) { e.preventDefault(); alert('Coming soon'); } }}
              onMouseEnter={e => { if (!item.active) { e.currentTarget.style.background = border; e.currentTarget.style.color = text; } }}
              onMouseLeave={e => { if (!item.active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = muted; } }}
            >
              <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div style={{ marginTop: 20, paddingTop: 12, borderTop: `1px solid ${border}` }}>
            <Link href="/" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10,
              color: muted, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
            }}>
              <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>↩</span>
              Sign Out
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="main-area" style={{ flex: 1, padding: '80px 32px 60px', maxWidth: 'calc(100% - 240px)' }}>
          <h1 style={{ fontFamily: displayFont, fontSize: '1.875rem', marginBottom: 4 }}>
            Welcome back, <span style={{ color: primary }}>Chioma</span>
          </h1>
          <p style={{ color: muted, marginBottom: 24 }}>Here&apos;s what&apos;s happening with your account</p>

          {/* Loyalty tier */}
          <div className="tier-card" style={{
            background: `linear-gradient(135deg, ${primary}, ${primaryHover})`,
            borderRadius: 16, padding: 24, color: '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 24, flexWrap: 'wrap', gap: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 40 }}>⭐</span>
              <div>
                <div style={{ fontFamily: displayFont, fontSize: '1.25rem', fontWeight: 700 }}>Gold Member</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>1,250 points to Royal tier</div>
                <div style={{
                  width: '100%', height: 6, background: 'rgba(255,255,255,0.2)',
                  borderRadius: 3, marginTop: 12, overflow: 'hidden',
                }}>
                  <div style={{ height: '100%', background: '#fff', borderRadius: 3, width: '68%' }} />
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: displayFont }}>3,750</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Points Balance</div>
            </div>
          </div>

          {/* Activity */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <h2 style={{ fontFamily: displayFont, fontSize: '1.25rem' }}>Recent Activity</h2>
            <a href="#" style={{ color: primary, fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}>View All</a>
          </div>

          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${border}`, marginBottom: 16 }}>
            {['all', 'orders', 'bookings'].map(tab => (
              <button key={tab} onClick={() => setActivityTab(tab)} style={{
                padding: '10px 20px', border: 'none', background: 'transparent',
                fontSize: '0.875rem', fontWeight: 500, color: activityTab === tab ? primary : muted,
                cursor: 'pointer', position: 'relative',
                fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
                borderBottom: activityTab === tab ? `2px solid ${primary}` : '2px solid transparent',
              }}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredActivities.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 12, background: surface,
                border: `1px solid ${border}`, borderRadius: 10,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  background: a.type === 'bookings' ? 'rgba(139,92,246,0.08)' : isPalace ? 'rgba(212,160,23,0.08)' : '#FFF5ED',
                }}>
                  {a.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{a.title}</div>
                  <div style={{ fontSize: '0.75rem', color: muted }}>{a.time}</div>
                </div>
                <Link href={a.href} style={{
                  fontSize: '0.75rem', color: primary, fontWeight: 600, textDecoration: 'none',
                }}
                  onClick={e => { if (a.href === '#') { e.preventDefault(); alert('Coming soon'); } }}
                >
                  {a.action}
                </Link>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <h2 style={{ fontFamily: displayFont, fontSize: '1.25rem', margin: '24px 0 12px' }}>Quick Actions</h2>
          <div className="quick-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🍛', title: 'Order Again', desc: 'Reorder your last Bukka meal', href: '/bukka/menu' },
              { icon: '♛', title: 'Book a Table', desc: 'Reserve at Secrets Palace', href: '/palace/reserve' },
              { icon: '⭐', title: 'View Rewards', desc: 'Check your loyalty points', href: '/account-loyalty' },
              { icon: '👤', title: 'Edit Profile', desc: 'Update your details', href: '/account-profile' },
            ].map((q, i) => (
              <Link key={i} href={q.href} style={{
                padding: 20, border: `1px solid ${border}`,
                borderRadius: 16, background: surface,
                cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none', color: 'inherit',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{q.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{q.title}</div>
                <div style={{ color: muted, fontSize: '0.75rem' }}>{q.desc}</div>
              </Link>
            ))}
          </div>
        </main>
      </div>

      {/* Mobile bottom tabs */}
      <nav className="bottom-tabs" style={{
        display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%',
        background: surface, borderTop: `1px solid ${border}`,
        zIndex: 100, padding: '8px 0', paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}>
        <div style={{ display: 'flex', width: '100%' }}>
          {[
            { icon: '📊', label: 'Overview', href: '/account-hub', active: true },
            { icon: '📋', label: 'Orders', href: '#', alert: true },
            { icon: '⭐', label: 'Rewards', href: '/account-loyalty' },
            { icon: '👤', label: 'Profile', href: '/account-profile' },
          ].map((t, i) => (
            <Link key={i} href={t.href} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              textDecoration: 'none', color: t.active ? primary : muted, fontSize: 9, padding: '4px 0',
            }}
              onClick={e => { if (t.alert) { e.preventDefault(); alert('Coming soon'); } }}
            >
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              {t.label}
            </Link>
          ))}
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-nav { display: none !important; }
          .main-area { max-width: 100% !important; padding: 72px 16px 80px !important; }
          .bottom-tabs { display: flex !important; }
          .quick-actions { grid-template-columns: 1fr !important; }
          .tier-card { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
