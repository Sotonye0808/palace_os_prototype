'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PalaceNavbar } from '@/components/shared/PalaceNavbar';
import { PalaceFooter } from '@/components/shared/PalaceFooter';

const formatPrice = (p: number) => `₦${p.toLocaleString()}`;

const packages = [
  { id: 'standard', name: 'Standard', price: '₦50,000 min.', desc: 'General admission seating' },
  { id: 'vip', name: 'VIP', price: '₦150,000 min.', desc: 'Premium section + host' },
  { id: 'vvip', name: 'VVIP', price: '₦350,000 min.', desc: 'Private suite + champagne' },
];

const floorCells: ({ type: 'empty' | 'available' | 'reserved' | 'vvip'; table?: string } | null)[][] = [
  [null, { type: 'available', table: 'T1' }, { type: 'available', table: 'T2' }, { type: 'available', table: 'T3' }, null],
  [{ type: 'available', table: 'T4' }, { type: 'available', table: 'T5' }, { type: 'reserved' }, { type: 'available', table: 'T7' }, { type: 'reserved' }],
  [null, { type: 'available', table: 'T8' }, { type: 'reserved' }, { type: 'available', table: 'T9' }, null],
  [{ type: 'vvip', table: 'V1' }, { type: 'reserved' }, { type: 'available', table: 'T10' }, { type: 'available', table: 'T11' }, { type: 'vvip', table: 'V2' }],
  [null, { type: 'vvip', table: 'VVIP' }, { type: 'available', table: 'T12' }, { type: 'reserved' }, null],
];

const drinkCategories = ['All', 'Champagne', 'Spirits', 'Cocktails', 'Non-Alcoholic'];

const drinks = [
  { name: "Moët & Chandon", detail: 'Brut Impérial · 750ml', price: 85000, cat: 'champagne' },
  { name: 'Dom Pérignon', detail: 'Vintage 2015 · 750ml', price: 250000, cat: 'champagne' },
  { name: 'Hennessy X.O', detail: 'Cognac · 700ml', price: 120000, cat: 'spirits' },
  { name: 'Johnnie Walker Blue', detail: 'Blended Scotch · 700ml', price: 180000, cat: 'spirits' },
  { name: 'Secrets Signature', detail: 'House cocktail · Gold rim', price: 12000, cat: 'cocktails' },
  { name: 'Premium Water', detail: 'Acqua Panna · 750ml', price: 3000, cat: 'non-alc' },
];

export default function PalaceReservePage() {
  const [step, setStep] = useState(0);
  const [partySize, setPartySize] = useState(4);
  const [selectedPkg, setSelectedPkg] = useState('standard');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [drinkQtys, setDrinkQtys] = useState<number[]>(drinks.map(() => 0));
  const [drinkFilter, setDrinkFilter] = useState('All');
  const [specialRequests, setSpecialRequests] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [date, setDate] = useState('');

  const totalSteps = 4;
  const nextStep = () => { if (step < totalSteps - 1) { setStep(step + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const prevStep = () => { if (step > 0) { setStep(step - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };

  const drinkTotal = drinkQtys.reduce((sum, qty, i) => sum + qty * drinks[i].price, 0);

  const totalItems = step + 1;

  return (
    <div style={{
      background: 'oklch(12% 0.005 260)',
      minHeight: '100vh',
      color: 'oklch(95% 0.003 260)',
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      WebkitFontSmoothing: 'antialiased',
    }}>
      <PalaceNavbar active="reserve" />

      <div style={{ paddingTop: 80, maxWidth: 900, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        {confirmed ? (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '48px 0', animation: 'fadeIn 0.5s ease' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: '#10B981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', fontSize: 36, color: '#0E0E1A'
            }}>
              ✓
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.25rem', marginBottom: 8 }}>Booking Confirmed!</h2>
            <p style={{ marginBottom: 8, color: 'oklch(95% 0.003 260)' }}>Your table at Secrets Palace is secured.</p>
            <p style={{ color: '#5F5F88', fontSize: '0.875rem' }}>A confirmation has been sent to your email.</p>
            <p style={{ color: '#D4A017', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', marginTop: 16 }}>
              ♛ #SP-{date.replace(/-/g, '') || 'TBD'}
            </p>
            <p style={{ color: '#5F5F88', fontSize: '0.75rem', marginTop: 4 }}>Show this code at the door</p>
            <div style={{ marginTop: 24 }}>
              <Link href="/palace" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', background: '#D4A017', color: '#0E0E1A',
                border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600,
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
                textDecoration: 'none',
              }}>
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ textAlign: 'center', paddingTop: 24 }}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '2.25rem', marginBottom: 8,
              }}>
                Reserve <span style={{ color: '#D4A017' }}>Your Table</span>
              </h1>
              <p style={{ color: '#5F5F88' }}>Four easy steps to the ultimate nightlife experience</p>
            </div>

            {/* Step indicator */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 0, padding: '40px 0 32px',
            }}>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="step-item" style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      border: `2px solid ${i < step ? '#10B981' : i === step ? '#D4A017' : '#5F5F88'}`,
                      background: i < step ? '#10B981' : i === step ? '#D4A017' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.875rem', fontWeight: 600,
                      color: i <= step ? '#0E0E1A' : '#5F5F88',
                      flexShrink: 0,
                    }}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span style={{
                      fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                      color: i <= step ? '#D4A017' : '#5F5F88',
                      display: 'none',
                    }}>
                      {i === 0 ? 'Date & Party' : i === 1 ? 'Select Table' : i === 2 ? 'Drinks' : 'Confirm'}
                    </span>
                  </div>
                  {i < totalSteps - 1 && (
                    <div style={{
                      width: 60, height: 2,
                      background: i < step ? '#D4A017' : '#5F5F88',
                      margin: '0 8px',
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 0: Date & Party */}
            {step === 0 && (
              <div style={{ animation: 'fadeIn 0.4s ease' }}>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#5F5F88', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 16px',
                      background: 'oklch(14% 0.008 260)',
                      border: '1px solid rgba(173,173,200,0.12)',
                      borderRadius: 8, color: 'oklch(95% 0.003 260)',
                      fontSize: '1rem', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
                      outline: 'none',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#D4A017'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; }}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#5F5F88', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Party Size
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button onClick={() => setPartySize(Math.max(1, partySize - 1))} style={{
                      width: 44, height: 44,
                      border: '1px solid rgba(173,173,200,0.12)', borderRadius: 8,
                      background: 'oklch(14% 0.008 260)', color: 'oklch(95% 0.003 260)',
                      fontSize: '1.25rem', cursor: 'pointer', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.color = 'oklch(95% 0.003 260)'; }}
                    >
                      −
                    </button>
                    <span style={{
                      fontSize: '1.5rem', fontWeight: 700,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      minWidth: 48, textAlign: 'center',
                    }}>
                      {partySize}
                    </span>
                    <button onClick={() => setPartySize(Math.min(20, partySize + 1))} style={{
                      width: 44, height: 44,
                      border: '1px solid rgba(173,173,200,0.12)', borderRadius: 8,
                      background: 'oklch(14% 0.008 260)', color: 'oklch(95% 0.003 260)',
                      fontSize: '1.25rem', cursor: 'pointer', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.color = 'oklch(95% 0.003 260)'; }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#5F5F88', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Package
                  </label>
                  <div className="packages-wrap" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {packages.map(pkg => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg.id)}
                        style={{
                          flex: 1, minWidth: 160, padding: 16,
                          border: `1px solid ${selectedPkg === pkg.id ? '#D4A017' : 'rgba(173,173,200,0.12)'}`,
                          borderRadius: 10,
                          background: selectedPkg === pkg.id ? 'rgba(212,160,23,0.06)' : 'oklch(14% 0.008 260)',
                          cursor: 'pointer', textAlign: 'center',
                          transition: 'all 0.3s',
                        }}
                        onMouseEnter={e => { if (selectedPkg !== pkg.id) e.currentTarget.style.borderColor = 'rgba(212,160,23,0.3)'; }}
                        onMouseLeave={e => { if (selectedPkg !== pkg.id) e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; }}
                      >
                        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.125rem', fontWeight: 600 }}>{pkg.name}</div>
                        <div style={{ color: '#D4A017', fontSize: '0.875rem', marginTop: 4 }}>{pkg.price}</div>
                        <div style={{ color: '#5F5F88', fontSize: '0.75rem', marginTop: 6 }}>{pkg.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32, gap: 12, flexWrap: 'wrap' }}>
                  <button onClick={nextStep} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', background: '#D4A017', color: '#0E0E1A',
                    border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FBBF24'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#D4A017'; }}
                  >
                    Check Availability →
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Select Table */}
            {step === 1 && (
              <div style={{ animation: 'fadeIn 0.4s ease' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.875rem', marginBottom: 8 }}>
                  Choose Your <span style={{ color: '#D4A017' }}>Table</span>
                </h3>
                <p style={{ color: '#5F5F88', marginBottom: 32 }}>Tap a table on the floor plan to select it</p>

                <div className="floor-map" style={{
                  display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 8, maxWidth: 500, margin: '0 auto',
                }}>
                  {floorCells.flat().map((cell, i) => {
                    if (!cell) return <div key={i} />;
                    const isSelected = cell.type !== 'empty' && selectedTable === cell.table;
                    const isSelectable = cell.type === 'available' || cell.type === 'vvip';
                    const isReserved = cell.type === 'reserved';
                    return (
                      <div
                        key={i}
                        onClick={() => { if (isSelectable && cell.table) setSelectedTable(cell.table); }}
                        style={{
                          aspectRatio: 1,
                          border: `1px solid ${isSelected ? '#D4A017' : isReserved ? 'rgba(173,173,200,0.12)' : cell.type === 'vvip' ? 'rgba(139,92,246,0.3)' : 'rgba(212,160,23,0.3)'}`,
                          borderRadius: 8,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, color: isSelected ? '#0E0E1A' : isReserved ? '#5F5F88' : cell.type === 'vvip' ? '#8B5CF6' : '#5F5F88',
                          background: isSelected ? '#D4A017' : isReserved ? 'transparent' : 'transparent',
                          cursor: isSelectable ? 'pointer' : 'not-allowed',
                          opacity: isReserved ? 0.3 : 1,
                          transition: 'all 0.3s',
                        }}
                        onMouseEnter={e => {
                          if (isSelectable && !isSelected) {
                            e.currentTarget.style.borderColor = '#D4A017';
                            e.currentTarget.style.background = 'rgba(212,160,23,0.1)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (isSelectable && !isSelected) {
                            e.currentTarget.style.borderColor = cell.type === 'vvip' ? 'rgba(139,92,246,0.3)' : 'rgba(212,160,23,0.3)';
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        {cell.table || 'RSV'}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#5F5F88' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, border: '1px solid rgba(212,160,23,0.3)' }} /> Available
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#5F5F88' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: '#D4A017' }} /> Selected
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#5F5F88' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: '#5F5F88', opacity: 0.3 }} /> Reserved
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#5F5F88' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, border: '1px solid rgba(139,92,246,0.3)' }} /> VVIP Zone
                  </span>
                </div>

                {selectedTable && (
                  <div style={{
                    background: 'oklch(14% 0.008 260)', border: '1px solid rgba(212,160,23,0.3)',
                    borderRadius: 10, padding: 16, marginTop: 16, textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#5F5F88' }}>Selected Table</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 700, color: '#D4A017' }}>
                      {selectedTable}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#5F5F88' }}>Capacity: 4 persons · Main Floor</div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12, flexWrap: 'wrap' }}>
                  <button onClick={prevStep} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', background: 'transparent', color: '#5F5F88',
                    border: '1px solid rgba(173,173,200,0.12)', borderRadius: 8,
                    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.color = '#5F5F88'; }}
                  >
                    ← Back
                  </button>
                  <button onClick={nextStep} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', background: '#D4A017', color: '#0E0E1A',
                    border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FBBF24'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#D4A017'; }}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Pre-Order Drinks */}
            {step === 2 && (
              <div style={{ animation: 'fadeIn 0.4s ease' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.875rem', marginBottom: 8 }}>
                  Pre-Order <span style={{ color: '#D4A017' }}>Drinks</span>
                </h3>
                <p style={{ color: '#5F5F88', marginBottom: 32 }}>Skip the line — your drinks will be ready at your table</p>

                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {drinkCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setDrinkFilter(cat)}
                      style={{
                        padding: '6px 16px',
                        border: `1px solid ${drinkFilter === cat ? '#D4A017' : 'rgba(173,173,200,0.12)'}`,
                        borderRadius: 20,
                        background: drinkFilter === cat ? '#D4A017' : 'transparent',
                        color: drinkFilter === cat ? '#0E0E1A' : '#5F5F88',
                        fontSize: '0.75rem', cursor: 'pointer',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                        transition: 'all 0.2s', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

        <div className="drinks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {drinks.filter(d => drinkFilter === 'All' || d.cat === drinkFilter.toLowerCase()).map((drink, i) => {
                    const globalIdx = drinks.indexOf(drink);
                    return (
                      <div key={i} style={{
                        background: 'oklch(14% 0.008 260)',
                        border: '1px solid rgba(173,173,200,0.12)',
                        borderRadius: 10, padding: 16,
                        display: 'flex', flexDirection: 'column',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div>
                            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: '1.125rem' }}>{drink.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#5F5F88' }}>{drink.detail}</div>
                          </div>
                          <div style={{ color: '#D4A017', fontWeight: 600 }}>{formatPrice(drink.price)}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                          <button onClick={() => setDrinkQtys(prev => prev.map((q, j) => j === globalIdx ? Math.max(0, q - 1) : q))} style={{
                            width: 32, height: 32,
                            border: '1px solid rgba(173,173,200,0.12)', borderRadius: 6,
                            background: 'transparent', color: 'oklch(95% 0.003 260)',
                            cursor: 'pointer', fontSize: '1rem', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                          }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.color = 'oklch(95% 0.003 260)'; }}
                          >
                            −
                          </button>
                          <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 600 }}>{drinkQtys[globalIdx]}</span>
                          <button onClick={() => setDrinkQtys(prev => prev.map((q, j) => j === globalIdx ? q + 1 : q))} style={{
                            width: 32, height: 32,
                            border: '1px solid rgba(173,173,200,0.12)', borderRadius: 6,
                            background: 'transparent', color: 'oklch(95% 0.003 260)',
                            cursor: 'pointer', fontSize: '1rem', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                          }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.color = 'oklch(95% 0.003 260)'; }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  position: 'sticky', bottom: 0,
                  background: 'oklch(16% 0.01 260)',
                  border: '1px solid rgba(173,173,200,0.12)',
                  borderRadius: 10, padding: '16px 20px',
                  marginTop: 16, display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ color: '#5F5F88' }}>Drinks Total</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 700, color: '#D4A017' }}>
                    {formatPrice(drinkTotal)}
                  </span>
                </div>

                <div style={{ marginTop: 16, marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#5F5F88', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Special Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Birthday celebration? Anniversary? Let us know..."
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 16px',
                      background: 'oklch(14% 0.008 260)',
                      border: '1px solid rgba(173,173,200,0.12)',
                      borderRadius: 8, color: 'oklch(95% 0.003 260)',
                      fontSize: '1rem', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
                      outline: 'none', resize: 'none',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#D4A017'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12, flexWrap: 'wrap' }}>
                  <button onClick={prevStep} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', background: 'transparent', color: '#5F5F88',
                    border: '1px solid rgba(173,173,200,0.12)', borderRadius: 8,
                    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.color = '#5F5F88'; }}
                  >
                    ← Back
                  </button>
                  <button onClick={nextStep} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', background: '#D4A017', color: '#0E0E1A',
                    border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FBBF24'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#D4A017'; }}
                  >
                    Review Booking →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm & Pay */}
            {step === 3 && (
              <div style={{ animation: 'fadeIn 0.4s ease' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.875rem', marginBottom: 8 }}>
                  Confirm Your <span style={{ color: '#D4A017' }}>Booking</span>
                </h3>
                <p style={{ color: '#5F5F88', marginBottom: 32 }}>Review everything before we secure your reservation</p>

                <div style={{
                  background: 'oklch(14% 0.008 260)',
                  border: '1px solid rgba(173,173,200,0.12)',
                  borderRadius: 12, padding: 24,
                }}>
                  {[
                    ['Date', date ? new Date(date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'TBD'],
                    ['Party Size', `${partySize} guests`],
                    ['Package', packages.find(p => p.id === selectedPkg)?.name || 'Standard'],
                    ['Table', selectedTable ? `${selectedTable} · Main Floor` : 'TBD'],
                    ['Drinks Total', formatPrice(drinkTotal)],
                    ['Minimum Spend', packages.find(p => p.id === selectedPkg)?.price || '₦50,000 min.'],
                  ].map(([key, value], i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: i < 5 ? '1px solid rgba(173,173,200,0.12)' : 'none',
                    }}>
                      <span style={{ color: '#5F5F88' }}>{key}</span>
                      <span style={{ fontWeight: 600, textAlign: 'right', color: i === 4 || i === 5 ? '#D4A017' : 'oklch(95% 0.003 260)' }}>{value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 24 }}>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#5F5F88', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      style={{
                        width: '100%', padding: '12px 16px',
                        background: 'oklch(14% 0.008 260)',
                        border: '1px solid rgba(173,173,200,0.12)',
                        borderRadius: 8, color: 'oklch(95% 0.003 260)',
                        fontSize: '1rem', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
                        outline: 'none',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#D4A017'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; }}
                    />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#5F5F88', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      style={{
                        width: '100%', padding: '12px 16px',
                        background: 'oklch(14% 0.008 260)',
                        border: '1px solid rgba(173,173,200,0.12)',
                        borderRadius: 8, color: 'oklch(95% 0.003 260)',
                        fontSize: '1rem', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
                        outline: 'none',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#D4A017'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; }}
                    />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#5F5F88', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        width: '100%', padding: '12px 16px',
                        background: 'oklch(14% 0.008 260)',
                        border: '1px solid rgba(173,173,200,0.12)',
                        borderRadius: 8, color: 'oklch(95% 0.003 260)',
                        fontSize: '1rem', fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
                        outline: 'none',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#D4A017'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 32, gap: 12, flexWrap: 'wrap' }}>
                  <button onClick={() => setConfirmed(true)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', background: '#D4A017', color: '#0E0E1A',
                    border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
                    flex: 1,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FBBF24'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#D4A017'; }}
                  >
                    Confirm & Pay →
                  </button>
                  <button onClick={prevStep} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', background: 'transparent', color: '#5F5F88',
                    border: '1px solid rgba(173,173,200,0.12)', borderRadius: 8,
                    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(173,173,200,0.12)'; e.currentTarget.style.color = '#5F5F88'; }}
                  >
                    ← Back
                  </button>
                </div>
              </div>
            )}

            <div style={{ padding: '40px 0' }} />
          </>
        )}
      </div>

      <PalaceFooter />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @media (min-width: 640px) {
          .step-item span { display: block !important; }
        }
        @media (max-width: 768px) {
          .drinks-grid { grid-template-columns: 1fr !important; }
          .floor-map { max-width: 100% !important; }
          .packages-wrap > * { min-width: 140px !important; }
        }
        @media (max-width: 480px) {
          .floor-map { grid-template-columns: repeat(4, 1fr) !important; gap: 4px !important; }
        }
      `}</style>
    </div>
  );
}
