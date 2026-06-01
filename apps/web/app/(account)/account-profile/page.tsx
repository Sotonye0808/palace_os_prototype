'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AccountProfilePage() {
  const [name, setName] = useState('Chioma Okafor');
  const [email, setEmail] = useState('chioma@example.com');
  const [phone, setPhone] = useState('+234 800 000 0000');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1A1614', fontFamily: "'Inter', -apple-system, system-ui, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DD' }}>
        <Link href="/account-hub" style={{ color: '#7A706A', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Back to Account</Link>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.875rem', marginBottom: 24 }}>Profile Settings</h1>

        {/* Profile header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20,
          background: '#FFFFFF', border: '1px solid #E8E4DD',
          borderRadius: 16, padding: 24, marginBottom: 24,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: '#E85D1A', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontSize: 36,
            fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", flexShrink: 0,
          }}>C</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{name}</div>
            <div style={{ color: '#7A706A', fontSize: '0.875rem' }}>{email}</div>
          </div>
          <button style={{
            padding: '8px 16px', border: '1px solid #E8E4DD', borderRadius: 9999,
            background: 'transparent', color: '#1A1614', fontSize: '0.75rem',
            fontWeight: 500, cursor: 'pointer',
          }}>Change Photo</button>
        </div>

        {/* Form */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E4DD', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#7A706A', marginBottom: 6 }}>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} style={{
              width: '100%', padding: '12px 16px', border: '1px solid #E8E4DD',
              borderRadius: 8, fontSize: '1rem', color: '#1A1614', background: '#FFFFFF',
              fontFamily: "'Inter', -apple-system, system-ui, sans-serif", outline: 'none',
            }} onFocus={e => e.currentTarget.style.borderColor = '#E85D1A'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DD'} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#7A706A', marginBottom: 6 }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{
              width: '100%', padding: '12px 16px', border: '1px solid #E8E4DD',
              borderRadius: 8, fontSize: '1rem', color: '#1A1614', background: '#FFFFFF',
              fontFamily: "'Inter', -apple-system, system-ui, sans-serif", outline: 'none',
            }} onFocus={e => e.currentTarget.style.borderColor = '#E85D1A'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DD'} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#7A706A', marginBottom: 6 }}>Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={{
              width: '100%', padding: '12px 16px', border: '1px solid #E8E4DD',
              borderRadius: 8, fontSize: '1rem', color: '#1A1614', background: '#FFFFFF',
              fontFamily: "'Inter', -apple-system, system-ui, sans-serif", outline: 'none',
            }} onFocus={e => e.currentTarget.style.borderColor = '#E85D1A'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DD'} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#7A706A', marginBottom: 6 }}>Delivery Address</label>
            <input type="text" defaultValue="15 Awolowo Road, Ikoyi, Lagos" style={{
              width: '100%', padding: '12px 16px', border: '1px solid #E8E4DD',
              borderRadius: 8, fontSize: '1rem', color: '#1A1614', background: '#FFFFFF',
              fontFamily: "'Inter', -apple-system, system-ui, sans-serif", outline: 'none',
            }} onFocus={e => e.currentTarget.style.borderColor = '#E85D1A'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DD'} />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button onClick={() => { setName('Chioma Okafor'); setEmail('chioma@example.com'); setPhone('+234 800 000 0000'); }} style={{
              padding: '12px 24px', border: '1px solid #E8E4DD', borderRadius: 9999,
              background: 'transparent', color: '#7A706A', fontSize: '0.875rem',
              fontWeight: 600, cursor: 'pointer',
            }}>Cancel</button>
            <button onClick={handleSave} style={{
              padding: '12px 24px', background: '#E85D1A', color: '#fff',
              border: 'none', borderRadius: 9999, fontSize: '0.875rem',
              fontWeight: 600, cursor: 'pointer',
            }} onMouseEnter={e => e.currentTarget.style.background = '#C44510'} onMouseLeave={e => e.currentTarget.style.background = '#E85D1A'}>
              {saved ? 'Saved ✓' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E4DD', borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.125rem', color: '#C0392B', marginBottom: 8 }}>Danger Zone</h3>
          <p style={{ color: '#7A706A', fontSize: '0.875rem', marginBottom: 12 }}>Permanently delete your account and all associated data. This action cannot be undone.</p>
          <button style={{
            padding: '10px 20px', border: '1px solid #C0392B', borderRadius: 9999,
            background: 'transparent', color: '#C0392B', fontSize: '0.875rem',
            fontWeight: 600, cursor: 'pointer',
          }} onMouseEnter={e => { e.currentTarget.style.background = '#C0392B'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C0392B'; }}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
