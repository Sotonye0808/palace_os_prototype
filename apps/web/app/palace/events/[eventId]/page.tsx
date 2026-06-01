'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PalaceFooter } from '@/components/shared/PalaceFooter';

const formatPrice = (p: number) => `₦${p.toLocaleString()}`;

const eventsData: Record<string, {
  badge: string; name: string; performer: string; date: string;
  gradient: string; description: string; lineup: string[];
  vipDesc: string; tiers: { name: string; price: number; desc: string }[];
  related: { date: string; name: string; performer: string }[];
}> = {
  'afrobeats-friday': {
    badge: 'Tonight', name: 'Afrobeats Friday', performer: 'DJ Spinall',
    date: 'Fri, 30 May · 11PM – 4AM',
    gradient: 'linear-gradient(135deg, oklch(18% 0.02 260), oklch(14% 0.03 280))',
    description: 'The biggest Afrobeats party in Lagos returns. DJ Spinall — one of Africa\'s most celebrated DJs — takes over the decks at Secrets Palace for a night of non-stop hits, electric energy, and unforgettable moments.',
    lineup: ['DJ Spinall — Headliner', 'DJ Lambo — Support', 'MC Olamide — Host'],
    vipDesc: 'VIP ticket holders enjoy priority entry, dedicated host service, premium viewing area, and a complimentary welcome cocktail. VVIP guests receive a private table with champagne service.',
    tiers: [
      { name: 'General Admission', price: 15000, desc: 'Main floor access · Standing' },
      { name: 'VIP', price: 35000, desc: 'Priority entry · Premium view · Welcome cocktail' },
      { name: 'VVIP', price: 100000, desc: 'Private table · Champagne · Dedicated host' },
    ],
    related: [
      { date: 'Sat, 31 May · 10PM', name: 'Ladies Night', performer: 'Live Performance' },
      { date: 'Sun, 1 Jun · 9PM', name: 'Sunday Soiree', performer: 'DJ Cuppy' },
      { date: 'Thu, 5 Jun · 8PM', name: 'Royal Gala Night', performer: 'Black Tie · Orchestra' },
    ],
  },
};

export default function PalaceEventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = eventsData[eventId as string] || eventsData['afrobeats-friday'];
  const [quantities, setQuantities] = useState<number[]>(event.tiers.map(() => 0));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-brand', 'secrets-palace');
  }, []);

  const total = quantities.reduce((sum, qty, i) => sum + qty * event.tiers[i].price, 0);

  const adjustQty = (idx: number, delta: number) => {
    setQuantities(prev => prev.map((q, i) => i === idx ? Math.max(0, q + delta) : q));
  };

  return (
    <div style={{
      background: 'oklch(12% 0.005 260)',
      minHeight: '100vh',
      color: 'oklch(95% 0.003 260)',
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(8,8,16,0.98)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
        }}>
          <button onClick={() => setMobileMenuOpen(false)} style={{
            position: 'absolute', top: 24, right: 24,
            background: 'none', border: 'none', color: '#D4A017', fontSize: 32, cursor: 'pointer',
          }}>
            ✕
          </button>
          <Link href="/palace" onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.25rem', color: '#FFF', textDecoration: 'none' }}>Home</Link>
          <Link href="/palace/events" onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.25rem', color: '#D4A017', textDecoration: 'none' }}>Events</Link>
          <Link href="/palace/reserve" onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.25rem', color: '#FFF', textDecoration: 'none' }}>Reserve</Link>
          <Link href="/account-hub" onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.25rem', color: '#FFF', textDecoration: 'none' }}>Account</Link>
        </div>
      )}

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 40px',
        background: 'rgba(20,20,42,0.7)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(173,173,200,0.12)',
      }}>
        <Link href="/palace" className="ed-nav-back" style={{ color: '#5F5F88', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>←</span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.125rem', fontWeight: 700, color: '#D4A017', letterSpacing: '0.15em' }}>SECRETS PALACE</span>
        </Link>
        <Link href="/palace/events" className="ed-nav-events" style={{ color: '#5F5F88', textDecoration: 'none', fontSize: '0.875rem' }}>
          All Events →
        </Link>
        <button onClick={() => setMobileMenuOpen(true)} className="ed-hamburger" style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
          color: '#D4A017', fontSize: 24, padding: 4,
        }}>
          ☰
        </button>
      </nav>

      {/* Hero */}
      <section style={{
        paddingTop: 80, position: 'relative', height: '60vh', minHeight: 400,
        display: 'flex', alignItems: 'flex-end', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: event.gradient }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.15), transparent 70%)',
          }} />
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, oklch(12% 0.005 260) 0%, transparent 60%)',
        }} />
        <div className="ed-hero-content" style={{ position: 'relative', zIndex: 2, padding: 40, maxWidth: 900, margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 4,
            fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em',
            background: '#D4A017', color: '#0E0E1A', marginBottom: 12,
          }}>
            {event.badge}
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.25rem, 6vw, 3.75rem)', fontWeight: 700, marginBottom: 8,
          }}>
            {event.name}
          </h1>
          <div style={{ color: '#5F5F88', fontSize: '1.125rem' }}>
            ft. <span style={{ color: '#D4A017' }}>{event.performer}</span> · {event.date}
          </div>
        </div>
      </section>

      {/* Detail grid */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div className="ed-detail-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }}>
          {/* Left: Description */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', marginBottom: 12 }}>About This Event</h2>
            <p style={{ color: '#5F5F88', lineHeight: 1.7, marginBottom: 16 }}>{event.description}</p>

            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', marginTop: 24, marginBottom: 12 }}>Line-Up</h2>
            {event.lineup.map((l, i) => (
              <p key={i} style={{ marginBottom: 4 }}>
                <strong style={{ color: '#D4A017' }}>{l.split(' — ')[0]}</strong> — {l.split(' — ')[1]}
              </p>
            ))}

            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', marginTop: 24, marginBottom: 12 }}>VIP Experience</h2>
            <p style={{ color: '#5F5F88', lineHeight: 1.7 }}>{event.vipDesc}</p>
          </div>

          {/* Right: Tickets */}
          <div>
            <div style={{
              background: 'oklch(14% 0.008 260)',
              border: '1px solid rgba(173,173,200,0.12)',
              borderRadius: 12, padding: 24,
              position: 'sticky', top: 100,
            }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 12, fontSize: '1.125rem' }}>
                Select <span style={{ color: '#D4A017' }}>Tickets</span>
              </h3>

              {event.tiers.map((tier, i) => (
                <div key={i} style={{
                  border: `1px solid ${quantities[i] > 0 ? '#D4A017' : 'rgba(173,173,200,0.12)'}`,
                  borderRadius: 10, padding: 16, marginBottom: 12,
                  cursor: 'pointer', transition: 'all 0.3s',
                  background: quantities[i] > 0 ? 'rgba(212,160,23,0.06)' : 'transparent',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,160,23,0.3)'; }}
                  onMouseLeave={e => { if (quantities[i] === 0) e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{tier.name}</span>
                    <span style={{ color: '#D4A017', fontWeight: 600 }}>{formatPrice(tier.price)}</span>
                  </div>
                  <div style={{ color: '#5F5F88', fontSize: '0.75rem' }}>{tier.desc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                    <button onClick={() => adjustQty(i, -1)} style={{
                      width: 32, height: 32,
                      border: '1px solid rgba(173,173,200,0.12)', borderRadius: 6,
                      background: 'transparent', color: 'oklch(95% 0.003 260)', cursor: 'pointer',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.color = 'oklch(95% 0.003 260)'; }}
                    >
                      −
                    </button>
                    <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 600 }}>{quantities[i]}</span>
                    <button onClick={() => adjustQty(i, 1)} style={{
                      width: 32, height: 32,
                      border: '1px solid rgba(173,173,200,0.12)', borderRadius: 6,
                      background: 'transparent', color: 'oklch(95% 0.003 260)', cursor: 'pointer',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.color = 'oklch(95% 0.003 260)'; }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: 'none', fontSize: '0.875rem' }}>
                <span style={{ color: '#5F5F88' }}>Subtotal</span>
                <span style={{ color: '#D4A017', fontWeight: 700 }}>{formatPrice(total)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: 'none', fontSize: '0.875rem' }}>
                <span style={{ color: '#5F5F88' }}>Service Fee</span>
                <span style={{ fontSize: '0.75rem', color: '#5F5F88' }}>Included</span>
              </div>

              <button style={{
                display: 'block', width: '100%', padding: 14,
                background: '#D4A017', color: '#0E0E1A',
                border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600,
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
                marginTop: 16,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FBBF24'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#D4A017'; }}
              >
                Get Tickets
              </button>
            </div>
          </div>
        </div>

        {/* Related Events */}
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.875rem', marginTop: 60, marginBottom: 12 }}>
          Related <span style={{ color: '#D4A017' }}>Events</span>
        </h2>
        <div className="ed-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {event.related.map((r, i) => (
            <Link key={i} href="/palace/events/afrobeats-friday" style={{
              background: 'oklch(14% 0.008 260)',
              border: '1px solid rgba(173,173,200,0.12)',
              borderRadius: 10, padding: 16, cursor: 'pointer',
              transition: 'all 0.3s', textDecoration: 'none', color: 'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,160,23,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: '0.75rem', color: '#5F5F88' }}>{r.date}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: '1rem' }}>{r.name}</div>
              <div style={{ color: '#D4A017', fontSize: '0.75rem' }}>{r.performer}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <PalaceFooter />

      <style>{`
        @media (max-width: 768px) {
          .ed-nav-back span:last-child { display: none; }
          .ed-nav-events { display: none !important; }
          .ed-hamburger { display: block !important; }
          .ed-hero-content { padding: 24px !important; }
          .ed-detail-grid { grid-template-columns: 1fr !important; }
          .ed-related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
