'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AddressBookService, Address } from '@/lib/services/addressBook';

const mockAddresses: Address[] = [
  {
    id: '1', user_id: 'mock', label: 'Home',
    address_line_1: '15 Awolowo Road', address_line_2: 'Flat 3B',
    city: 'Ikoyi', state: 'Lagos', postal_code: '101233', country: 'Nigeria',
    latitude: 6.45, longitude: 3.43, is_default: true,
    google_place_id: null, formatted_address: null,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '2', user_id: 'mock', label: 'Office',
    address_line_1: '42 Marina Street', address_line_2: '10th Floor',
    city: 'Lagos Island', state: 'Lagos', postal_code: '101001', country: 'Nigeria',
    latitude: 6.45, longitude: 3.40, is_default: false,
    google_place_id: null, formatted_address: null,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
];

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await AddressBookService.getAddresses();
        if (result.success) {
          setAddresses(result.data || []);
        } else if (result.error === 'User not authenticated') {
          setAddresses(mockAddresses);
        } else {
          setError(result.error || 'Failed to load addresses');
        }
      } catch {
        setAddresses(mockAddresses);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await AddressBookService.deleteAddress(id);
    if (!result.success && result.error !== 'User not authenticated') {
      setError(result.error || 'Failed to delete');
      return;
    }
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const handleSetDefault = async (id: string) => {
    const result = await AddressBookService.setAsDefault(id);
    if (!result.success && result.error !== 'User not authenticated') {
      setError(result.error || 'Failed to set as default');
      return;
    }
    setAddresses(prev => prev.map(a => ({ ...a, is_default: a.id === id })));
  };

  const formatPrice = (p: number) => `₦${p.toLocaleString()}`;

  if (loading) {
    return (
      <div style={{ background: '#FAFAF8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A706A', fontFamily: "'Inter', sans-serif" }}>
        Loading addresses...
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1A1614', fontFamily: "'Inter', -apple-system, system-ui, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DD' }}>
        <Link href="/account-hub" style={{ color: '#7A706A', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4 }}>← Back to Account</Link>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.875rem' }}>Address Book</h1>
          <button onClick={() => { setEditing(null); setFormVisible(true); }} style={{
            padding: '10px 20px', background: '#E85D1A', color: '#fff', border: 'none',
            borderRadius: 9999, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
          }}>+ Add Address</button>
        </div>

        {error && (
          <div style={{ padding: 12, background: '#FFF0ED', borderRadius: 10, marginBottom: 16, fontSize: '0.875rem', color: '#C0392B' }}>{error}</div>
        )}

        {addresses.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#7A706A' }}>
            <p style={{ fontSize: '1.125rem', marginBottom: 8 }}>No addresses saved yet</p>
            <p style={{ fontSize: '0.875rem' }}>Add an address to speed up checkout</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {addresses.map(addr => (
            <div key={addr.id} style={{
              background: '#FFFFFF', border: `1px solid ${addr.is_default ? '#E85D1A' : '#E8E4DD'}`,
              borderRadius: 16, padding: 20, transition: 'all 0.2s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>{addr.label}</span>
                    {addr.is_default && (
                      <span style={{ padding: '2px 8px', background: '#FFF5ED', borderRadius: 4, fontSize: 9, fontWeight: 600, color: '#E85D1A' }}>DEFAULT</span>
                    )}
                  </div>
                  <p style={{ color: '#7A706A', fontSize: '0.875rem' }}>{addr.address_line_1}</p>
                  {addr.address_line_2 && <p style={{ color: '#7A706A', fontSize: '0.875rem' }}>{addr.address_line_2}</p>}
                  <p style={{ color: '#7A706A', fontSize: '0.875rem' }}>{addr.city}, {addr.state} {addr.postal_code}</p>
                  <p style={{ color: '#7A706A', fontSize: '0.875rem' }}>{addr.country}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {!addr.is_default && (
                    <button onClick={() => handleSetDefault(addr.id)} style={{
                      padding: '6px 12px', border: '1px solid #E8E4DD', borderRadius: 9999,
                      background: 'transparent', fontSize: '0.75rem', color: '#7A706A', cursor: 'pointer',
                    }}>Set Default</button>
                  )}
                  <button onClick={() => { setEditing(addr.id); setFormVisible(true); }} style={{
                    padding: '6px 12px', border: '1px solid #E8E4DD', borderRadius: 9999,
                    background: 'transparent', fontSize: '0.75rem', color: '#7A706A', cursor: 'pointer',
                  }}>Edit</button>
                  <button onClick={() => handleDelete(addr.id)} style={{
                    padding: '6px 12px', border: '1px solid #E8E4DD', borderRadius: 9999,
                    background: 'transparent', fontSize: '0.75rem', color: '#C0392B', cursor: 'pointer',
                  }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form modal */}
      {formVisible && (
        <>
          <div onClick={() => setFormVisible(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200 }} />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
            background: '#FFFFFF', borderRadius: '20px 20px 0 0', padding: 24,
            maxHeight: '80vh', overflowY: 'auto', fontFamily: "'Inter', sans-serif",
          }}>
            <div style={{ width: 40, height: 4, background: '#E8E4DD', borderRadius: 2, margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.25rem', marginBottom: 16 }}>
              {editing ? 'Edit Address' : 'Add New Address'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#7A706A', marginBottom: 4 }}>Label</label>
                <input type="text" placeholder="e.g. Home, Work" defaultValue={editing ? addresses.find(a => a.id === editing)?.label : ''} style={{
                  width: '100%', padding: '10px 14px', border: '1px solid #E8E4DD', borderRadius: 8,
                  fontSize: '0.875rem', fontFamily: "'Inter', sans-serif",
                }} onFocus={e => e.currentTarget.style.borderColor = '#E85D1A'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DD'} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#7A706A', marginBottom: 4 }}>Address Line 1</label>
                <input type="text" placeholder="Street address" defaultValue={editing ? addresses.find(a => a.id === editing)?.address_line_1 : ''} style={{
                  width: '100%', padding: '10px 14px', border: '1px solid #E8E4DD', borderRadius: 8,
                  fontSize: '0.875rem', fontFamily: "'Inter', sans-serif",
                }} onFocus={e => e.currentTarget.style.borderColor = '#E85D1A'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DD'} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#7A706A', marginBottom: 4 }}>Address Line 2 (optional)</label>
                <input type="text" placeholder="Apartment, suite, etc." style={{
                  width: '100%', padding: '10px 14px', border: '1px solid #E8E4DD', borderRadius: 8,
                  fontSize: '0.875rem', fontFamily: "'Inter', sans-serif",
                }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#7A706A', marginBottom: 4 }}>City</label>
                  <input type="text" style={{
                    width: '100%', padding: '10px 14px', border: '1px solid #E8E4DD', borderRadius: 8,
                    fontSize: '0.875rem', fontFamily: "'Inter', sans-serif",
                  }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#7A706A', marginBottom: 4 }}>State</label>
                  <input type="text" style={{
                    width: '100%', padding: '10px 14px', border: '1px solid #E8E4DD', borderRadius: 8,
                    fontSize: '0.875rem', fontFamily: "'Inter', sans-serif",
                  }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setFormVisible(false)} style={{
                  flex: 1, padding: 12, border: '1px solid #E8E4DD', borderRadius: 9999,
                  background: 'transparent', color: '#7A706A', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                }}>Cancel</button>
                <button onClick={() => { setFormVisible(false); }} style={{
                  flex: 1, padding: 12, background: '#E85D1A', color: '#fff', border: 'none',
                  borderRadius: 9999, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                }}>Save Address</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
