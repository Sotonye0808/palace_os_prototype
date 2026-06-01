'use client';

import Link from 'next/link';

const formatPrice = (p: number) => `₦${p.toLocaleString()}`;

export default function AccountLoyaltyPage() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1A1614', fontFamily: "'Inter', -apple-system, system-ui, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DD' }}>
        <Link href="/account-hub" style={{ color: '#7A706A', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Back to Account</Link>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        {/* Points hero */}
        <div style={{
          background: 'linear-gradient(135deg, #E85D1A, #C44510, #9E2E08)',
          borderRadius: 16, padding: 32, color: '#fff',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 20, marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 36,
            }}>⭐</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.5rem', fontWeight: 700 }}>Gold Member</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.85 }}>You&apos;ve earned 3,750 points so far</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{formatPrice(3750)}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.85 }}>Points Balance</div>
          </div>
        </div>

        {/* Tier progress */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E4DD', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.25rem', marginBottom: 16 }}>Your Tier Progress</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.75rem', color: '#7A706A' }}>
            <span>Bronze • 0 pts</span>
            <span>Silver • 1,000 pts</span>
            <span>Gold • 2,500 pts</span>
            <span>Royal • 5,000 pts</span>
          </div>
          <div style={{ height: 8, background: '#E8E4DD', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #E85D1A, #F5A623)', borderRadius: 4, width: '75%' }} />
            <div style={{ position: 'absolute', top: -4, left: '75%', width: 16, height: 16, borderRadius: '50%', background: '#E85D1A', border: '2px solid #fff' }} />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#7A706A', marginTop: 8 }}>1,250 points to unlock <strong style={{ color: '#F5A623' }}>Royal Tier</strong></p>
        </div>

        {/* How it works */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E4DD', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.25rem', marginBottom: 16 }}>How It Works</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { icon: '🍛', title: 'Earn Points', desc: 'Earn 10 points for every ₦1 spent at FoliXx Bukka and Secrets Palace.' },
              { icon: '⭐', title: 'Unlock Tiers', desc: 'Move up through Bronze, Silver, Gold, and Royal tiers — each with bigger perks.' },
              { icon: '🎁', title: 'Redeem Rewards', desc: 'Use your points for discounts, free items, VIP upgrades, and exclusive events.' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
                <h4 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 4 }}>{item.title}</h4>
                <p style={{ color: '#7A706A', fontSize: '0.75rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction history */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E4DD', borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.25rem', marginBottom: 16 }}>Points History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { desc: 'Jollof Rice & Chicken — FoliXx Bukka', date: 'Today', pts: '+240', type: 'earned' },
              { desc: 'Suya Skewers order — FoliXx Bukka', date: 'Yesterday', pts: '+180', type: 'earned' },
              { desc: 'VIP Table Booking — Secrets Palace', date: '3 days ago', pts: '+500', type: 'earned' },
              { desc: 'Free Zobo Lemonade redeemed', date: '1 week ago', pts: '-150', type: 'redeemed' },
              { desc: 'Ladies Night Ticket — Secrets Palace', date: '2 weeks ago', pts: '+350', type: 'earned' },
            ].map((tx, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid #E8E4DD' : 'none' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{tx.desc}</div>
                  <div style={{ fontSize: '0.75rem', color: '#7A706A' }}>{tx.date}</div>
                </div>
                <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.875rem', color: tx.type === 'earned' ? '#2E7D52' : '#C0392B' }}>
                  {tx.pts}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
