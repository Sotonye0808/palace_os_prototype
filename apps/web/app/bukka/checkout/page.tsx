'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BukkaNavbar } from '@/components/shared/BukkaNavbar';
import { BukkaFooter } from '@/components/shared/BukkaFooter';

const formatPrice = (p: number) => `₦${p.toLocaleString()}`;

const cartItems = [
  { name: 'Jollof Rice & Chicken', qty: 2, price: 5000 },
  { name: 'Suya Skewers', qty: 1, price: 2800 },
  { name: 'Zobo Lemonade', qty: 1, price: 1200 },
];

export default function BukkaCheckoutPage() {
  const [isScheduled, setIsScheduled] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('pickup');
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.075);
  const delivery = deliveryMethod === 'delivery' ? 500 : 0;
  const total = subtotal + tax + delivery;

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
    }, 2000);
  };

  if (paid) {
    return (
      <div style={{ background: '#FAFAF8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', -apple-system, system-ui, sans-serif" }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#2E7D52', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36, color: '#fff' }}>✓</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.875rem', color: '#2E7D52', marginBottom: 8 }}>Payment Successful!</h2>
          <p style={{ color: '#7A706A', marginBottom: 8 }}>Your order has been placed and is being prepared.</p>
          <p style={{ color: '#7A706A', fontSize: '0.875rem', marginBottom: 24 }}>You&apos;ve earned <strong style={{ color: '#E85D1A' }}>{Math.floor(total * 10)}</strong> loyalty points!</p>
          <Link href="/bukka/order-tracking" style={{
            display: 'inline-block', padding: '14px 32px', background: '#E85D1A', color: '#fff',
            borderRadius: 9999, textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem',
            marginRight: 12,
          }}>Track Order</Link>
          <Link href="/bukka/menu" style={{
            display: 'inline-block', padding: '14px 32px', border: '1px solid #E8E4DD',
            borderRadius: 9999, textDecoration: 'none', color: '#1A1614', fontWeight: 600, fontSize: '0.875rem',
          }}>Order Again</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1A1614', fontFamily: "'Inter', -apple-system, system-ui, sans-serif" }}>
      <BukkaNavbar active="cart" />

      <div className="checkout-layout" style={{ paddingTop: 80, maxWidth: 700, margin: '0 auto', paddingLeft: 24, paddingRight: 24, paddingBottom: 60 }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.875rem', padding: '24px 0' }}>
          Checkout
        </h1>

        {/* Order summary */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E4DD', borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.125rem', marginBottom: 16 }}>Order Summary</h3>
          {cartItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < cartItems.length - 1 ? '1px solid #E8E4DD' : 'none' }}>
              <span style={{ fontSize: '0.875rem' }}>{item.name} × {item.qty}</span>
              <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.875rem' }}>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #E8E4DD' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '4px 0' }}>
              <span style={{ color: '#7A706A' }}>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '4px 0' }}>
              <span style={{ color: '#7A706A' }}>Tax (7.5%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            {delivery > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '4px 0' }}>
                <span style={{ color: '#7A706A' }}>Delivery Fee</span>
                <span>{formatPrice(delivery)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 700, paddingTop: 8, borderTop: '1px solid #E8E4DD', marginTop: 8 }}>
              <span>Total</span>
              <span style={{ color: '#E85D1A', fontFamily: "'JetBrains Mono', monospace" }}>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Scheduling */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E4DD', borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.125rem', marginBottom: 12 }}>When would you like your meal?</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={isScheduled} onChange={e => setIsScheduled(e.target.checked)} style={{ accentColor: '#E85D1A' }} />
            Schedule for later
          </label>
          {isScheduled && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              <input type="date" style={{
                padding: '10px 12px', border: '1px solid #E8E4DD', borderRadius: 8,
                fontSize: '0.875rem', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
              }} />
              <input type="time" style={{
                padding: '10px 12px', border: '1px solid #E8E4DD', borderRadius: 8,
                fontSize: '0.875rem', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
              }} />
            </div>
          )}
        </div>

        {/* Delivery/Pickup */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E4DD', borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.125rem', marginBottom: 12 }}>How would you like to receive your order?</h3>
          <div style={{ display: 'flex', gap: 16 }}>
            {(['pickup', 'delivery'] as const).map(method => (
              <label key={method} style={{
                flex: 1, padding: 16, border: `1px solid ${deliveryMethod === method ? '#E85D1A' : '#E8E4DD'}`,
                borderRadius: 10, cursor: 'pointer', textAlign: 'center',
                background: deliveryMethod === method ? '#FFF5ED' : '#FFFFFF',
              }}>
                <input type="radio" name="method" checked={deliveryMethod === method} onChange={() => setDeliveryMethod(method)} style={{ display: 'none' }} />
                <div style={{ fontSize: 24, marginBottom: 4 }}>{method === 'pickup' ? '🏪' : '🚚'}</div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{method === 'pickup' ? 'Pickup' : 'Delivery'}</div>
                <div style={{ fontSize: '0.75rem', color: '#7A706A' }}>{method === 'pickup' ? 'Free' : `₦500 fee`}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E4DD', borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.125rem', marginBottom: 16 }}>Payment</h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: 12, background: '#FFF5ED', borderRadius: 10 }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Total to Pay</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: '#E85D1A' }}>{formatPrice(total)}</span>
          </div>

          <button onClick={handlePay} disabled={paying} style={{
            display: 'block', width: '100%', padding: 16,
            background: paying ? '#CCC' : '#E85D1A', color: '#fff',
            border: 'none', borderRadius: 9999, fontSize: '1rem', fontWeight: 600,
            cursor: paying ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
          }} onMouseEnter={e => { if (!paying) e.currentTarget.style.background = '#C44510'; }} onMouseLeave={e => { if (!paying) e.currentTarget.style.background = '#E85D1A'; }}>
            {paying ? 'Processing...' : `Pay ${formatPrice(total)}`}
          </button>

          <p style={{ fontSize: 10, color: '#7A706A', textAlign: 'center', marginTop: 8 }}>
            🔒 Secured by Paystack · We support Paystack, Flutterwave & Cash on Delivery
          </p>
        </div>
      </div>

      <BukkaFooter />
    </div>
  );
}
