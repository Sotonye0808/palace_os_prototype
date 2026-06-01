'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BukkaNavbar } from '@/components/shared/BukkaNavbar';
import { BukkaFooter } from '@/components/shared/BukkaFooter';

export default function BukkaHomePage() {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dine-in'>('delivery');
  return (
    <div style={{ background: '#FAFAF8', color: '#1A1614', fontFamily: "'Inter', -apple-system, system-ui, sans-serif", minHeight: '100vh' }}>
      <BukkaNavbar active="home" />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', paddingTop: 80, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1A1614 0%, #2A2420 50%, #3D3733 100%)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(232,93,26,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(245,166,35,0.1) 0%, transparent 40%)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,22,20,0.85) 0%, rgba(26,22,20,0.85) 50%, rgba(26,22,20,0.6) 70%, transparent 100%)' }} />
        <div className="hero-inner" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#E85D1A', fontWeight: 600, marginBottom: 12 }}>FoliXx Bukka</div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
              Taste the Tradition,<br />Feel the Flavor
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', marginBottom: 24, lineHeight: 1.7 }}>
              From classic Nigerian dishes to contemporary cravings, every meal is a masterpiece.
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              {(['delivery', 'takeaway', 'dine-in'] as const).map(t => (
                <button key={t} onClick={() => setOrderType(t)} style={{
                  padding: '8px 20px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 9999,
                  background: orderType === t ? '#E85D1A' : 'transparent',
                  color: orderType === t ? '#fff' : 'rgba(255,255,255,0.8)',
                  fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.2s'
                }}>
                  {t === 'delivery' ? 'Delivery' : t === 'takeaway' ? 'Takeaway' : 'Dine-in'}
                </button>
              ))}
            </div>
            <Link href="/bukka/menu" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', background: '#E85D1A', color: '#fff',
              border: 'none', borderRadius: 9999, fontSize: '0.875rem',
              fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.3s'
            }}>
              Explore Menu →
            </Link>
            <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
              {[{ num: '300+', lbl: 'Menu Items' }, { num: '12–35 min', lbl: 'Delivery' }, { num: '4.8', lbl: '★ Rating' }].map(s => (
                <div key={s.lbl} style={{ padding: '8px 20px', background: 'rgba(255,255,255,0.06)', borderRadius: 9999, backdropFilter: 'blur(8px)' }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem' }}>{s.num}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-decor" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
              transform: 'rotate(6deg)',
            }}>
              {[
                { emoji: '🍛', deg: '135deg', c1: '#FFE8D1', c2: '#FFC99A' },
                { emoji: '🥘', deg: '135deg', c1: '#FFE8D1', c2: '#FFA563' },
                { emoji: '🥩', deg: '135deg', c1: '#FFC99A', c2: '#FF7A2B' },
                { emoji: '🥤', deg: '135deg', c1: '#FFF5ED', c2: '#FFE8D1' },
                { emoji: '🍗', deg: '135deg', c1: '#FFE8D1', c2: '#E85D1A' },
                { emoji: '🧁', deg: '135deg', c1: '#FFF5ED', c2: '#F5A623' },
                { emoji: '🥟', deg: '135deg', c1: '#F5A623', c2: '#E85D1A' },
                { emoji: '🍚', deg: '135deg', c1: '#FFC99A', c2: '#FF7A2B' },
                { emoji: '🥬', deg: '135deg', c1: '#FFE8D1', c2: '#FFC99A' },
              ].map((item, i) => (
                <div key={i} style={{
                  width: 'clamp(64px, 8vw, 100px)', height: 'clamp(64px, 8vw, 100px)',
                  borderRadius: 16, background: `linear-gradient(${item.deg},${item.c1},${item.c2})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  backdropFilter: 'blur(4px)',
                }}>
                  {item.emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service banner */}
      <div style={{ background: '#FFF5ED', padding: '40px 24px' }}>
        <div className="grid-3" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { icon: '🚚', title: 'Fast Delivery', desc: 'Hot food at your doorstep in 35 minutes or less. Free delivery on orders above ₦5,000.' },
            { icon: '🍲', title: 'Premium Quality', desc: 'Fresh ingredients, traditional recipes, and modern presentation. Every dish is crafted with care.' },
            { icon: '✨', title: 'Easy Ordering', desc: 'Order in seconds. Track in real-time. Pay securely. Enjoy seamlessly.' },
          ].map(s => (
            <div key={s.title} style={{ textAlign: 'center', padding: 16 }}>
              <div style={{ width: 56, height: 56, margin: '0 auto 12px', background: '#E85D1A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 4 }}>{s.title}</h3>
              <p style={{ color: '#7A706A', fontSize: '0.875rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Specials */}
      <div style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            Today&apos;s <span style={{ color: '#E85D1A' }}>Specials</span>
          </h2>
          <Link href="/bukka/menu" style={{ color: '#E85D1A', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4 }}>View Full Menu →</Link>
        </div>
        <div className="grid-4-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { emoji: '🍛', name: 'Jollof Rice & Chicken', price: '₦3,500', desc: 'Party jollof with grilled chicken, plantain & coleslaw', badge: 'Popular', gradient: 'linear-gradient(135deg,#FFE8D1,#FFC99A)' },
            { emoji: '🥘', name: 'Egusi Soup & Pounded Yam', price: '₦4,200', desc: 'Rich melon seed soup with assorted meat & smooth pounded yam', badge: "Chef's Pick", gradient: 'linear-gradient(135deg,#FFE8D1,#FFA563)' },
            { emoji: '🥩', name: 'Suya Skewers', price: '₦2,800', desc: 'Spiced grilled beef skewers with yaji, onions & pepper sauce', badge: 'Popular', gradient: 'linear-gradient(135deg,#FFC99A,#FF7A2B)' },
            { emoji: '🥤', name: 'Zobo Lemonade', price: '₦1,000', desc: 'Hibiscus drink with lemon, mint & a touch of ginger', badge: 'New', gradient: 'linear-gradient(135deg,#FFF5ED,#FFE8D1)' },
          ].map(item => (
            <Link key={item.name} href="/bukka/menu" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: '#fff', border: '1px solid #E8E4DD', borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }}>
                <div style={{ aspectRatio: '16/9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.gradient }}>
                  <span style={{ position: 'absolute', top: 8, left: 8, padding: '3px 10px', borderRadius: 4, fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', background: item.badge === 'Popular' ? '#E85D1A' : item.badge === "Chef's Pick" ? '#F5A623' : '#2E7D52', color: '#fff' }}>{item.badge}</span>
                  <span style={{ fontSize: 36, zIndex: 1 }}>{item.emoji}</span>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: '#E85D1A', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{item.price}</span>
                  </div>
                  <p style={{ color: '#7A706A', fontSize: '0.875rem', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <div style={{ padding: '0 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="cat-pills" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, WebkitOverflowScrolling: 'touch' }}>
          {['All', 'Starters', 'Main Dishes', 'Proteins', 'Sides', 'Drinks', 'Desserts'].map(c => (
            <button key={c} style={{
              flexShrink: 0, padding: '8px 20px', border: '1px solid #E8E4DD', borderRadius: 9999,
              background: c === 'All' ? '#E85D1A' : '#fff', color: c === 'All' ? '#fff' : '#7A706A',
              fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              transition: 'all 0.2s'
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Customer Favourites */}
      <div style={{ padding: '24px 24px 64px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            Customer <span style={{ color: '#E85D1A' }}>Favourites</span>
          </h2>
        </div>
        <div className="grid-4-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { emoji: '🍗', name: 'Pepper Soup & Catfish', price: '₦3,800', desc: 'Spicy broth with fresh catfish, herbs & uziza leaves', rating: '★ 4.9', gradient: 'linear-gradient(135deg,#FFE8D1,#E85D1A)' },
            { emoji: '🥟', name: 'Moi Moi & Pap', price: '₦2,500', desc: 'Steamed bean pudding with custard pap & akamu', rating: '★ 4.8', gradient: 'linear-gradient(135deg,#F5A623,#E85D1A)' },
            { emoji: '🍚', name: 'Fried Rice & Grilled Fish', price: '₦4,500', desc: 'Nigerian fried rice with whole grilled tilapia & plantain', rating: '★ 4.7', gradient: 'linear-gradient(135deg,#FFC99A,#FF7A2B)' },
            { emoji: '🧁', name: 'Puff Puff (6 pcs)', price: '₦1,200', desc: 'Fluffy deep-fried dough balls, lightly sweetened', rating: '★ 4.9', gradient: 'linear-gradient(135deg,#FFF5ED,#F5A623)' },
          ].map(item => (
            <Link key={item.name} href="/bukka/menu" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: '#fff', border: '1px solid #E8E4DD', borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }}>
                <div style={{ aspectRatio: '16/9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.gradient }}>
                  <span style={{ position: 'absolute', top: 8, left: 8, padding: '3px 10px', borderRadius: 4, fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', background: '#E85D1A', color: '#fff' }}>{item.rating}</span>
                  <span style={{ fontSize: 36, zIndex: 1 }}>{item.emoji}</span>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: '#E85D1A', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{item.price}</span>
                  </div>
                  <p style={{ color: '#7A706A', fontSize: '0.875rem', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: '#fff', padding: '64px 24px', borderTop: '1px solid #E8E4DD', borderBottom: '1px solid #E8E4DD' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.875rem' }}>How It <span style={{ color: '#E85D1A' }}>Works</span></h2>
          <p style={{ color: '#7A706A', marginTop: 4 }}>From craving to doorstep in four simple steps</p>
          <div className="grid-4-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 24 }}>
            {[
              { num: '1', title: 'Choose', desc: 'Browse our menu and pick your favourites' },
              { num: '2', title: 'Customise', desc: 'Select your proteins, spice level & sides' },
              { num: '3', title: 'Pay', desc: 'Secure checkout with Paystack or cash' },
              { num: '4', title: 'Delivered', desc: 'Track your order in real-time to your door' },
            ].map(s => (
              <div key={s.num} style={{ textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, margin: '0 auto 12px', background: '#E85D1A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.25rem', fontFamily: "'Playfair Display', Georgia, serif" }}>{s.num}</div>
                <h4 style={{ marginBottom: 4 }}>{s.title}</h4>
                <p style={{ color: '#7A706A', fontSize: '0.875rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loyalty banner */}
      <div style={{ padding: '48px 24px', background: 'linear-gradient(135deg, #1A1614 0%, #E85D1A 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#fff', fontSize: '1.875rem', marginBottom: 8 }}>Every Meal Earns Rewards</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Earn points on every order. Redeem for free meals, exclusive discounts, and special treats.</p>
          <Link href="/bukka/menu" style={{
            display: 'inline-flex', padding: '12px 28px',
            background: '#fff', color: '#E85D1A', border: 'none',
            borderRadius: 9999, fontWeight: 600, fontSize: '0.875rem',
            cursor: 'pointer', textDecoration: 'none', transition: 'all 0.3s'
          }}>
            Join the Programme →
          </Link>
        </div>
      </div>

      <BukkaFooter />

      <style>{`
        @media (max-width: 820px) {
          .hero-inner { grid-template-columns: 1fr !important; text-align: center; }
          .hero-inner > div:first-child { max-width: 100% !important; }
          .hero-inner .hero-decor { display: none !important; }
        }
        @media (max-width: 640px) {
          .grid-3 { grid-template-columns: 1fr !important; }
        }
        .grid-4-scroll {
          grid-auto-flow: column !important;
          grid-template-columns: unset !important;
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
          scroll-snap-type: x mandatory !important;
          padding-bottom: 8px !important;
        }
        .grid-4-scroll > * {
          min-width: 240px !important;
          scroll-snap-align: start !important;
        }
      `}</style>
    </div>
  );
}
