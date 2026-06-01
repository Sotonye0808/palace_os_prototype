'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BukkaNavbar } from '@/components/shared/BukkaNavbar';
import { BukkaFooter } from '@/components/shared/BukkaFooter';
import { mockMenuCategories } from '@/lib/mocks/menu';
import type { MenuItem } from '@/lib/types/menu';

const categoryGradients: Record<string, string> = {
  'Appetizers': 'linear-gradient(135deg,#FFE8D1,#FFC99A)',
  'Main Courses': 'linear-gradient(135deg,#FFC99A,#FF7A2B)',
  'Desserts': 'linear-gradient(135deg,#FFF5ED,#F5A623)',
  'Beverages': 'linear-gradient(135deg,#FFF5ED,#FFE8D1)',
};

const itemGradients = [
  'linear-gradient(135deg,#FFE8D1,#FFC99A)',
  'linear-gradient(135deg,#FFF5ED,#FFE8D1)',
  'linear-gradient(135deg,#FFE8D1,#F5A623)',
  'linear-gradient(135deg,#FFC99A,#FF7A2B)',
  'linear-gradient(135deg,#FFE8D1,#FFA563)',
  'linear-gradient(135deg,#FFC99A,#E85D1A)',
  'linear-gradient(135deg,#FFF5ED,#F5A623)',
  'linear-gradient(135deg,#FFE8D1,#FFC99A)',
];

const itemEmojis: Record<string, string> = {
  'samosa': '🥟',
  'spring-rolls': '🥬',
  'jollof-rice': '🍛',
  'egusi-soup': '🥘',
  'suya': '🥩',
  'chin-chin': '🍪',
  'ice-cream': '🍦',
  'zobo': '🥤',
  'kunu': '🥥',
};

const dietaryOptions = ['Vegetarian', 'Vegan', 'Spicy', 'Halal', 'Gluten-Free'] as const;
const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

const modifiers = {
  protein: { name: 'Choose Protein', options: [
    { label: 'Grilled Chicken', price: 0 },
    { label: 'Fried Fish (+₦500)', price: 500 },
    { label: 'Goat Meat (+₦800)', price: 800 },
    { label: 'Turkey (+₦1,200)', price: 1200 },
  ]},
  'spice-level': { name: 'Spice Level', options: [
    { label: 'Mild', price: 0 },
    { label: 'Medium', price: 0 },
    { label: 'Hot', price: 0 },
    { label: 'Extra Hot', price: 0 },
  ]},
  extras: { name: 'Add Extra Sides', options: [
    { label: 'Extra Plantain (+₦500)', price: 500 },
    { label: 'Extra Chicken (+₦1,500)', price: 1500 },
    { label: 'Coleslaw (+₦300)', price: 300 },
  ]},
};

export default function BukkaMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Recommended');
  const [search, setSearch] = useState('');
  const [drawerItem, setDrawerItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = useMemo(() => {
    return mockMenuCategories.map(c => c.name);
  }, []);

  const filteredItems = useMemo(() => {
    let items: { item: MenuItem; category: string }[] = [];
    for (const cat of mockMenuCategories) {
      for (const item of cat.items) {
        items.push({ item, category: cat.name });
      }
    }

    if (selectedCategory !== 'all') {
      items = items.filter(i => i.category === selectedCategory);
    }

    if (dietaryFilters.length > 0) {
      items = items.filter(i =>
        dietaryFilters.every(df =>
          i.item.dietaryTags.some(t => t.label.toLowerCase() === df.toLowerCase())
        )
      );
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.item.name.toLowerCase().includes(q) ||
        i.item.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'Price: Low to High') {
      items.sort((a, b) => a.item.price - b.item.price);
    } else if (sortBy === 'Price: High to Low') {
      items.sort((a, b) => b.item.price - a.item.price);
    } else if (sortBy === 'Most Popular') {
      items.sort((a, b) => (b.item.isFeatured ? 1 : 0) - (a.item.isFeatured ? 1 : 0));
    }

    return items;
  }, [selectedCategory, dietaryFilters, search, sortBy]);

  const groupedItems = useMemo(() => {
    if (selectedCategory !== 'all') {
      const section: Record<string, typeof filteredItems> = {};
      section[selectedCategory] = filteredItems;
      return section;
    }
    const groups: Record<string, typeof filteredItems> = {};
    const catOrder = mockMenuCategories.map(c => c.name);
    for (const catName of catOrder) {
      const catItems = filteredItems.filter(i => i.category === catName);
      if (catItems.length > 0) {
        groups[catName] = catItems;
      }
    }
    return groups;
  }, [filteredItems, selectedCategory]);

  function getItemGradient(index: number): string {
    return itemGradients[index % itemGradients.length];
  }

  function toggleDietary(label: string) {
    setDietaryFilters(prev =>
      prev.includes(label) ? prev.filter(d => d !== label) : [...prev, label]
    );
  }

  function openDrawer(item: MenuItem) {
    setDrawerItem(item);
    setQuantity(1);
  }

  function closeDrawer() {
    setDrawerItem(null);
  }

  const formatPrice = (p: number) => `₦${p.toLocaleString()}`;

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1A1614', fontFamily: "'Inter', -apple-system, system-ui, sans-serif" }}>
      <BukkaNavbar active="menu" />

      <div style={{ paddingTop: 80, display: 'flex' }}>
        {/* Sidebar */}
        <aside className="menu-sidebar" style={{
          width: 260, flexShrink: 0,
          padding: 24, borderRight: '1px solid #E8E4DD',
          position: 'sticky', top: 80, height: 'calc(100vh - 80px)', overflowY: 'auto',
          background: '#FFFFFF'
        }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A706A', marginBottom: 12 }}>Categories</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', cursor: 'pointer', fontSize: '0.875rem', color: selectedCategory === 'all' ? '#1A1614' : '#7A706A' }}>
              <input type="radio" name="category" checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} style={{ accentColor: '#E85D1A' }} /> All Items
            </label>
            {categories.map(cat => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', cursor: 'pointer', fontSize: '0.875rem', color: selectedCategory === cat ? '#1A1614' : '#7A706A' }}>
                <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} style={{ accentColor: '#E85D1A' }} /> {cat}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A706A', marginBottom: 12 }}>Dietary</h3>
            {dietaryOptions.map(d => (
              <label key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', cursor: 'pointer', fontSize: '0.875rem', color: dietaryFilters.includes(d) ? '#1A1614' : '#7A706A' }}>
                <input type="checkbox" checked={dietaryFilters.includes(d)} onChange={() => toggleDietary(d)} style={{ accentColor: '#E85D1A' }} /> {d}
              </label>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A706A', marginBottom: 12 }}>Sort By</h3>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              width: '100%', padding: 8, border: '1px solid #E8E4DD', borderRadius: 8,
              background: '#FFFFFF', fontSize: '0.875rem', color: '#1A1614',
              fontFamily: "'Inter', -apple-system, system-ui, sans-serif"
            }}>
              {sortOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </aside>

        {/* Main content */}
        <div className="menu-main-content" style={{ flex: 1, maxWidth: 'calc(100% - 260px)', padding: 24 }}>
          {/* Mobile sidebar toggle */}
          <button className="menu-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            display: 'none', padding: '10px 20px', background: '#E85D1A', color: '#fff',
            border: 'none', borderRadius: 9999, fontSize: '0.875rem', fontWeight: 600,
            cursor: 'pointer', marginBottom: 12, width: '100%'
          }}>
            ☰ Filters
          </button>

          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 16px', background: '#FFFFFF',
            border: '1px solid #E8E4DD', borderRadius: 9999, marginBottom: 16
          }}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search menu items..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, border: 'none', background: 'transparent',
                fontSize: '0.875rem', color: '#1A1614', outline: 'none',
                fontFamily: "'Inter', -apple-system, system-ui, sans-serif"
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#7A706A' }}>✕</button>
            )}
          </div>

          {/* Active filters */}
          {(selectedCategory !== 'all' || dietaryFilters.length > 0) && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {selectedCategory !== 'all' && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 12px', background: '#FFF5ED', borderRadius: 9999, fontSize: 11, color: '#E85D1A', fontWeight: 500 }}>
                  {selectedCategory}
                  <span onClick={() => setSelectedCategory('all')} style={{ cursor: 'pointer', fontSize: 14, marginLeft: 4 }}>✕</span>
                </span>
              )}
              {dietaryFilters.map(d => (
                <span key={d} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 12px', background: '#FFF5ED', borderRadius: 9999, fontSize: 11, color: '#E85D1A', fontWeight: 500 }}>
                  {d}
                  <span onClick={() => toggleDietary(d)} style={{ cursor: 'pointer', fontSize: 14, marginLeft: 4 }}>✕</span>
                </span>
              ))}
            </div>
          )}

          {/* Menu sections */}
          {Object.entries(groupedItems).map(([sectionName, items]) => (
            <div key={sectionName} style={{ marginBottom: 32 }}>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.25rem', color: '#E85D1A', marginBottom: 12, marginTop: 24
              }}>
                {sectionName} <span style={{ color: '#7A706A', fontFamily: "'Inter', -apple-system, system-ui, sans-serif", fontSize: '0.875rem', fontWeight: 400 }}>({items.length} items)</span>
              </h2>
              <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {items.map(({ item, category }, idx) => (
                  <div
                    key={item.id}
                    onClick={() => openDrawer(item)}
                    style={{
                      background: '#FFFFFF', border: '1px solid #E8E4DD',
                      borderRadius: 16, overflow: 'hidden',
                      transition: 'all 0.3s', cursor: 'pointer'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(232,93,26,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{
                      aspectRatio: '16/9', position: 'relative',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                      <div style={{ position: 'absolute', inset: 0, background: getItemGradient(idx) }} />
                      {item.isFeatured && (
                        <span style={{
                          position: 'absolute', top: 8, left: 8,
                          padding: '2px 10px', borderRadius: 4,
                          fontSize: 9, fontWeight: 600, textTransform: 'uppercase',
                          background: '#E85D1A', color: '#fff'
                        }}>
                          {item.id === 'jollof-rice' ? '★ Bestseller' : 'Popular'}
                        </span>
                      )}
                      <span style={{ fontSize: 32, zIndex: 1 }}>{itemEmojis[item.id] || '🍽️'}</span>
                    </div>
                    <div style={{ padding: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</span>
                        <span style={{ color: '#E85D1A', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.875rem' }}>{formatPrice(item.price)}</span>
                      </div>
                      <p style={{ color: '#7A706A', fontSize: '0.75rem', marginTop: 2, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.description}
                      </p>
                      <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                        {item.dietaryTags.map(tag => (
                          <span key={tag.id} style={{ padding: '1px 6px', fontSize: 9, borderRadius: 3, background: '#FFF5ED', color: '#E85D1A' }}>{tag.label}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <button
                          onClick={e => { e.stopPropagation(); openDrawer(item); }}
                          style={{
                            padding: '6px 16px', background: '#E85D1A', color: '#fff',
                            border: 'none', borderRadius: 9999, fontSize: 11,
                            fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#C44510'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#E85D1A'; }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#7A706A' }}>
              <p style={{ fontSize: '1.125rem' }}>No menu items found</p>
              <p style={{ fontSize: '0.875rem', marginTop: 8 }}>Try adjusting your filters or search</p>
            </div>
          )}
        </div>
      </div>

      {/* Item detail drawer */}
      {drawerItem && (
        <>
          <div
            onClick={closeDrawer}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
              zIndex: 200, animation: 'fadeIn 0.2s ease'
            }}
          />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
            background: '#FFFFFF', borderRadius: '20px 20px 0 0',
            maxHeight: '85vh', overflowY: 'auto', padding: 0,
            animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)'
          }}>
            <div style={{ width: 40, height: 4, background: '#E8E4DD', borderRadius: 2, margin: '12px auto' }} />
            <div style={{
              width: '100%', aspectRatio: '16/7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: getItemGradient(0), position: 'relative'
            }}>
              <span style={{ fontSize: 64 }}>{itemEmojis[drawerItem.id] || '🍽️'}</span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.5rem' }}>{drawerItem.name}</h2>
                </div>
                <span style={{ color: '#E85D1A', fontWeight: 700, fontSize: '1.25rem', fontFamily: "'JetBrains Mono', monospace" }}>{formatPrice(drawerItem.price)}</span>
              </div>
              <p style={{ color: '#7A706A', lineHeight: 1.7, margin: '8px 0 16px' }}>{drawerItem.description}</p>

              {/* Modifier groups */}
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>Choose Protein</h4>
                {modifiers.protein.options.map((opt, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: '0.875rem', color: '#7A706A' }}>
                    <input type="radio" name="protein" defaultChecked={i === 0} style={{ accentColor: '#E85D1A' }} /> {opt.label}
                  </label>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>Spice Level</h4>
                {modifiers['spice-level'].options.map((opt, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: '0.875rem', color: '#7A706A' }}>
                    <input type="radio" name="spice" defaultChecked={i === 1} style={{ accentColor: '#E85D1A' }} /> {opt.label}
                  </label>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>Add Extra Sides</h4>
                {modifiers.extras.options.map((opt, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: '0.875rem', color: '#7A706A' }}>
                    <input type="checkbox" style={{ accentColor: '#E85D1A' }} /> {opt.label}
                  </label>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #E8E4DD', borderRadius: 9999, padding: '8px 16px' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ border: 'none', background: 'none', fontSize: 18, cursor: 'pointer', color: '#7A706A' }}>−</button>
                  <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ border: 'none', background: 'none', fontSize: 18, cursor: 'pointer', color: '#E85D1A' }}>+</button>
                </div>
                <button
                  onClick={closeDrawer}
                  style={{
                    flex: 1, padding: 14, background: '#E85D1A', color: '#fff',
                    border: 'none', borderRadius: 9999, fontWeight: 600, cursor: 'pointer'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#C44510'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#E85D1A'; }}
                >
                  Add to Cart — {formatPrice(drawerItem.price * quantity)}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <BukkaFooter />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @media (max-width: 1024px) {
          .menu-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          .menu-sidebar { display: none !important; }
          .menu-sidebar-toggle { display: block !important; }
          .menu-main-content { max-width: 100% !important; padding: 16px !important; }
          .menu-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .menu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
