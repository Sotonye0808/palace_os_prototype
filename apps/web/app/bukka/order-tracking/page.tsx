'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BukkaNavbar } from '@/components/shared/BukkaNavbar';

export default function BukkaOrderTrackingPage() {
  const [summaryOpen, setSummaryOpen] = useState(false);

  return (
    <div style={{
      background: '#FAFAF8', minHeight: '100vh',
      color: '#1A1614',
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      WebkitFontSmoothing: 'antialiased',
    }}>
      <BukkaNavbar />

      <div style={{ paddingTop: 80, maxWidth: 600, margin: '0 auto', paddingLeft: 24, paddingRight: 24, paddingBottom: 60 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.875rem', color: '#7A706A' }}>
            #BUK-20250527-0842
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.875rem', marginTop: 4 }}>
            Tracking Your <span style={{ color: '#E85D1A' }}>Order</span>
          </h1>
        </div>

        {/* Map placeholder */}
        <div style={{
          background: 'linear-gradient(135deg, #2A2420, #3D3733)',
          borderRadius: 16, height: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginBottom: 24,
        }}>
          🗺️ Live Map — Your rider is on the way (demo)
        </div>

        {/* ETA Card */}
        <div style={{
          background: 'linear-gradient(135deg, #E85D1A, #C44510)',
          borderRadius: 16, padding: 32, textAlign: 'center', color: '#fff', marginBottom: 24,
        }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.8 }}>
            Estimated Arrival
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.2, margin: '4px 0' }}>
            12 min
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Your order will arrive by 2:42 PM
          </div>
        </div>

        {/* Status stepper */}
        <div style={{ padding: '24px 0' }}>
          {[
            { title: 'Order Placed', time: '2:05 PM', completed: true },
            { title: 'Order Confirmed', time: '2:07 PM', completed: true },
            { title: 'Preparing Your Meal', time: 'Your jollof rice is being cooked fresh', completed: false, active: true },
            { title: 'Out for Delivery', time: 'Rider will pick up soon', completed: false },
            { title: 'Delivered', time: 'Enjoy your meal!', completed: false },
          ].map((step, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, paddingBottom: 24, position: 'relative',
            }}>
              {i < 4 && (
                <div style={{
                  position: 'absolute', left: 15, top: 36,
                  width: 2, height: 'calc(100% - 24px)',
                  background: step.completed ? '#E85D1A' : '#E8E4DD',
                }} />
              )}
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, zIndex: 1,
                background: step.active ? '#E85D1A' : step.completed ? '#2E7D52' : '#E8E4DD',
                color: step.completed || step.active ? '#fff' : '#7A706A',
                animation: step.active ? 'pulse 1.5s infinite' : 'none',
              }}>
                {step.completed ? '✓' : step.active ? '●' : '○'}
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: step.active ? '#E85D1A' : step.completed ? '#2E7D52' : '#1A1614' }}>
                  {step.title}
                </div>
                <div style={{ color: '#7A706A', fontSize: '0.75rem' }}>{step.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary accordion */}
        <div style={{
          background: '#FFFFFF', border: '1px solid #E8E4DD',
          borderRadius: 16, padding: 20, marginTop: 8,
        }}>
          <div onClick={() => setSummaryOpen(!summaryOpen)} style={{
            display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.875rem',
          }}>
            <span>Order Summary</span>
            <span>
              <strong>3 items</strong> · <span style={{ color: '#E85D1A', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>₦9,950</span>
              <span style={{ marginLeft: 8 }}>{summaryOpen ? '▲' : '▼'}</span>
            </span>
          </div>
          {summaryOpen && (
            <div style={{ marginTop: 12 }}>
              {[
                { qty: '2×', name: 'Jollof Rice & Chicken', price: '₦7,000' },
                { qty: '1×', name: 'Suya Skewers (6pcs)', price: '₦2,800' },
                { qty: '1×', name: 'Zobo Lemonade', price: '₦1,200' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '6px 0', color: '#7A706A' }}>
                  <span style={{ color: '#7A706A' }}>{item.qty}</span>
                  <span style={{ flex: 1, paddingLeft: 8 }}>{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
              <div style={{
                display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem',
                padding: '8px 0 0', marginTop: 4, borderTop: '1px solid #E8E4DD',
              }}>
                <span style={{ fontWeight: 600, color: '#1A1614' }}>Total</span>
                <span style={{ color: '#E85D1A', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>₦9,950</span>
              </div>
            </div>
          )}
        </div>

        {/* Help card */}
        <div style={{
          background: '#FFF5ED', borderRadius: 16, padding: 20, marginTop: 16, textAlign: 'center',
        }}>
          <p style={{ color: '#7A706A', fontSize: '0.875rem', marginBottom: 8 }}>Having an issue with your order?</p>
          <Link href="#" style={{ color: '#E85D1A', fontWeight: 600, textDecoration: 'none' }}>
            📱 Chat with us on WhatsApp →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(232,93,26,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(232,93,26,0); }
        }
      `}</style>
    </div>
  );
}
