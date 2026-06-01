'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PalaceNavbar } from '@/components/shared/PalaceNavbar';
import { PalaceFooter } from '@/components/shared/PalaceFooter';

export default function PalaceHomePage() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.style.cssText = `position:absolute;width:${1 + Math.random() * 2}px;height:${1 + Math.random() * 2}px;background:#D4A017;border-radius:50%;opacity:0;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation:twinkle${i} 4s infinite`;
      p.style.animationDelay = `${Math.random() * 4}s`;
      container.appendChild(p);
    }
  }, []);

  return (
    <div style={{ background: 'oklch(12% 0.005 260)', color: 'oklch(95% 0.003 260)', fontFamily: "'Inter', -apple-system, system-ui, sans-serif", minHeight: '100vh' }}>
      <PalaceNavbar active="home" />

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 40%, rgba(212,160,23,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.05) 0%, transparent 50%), linear-gradient(180deg, oklch(12% 0.005 260) 0%, oklch(10% 0.006 260) 50%, oklch(12% 0.005 260) 100%)' }} />
        <div ref={particlesRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, rgba(8,8,16,0.85) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800, padding: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 64, height: 64, border: '1px solid rgba(212,160,23,0.4)', borderRadius: '50%',
            fontSize: 28, marginBottom: 20, color: '#D4A017', animation: 'fadeUp 1s ease both'
          }}>♛</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 16, animation: 'fadeUp 1s ease 0.15s both' }}>
            Lekki · Lagos · Est. 2022
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20, animation: 'fadeUp 1s ease 0.3s both' }}>
            Where Every Guest<br /><span style={{ color: '#D4A017' }}>Is Royalty</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--color-text-muted)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7, animation: 'fadeUp 1s ease 0.45s both' }}>
            Lagos&apos;s most luxurious nightlife destination. Open Wednesday to Sunday, 10PM–6AM. Where world-class entertainment meets premium bottle service.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp 1s ease 0.6s both' }}>
            <Link href="/palace/reserve" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', fontSize: '0.875rem', fontWeight: 600,
              borderRadius: 6, cursor: 'pointer', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              background: '#D4A017', color: 'oklch(12% 0.005 260)', border: 'none',
              transition: 'all 0.3s'
            }}>
              Reserve Your Table →
            </Link>
            <Link href="/palace/events" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', fontSize: '0.875rem', fontWeight: 600,
              borderRadius: 6, cursor: 'pointer', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              background: 'transparent', color: '#D4A017', border: '1px solid rgba(212,160,23,0.4)',
              transition: 'all 0.3s'
            }}>
              See Events
            </Link>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          <span>Scroll</span>
          <span style={{ animation: 'chevronBounce 2s infinite', color: '#D4A017', transform: 'translateY(0)' }}>⌄</span>
        </div>
      </section>

      {/* Hours banner */}
      <div style={{ background: 'linear-gradient(90deg, oklch(14% 0.008 260), oklch(16% 0.02 260), oklch(14% 0.008 260))', borderTop: '1px solid rgba(212,160,23,0.1)', borderBottom: '1px solid rgba(212,160,23,0.1)', padding: '14px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 48, animation: 'scrollBanner 30s linear infinite', width: 'max-content' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 48 }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>✦ <strong style={{ color: '#D4A017' }}>OPEN:</strong> Wednesday – Sunday · 10PM – 6AM · 148 Lekki-Epe Expressway, Lekki</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>✦ <strong style={{ color: '#D4A017' }}>DRESS CODE:</strong> Smart Elegance · No Slippers · No Caps</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>✦ <strong style={{ color: '#D4A017' }}>BOTTLE SERVICE:</strong> Premium Packages Available · Reserve Your Table</span>
            </div>
          ))}
        </div>
      </div>

      {/* This Week at Secrets */}
      <div style={{ padding: '96px 32px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>This Week</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 24 }}>
          This Week at <span style={{ color: '#D4A017' }}>Secrets</span>
        </h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: 560, fontSize: '1.125rem', lineHeight: 1.7, marginBottom: 40 }}>
          Every night is a curated masterpiece. From Afrobeats Fridays to Sunday Soiree.
        </p>
        <div className="p-events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { date: 'Fri, 30 May · 11PM', name: 'AFROBEATS FRIDAY', performer: 'ft. DJ Spinall', general: '₦15,000', vip: '₦35,000', badge: 'Tonight', badgeColor: '#D4A017' },
            { date: 'Sat, 31 May · 10PM', name: 'LADIES NIGHT', performer: 'Live Performance', general: '₦10,000', vip: '₦25,000', badge: 'Upcoming', badgeColor: 'rgba(139,92,246,0.2)' },
            { date: 'Sun, 1 Jun · 9PM', name: 'SUNDAY SOIREE', performer: 'DJ Cuppy', general: '₦12,000', vip: '₦30,000', badge: 'Upcoming', badgeColor: 'rgba(139,92,246,0.2)' },
          ].map(event => (
            <Link key={event.name} href="/palace/events/afrobeats-friday" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'oklch(14% 0.008 260)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden', transition: 'all 0.4s', cursor: 'pointer' }}>
                <div style={{ aspectRatio: '16/9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, oklch(18% 0.02 260), oklch(14% 0.03 280))', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.1), transparent 70%)' }} />
                  <span style={{ position: 'absolute', top: 12, left: 12, padding: '4px 12px', borderRadius: 4, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', background: event.badgeColor, color: event.badge === 'Tonight' ? 'oklch(12% 0.005 260)' : '#8B5CF6', border: event.badge === 'Upcoming' ? '1px solid rgba(139,92,246,0.3)' : 'none' }}>{event.badge}</span>
                  <span style={{ fontSize: 48, color: '#D4A017', opacity: 0.3, zIndex: 1 }}>♪</span>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>{event.date}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: 4 }}>{event.name}</div>
                  <div style={{ color: '#D4A017', fontSize: '0.875rem', marginBottom: 12 }}>{event.performer}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
                    <span>General: {event.general}</span>
                    <span>VIP: {event.vip}</span>
                  </div>
                  <div style={{ display: 'block', width: '100%', padding: 10, border: '1px solid rgba(212,160,23,0.3)', borderRadius: 6, background: 'transparent', color: '#D4A017', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', transition: 'all 0.3s' }}>
                    Get Tickets
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/palace/events" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#D4A017', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem', marginTop: 32, transition: 'gap 0.3s' }}>
          View All Events →
        </Link>
      </div>

      {/* Reservation teaser */}
      <div style={{ padding: '0 32px 96px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="p-reserve-teaser" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', background: 'linear-gradient(135deg, oklch(14% 0.008 260), oklch(15% 0.015 260))', border: '1px solid var(--color-border)', borderRadius: 16, padding: 48 }}>
          <div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>Reservations</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.25rem', fontWeight: 700, marginBottom: 16 }}>
              Secure <span style={{ color: '#D4A017' }}>Your Throne</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: 16 }}>
              Choose your experience: Standard Table, VIP Package, or the exclusive VVIP Suite with premium bottle service and dedicated host.
            </p>
            <Link href="/palace/reserve" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', background: '#D4A017', color: 'oklch(12% 0.005 260)',
              border: 'none', borderRadius: 6, fontWeight: 600,
              cursor: 'pointer', textDecoration: 'none', transition: 'all 0.3s'
            }}>
              Reserve a Table →
            </Link>
          </div>
          <div style={{ aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, oklch(18% 0.02 260), oklch(12% 0.005 260))' }}>
            <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: 16 }}>
              {['T1','T2','T3','V1','T4','T5','V2','T6','T7','T8','V3','T9','T10','T11','T12','VVP'].map((t, i) => (
                <div key={t} style={{
                  border: i === 13 ? '1px solid rgba(139,92,246,0.3)' : t.includes('V') ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(212,160,23,0.15)',
                  borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: 'rgba(240,240,248,0.3)'
                }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div style={{ textAlign: 'center', padding: '96px 32px', background: 'linear-gradient(180deg, oklch(12% 0.005 260), oklch(14% 0.008 260), oklch(12% 0.005 260))' }}>
        <blockquote style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontStyle: 'italic', color: '#D4A017', maxWidth: 700, margin: '0 auto', lineHeight: 1.4 }}>
          &ldquo;At Secrets Palace, we don&apos;t just host nightlife — we define it.&rdquo;
        </blockquote>
        <div style={{ marginTop: 16, color: 'var(--color-text-muted)', fontSize: '0.875rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          — The House of Secrets
        </div>
      </div>

      {/* Experience pillars */}
      <div style={{ padding: '96px 32px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>The Experience</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 40 }}>
          Built for <span style={{ color: '#D4A017' }}>Royalty</span>
        </h2>
        <div className="p-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { icon: '♛', title: 'Royal Treatment', desc: 'Personalized service from the moment you arrive. Dedicated hosts, priority entry, and a staff-to-guest ratio that ensures every need is met before you ask.' },
            { icon: '♪', title: 'World-Class Entertainment', desc: 'International DJs, live performances, and curated music experiences that set the standard for Lagos nightlife.' },
            { icon: '✦', title: 'Premium Bottle Service', desc: 'Champagne, premium spirits, and expertly crafted cocktails served with theatrical flair. Our collection spans the world\'s finest labels.' },
          ].map(p => (
            <div key={p.title} style={{ textAlign: 'center', padding: '40px 24px', background: 'oklch(14% 0.008 260)', border: '1px solid var(--color-border)', borderRadius: 12, transition: 'all 0.4s' }}>
              <div style={{ fontSize: 36, marginBottom: 16, color: '#D4A017' }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', marginBottom: 8 }}>{p.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: '0 32px 96px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8 }}>Testimonials</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 40 }}>
          What Our <span style={{ color: '#D4A017' }}>Guests Say</span>
        </h2>
        <div className="p-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { stars: '★★★★★', quote: 'The most incredible nightlife experience in Lagos. From the decor to the service, everything is world-class. The VVIP section is unmatched.', author: '— Adewale' },
            { stars: '★★★★★', quote: 'I\'ve been to clubs in London, Dubai, and Lagos — Secrets Palace is on another level. The gold aesthetic, the energy, the crowd. Perfection.', author: '— Chioma' },
            { stars: '★★★★★', quote: 'Booked the VIP package for my birthday and it was unforgettable. The bottle presentation, the dedicated server, the view of the main floor — incredible.', author: '— Tunde' },
          ].map(t => (
            <div key={t.author} style={{ background: 'oklch(16% 0.01 260)', border: '1px solid var(--color-border)', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#D4A017', fontSize: '1.125rem', marginBottom: 12, letterSpacing: 2 }}>{t.stars}</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 12 }}>{t.quote}</p>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{t.author}</div>
            </div>
          ))}
        </div>
      </div>

      <PalaceFooter />

      <style>{`
        @keyframes scrollBanner {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        @media (max-width: 768px) {
          .p-events-grid, .p-pillars-grid, .p-testimonials-grid { grid-template-columns: 1fr !important; }
          .p-reserve-teaser { grid-template-columns: 1fr !important; text-align: center; }
          .p-reserve-teaser > div:last-child { display: none !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .p-events-grid, .p-pillars-grid, .p-testimonials-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
