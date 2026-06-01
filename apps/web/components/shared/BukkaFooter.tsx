import Link from 'next/link';

export function BukkaFooter() {
  return (
    <footer style={{ background: '#2A2420', padding: '48px 24px 24px' }}>
      <div className="bfooter-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32 }}>
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#fff', marginBottom: 12 }}>FoliXx Bukka</h4>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Taste the tradition, feel the flavor. Nigerian cuisine at its finest — crafted with love, delivered with care.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#fff', marginBottom: 12 }}>Quick Links</h4>
          <Link href="/bukka/menu" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 2, textDecoration: 'none', display: 'block' }}>Menu</Link>
          <Link href="/bukka/cart" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 2, textDecoration: 'none', display: 'block' }}>Cart</Link>
          <Link href="/order-tracking" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 2, textDecoration: 'none', display: 'block' }}>Track Order</Link>
          <Link href="/account-hub" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 2, textDecoration: 'none', display: 'block' }}>My Account</Link>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#fff', marginBottom: 12 }}>Contact</h4>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 2 }}>15 Awolowo Road, Ikoyi, Lagos</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 2 }}>+234 800 BUKKA</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 2 }}>hello@folixxbukka.com</p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#fff', marginBottom: 12 }}>Hours</h4>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 2 }}>Mon–Sun: 8AM – 10PM</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 2 }}>Delivery: 9AM – 9PM</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '24px auto 0', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
        <span>© 2025 FoliXx Bukka · FoliXx Hospitality Group</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Privacy</a>
          <span>·</span>
          <a href="#" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Terms</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .bfooter-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </footer>
  );
}
