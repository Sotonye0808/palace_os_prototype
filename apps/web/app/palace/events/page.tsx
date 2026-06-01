'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PalaceNavbar } from '@/components/shared/PalaceNavbar';
import { PalaceFooter } from '@/components/shared/PalaceFooter';

interface EventCard {
  id: string;
  categories: string[];
  badge: { label: string; type: 'tonight' | 'upcoming' | 'sold-out' | 'past' };
  icon: string;
  date: string;
  name: string;
  performer: string;
  description: string;
  pricing: { label: string; price: string }[];
  cta: string;
  gradient: string;
  past?: boolean;
}

const mockEvents: EventCard[] = [
  {
    id: 'afrobeats-friday',
    categories: ['tonight', 'this-week'],
    badge: { label: 'Tonight', type: 'tonight' },
    icon: '♪',
    date: 'Fri, 30 May · 11PM – 4AM',
    name: 'AFROBEATS FRIDAY',
    performer: 'ft. DJ Spinall',
    description: 'The biggest Afrobeats party in Lagos. DJ Spinall takes over the decks for a night of non-stop hits.',
    pricing: [{ label: 'General', price: '₦15,000' }, { label: 'VIP', price: '₦35,000' }],
    cta: 'Get Tickets',
    gradient: 'linear-gradient(135deg,oklch(18% 0.02 260),oklch(14% 0.03 280))',
  },
  {
    id: 'vvip-lounge',
    categories: ['tonight', 'this-week', 'vip'],
    badge: { label: 'Tonight', type: 'tonight' },
    icon: '✦',
    date: 'Fri, 30 May · 11PM – 5AM',
    name: 'VVIP LOUNGE NIGHT',
    performer: 'Exclusive · Invite Only',
    description: 'The ultimate VIP experience. Private lounge, premium champagne, and curated guest list.',
    pricing: [{ label: 'VVIP', price: '₦150,000' }, { label: 'Table', price: '₦350,000+' }],
    cta: 'Request Access',
    gradient: 'linear-gradient(135deg,oklch(20% 0.03 280),oklch(14% 0.04 300))',
  },
  {
    id: 'ladies-night',
    categories: ['this-week'],
    badge: { label: 'Upcoming', type: 'upcoming' },
    icon: '☾',
    date: 'Sat, 31 May · 10PM – 4AM',
    name: 'LADIES NIGHT',
    performer: 'Live Performance',
    description: 'Celebrating the women of Lagos. Special performances, complimentary cocktails for ladies until midnight.',
    pricing: [{ label: 'General', price: '₦10,000' }, { label: 'VIP', price: '₦25,000' }],
    cta: 'Get Tickets',
    gradient: 'linear-gradient(135deg,oklch(18% 0.025 300),oklch(14% 0.03 320))',
  },
  {
    id: 'sunday-soiree',
    categories: ['this-week', 'special'],
    badge: { label: 'Upcoming', type: 'upcoming' },
    icon: '★',
    date: 'Sun, 1 Jun · 9PM – 3AM',
    name: 'SUNDAY SOIREE',
    performer: 'DJ Cuppy',
    description: 'End your weekend in style. DJ Cuppy brings the energy for an unforgettable Sunday night.',
    pricing: [{ label: 'General', price: '₦12,000' }, { label: 'VIP', price: '₦30,000' }],
    cta: 'Get Tickets',
    gradient: 'linear-gradient(135deg,oklch(18% 0.015 240),oklch(14% 0.02 250))',
  },
  {
    id: 'royal-gala',
    categories: ['special', 'vip'],
    badge: { label: 'Upcoming', type: 'upcoming' },
    icon: '♛',
    date: 'Thu, 5 Jun · 8PM – 2AM',
    name: 'ROYAL GALA NIGHT',
    performer: 'Black Tie · Live Orchestra',
    description: 'An evening of elegance and sophistication. Fine dining, live jazz, and premium champagne.',
    pricing: [{ label: 'Standard', price: '₦50,000' }, { label: 'Royal', price: '₦120,000' }],
    cta: 'Book Now',
    gradient: 'linear-gradient(135deg,oklch(22% 0.04 30),oklch(16% 0.03 350))',
  },
  {
    id: 'amapiano-wave',
    categories: ['special'],
    badge: { label: 'Upcoming', type: 'upcoming' },
    icon: '✦',
    date: 'Fri, 13 Jun · 10PM – 5AM',
    name: 'AMAPIANO WAVE',
    performer: 'ft. Major League DJz',
    description: 'South African Amapiano meets Lagos energy. Major League DJz bring the log drum sound.',
    pricing: [{ label: 'General', price: '₦18,000' }, { label: 'VIP', price: '₦40,000' }],
    cta: 'Get Tickets',
    gradient: 'linear-gradient(135deg,oklch(18% 0.02 200),oklch(14% 0.025 220))',
  },
];

const pastEvents: EventCard[] = [
  {
    id: 'neo-soul',
    categories: [],
    badge: { label: 'Past', type: 'past' },
    icon: '♪',
    date: 'Sat, 17 May · 10PM',
    name: 'NEO SOUL SUNDAY',
    performer: 'Live Band',
    description: '',
    pricing: [{ label: 'General', price: '₦12,000' }, { label: 'VIP', price: '₦28,000' }],
    cta: '',
    gradient: 'linear-gradient(135deg,oklch(18% 0.02 260),oklch(14% 0.03 280))',
    past: true,
  },
  {
    id: 'afrobeats-past',
    categories: [],
    badge: { label: 'Past', type: 'past' },
    icon: '✦',
    date: 'Fri, 9 May · 11PM',
    name: 'AFROBEATS FRIDAY',
    performer: 'DJ Spinall',
    description: '',
    pricing: [{ label: 'General', price: '₦15,000' }, { label: 'VIP', price: '₦35,000' }],
    cta: '',
    gradient: 'linear-gradient(135deg,oklch(18% 0.02 260),oklch(14% 0.03 280))',
    past: true,
  },
  {
    id: 'sunday-past',
    categories: [],
    badge: { label: 'Past', type: 'past' },
    icon: '★',
    date: 'Sun, 4 May · 9PM',
    name: 'SUNDAY SOIREE',
    performer: 'DJ Cuppy',
    description: '',
    pricing: [{ label: 'General', price: '₦12,000' }, { label: 'VIP', price: '₦30,000' }],
    cta: '',
    gradient: 'linear-gradient(135deg,oklch(18% 0.02 260),oklch(14% 0.03 280))',
    past: true,
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'tonight', label: 'Tonight' },
  { id: 'this-week', label: 'This Week' },
  { id: 'vip', label: 'VIP Events' },
  { id: 'special', label: 'Special Occasions' },
];

function Badge({ label, type }: { label: string; type: string }) {
  const colors: Record<string, React.CSSProperties> = {
    tonight: { background: '#D4A017', color: '#0E0E1A' },
    upcoming: { background: 'rgba(139,92,246,0.2)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.3)' },
    'sold-out': { background: 'rgba(239,68,68,0.2)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)' },
    past: { background: 'rgba(173,173,200,0.1)', color: '#5F5F88' },
  };
  return (
    <span style={{
      position: 'absolute', top: 12, left: 12,
      padding: '4px 12px', borderRadius: 4,
      fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em',
      ...(colors[type] || {}),
    }}>
      {label}
    </span>
  );
}

export default function PalaceEventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = activeFilter === 'all'
    ? mockEvents
    : mockEvents.filter(e => e.categories.includes(activeFilter));

  return (
    <div style={{
      background: 'oklch(12% 0.005 260)',
      minHeight: '100vh',
      color: 'oklch(95% 0.003 260)',
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      WebkitFontSmoothing: 'antialiased',
    }}>
      <PalaceNavbar active="events" />

      {/* Hero */}
      <section style={{
        padding: '120px 24px 80px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, oklch(10% 0.008 260) 0%, oklch(12% 0.005 260) 100%)',
      }}>
        <div style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#D4A017',
          marginBottom: 12,
        }}>
          Secrets Palace
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.875rem, 5vw, 3rem)',
          fontWeight: 700,
        }}>
          Events & <span style={{ color: '#D4A017' }}>Nights</span>
        </h1>
        <p style={{
          color: '#5F5F88',
          maxWidth: 500,
          margin: '12px auto 0',
        }}>
          &ldquo;Every night at Secrets is a curated masterpiece.&rdquo;
        </p>
      </section>

      {/* Filter pills */}
      <div style={{
        display: 'flex', gap: 8, justifyContent: 'center',
        flexWrap: 'wrap', padding: 24, maxWidth: 800, margin: '0 auto',
      }}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            style={{
              padding: '8px 20px',
              border: `1px solid ${activeFilter === f.id ? '#D4A017' : 'rgba(173,173,200,0.12)'}`,
              borderRadius: 20,
              background: activeFilter === f.id ? '#D4A017' : 'transparent',
              color: activeFilter === f.id ? '#0E0E1A' : '#5F5F88',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
            }}
            onMouseEnter={e => {
              if (activeFilter !== f.id) {
                e.currentTarget.style.borderColor = '#D4A017';
                e.currentTarget.style.color = '#D4A017';
              }
            }}
            onMouseLeave={e => {
              if (activeFilter !== f.id) {
                e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)';
                e.currentTarget.style.color = '#5F5F88';
              }
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Events grid */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="pe-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {filteredEvents.map(event => (
            <Link
              key={event.id}
              href={`/palace/events/${event.id}`}
              style={{
                background: 'oklch(14% 0.008 260)',
                border: '1px solid rgba(173,173,200,0.12)',
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(212,160,23,0.12)';
                e.currentTarget.style.borderColor = 'rgba(212,160,23,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)';
              }}
            >
              <div style={{
                aspectRatio: '16/9',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: event.gradient,
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.1), transparent 70%)',
                  }} />
                </div>
                <Badge label={event.badge.label} type={event.badge.type} />
                <span style={{ fontSize: 40, color: '#D4A017', opacity: 0.25, zIndex: 1 }}>
                  {event.icon}
                </span>
              </div>
              <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.875rem', color: '#5F5F88', marginBottom: 4 }}>{event.date}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: 4 }}>{event.name}</div>
                <div style={{ color: '#D4A017', fontSize: '0.875rem', marginBottom: 8 }}>{event.performer}</div>
                <p style={{
                  color: '#5F5F88', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: 12,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {event.description}
                </p>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: '0.875rem', color: '#5F5F88',
                  marginTop: 'auto', marginBottom: 12,
                }}>
                  {event.pricing.map((p, i) => (
                    <span key={i}>{p.label}: {p.price}</span>
                  ))}
                </div>
                <span style={{
                  display: 'block', width: '100%', padding: 10,
                  border: '1px solid rgba(212,160,23,0.3)', borderRadius: 6,
                  background: 'transparent', color: '#D4A017',
                  fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.3s', textAlign: 'center', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#D4A017'; e.currentTarget.style.color = '#0E0E1A'; e.currentTarget.style.borderColor = '#D4A017'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4A017'; e.currentTarget.style.borderColor = 'rgba(212,160,23,0.3)'; }}
                >
                  {event.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(173,173,200,0.12), transparent)',
        margin: '0 24px',
      }} />

      {/* Past events */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 80px' }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.875rem',
          marginBottom: 24,
        }}>
          Past <span style={{ color: '#D4A017' }}>Events</span>
        </h2>
        <div className="pe-grid-past" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, opacity: 0.5 }}>
          {pastEvents.map(event => (
            <div
              key={event.id}
              style={{
                background: 'oklch(14% 0.008 260)',
                border: '1px solid rgba(173,173,200,0.12)',
                borderRadius: 12,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{
                aspectRatio: '16/9',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                filter: 'grayscale(0.8)',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: event.gradient }} />
                <Badge label={event.badge.label} type={event.badge.type} />
                <span style={{ fontSize: 40, color: '#D4A017', opacity: 0.25, zIndex: 1 }}>
                  {event.icon}
                </span>
              </div>
              <div style={{ padding: 20, opacity: 0.6 }}>
                <div style={{ fontSize: '0.875rem', color: '#5F5F88', marginBottom: 4 }}>{event.date}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: 4 }}>{event.name}</div>
                <div style={{ color: '#D4A017', fontSize: '0.875rem', marginBottom: 8 }}>{event.performer}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#5F5F88' }}>
                  {event.pricing.map((p, i) => (
                    <span key={i}>{p.label}: {p.price}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .pe-grid, .pe-grid-past { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .pe-grid, .pe-grid-past { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
      <PalaceFooter />
    </div>
  );
}
