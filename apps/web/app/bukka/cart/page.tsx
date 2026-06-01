'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BukkaNavbar } from '@/components/shared/BukkaNavbar';
import { BukkaFooter } from '@/components/shared/BukkaFooter';

interface CartItem {
  id: string;
  emoji: string;
  gradient: string;
  name: string;
  modifiers: string;
  price: number;
  quantity: number;
  note: string;
}

const mockCartItems: CartItem[] = [
  { id: 'jollof', emoji: '🍛', gradient: 'linear-gradient(135deg,#FFE8D1,#FFC99A)', name: 'Jollof Rice & Chicken', modifiers: 'Grilled Chicken · Medium spice · Extra plantain', price: 5000, quantity: 2, note: '' },
  { id: 'suya', emoji: '🥩', gradient: 'linear-gradient(135deg,#FFC99A,#FF7A2B)', name: 'Suya Skewers', modifiers: 'Extra spicy · 6 pieces', price: 2800, quantity: 1, note: '' },
  { id: 'zobo', emoji: '🥤', gradient: 'linear-gradient(135deg,#FFF5ED,#F5A623)', name: 'Zobo Lemonade', modifiers: 'Large · Extra ginger', price: 1200, quantity: 1, note: '' },
];

const formatPrice = (p: number) => `₦${p.toLocaleString()}`;

export default function BukkaCartPage() {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateNote = (id: string, note: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, note } : item
    ));
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = 500;
  const serviceCharge = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + serviceCharge;

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1A1614', fontFamily: "'Inter', -apple-system, system-ui, sans-serif" }}>
      <BukkaNavbar active="cart" />

      <div className="cart-layout" style={{ paddingTop: 80, maxWidth: 1200, margin: '0 auto', paddingLeft: 24, paddingRight: 24, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, paddingBottom: 60 }}>
        {/* Header */}
        <div style={{ gridColumn: '1 / -1', padding: '24px 0 8px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.875rem' }}>
            Your Cart <span style={{ color: '#7A706A', fontWeight: 400, fontSize: '1.125rem' }}>({totalItems} items)</span>
          </h1>
        </div>

        {/* Left: Cart items */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(item => (
              <div key={item.id} style={{
                display: 'flex', gap: 16,
                background: '#FFFFFF', border: '1px solid #E8E4DD',
                borderRadius: 16, padding: 16,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4CECC'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E4DD'; }}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, background: item.gradient,
                }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ color: '#7A706A', fontSize: '0.75rem', marginTop: 2 }}>{item.modifiers}</div>
                    </div>
                    <div style={{ color: '#E85D1A', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.875rem' }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <textarea
                      rows={1}
                      placeholder="Add note..."
                      value={item.note}
                      onChange={e => updateNote(item.id, e.target.value)}
                      style={{
                        width: '100%', padding: 8, border: '1px solid #E8E4DD',
                        borderRadius: 8, fontSize: '0.75rem', color: '#1A1614',
                        background: '#FFFFFF', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
                        resize: 'none', outline: 'none',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#E85D1A'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#E8E4DD'; }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{
                        width: 28, height: 28, border: '1px solid #E8E4DD', borderRadius: '50%',
                        background: 'transparent', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: 14,
                        color: '#7A706A', transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#E85D1A'; e.currentTarget.style.color = '#E85D1A'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E4DD'; e.currentTarget.style.color = '#7A706A'; }}
                      >
                        −
                      </button>
                      <span style={{ minWidth: 16, textAlign: 'center', fontWeight: 600, fontSize: '0.875rem' }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{
                        width: 28, height: 28, border: '1px solid #E8E4DD', borderRadius: '50%',
                        background: 'transparent', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: 14,
                        color: '#7A706A', transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#E85D1A'; e.currentTarget.style.color = '#E85D1A'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E4DD'; e.currentTarget.style.color = '#7A706A'; }}
                      >
                        +
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{
                      color: '#7A706A', background: 'none', border: 'none',
                      fontSize: 12, cursor: 'pointer', padding: 4, textDecoration: 'underline',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#C0392B'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#7A706A'; }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/bukka/menu" style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: 16,
            color: '#E85D1A', fontWeight: 600, textDecoration: 'none',
            fontSize: '0.875rem', transition: 'gap 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.gap = '12px'; }}
            onMouseLeave={e => { e.currentTarget.style.gap = '8px'; }}
          >
            + Add More Items →
          </Link>
        </div>

        {/* Right: Summary */}
        <div>
          <div style={{
            background: '#FFFFFF', border: '1px solid #E8E4DD',
            borderRadius: 16, padding: 24,
            position: 'sticky', top: 100,
          }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.25rem', marginBottom: 16 }}>Order Summary</h3>

            <div style={{ margin: '12px 0', padding: 12, background: '#FFF5ED', borderRadius: 10, fontSize: '0.875rem', textAlign: 'center' }}>
              <strong style={{ color: '#E85D1A' }}>📍 Delivery</strong> — 15 Awolowo Road, Ikoyi
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.875rem' }}>
              <span style={{ color: '#7A706A' }}>Subtotal ({totalItems} items)</span>
              <span style={{ fontWeight: 500 }}>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.875rem' }}>
              <span style={{ color: '#7A706A' }}>Delivery Fee</span>
              <span style={{ fontWeight: 500 }}>{formatPrice(deliveryFee)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.875rem' }}>
              <span style={{ color: '#7A706A' }}>Service Charge</span>
              <span style={{ fontWeight: 500 }}>{formatPrice(serviceCharge)}</span>
            </div>

            <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
              <input type="text" placeholder="Promo code" style={{
                flex: 1, padding: '8px 12px', border: '1px solid #E8E4DD',
                borderRadius: 9999, fontSize: '0.875rem', outline: 'none',
                background: '#FAFAF8', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
              }}
                onFocus={e => { e.currentTarget.style.borderColor = '#E85D1A'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#E8E4DD'; }}
              />
              <button style={{
                padding: '8px 16px', background: '#E85D1A', color: '#fff',
                border: 'none', borderRadius: 9999, fontSize: '0.75rem',
                fontWeight: 600, cursor: 'pointer',
              }}>Apply</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E8E4DD', marginTop: 8, paddingTop: 12, fontSize: '1.125rem' }}>
              <span style={{ color: '#1A1614', fontWeight: 600 }}>Total</span>
              <span style={{ color: '#E85D1A', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{formatPrice(total)}</span>
            </div>

            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: '0.75rem', color: '#7A706A', display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" style={{ accentColor: '#E85D1A' }} /> Schedule for later
              </label>
            </div>

            <Link href="/bukka/checkout" style={{
              display: 'block', width: '100%', padding: 16,
              background: '#E85D1A', color: '#fff', border: 'none',
              borderRadius: 9999, fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.3s',
              textAlign: 'center', textDecoration: 'none', marginTop: 16,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C44510'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#E85D1A'; }}
            >
              Proceed to Payment →
            </Link>
            <p style={{ fontSize: 10, color: '#7A706A', textAlign: 'center', marginTop: 8 }}>
              🔒 Secured by Paystack
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <BukkaFooter />
    </div>
  );
}
